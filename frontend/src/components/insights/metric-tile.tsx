"use client";

import React from "react";

interface MetricTileProps {
  label: string;
  value: string | number;
  description: string;
  isPrimary?: boolean;
  icon?: React.ReactNode;
}

export function MetricTile({ label, value, description, isPrimary = false, icon }: MetricTileProps) {
  return (
    <div
      className={`group p-6 rounded-2xl border transition-all duration-300 hover:translate-y-[-2px] ${
        isPrimary
          ? "bg-primary-light border-primary/20 hover:shadow-[0_6px_20px_rgba(11,95,255,0.1)]"
          : "bg-card border-border hover:shadow-card-hover"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <span
          className={`text-[10px] md:text-xs font-bold uppercase tracking-widest font-heading block ${
            isPrimary ? "text-primary/90 dark:text-ink-600" : "text-ink-600"
          }`}
        >
          {label}
        </span>

        {icon && (
          <div
            className={`p-2.5 rounded-lg shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300 ${
              isPrimary
                ? "bg-primary/10 text-primary dark:bg-primary/20"
                : "bg-primary/5 text-primary"
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      <div
        className={`text-2xl md:text-3xl font-extrabold font-sans tracking-tight tabular-nums leading-none mt-3.5 ${
          isPrimary ? "text-primary font-black" : "text-ink-900"
        }`}
      >
        {value}
      </div>

      <p
        className={`text-xs mt-4 leading-relaxed font-normal ${
          isPrimary ? "text-primary/80 dark:text-ink-600" : "text-ink-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
