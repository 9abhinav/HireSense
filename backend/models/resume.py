from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from datetime import datetime

class KeywordAnalysis(BaseModel):
    category: str
    missing: List[str] = []
    found: List[str] = []

class SectionScore(BaseModel):
    name: str
    score: int
    status: str
    feedback: str

class AIInsight(BaseModel):
    id: str
    type: str  # 'critical' | 'improvement' | 'strength'
    section: str
    message: str
    before: Optional[str] = None
    after: Optional[str] = None
    applied: bool = False

class ATSAnalysisResult(BaseModel):
    resumeId: str
    overallScore: int
    atsCompatibility: int
    keywordCoverage: int
    impactMetrics: int
    formatReadability: int
    brevityStructure: int
    summary: str
    sectionBreakdowns: List[SectionScore] = []
    missingKeywords: List[Dict[str, Any]] = []
    insights: List[AIInsight] = []
    analyzedAt: str

class ResumeVersion(BaseModel):
    id: str
    userId: Optional[str] = None
    title: str
    targetRole: str
    atsScore: int
    lastModified: str
    fileSize: Optional[str] = "142 KB"
    isPrimary: bool = False
    content: Optional[str] = None
    rawText: Optional[str] = None

class CreateVersionRequest(BaseModel):
    title: str
    targetRole: str
    content: Optional[str] = None

class ResumeUploadResponse(BaseModel):
    resumeId: str
    filename: str
    parsedText: str
    wordCount: int
    summary: str
