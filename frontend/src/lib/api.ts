import axios from "axios";
import { PredictionFormData } from "./schemas/prediction";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PredictionResponse {
  estimated_price: number;
  input_summary: Record<string, number>;
  model_version: string;
}

export interface ModelInfoResponse {
  algorithm: string;
  r2: number;
  mae: number;
  rmse: number;
  mse: number;
  features: string[];
  model_version: string;
  coefficients: Record<string, number>;
  intercept: number;
}

/**
 * Submit property features to backend prediction API
 */
export async function postPrediction(data: PredictionFormData): Promise<PredictionResponse> {
  const response = await apiClient.post<PredictionResponse>("/predict", data);
  return response.data;
}

/**
 * Fetch trained model info and metrics from backend API
 */
export async function getModelInfo(): Promise<ModelInfoResponse> {
  const response = await apiClient.get<ModelInfoResponse>("/model-info");
  return response.data;
}
