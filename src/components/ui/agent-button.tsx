"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const AgentButton = ({
  onClick,
  className,
  children,
}: {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [status, setStatus] = useState("IDLE");

  // Simulate "Agent Thinking" when hovered - Slower
  useEffect(() => {
    if (!isHovered) return;

    const statuses = ["ANALYZING", "DECRYPTING", "EXECUTING", "READY"];
    let i = 0;
    const interval = setInterval(() => {
      setStatus(statuses[i % statuses.length]);
      i++;
    }, 1200);

    return () => {
      clearInterval(interval);
      setStatus("IDLE");
    };
  }, [isHovered]);

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className={cn(
          "group relative h-14 w-60 overflow-hidden bg-black border border-emerald-500/30 transition-all duration-700",
          "hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
          className
        )}
      >
        {/* Status indicator inside button */}
        <div className="absolute top-1 left-2 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
          <span className={cn(
            "h-1 w-1 rounded-full bg-emerald-500",
            isHovered && "animate-pulse"
          )} />
          <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-tighter">
            AGENT_{status}
          </span>
        </div>
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        {/* Laser Scan Line - Fades on hover */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                top: ["0%", "100%", "0%"],
              }}
              exit={{ opacity: 0 }}
              transition={{
                top: { duration: 5, repeat: Infinity, ease: "linear" },
                opacity: { duration: 0.5 }
              }}
              className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent z-0"
            />
          )}
        </AnimatePresence>

        {/* Content Wrapper */}
        <div className="relative z-10 flex items-center justify-center h-full w-full px-6">
          <div className="flex items-center gap-3 text-emerald-500 font-mono text-sm tracking-[0.2em]">
            <span className="relative">
              {children}
              {/* Underline removed as requested */}
            </span>
            <motion.span
              animate={isHovered ? { opacity: [1, 0, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.2 }} // Slower blink
            >
              _&gt;
            </motion.span>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-emerald-500/60" />
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-emerald-500/60" />
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-emerald-500/60" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-emerald-500/60" />

        {/* Subtle Glitch Overlay - Slower */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.05, 0] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-emerald-500 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </button>
      
      {/* Footer Decoration */}
      <div className="w-60 flex justify-between px-1">
        <div className="h-[1px] w-8 bg-emerald-500/10" />
        <div className="h-[1px] w-2 bg-emerald-500/20" />
        <div className="h-[1px] w-8 bg-emerald-500/10" />
      </div>
    </div>
  );
};
