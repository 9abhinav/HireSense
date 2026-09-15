import uuid
from datetime import datetime
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from models.jobs import JobMatchRequest, JobMatchResult, SkillMatchItem
from services.ai_service import ai_service
from middleware.auth import get_current_user

router = APIRouter(prefix="/jobs", tags=["Job Matching & Alignment"])

MOCK_MATCHES_DB = {
    "jm-1": {
        "id": "jm-1",
        "matchScore": 88,
        "roleTitle": "Senior Full-Stack Engineer",
        "companyDetected": "Stripe",
        "experienceMatch": "Strong Fit (4+ years mapped against required 3+)",
        "matchedSkills": [
            {"name": "React & Modern Hooks", "matchLevel": "high", "context": "Demonstrated across 3 production projects"},
            {"name": "Python & Async APIs", "matchLevel": "high", "context": "Extensive backend API development history"},
            {"name": "Distributed Caching (Redis)", "matchLevel": "high", "context": "Used for session caching and rate-limiting"},
            {"name": "PostgreSQL & Database Design", "matchLevel": "medium", "context": "Relational schema design referenced"}
        ],
        "missingSkills": [
            {"name": "Kafka / Event Streaming", "matchLevel": "high", "context": "Explicitly requested for real-time transaction processing"},
            {"name": "Terraform / Infrastructure-as-Code", "matchLevel": "medium", "context": "Preferred for multi-cloud deployments"}
        ],
        "aiAnalysis": "You are an 88% strong candidate for this position. The recruiter's primary focus is scalable microservices and reactive frontends. Adding 1-2 bullet points highlighting asynchronous message queues and cloud deployments will push your match score to 95%+.",
        "suggestedResumeAdjustments": [
            "Mention Redis pub/sub or message broker experience under your recent backend project.",
            "Emphasize TypeScript type-safety alongside React in your frontend achievements.",
            "Highlight automated CI/CD pipeline automation and Docker containerization."
        ],
        "keywordOptimizationTips": [
            "Include 'Event-Driven Architecture' in your professional summary.",
            "Target 'Zero-downtime deployment' in your system operations bullet."
        ],
        "matchedAt": "2026-09-14T14:30:00Z"
    }
}

@router.post("/match", response_model=JobMatchResult)
async def match_job(req: JobMatchRequest, current_user: dict = Depends(get_current_user)):
    match_data = await ai_service.match_job(req.jobDescription)
    
    match_id = f"jm-{uuid.uuid4().hex[:6]}"
    result = JobMatchResult(
        id=match_id,
        matchScore=match_data["matchScore"],
        roleTitle=match_data["roleTitle"],
        companyDetected=match_data.get("companyDetected", "Target Company"),
        experienceMatch=match_data["experienceMatch"],
        matchedSkills=[SkillMatchItem(**s) for s in match_data["matchedSkills"]],
        missingSkills=[SkillMatchItem(**s) for s in match_data["missingSkills"]],
        aiAnalysis=match_data["aiAnalysis"],
        suggestedResumeAdjustments=match_data["suggestedResumeAdjustments"],
        keywordOptimizationTips=match_data["keywordOptimizationTips"],
        matchedAt=datetime.utcnow().isoformat()
    )
    
    MOCK_MATCHES_DB[match_id] = result.model_dump()
    return result

@router.get("/matches", response_model=List[JobMatchResult])
async def get_matches(current_user: dict = Depends(get_current_user)):
    return [JobMatchResult(**m) for m in MOCK_MATCHES_DB.values()]

@router.get("/matches/{matchId}", response_model=JobMatchResult)
async def get_match_detail(matchId: str, current_user: dict = Depends(get_current_user)):
    if matchId not in MOCK_MATCHES_DB:
        raise HTTPException(status_code=404, detail="Job match record not found")
    return JobMatchResult(**MOCK_MATCHES_DB[matchId])
