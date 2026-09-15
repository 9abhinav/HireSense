import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "HireSense API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    DEBUG: bool = True
    
    JWT_SECRET: str = "super_secret_hiresense_jwt_key_change_in_production_2026"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "hiresense_db"
    
    GEMINI_API_KEY: str = ""
    
    CHROMA_PERSIST_DIRECTORY: str = "./chroma_db"
    
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
