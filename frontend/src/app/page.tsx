"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Brain, Sliders, TrendingUp, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background min-h-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-indigo-900 text-white py-20 md:py-32">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="relative z-10 space-y-6 lg:col-span-7 text-center lg:text-left">
              <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
                Estimate Any Property&apos;s Market Value
              </h1>
              <p className="text-lg md:text-xl text-primary-light/90 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                PropValuate uses a trained linear regression machine learning model to estimate residential property prices in seconds. Input parameters like square footage, neighborhood rating, and school quality to get instant valuations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link href="/predict" passHref>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full sm:w-auto h-12 px-8 bg-white text-primary hover:bg-primary-light hover:text-primary-dark transition-all duration-300 font-semibold text-base shadow-lg shadow-black/10 hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/insights" passHref>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-12 px-8 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/50 font-medium text-base transition-all duration-300"
                  >
                    View Model Insights
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Abstract Visual Decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 sm:opacity-25 lg:relative lg:col-span-5 lg:opacity-100 lg:pointer-events-auto lg:inset-auto z-0">
              <div className="relative w-full max-w-[420px] aspect-square animate-fade-in duration-1000">
                {/* Glowing backdrop shadow */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />

                {/* Main Graphic */}
                <svg
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full relative drop-shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                >
                  {/* Grid Lines */}
                  <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
                    <line x1="50" y1="50" x2="50" y2="350" />
                    <line x1="125" y1="50" x2="125" y2="350" />
                    <line x1="200" y1="50" x2="200" y2="350" />
                    <line x1="275" y1="50" x2="275" y2="350" />
                    <line x1="350" y1="50" x2="350" y2="350" />
                    <line x1="50" y1="50" x2="350" y2="50" />
                    <line x1="50" y1="125" x2="350" y2="125" />
                    <line x1="50" y1="200" x2="350" y2="200" />
                    <line x1="50" y1="275" x2="350" y2="275" />
                    <line x1="50" y1="350" x2="350" y2="350" />
                  </g>

                  {/* House Silhouette (Stylized / Linear) */}
                  <path
                    d="M100 280V180L200 100L300 180V280H100Z"
                    fill="url(#houseGrad)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />
                  <path
                    d="M140 280V220H180V280H140Z"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="220"
                    y="200"
                    width="40"
                    height="40"
                    rx="4"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                  />

                  {/* Prediction/Trend Line Chart Overlay */}
                  <path
                    d="M50 320 C 120 290, 180 180, 240 160 C 290 140, 310 110, 350 80"
                    stroke="url(#lineGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_var(--color-primary-light)]"
                  />

                  {/* Glowing Data Nodes */}
                  <circle cx="50" cy="320" r="5" fill="#E5F0FF" stroke="#0B5FFF" strokeWidth="2" />
                  <circle cx="120" cy="290" r="5" fill="#E5F0FF" stroke="#0B5FFF" strokeWidth="2" />
                  <circle cx="240" cy="160" r="6" fill="#FFFFFF" stroke="#00C0FF" strokeWidth="3" className="animate-pulse" />
                  <circle cx="350" cy="80" r="5" fill="#E5F0FF" stroke="#0B5FFF" strokeWidth="2" />

                  {/* Definitions */}
                  <defs>
                    <linearGradient id="houseGrad" x1="200" y1="100" x2="200" y2="280" gradientUnits="userSpaceOnUse">
                      <stop stopColor="rgba(255, 255, 255, 0.08)" />
                      <stop offset="1" stopColor="rgba(255, 255, 255, 0.02)" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="50" y1="320" x2="350" y2="80" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00C0FF" />
                      <stop offset="0.5" stopColor="#E5F0FF" />
                      <stop offset="1" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions / Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Why Use PropValuate?
          </h2>
          <p className="text-lg text-ink-600 font-light leading-relaxed">
            Our predictive platform streamlines property estimations using real-time inputs and transparent machine learning algorithms.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="group border border-border bg-card rounded-2xl p-8 shadow-sm hover:translate-y-[-4px] hover:shadow-card-hover transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-6 shadow-sm">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-ink-900 mb-2">
              Linear Regression Core
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              PropValuate is backed by a fully trained and verified scikit-learn Linear Regression model, guaranteeing transparent coefficient mappings for every property feature.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group border border-border bg-card rounded-2xl p-8 shadow-sm hover:translate-y-[-4px] hover:shadow-card-hover transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-6 shadow-sm">
              <Sliders className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-ink-900 mb-2">
              Interactive Sliders &amp; Form
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              Fine-tune estimate factors like school rating, neighborhood safety, and size instantly. See dynamically calculated impacts on home value without reloading.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group border border-border bg-card rounded-2xl p-8 shadow-sm hover:translate-y-[-4px] hover:shadow-card-hover transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-6 shadow-sm">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-ink-900 mb-2">
              Deep Analytics Dashboard
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              Explore R² score, mean absolute error (MAE), and regression coefficients on a clean model stats table. Real estate mathematics made fully visual.
            </p>
          </div>
        </div>
      </section>

      {/* Helpful Info Section */}
      <section className="border-t border-border bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-primary">
                <HelpCircle className="h-5 w-5" />
                <span className="font-semibold text-sm uppercase tracking-wider">How it works</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-ink-900">
                Curious about the math behind the predictions?
              </h3>
              <p className="text-ink-600 text-sm leading-relaxed">
                A linear regression model estimates value by assigning a mathematical &ldquo;weight&rdquo; (coefficient) to each input parameter. For example, each square foot of space or point improvement in school rating adds a predictable dollar value. Check the Insights page to view the exact weights.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/insights" passHref>
                <Button variant="outline" size="lg" className="w-full md:w-auto h-12 px-6 font-semibold">
                  Explore Model Insights
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
