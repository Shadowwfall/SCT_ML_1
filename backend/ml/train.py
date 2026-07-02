import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

def train_model(input_path: str, model_path: str):
    """
    Loads preprocessed and scaled data, performs an 80/20 train-test split,
    trains a LinearRegression model, and saves the model artifact.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Scaled dataset not found at: {input_path}")

    print(f"Loading scaled dataset from {input_path}...")
    df = pd.read_csv(input_path)

    # 1. Define Features & Target
    feature_cols = [
        "square_footage", "bedrooms", "bathrooms", 
        "neighborhood_rating", "school_rating", 
        "property_age", "lot_size"
    ]
    target_col = "price"

    X = df[feature_cols]
    y = df[target_col]

    # 2. Perform 80/20 Train-Test Split
    print("Splitting dataset into train and test sets (80/20 split, random_state=42)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    print(f"Train size: {X_train.shape[0]} samples")
    print(f"Test size: {X_test.shape[0]} samples")

    # 3. Train Model
    print("Training Linear Regression model...")
    model = LinearRegression()
    model.fit(X_train, y_train)

    # 4. Save Model Artifact
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(model, model_path)
    print(f"✅ Model artifact saved to: {model_path}")

    # 5. Log Coefficients & Basic Metrics
    print("\nModel Coefficients:")
    for col, coef in zip(feature_cols, model.coef_):
        print(f" - {col:20} : {coef:.2f}")
    print(f" - Intercept            : {model.intercept_:.2f}")

    train_r2 = model.score(X_train, y_train)
    test_r2 = model.score(X_test, y_test)
    print(f"\nTraining score (R²): {train_r2:.4f}")
    print(f"Testing score (R²): {test_r2:.4f}")

if __name__ == "__main__":
    # Resolve relative paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    scaled_csv_path = os.path.join(current_dir, "data", "housing_scaled.csv")
    model_joblib_path = os.path.join(current_dir, "artifacts", "model.joblib")

    train_model(scaled_csv_path, model_joblib_path)
