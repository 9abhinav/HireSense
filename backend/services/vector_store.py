import os
import logging
from typing import List, Dict, Any, Optional

logger = logging.getLogger("hiresense.vector_store")

class VectorStoreService:
    def __init__(self):
        self.client = None
        self.collection = None
        self._init_chroma()

    def _init_chroma(self):
        try:
            import chromadb
            from chromadb.config import Settings as ChromaSettings
            
            persist_dir = os.path.abspath("./chroma_data")
            os.makedirs(persist_dir, exist_ok=True)
            
            self.client = chromadb.PersistentClient(path=persist_dir)
            self.collection = self.client.get_or_create_collection(
                name="hiresense_job_skills",
                metadata={"hnsw:space": "cosine"}
            )
            logger.info("ChromaDB vector store initialized successfully.")
        except Exception as e:
            logger.warning(f"ChromaDB initialization failed: {e}. Vector search will use heuristic similarity.")
            self.client = None
            self.collection = None

    def add_job_description(self, doc_id: str, text: str, metadata: Optional[Dict[str, Any]] = None):
        if self.collection:
            try:
                self.collection.add(
                    documents=[text],
                    ids=[doc_id],
                    metadatas=[metadata or {}]
                )
            except Exception as e:
                logger.error(f"Error adding to ChromaDB: {e}")

    def query_similar_skills(self, query_text: str, n_results: int = 5) -> List[Dict[str, Any]]:
        if self.collection:
            try:
                results = self.collection.query(
                    query_texts=[query_text],
                    n_results=n_results
                )
                return results
            except Exception as e:
                logger.error(f"Error querying ChromaDB: {e}")
        return []

vector_store = VectorStoreService()
