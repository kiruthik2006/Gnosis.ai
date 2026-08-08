import json
import os
from pathlib import Path
from google import genai
from google.genai import types
from dotenv import load_dotenv

from schemas import EvaluatorDecision, FinalFeedbackDecision

# --- ENV ---
BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH, override=True)

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=api_key)
MODEL_NAME = "gemini-2.5-flash-preview-05-20"  # 1M context, latest

# --- Prompt Engineering ---

def generate_first_question(candidate_context: str, topic: dict) -> str:
    """Generates the opening question, personalised to the candidate's history."""
    system_prompt = f"""You are a senior technical interviewer conducting an oral assessment for an AI engineering cohort graduate.

Here is the candidate's detailed learning profile:
{candidate_context}

The interview begins with the topic: "{topic['title']}".
Learning objectives for this topic:
{chr(10).join('- ' + obj for obj in topic['objectives'])}

Your task:
- Start the interview with a friendly but professional tone.
- Reference the candidate's history ONLY if relevant (e.g., if they struggled with or skipped a related topic).
- Ask ONE specific, scenario-based technical question that probes the candidate's understanding of the topic's objectives.
- Do NOT ask multiple questions at once.
- Keep your opening concise (2-3 sentences at most)."""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=system_prompt
    )
    return response.text


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
    Evaluates the latest answer and produces the next interviewer response.
    Returns a structured EvaluatorDecision.
    """
    # Prepare recent chat (last 5 exchanges)
    recent = chat_history[-6:]  # 3 user-assistant pairs
    chat_text = "\n".join([f"{m['role'].capitalize()}: {m['content']}" for m in recent])

    # Define minimum thresholds for the LLM to consider
    min_questions = 8
    min_days = 4

    system_instruction = f"""You are a technical interviewer conducting an adaptive oral assessment.

Candidate profile:
{candidate_context}

Current interview progress: {questions_asked} questions asked, {days_covered} different days covered.
Minimum requirements: {min_questions} questions across at least {min_days} different days.

Current topic being tested: "{current_topic['title']}"
Learning objectives:
{chr(10).join('- ' + obj for obj in current_topic['objectives'])}

The next topic in the candidate's curriculum is: "{next_topic_title or 'None (end of curriculum)'}".

Recent conversation:
{chat_text}

User's latest answer: "{user_message}"

Your evaluation task:
1. Assess the answer against the current objectives. Choose a status:
   - MASTERED: clear, accurate, and demonstrates deep understanding.
   - PARTIAL: some understanding but missing details or slightly inaccurate.
   - CRITICAL_GAP: major misunderstanding or inability to answer.

2. Based on the assessment AND the overall interview progress, decide the next action:
   - If the candidate needs further probing on the current topic, ask a sharp follow-up question. Set pivot_to_next_topic = false.
   - If they have sufficiently demonstrated the objectives (MASTERED or multiple PARTIAL with progress), you may pivot to the next topic. Set pivot_to_next_topic = true, and craft a reply that smoothly introduces the next topic (e.g., "Let's move on to {next_topic_title}...").
   - If the minimum thresholds (8 questions, 4 days) are met AND you feel the interview has covered enough ground (or the candidate is clearly struggling without improvement), you may conclude the interview. Set interview_complete = true, and craft a polite closing remark in the reply.

Important rules:
- NEVER end the interview if the minimum thresholds are not met.
- When pivoting, do NOT announce "NEXT TOPIC" literally; just transition naturally.
- When ending, the reply should be a short closing statement (e.g., "Thank you for your time. I have enough to provide feedback.").
- Ensure your reply is conversational and human-like.

Provide your decision in the structured format."""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=system_instruction,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=EvaluatorDecision,
            temperature=0.7,
        )
    )

    return EvaluatorDecision.model_validate_json(response.text)


def generate_feedback(
    candidate_context: str,
    chat_history: list,
    verified_tree: dict
) -> FinalFeedbackDecision:
    """Generates the final structured feedback."""
    chat_text = "\n".join([f"{m['role'].capitalize()}: {m['content']}" for m in chat_history])
    tree_text = "\n".join([f"{topic}: {status}" for topic, status in verified_tree.items()])

    prompt = f"""You are an experienced technical coach providing post-interview feedback.

Candidate profile:
{candidate_context}

Complete interview transcript:
{chat_text}

Verified skill tree (topic → evaluation status):
{tree_text}

Generate a structured feedback report. Be honest, specific, and constructive.
- summary: a concise overall assessment (2-4 sentences).
- strengths: a list of at least 2 bullet points where the candidate excelled, referencing specific answers or topics.
- gaps: a list of at least 2 areas where the candidate's understanding was weak or incomplete, again with specifics.
- next: actionable recommendations for further study (at least 2 items), tied to the curriculum if possible.

Focus on the candidate's technical depth, clarity of explanation, and ability to apply concepts."""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=FinalFeedbackDecision,
            temperature=0.5,
        )
    )
    return FinalFeedbackDecision.model_validate_json(response.text)
