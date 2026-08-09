import json
import os
import random
import traceback
from pathlib import Path
from google import genai
from google.genai import types
from dotenv import load_dotenv

from schemas import EvaluatorDecision, FinalFeedbackDecision, PreGoalSheet

# --- ENV ---
BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH, override=True)

api_key = os.getenv("GEMINI_API_KEY", "")
client = None
if api_key:
    try:
        client = genai.Client(api_key=api_key)
        print(f"[LLM_ENGINE] ✅ Gemini client initialized with API key: {api_key[:10]}...{api_key[-4:]}")
    except Exception as e:
        print(f"[LLM_ENGINE] ❌ Failed to initialize genai.Client: {e}")
        traceback.print_exc()
else:
    print("[LLM_ENGINE] ❌ No GEMINI_API_KEY found in .env file!")

# Models
FAST_MODEL = "gemini-3.5-flash-lite"
PRO_MODEL = "gemma-4-31b-it"
GEMMA_MODEL = "gemma-4-26b-a4b-it"

def _call_gemini(prompt_contents, model_name=FAST_MODEL, json_schema=None, temperature=0.75):
    """
    Single point of Gemini API invocation.
    Returns the raw text response or None on failure.
    Logs every step to console for debugging.
    """
    if not client:
        print(f"[LLM_ENGINE] ❌ SKIPPING API CALL — no Gemini client (missing API key)")
        return None

    print(f"[LLM_ENGINE] 🔄 Calling model={model_name}, temperature={temperature}, json_schema={'YES' if json_schema else 'NO'}")

    try:
        config_kwargs = {"temperature": temperature}
        if json_schema:
            config_kwargs["response_mime_type"] = "application/json"
            config_kwargs["response_schema"] = json_schema

        response = client.models.generate_content(
            model=model_name,
            contents=prompt_contents,
            config=types.GenerateContentConfig(**config_kwargs)
        )

        if response and response.text:
            print(f"[LLM_ENGINE] ✅ Got response from {model_name}: {response.text[:120]}...")
            return response.text.strip()
        else:
            print(f"[LLM_ENGINE] ⚠️ Empty response from {model_name}")
            return None

    except Exception as err:
        print(f"[LLM_ENGINE] ❌ API CALL FAILED for {model_name}: {err}")
        traceback.print_exc()
        return None

def draft_pre_goal_sheet(candidate_context: str) -> PreGoalSheet:
    """Uses Gemma to draft a pre-interview goal sheet for the candidate."""
    system_prompt = f"""You are an AI Interview Strategist. Review the candidate's learning history and draft an interview plan.

Candidate Background:
{candidate_context}

Return a structured JSON with:
- focus_areas: List of 3 technical areas to focus on.
- suggested_strategy: A brief paragraph describing the interview strategy.
- icebreaker: A personalized icebreaker question to start the interview.
"""
    print(f"[LLM_ENGINE] 📤 draft_pre_goal_sheet() — calling {GEMMA_MODEL}...")
    result = _call_gemini(system_prompt, model_name=GEMMA_MODEL, json_schema=PreGoalSheet, temperature=0.6)
    
    if result:
        try:
            sheet = PreGoalSheet.model_validate_json(result)
            print(f"[LLM_ENGINE] ✅ Pre-Goal Sheet generated successfully")
            return sheet
        except Exception as parse_err:
            print(f"[LLM_ENGINE] ❌ JSON parse failed: {parse_err}")
            traceback.print_exc()
            
    print(f"[LLM_ENGINE] ⚠️ FALLBACK used for pre_goal_sheet (API unavailable)")
    return PreGoalSheet(
        focus_areas=["Core Fundamentals", "System Design", "Problem Solving"],
        suggested_strategy="Start with fundamentals, escalate to design, then assess problem-solving skills under pressure.",
        icebreaker="Welcome! Let's kick off - what is the most interesting technical challenge you've solved recently?"
    )


def generate_first_question(candidate_context: str, topic: dict) -> str:
    """Generates a dynamic opening question using FAST_MODEL."""
    system_prompt = f"""You are a friendly, experienced Senior Staff Engineer conducting an oral technical interview.

Candidate Background:
{candidate_context}

Starting Topic: "{topic.get('title', 'System Architecture')}"
Topic Objectives:
{chr(10).join('- ' + obj for obj in topic.get('objectives', []))}

Instructions:
- Speak naturally like a colleague in a 1-on-1 interview. Do NOT sound scripted.
- Welcome the candidate by name, reference their specific background or past mission attempts if relevant, and ask ONE thought-provoking, scenario-based technical question.
- Keep it under 3 sentences."""

    print(f"[LLM_ENGINE] 📤 generate_first_question() — calling Gemini...")
    result = _call_gemini(system_prompt, model_name=FAST_MODEL)

    if result:
        print(f"[LLM_ENGINE] ✅ AI-generated opening question delivered")
        return result

    # If API fails, return a simple fallback (NOT from an array)
    cand_name = "Candidate"
    job_role = "Engineer"
    for line in candidate_context.split("\n"):
        if line.startswith("Candidate:"):
            cand_name = line.split(":", 1)[1].strip()
        elif line.startswith("Role:"):
            job_role = line.split(":", 1)[1].strip()

    title = topic.get("title", "Core Architecture")
    print(f"[LLM_ENGINE] ⚠️ FALLBACK used for first question (API unavailable)")
    return (
        f"Hey {cand_name}, welcome! Given your background as a {job_role} and your work on '{title}', "
        f"I'd love to start there — what's the single biggest architectural challenge you've faced with {title}, and how did you solve it?"
    )


