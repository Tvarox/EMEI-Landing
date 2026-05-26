"use client";

import React, { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((letter, index) => {
            if (index < Math.floor(iteration)) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplayText(text);
      }
      
      iteration += 1 / 4; 
    }, 40);
  };

  useEffect(() => {
    triggerScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={triggerScramble}
      style={{ cursor: "crosshair" }}
    >
      {displayText}
    </span>
  );
}

export default function Header() {


  return (
    <div 
      className="fixed top-6 z-50 w-11/12 max-w-[800px] transition-all duration-500"
      style={{
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <nav 
        className="flex items-center justify-between py-2 px-6 bg-white/40 backdrop-blur-xl rounded-full border border-white/20 shadow-lg shadow-black/5 hover:shadow-xl hover:bg-white/50 transition-all duration-300"
      >
        {/* Left: Brand Logo & Scramble Text */}
        <a
          href="#top"
          aria-label="EMEI"
          className="flex items-center gap-3 text-ink select-none font-bold w-[120px] shrink-0 whitespace-nowrap"
        >
          <Logo width={20} aria-hidden />
          <ScrambleText
            text="EMEI"
            className="font-display font-semibold text-lg tracking-[0.16em] text-ink"
          />
        </a>

        {/* Center: Desktop Navigation Links */}
        <div
          aria-label="primary"
          className="hidden md:flex items-center gap-8"
        >
          <a
            href="#primitives"
            className="font-sans text-sm font-medium text-muted hover:text-ink transition-colors duration-200"
          >
            Protocol
          </a>
          <a
            href="#how-it-works"
            className="font-sans text-sm font-medium text-muted hover:text-ink transition-colors duration-200"
          >
            How it works
          </a>
        </div>

        {/* Right: GitHub Action Callout */}
        <a
          href="#cta"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center"
        >
          <InteractiveHoverButton 
            text="Join waitlist" 
            className="h-9 px-6 text-xs bg-transparent border-white/20 hover:border-transparent transition-all duration-300"
          />
        </a>
      </nav>
    </div>
  );
}
