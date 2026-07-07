"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { formatCurrency, formatPriceImpact, formatFeatureValue } from "@/lib/format";
import { BarChart3, Info } from "lucide-react";

interface RegressionChartProps {
  features: Record<string, number>;
  coefficients: Record<string, number>;
  scalerMean: Record<string, number>;
  scalerScale: Record<string, number>;
  intercept: number;
}

const labelMap: Record<string, string> = {
  square_footage: "Living Area",
  bedrooms: "Bedrooms",
  bathrooms: "Bathrooms",
  neighborhood_rating: "Neighborhood",
  school_rating: "School District",
  property_age: "Property Age",
  lot_size: "Lot Size",
};

export function RegressionChart({
  features,
  coefficients,
  scalerMean,
  scalerScale,
  intercept,
}: RegressionChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Compile contributions: coef_i * ((raw_x_i - mean_i) / std_i)
  const chartData = Object.keys(features)
    .map((key) => {
      const rawVal = features[key];
      const coef = coefficients[key] || 0;
      const mean = scalerMean[key] !== undefined ? scalerMean[key] : 0;
      const scale = scalerScale[key] !== undefined && scalerScale[key] !== 0 ? scalerScale[key] : 1;

      const scaledVal = (rawVal - mean) / scale;
      const contribution = coef * scaledVal;

      return {
        key,
        name: labelMap[key] || key,
        contribution: Math.round(contribution),
        formattedRawValue: formatFeatureValue(key, rawVal),
      };
    })
    // Sort contributions by absolute impact (highest impact first)
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const value = payload[0].value;
      const isPositive = value >= 0;

      return (
        <div className="bg-card border border-border p-3.5 rounded-lg shadow-md text-xs font-sans space-y-1 z-50">
          <p className="font-bold text-ink-900">{data.name}</p>
          <p className="text-ink-600">
            Selected: <span className="font-semibold text-ink-900">{data.formattedRawValue}</span>
          </p>
          <p className={`${isPositive ? "text-success" : "text-destructive"} font-bold`}>
            Price Driver: {formatPriceImpact(value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!isMounted) {
    return (
      <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-card h-full min-h-[350px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-xs text-ink-600">Rendering chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-card hover:translate-y-[-2px] hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BarChart3 className="h-4.5 w-4.5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm uppercase font-bold text-ink-900 tracking-wider font-heading">
            Value Drivers
          </h3>
          <p className="text-xs text-ink-600">
            Impact relative to average baseline of <span className="font-semibold text-primary">{formatCurrency(intercept)}</span>
          </p>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="flex-1 min-h-[250px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(v) => {
                if (v === 0) return "0";
                const prefix = v > 0 ? "+" : "";
                // Shorten large values e.g. +$50K
                const absV = Math.abs(v);
                if (absV >= 1000) {
                  return `${prefix}$${(v / 1000).toFixed(0)}K`;
                }
                return `${prefix}$${v}`;
              }}
              stroke="var(--ink-600)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="var(--ink-900)"
              fontSize={11}
              width={90}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(11, 95, 255, 0.03)" }} />
            <ReferenceLine x={0} stroke="var(--border)" strokeWidth={1.5} />
            <Bar dataKey="contribution" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.contribution >= 0 ? "var(--primary)" : "var(--destructive)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-start gap-2 mt-4 pt-4 border-t border-border/60">
        <Info className="h-4 w-4 text-ink-600 shrink-0 mt-0.5" />
        <p className="text-[10px] text-ink-600 leading-relaxed">
          Bars show the calculated dollar value impact of each parameter. Positive drivers increase the estimated price relative to the average baseline, while negative drivers decrease it.
        </p>
      </div>
    </div>
  );
}
