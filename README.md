<p align="center">
  <img src="https://img.shields.io/badge/ML-Linear%20Regression-blue?style=for-the-badge" alt="ML Model" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Frontend-Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

# 🏠 PropValuate — House Price Prediction Platform

> **Estimate any property's market value in under 2 seconds** using a trained Linear Regression model, a FastAPI backend, and a modern Next.js dashboard.

PropValuate is a full-stack machine learning web application that predicts residential property prices based on key characteristics. It helps buyers avoid overpaying, sellers set competitive listing prices, and investors quickly evaluate opportunities — all through a clean, intuitive interface.

---

## ✨ Features

| Feature | Description |
|---|---|
| **🔮 Instant Price Prediction** | Get an estimated property value in < 2 seconds via a trained Linear Regression model |
| **📋 Property Input Form** | Enter 7 key property attributes with real-time validation |
| **📊 Model Insights Dashboard** | View R², RMSE, MAE, MSE metrics and feature coefficients |
| **📈 Feature Contribution Chart** | Visualize how each input affects the predicted price (Recharts) |
| **✅ Dual Validation** | Client-side (Zod) + server-side (Pydantic) input validation |
| **📱 Responsive Design** | Mobile-first layout that works across all screen sizes |
| **🎨 Premium UI** | shadcn/ui components with a polished, SaaS-quality design system |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│         Next.js 16 · React · Tailwind v4         │
│         shadcn/ui · Recharts · Zod               │
│                                                  │
│   /              → Landing / Hero Page           │
│   /predict       → Property Input + Results      │
│   /insights      → Model Metrics Dashboard       │
└──────────────────────┬──────────────────────────┘
                       │  REST API (Axios)
                       ▼
┌─────────────────────────────────────────────────┐
│                   Backend                        │
│              FastAPI · Pydantic                   │
│                                                  │
│   POST /predict    → Price prediction            │
│   GET  /model-info → Model metrics + coefficients│
│   GET  /health     → Service health check        │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              ML Pipeline                         │
│       Scikit-learn · Pandas · NumPy              │
│                                                  │
│   preprocess.py  → Clean & validate data         │
│   features.py    → Scale features (StandardScaler)│
│   train.py       → Train Linear Regression       │
│   evaluate.py    → Compute MAE, MSE, RMSE, R²    │
└─────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
SCT_ML_1/
├── frontend/                    # Next.js 16 application
│   └── src/
│       ├── app/                 # App Router pages (/, /predict, /insights)
│       ├── components/          # Reusable UI components
│       └── lib/                 # API client, Zod schemas, utilities
│
├── backend/                     # FastAPI application
│   ├── app/
│   │   ├── main.py              # App entrypoint, CORS, routes
│   │   ├── models/              # Pydantic schemas
│   │   ├── routes/              # API endpoints
│   │   └── services/            # Prediction service
│   ├── ml/
│   │   ├── data/                # Training dataset (CSV)
│   │   ├── artifacts/           # model.joblib, scaler.joblib, metrics.json
│   │   ├── preprocess.py        # Data cleaning & outlier removal
│   │   ├── features.py          # Feature scaling
│   │   ├── train.py             # Model training
│   │   └── evaluate.py          # Model evaluation
│   ├── tests/                   # pytest + httpx test suite
│   └── requirements.txt
│
├── database/                    # (Future) PostgreSQL schemas
├── docs/                        # Project documentation
│   ├── PRD.md                   # Product Requirements Document
│   ├── DESIGN.md                # UI/UX Design Specification
│   └── TECHSTACK.md             # Technology Stack Reference
│
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** (React 20) | Framework — SSR, routing, SEO |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui** | Accessible, composable UI components |
| **React Hook Form** + **Zod** | Performant forms with type-safe validation |
| **Recharts** | Data visualization (feature contribution charts) |
| **Axios** | HTTP client for API communication |

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | High-performance async Python API framework |
| **Pydantic** | Request/response validation & serialization |
| **Scikit-learn** | Linear Regression model training & inference |
| **Pandas** / **NumPy** | Data processing & feature engineering |
| **Joblib** | Model & scaler serialization |
| **pytest** + **httpx** | API testing |

### Deployment
| Service | Role |
|---|---|
| **Vercel** | Frontend hosting (Next.js) |
| **Railway** / **Render** | Backend hosting (FastAPI + Docker) |

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.12+
- **Node.js** 20+
- **npm** or **pnpm**
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Shadowwfall/SCT_ML_1.git
cd SCT_ML_1
```

### 2. Backend Setup

```bash
# Create and activate a virtual environment
cd backend
python -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Run the ML pipeline (train the model)
python -m ml.preprocess
python -m ml.features
python -m ml.train
python -m ml.evaluate

# Start the API server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create a .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check — returns `{"status": "ok"}` |
| `POST` | `/predict` | Predict house price from property features |
| `GET` | `/model-info` | Retrieve model metrics and feature coefficients |

### `POST /predict` — Request Body

```json
{
  "square_footage": 2100,
  "bedrooms": 3,
  "bathrooms": 2,
  "neighborhood_rating": 8,
  "school_rating": 9,
  "property_age": 12,
  "lot_size": 6500
}
```

### `POST /predict` — Response

```json
{
  "estimated_price": 8245000,
  "input_summary": {
    "square_footage": 2100,
    "bedrooms": 3,
    "bathrooms": 2,
    "neighborhood_rating": 8,
    "school_rating": 9,
    "property_age": 12,
    "lot_size": 6500
  },
  "model_version": "1.0.0"
}
```

---

## 🧠 ML Pipeline

```
housing.csv → preprocess.py → features.py → train.py → evaluate.py
                                                │            │
                                          model.joblib   metrics.json
                                          scaler.joblib
```

| Stage | Script | Output |
|---|---|---|
| **Data Cleaning** | `preprocess.py` | `housing_clean.csv` — imputed missing values, removed outliers |
| **Feature Scaling** | `features.py` | `scaler.joblib` — fitted StandardScaler |
| **Model Training** | `train.py` | `model.joblib` — trained LinearRegression (80/20 split) |
| **Evaluation** | `evaluate.py` | `metrics.json` — MAE, MSE, RMSE, R² |

**Target performance:** R² ≥ 0.85

---

## 📌 Roadmap

- [x] **Phase 1** — Project scaffolding & repository setup
- [ ] **Phase 2** — ML pipeline (data → trained model)
- [ ] **Phase 3** — Backend API (FastAPI endpoints)
- [ ] **Phase 4** — Frontend foundation (layout, navigation, hero)
- [ ] **Phase 5** — Property input form (`/predict` page)
- [ ] **Phase 6** — Prediction results UI (price card, charts)
- [ ] **Phase 7** — Model insights dashboard (`/insights` page)
- [ ] **Phase 8** — Polish, testing & deployment

### Future Enhancements

- Price confidence intervals
- Property comparison tool
- Historical price trend analysis
- Mortgage affordability calculator
- User accounts & saved prediction history
- Advanced ML models (Random Forest, XGBoost, LightGBM)
- Explainable AI (SHAP / LIME)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Scikit-learn](https://scikit-learn.org/) — ML model training
- [FastAPI](https://fastapi.tiangolo.com/) — Backend framework
- [Next.js](https://nextjs.org/) — Frontend framework
- [shadcn/ui](https://ui.shadcn.com/) — UI component library
- [Recharts](https://recharts.org/) — Data visualization

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Shadowwfall">Shadowwfall</a>
</p>
