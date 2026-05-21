"use client";

import React, { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseOpacity: number;
}

export const AnimatedDotGrid = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = 28; // spacing between dots
    const DOT_RADIUS = 1.2;
    const BASE_OPACITY = 0.18;
    const WAVE_AMPLITUDE = 0.55; // how much brighter a dot gets at wave peak
    const WAVE_SPEED = 0.0008;
    const WAVE_SPREAD = 0.012; // tightness of the wave falloff

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;

    const buildGrid = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      dots = [];

      const cols = Math.ceil(width / GAP) + 1;
      const rows = Math.ceil(height / GAP) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * GAP,
            y: r * GAP,
            baseOpacity: BASE_OPACITY,
          });
        }
      }
    };

    let startTime = performance.now();

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (now - startTime) * WAVE_SPEED;

      // Wave origin travels in a slow diagonal
      const waveX = (Math.sin(elapsed * 0.7) * 0.5 + 0.5) * width;
      const waveY = (Math.cos(elapsed * 0.5) * 0.5 + 0.5) * height;

      for (const dot of dots) {
        const dx = dot.x - waveX;
        const dy = dot.y - waveY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Ripple using a sine wave based on distance + time
        const ripple = Math.sin(dist * WAVE_SPREAD - elapsed * 6) * 0.5 + 0.5;
        // Fade ripple influence with distance
        const falloff = Math.exp(-dist * 0.002);
        const opacity = dot.baseOpacity + WAVE_AMPLITUDE * ripple * falloff;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(opacity, 0.7)})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    buildGrid();
    animFrameRef.current = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      buildGrid();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ""}`}
    />
  );
};
