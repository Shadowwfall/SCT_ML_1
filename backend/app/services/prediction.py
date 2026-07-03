import os
import joblib
import pandas as pd
from app.models.schemas import PredictionRequest

# Construct absolute paths to model artifacts
_current_dir = os.path.dirname(os.path.abspath(__file__))
_artifacts_dir = os.path.join(_current_dir, "..", "..", "ml", "artifacts")

MODEL_PATH = os.path.join(_artifacts_dir, "model.joblib")
SCALER_PATH = os.path.join(_artifacts_dir, "scaler.joblib")

model = None
scaler = None

# Attempt to load model and scaler on module import
try:
    if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        print("✅ Prediction service initialized with trained model and scaler.")
    else:
        print("⚠️ Model or scaler not found. Please run the ML pipeline (T-11).")
except Exception as e:
    print(f"⚠️ Error loading model/scaler: {e}")

def predict(request: PredictionRequest) -> float:
    """
    Takes a PredictionRequest, scales the features, and returns the predicted price.
    """
    if model is None or scaler is None:
        raise RuntimeError("Model or scaler not loaded. Cannot make prediction.")
        
    # The order of features must exactly match what was used during training (in features.py)
    # The pandas DataFrame will maintain this dictionary's key order
    input_data = {
        "square_footage": [request.square_footage],
        "bedrooms": [request.bedrooms],
        "bathrooms": [request.bathrooms],
        "neighborhood_rating": [request.neighborhood_rating],
        "school_rating": [request.school_rating],
        "property_age": [request.property_age],
        "lot_size": [request.lot_size]
    }
    
    df = pd.DataFrame(input_data)
    
    # Scale features (returns numpy array)
    scaled_array = scaler.transform(df)
    
    # Convert back to DataFrame to preserve feature names for the model
    df_scaled = pd.DataFrame(scaled_array, columns=df.columns)
    
    # Predict (model returns a numpy array like [price])
    predicted_price = model.predict(df_scaled)[0]
    
    return float(predicted_price)
