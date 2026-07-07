import React from "react";
import { render, screen } from "@testing-library/react";
import { MetricTile } from "../metric-tile";
import { describe, it, expect } from "vitest";

describe("MetricTile", () => {
  it("renders metric label, value, and description", () => {
    render(
      <MetricTile
        label="Test Metric"
        value="123,456"
        description="This is a test metric tile."
      />
    );

    expect(screen.getByText("Test Metric")).toBeInTheDocument();
    expect(screen.getByText("123,456")).toBeInTheDocument();
    expect(screen.getByText("This is a test metric tile.")).toBeInTheDocument();
  });

  it("applies primary styles when isPrimary is true", () => {
    const { container } = render(
      <MetricTile
        label="R2 Score"
        value="92.5%"
        description="Primary tile test"
        isPrimary={true}
      />
    );

    // Should have bg-primary-light class
    expect(container.firstChild).toHaveClass("bg-primary-light");
  });
});
