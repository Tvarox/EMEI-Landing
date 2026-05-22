"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import AsciiWave from "@/components/ui/ascii-wave";

const METRIC_RIBBON = [
  { label: "chain", value: "5003" },
  { label: "facilitator p99", value: "142ms" },
  { label: "uptime", value: "99.97%" },
  { label: "auto-collect", value: "10s" },
  { label: "receipts", value: "30s" },
  { label: "fuzz calls", value: "76,800" },
];

export const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-16 sm:pb-24 lg:pb-28">
      {/* Subtle ASCII flame texture, only in lower 60% */}
      <div className="absolute inset-x-0 top-1/3 bottom-0 pointer-events-none opacity-[0.16]">
        <AsciiWave className="w-full h-full" color="#e05e46" />
      </div>

      {/* Cream-to-cream radial wash for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,255,255,0.6) 0%, rgba(244,243,239,0) 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="flex items-center gap-3 justify-center mb-8 sm:mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-accent pulse-dot" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="eyebrow">
            Live on Mantle Sepolia · chain 5003
          </span>
        </motion.div>

        {/* Headline */}
        <div className="text-center max-w-[1080px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="font-display text-[clamp(48px,9vw,128px)] leading-[0.92] tracking-[-0.02em] text-ink"
          >
            Direct-debit for
            <br />
            <span className="text-accent">AI&nbsp;agents.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="mt-7 sm:mt-8 max-w-[640px] mx-auto text-[16px] sm:text-[18px] leading-[1.55] text-ink/70 font-medium"
          >
            Issue an on-chain invoice. Attach a scoped payer mandate.
            Auto-collect on the due date — settled in yield-bearing{" "}
            <span className="text-ink">mUSD</span> on Mantle, payable from any
            chain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a href="#developers" className="btn-primary group">
              Start in 5 minutes
              <span className="bg-canvas/15 rounded-full p-1 group-hover:bg-accent transition-colors">
                <ArrowUpRight className="w-3 h-3 text-canvas" />
              </span>
            </a>
            <a href="#enterprise" className="btn-secondary group">
              <Terminal className="w-3.5 h-3.5" />
              Talk to engineering
            </a>
          </motion.div>
        </div>

        {/* Metric ribbon — glassmorphic on cream */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="relative mt-16 sm:mt-20 mx-auto max-w-[1100px]"
        >
          <div className="rounded-2xl border border-hairline bg-white/60 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.03)]">
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-hairline">
              {METRIC_RIBBON.map((m) => (
                <li
                  key={m.label}
                  className="flex flex-col items-start justify-center gap-1 py-4 px-5"
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                    {m.label}
                  </span>
                  <span className="font-mono tabular text-[15px] font-medium text-ink">
                    {m.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Sub-caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted/80"
        >
          Programmable invoices · scoped mandates · settled in yield
        </motion.p>
      </div>
    </section>
  );
};
