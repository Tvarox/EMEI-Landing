"use client";

import React, { useMemo, useEffect, useState } from "react";

const CHARS = "  ..::--==++**##%%@@$$";

export const AsciiPattern = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const grid = useMemo(() => {
    const rows = 35;
    const cols = 60;
    let result = "";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Blob 1 (right side large and tall)
        const d1 = Math.sqrt(Math.pow(x - 55, 2) + Math.pow((y - 15) * 0.8, 2));
        // Blob 2 (top left)
        const d2 = Math.sqrt(Math.pow(x - 10, 2) + Math.pow(y - 8, 2));
        // Blob 3 (mid left)
        const d3 = Math.sqrt(Math.pow(x - 18, 2) + Math.pow(y - 22, 2));
        // Blob 4 (center)
        const d4 = Math.sqrt(Math.pow(x - 32, 2) + Math.pow(y - 15, 2));
        
        let val = 0;
        val += Math.max(0, 25 - d1) / 25;
        val += Math.max(0, 8 - d2) / 8;
        val += Math.max(0, 7 - d3) / 7;
        val += Math.max(0, 5 - d4) / 5;

        // Add some noise
        // Use a deterministic pseudo-random so it doesn't flicker on re-render if not needed, 
        // but since it's memoized, Math.random is fine.
        val += (Math.random() * 0.3 - 0.15);

        if (val < 0.2) {
          // Sparse background dots
          result += (Math.random() > 0.95 ? "." : " ") + " ";
        } else {
          // Intense areas
          const index = Math.floor(val * CHARS.length);
          const char = CHARS[Math.min(CHARS.length - 1, Math.max(0, index))];
          result += char + " ";
        }
      }
      result += "\n";
    }
    return result;
  }, []);

  // Prevent hydration mismatch by only rendering after mount if we use random
  if (!mounted) return <div className={`font-mono text-[10px] leading-[10px] whitespace-pre text-black/40 select-none pointer-events-none opacity-0 ${className}`}>{grid}</div>;

  return (
    <div 
      className={`font-mono text-[10px] leading-[10px] whitespace-pre text-black/40 select-none pointer-events-none transition-opacity duration-1000 opacity-100 ${className}`}
      style={{ fontFamily: 'var(--font-vt323), monospace', letterSpacing: '0.1em' }}
    >
      {grid}
    </div>
  );
};
