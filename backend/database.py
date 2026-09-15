import logging
from config import settings

logger = logging.getLogger("hiresense.database")

class Database:
    client = None
    db = None
    is_connected: bool = False

db_instance = Database()

async def connect_to_mongo():
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        logger.info(f"Connecting to MongoDB at {settings.MONGODB_URL}...")
        db_instance.client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=2000
        )
        # Verify connection
        await db_instance.client.admin.command('ping')
        db_instance.db = db_instance.client[settings.DATABASE_NAME]
        db_instance.is_connected = True
        logger.info("Successfully connected to MongoDB.")
    except Exception as e:
        logger.info("MongoDB not connected. Operating in high-speed local memory mode.")
        db_instance.is_connected = False
        db_instance.db = None

async def close_mongo_connection():
    if db_instance.client:
        logger.info("Closing MongoDB connection...")
        db_instance.client.close()
        db_instance.is_connected = False
        logger.info("MongoDB connection closed.")

def get_database():
    return db_instance.db
