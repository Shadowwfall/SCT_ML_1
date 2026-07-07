import React from "react";
import { render, screen } from "@testing-library/react";
import { PredictedPriceCard } from "../predicted-price-card";
import { describe, it, expect } from "vitest";

describe("PredictedPriceCard", () => {
  it("renders basic static text labels and disclaimer", () => {
    render(<PredictedPriceCard price={500000} modelVersion="v1.0.0" />);
    
    expect(screen.getByText("Estimated Market Value")).toBeInTheDocument();
    expect(screen.getByText(/Computed in real-time using/)).toBeInTheDocument();
    expect(screen.getByText(/v1.0.0/)).toBeInTheDocument();
    expect(screen.getByText(/estimates are for informational purposes only/)).toBeInTheDocument();
  });

  it("initially displays the animated start price value (75%)", () => {
    render(<PredictedPriceCard price={100000} modelVersion="v1.0.0" />);
    // Start value is 75% of 100,000 = 75,000, formatted as $75,000
    expect(screen.getByText("$75,000")).toBeInTheDocument();
  });
});
