from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class SkillRecommendation(BaseModel):
    name: str
    demandGrowth: str
    urgency: str  # 'High' | 'Medium' | 'Emerging'
    description: str
    suggestedCourseOrProject: str

class TrajectoryStage(BaseModel):
    stage: str
    roleTitle: str
    estimatedTimeframe: str
    salaryRange: str
    requiredMilestones: List[str]
    isCurrent: bool = False

class CareerInsightResponse(BaseModel):
    targetRole: str
    marketReadinessScore: int
    salaryBenchmark: str
    hiringDemandIndex: str
    topStrengths: List[str]
    criticalGapAreas: List[str]
    strategicRecommendations: List[str]
    recommendedSkills: List[SkillRecommendation]
    trajectoryPath: List[TrajectoryStage]
