"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Cross-chain Corridor.
 * Three columns: any-chain payer · EMEI facilitator · Mantle settlement.
 * Two animated packets travel along Bezier paths in opposite directions.
 */
export const CorridorSection = () => {
  return (
    <section className="relative w-full py-24 sm:py-28 md:py-32 border-t border-hairline">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="max-w-[640px] mb-12 sm:mb-14">
          <span className="eyebrow">Cross-chain · x402</span>
          <h2 className="mt-4 text-[clamp(34px,5vw,56px)] font-display tracking-[-0.015em] leading-[0.96] text-ink">
            Pay from any chain.
            <br />
            <span className="text-ink/40">Settle once on Mantle.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-ink/70 max-w-[540px]">
            An x402-compatible pay-link gives any-chain payers a two-signature
            flow: approve, pay. The facilitator handles the USDC → mUSD swap
            with a 1% slippage cap and routes settled balance into the yield
            vault.
          </p>
        </div>

        <div className="rounded-[20px] border border-hairline bg-white shadow-[0_2px_30px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-panel-2">
            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted">
              corridor.flow
            </span>
            <span className="font-mono text-[10.5px] text-muted">
              slippage cap 1.00%
            </span>
          </div>

          <div className="relative aspect-[16/7] sm:aspect-[16/6] w-full">
            <svg
              viewBox="0 0 1200 450"
              className="absolute inset-0 w-full h-full"
              role="img"
              aria-label="Cross-chain payment corridor"
            >
              <defs>
                <linearGradient id="cor-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.16)" />
                  <stop offset="50%" stopColor="rgba(224,94,70,0.4)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.16)" />
                </linearGradient>
              </defs>

              {/* Outbound path: payer -> facilitator -> settlement */}
              <path
                id="corridor-out"
                d="M 180 220 C 380 220, 380 220, 600 220 S 820 220, 1020 220"
                fill="none"
                stroke="url(#cor-grad)"
                strokeWidth={1.5}
                strokeDasharray="4 5"
              />
              {/* Inbound path: settlement -> facilitator -> payer (slightly offset) */}
              <path
                id="corridor-in"
                d="M 1020 245 C 820 245, 820 245, 600 245 S 380 245, 180 245"
                fill="none"
                stroke="rgba(0,0,0,0.10)"
                strokeWidth={1}
                strokeDasharray="3 4"
              />

              {/* Outbound packet — invoice ID flowing right */}
              <g>
                <circle r={5} fill="var(--accent)">
                  <animateMotion
                    dur="3.6s"
                    repeatCount="indefinite"
                    rotate="auto"
                    keyTimes="0;1"
                    keySplines="0.25 0.1 0.25 1"
                    calcMode="spline"
                  >
                    <mpath href="#corridor-out" />
                  </animateMotion>
                </circle>
                <text dy="-12" fill="var(--ink)" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em" }}>
                  <textPath href="#corridor-out" startOffset="50%" textAnchor="middle">
                    INV-29A1 · 100 USDC →
                  </textPath>
                </text>
              </g>

              {/* Inbound packet — receipt root flowing left */}
              <g>
                <circle r={3.5} fill="var(--ink)">
                  <animateMotion
                    dur="4.4s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#corridor-in" />
                  </animateMotion>
                </circle>
                <text dy="14" fill="var(--muted)" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em" }}>
                  <textPath href="#corridor-in" startOffset="50%" textAnchor="middle">
                    ← receipt 0xa1f2…7d
                  </textPath>
                </text>
              </g>

              {/* Three column stations */}
              <Station
                x={120}
                y={232}
                label="ANY-CHAIN PAYER"
                primary="approve · pay"
                meta="x402 pay-link"
              />
              <Station
                x={540}
                y={232}
                label="EMEI FACILITATOR"
                primary="route · sign"
                meta="USDC → mUSD"
                emphasis
              />
              <Station
                x={960}
                y={232}
                label="MANTLE SETTLEMENT"
                primary="vault · yield"
                meta="mUSD · 4–8% APY"
              />
            </svg>
          </div>

          <div className="px-5 py-3.5 border-t border-hairline bg-panel-2 grid grid-cols-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
            <span>two signatures · approve, pay</span>
            <span className="text-center">facilitator p99 142ms</span>
            <span className="text-right">vault deposit · atomic</span>
          </div>
        </div>

        {/* Subline cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            ["1", "Payer approves on their chain", "Standard ERC-20 approve. Once."],
            ["2", "Facilitator submits the transfer", "transferFrom · USDC→mUSD swap (1% cap)."],
            ["3", "Settled to Mantle yield vault", "Anchored to a Merkle root every 30s."],
          ].map(([n, t, b]) => (
            <div key={n} className="rounded-[14px] border border-hairline bg-white px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono tabular text-[11px] w-5 h-5 inline-flex items-center justify-center rounded-full bg-ink text-canvas">
                  {n}
                </span>
                <h4 className="text-[13px] font-semibold text-ink">{t}</h4>
              </div>
              <p className="text-[12.5px] leading-[1.55] text-ink/65">{b}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

function Station({
  x,
  y,
  label,
  primary,
  meta,
  emphasis,
}: {
  x: number;
  y: number;
  label: string;
  primary: string;
  meta: string;
  emphasis?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-110}
        y={-44}
        width={220}
        height={88}
        rx={12}
        fill={emphasis ? "var(--ink)" : "var(--canvas)"}
        stroke={emphasis ? "var(--ink)" : "rgba(0,0,0,0.15)"}
        strokeWidth={1.25}
      />
      <text
        x={0}
        y={-22}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.16em",
          fill: emphasis ? "rgba(244,243,239,0.7)" : "var(--muted)",
        }}
      >
        {label}
      </text>
      <text
        x={0}
        y={2}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          fontWeight: 600,
          fill: emphasis ? "var(--canvas)" : "var(--ink)",
        }}
      >
        {primary}
      </text>
      <text
        x={0}
        y={26}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.1em",
          fill: emphasis ? "var(--accent)" : "var(--muted)",
        }}
      >
        {meta}
      </text>
    </g>
  );
}
