import React from "react";

export const PageFooter = () => (
  <footer className="w-full pt-20 pb-12 relative z-10 overflow-hidden backdrop-blur-[8px] bg-gradient-to-t from-[#04060d] via-[#080c18]/90 to-transparent mt-8">
    {/* Amber Accent Ambient Light (soft, subtle pulse glow at the top center of the footer) */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
      {/* Brand logo wordmark */}
      <span className="font-serif text-2xl font-bold tracking-[0.25em] text-white select-none mb-3">
        EMEI
      </span>
      
      {/* Subtitle */}
      <p className="text-[13px] text-slate-400 font-sans font-light tracking-wide max-w-md text-center leading-relaxed mb-8 opacity-80">
        Next-generation liquidity infrastructure powering instant cash flow through AI and blockchain technology.
      </p>

      {/* Modern minimal footer links */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-[11px] font-mono tracking-widest text-slate-500 uppercase">
        <a href="#" className="hover:text-amber-500/90 transition-colors duration-300">Ecosystem</a>
        <span className="text-slate-800 select-none">•</span>
        <a href="#" className="hover:text-amber-500/90 transition-colors duration-300">Technology</a>
        <span className="text-slate-800 select-none">•</span>
        <a href="#" className="hover:text-amber-500/90 transition-colors duration-300">Security</a>
        <span className="text-slate-800 select-none">•</span>
        <a href="#" className="hover:text-amber-500/90 transition-colors duration-300">Privacy Policy</a>
      </div>

      {/* Fine divider */}
      <div className="w-[120px] h-[1px] bg-slate-800/40 mb-8" />

      {/* Copyright text */}
      <p className="text-[10px] text-slate-500 font-mono tracking-[0.2em] opacity-60">
        &copy; {new Date().getFullYear()} EMEI SYSTEM. ALL RIGHTS RESERVED.
      </p>
    </div>
  </footer>
);
