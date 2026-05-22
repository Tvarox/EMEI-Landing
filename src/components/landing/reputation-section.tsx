"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

/**
 * Reputation gate (Bay8004).
 * Weighted score = 0.50 * category + 0.30 * txSize + 0.20 * timeDecay
 * The visitor drags the floor; the "Allowed / Denied" indicator flips.
 */
export const ReputationSection = () => {
  // a sample counterparty score
  const [parts] = useState({ category: 0.82, txSize: 0.76, timeDecay: 0.65 });
  const score = useMemo(
    () => parts.category * 0.5 + parts.txSize * 0.3 + parts.timeDecay * 0.2,
    [parts],
  );

  const [floor, setFloor] = useState(0.65);
  const allowed = score >= floor;

  return (
    <section className="relative w-full py-24 sm:py-28 md:py-32 border-t border-hairline bg-panel-2/40">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          {/* Left — copy */}
          <div>
            <span className="eyebrow">Bay8004 · ERC-8004</span>
            <h2 className="mt-4 text-[clamp(34px,5vw,56px)] font-display tracking-[-0.015em] leading-[0.96] text-ink">
              Counterparty risk
              <br />
              <span className="text-ink/40">is a primitive.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.55] text-ink/70 max-w-[480px]">
              A weighted on-chain score —{" "}
              <span className="text-ink">50% category</span>,{" "}
              <span className="text-ink">30% transaction size</span>,{" "}
              <span className="text-ink">20% time-decay</span>. Mandates set a
              floor. Sub-floor counterparties cannot present.
            </p>

            <div className="mt-7 flex flex-col gap-2 font-mono text-[12px] text-muted">
              <span>
                <span className="text-ink">score = </span>
                w<sub>cat</sub>·s<sub>cat</sub>{" "}
                + w<sub>tx</sub>·s<sub>tx</sub>{" "}
                + w<sub>td</sub>·s<sub>td</sub>
              </span>
              <span>
                <span className="text-ink">w</span>{" "}
                = (0.50, 0.30, 0.20) · sums to 1.0
              </span>
            </div>
          </div>

          {/* Right — interactive panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-[20px] border border-hairline bg-white shadow-[0_2px_30px_rgba(0,0,0,0.03)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-panel-2">
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted">
                Bay8004 · score(counterparty)
              </span>
              <span className="font-mono text-[10.5px] text-muted">
                0xE61B…d409
              </span>
            </div>

            <div className="px-5 sm:px-6 py-6 flex flex-col gap-5">
              <ScoreBar
                label="category fit"
                weight={0.5}
                value={parts.category}
              />
              <ScoreBar
                label="transaction size"
                weight={0.3}
                value={parts.txSize}
              />
              <ScoreBar
                label="time decay"
                weight={0.2}
                value={parts.timeDecay}
              />
            </div>

            {/* Computed score + floor scrubber */}
            <div className="px-5 sm:px-6 py-5 border-t border-hairline bg-panel-2/60">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  counterparty score
                </span>
                <span className="font-mono tabular text-[28px] font-semibold text-ink leading-none">
                  {score.toFixed(3)}
                </span>
              </div>

              <div className="relative h-2 w-full rounded-full bg-black/[0.06] overflow-hidden">
                {/* floor track */}
                <div
                  className="absolute inset-y-0 left-0 bg-ink/15"
                  style={{ width: `${floor * 100}%` }}
                />
                {/* score marker */}
                <div
                  className="absolute -top-1 -bottom-1 w-[2px] bg-accent rounded-full"
                  style={{ left: `${score * 100}%` }}
                />
              </div>

              <div className="mt-3 flex items-center gap-3">
                <label className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted shrink-0">
                  mandate floor
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={floor}
                  onChange={(e) => setFloor(parseFloat(e.target.value))}
                  className="emei-range w-full"
                  aria-label="Mandate floor"
                />
                <span className="font-mono tabular text-[12px] text-ink w-10 text-right">
                  {floor.toFixed(2)}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  decision
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border ${
                    allowed
                      ? "text-status-ok border-status-ok/30 bg-status-ok/5"
                      : "text-status-bad border-status-bad/30 bg-status-bad/5"
                  }`}
                >
                  {allowed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {allowed ? "Allowed" : "Denied"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

function ScoreBar({
  label,
  weight,
  value,
}: {
  label: string;
  weight: number;
  value: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 items-center">
      <div className="col-span-2 flex items-baseline justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
          {label}{" "}
          <span className="text-ink/40">· w {weight.toFixed(2)}</span>
        </span>
        <span className="font-mono tabular text-[12px] text-ink">
          {value.toFixed(2)}
        </span>
      </div>
      <div className="col-span-2 h-1.5 w-full rounded-full bg-black/[0.06] overflow-hidden">
        <div
          className="h-full bg-accent transition-[width] duration-700"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}
