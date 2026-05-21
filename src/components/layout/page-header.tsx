"use client";

import React from "react";
import { motion } from "framer-motion";

export const PageHeader = () => {
  return (
    <motion.header
      initial={{ y: -65, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full h-[65px] backdrop-blur-md"
      style={{
        background: "linear-gradient(to bottom, rgba(8, 12, 24, 0.8) 0%, rgba(8, 12, 24, 0.3) 60%, rgba(8, 12, 24, 0) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white select-none">
            EMEI
          </span>
        </div>

        {/* Action Button */}
        <div>
          <button className="border border-amber-500/80 rounded-full px-6 py-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-[0.15em] hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300 cursor-pointer">
            Join Waitlist
          </button>
        </div>
      </div>
    </motion.header>
  );
};
