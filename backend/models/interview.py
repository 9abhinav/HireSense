from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class StartInterviewRequest(BaseModel):
    role: str = "Senior Full-Stack Engineer"
    experience: str = "Mid-level (3-5 yrs)"
    interviewType: str = "Technical & System Design"
    difficulty: str = "Hard"
    duration: str = "30 mins"

class InterviewQuestion(BaseModel):
    id: str
    order: int
    totalQuestions: int
    text: str
    category: str
    hint: Optional[str] = None
    timeLimitSeconds: int = 180

class SubmitAnswerRequest(BaseModel):
    questionId: str
    answer: str
    durationSeconds: Optional[int] = None

class AnswerFeedback(BaseModel):
    questionId: str
    score: int
    clarityScore: int
    technicalDepthScore: int
    structureScore: int
    feedback: str
    keyHighlights: List[str] = []
    missedPoints: List[str] = []
    improvedAnswerOutline: Optional[str] = None

class InterviewResultScoreBreakdown(BaseModel):
    technicalAccuracy: int
    systemDesignClarity: int
    communicationConfidence: int
    problemSolvingVelocity: int
    codeStructure: int

class InterviewSessionResult(BaseModel):
    sessionId: str
    role: str
    difficulty: str
    overallScore: int
    breakdown: InterviewResultScoreBreakdown
    strengths: List[str]
    growthOpportunities: List[str]
    aiSummary: str
    completedAt: str
    durationMinutes: int
