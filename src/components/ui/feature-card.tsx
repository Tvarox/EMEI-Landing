"use client";

import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-blue-500/50">
    <div className="mb-4 text-blue-400">{icon}</div>
    <h3 className="mb-2 text-sm font-semibold tracking-tight text-white">{title}</h3>
    <p className="text-xs leading-relaxed text-slate-400">{description}</p>
    {/* Subtle corner accent — no blur, uses opacity for softness */}
    <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-blue-500/[0.04] group-hover:bg-blue-500/[0.08] transition-colors duration-500" />
  </div>
);
