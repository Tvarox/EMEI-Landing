"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Landing sections ─── */
import { InitialScreen } from "@/components/landing/initial-screen";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { WhoBenefitsSection as CloudSeaSection } from "@/components/landing/cloud-sea-section";
import { PageHeader } from "@/components/layout/page-header";
import { PageFooter } from "@/components/layout/page-footer";

/**
 * Home — Landing page orchestrator.
 *
 * Manages the two-phase transition:
 *   1. Initial decrypt screen (noise background + encrypted text)
 *   2. Full EMEI experience (hero → problem → how it works → stakeholders → tech → vision → cta)
 */
export default function Home() {
  const [isTransitioned, setIsTransitioned] = useState(false);

  return (
    <main
      className={`relative min-h-screen w-full ${
        isTransitioned
          ? "bg-transparent overflow-x-hidden"
          : "bg-black overflow-hidden"
      }`}
    >
      <AnimatePresence mode="wait">
        {!isTransitioned ? (
          <InitialScreen
            key="initial"
            onStart={() => setIsTransitioned(true)}
          />
        ) : (
          <div className="flex flex-col w-full text-slate-50 relative z-10">
            {/* Fixed static background PNG */}
            <div 
              className="fixed inset-0 -z-50 w-full h-full bg-[url('/BG.png')] bg-[size:100%_100%] bg-center bg-no-repeat pointer-events-none"
              aria-hidden="true"
            />
            <PageHeader />
            <HeroSection />
            <HowItWorksSection />
            <CloudSeaSection />
            <PageFooter />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
