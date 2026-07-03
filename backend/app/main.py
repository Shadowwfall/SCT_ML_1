"""
PropValuate — FastAPI Application Entry Point
==============================================

This is the "front door" of your backend. Every HTTP request hits this file first.

Key responsibilities:
  1. Create the FastAPI app instance
  2. Configure CORS so the Next.js frontend can talk to this API
  3. Register route modules (predict, model-info — we'll add these later)
  4. Provide a /health endpoint for quick "is it alive?" checks
  5. On startup, verify that the ML model files exist
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# ──────────────────────────────────────────────────────────────
# 1. LIFESPAN — runs code at startup & shutdown
# ──────────────────────────────────────────────────────────────
#
# Think of this as the "boot sequence" for your API server.
#
# WHY an async context manager?
# ─────────────────────────────
# FastAPI uses Python's `asynccontextmanager` pattern:
#   • Everything BEFORE `yield`  → runs at STARTUP
#   • Everything AFTER  `yield`  → runs at SHUTDOWN
#
# We use startup to sanity-check that model files are present,
# so we fail fast with a clear message instead of crashing
# later when someone hits /predict.

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup / shutdown lifecycle hook.

    On startup  → verify ML artifacts exist.
    On shutdown → (nothing to clean up yet, but this is where you'd
                   close DB connections, flush caches, etc.)
    """
    import os

    # Where we expect the trained model + scaler to live
    artifacts_dir = os.path.join(
        os.path.dirname(__file__),  # .../backend/app/
        "..",                        # .../backend/
        "ml",                        # .../backend/ml/
        "artifacts",                 # .../backend/ml/artifacts/
    )

    model_path = os.path.join(artifacts_dir, "model.joblib")
    scaler_path = os.path.join(artifacts_dir, "scaler.joblib")

    # We don't crash if files are missing — we just warn.
    # This way you can still develop routes before training the model.
    if os.path.exists(model_path):
        print(f"✅ Model loaded from:  {model_path}")
    else:
        print(f"⚠️  Model not found at {model_path} — /predict will fail until you train the model.")

    if os.path.exists(scaler_path):
        print(f"✅ Scaler loaded from: {scaler_path}")
    else:
        print(f"⚠️  Scaler not found at {scaler_path} — /predict will fail until you train the model.")

    # ── Hand control to the running app ──
    yield
    # ── Server is shutting down ──
    print("👋 PropValuate API shutting down.")


# ──────────────────────────────────────────────────────────────
# 2. CREATE THE APP
# ──────────────────────────────────────────────────────────────
#
# This single line creates the FastAPI instance.
# Everything else (routes, middleware) gets attached TO this object.
#
# Key arguments:
#   title       → shows up in the auto-generated Swagger docs
#   description → also for Swagger docs
#   version     → API version string
#   lifespan    → the startup/shutdown hook we defined above

app = FastAPI(
    title="PropValuate API",
    description="House Price Prediction Service powered by Linear Regression",
    version="1.0.0",
    lifespan=lifespan,
)


# ──────────────────────────────────────────────────────────────
# 3. CORS MIDDLEWARE
# ──────────────────────────────────────────────────────────────
#
# Without this, your browser will BLOCK the Next.js frontend
# (running on http://localhost:3000) from calling this API
# (running on http://localhost:8000).
#
# This is a BROWSER security feature called "Same-Origin Policy".
# CORS = Cross-Origin Resource Sharing — it's how you whitelist
# trusted origins.
#
# allow_origins   → which domains can call your API
# allow_methods   → which HTTP methods (GET, POST, etc.)
# allow_headers   → which headers the frontend can send
# allow_credentials → whether cookies/auth headers are allowed

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Next.js dev server
    ],
    allow_credentials=True,
    allow_methods=["*"],           # Allow all HTTP methods
    allow_headers=["*"],           # Allow all headers
)


# ──────────────────────────────────────────────────────────────
# 4. ROUTES
# ──────────────────────────────────────────────────────────────
#
# A "route" (or "endpoint") maps an HTTP method + URL path to
# a Python function.
#
# @app.get("/health")  means:
#   "When someone sends a GET request to /health, run this function
#    and return whatever it returns as JSON."
#
# FastAPI automatically:
#   • Converts the returned dict to JSON
#   • Sets the Content-Type header to application/json
#   • Generates interactive API docs at /docs (Swagger UI)

@app.get("/health")
async def health_check() -> dict:
    """
    Health check endpoint.

    Use this to verify the API is running.
    Monitoring tools, load balancers, and deployment platforms
    often ping an endpoint like this to confirm the service is alive.

    Returns:
        {"status": "ok"}
    """
    return {"status": "ok"}


# ──────────────────────────────────────────────────────────────
# 5. ROUTE REGISTRATION
# ──────────────────────────────────────────────────────────────

from app.routes.predict import router as predict_router
from app.routes.model_info import router as model_info_router

app.include_router(predict_router)
app.include_router(model_info_router)

