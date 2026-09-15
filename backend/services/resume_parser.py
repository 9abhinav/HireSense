import io
import re
from typing import Dict, Any, List

class ResumeParser:
    @staticmethod
    def extract_text_from_pdf(pdf_bytes: bytes) -> str:
        try:
            from pypdf import PdfReader
            reader = PdfReader(io.BytesIO(pdf_bytes))
            text = ""
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
            return text.strip()
        except ImportError:
            # Fallback for plain text extraction
            try:
                return pdf_bytes.decode("utf-8", errors="ignore")
            except Exception:
                return "Extracted resume content."
        except Exception as e:
            return f"Error extracting PDF: {str(e)}"

    @staticmethod
    def parse_structure(text: str) -> Dict[str, Any]:
        """Extract basic sections from resume text using heuristic analysis"""
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        
        sections = {
            "skills": [],
            "experience": [],
            "education": [],
            "projects": [],
            "word_count": len(text.split()),
            "character_count": len(text)
        }
        
        # Common skill keywords to look for
        skill_catalog = [
            "python", "javascript", "typescript", "react", "node.js", "fastapi", "express",
            "docker", "kubernetes", "aws", "gcp", "azure", "mongodb", "postgresql", "redis",
            "graphql", "rest api", "git", "ci/cd", "microservices", "html", "css", "tailwind",
            "sql", "nosql", "linux", "c++", "java", "golang", "machine learning", "pytorch"
        ]
        
        lower_text = text.lower()
        found_skills = [skill.title() for skill in skill_catalog if re.search(r'\b' + re.escape(skill) + r'\b', lower_text)]
        sections["skills"] = list(set(found_skills))
        
        return sections

resume_parser = ResumeParser()
