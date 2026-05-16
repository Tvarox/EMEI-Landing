"use client";

import { ZapIcon, NetworkIcon } from "@/components/icons";

export const EdgeSection = () => (
  <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10 border-y border-slate-900/50">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">The Technical Edge</h2>
      <p className="text-slate-400 font-light max-w-xl mx-auto">
        Combining neural underwriting with programmable settlement to rebuild trust in global trade.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* AI Column */}
      <div className="p-8 rounded-3xl bg-slate-900/20 border border-slate-800/50 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-transparent" />
        <div className="mb-6 w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
          <ZapIcon />
        </div>
        <h3 className="text-2xl font-serif text-white mb-4">AI Underwriting</h3>
        <ul className="space-y-4">
          {[
            "Instant credit risk assessment",
            "Predictive fraud detection",
            "Dynamic financing fees based on real-time data",
            "Reduced decision time from weeks to minutes"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-400 text-sm font-light">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Blockchain Column */}
      <div className="p-8 rounded-3xl bg-slate-900/20 border border-slate-800/50 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-500 to-transparent" />
        <div className="mb-6 w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
          <NetworkIcon />
        </div>
        <h3 className="text-2xl font-serif text-white mb-4">Blockchain Settlement</h3>
        <ul className="space-y-4">
          {[
            "Immutable, transparent transaction logs",
            "Instant stablecoin settlement via Layer-2",
            "Invoices as programmable digital assets",
            "Global accessibility without traditional banking friction"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-400 text-sm font-light">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    <div className="mt-16 text-center">
      <p className="text-xs font-mono text-slate-600 uppercase tracking-widest">
        Traditional Factoring: 2-3 Weeks • EMEI Protocol: ~4 Minutes
      </p>
    </div>
  </section>
);
