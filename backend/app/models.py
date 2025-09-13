"""
models.py
=========

Defines the SQLAlchemy ORM model for bee sensor data records in the Abelhas IoT+ML backend.

Main Components
---------------

- BeeRecord:
    - Table name: abelhas_data
    - Fields:
        - id: Primary key, integer, indexed.
        - timestamp: Date and time of record (default: now, indexed).
        - temperatura: Temperature (float, required).
        - umidade: Humidity (float, required).
        - poluicao: Pollution level (float, required).
        - abelhas_ativas: Number of active bees (integer, required).
        - atividade_alta: Activity flag (integer, 0/1, required).
        - atividade: Activity description (string, required).
        - ruido_db: Noise level in dB (float, optional).
        - status_ruido: Noise status description (string, optional).

Usage
-----

Import BeeRecord to interact with bee sensor data in the database.
Use with SQLAlchemy sessions for CRUD operations.

Dependencies
------------

sqlalchemy, app.db
"""
from sqlalchemy import Column, Integer, Float, String, DateTime, func
from .db import Base

class BeeRecord(Base):
    __tablename__ = "abelhas_data"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    temperatura = Column(Float, nullable=False)
    umidade = Column(Float, nullable=False)
    poluicao = Column(Float, nullable=False)
    abelhas_ativas = Column(Integer, nullable=False)
    atividade_alta = Column(Integer, nullable=False)  # 0/1
    atividade = Column(String(10), nullable=False)

     # new fields for noise data
    ruido_db = Column(Float, nullable=True)
    status_ruido = Column(String(50), nullable=True)