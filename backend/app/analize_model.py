import joblib
import numpy as np

# Caminho do modelo
MODEL_PATH = "./model.pkl"

# Lista das features usadas no treino (do seu código)
feature_cols = [
    "temperatura", "umidade", "poluicao", "ruido_db",
    "delta_abelhas", "media_movel_3", "media_movel_5", "media_movel_10",
    "indice_estresse", "delta_temperatura", "delta_umidade", "delta_poluicao", "delta_ruido"
]

def main():
    try:
        model = joblib.load(MODEL_PATH)
        print(f"\n✅ Modelo carregado com sucesso: {type(model)}\n")

        print("🔧 Hiperparâmetros:")
        for k, v in model.get_params().items():
            print(f"  {k}: {v}")

        print("\n📊 Importância das features:")
        if hasattr(model, "feature_importances_"):
            importancias = model.feature_importances_
            for nome, valor in zip(feature_cols, importancias):
                print(f"  {nome:20}: {valor:.4f}")
        else:
            print("  Este modelo não possui importâncias de features.")

        print("\n🤖 Predição com dados fictícios:")
        # Dados fictícios (substitua conforme seu domínio)
        X = np.array([[30.0, 60.0, 80.0, 55.0, 0.0, 52.0, 50.0, 48.0, 
                       2400.0, 1.0, -2.0, 5.0, -1.0]])
        pred = model.predict(X)[0]
        proba = model.predict_proba(X)[0][1] if hasattr(model, "predict_proba") else None
        print(f"  Classe prevista       : {pred}")
        print(f"  Probabilidade 'Alta'  : {proba:.4f}" if proba is not None else "  Modelo não fornece probabilidades.")

    except FileNotFoundError:
        print(f"❌ Arquivo {MODEL_PATH} não encontrado.")
    except Exception as e:
        print(f"❌ Erro ao carregar ou interpretar o modelo: {e}")

if __name__ == "__main__":
    main()
