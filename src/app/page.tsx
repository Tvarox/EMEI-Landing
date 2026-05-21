"use client";

import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { FeatureSimSection } from "@/components/landing/feature-sim-section";
import { WaitlistSection } from "@/components/landing/waitlist-section";
import { PageFooter } from "@/components/layout/page-footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#f4f3ef] overflow-x-hidden font-sans select-none">
      <Navbar />
      
      <div className="flex flex-col w-full relative z-10 pt-16">
        <HeroSection />
        <StatsSection />
        <FeatureSimSection />
      </div>

      <WaitlistSection />

      <div className="mt-0">
        <PageFooter />
      </div>
    </main>
  );
}
