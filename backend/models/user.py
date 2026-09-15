from typing import List, Optional
from pydantic import BaseModel, Field

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    password: str

class ExperienceItem(BaseModel):
    id: Optional[str] = None
    role: str
    company: str
    period: str
    bullets: List[str] = []

class EducationItem(BaseModel):
    id: Optional[str] = None
    degree: str
    institution: str
    period: str
    grade: Optional[str] = None

class ProjectItem(BaseModel):
    id: Optional[str] = None
    name: str
    description: str
    technologies: List[str] = []
    link: Optional[str] = None

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    targetRole: Optional[str] = None
    bio: Optional[str] = None
    skills: Optional[List[str]] = None
    experience: Optional[List[ExperienceItem]] = None
    education: Optional[List[EducationItem]] = None
    projects: Optional[List[ProjectItem]] = None

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    targetRole: Optional[str] = "Software Engineer"
    avatar: Optional[str] = None
    joinedAt: Optional[str] = None

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
