import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Predict Property Value",
  description: "Calculate instant residential home price estimates by inputting square footage, school ratings, and property age.",
  openGraph: {
    title: "Predict Property Value | PropValuate",
    description: "Calculate instant residential home price estimates by inputting square footage, school ratings, and property age.",
  },
};

export default function PredictLayout({ children }: { children: React.ReactNode }) {
  return children;
}
