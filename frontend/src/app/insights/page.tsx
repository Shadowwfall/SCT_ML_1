"use client";

import React, { useState, useEffect } from "react";
import { getModelInfo, type ModelInfoResponse } from "@/lib/api";
import { MetricTile } from "@/components/insights/metric-tile";
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/format";
import { CoefficientTable } from "@/components/insights/coefficient-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Target, Activity, TrendingDown, Hash, Brain } from "lucide-react";

export default function InsightsPage() {
  const [modelInfo, setModelInfo] = useState<ModelInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModelInfo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const info = await getModelInfo();
        setModelInfo(info);
      } catch (err: unknown) {
        console.error("Error fetching model info:", err);
        let errorMessage = "Could not load machine learning model insights.";
        if (err instanceof Error) {
          errorMessage = `${err.message}. Please check if the backend FastAPI server is running on http://localhost:8000.`;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchModelInfo();
  }, []);

  return (
    <div className="flex flex-col w-full bg-background min-h-full pb-20">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-indigo-900 text-white py-16 md:py-20 text-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Model Insights
          </h1>
          <p className="text-base md:text-lg text-primary-light/90 font-light max-w-2xl mx-auto leading-relaxed">
            Inspect the mathematical performance metrics, error rates, and feature pricing weights of our trained Linear Regression model.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-10 z-10 w-full">
        {error && (
          <Alert variant="destructive" className="bg-card border-destructive/20 text-destructive shadow-sm rounded-2xl mb-8 p-5">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <AlertTitle className="font-bold mb-1">Retrieval Failed</AlertTitle>
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="bg-card border border-border p-12 rounded-2xl shadow-card flex flex-col items-center justify-center text-center space-y-3 min-h-[300px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            <p className="text-sm font-semibold text-ink-900">Loading model telemetry...</p>
            <p className="text-xs text-ink-600">Querying metrics and scaler distributions from FastAPI backend</p>
          </div>
        ) : (
          modelInfo && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Summary metadata badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-card border border-border px-6 py-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-semibold text-ink-900">
                    Model is online & initialized
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-ink-600">
                  <span>Algorithm: <strong className="text-ink-900 font-semibold">{modelInfo.algorithm}</strong></span>
                  <span className="hidden sm:inline">|</span>
                  <span>Version: <strong className="text-ink-900 font-semibold">{modelInfo.model_version}</strong></span>
                </div>
              </div>

              {/* Metric Tiles Row */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricTile
                  label="R² Score (Goodness of Fit)"
                  value={formatPercentage(modelInfo.r2)}
                  description="Indicates the percentage of home price variance explained by the model parameters. High values indicate a precise fit."
                  isPrimary={true}
                  icon={<Target className="h-5 w-5" />}
                />
                <MetricTile
                  label="RMSE (Std Dev of Errors)"
                  value={formatCurrency(modelInfo.rmse)}
                  description="Root Mean Squared Error. Standard deviation of estimation variance; penalizes larger forecasting errors more heavily."
                  icon={<Activity className="h-5 w-5" />}
                />
                <MetricTile
                  label="MAE (Avg Absolute Error)"
                  value={formatCurrency(modelInfo.mae)}
                  description="Mean Absolute Error. The average size of estimation errors in raw dollars, representing the expected value deviation."
                  icon={<TrendingDown className="h-5 w-5" />}
                />
                <MetricTile
                  label="MSE (Squared Loss)"
                  value={formatNumber(modelInfo.mse)}
                  description="Mean Squared Error. The quadratic loss metric minimized during linear regression model parameter fitting."
                  icon={<Hash className="h-5 w-5" />}
                />
              </section>

              {/* Coefficient Table */}
              <section>
                <CoefficientTable
                  coefficients={modelInfo.coefficients}
                  scalerScale={modelInfo.scaler_scale}
                />
              </section>
            </div>
          )
        )}
      </main>
    </div>
  );
}
