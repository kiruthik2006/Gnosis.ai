from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal

# --- API models ---
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

class FinalFeedbackDecision(BaseModel):
    summary: str
    strengths: List[str]
    gaps: List[str]
    next: List[str]
