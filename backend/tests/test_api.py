import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    """
    Test that GET /health returns 200 and 'ok' status.
    """
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_model_info_endpoint():
    """
    Test that GET /model-info returns 200 and matches the expected schema.
    """
    response = client.get("/model-info")
    assert response.status_code == 200
    data = response.json()
    
    # Check that all keys from ModelInfoResponse exist
    expected_keys = {
        "algorithm", "r2", "mae", "rmse", "mse", 
        "features", "model_version", "coefficients", "intercept"
    }
    assert expected_keys.issubset(data.keys())
    
    assert data["algorithm"] == "LinearRegression"
    assert isinstance(data["coefficients"], dict)
    assert len(data["coefficients"]) == len(data["features"])
    assert isinstance(data["intercept"], float)

def test_predict_endpoint_valid_input():
    """
    Test that POST /predict returns 200 and a valid estimation for proper inputs.
    """
    payload = {
        "square_footage": 2100.0,
        "bedrooms": 3.0,
        "bathrooms": 2.0,
        "neighborhood_rating": 8.0,
        "school_rating": 9.0,
        "property_age": 12.0,
        "lot_size": 6500.0
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert "estimated_price" in data
    assert "input_summary" in data
    assert "model_version" in data
    
    assert data["estimated_price"] > 0
    assert data["input_summary"]["square_footage"] == 2100.0
    assert data["input_summary"]["bedrooms"] == 3.0
    assert data["input_summary"]["bathrooms"] == 2.0

def test_predict_endpoint_invalid_inputs():
    """
    Test that POST /predict returns 422 Unprocessable Entity for invalid parameters:
    - negative bedrooms
    - zero or negative square footage
    - ratings out of range [1-10]
    """
    # 1. Negative bedrooms
    payload = {
        "square_footage": 2100.0,
        "bedrooms": -1.0,
        "bathrooms": 2.0,
        "neighborhood_rating": 8.0,
        "school_rating": 9.0,
        "property_age": 12.0,
        "lot_size": 6500.0
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422
    
    # 2. Zero square footage
    payload = {
        "square_footage": 0.0,
        "bedrooms": 3.0,
        "bathrooms": 2.0,
        "neighborhood_rating": 8.0,
        "school_rating": 9.0,
        "property_age": 12.0,
        "lot_size": 6500.0
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422

    # 3. Rating out of range (>10)
    payload = {
        "square_footage": 2100.0,
        "bedrooms": 3.0,
        "bathrooms": 2.0,
        "neighborhood_rating": 11.0,
        "school_rating": 9.0,
        "property_age": 12.0,
        "lot_size": 6500.0
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422

    # 4. Rating out of range (<1)
    payload = {
        "square_footage": 2100.0,
        "bedrooms": 3.0,
        "bathrooms": 2.0,
        "neighborhood_rating": 0.0,
        "school_rating": 9.0,
        "property_age": 12.0,
        "lot_size": 6500.0
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422
