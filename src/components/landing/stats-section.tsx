"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, Zap, ShieldCheck, Building2 } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

export const StatsSection = () => {
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, 100, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, count]);

  return (
    <section className="w-full px-6 max-w-[1440px] mx-auto -mt-6 md:-mt-8 relative z-20">
      <div className="bg-white rounded-[1.75rem] md:rounded-[2rem] p-8 md:p-12 shadow-sm border border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12">
          
          {/* Keydata Column */}
          <div className="flex flex-col gap-4 md:gap-6 col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg text-black">
              <Zap className="w-5 h-5" />
              B2B LIQUIDITY
            </div>
            <div>
              <div 
                className="text-5xl md:text-6xl tracking-tight text-black mb-2"
                style={{ fontFamily: 'var(--font-vt323), monospace' }}
              >
                T+0
              </div>
              <p className="text-sm text-black/60 leading-tight">
                Instant settlement on unpaid invoices
              </p>
            </div>
          </div>

          {/* Vision Column */}
          <div className="flex flex-col gap-4 md:gap-6 col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-black uppercase">
              <Building2 className="w-5 h-5" />
              EMEI Vision
            </div>
            <p className="text-sm text-black/70 leading-relaxed font-medium">
              "We are building a decentralized credit layer where businesses can unlock instant liquidity, and investors can access high-quality, short-duration yields." 
            </p>
          </div>

          {/* Cayuse Column */}
          <div className="flex flex-col gap-4 md:gap-6 col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg text-black uppercase">
              <ShieldCheck className="w-5 h-5" />
              Underwriting
            </div>
            <div>
              <motion.div 
                ref={countRef}
                className="text-5xl md:text-6xl tracking-tight text-black mb-2 flex"
                style={{ fontFamily: 'var(--font-vt323), monospace' }}
              >
                <motion.span>{rounded}</motion.span>%
              </motion.div>
              <p className="text-sm text-black/60 leading-tight">
                On-chain transparency & verifiable credit
              </p>
            </div>
          </div>

          {/* Sign Up Column */}
          <div className="flex flex-col gap-4 md:gap-6 col-span-1 justify-center items-start border-l border-black/5 pl-8 hidden md:flex">
            <p className="text-sm text-black/70 leading-relaxed font-medium">
              Tokenize your invoices. EMEI provides liquidity providers with short-duration, real-world yields powered by stablecoin rails.
            </p>
            <button className="flex items-center gap-2 bg-white border border-black/10 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-black/5 transition-colors shadow-sm group">
              <span className="bg-black p-1 rounded-full flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
              Get Early Access
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
