from pydantic import BaseModel, Field
from typing import Dict, List

class PredictionRequest(BaseModel):
    """Schema for the property prediction request."""
    square_footage: float = Field(..., gt=0, description="Total Living Area in Square Feet")
    bedrooms: float = Field(..., ge=0, description="Number of Bedrooms")
    bathrooms: float = Field(..., ge=0, description="Number of Bathrooms")
    neighborhood_rating: float = Field(..., ge=1, le=10, description="Neighborhood Quality Rating (1-10)")
    school_rating: float = Field(..., ge=1, le=10, description="School District Rating (1-10)")
    property_age: float = Field(..., ge=0, description="Property Age in Years")
    lot_size: float = Field(..., gt=0, description="Lot Size in Square Feet")

class PredictionResponse(BaseModel):
    """Schema for the property prediction response."""
    estimated_price: float = Field(..., description="The estimated house price")
    input_summary: Dict[str, float] = Field(..., description="Summary of the input values")
    model_version: str = Field(..., description="Version of the model used for prediction")

class ModelInfoResponse(BaseModel):
    """Schema for the model metrics and coefficients response."""
    algorithm: str = Field(..., description="Machine learning algorithm name")
    r2: float = Field(..., description="R-squared score")
    mae: float = Field(..., description="Mean Absolute Error")
    rmse: float = Field(..., description="Root Mean Squared Error")
    mse: float = Field(..., description="Mean Squared Error")
    features: List[str] = Field(..., description="List of feature names")
    model_version: str = Field(..., description="Model version")
    coefficients: Dict[str, float] = Field(..., description="Feature regression coefficients")
    intercept: float = Field(..., description="Regression model intercept")
    scaler_mean: Dict[str, float] = Field(default={}, description="Scaler mean values for features")
    scaler_scale: Dict[str, float] = Field(default={}, description="Scaler scale (std dev) values for features")


