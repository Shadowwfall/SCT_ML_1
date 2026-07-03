# PropValuate Training Dataset

This directory contains the training data for the PropValuate house price prediction model.

## Data Source
The dataset `housing.csv` is synthetically generated using `/backend/ml/generate_data.py`. 

### Generating the Dataset
To regenerate the raw training data, run the generation script from the backend directory:
```bash
python -m ml.generate_data
```

## Schema & Attributes

The dataset contains **1,200 rows** and **8 columns**:

| Feature Name | Type | Description | Values Range |
|---|---|---|---|
| `square_footage` | Numeric (Int) | Total finished living area in sq ft | 800 – 4,500 |
| `bedrooms` | Numeric (Int) | Number of bedrooms | 1 – 6 |
| `bathrooms` | Numeric (Int) | Number of bathrooms | 1 – 5 |
| `neighborhood_rating` | Numeric (Int) | Quality of the local neighborhood | 1 – 10 |
| `school_rating` | Numeric (Int) | Quality of local school district | 1 – 10 |
| `property_age` | Numeric (Int) | Age of the property in years | 0 – 80 |
| `lot_size` | Numeric (Int) | Total plot size in sq ft (correlated with living area) | 3,600 – 29,000 |
| `price` | Target (Int) | **(Target Variable)** Estimated house sale price in USD | $60,000 – $1,250,000+ |

## Data Generating Function
The prices are simulated using a baseline linear pricing formula with random Gaussian noise ($\sigma = 15,000$) to represent market variations:

$$\text{Price} = 50,000 + (150 \times \text{SqFt}) + (15000 \times \text{Beds}) + (20000 \times \text{Baths}) + (25000 \times \text{Neighborhood}) + (15000 \times \text{School}) - (1500 \times \text{Age}) + (5 \times \text{LotSize}) + \mathcal{N}(0, 15000)$$
