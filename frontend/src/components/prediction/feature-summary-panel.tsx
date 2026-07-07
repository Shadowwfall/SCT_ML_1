"use client";

import React from "react";
import { Ruler, Layers, Bed, Bath, History, MapPin, GraduationCap, ClipboardList } from "lucide-react";
import { formatNumber } from "@/lib/format";

interface FeatureSummaryPanelProps {
  features: Record<string, number>;
}

export function FeatureSummaryPanel({ features }: FeatureSummaryPanelProps) {
  const formatNumberHelper = (num: number | undefined) => {
    if (num === undefined || num === null) return "N/A";
    return formatNumber(num);
  };

  const items = [
    {
      label: "Square Footage",
      icon: <Ruler className="h-4.5 w-4.5" />,
      value: formatNumberHelper(features.square_footage),
      unit: "sq ft",
    },
    {
      label: "Lot Size",
      icon: <Layers className="h-4.5 w-4.5" />,
      value: formatNumberHelper(features.lot_size),
      unit: "sq ft",
    },
    {
      label: "Bedrooms",
      icon: <Bed className="h-4.5 w-4.5" />,
      value: features.bedrooms !== undefined && features.bedrooms !== null ? features.bedrooms.toString() : "N/A",
      unit: "",
    },
    {
      label: "Bathrooms",
      icon: <Bath className="h-4.5 w-4.5" />,
      value: features.bathrooms !== undefined && features.bathrooms !== null ? features.bathrooms.toString() : "N/A",
      unit: "",
    },
    {
      label: "Property Age",
      icon: <History className="h-4.5 w-4.5" />,
      value: features.property_age !== undefined && features.property_age !== null ? features.property_age.toString() : "N/A",
      unit: "years",
    },
    {
      label: "Neighborhood Rating",
      icon: <MapPin className="h-4.5 w-4.5" />,
      value: features.neighborhood_rating !== undefined && features.neighborhood_rating !== null ? features.neighborhood_rating.toFixed(1) : "N/A",
      unit: "/ 10",
    },
    {
      label: "School Rating",
      icon: <GraduationCap className="h-4.5 w-4.5" />,
      value: features.school_rating !== undefined && features.school_rating !== null ? features.school_rating.toFixed(1) : "N/A",
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
            className="group/item flex items-center justify-between py-3.5 px-3 -mx-3 first:mt-[-4px] last:mb-[-4px] rounded-xl hover:bg-secondary/40 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-primary shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                {item.icon}
              </div>
              <span className="text-xs uppercase font-bold text-ink-600 tracking-wider">
                {item.label}
              </span>
            </div>
            <div className="flex items-baseline font-sans text-[20px] font-semibold text-ink-900 tabular-nums">
              <span>{item.value}</span>
              {item.unit && item.value !== "N/A" && (
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
