"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Vault } from "lucide-react";

/**
 * Settlement engine + yield vault.
 * Vertical waterfall: USDC in → swap (1% cap) → mUSD → vault → APY counter.
 */
export const SettlementSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-25%" });
  const [apy, setApy] = useState(5.84);
  const [tvl, setTvl] = useState(2_412_300);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setApy((v) => {
        const drift = (Math.random() - 0.5) * 0.04;
        const next = Math.max(4, Math.min(8, v + drift));
        return parseFloat(next.toFixed(2));
      });
      setTvl((v) => v + Math.floor(Math.random() * 320));
    }, 1100);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative w-full py-24 sm:py-28 md:py-32 border-t border-hairline"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-start">
          {/* Left — copy */}
          <div>
            <span className="eyebrow">EMEISettlement · vault</span>
            <h2 className="mt-4 text-[clamp(34px,5vw,56px)] font-display tracking-[-0.015em] leading-[0.96] text-ink">
              Settlement is one transaction.
              <br />
              <span className="text-ink/40">Yield is the default state.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.55] text-ink/70 max-w-[480px]">
              Settled balance lives in <span className="text-ink">mUSD</span> — a
              rebasing yield-bearing stablecoin native to Mantle. Idle AR stops
              being a tax on the balance sheet.
            </p>

            <ul className="mt-8 flex flex-col divide-y divide-hairline border-t border-b border-hairline">
              {[
                ["transferFrom · payer → vault", "atomic"],
                ["USDC → mUSD swap", "≤ 1% slippage"],
                ["mUSD vault routing", "rebasing"],
                ["Reentrancy guard · CEI ordering", "enforced"],
              ].map(([label, meta]) => (
                <li
                  key={label}
                  className="flex items-center justify-between py-3.5"
                >
                  <span className="text-[14px] text-ink">{label}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                    {meta}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — waterfall + counters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-[20px] border border-hairline bg-white shadow-[0_2px_30px_rgba(0,0,0,0.03)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-panel-2">
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted">
                EMEISettlement
              </span>
              <span className="font-mono text-[10.5px] text-muted">
                0xfdCb…4dD0
              </span>
            </div>

            {/* Waterfall */}
            <div className="px-5 sm:px-7 pt-7 pb-3 flex flex-col items-center gap-2.5">
              <Tile
                eyebrow="receive"
                amount="100.00"
                unit="USDC"
                meta="from payer · approved"
              />
              <Connector caption="transferFrom" />
              <Tile
                eyebrow="swap"
                amount="100.00"
                unit="USDC → mUSD"
                meta="slippage 0.18% · cap 1.00%"
              />
              <Connector caption="atomic · same tx" />
              <Tile
                eyebrow="route"
                amount="99.82"
                unit="mUSD"
                meta="vault deposit"
                emphasis
              />
            </div>

            {/* APY + TVL counters */}
            <div className="px-5 sm:px-7 py-5 grid grid-cols-2 border-t border-hairline divide-x divide-hairline bg-panel-2/50">
              <div className="flex flex-col gap-1 pr-4">
                <div className="flex items-center gap-1.5">
                  <Vault className="w-3 h-3 text-muted" />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                    vault APY
                  </span>
                </div>
                <span className="font-mono tabular text-[28px] font-semibold text-ink leading-none mt-1">
                  {apy.toFixed(2)}
                  <span className="text-[16px] text-muted ml-0.5">%</span>
                </span>
                <span className="font-mono text-[10.5px] text-muted">
                  rebasing · live
                </span>
              </div>
              <div className="flex flex-col gap-1 pl-4">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  vault TVL
                </span>
                <span className="font-mono tabular text-[28px] font-semibold text-ink leading-none mt-1">
                  ${tvl.toLocaleString()}
                </span>
                <span className="font-mono text-[10.5px] text-muted">
                  testnet · synthetic
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function Tile({
  eyebrow,
  amount,
  unit,
  meta,
  emphasis,
}: {
  eyebrow: string;
  amount: string;
  unit: string;
  meta: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`w-full max-w-[420px] rounded-[14px] border px-4 py-3.5 flex flex-col gap-1 ${
        emphasis
          ? "bg-ink text-canvas border-ink"
          : "bg-canvas/60 border-hairline-strong text-ink"
      }`}
    >
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
          emphasis ? "text-canvas/60" : "text-muted"
        }`}
      >
        {eyebrow}
      </span>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono tabular text-[20px] font-semibold leading-none">
          {amount}
        </span>
        <span
          className={`font-mono text-[12px] uppercase tracking-[0.1em] ${
            emphasis ? "text-accent" : "text-muted"
          }`}
        >
          {unit}
        </span>
      </div>
      <span
        className={`font-mono text-[10.5px] ${
          emphasis ? "text-canvas/55" : "text-muted/85"
        }`}
      >
        {meta}
      </span>
    </div>
  );
}

function Connector({ caption }: { caption: string }) {
  return (
    <div className="flex items-center gap-2 my-1">
      <ArrowDown className="w-3 h-3 text-muted" strokeWidth={2.25} />
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        {caption}
      </span>
    </div>
  );
}
