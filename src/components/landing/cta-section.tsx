"use client";

import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-button";

export const CTASection = () => (
  <section className="relative w-full max-w-7xl mx-auto px-6 py-40 z-10">
    <div className="relative flex flex-col items-center text-center">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight">
          Stop waiting to get paid.
        </h2>
        <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
          Join the forward-thinking businesses and AI agents turning unpaid invoices into instant working capital.
        </p>
        
        <div className="pt-10 flex flex-col items-center gap-6">
          <LiquidButton size="lg" className="w-64">
            GET STARTED
          </LiquidButton>
          
          <button className="text-slate-500 hover:text-white transition-colors text-xs font-mono tracking-[0.3em] uppercase">
            Talk to an Expert
          </button>
        </div>
      </motion.div>

      {/* Trust bar */}
      <div className="mt-32 w-full pt-8 border-t border-slate-900/50 flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
        <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-500/50" /> AI Underwriting</span>
        <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-500/50" /> Stablecoin Settlement</span>
        <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-500/50" /> On-Chain Transparency</span>
      </div>
    </div>
  </section>
);
