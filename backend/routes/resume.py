import uuid
from datetime import datetime
from typing import List
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from models.resume import (
    ResumeUploadResponse, ATSAnalysisResult, ResumeVersion, CreateVersionRequest
)
from services.resume_parser import resume_parser
from services.ai_service import ai_service
from middleware.auth import get_current_user

router = APIRouter(prefix="/resume", tags=["Resume Intelligence"])

# In-memory storage for rapid session state
MOCK_RESUMES_DB = {}
MOCK_ANALYSES_DB = {}
MOCK_VERSIONS_DB = [
    {
        "id": "v-1",
        "title": "Full-Stack Engineer (Senior)",
        "targetRole": "Senior Full-Stack Engineer",
        "atsScore": 92,
        "lastModified": "2 hours ago",
        "fileSize": "148 KB",
        "isPrimary": True
    },
    {
        "id": "v-2",
        "title": "Backend Distributed Systems",
        "targetRole": "Backend Engineer",
        "atsScore": 87,
        "lastModified": "3 days ago",
        "fileSize": "135 KB",
        "isPrimary": False
    },
    {
        "id": "v-3",
        "title": "AI & Prompt Engineering Focus",
        "targetRole": "AI Application Developer",
        "atsScore": 81,
        "lastModified": "1 week ago",
        "fileSize": "152 KB",
        "isPrimary": False
    }
]

@router.post("/upload", response_model=ResumeUploadResponse)
async def upload_resume(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    contents = await file.read()
    filename = file.filename or "resume.pdf"
    
    if filename.lower().endswith(".pdf"):
        text = resume_parser.extract_text_from_pdf(contents)
    else:
        try:
            text = contents.decode("utf-8", errors="ignore")
        except Exception:
            text = "Uploaded resume content text."
            
    resume_id = f"res-{uuid.uuid4().hex[:8]}"
    word_count = len(text.split())
    
    parsed_info = resume_parser.parse_structure(text)
    skills_found = ", ".join(parsed_info.get("skills", [])[:5])
    summary = f"Parsed {word_count} words successfully. Key skills detected: {skills_found or 'React, Python, Cloud'}."
    
    MOCK_RESUMES_DB[resume_id] = {
        "id": resume_id,
        "filename": filename,
        "raw_text": text,
        "word_count": word_count,
        "uploaded_at": datetime.utcnow().isoformat()
    }
    
    return ResumeUploadResponse(
        resumeId=resume_id,
        filename=filename,
        parsedText=text[:500] + ("..." if len(text) > 500 else ""),
        wordCount=word_count,
        summary=summary
    )

@router.post("/{resumeId}/analyze", response_model=ATSAnalysisResult)
async def analyze_resume(resumeId: str, current_user: dict = Depends(get_current_user)):
    resume_text = MOCK_RESUMES_DB.get(resumeId, {}).get("raw_text", "Senior Full-Stack Engineer resume text with React, Python, FastAPI, Docker, and PostgreSQL.")
    
    analysis_data = await ai_service.analyze_resume_ats(resume_text)
    
    result = ATSAnalysisResult(
        resumeId=resumeId,
        overallScore=analysis_data["overallScore"],
        atsCompatibility=analysis_data["atsCompatibility"],
        keywordCoverage=analysis_data["keywordCoverage"],
        impactMetrics=analysis_data["impactMetrics"],
        formatReadability=analysis_data["formatReadability"],
        brevityStructure=analysis_data["brevityStructure"],
        summary=analysis_data["summary"],
        sectionBreakdowns=analysis_data["sectionBreakdowns"],
        missingKeywords=analysis_data["missingKeywords"],
        insights=analysis_data["insights"],
        analyzedAt=datetime.utcnow().isoformat()
    )
    
    MOCK_ANALYSES_DB[resumeId] = result
    return result

@router.get("/{resumeId}/analysis", response_model=ATSAnalysisResult)
async def get_resume_analysis(resumeId: str, current_user: dict = Depends(get_current_user)):
    if resumeId in MOCK_ANALYSES_DB:
        return MOCK_ANALYSES_DB[resumeId]
    
    # Generate on demand if not yet cached
    return await analyze_resume(resumeId, current_user)

@router.get("/versions", response_model=List[ResumeVersion])
async def get_resume_versions(current_user: dict = Depends(get_current_user)):
    return [ResumeVersion(**v) for v in MOCK_VERSIONS_DB]

@router.post("/versions", response_model=ResumeVersion)
async def create_resume_version(data: CreateVersionRequest, current_user: dict = Depends(get_current_user)):
    new_version = {
        "id": f"v-{uuid.uuid4().hex[:6]}",
        "title": data.title,
        "targetRole": data.targetRole,
        "atsScore": 85,
        "lastModified": "Just now",
        "fileSize": "140 KB",
        "isPrimary": False,
        "content": data.content
    }
    MOCK_VERSIONS_DB.append(new_version)
    return ResumeVersion(**new_version)

@router.delete("/versions/{versionId}")
async def delete_resume_version(versionId: str, current_user: dict = Depends(get_current_user)):
    global MOCK_VERSIONS_DB
    MOCK_VERSIONS_DB = [v for v in MOCK_VERSIONS_DB if v["id"] != versionId]
    return {"message": "Version deleted successfully"}

@router.post("/versions/{versionId}/duplicate", response_model=ResumeVersion)
async def duplicate_resume_version(versionId: str, current_user: dict = Depends(get_current_user)):
    original = next((v for v in MOCK_VERSIONS_DB if v["id"] == versionId), None)
    if not original:
        raise HTTPException(status_code=404, detail="Version not found")
        
    duplicated = {
        "id": f"v-{uuid.uuid4().hex[:6]}",
        "title": f"{original['title']} (Copy)",
        "targetRole": original["targetRole"],
        "atsScore": original["atsScore"],
        "lastModified": "Just now",
        "fileSize": original["fileSize"],
        "isPrimary": False
    }
    MOCK_VERSIONS_DB.append(duplicated)
    return ResumeVersion(**duplicated)
