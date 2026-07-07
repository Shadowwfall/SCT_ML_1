import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Insights & Telemetry",
  description: "Explore the performance metrics, error rates (RMSE, MAE), and mathematical feature coefficients of our trained Linear Regression model.",
  openGraph: {
    title: "Model Insights & Telemetry | PropValuate",
    description: "Explore the performance metrics, error rates (RMSE, MAE), and mathematical feature coefficients of our trained Linear Regression model.",
  },
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
