"use client";

import React, { useState, useRef, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PropertyInputForm } from "@/components/prediction/property-input-form";
import { PredictedPriceCard } from "@/components/prediction/predicted-price-card";
import { FeatureSummaryPanel } from "@/components/prediction/feature-summary-panel";
import { RegressionChart } from "@/components/prediction/regression-chart";
import { postPrediction, getModelInfo, type PredictionResponse, type ModelInfoResponse } from "@/lib/api";
import { type PredictionFormData } from "@/lib/schemas/prediction";
import { Brain, Landmark, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PredictPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [modelInfo, setModelInfo] = useState<ModelInfoResponse | null>(null);
  const [modelInfoError, setModelInfoError] = useState<boolean>(false);
  const [isModelInfoLoading, setIsModelInfoLoading] = useState<boolean>(true);
  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Fetch model metadata on mount for value driver calculations
  const fetchModelInfo = async () => {
    setIsModelInfoLoading(true);
    setModelInfoError(false);
    try {
      const info = await getModelInfo();
      setModelInfo(info);
    } catch (err) {
      console.error("Failed to fetch model info:", err);
      setModelInfoError(true);
    } finally {
      setIsModelInfoLoading(false);
    }
  };

  useEffect(() => {
    fetchModelInfo();
  }, []);

  const handleFormSubmit = async (data: PredictionFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await postPrediction(data);
      setResult(response);
    } catch (err: any) {
      console.error(err);
      const detail = err.response?.data?.detail;
      // If detail is list of validation errors
      let errorMessage = "An error occurred while calculating the estimate. Please try again.";
      if (typeof detail === "string") {
        errorMessage = detail;
      } else if (Array.isArray(detail)) {
        errorMessage = detail.map((d: any) => `${d.loc.join(".")}: ${d.msg}`).join(", ");
      } else if (err.message) {
        errorMessage = `${err.message}. Please check if the backend server is running on http://localhost:8000.`;
      }
      setError(errorMessage);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    // Wait for the DOM height to update before scrolling to the form
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Scroll to results section on success
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  return (
    <div className="flex flex-col w-full bg-background min-h-full pb-20">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-indigo-900 text-white py-16 md:py-24 text-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Enter Property Details
          </h1>
          <p className="text-base md:text-lg text-primary-light/90 font-light max-w-2xl mx-auto leading-relaxed">
            Fill in the parameters below. Our linear regression model will process the details and calculate a market value estimation instantly.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-14 z-10 w-full">
        {/* Form Card */}
        <div ref={formRef} className="bg-card border border-border p-6 md:p-10 rounded-2xl shadow-card scroll-mt-20">
          <div className="flex items-center gap-2.5 pb-6 mb-6 border-b border-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Landmark className="h-4.5 w-4.5" />
            </div>
            <h2 className="font-heading text-lg font-bold text-ink-900">
              Valuation Parameters
            </h2>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Prediction Error</AlertTitle>
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )}

          <PropertyInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>

        {/* Prediction Results UI */}
        {result && (
          <div ref={resultsRef} className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <PredictedPriceCard price={result.estimated_price} modelVersion={result.model_version} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureSummaryPanel features={result.input_summary} />
              {modelInfo ? (
                <RegressionChart
                  features={result.input_summary}
                  coefficients={modelInfo.coefficients}
                  scalerMean={modelInfo.scaler_mean}
                  scalerScale={modelInfo.scaler_scale}
                  intercept={modelInfo.intercept}
                />
              ) : modelInfoError ? (
                <div className="bg-card border border-destructive/20 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center text-ink-900 min-h-[300px] shadow-card space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-ink-900">Failed to Load Drivers</p>
                    <p className="text-xs text-ink-600 max-w-[220px] mx-auto">
                      Could not fetch regression coefficients from the backend.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchModelInfo}
                    disabled={isModelInfoLoading}
                    className="h-8 text-xs font-semibold px-4 flex items-center gap-1.5"
                  >
                    <RefreshCw className={`h-3 w-3 ${isModelInfoLoading ? "animate-spin" : ""}`} />
                    Retry Loading
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-border p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center text-ink-300 min-h-[300px] shadow-card">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2" />
                  <p className="text-xs text-ink-600">Loading regression drivers...</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full sm:w-auto h-10 px-6 flex items-center justify-center gap-2 shadow-sm border-border hover:bg-muted text-ink-900 font-semibold"
              >
                <RefreshCw className="h-4 w-4" />
                Clear and Recalculate
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
