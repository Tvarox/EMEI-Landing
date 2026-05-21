"use client";

import React from "react";
import { ArrowRight, Briefcase, Building, LineChart, Bot } from "lucide-react";

export const FeatureSimSection = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-28 lg:py-32 px-6 overflow-hidden">
      {/* Background Graphic (CSS Pattern / Simplified) */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 70% 50%, rgba(0,0,0,0.1) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        maskImage: 'radial-gradient(ellipse at 70% 50%, black 20%, transparent 60%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 20%, transparent 60%)'
      }} />

      {/* Another layer of pattern to simulate depth */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 65% 55%, rgba(0,0,0,0.1) 1.5px, transparent 1.5px)`,
        backgroundSize: '16px 16px',
        maskImage: 'radial-gradient(ellipse at 65% 55%, black 15%, transparent 50%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 65% 55%, black 15%, transparent 50%)'
      }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center max-w-xl">
          <h2 className="text-3xl md:text-5xl tracking-tight text-black font-light mb-2">
            Introducing the
          </h2>
          <h3 className="text-3xl md:text-5xl tracking-tight text-black font-light mb-8 md:mb-10 leading-tight">
            programmable financial asset
          </h3>
          
          <p className="text-black/70 text-base md:text-lg mb-8 max-w-md leading-relaxed">
            A blockchain-native financial operating system that transforms invoices into liquid assets. Get paid instantly against unpaid invoices while preserving net payment terms for your buyers.
          </p>
          
          <div>
            <button className="flex items-center gap-3 bg-white border border-black/10 text-black px-4 py-2 rounded-full font-medium hover:bg-black/5 transition-colors shadow-sm group">
              <span className="bg-black p-1 rounded-md flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
              Read the Whitepaper
            </button>
          </div>
        </div>

        {/* Right Content (Filled with Target Audiences / Use Cases) */}
        <div className="hidden md:grid grid-cols-2 gap-4 relative z-10 pt-4">
          
          {/* Card 1: Suppliers */}
          <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all h-fit">
            <h4 
              className="font-normal text-xl text-black mb-3 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-vt323), monospace' }}
            >
              <span className="bg-[#e05e46]/10 p-2 rounded-full text-[#e05e46]">
                <Briefcase className="w-4 h-4" />
              </span>
              For Suppliers
            </h4>
            <p className="text-sm text-black/60 leading-relaxed">
              Eliminate cash flow bottlenecks by instantly financing outstanding invoices at transparent, market-driven rates.
            </p>
          </div>

          {/* Card 2: Enterprise Buyers (Staggered down) */}
          <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all h-fit mt-12">
            <h4 
              className="font-normal text-xl text-black mb-3 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-vt323), monospace' }}
            >
              <span className="bg-[#e05e46]/10 p-2 rounded-full text-[#e05e46]">
                <Building className="w-4 h-4" />
              </span>
              For Buyers
            </h4>
            <p className="text-sm text-black/60 leading-relaxed">
              Optimize working capital by preserving 90-day net payment terms without starving your critical supply chain of cash.
            </p>
          </div>

          {/* Card 3: Investors (Staggered up) */}
          <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all h-fit -mt-6">
            <h4 
              className="font-normal text-xl text-black mb-3 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-vt323), monospace' }}
            >
              <span className="bg-[#e05e46]/10 p-2 rounded-full text-[#e05e46]">
                <LineChart className="w-4 h-4" />
              </span>
              For Investors
            </h4>
            <p className="text-sm text-black/60 leading-relaxed">
              Access a new, uncorrelated asset class of short-duration, real-world credit yielding highly predictable returns.
            </p>
          </div>

          {/* Card 4: AI Agents */}
          <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all h-fit mt-6">
            <h4 
              className="font-normal text-xl text-black mb-3 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-vt323), monospace' }}
            >
              <span className="bg-[#e05e46]/10 p-2 rounded-full text-[#e05e46]">
                <Bot className="w-4 h-4" />
              </span>
              For AI Agents
            </h4>
            <p className="text-sm text-black/60 leading-relaxed">
              Enable fully autonomous AI-to-AI commerce with programmatic invoicing, instant stablecoin settlement, and credit building.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
