"""
db.py
=====

Sets up the database connection and session management for the Abelhas IoT+ML backend using SQLAlchemy and SQLite.

Main Components
---------------

- Database Path and URL: Constructs the absolute path to data.db and sets the SQLAlchemy database URL for SQLite.
- Engine and Session:
    - engine: SQLAlchemy engine for database connection.
    - SessionLocal: Factory for creating new database sessions.
    - Base: Declarative base for model definitions.
- Dependency:
    - get_db(): FastAPI dependency that provides a database session and ensures it is closed after use.

Usage
-----

Import Base to define ORM models.
Use get_db as a dependency in FastAPI routes to access the database session.

Dependencies
------------

os, sqlalchemy
"""
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
