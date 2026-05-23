"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function CTA() {
  return (
    <section className="relative w-full bg-[#0f0f0f] pt-16 pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[45vh] sm:min-h-[48vh] md:min-h-[50vh]">
      {/* Subtle animating background beams */}
      <BackgroundBeams />
      
      {/* Static Content Layer */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6 py-10 sm:py-12">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-5 md:mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Get Early Access
        </h2>
        <p className="text-white/70 text-base md:text-xl mb-8 md:mb-10 max-w-2xl leading-relaxed">
          Join the network of forward-thinking businesses and autonomous agents building the future of programmable B2B liquidity.
        </p>
        
        <button className="group relative flex items-center gap-4 bg-white text-black pl-8 pr-4 py-3 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] overflow-hidden cursor-pointer">
          <span className="relative z-10">Join the Waitlist</span>
          <span className="relative z-10 bg-black text-white p-3 rounded-full group-hover:rotate-[-45deg] transition-transform duration-300">
            <ArrowRight className="w-5 h-5" />
          </span>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </section>
  );
}
