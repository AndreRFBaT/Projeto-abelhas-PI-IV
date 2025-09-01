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

     # novos campos para monitoramento de ruído
    ruido_db = Column(Float, nullable=True)
    status_ruido = Column(String(50), nullable=True)