"use client";

import React, { useState, useRef, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PropertyInputForm } from "@/components/prediction/property-input-form";
import { postPrediction, type PredictionResponse } from "@/lib/api";
import { type PredictionFormData } from "@/lib/schemas/prediction";
import { Brain, Landmark, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PredictPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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
        <div className="bg-card border border-border p-6 md:p-10 rounded-2xl shadow-card">
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

        {/* Temporary success section (will be replaced by full Results UI in Phase 6) */}
        {result && (
          <div
            ref={resultsRef}
            className="mt-8 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card text-center space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-ink-900">
                Prediction Completed
              </h3>
              <p className="text-sm text-ink-600">
                Model estimate computed in under 0.1 seconds using {result.model_version}.
              </p>
            </div>

            <div className="py-6 border-y border-border">
              <span className="text-xs uppercase font-semibold text-ink-600 tracking-wider block mb-1">
                Estimated Market Value
              </span>
              <span className="font-sans text-4xl md:text-5xl font-bold text-primary tracking-tight tabular-nums block">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(result.estimated_price)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full sm:w-auto h-10 px-6 flex items-center justify-center gap-2"
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
