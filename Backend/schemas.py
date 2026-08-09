from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal

# --- API models ---
class PreGoalSheetRequest(BaseModel):
    sessionId: str
    candidate: Dict[str, Any]

class PreGoalSheet(BaseModel):
    focus_areas: List[str] = Field(description="Top 3 technical areas to focus on based on the candidate's learning history.")
    suggested_strategy: str = Field(description="A brief paragraph summarizing the interview strategy.")
    icebreaker: str = Field(description="A personalized icebreaker question to start the interview.")

class InterviewRequest(BaseModel):
    sessionId: str
    message: Optional[str] = None
    candidate: Optional[Dict[str, Any]] = None   # Full candidate object per spec

class Feedback(BaseModel):
    summary: str
    strengths: List[str]
    gaps: List[str]
    next: List[str]

class InterviewResponse(BaseModel):
    reply: str
    done: bool
    feedback: Optional[Feedback] = None
    ui_cue: Optional[str] = None

# --- LLM structured output models ---
class EvaluatorDecision(BaseModel):
    status: Literal["MASTERED", "PARTIAL", "CRITICAL_GAP"] = Field(
        description="Assessment of the candidate's answer relative to the current topic's objectives."
    )
    reply: str = Field(
        description="Your next conversational interviewer response: a follow-up question, a transition to a new topic, or a closing statement."
    )
    pivot_to_next_topic: bool = Field(
        default=False,
        description="True if the candidate has demonstrated sufficient understanding and we should move to the next topic."
    )
    interview_complete: bool = Field(
        default=False,
        description="True only when the interview should be concluded (enough topics covered, or candidate clearly needs feedback)."
    )
    ui_cue: str = Field(
        default="none",
        description="A visual cue to trigger on the frontend based on the candidate's answer. Must be one of: 'none', 'success_confetti', 'warning_pulse', 'show_hint'."
    )

class FinalFeedbackDecision(BaseModel):
    summary: str
    strengths: List[str]
    gaps: List[str]
    next: List[str]
