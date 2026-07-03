import os
import json
from fastapi import APIRouter, HTTPException
from app.models.schemas import PredictionRequest, PredictionResponse
from app.services.prediction import predict

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

# Load model version from metrics.json
_current_dir = os.path.dirname(os.path.abspath(__file__))
_metrics_path = os.path.join(_current_dir, "..", "..", "ml", "artifacts", "metrics.json")

model_version = "1.0.0"  # Fallback
if os.path.exists(_metrics_path):
    try:
        with open(_metrics_path, "r") as f:
            metrics = json.load(f)
            model_version = metrics.get("model_version", "1.0.0")
    except Exception as e:
        print(f"⚠️ Failed to read model version from metrics.json: {e}")

@router.post("", response_model=PredictionResponse)
async def predict_price(request: PredictionRequest):
    """
    Predict property price based on 7 input features.
    """
    try:
        # Get estimated price from the prediction service
        estimated_price = predict(request)
        
        # Prepare input summary
        input_summary = {
            "square_footage": request.square_footage,
            "bedrooms": request.bedrooms,
            "bathrooms": request.bathrooms,
            "neighborhood_rating": request.neighborhood_rating,
            "school_rating": request.school_rating,
            "property_age": request.property_age,
            "lot_size": request.lot_size
        }
        
        return PredictionResponse(
            estimated_price=estimated_price,
            input_summary=input_summary,
            model_version=model_version
        )
        
    except RuntimeError as e:
        # Prediction service will throw RuntimeError if model/scaler are not loaded
        raise HTTPException(
            status_code=500,
            detail=f"Model prediction error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred during prediction: {str(e)}"
        )
