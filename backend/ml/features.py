import os
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler

def engineer_features(input_path: str, output_path: str, scaler_path: str):
    """
    Loads the cleaned dataset, applies StandardScaler scaling to the features,
    saves the fitted scaler to a joblib file, and exports the ready-to-train dataset.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Cleaned dataset not found at: {input_path}")

    print(f"Loading cleaned dataset from {input_path}...")
    df = pd.read_csv(input_path)

    # 1. Define Features & Target
    feature_cols = [
        "square_footage", "bedrooms", "bathrooms", 
        "neighborhood_rating", "school_rating", 
        "property_age", "lot_size"
    ]
    target_col = "price"

    # Separate features (X) and target (y)
    X = df[feature_cols]
    y = df[target_col]

    # 2. Fit and Apply Scaler
    print("Fitting StandardScaler and scaling features...")
    scaler = StandardScaler()
    X_scaled_array = scaler.fit_transform(X)

    # Convert back to DataFrame to preserve column names
    X_scaled = pd.DataFrame(X_scaled_array, columns=feature_cols, index=df.index)

    # 3. Save Scaler Artifact
    os.makedirs(os.path.dirname(scaler_path), exist_ok=True)
    joblib.dump(scaler, scaler_path)
    print(f"✅ Scaler artifact saved to: {scaler_path}")

    # 4. Save Ready-To-Train DataFrame
    # Recombine scaled features and target
    df_scaled = pd.concat([X_scaled, y], axis=1)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df_scaled.to_csv(output_path, index=False)
    print(f"✅ Scaled ready-to-train dataset saved to: {output_path}")
    print(f"Dataset shape: {df_scaled.shape}")

    # 5. Log Verification Metrics
    print("\nScaling validation (expected mean ≈ 0, std ≈ 1):")
    for col in feature_cols:
        mean_val = df_scaled[col].mean()
        std_val = df_scaled[col].std()
        print(f" - {col:20} -> Mean: {mean_val:.6f}, Std: {std_val:.6f}")

if __name__ == "__main__":
    # Resolve relative paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    clean_csv_path = os.path.join(current_dir, "data", "housing_clean.csv")
    scaled_csv_path = os.path.join(current_dir, "data", "housing_scaled.csv")
    scaler_joblib_path = os.path.join(current_dir, "artifacts", "scaler.joblib")

    engineer_features(clean_csv_path, scaled_csv_path, scaler_joblib_path)
