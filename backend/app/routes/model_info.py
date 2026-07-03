import os
import json
from fastapi import APIRouter, HTTPException
from app.models.schemas import ModelInfoResponse
from app.services.prediction import model

router = APIRouter(
    prefix="/model-info",
    tags=["Model Info"]
)

# Construct absolute path to metrics.json
_current_dir = os.path.dirname(os.path.abspath(__file__))
_metrics_path = os.path.join(_current_dir, "..", "..", "ml", "artifacts", "metrics.json")

@router.get("", response_model=ModelInfoResponse)
async def get_model_info():
    """
    Retrieve model metrics and feature coefficients.
    """
    # 1. Verify model is loaded
    if model is None:
        raise HTTPException(
            status_code=500,
            detail="Model is not loaded on the server. Please ensure model training (T-11) has completed successfully."
        )

    # 2. Verify metrics file exists
    if not os.path.exists(_metrics_path):
        raise HTTPException(
            status_code=404,
            detail="Model metrics file (metrics.json) not found. Please run the model evaluation script."
        )

    # 3. Read metrics.json and compile response
    try:
        with open(_metrics_path, "r") as f:
            metrics = json.load(f)
            
        features = metrics.get("features", [])
        
        # Calculate coefficients mapping (features mapped to model coefficients)
        # model.coef_ is a 1D array of coefficients matching the training features order
        coef_dict = {
            feature: float(coef) 
            for feature, coef in zip(features, model.coef_)
        }
        
        intercept = float(model.intercept_)

        return ModelInfoResponse(
            algorithm=metrics.get("algorithm", "LinearRegression"),
            r2=metrics.get("r2", 0.0),
            mae=metrics.get("mae", 0.0),
            rmse=metrics.get("rmse", 0.0),
            mse=metrics.get("mse", 0.0),
            features=features,
            model_version=metrics.get("model_version", "1.0.0"),
            coefficients=coef_dict,
            intercept=intercept
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve model info: {str(e)}"
        )
