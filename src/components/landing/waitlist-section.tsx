"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export const WaitlistSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for the dome flattening
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // 0 when top of section hits bottom of viewport
    // 1 when top of section hits top of viewport
    offset: ["start end", "start start"] 
  });

  // Flatten the dome as it natively scrolls into view. Flattens completely at 80% to avoid gaps at top.
  // We calculate a responsive starting radius (percentage) so that small (sm) and medium screens
  // get a sweeping, flatter curve (larger arc radius of curvature) rather than a pointed bullet shape.
  const rawProgress = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const borderRadius = useTransform(rawProgress, (val) => {
    if (typeof window === "undefined") return `${val * 100}%`;
    
    let startPercent = 100;
    if (window.innerWidth < 640) {
      startPercent = 35; // Mobile (sm) gets a gentle, flatter sweeping arc
    } else if (window.innerWidth < 1024) {
      startPercent = 60; // Tablet gets a smooth, moderate arc
    }
    return `${val * startPercent}%`;
  });

  return (
    <section ref={containerRef} className="relative w-full bg-[#f4f3ef] pt-8 sm:pt-10 overflow-hidden flex flex-col items-center justify-center min-h-[45vh] sm:min-h-[48vh] md:min-h-[50vh]">
      
      {/* Animated Background Dome */}
      <motion.div 
        className="absolute bottom-0 w-full bg-[#111111] origin-bottom overflow-hidden"
        style={{
          height: "100%", // Fills the section from the bottom
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }}
      >
        <BackgroundBeams />
      </motion.div>
      
      {/* Static Content Layer (Always visible, prevents text stretching) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6 py-10 sm:py-12">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-5 md:mb-6">
          Get Early Access
        </h2>
        <p className="text-white/70 text-base md:text-xl mb-8 md:mb-10 max-w-2xl leading-relaxed">
          Join the network of forward-thinking businesses and autonomous agents building the future of programmable B2B liquidity.
        </p>
        
        <button className="group relative flex items-center gap-4 bg-white text-black pl-8 pr-4 py-3 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] overflow-hidden">
          <span className="relative z-10">Join the Waitlist</span>
          <span className="relative z-10 bg-black text-white p-3 rounded-full group-hover:rotate-[-45deg] transition-transform duration-300">
            <ArrowRight className="w-5 h-5" />
          </span>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </section>
  );
};
