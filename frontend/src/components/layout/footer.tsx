"use client";

import React from "react";
import Link from "next/link";
import { Landmark } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-secondary mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo & Description Column */}
          <div className="space-y-4 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                <Landmark className="h-4 w-4" />
              </div>
              <span className="font-heading text-md font-bold tracking-tight text-ink-900 group-hover:text-primary transition-colors duration-300">
                PropValuate
              </span>
            </Link>
            <p className="text-sm text-ink-600 max-w-xs leading-relaxed">
              Leveraging advanced machine learning to estimate residential property values with transparency and precision.
            </p>
          </div>

          {/* Links Columns */}
          <div className="mt-8 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold text-ink-900 tracking-wider uppercase">
                Platform
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link href="/" className="text-sm text-ink-600 hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/predict" className="text-sm text-ink-600 hover:text-primary transition-colors">
                    Value Estimator
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="text-sm text-ink-600 hover:text-primary transition-colors">
                    Model Insights
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-ink-900 tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-ink-600 hover:text-primary transition-colors"
                  >
                    Linear Regression
                  </a>
                </li>
                <li>
                  <Link href="/insights#metrics" className="text-sm text-ink-600 hover:text-primary transition-colors">
                    Performance Metrics
                  </Link>
                </li>
                <li>
                  <Link href="/insights#coefficients" className="text-sm text-ink-600 hover:text-primary transition-colors">
                    Feature Coefficients
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold text-ink-900 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="#" className="text-sm text-ink-600 hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-ink-600 hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 space-y-6">
          {/* Zillow/Redfin-Style Disclaimer */}
          <div className="bg-background rounded-xl p-4 border border-border/60">
            <p className="text-xs text-ink-600 leading-relaxed">
              <strong className="text-ink-900 font-semibold uppercase tracking-wider block mb-1">
                Important Disclaimer
              </strong>
              PropValuate estimates are calculated using standard linear regression models based on historical public records and local housing markers. These estimates are generated for informational and research purposes only, and do not constitute professional appraisals, financial valuations, or investment advice. Actual transaction prices may vary significantly based on home condition, local market volatility, and other factors not captured by the model.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-ink-300">
              &copy; {currentYear} PropValuate Inc. All rights reserved.
            </p>
            <p className="text-xs text-ink-300 flex items-center gap-1">
              <span>Built using Next.js 16 &amp; Tailwind CSS v4</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
