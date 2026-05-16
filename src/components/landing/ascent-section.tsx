"use client";

import { motion } from "framer-motion";

/* ─── Transaction simulation data ─── */
const TRANSACTION_STEPS = [
  { label: "Invoice Submitted", value: "₹50,00,000", status: "DONE" },
  { label: "AI Verification", value: "98% Confidence", status: "DONE" },
  { label: "Advance Amount", value: "₹45,00,000", status: "ACTIVE" },
  { label: "Processing Time", value: "4 Minutes", status: "PENDING" }
];

/* ─── TransactionCard ─── */
const TransactionCard = () => (
  <div className="relative group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md overflow-hidden shadow-2xl">
    {/* Ambient accent */}
    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-blue-500/[0.05] group-hover:bg-blue-500/[0.1] transition-all duration-700" />

    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/50 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-xs font-medium tracking-widest text-slate-300 uppercase">
          Live Transaction
        </span>
      </div>
      <span className="text-xs text-blue-400 font-mono">TX_8829_A</span>
    </div>

    <div className="space-y-6 relative z-10">
      {TRANSACTION_STEPS.map((step, i) => (
        <motion.div 
          key={step.label} 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-xs text-slate-500 mb-1">{step.label}</p>
            <p className={`text-xl font-light ${step.status === 'ACTIVE' ? 'text-blue-400' : 'text-white'}`}>
              {step.value}
            </p>
          </div>
          {step.status === 'DONE' && (
            <span className="text-[10px] text-blue-500 font-mono">✓ VERIFIED</span>
          )}
          {step.status === 'ACTIVE' && (
            <span className="text-[10px] text-blue-400 font-mono animate-pulse">PROCESSING...</span>
          )}
        </motion.div>
      ))}
    </div>
    
    <div className="mt-8 pt-6 border-t border-slate-800/50">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Settlement Layer</span>
        <span className="text-[10px] text-slate-300 font-mono">POLYGON_MAINNET</span>
      </div>
    </div>
  </div>
);

/**
 * ProblemSolutionSection — Explains the cash flow gap and shows EMEI's instant solution.
 */
export const ProblemSolutionSection = () => (
  <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      {/* Problem Column */}
      <div className="lg:col-span-7 space-y-8">
        <div className="inline-block px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] font-medium tracking-widest uppercase">
          The Problem
        </div>
        <h2 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight tracking-tight">
          Work is finished. <br />
          <span className="text-slate-500">Payment is months away.</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-xl font-light leading-relaxed">
          Many businesses complete projects today but wait 90+ days for payment. 
          This creates a critical cash flow gap that halts growth and stalls operations.
        </p>
        
        {/* Simple timeline visual */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-4">
          <span>Invoiced</span>
          <div className="h-[1px] flex-1 bg-slate-800 relative">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-700" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-700" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500/40 mt-4">90 Day Gap</div>
          </div>
          <span>Paid</span>
        </div>
      </div>

      {/* Solution Column */}
      <div className="lg:col-span-5 relative">
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full -z-10" />
        <TransactionCard />
      </div>
    </div>
  </section>
);
