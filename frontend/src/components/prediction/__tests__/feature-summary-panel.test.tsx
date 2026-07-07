import React from "react";
import { render, screen } from "@testing-library/react";
import { FeatureSummaryPanel } from "../feature-summary-panel";
import { describe, it, expect } from "vitest";

describe("FeatureSummaryPanel", () => {
  it("renders feature parameters correctly when all are provided", () => {
    const features = {
      square_footage: 2500,
      lot_size: 6000,
      bedrooms: 4,
      bathrooms: 2.5,
      property_age: 12,
      neighborhood_rating: 8.5,
      school_rating: 9.0,
    };

    render(<FeatureSummaryPanel features={features} />);

    expect(screen.getByText("Property Summary")).toBeInTheDocument();
    expect(screen.getByText("2,500")).toBeInTheDocument();
    expect(screen.getByText("6,000")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("2.5")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("9.0")).toBeInTheDocument();
  });

  it("renders N/A for missing or optional fields", () => {
    // Only square footage and lot size provided
    const features = {
      square_footage: 2000,
      lot_size: 4000,
    } as any;

    render(<FeatureSummaryPanel features={features} />);

    // Bedrooms, bathrooms, age, neighborhood, and school ratings should show N/A
    const naElements = screen.getAllByText("N/A");
    expect(naElements.length).toBe(5);
  });
});
