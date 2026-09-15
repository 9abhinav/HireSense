from routes.auth import router as auth_router
from routes.resume import router as resume_router
from routes.interview import router as interview_router
from routes.jobs import router as jobs_router
from routes.insights import router as insights_router

__all__ = [
    "auth_router",
    "resume_router",
    "interview_router",
    "jobs_router",
    "insights_router"
]
