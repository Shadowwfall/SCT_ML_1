"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Predict", href: "/predict" },
    { label: "Insights", href: "/insights" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
              <Landmark className="h-5 w-5" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-ink-900 group-hover:text-primary transition-colors duration-300">
              PropValuate
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex h-full items-center text-sm font-medium transition-colors duration-200 py-1",
                isActive(link.href)
                  ? "text-primary font-semibold"
                  : "text-ink-600 hover:text-primary"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link href="/predict" passHref>
            <Button variant="default" size="lg" className="shadow-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform">
              New Prediction
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-ink-600 hover:bg-muted hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            aria-expanded={isOpen}
            aria-label="Toggle main menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer/Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-card animate-in slide-in-from-top duration-300 ease-out">
          <div className="space-y-1.5 px-4 pt-2 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center w-full rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200",
                  isActive(link.href)
                    ? "bg-primary/5 text-primary font-semibold"
                    : "text-ink-600 hover:bg-muted hover:text-ink-900"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border mt-3 px-3">
              <Link href="/predict" onClick={() => setIsOpen(false)} passHref className="w-full block">
                <Button variant="default" size="lg" className="w-full shadow-sm">
                  New Prediction
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
