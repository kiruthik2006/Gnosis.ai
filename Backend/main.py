import json
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import InterviewRequest, InterviewResponse, Feedback
from llm_engine import generate_first_question, evaluate_and_next, generate_feedback
from data_utils import (
    load_curriculum,
    load_candidates,
    build_candidate_context,
    get_day_data,
    choose_starting_topic,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load static data ---
curriculum = load_curriculum()
candidates_db = load_candidates()

# --- In-memory session store ---
active_sessions = {}

# --- Helper: find the next topic after the current one ---
def get_next_topic(candidate: dict, current_day: int, covered_days: set) -> dict | None:
    """Return the next day's topic data that hasn't been covered yet."""
    missions = candidate.get("missions", [])
    # Sort missions by day
    sorted_missions = sorted(missions, key=lambda m: m["day"])
    for m in sorted_missions:
        if m["day"] not in covered_days and m["day"] != current_day:
            day_data = get_day_data(m["day"], curriculum)
            if day_data:
                return day_data
    # If all missions covered, try any day in curriculum not covered
    for day in curriculum["days"]:
        if day["day"] not in covered_days:
            return day
    return None


@app.post("/api/interview", response_model=InterviewResponse)
async def interview_endpoint(req: InterviewRequest):
    # ========================
    # TURN 1: INITIALIZATION
    # ========================
    if req.sessionId not in active_sessions:
        if not req.candidate:
            raise HTTPException(status_code=400, detail="candidate object required on first request")

        candidate = req.candidate
        candidate_context = build_candidate_context(candidate)

        # Choose starting topic
        starting_topic = choose_starting_topic(candidate, curriculum)
        if not starting_topic:
            # fallback
            starting_topic = get_day_data(1, curriculum)

        # Generate first question
        first_question = generate_first_question(candidate_context, starting_topic)

        # Initialize session
        active_sessions[req.sessionId] = {
            "candidate": candidate,
            "candidate_context": candidate_context,
            "chat_history": [{"role": "assistant", "content": first_question}],
            "current_day": starting_topic["day"],
            "days_covered": {starting_topic["day"]},
            "questions_asked": 1,
            "verified_tree": {},
        }

        return InterviewResponse(reply=first_question, done=False)

    # ========================
    # TURN 2..N: EVALUATION LOOP
    # ========================
    session = active_sessions[req.sessionId]
    if not req.message:
        raise HTTPException(status_code=400, detail="message field required for continuation")

    # Append user message
    session["chat_history"].append({"role": "user", "content": req.message})

    # Get current topic data
    current_day = session["current_day"]
    current_topic = get_day_data(current_day, curriculum)
    if not current_topic:
        # Should not happen, but fallback
        current_topic = get_day_data(1, curriculum)

    # Determine next topic (for pivot hint)
    next_topic = get_next_topic(session["candidate"], current_day, session["days_covered"])
    next_topic_title = next_topic["title"] if next_topic else None

    # Call evaluator
    eval_result = evaluate_and_next(
        candidate_context=session["candidate_context"],
        current_topic=current_topic,
        chat_history=session["chat_history"],
        user_message=req.message,
        next_topic_title=next_topic_title,
        questions_asked=session["questions_asked"],
        days_covered=len(session["days_covered"]),
    )

    # Update verified tree
    session["verified_tree"][current_topic["title"]] = eval_result.status

    # Append assistant reply to history
    session["chat_history"].append({"role": "assistant", "content": eval_result.reply})

    # Update topic progression if pivot
    if eval_result.pivot_to_next_topic and next_topic:
        session["current_day"] = next_topic["day"]
        session["days_covered"].add(next_topic["day"])

    # Increment question count (we count the assistant question that was just generated)
    session["questions_asked"] += 1

    # Check if interview should end (Strict rule: minimum 8 questions asked)
    if (eval_result.interview_complete or next_topic is None) and session["questions_asked"] >= 8:
        # Generate final feedback
        feedback_decision = generate_feedback(
            candidate_context=session["candidate_context"],
            chat_history=session["chat_history"],
            verified_tree=session["verified_tree"],
        )
        feedback_obj = Feedback(
            summary=feedback_decision.summary,
            strengths=feedback_decision.strengths,
            gaps=feedback_decision.gaps,
            next=feedback_decision.next,
        )
        # Clean up session
        del active_sessions[req.sessionId]
        return InterviewResponse(reply=eval_result.reply, done=True, feedback=feedback_obj)

    return InterviewResponse(reply=eval_result.reply, done=False)
