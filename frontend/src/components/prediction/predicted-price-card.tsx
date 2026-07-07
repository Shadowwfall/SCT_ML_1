"use client";

import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Info } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface PredictedPriceCardProps {
  price: number;
  modelVersion: string;
}

export function PredictedPriceCard({ price, modelVersion }: PredictedPriceCardProps) {
  const [displayValue, setDisplayValue] = useState(Math.floor(price * 0.75));
  const prevPriceRef = useRef(price);

  useEffect(() => {
    // animate from previous price (or 75% of new price if no previous price or target reset) to the new price
    const startValue = prevPriceRef.current !== price && prevPriceRef.current > 0
      ? prevPriceRef.current 
      : Math.floor(price * 0.75);
    
    prevPriceRef.current = price;

    const duration = 800; // 0.8 seconds for smooth snappy animation
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutQuad
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * (price - startValue) + startValue);
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [price]);



  return (
    <div className="group bg-card border border-border p-6 md:p-10 rounded-2xl shadow-card hover:translate-y-[-2px] hover:shadow-card-hover transition-all duration-300 relative overflow-hidden">
      {/* Decorative background gradient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/8 transition-colors duration-300" />
      
      <div className="relative flex flex-col items-center text-center space-y-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <TrendingUp className="h-6 w-6" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xs uppercase font-semibold text-ink-600 tracking-widest font-heading">
            Estimated Market Value
          </h3>
          <p className="text-xs text-ink-600">
            Computed in real-time using <span className="font-semibold text-primary">{modelVersion}</span>
          </p>
        </div>

        {/* Hero Price Display inside Primary Light Pill Background */}
        <div className="bg-primary-light text-primary px-8 py-4 rounded-2xl md:rounded-full font-bold text-4xl md:text-5xl font-sans tracking-tight tabular-nums shadow-sm border border-primary/10 select-none">
          {formatCurrency(displayValue)}
        </div>

        {/* Disclaimer Text */}
        <div className="flex items-start justify-center gap-2 max-w-xl text-center border-t border-border/60 pt-6 w-full">
          <Info className="h-4.5 w-4.5 text-ink-600 mt-0.5 shrink-0" />
          <p className="text-xs text-ink-600 leading-relaxed">
            PropValuate estimates are for informational purposes only and are not appraisals. 
            Actual market values may vary based on specific property conditions, local demand, and updates not captured in this model.
          </p>
        </div>
      </div>
    </div>
  );
}
