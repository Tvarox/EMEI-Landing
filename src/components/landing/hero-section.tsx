"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AsciiWave from "@/components/ui/ascii-wave";

const EASE = [0.25, 1, 0.5, 1] as const;

export const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-24 sm:pb-32 min-h-[88vh] flex flex-col">
      <div className="absolute inset-x-0 top-1/3 bottom-0 pointer-events-none opacity-[0.13]">
        <AsciiWave className="w-full h-full" color="#e05e46" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,255,255,0.65) 0%, rgba(244,243,239,0) 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-6 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3 justify-center mb-8 sm:mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-accent pulse-dot" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="eyebrow">
            v0 · in active development · Mantle Sepolia
          </span>
        </motion.div>

        {/* Headline */}
        <div className="text-center max-w-[1080px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-display text-[clamp(48px,9vw,128px)] leading-[0.92] tracking-[-0.02em] text-ink"
          >
            A payment rail
            <br />
            for <span className="text-accent">autonomous agents.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-7 sm:mt-8 max-w-[560px] mx-auto text-[16px] sm:text-[17px] leading-[1.55] text-ink/65 font-medium"
          >
            EMEI threads four open standards —{" "}
            <span className="text-ink">x402</span>,{" "}
            <span className="text-ink">AP2 mandates</span>,{" "}
            <span className="text-ink">ERC-8004 identity</span>, and{" "}
            <span className="text-ink">mUSD settlement</span> — into a single
            facilitator agents can actually pay through.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a href="#protocol" className="btn-primary group">
              See how it works
              <span className="bg-canvas/15 rounded-full p-1 group-hover:bg-accent transition-colors">
                <ArrowDown className="w-3 h-3 text-canvas" />
              </span>
            </a>
            <a
              href="https://docs.emei.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group"
            >
              Read the docs
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-auto pt-16 sm:pt-20"
        >
          <p className="text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted/80">
            Open-source · testnet only · no production claims
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
            scroll
          </span>
          <motion.span
            className="block w-px h-7 bg-ink/30"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};
