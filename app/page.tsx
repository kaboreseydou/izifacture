"use client";

import React from "react";
import { LandingNav } from "@/components/landing/landing-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaBannerSection } from "@/components/landing/cta-banner-section";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans antialiased overflow-x-hidden">
      {/* Navigation Header */}
      <LandingNav />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ProblemSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaBannerSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
