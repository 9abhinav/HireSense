import uuid
from datetime import datetime
from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException, Depends
from models.interview import (
    StartInterviewRequest, InterviewQuestion, SubmitAnswerRequest,
    AnswerFeedback, InterviewSessionResult, InterviewResultScoreBreakdown
)
from services.ai_service import ai_service
from middleware.auth import get_current_user

router = APIRouter(prefix="/interview", tags=["AI Mock Interviews"])

# Active interview sessions store
MOCK_SESSIONS_DB: Dict[str, Dict[str, Any]] = {}

QUESTIONS_POOL = [
    {
        "id": "q-1",
        "order": 1,
        "totalQuestions": 5,
        "text": "How do you design a high-throughput rate limiter for a distributed REST API handling 100,000 requests per second?",
        "category": "System Design & Distributed Systems",
        "hint": "Discuss Redis sliding window counter vs token bucket algorithms and cluster sharding.",
        "timeLimitSeconds": 180
    },
    {
        "id": "q-2",
        "order": 2,
        "totalQuestions": 5,
        "text": "Walk me through an architectural incident where you encountered high latency or deadlock in a relational database, and how you resolved it.",
        "category": "Backend Performance & Debugging",
        "hint": "Use the STAR method: explain the metrics, query profiling (EXPLAIN ANALYZE), and index optimization.",
        "timeLimitSeconds": 180
    },
    {
        "id": "q-3",
        "order": 3,
        "totalQuestions": 5,
        "text": "Explain how React reconciliation works with Fiber architecture and how you optimize large component re-renders.",
        "category": "Frontend Architecture",
        "hint": "Touch upon concurrent mode, memoization hooks (useMemo, useCallback), and virtual DOM diffing.",
        "timeLimitSeconds": 180
    },
    {
        "id": "q-4",
        "order": 4,
        "totalQuestions": 5,
        "text": "How do you ensure data consistency between microservices when updating distributed state without a two-phase commit?",
        "category": "Distributed Architecture",
        "hint": "Discuss the Saga pattern (Choreography vs Orchestration) and Outbox pattern with Kafka.",
        "timeLimitSeconds": 180
    },
    {
        "id": "q-5",
        "order": 5,
        "totalQuestions": 5,
        "text": "Describe a scenario where you had to push back on unrealistic product deadlines or advocate for technical debt reduction.",
        "category": "Engineering Leadership & Communication",
        "hint": "Demonstrate business-aligned communication, risk quantification, and phased milestone delivery.",
        "timeLimitSeconds": 180
    }
]

@router.post("/start")
async def start_session(config: StartInterviewRequest, current_user: dict = Depends(get_current_user)):
    session_id = f"int-{uuid.uuid4().hex[:8]}"
    
    session = {
        "sessionId": session_id,
        "role": config.role,
        "experience": config.experience,
        "interviewType": config.interviewType,
        "difficulty": config.difficulty,
        "duration": config.duration,
        "currentQuestionIndex": 0,
        "answers": [],
        "startedAt": datetime.utcnow().isoformat(),
        "status": "in_progress"
    }
    
    MOCK_SESSIONS_DB[session_id] = session
    
    first_q = QUESTIONS_POOL[0]
    return {
        "sessionId": session_id,
        "role": config.role,
        "firstQuestion": InterviewQuestion(**first_q),
        "totalQuestions": len(QUESTIONS_POOL)
    }

@router.get("/{sessionId}/question", response_model=InterviewQuestion)
async def get_question(sessionId: str, current_user: dict = Depends(get_current_user)):
    session = MOCK_SESSIONS_DB.get(sessionId)
    if not session:
        # Fallback default for demo flow
        return InterviewQuestion(**QUESTIONS_POOL[0])
        
    index = session["currentQuestionIndex"]
    if index >= len(QUESTIONS_POOL):
        index = len(QUESTIONS_POOL) - 1
        
    return InterviewQuestion(**QUESTIONS_POOL[index])

