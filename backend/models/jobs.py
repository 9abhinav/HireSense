from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class JobMatchRequest(BaseModel):
    jobDescription: str
    resumeId: Optional[str] = None
    roleTitle: Optional[str] = None

class SkillMatchItem(BaseModel):
    name: str
    matchLevel: str  # 'high' | 'medium' | 'low'
    context: Optional[str] = None

class JobMatchResult(BaseModel):
    id: str
    matchScore: int
    roleTitle: str
    companyDetected: Optional[str] = "Tech Innovations Inc."
    experienceMatch: str
    matchedSkills: List[SkillMatchItem]
    missingSkills: List[SkillMatchItem]
    aiAnalysis: str
    suggestedResumeAdjustments: List[str]
    keywordOptimizationTips: List[str]
    matchedAt: str
