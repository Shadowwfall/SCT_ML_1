import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PropValuate — Real Estate Valuation & Predictive Pricing",
    template: "%s | PropValuate",
  },
  description: "Estimate any residential property's market value in seconds using a trained linear regression machine learning model.",
  keywords: ["real estate valuation", "house price prediction", "machine learning price estimate", "linear regression real estate", "property price calculator"],
  authors: [{ name: "PropValuate Team" }],
  openGraph: {
    title: "PropValuate — Real Estate Valuation & Predictive Pricing",
    description: "Estimate any residential property's market value in seconds using a trained machine learning model.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
