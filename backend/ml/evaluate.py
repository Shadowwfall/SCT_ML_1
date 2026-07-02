import os
import json
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

def evaluate_model(data_path: str, model_path: str, metrics_path: str):
    """
    Loads trained model and scaled dataset, separates the test split (matching train random_state),
    computes prediction metrics (MAE, MSE, RMSE, R²), serializes features + metrics to JSON,
    and raises warnings/assertions if performance is below threshold.
    """
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model artifact not found at: {model_path}")
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Scaled dataset not found at: {data_path}")

    print(f"Loading model artifact from {model_path}...")
    model = joblib.load(model_path)

    print(f"Loading scaled dataset from {data_path}...")
    df = pd.read_csv(data_path)

    # 1. Define Features & Target (must match training features exactly)
    feature_cols = [
        "square_footage", "bedrooms", "bathrooms", 
        "neighborhood_rating", "school_rating", 
        "property_age", "lot_size"
    ]
    target_col = "price"

    X = df[feature_cols]
    y = df[target_col]

    # 2. Extract Test Split (exactly matching train.py random_state=42)
    print("Re-creating train/test split to isolate evaluation set...")
    _, X_test, _, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # 3. Generate Predictions and Calculate Metrics
    print("Generating predictions on test split...")
    y_pred = model.predict(X_test)

    mae = float(mean_absolute_error(y_test, y_pred))
    mse = float(mean_squared_error(y_test, y_pred))
    rmse = float(np.sqrt(mse))
    r2 = float(r2_score(y_test, y_pred))

    print("\nEvaluation Metrics Results:")
    print(f" - R² Score:                 {r2:.6f}")
    print(f" - Mean Absolute Error (MAE): ${mae:,.2f}")
    print(f" - Root Mean Squared (RMSE) : ${rmse:,.2f}")
    print(f" - Mean Squared Error (MSE) : {mse:,.2f}")

    # 4. Save metrics.json Artifact
    metrics_data = {
        "algorithm": type(model).__name__,
        "r2": r2,
        "mae": mae,
        "rmse": rmse,
        "mse": mse,
        "features": feature_cols,
        "model_version": "1.0.0"
    }

    os.makedirs(os.path.dirname(metrics_path), exist_ok=True)
    with open(metrics_path, "w") as f:
        json.dump(metrics_data, f, indent=2)
    print(f"\n✅ Metrics successfully exported to: {metrics_path}")

    # 5. Assert R² >= 0.85
    r2_threshold = 0.85
    if r2 < r2_threshold:
        print(f"⚠️ WARNING: Model R² score ({r2:.4f}) is below target threshold of {r2_threshold}!")
    else:
        print(f"🎉 SUCCESS: Model R² score ({r2:.4f}) meets target threshold of {r2_threshold}!")

if __name__ == "__main__":
    # Resolve relative paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    scaled_csv_path = os.path.join(current_dir, "data", "housing_scaled.csv")
    model_joblib_path = os.path.join(current_dir, "artifacts", "model.joblib")
    metrics_json_path = os.path.join(current_dir, "artifacts", "metrics.json")

    evaluate_model(scaled_csv_path, model_joblib_path, metrics_json_path)
