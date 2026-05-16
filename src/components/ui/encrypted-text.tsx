"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const EncryptedText = ({
  text,
  className,
  revealText,
}: {
  text: string;
  className?: string;
  revealText?: string;
}) => {
  const targetText = revealText || text;
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return revealText ? revealText[index] : text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, revealText, targetText.length]);

  return (
    <div className={cn("font-sans text-white select-none inline-flex flex-wrap", className)}>
      {displayText.split("").map((char, index) => {
        // We anchor the width to the final intended character to ensure 
        // perfect layout stability and prevent overlapping.
        const finalChar = revealText ? revealText[index] : text[index];
        
        return (
          <span key={index} className="relative inline-block">
            {/* The ghost character reserves the exact width of the final glyph */}
            <span className="invisible block" aria-hidden="true">
              {finalChar === " " ? "\u00A0" : finalChar}
            </span>
            {/* The absolute span centers the shuffling character in that reserved space */}
            <span className="absolute inset-0 flex items-center justify-center">
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        );
      })}
    </div>
  );
};
