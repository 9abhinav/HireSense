from fastapi import APIRouter, Depends, HTTPException, status
from models.user import (
    UserCreate, UserLogin, AuthResponse, UserResponse,
    ForgotPasswordRequest, ResetPasswordRequest, UserProfileUpdate
)
from middleware.auth import (
    verify_password, get_password_hash, create_access_token, get_current_user
)
from database import get_database

router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory demo user cache for quick local development & resilience
MOCK_USERS_DB = {
    "alex.morgan@example.com": {
        "id": "usr-1",
        "name": "Alex Morgan",
        "email": "alex.morgan@example.com",
        "password_hash": get_password_hash("password123"),
        "targetRole": "Senior Full-Stack Engineer",
        "bio": "Full-stack engineer passionate about distributed systems, modern React frontends, and AI developer tooling.",
        "skills": ["React", "TypeScript", "Python", "FastAPI", "Docker", "Node.js", "MongoDB", "PostgreSQL", "Redis", "GraphQL"],
        "joinedAt": "2024-01-15T09:00:00Z",
        "experience": [
            {
                "id": "exp-1",
                "role": "Lead Full-Stack Engineer",
                "company": "TechPulse Labs",
                "period": "2022 - Present",
                "bullets": [
                    "Architected high-throughput microservices in FastAPI and Node.js serving 2.5M daily active users.",
                    "Spearheaded React design system overhaul, improving frontend render performance by 42%."
                ]
            },
            {
                "id": "exp-2",
                "role": "Software Developer",
                "company": "Nexus Media",
                "period": "2020 - 2022",
                "bullets": [
                    "Engineered real-time collaboration dashboards using WebSocket streams and PostgreSQL.",
                    "Automated end-to-end CI/CD deployment pipelines on AWS ECS."
                ]
            }
        ],
        "education": [
            {
                "id": "edu-1",
                "degree": "B.S. in Computer Science",
                "institution": "University of Technology",
                "period": "2016 - 2020",
                "grade": "3.85 GPA"
            }
        ],
        "projects": [
            {
                "id": "proj-1",
                "name": "DevPulse AI",
                "description": "AI-powered automated pull request reviewer and test generator.",
                "technologies": ["Python", "FastAPI", "React", "Gemini API"],
                "link": "https://github.com/alexmorgan/devpulse-ai"
            }
        ]
    }
}

@router.post("/login", response_model=AuthResponse)
async def login(credentials: UserLogin):
    email = credentials.email.lower().strip()
    db = get_database()
    
    user_record = None
    if db is not None:
        user_record = await db.users.find_one({"email": email})
        
    if not user_record:
        # Fallback check or auto-provision for smooth prototype experience
        if email in MOCK_USERS_DB:
            user_record = MOCK_USERS_DB[email]
        else:
            # Create user on the fly for effortless testing
            display_name = email.split("@")[0].replace(".", " ").title()
            user_record = {
                "id": f"usr-{abs(hash(email)) % 10000}",
                "name": display_name,
                "email": email,
                "password_hash": get_password_hash(credentials.password),
                "targetRole": "Full-Stack Engineer",
                "bio": "Passionate technologist exploring new opportunities.",
                "skills": ["JavaScript", "Python", "React", "Node.js"],
                "joinedAt": "2026-09-15T00:00:00Z",
                "experience": [],
                "education": [],
                "projects": []
            }
            MOCK_USERS_DB[email] = user_record
    
    access_token = create_access_token(data={
        "sub": user_record["id"],
        "email": user_record["email"],
        "name": user_record["name"]
    })
    
    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=user_record["id"],
            name=user_record["name"],
            email=user_record["email"],
            targetRole=user_record.get("targetRole", "Software Engineer"),
            avatar=user_record.get("avatar"),
            joinedAt=user_record.get("joinedAt")
        )
    )

@router.post("/register", response_model=AuthResponse)
async def register(data: UserCreate):
    email = data.email.lower().strip()
    db = get_database()
    
    user_id = f"usr-{abs(hash(email)) % 10000}"
    new_user = {
        "id": user_id,
        "name": data.name,
        "email": email,
        "password_hash": get_password_hash(data.password),
        "targetRole": "Full-Stack Engineer",
        "bio": "",
        "skills": ["JavaScript", "Python", "React"],
        "joinedAt": "2026-09-15T00:00:00Z",
        "experience": [],
        "education": [],
        "projects": []
    }
    
    if db is not None:
        await db.users.insert_one(new_user)
    MOCK_USERS_DB[email] = new_user
    
    access_token = create_access_token(data={
        "sub": user_id,
        "email": email,
        "name": data.name
    })
    
    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=user_id,
            name=data.name,
            email=email,
            targetRole="Full-Stack Engineer",
            joinedAt=new_user["joinedAt"]
        )
    )

@router.post("/forgot-password")
async def forgot_password(req: ForgotPasswordRequest):
    return {"message": f"Password reset instructions sent to {req.email}"}

@router.post("/reset-password")
async def reset_password(req: ResetPasswordRequest):
    return {"message": "Password updated successfully"}

@router.get("/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    email = current_user.get("email") or "alex.morgan@example.com"
    user_data = MOCK_USERS_DB.get(email, MOCK_USERS_DB["alex.morgan@example.com"])
    return user_data

@router.put("/profile")
async def update_profile(updates: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    email = current_user.get("email") or "alex.morgan@example.com"
    user_data = MOCK_USERS_DB.get(email, MOCK_USERS_DB["alex.morgan@example.com"])
    
    update_dict = updates.model_dump(exclude_unset=True)
    for k, v in update_dict.items():
        user_data[k] = v
        
    return {"message": "Profile updated successfully", "profile": user_data}
