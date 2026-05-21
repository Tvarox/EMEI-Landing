"use client";

import React from "react";
import { ArrowRight, Box } from "lucide-react";
import { MorphingText } from "@/components/ui/morphing-text";
import AsciiWave from "@/components/ui/ascii-wave";

const leftTexts = ["FIX.", "LEARN.", "TOKENIZE.", "AUTOMATE."];
const rightTexts = ["PREVENT.", "FINANCE.", "SETTLE.", "SCALE."];

export const HeroSection = () => {
  return (
    <section className="relative w-full pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 flex flex-col items-center justify-center overflow-hidden min-h-[55vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh]">
      {/* Subtle ASCII Wave Background */}
      <AsciiWave className="absolute inset-0 pointer-events-none opacity-20" color="#e05e46" />
      {/* Central Interactive Hub and Network Lines Container */}
      <div className="relative w-full max-w-[1000px] aspect-[2/1] flex items-center justify-center z-10 px-4 mt-6">
        
        {/* Background SVG Diagram */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          {/* Gradient defs for fading lines */}
          <defs>
            {/* Top Left: fades from orange at elbow to transparent at far left */}
            <linearGradient id="grad-tl" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#e05e46" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e05e46" stopOpacity="0" />
            </linearGradient>
            {/* Top Right: fades from orange at elbow to transparent at far right */}
            <linearGradient id="grad-tr" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e05e46" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e05e46" stopOpacity="0" />
            </linearGradient>
            {/* Bottom Left: same as top left */}
            <linearGradient id="grad-bl" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#e05e46" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e05e46" stopOpacity="0" />
            </linearGradient>
            {/* Bottom Right: same as top right */}
            <linearGradient id="grad-br" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e05e46" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e05e46" stopOpacity="0" />
            </linearGradient>

            {/* Glowing Beam Gradients (brighter, higher opacity orange) */}
            <linearGradient id="beam-tl" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#e05e46" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e05e46" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-tr" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e05e46" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e05e46" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-bl" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#e05e46" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e05e46" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-br" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e05e46" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e05e46" stopOpacity="0" />
            </linearGradient>

            {/* Self-contained styling for the animating beams */}
            <style>{`
              @keyframes flow-beam {
                0% {
                  stroke-dashoffset: 80;
                }
                100% {
                  stroke-dashoffset: -862;
                }
              }
              .animate-beam {
                stroke-dasharray: 80 862;
                animation: flow-beam 7s linear infinite;
              }
            `}</style>
          </defs>

          {/* Top Left Line — fades off to the left */}
          <path d="M 500 250 L 350 100 L -300 100" stroke="url(#grad-tl)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Top Left Animating Beam */}
          <path d="M -300 100 L 350 100 L 500 250" stroke="url(#beam-tl)" strokeWidth="2.2" strokeLinecap="round" className="animate-beam" style={{ animationDelay: "0s" }} />
          
          {/* Top Right Line — fades off to the right */}
          <path d="M 500 250 L 650 100 L 1300 100" stroke="url(#grad-tr)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Top Right Animating Beam */}
          <path d="M 1300 100 L 650 100 L 500 250" stroke="url(#beam-tr)" strokeWidth="2.2" strokeLinecap="round" className="animate-beam" style={{ animationDelay: "1.75s" }} />
          
          {/* Bottom Left Line — fades off to the left */}
          <path d="M 500 250 L 350 400 L -300 400" stroke="url(#grad-bl)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Bottom Left Animating Beam */}
          <path d="M -300 400 L 350 400 L 500 250" stroke="url(#beam-bl)" strokeWidth="2.2" strokeLinecap="round" className="animate-beam" style={{ animationDelay: "3.5s" }} />
          
          {/* Bottom Right Line — fades off to the right */}
          <path d="M 500 250 L 650 400 L 1300 400" stroke="url(#grad-br)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Bottom Right Animating Beam */}
          <path d="M 1300 400 L 650 400 L 500 250" stroke="url(#beam-br)" strokeWidth="2.2" strokeLinecap="round" className="animate-beam" style={{ animationDelay: "5.25s" }} />
          
          {/* Solid line segments near the center */}
          <path d="M 430 180 L 380 130" stroke="#e05e46" strokeWidth="2" />
          <path d="M 570 180 L 620 130" stroke="#e05e46" strokeWidth="2" />
          <path d="M 430 320 L 380 370" stroke="#e05e46" strokeWidth="2" />
          <path d="M 570 320 L 620 370" stroke="#e05e46" strokeWidth="2" />

          {/* === DOTS === */}
          {/* Top Left — inner elbow, label start */}
          <circle cx="150" cy="100" r="4" fill="black" />
          <circle cx="350" cy="100" r="4" fill="black" />
          
          {/* Top Right — label end, inner elbow */}
          <circle cx="650" cy="100" r="4" fill="black" />
          <circle cx="850" cy="100" r="4" fill="black" />
          
          {/* Bottom Left — dots, label positions */}
          <circle cx="100" cy="400" r="4" fill="black" />
          <circle cx="225" cy="400" r="4" fill="black" />
          <circle cx="350" cy="400" r="4" fill="black" />
          
          {/* Bottom Right — label positions, far dots */}
          <circle cx="650" cy="400" r="4" fill="black" />
          <circle cx="775" cy="400" r="4" fill="black" />
          <circle cx="900" cy="400" r="4" fill="black" />

          {/* === LABELS (Pills) === */}
          {/* Top Left: Invoice */}
          <foreignObject x="210" y="87" width="80" height="26">
            <div className="bg-[#f4f3ef] border border-[#e05e46]/30 rounded-full w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] md:text-[12px] font-bold text-black/80 shadow-sm uppercase tracking-wider">
              Invoice
            </div>
          </foreignObject>

          {/* Top Right: Liquidity */}
          <foreignObject x="710" y="87" width="80" height="26">
            <div className="bg-[#f4f3ef] border border-[#e05e46]/30 rounded-full w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] md:text-[11px] font-bold text-black/80 shadow-sm uppercase tracking-wider">
              Liquidity
            </div>
          </foreignObject>

          {/* Bottom Left: Credit */}
          <foreignObject x="122.5" y="387" width="80" height="26">
            <div className="bg-[#f4f3ef] border border-[#e05e46]/30 rounded-full w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] md:text-[12px] font-bold text-black/80 shadow-sm uppercase tracking-wider">
              Credit
            </div>
          </foreignObject>

          {/* Bottom Left: Capital */}
          <foreignObject x="247.5" y="387" width="80" height="26">
            <div className="bg-[#f4f3ef] border border-[#e05e46]/30 rounded-full w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] md:text-[12px] font-bold text-black/80 shadow-sm uppercase tracking-wider">
              Capital
            </div>
          </foreignObject>

          {/* Bottom Right: Yield */}
          <foreignObject x="672.5" y="387" width="80" height="26">
            <div className="bg-[#f4f3ef] border border-[#e05e46]/30 rounded-full w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] md:text-[12px] font-bold text-black/80 shadow-sm uppercase tracking-wider">
              Yield
            </div>
          </foreignObject>

          {/* Bottom Right: Assets */}
          <foreignObject x="797.5" y="387" width="80" height="26">
            <div className="bg-[#f4f3ef] border border-[#e05e46]/30 rounded-full w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] md:text-[12px] font-bold text-black/80 shadow-sm uppercase tracking-wider">
              Assets
            </div>
          </foreignObject>

        </svg>

        {/* The large side text and central box - Absolutely centered to align perfectly with SVG */}
        <div className="absolute inset-0 flex items-center justify-center w-full gap-2 sm:gap-6 md:gap-10 lg:gap-14 pointer-events-auto">
          
          {/* Left Text (Takes up exactly half remaining space minus gap) */}
          <div className="flex flex-1 justify-end pr-1 sm:pr-2 md:pr-6 overflow-visible">
            <MorphingText 
              texts={leftTexts}
              className="text-lg sm:text-3xl md:text-5xl lg:text-[5.5rem] text-black tracking-tight leading-none text-right whitespace-nowrap h-6 sm:h-12 md:h-16 lg:h-24"
              style={{ fontFamily: 'var(--font-vt323), monospace' }}
            />
          </div>

          {/* Central Box Logo (Responsive size in the exact center) */}
          <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 bg-[#e8e6e1] rounded-2xl sm:rounded-3xl p-1.5 sm:p-3 md:p-4 shadow-inner flex items-center justify-center shrink-0 border border-black/5 z-10">
            <div className="w-full h-full bg-[#f4f3ef] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm">
              <Box className="w-6 h-6 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-black" strokeWidth={1.5} />
            </div>
          </div>

          {/* Right Text (Takes up exactly half remaining space minus gap) */}
          <div className="flex flex-1 justify-start pl-1 sm:pl-2 md:pl-6 overflow-visible">
            <MorphingText 
              texts={rightTexts}
              className="text-lg sm:text-3xl md:text-5xl lg:text-[5.5rem] text-black tracking-tight leading-none text-left whitespace-nowrap h-6 sm:h-12 md:h-16 lg:h-24"
              style={{ fontFamily: 'var(--font-vt323), monospace' }}
            />
          </div>
        </div>

      </div>

    </section>
  );
};
