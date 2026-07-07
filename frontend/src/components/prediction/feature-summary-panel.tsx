"use client";

import React from "react";
import { Ruler, Layers, Bed, Bath, History, MapPin, GraduationCap, ClipboardList } from "lucide-react";

interface FeatureSummaryPanelProps {
  features: Record<string, number>;
}

export function FeatureSummaryPanel({ features }: FeatureSummaryPanelProps) {
  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return "N/A";
    return new Intl.NumberFormat("en-US").format(num);
  };

  const items = [
    {
      label: "Square Footage",
      icon: <Ruler className="h-4.5 w-4.5" />,
      value: formatNumber(features.square_footage),
      unit: "sq ft",
    },
    {
      label: "Lot Size",
      icon: <Layers className="h-4.5 w-4.5" />,
      value: formatNumber(features.lot_size),
      unit: "sq ft",
    },
    {
      label: "Bedrooms",
      icon: <Bed className="h-4.5 w-4.5" />,
      value: features.bedrooms?.toString() ?? "0",
      unit: "",
    },
    {
      label: "Bathrooms",
      icon: <Bath className="h-4.5 w-4.5" />,
      value: features.bathrooms?.toString() ?? "0",
      unit: "",
    },
    {
      label: "Property Age",
      icon: <History className="h-4.5 w-4.5" />,
      value: features.property_age?.toString() ?? "0",
      unit: "years",
    },
    {
      label: "Neighborhood Rating",
      icon: <MapPin className="h-4.5 w-4.5" />,
      value: features.neighborhood_rating?.toFixed(1) ?? "0.0",
      unit: "/ 10",
    },
    {
      label: "School Rating",
      icon: <GraduationCap className="h-4.5 w-4.5" />,
      value: features.school_rating?.toFixed(1) ?? "0.0",
      unit: "/ 10",
    },
  ];

  return (
    <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-card hover:translate-y-[-2px] hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
      <div className="flex items-center gap-2.5 pb-5 mb-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ClipboardList className="h-4.5 w-4.5" />
        </div>
        <h3 className="text-sm uppercase font-bold text-ink-900 tracking-wider font-heading">
          Property Summary
        </h3>
      </div>

      <div className="flex-1 divide-y divide-border/60">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-primary shrink-0">
                {item.icon}
              </div>
              <span className="text-xs uppercase font-bold text-ink-600 tracking-wider">
                {item.label}
              </span>
            </div>
            <div className="flex items-baseline font-sans text-[20px] font-semibold text-ink-900 tabular-nums">
              <span>{item.value}</span>
              {item.unit && (
                <span className="text-xs font-normal text-ink-600 ml-1 select-none">
                  {item.unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
