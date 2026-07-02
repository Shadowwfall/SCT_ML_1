import os
import pandas as pd
import numpy as np

def preprocess_data(input_path: str, output_path: str):
    """
    Reads raw housing data, validates column types, handles missing values,
    removes outliers using the IQR method, and exports the clean dataset.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input file not found at: {input_path}")

    print(f"Loading raw data from {input_path}...")
    df = pd.read_csv(input_path)
    print(f"Original dataset shape: {df.shape}")

    # 1. Validate Columns & Data Types
    required_columns = [
        "square_footage", "bedrooms", "bathrooms", 
        "neighborhood_rating", "school_rating", 
        "property_age", "lot_size", "price"
    ]

    for col in required_columns:
        if col not in df.columns:
            raise ValueError(f"Required column '{col}' is missing from raw dataset.")

    # Cast all target features to numeric type defensively
    for col in required_columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')

    # 2. Impute Missing Values
    missing_count = df.isnull().sum()
    print("Missing value counts per column before imputation:")
    print(missing_count)

    if missing_count.sum() > 0:
        print("Handling missing values using median imputation...")
        for col in required_columns:
            if df[col].isnull().any():
                median_val = df[col].median()
                df[col] = df[col].fillna(median_val)
    else:
        print("No missing values found.")

    # 3. Detect and Remove Outliers
    # Outlier detection is applied to continuous variables that might skew regression models
    outlier_cols = ["square_footage", "lot_size", "price"]
    initial_row_count = len(df)
    
    print("Detecting outliers using the Interquartile Range (IQR) method...")
    for col in outlier_cols:
        q1 = df[col].quantile(0.25)
        q3 = df[col].quantile(0.75)
        iqr = q3 - q1
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        
        # Filter outliers
        df = df[(df[col] >= lower_bound) & (df[col] <= upper_bound)]
        
    removed_rows = initial_row_count - len(df)
    print(f"Outlier cleaning complete. Removed {removed_rows} rows ({(removed_rows/initial_row_count)*100:.2f}% of raw data).")
    print(f"Cleaned dataset shape: {df.shape}")

    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # 4. Save cleaned CSV
    df.to_csv(output_path, index=False)
    print(f"✅ Cleaned data exported successfully to: {output_path}")

if __name__ == "__main__":
    # Resolve paths relative to this script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    raw_csv_path = os.path.join(current_dir, "data", "housing.csv")
    cleaned_csv_path = os.path.join(current_dir, "data", "housing_clean.csv")

    preprocess_data(raw_csv_path, cleaned_csv_path)
