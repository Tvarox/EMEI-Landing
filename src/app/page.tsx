"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Landing sections ─── */
import { InitialScreen } from "@/components/landing/initial-screen";
import { AmbientBackground } from "@/components/landing/ambient-background";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSolutionSection as AscentSection } from "@/components/landing/ascent-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { WhoBenefitsSection as CloudSeaSection } from "@/components/landing/cloud-sea-section";
import { EdgeSection } from "@/components/landing/edge-section";
import { VisionSection as MonasterySection } from "@/components/landing/monastery-section";
import { CTASection } from "@/components/landing/cta-section";
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
      className={`relative min-h-screen w-full transition-colors duration-1000 ${
        isTransitioned
          ? "bg-slate-950 overflow-x-hidden"
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
          <motion.div
            key="emei"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
            className="flex flex-col w-full text-slate-50 relative z-10"
          >
            <AmbientBackground />
            <HeroSection />
            <AscentSection />
            <HowItWorksSection />
            <CloudSeaSection />
            <EdgeSection />
            <MonasterySection />
            <CTASection />
            <PageFooter />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-overlay bg-zinc-100" />
    </main>
  );
}
