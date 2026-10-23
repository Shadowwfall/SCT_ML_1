# SkillCraft Technology – Machine Learning Internship

## Task 1: House Price Prediction Using Linear Regression

### 📌 Project Overview
This project focuses on predicting residential house prices using supervised machine learning. A multiple Linear Regression model is implemented to examine and quantify the relationship between key architectural features (square footage, bedroom count, and bathroom count) and home sale prices.

---

### 🎯 Objectives
- Understand the fundamentals of supervised regression modeling.
- Perform exploratory data analysis (EDA) and handle missing data.
- Train a Multiple Linear Regression model with Scikit-Learn.
- Evaluate model accuracy using standard regression metrics ($R^2$, RMSE, MAE, MSE).
- Generate predictions for unseen test data formatted for competition submission.

---

### 📊 Dataset & Selected Features

The dataset is sourced from the famous Ames Housing dataset on Kaggle:
- **Dataset Source:** [Kaggle - House Prices: Advanced Regression Techniques](https://www.kaggle.com/c/house-prices-advanced-regression-techniques/data)

While the full dataset contains 81 explanatory variables describing residential homes in Ames, Iowa, this task implements a focused multi-variable linear regression using the following key features:

| Feature Name | Description | Type |
|---|---|---|
| `GrLivArea` | Above grade (ground) living area in square feet | Numerical |
| `BedroomAbvGr` | Number of bedrooms above grade (excludes basement) | Numerical |
| `FullBath` | Number of full bathrooms above grade | Numerical |
| **`SalePrice`** | Target variable: property's sale price in USD | Target (Continuous) |

---

### 🛠️ Technologies Used
- **Language:** Python 3
- **Data Manipulation:** Pandas, NumPy
- **Data Visualization:** Matplotlib, Seaborn
- **Machine Learning:** Scikit-learn (`LinearRegression`, `train_test_split`, `metrics`)
- **Development Environment:** Jupyter Notebook

---

### ⚙️ Project Workflow
1. **Data Ingestion:** Load `train.csv` (1,460 observations, 81 attributes) and `test.csv` (1,459 observations).
2. **Exploratory Data Analysis (EDA):** Analyze distributions, summary statistics, and missing value patterns.
3. **Feature Selection:** Extract target `SalePrice` and predictors `GrLivArea`, `BedroomAbvGr`, and `FullBath`.
4. **Data Splitting:** Partition training data into 80% training set (1,168 samples) and 20% validation set (292 samples) using `random_state=42`.
5. **Model Training:** Fit a `LinearRegression` model from Scikit-Learn.
6. **Model Interpretation:** Extract regression intercept and feature coefficients.
7. **Model Evaluation:** Measure prediction quality on the hold-out validation set using MAE, MSE, RMSE, and $R^2$.
8. **Inference & Export:** Generate predictions on `test.csv` and export ready-to-submit files (`submission.csv` and `model_predictions.csv`).

---

### 🤖 Algorithm & Mathematical Formulation

The linear regression equation learned by the model:

$$\text{SalePrice} = \beta_0 + \beta_1 \cdot \text{GrLivArea} + \beta_2 \cdot \text{BedroomAbvGr} + \beta_3 \cdot \text{FullBath}$$

#### Learned Model Parameters:
- **Intercept ($\beta_0$):** `$52,261.75`
- **Living Area Coefficient ($\beta_1$):** `+$104.03` / sq. ft.
- **Bedrooms Coefficient ($\beta_2$):** `-$26,655.17` / bedroom
- **Full Bathrooms Coefficient ($\beta_3$):** `+$30,014.32` / bathroom

**Sample Inference:**
For a home with **2,000 sq ft**, **3 bedrooms**, and **2 full baths**:
$$\text{Predicted Price} = 52,261.75 + (104.03 \times 2000) - (26,655.17 \times 3) + (30,014.32 \times 2) \approx \mathbf{\$240,377.51}$$

---

### 📈 Model Evaluation & Results

The model was tested on 292 unseen validation observations (20% split) with the following performance metrics:

| Metric | Value | Interpretation |
|---|---|---|
| **Mean Absolute Error (MAE)** | **$35,788.06** | On average, predictions deviate by ~$35.8k from actual sale price. |
| **Mean Squared Error (MSE)** | **2,806,426,667.25** | Penalizes larger prediction errors quadratic-wise. |
| **Root Mean Squared Error (RMSE)** | **$52,975.72** | Standard deviation of prediction residuals. |
| **$R^2$ Score** | **0.6341 (63.41%)** | ~63.4% of variance in house sale prices is explained by these 3 features alone. |

---

### 📂 Repository Structure
```text
SCT_ML_1/
├── SCT_ML_Task1_House_Price_Prediction.ipynb  # Primary Jupyter Notebook (EDA, training, evaluation)
├── train.csv                                  # Training data (1,460 records)
├── test.csv                                   # Test data for submission (1,459 records)
├── data_description.txt                       # Detailed dataset metadata & feature guide
├── model_predictions.csv                      # Validation set predictions vs actuals (292 records)
├── submission.csv                             # Final test predictions (Id, SalePrice)
├── sample_submission.csv                      # Benchmark submission format
└── README.md                                  # Project documentation
```

---

### 🚀 How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shadowwfall/SCT_ML_1.git
   cd SCT_ML_1
   ```

2. **Install required dependencies:**
   ```bash
   pip install pandas numpy matplotlib seaborn scikit-learn jupyter
   ```

3. **Launch the Jupyter Notebook:**
   ```bash
   jupyter notebook SCT_ML_Task1_House_Price_Prediction.ipynb
   ```

4. **Run all cells** sequentially to inspect data exploratory plots, train the model, inspect performance metrics, and reproduce `submission.csv`.

---

### 📚 Learning Outcomes
- Applied supervised regression modeling on real-world housing data.
- Understood the effect of multi-collinearity and feature scale on regression coefficients.
- Evaluated model predictions against standard regression metrics ($R^2$, RMSE, MAE).
- Prepared test inference files according to standard competition formats.

---

### 👩‍💻 Internship Details
- **Organization:** SkillCraft Technology
- **Domain:** Machine Learning
- **Task:** Task 1 – House Price Prediction Using Linear Regression

---

### 📝 Conclusion
This project successfully establishes a baseline Linear Regression model for house price prediction, achieving an $R^2$ score of **0.6341** using only three fundamental attributes (`GrLivArea`, `BedroomAbvGr`, `FullBath`). Future enhancements could involve feature engineering, interaction terms, regularization (Ridge/Lasso), and non-linear tree-based models like Random Forests or XGBoost.
