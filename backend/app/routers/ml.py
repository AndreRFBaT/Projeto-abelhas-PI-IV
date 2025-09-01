from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from ..schemas import PredictionRequest, PredictionResponse, TrainMetrics
from ..ml import model_manager

router = APIRouter(prefix="/api", tags=["ml"])

@router.post("/treinar", response_model=TrainMetrics)
def treinar(db: Session = Depends(get_db)):
    """Treina o modelo de Machine Learning com os dados atuais do banco.
    """
    try:
        metrics = model_manager.train(db)
        return metrics
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.post("/predicao", response_model=PredictionResponse)
def predicao(body: PredictionRequest, db: Session = Depends(get_db)):
    """Retorna a predição de atividade alta/baixa das abelhas com base em:
    temperatura, umidade, poluição e ruído.
    """
    try:
        res = model_manager.predict(
            db,
            temperatura=body.temperatura,
            umidade=body.umidade,
            poluicao=body.poluicao,
            ruido_db=getattr(body, "ruido_db", 50)  # valor default se não vier
        )
        return res
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")
