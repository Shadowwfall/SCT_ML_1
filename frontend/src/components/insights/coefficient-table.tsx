"use client";

import React from "react";
import { Scale, Info } from "lucide-react";

interface CoefficientTableProps {
  coefficients: Record<string, number>;
  scalerScale: Record<string, number>;
}

const featureMetaMap: Record<string, { label: string; unit: string; description: string }> = {
  square_footage: {
    label: "Living Area",
    unit: "sq ft",
    description: "Total interior livable square footage of the property",
  },
  bedrooms: {
    label: "Bedrooms",
    unit: "bed",
    description: "Number of designated bedrooms",
  },
  bathrooms: {
    label: "Bathrooms",
    unit: "bath",
    description: "Number of full and half bathrooms",
  },
  neighborhood_rating: {
    label: "Neighborhood Rating",
    unit: "point",
    description: "Quality score of the immediate neighborhood (1-10)",
  },
  school_rating: {
    label: "School District Rating",
    unit: "point",
    description: "Quality score of local public school district (1-10)",
  },
  property_age: {
    label: "Property Age",
    unit: "year",
    description: "Age of the house in years since construction",
  },
  lot_size: {
    label: "Lot Size",
    unit: "sq ft",
    description: "Total land parcel area in square feet",
  },
};

export function CoefficientTable({ coefficients, scalerScale }: CoefficientTableProps) {
  const formatPrice = (val: number) => {
    const prefix = val >= 0 ? "+" : "";
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
    return `${prefix}${formatted}`;
  };

  const formatImpactPerUnit = (val: number, unit: string) => {
    const prefix = val >= 0 ? "+" : "";
    // If unit impact is very large (e.g. bed/bath), round to 0 decimal places. If it is small (e.g. sq ft/lot size), round to 2 decimals.
    const isLarge = Math.abs(val) >= 1000;
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: isLarge ? 0 : 2,
    }).format(val);
    return `${prefix}${formatted} / ${unit}`;
  };

  const rows = Object.keys(coefficients)
    .map((key) => {
      const coef = coefficients[key];
      const stdDev = scalerScale[key] || 1;
      const rawImpact = coef / stdDev;
      const meta = featureMetaMap[key] || { label: key, unit: "unit", description: "" };

      return {
        key,
        label: meta.label,
        description: meta.description,
        standardized: coef,
        unstandardized: rawImpact,
        unit: meta.unit,
      };
    })
    // Sort rows by importance (absolute value of standardized coefficients)
    .sort((a, b) => Math.abs(b.standardized) - Math.abs(a.standardized));

  return (
    <div className="bg-card border border-border rounded-2xl shadow-card p-6 md:p-8 hover:shadow-card-hover transition-shadow duration-300">
      <div className="flex items-center gap-2.5 pb-5 mb-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Scale className="h-4.5 w-4.5" />
        </div>
        <div>
          <h3 className="text-sm uppercase font-bold text-ink-900 tracking-wider font-heading">
            Feature Coefficients
          </h3>
          <p className="text-xs text-ink-600">
            Mathematical parameters determining the linear pricing weights
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-border/60">
            <thead>
              <tr className="border-b border-border/80">
                <th
                  scope="col"
                  className="py-3.5 pl-6 md:pl-4 text-left text-[11px] font-bold uppercase tracking-widest text-ink-600 font-heading"
                >
                  Feature
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-right text-[11px] font-bold uppercase tracking-widest text-ink-600 font-heading"
                >
                  Model Weight (Standardized)
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-6 md:pr-4 text-right text-[11px] font-bold uppercase tracking-widest text-ink-600 font-heading"
                >
                  Impact Per Unit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {rows.map((row, index) => {
                const isPositive = row.standardized >= 0;
                return (
                  <tr
                    key={row.key}
                    className={`transition-colors duration-150 odd:bg-secondary/30 even:bg-card hover:bg-primary/5`}
                  >
                    <td className="py-4 pl-6 md:pl-4 text-sm align-middle">
                      <div className="font-semibold text-ink-900 leading-tight">
                        {row.label}
                      </div>
                      <div className="text-[10px] text-ink-600 font-light mt-0.5 max-w-[240px] sm:max-w-md">
                        {row.description}
                      </div>
                    </td>
                    <td
                      className={`py-4 px-4 text-right text-sm font-semibold tabular-nums align-middle ${
                        isPositive ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {formatPrice(row.standardized)}
                    </td>
                    <td
                      className={`py-4 pr-6 md:pr-4 text-right text-sm font-semibold tabular-nums align-middle ${
                        isPositive ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {formatImpactPerUnit(row.unstandardized, row.unit)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-start gap-2.5 mt-5 pt-4 border-t border-border/60">
        <Info className="h-4.5 w-4.5 text-ink-600 shrink-0 mt-0.5" />
        <div className="text-[10px] text-ink-600 leading-relaxed space-y-1">
          <p>
            <strong>Standardized Model Weights</strong> measure overall feature importance. They represent how much a one standard deviation change in a feature changes the home price.
          </p>
          <p>
            <strong>Impact Per Unit</strong> is the unstandardized coefficient, indicating the raw dollar increase or decrease associated with each single unit change in that property parameter.
          </p>
        </div>
      </div>
    </div>
  );
}
