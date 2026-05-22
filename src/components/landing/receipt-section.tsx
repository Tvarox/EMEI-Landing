"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Receipt anchoring — Merkle tree forming live.
 * 8 leaves → 4 → 2 → 1 root. New tree every ~5 seconds.
 */

const HASH_CHARS = "0123456789abcdef";
function shortHash(seed: number, len = 4) {
  let h = "";
  for (let i = 0; i < len; i++) {
    h += HASH_CHARS[(seed * (i + 7) * 31 + i * 17) % 16];
  }
  return h;
}

type Phase = 0 | 1 | 2 | 3 | 4; // 0=empty, 1=leaves, 2=lvl2, 3=lvl3, 4=root anchored

export const ReceiptSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });
  const [phase, setPhase] = useState<Phase>(0);
  const [block, setBlock] = useState(1238440);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e6));

  useEffect(() => {
    if (!inView) return;
    let active = true;
    const sequence = async () => {
      while (active) {
        setSeed(Math.floor(Math.random() * 1e6));
        setPhase(0);
        await wait(400);
        if (!active) return;
        setPhase(1);
        await wait(700);
        setPhase(2);
        await wait(700);
        setPhase(3);
        await wait(700);
        setPhase(4);
        setBlock((b) => b + Math.floor(Math.random() * 4) + 1);
        await wait(1800);
      }
    };
    sequence();
    return () => {
      active = false;
    };
  }, [inView]);

  const leaves = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => `0x${shortHash(seed + i, 4)}…${shortHash(seed + i + 100, 2)}`),
    [seed],
  );
  const lvl2 = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => `0x${shortHash(seed + 200 + i, 4)}`),
    [seed],
  );
  const lvl3 = useMemo(
    () =>
      Array.from({ length: 2 }, (_, i) => `0x${shortHash(seed + 400 + i, 4)}`),
    [seed],
  );
  const root = useMemo(() => `0x${shortHash(seed + 999, 6)}…${shortHash(seed + 1234, 4)}`, [seed]);

  return (
    <section ref={ref} className="relative w-full py-24 sm:py-28 md:py-32 border-t border-hairline bg-panel-2/40">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="max-w-[640px] mb-12 sm:mb-14">
          <span className="eyebrow">EMEIReceipt · Merkle anchor</span>
          <h2 className="mt-4 text-[clamp(34px,5vw,56px)] font-display tracking-[-0.015em] leading-[0.96] text-ink">
            Verifiable, every
            <br />
            <span className="text-ink/40">thirty seconds.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-ink/70 max-w-[540px]">
            Every event is hashed, batched, and anchored to an on-chain Merkle
            root. Any single invoice is provable with one inclusion proof —
            roughly 416 bytes.
          </p>
        </div>

        <div className="rounded-[20px] border border-hairline bg-white shadow-[0_2px_30px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-panel-2">
            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted">
              receipt.tree · batching
            </span>
            <span className="font-mono text-[10.5px] text-muted">
              0x558a…3969
            </span>
          </div>

          <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full">
            <svg viewBox="0 0 1200 530" className="absolute inset-0 w-full h-full">
              {/* Root */}
              <Node
                x={600}
                y={70}
                label="ROOT"
                hash={root}
                visible={phase >= 4}
                emphasis
              />
              {/* Level 3 */}
              {[300, 900].map((x, i) => (
                <Node
                  key={`l3-${i}`}
                  x={x}
                  y={210}
                  label="H₃"
                  hash={lvl3[i]}
                  visible={phase >= 3}
                />
              ))}
              {/* Level 2 */}
              {[150, 450, 750, 1050].map((x, i) => (
                <Node
                  key={`l2-${i}`}
                  x={x}
                  y={340}
                  label="H₂"
                  hash={lvl2[i]}
                  visible={phase >= 2}
                />
              ))}
              {/* Leaves */}
              {[75, 225, 375, 525, 675, 825, 975, 1125].map((x, i) => (
                <Node
                  key={`leaf-${i}`}
                  x={x}
                  y={460}
                  label={`E${i}`}
                  hash={leaves[i]}
                  visible={phase >= 1}
                  small
                />
              ))}

              {/* Edges leaves -> l2 */}
              {[
                [75, 225, 150],
                [375, 525, 450],
                [675, 825, 750],
                [975, 1125, 1050],
              ].map(([a, b, p], i) => (
                <g key={`e-l2-${i}`}>
                  <Edge x1={a} y1={440} x2={p} y2={358} visible={phase >= 2} />
                  <Edge x1={b} y1={440} x2={p} y2={358} visible={phase >= 2} />
                </g>
              ))}
              {/* Edges l2 -> l3 */}
              {[
                [150, 450, 300],
                [750, 1050, 900],
              ].map(([a, b, p], i) => (
                <g key={`e-l3-${i}`}>
                  <Edge x1={a} y1={324} x2={p} y2={228} visible={phase >= 3} />
                  <Edge x1={b} y1={324} x2={p} y2={228} visible={phase >= 3} />
                </g>
              ))}
              {/* Edges l3 -> root */}
              <Edge x1={300} y1={194} x2={600} y2={88} visible={phase >= 4} />
              <Edge x1={900} y1={194} x2={600} y2={88} visible={phase >= 4} />
            </svg>
          </div>

          <div className="px-5 py-3.5 border-t border-hairline bg-panel-2 grid grid-cols-2 sm:grid-cols-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
            <span>leaves <span className="text-ink">8</span></span>
            <span>proof bytes <span className="text-ink tabular">416</span></span>
            <span>anchored at <span className="text-ink tabular">block {block.toLocaleString()}</span></span>
            <span className="sm:text-right">interval <span className="text-ink">30s</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

function Node({
  x,
  y,
  label,
  hash,
  visible,
  emphasis,
  small,
}: {
  x: number;
  y: number;
  label: string;
  hash: string;
  visible: boolean;
  emphasis?: boolean;
  small?: boolean;
}) {
  const w = small ? 130 : 170;
  const h = small ? 38 : 52;
  return (
    <g
      transform={`translate(${x} ${y})`}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 360ms cubic-bezier(0.25,1,0.5,1)",
      }}
    >
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={emphasis ? 14 : 10}
        fill={emphasis ? "var(--ink)" : "var(--canvas)"}
        stroke={emphasis ? "var(--ink)" : "rgba(0,0,0,0.15)"}
        strokeWidth={1.25}
        style={{
          filter: emphasis
            ? "drop-shadow(0 0 16px rgba(224,94,70,0.35))"
            : "none",
        }}
      />
      <text
        x={small ? -w / 2 + 8 : -w / 2 + 10}
        y={small ? -3 : -5}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: small ? 9 : 10,
          letterSpacing: "0.16em",
          fill: emphasis ? "rgba(244,243,239,0.6)" : "var(--muted)",
        }}
      >
        {label}
      </text>
      <text
        x={small ? -w / 2 + 8 : -w / 2 + 10}
        y={small ? 12 : 14}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: small ? 11 : 13,
          fontWeight: 500,
          fill: emphasis ? "var(--accent)" : "var(--ink)",
        }}
      >
        {hash}
      </text>
    </g>
  );
}

function Edge({
  x1,
  y1,
  x2,
  y2,
  visible,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  visible: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(0,0,0,0.16)"
      strokeWidth={1}
      strokeDasharray="3 4"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 360ms ease-out",
      }}
    />
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
