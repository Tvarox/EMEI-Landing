"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const morphTime = 1.5;
const cooldownTime = 1.8; // Warm cooldown to make words readable

const useMorphingText = (texts: string[]) => {
  const currentIndexRef = useRef(0);
  const nextIndexRef = useRef(Math.min(1, texts.length - 1));
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      current1.textContent = texts[currentIndexRef.current];
      current2.textContent = texts[nextIndexRef.current];
    },
    [texts]
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      currentIndexRef.current = nextIndexRef.current;
      let newNext;
      do {
        newNext = Math.floor(Math.random() * texts.length);
      } while (newNext === currentIndexRef.current && texts.length > 1);
      nextIndexRef.current = newNext;
    }
  }, [setStyles, texts.length]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  style?: React.CSSProperties;
  texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  
  // Find the longest text to act as a spacer
  const longestText = texts.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {/* Invisible spacer so the container has the correct size in normal flow */}
      <span style={{ visibility: "hidden", pointerEvents: "none", userSelect: "none" }}>
        {longestText}
      </span>
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          display: "inline-block",
        }}
        ref={text1Ref}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          display: "inline-block",
        }}
        ref={text2Ref}
      />
    </span>
  );
};

const SvgFilters: React.FC = () => (
  <svg id="filters" className="hidden" preserveAspectRatio="xMidYMid slice" style={{ display: "none" }}>
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

const MorphingText: React.FC<MorphingTextProps> = ({ texts, className, style }) => (
  <span
    className={cn(
      "inline-block relative leading-none [filter:url(#threshold)_blur(0.6px)]",
      className
    )}
    style={style}
  >
    <Texts texts={texts} />
    <SvgFilters />
  </span>
);

export { MorphingText };
