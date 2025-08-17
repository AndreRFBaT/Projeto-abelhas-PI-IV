import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

def treinar_modelo(caminho_dados="../../data/abelhas.csv"):
    df = pd.read_csv(caminho_dados)

    X = df[["temperatura", "umidade", "poluicao"]]
    y = df["atividade_alta"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    modelo = RandomForestClassifier(n_estimators=100, random_state=42)
    modelo.fit(X_train, y_train)

    y_pred = modelo.predict(X_test)
    acc = accuracy_score(y_test, y_pred)

    print(f"🎯 Acurácia do modelo: {acc:.2f}")
    return modelo

if __name__ == "__main__":
    treinar_modelo()
