import React from "react";
import { Box } from "lucide-react";

export const PageFooter = () => (
  <footer className="w-full pt-16 pb-12 relative z-10 border-t border-white/5 bg-[#111111]">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Brand logo wordmark */}
      <div className="flex items-center gap-2">
        <Box className="w-6 h-6 text-white" strokeWidth={2} />
        <span className="font-bold text-lg tracking-tight text-white select-none">
          EMEI
        </span>
      </div>
      
      {/* Modern minimal footer links */}
      <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-white/60">
        <a href="#" className="hover:text-white transition-colors duration-300">Platform</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Enterprise</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Security</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
      </div>

      {/* Copyright text */}
      <p className="text-xs text-white/40 font-medium">
        &copy; {new Date().getFullYear()} EMEI. ALL RIGHTS RESERVED.
      </p>
    </div>
  </footer>
);
