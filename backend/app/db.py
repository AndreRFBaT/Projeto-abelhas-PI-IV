import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # backend/app
DB_PATH = os.path.join(BASE_DIR, "..", "data.db")      # backend/data.db
DB_PATH = os.path.abspath(DB_PATH)                     # caminho absoluto
DATABASE_URL = f"sqlite:///{DB_PATH}"

connect_args = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, echo=False, future=True, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, future=True)
Base = declarative_base()

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
