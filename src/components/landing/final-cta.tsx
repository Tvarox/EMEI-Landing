"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

/**
 * Final CTA — dark "command center" panel.
 * Reuses the BackgroundBeams animation from the existing waitlist component.
 * Three install commands, two CTAs.
 */
export const FinalCTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const radius = useTransform(scrollYProgress, [0, 0.7], [80, 0]);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative w-full py-12 sm:py-14 overflow-hidden"
    >
      <motion.div
        className="relative bg-inverse text-on-inverse overflow-hidden mx-3 sm:mx-6"
        style={{
          borderTopLeftRadius: useTransform(radius, (v) => `${v}px`),
          borderTopRightRadius: useTransform(radius, (v) => `${v}px`),
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        {/* Subtle beams */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <BackgroundBeams />
        </div>
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(70% 70% at 50% 0%, rgba(224,94,70,0.18) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 py-20 sm:py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Left — pitch */}
            <div>
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-on-inverse-muted">
                Command center
              </span>
              <h2 className="mt-4 font-display text-[clamp(40px,7vw,84px)] tracking-[-0.02em] leading-[0.95] text-on-inverse">
                Three commands.
                <br />
                Five minutes.
                <br />
                <span className="text-accent">One real invoice.</span>
              </h2>
              <p className="mt-6 text-[16px] leading-[1.6] text-on-inverse-muted max-w-[480px]">
                Get a sandbox key, issue an invoice on Mantle Sepolia, and
                attach a mandate — all from your terminal. Time-to-first-paid
                target: <span className="text-on-inverse">under 4 minutes 30 seconds</span>.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  href="#developers"
                  className="inline-flex items-center gap-2.5 bg-accent text-canvas rounded-full pl-5 pr-2 py-2.5 text-[14px] font-semibold hover:bg-accent-2 transition-colors group"
                >
                  Get test keys
                  <span className="bg-canvas/20 rounded-full p-1.5 group-hover:translate-x-0.5 transition-transform">
                    <ArrowUpRight className="w-3.5 h-3.5 text-canvas" />
                  </span>
                </a>
                <a
                  href="#enterprise"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold text-on-inverse border border-white/15 hover:bg-white/5 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Talk to engineering
                </a>
              </div>
            </div>

            {/* Right — terminal */}
            <div className="rounded-[18px] border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-[0_2px_30px_rgba(0,0,0,0.5)]">
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
                  <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-on-inverse-muted">
                    quickstart.sh
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-on-inverse-muted">
                  mantle sepolia
                </span>
              </div>
              <div className="px-5 py-6 font-mono text-[13px] leading-[1.85] text-on-inverse">
                <Line p="$" t="npm i -g @emei/cli" />
                <Line p="$" t="emei keys generate" />
                <Line
                  p=">"
                  t="key saved · sandbox · 24h ttl"
                  muted
                />
                <Line p="$" t="emei invoice create \\" />
                <Line p=" " t="  --to 0xVendor·a91e \\" />
                <Line p=" " t="  --amount 100 --due 30d" />
                <Line
                  p=">"
                  t="INV-29A1 issued · 0xa1f2…7d"
                  ok
                />
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-accent">$</span>
                  <span className="inline-block w-2 h-3.5 bg-on-inverse blink-soft" />
                </div>
              </div>
              <div
                className="flex items-center justify-between px-4 py-3 border-t font-mono text-[10.5px] uppercase tracking-[0.14em] text-on-inverse-muted"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span>4 min 28 s typical</span>
                <span>p99 142ms</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

function Line({
  p,
  t,
  muted,
  ok,
}: {
  p: string;
  t: string;
  muted?: boolean;
  ok?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <span
        className={`shrink-0 ${
          muted ? "text-on-inverse-muted" : "text-accent"
        }`}
      >
        {p}
      </span>
      <span
        className={
          ok
            ? "text-status-ok"
            : muted
              ? "text-on-inverse-muted"
              : "text-on-inverse"
        }
      >
        {t}
      </span>
    </div>
  );
}
