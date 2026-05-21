"use client";

import { motion } from "framer-motion";

/**
 * HeroSection — The grand EMEI reveal with scroll indicator.
 *
 * Replaces the animated blur-[120px] blob with a CSS radial gradient
 * that breathes via opacity/scale — no blur computation needed.
 */
export const HeroSection = () => (
  <div className="relative min-h-screen w-full">
    {/* EMEI Brand Block: Left-aligned at 75px X and 164px Y */}
    <div className="absolute left-6 top-[120px] md:left-[75px] md:top-[164px] flex flex-col items-start z-10 max-w-4xl">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-6xl md:text-[128px] font-serif font-normal text-white leading-none tracking-tight select-none"
      >
        EMEI
      </motion.h1>

      {/* Underline — Replicating the solid line from Figma */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-[2px] bg-white/90 mt-1 md:-mt-2 mb-0 md:mb-[6px] w-full max-w-[640px]"
      />

      {/* Tagline / Subtext — Replicated exactly at 24px Font Size */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.2 }}
        className="text-lg md:text-[24px] font-sans font-light text-slate-100 leading-snug tracking-wide"
      >
        <p>Turn Unpaid Invoices into Instant Cash</p>
        <p className="mt-0.5">– Powered by AI and Blockchain</p>
      </motion.div>
    </div>

  </div>
);
