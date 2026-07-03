import os
import numpy as np
import pandas as pd

def generate_housing_data(num_samples=1200, seed=42):
    """
    Generates a synthetic housing dataset with realistic correlations.
    """
    np.random.seed(seed)
    
    # 1. Generate features with realistic bounds
    square_footage = np.random.randint(800, 4500, size=num_samples)
    
    # Bedrooms are roughly correlated with square footage
    bedrooms = np.clip(
        (square_footage / 700).astype(int) + np.random.randint(-1, 2, size=num_samples),
        1, 6
    )
    
    # Bathrooms are correlated with bedrooms
    bathrooms = np.clip(
        (bedrooms * 0.7 + np.random.randint(0, 2, size=num_samples)).astype(int),
        1, 5
    )
    
    # Ratings range from 1 to 10
    neighborhood_rating = np.random.randint(1, 11, size=num_samples)
    
    # School rating is partially correlated with neighborhood rating
    school_rating = np.clip(
        neighborhood_rating + np.random.randint(-2, 3, size=num_samples),
        1, 10
    )
    
    property_age = np.random.randint(0, 80, size=num_samples)
    
    # Lot size is partially correlated with square footage
    lot_size = np.random.randint(2000, 20000, size=num_samples) + (square_footage * 2)
    
    # 2. Apply linear equation with weights + base price + random noise
    base_price = 50000
    w_sqft = 150
    w_beds = 15000
    w_baths = 20000
    w_neighborhood = 25000
    w_school = 15000
    w_age = -1500
    w_lotsize = 5
    
    # Generate Gaussian noise (standard deviation of $15,000)
    noise = np.random.normal(0, 15000, size=num_samples)
    
    price = (
        base_price +
        (square_footage * w_sqft) +
        (bedrooms * w_beds) +
        (bathrooms * w_baths) +
        (neighborhood_rating * w_neighborhood) +
        (school_rating * w_school) +
        (property_age * w_age) +
        (lot_size * w_lotsize) +
        noise
    )
    
    # Ensure no prices are below a realistic floor (e.g., $60,000)
    price = np.clip(price, 60000, None).astype(int)
    
    # 3. Create DataFrame
    df = pd.DataFrame({
        "square_footage": square_footage,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "neighborhood_rating": neighborhood_rating,
        "school_rating": school_rating,
        "property_age": property_age,
        "lot_size": lot_size,
        "price": price
    })
    
    return df

if __name__ == "__main__":
    # Create ml/data directory if it doesn't exist
    output_dir = os.path.join(os.path.dirname(__file__), "data")
    os.makedirs(output_dir, exist_ok=True)
    
    output_path = os.path.join(output_dir, "housing.csv")
    
    print("Generating housing dataset...")
    df = generate_housing_data()
    df.to_csv(output_path, index=False)
    print(f"✅ Generated {len(df)} rows. Saved to: {output_path}")