@router.post("/{sessionId}/answer")
async def submit_answer(sessionId: str, req: SubmitAnswerRequest, current_user: dict = Depends(get_current_user)):
    session = MOCK_SESSIONS_DB.get(sessionId, {
        "sessionId": sessionId,
        "currentQuestionIndex": 0,
        "answers": []
    })
    
    current_q_text = QUESTIONS_POOL[min(session["currentQuestionIndex"], len(QUESTIONS_POOL) - 1)]["text"]
    feedback_data = await ai_service.evaluate_interview_response(current_q_text, req.answer)
    
    session["answers"].append({
        "questionId": req.questionId,
        "answer": req.answer,
        "feedback": feedback_data
    })
    session["currentQuestionIndex"] += 1
    MOCK_SESSIONS_DB[sessionId] = session
    
    has_next = session["currentQuestionIndex"] < len(QUESTIONS_POOL)
    next_question = InterviewQuestion(**QUESTIONS_POOL[session["currentQuestionIndex"]]) if has_next else None
    
    return {
        "feedback": AnswerFeedback(
            questionId=req.questionId,
            score=feedback_data["score"],
            clarityScore=feedback_data["clarityScore"],
            technicalDepthScore=feedback_data["technicalDepthScore"],
            structureScore=feedback_data["structureScore"],
            feedback=feedback_data["feedback"],
            keyHighlights=feedback_data["keyHighlights"],
            missedPoints=feedback_data["missedPoints"],
            improvedAnswerOutline=feedback_data["improvedAnswerOutline"]
        ),
        "hasNext": has_next,
        "nextQuestion": next_question
    }

@router.post("/{sessionId}/end")
async def end_session(sessionId: str, current_user: dict = Depends(get_current_user)):
    if sessionId in MOCK_SESSIONS_DB:
        MOCK_SESSIONS_DB[sessionId]["status"] = "completed"
    return {"message": "Session completed successfully"}

@router.get("/{sessionId}/results", response_model=InterviewSessionResult)
async def get_results(sessionId: str, current_user: dict = Depends(get_current_user)):
    session = MOCK_SESSIONS_DB.get(sessionId, {})
    role = session.get("role", "Senior Full-Stack Engineer")
    difficulty = session.get("difficulty", "Hard")
    
    return InterviewSessionResult(
        sessionId=sessionId,
        role=role,
        difficulty=difficulty,
        overallScore=88,
        breakdown=InterviewResultScoreBreakdown(
            technicalAccuracy=90,
            systemDesignClarity=86,
            communicationConfidence=88,
            problemSolvingVelocity=84,
            codeStructure=92
        ),
        strengths=[
            "Excellent understanding of distributed locking and Redis sliding-window algorithms.",
            "Structured responses adhering to the STAR methodology with explicit metrics.",
            "Strong communication of technical trade-offs between eventual vs strong consistency."
        ],
        growthOpportunities=[
            "Incorporate proactive failure modes (circuit breakers, dead letter queues) earlier in architectural discussions.",
            "Quantify database index memory overhead during scaling justifications."
        ],
        aiSummary="Candidate performed in the top 8% of Senior Engineering benchmarks. Clear communication, deep technical grounding, and pragmatic engineering trade-offs.",
        completedAt=datetime.utcnow().isoformat(),
        durationMinutes=24
    )

@router.get("/sessions")
async def get_all_sessions(current_user: dict = Depends(get_current_user)):
    return [
        {
            "sessionId": "int-demo-1",
            "role": "Senior Full-Stack Engineer",
            "difficulty": "Hard",
            "score": 88,
            "date": "2 days ago",
            "questionsCount": 5
        },
        {
            "sessionId": "int-demo-2",
            "role": "Distributed Systems Engineer",
            "difficulty": "Expert",
            "score": 82,
            "date": "1 week ago",
            "questionsCount": 6
        }
    ]
