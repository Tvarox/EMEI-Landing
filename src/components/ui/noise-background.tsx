"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center min-h-screen w-full bg-transparent overflow-hidden",
        containerClassName
      )}
    >
      <div
        className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: "contrast(150%) brightness(1000%)",
        }}
      ></div>
      <div className={cn("relative z-10 w-full h-full", className)}>{children}</div>
    </div>
  );
};