def evaluate_and_next(
    candidate_context: str,
    current_topic: dict,
    chat_history: list,
    user_message: str,
    next_topic_title: str | None,
    questions_asked: int,
    days_covered: int
) -> EvaluatorDecision:
    """
    Evaluates the candidate's answer using PRO_MODEL.
    The AI talks freely, expresses doubt, and probes missing details.
    Enforces minimum 8 questions.
    """
    recent = chat_history[-8:]
    chat_text = "\n".join([f"{m['role'].capitalize()}: {m['content']}" for m in recent])
    min_questions = 8

    system_instruction = f"""You are a Senior Staff AI Engineer interviewing a candidate in an interactive, natural 1-on-1 session.

Candidate background:
{candidate_context}

Interview Progress:
- Questions asked so far: {questions_asked}
- Minimum questions required: {min_questions} (STRICT RULE: Do NOT end interview if questions_asked < 8)

Current topic: "{current_topic.get('title', 'Architecture')}"
Objectives:
{chr(10).join('- ' + obj for obj in current_topic.get('objectives', []))}

Next topic: "{next_topic_title or 'End of curriculum'}"

Transcript so far:
{chat_text}

Candidate's latest answer: "{user_message}"

Guidelines:
1. TALK FREELY & EXPRESS DOUBT:
   - Read the candidate's latest response carefully.
   - If they gave a brief, incomplete, or repeated answer, call it out naturally (e.g. "Wait, you mentioned X, but what happens if Y occurs?", "Can you explain how that actually works under the hood?").
   - If their explanation is strong, acknowledge it genuinely and introduce the next challenge.
   - Never sound like a scripted bot. Use natural, peer-to-peer engineering phrasing.

2. MINIMUM 8 QUESTIONS:
   - Under no circumstances set interview_complete = true if questions_asked < {min_questions}.

Return your output strictly formatted in the EvaluatorDecision JSON schema."""

    print(f"[LLM_ENGINE] 📤 evaluate_and_next() — Q#{questions_asked}, user said: '{user_message[:80]}...'")
    result = _call_gemini(system_instruction, model_name=PRO_MODEL, json_schema=EvaluatorDecision, temperature=0.75)

    if result:
        try:
            decision = EvaluatorDecision.model_validate_json(result)
            if questions_asked < min_questions:
                decision.interview_complete = False
            print(f"[LLM_ENGINE] ✅ AI decision: status={decision.status}, pivot={decision.pivot_to_next_topic}, complete={decision.interview_complete}")
            return decision
        except Exception as parse_err:
            print(f"[LLM_ENGINE] ❌ JSON parse failed: {parse_err}")
            traceback.print_exc()

    # Minimal fallback — NOT from arrays. Single contextual response.
    print(f"[LLM_ENGINE] ⚠️ FALLBACK used for evaluate_and_next (API unavailable)")
    word_count = len(user_message.split())
    status = "MASTERED" if word_count > 20 else ("PARTIAL" if word_count > 8 else "CRITICAL_GAP")
    is_complete = questions_asked >= min_questions
    topic_name = current_topic.get("title", "this area")

    if is_complete:
        reply = "Thanks for walking me through all of that. I have enough to generate your evaluation report now."
    else:
        reply = f"Interesting point about {topic_name}. Can you elaborate on how that works in practice — what specific trade-offs or failure modes have you dealt with?"

    return EvaluatorDecision(
        status=status,
        reply=reply,
        pivot_to_next_topic=False,
        interview_complete=is_complete
    )


def generate_feedback(
    candidate_context: str,
    chat_history: list,
    verified_tree: dict
) -> FinalFeedbackDecision:
    """Generates structured post-interview feedback using PRO_MODEL."""
    chat_text = "\n".join([f"{m['role'].capitalize()}: {m['content']}" for m in chat_history])
    tree_text = "\n".join([f"{topic}: {status}" for topic, status in verified_tree.items()])

    prompt = f"""You are a technical interviewer producing a final candidate report.

Candidate context:
{candidate_context}

Full transcript:
{chat_text}

Verified topics:
{tree_text}

Produce a structured JSON report with fields:
- summary: string (concise overview)
- strengths: list of strings (at least 2 points)
- gaps: list of strings (at least 2 points)
- next: list of strings (at least 2 recommendations)"""

    result = _call_gemini(prompt, model_name=PRO_MODEL, json_schema=FinalFeedbackDecision, temperature=0.5)

    if result:
        try:
            feedback = FinalFeedbackDecision.model_validate_json(result)
            print(f"[LLM_ENGINE] ✅ AI feedback report generated")
            return feedback
        except Exception as parse_err:
            print(f"[LLM_ENGINE] ❌ Feedback JSON parse failed: {parse_err}")
            traceback.print_exc()

    # Minimal fallback
    print(f"[LLM_ENGINE] ⚠️ FALLBACK used for generate_feedback (API unavailable)")
    cand_name = "Candidate"
    for line in candidate_context.split("\n"):
        if line.startswith("Candidate:"):
            cand_name = line.split(":", 1)[1].strip()

    return FinalFeedbackDecision(
        summary=f"{cand_name} completed an adaptive technical assessment. Demonstrated good problem-solving ability with opportunities to deepen system design fundamentals.",
        strengths=[
            "Demonstrated understanding of core API protocols and execution lifecycles.",
            "Ability to articulate architectural trade-offs during scenario questions."
        ],
        gaps=[
            "Needed follow-up probing on edge-case failure modes and memory limits.",
            "Further practice needed in distributed state synchronization."
        ],
        next=[
            "Deep dive into high-throughput streaming architectures.",
            "Practice failure recovery patterns and distributed locking."
        ]
    )
