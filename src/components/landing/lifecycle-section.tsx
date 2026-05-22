"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Invoice Lifecycle state-machine.
 * Pure SVG + setInterval. Token walks through ISSUED → PRESENTED → PAID,
 * with two probabilistic detours (REJECTED / OVERDUE) that re-merge to PAID.
 * A synchronized event log on the right emits a row each time the token
 * enters a new node.
 */

type NodeId = "ISSUED" | "PRESENTED" | "PAID" | "OVERDUE" | "REJECTED";

type NodeDef = {
  id: NodeId;
  x: number;
  y: number;
  label: string;
  variant: "neutral" | "ok" | "warn" | "bad";
};

const NODES: Record<NodeId, NodeDef> = {
  ISSUED:    { id: "ISSUED",    x: 80,  y: 200, label: "ISSUED",    variant: "neutral" },
  PRESENTED: { id: "PRESENTED", x: 280, y: 200, label: "PRESENTED", variant: "neutral" },
  PAID:      { id: "PAID",      x: 540, y: 200, label: "PAID",      variant: "ok" },
  OVERDUE:   { id: "OVERDUE",   x: 410, y: 80,  label: "OVERDUE",   variant: "warn" },
  REJECTED:  { id: "REJECTED",  x: 410, y: 320, label: "REJECTED",  variant: "bad" },
};

const PATHS: Array<{
  from: NodeId;
  to: NodeId;
  label: string;
  via?: { x: number; y: number };
}> = [
  { from: "ISSUED",    to: "PRESENTED", label: "presentToPayer" },
  { from: "PRESENTED", to: "PAID",      label: "pay() / autoCollect()" },
  { from: "PRESENTED", to: "OVERDUE",   label: "now > dueAt", via: { x: 280, y: 80 } },
  { from: "OVERDUE",   to: "PAID",      label: "autoCollect()", via: { x: 540, y: 80 } },
  { from: "PRESENTED", to: "REJECTED",  label: "reject(reason)", via: { x: 280, y: 320 } },
];

const COLOR = {
  neutral: "var(--ink)",
  ok: "var(--status-ok)",
  warn: "var(--status-warn)",
  bad: "var(--status-bad)",
};

type LogRow = {
  ts: string;
  block: number;
  node: NodeId;
  hash: string;
};

const SAMPLE_HASHES = [
  "0xa1f2…7d", "0x9e21…04", "0x4b3c…9a", "0xc012…e7",
  "0xd14b…2f", "0x77ae…85", "0x3091…b1", "0xee52…36",
];

export const LifecycleSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });

  const [tokenIndex, setTokenIndex] = useState(0); // index into a chosen sequence
  const [sequence, setSequence] = useState<NodeId[]>(["ISSUED", "PRESENTED", "PAID"]);
  const [logs, setLogs] = useState<LogRow[]>([]);

  // Pick a random sequence each loop (variety of paths)
  const pickSequence = (): NodeId[] => {
    const r = Math.random();
    if (r < 0.6)       return ["ISSUED", "PRESENTED", "PAID"];
    if (r < 0.85)      return ["ISSUED", "PRESENTED", "OVERDUE", "PAID"];
    return ["ISSUED", "PRESENTED", "REJECTED"];
  };

  useEffect(() => {
    if (!inView) return;

    let active = true;
    const tick = (idx: number, seq: NodeId[]) => {
      if (!active) return;
      const stateId = seq[idx];
      const block = 1238400 + Math.floor(Math.random() * 200);
      const hash = SAMPLE_HASHES[Math.floor(Math.random() * SAMPLE_HASHES.length)];
      const now = new Date();
      const ts = now.toTimeString().slice(0, 8) + "." + String(now.getMilliseconds()).padStart(3, "0").slice(0, 3);
      setLogs((prev) => [{ ts, block, node: stateId, hash }, ...prev].slice(0, 7));

      if (idx + 1 < seq.length) {
        setTimeout(() => {
          setTokenIndex(idx + 1);
          tick(idx + 1, seq);
        }, 1100);
      } else {
        // restart after a pause
        setTimeout(() => {
          if (!active) return;
          const next = pickSequence();
          setSequence(next);
          setTokenIndex(0);
          tick(0, next);
        }, 1400);
      }
    };
    tick(0, sequence);
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const currentNode = sequence[tokenIndex];
  const node = NODES[currentNode];

  return (
    <section
      id="architecture"
      ref={ref}
      className="relative w-full py-24 sm:py-28 md:py-32 border-t border-hairline"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="max-w-[640px] mb-12 sm:mb-16">
          <span className="eyebrow">EMEIInvoice · lifecycle</span>
          <h2 className="mt-4 text-[clamp(34px,5vw,56px)] font-display tracking-[-0.015em] leading-[0.96] text-ink">
            A real state machine.
            <span className="text-ink/40"> Not a transfer.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-ink/70 max-w-[540px]">
            Disputes are first-class. Terminal states are terminal. Every
            transition is an on-chain event.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-10">
          {/* Diagram */}
          <div className="relative rounded-[18px] border border-hairline bg-white shadow-[0_2px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-panel-2">
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted">
                lifecycle.fsm
              </span>
              <span className="font-mono text-[10.5px] text-muted">
                0xC35f…0005
              </span>
            </div>
            <div className="relative aspect-[3/2] w-full">
              <svg
                viewBox="0 0 640 400"
                className="absolute inset-0 w-full h-full"
                role="img"
                aria-label="Invoice lifecycle state machine"
              >
                {/* Edges */}
                {PATHS.map((p) => {
                  const a = NODES[p.from];
                  const b = NODES[p.to];
                  const d = p.via
                    ? `M ${a.x} ${a.y} Q ${p.via.x} ${p.via.y} ${b.x} ${b.y}`
                    : `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
                  return (
                    <g key={`${p.from}->${p.to}`}>
                      <path
                        d={d}
                        fill="none"
                        stroke="rgba(0,0,0,0.18)"
                        strokeWidth={1.25}
                        strokeDasharray="4 5"
                      />
                    </g>
                  );
                })}

                {/* Edge labels */}
                {PATHS.map((p) => {
                  const a = NODES[p.from];
                  const b = NODES[p.to];
                  const mx = p.via ? p.via.x : (a.x + b.x) / 2;
                  const my = p.via ? p.via.y - 6 : (a.y + b.y) / 2 - 8;
                  return (
                    <text
                      key={`${p.from}-${p.to}-l`}
                      x={mx}
                      y={my}
                      textAnchor="middle"
                      className="fill-muted"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {p.label}
                    </text>
                  );
                })}

                {/* Nodes */}
                {Object.values(NODES).map((n) => {
                  const isActive = n.id === currentNode;
                  const fill = isActive ? COLOR[n.variant] : "var(--canvas)";
                  const stroke = isActive ? COLOR[n.variant] : "rgba(0,0,0,0.18)";
                  const text = isActive
                    ? n.variant === "neutral"
                      ? "var(--canvas)"
                      : "white"
                    : "var(--ink)";
                  return (
                    <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
                      <rect
                        x={-58}
                        y={-18}
                        width={116}
                        height={36}
                        rx={18}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={1.5}
                        style={{
                          transition: "fill 200ms, stroke 200ms",
                          filter: isActive
                            ? "drop-shadow(0 0 12px rgba(224,94,70,0.35))"
                            : "none",
                        }}
                      />
                      <text
                        x={0}
                        y={4}
                        textAnchor="middle"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: "0.14em",
                          fill: text,
                          fontWeight: 600,
                        }}
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}

                {/* Token (current invoice) */}
                <g
                  style={{
                    transition: "transform 1100ms cubic-bezier(0.25,1,0.5,1)",
                    transform: `translate(${node.x}px, ${node.y}px)`,
                  }}
                >
                  <circle r={8} fill="var(--accent)" />
                  <circle r={14} fill="rgba(224,94,70,0.18)" className="pulse-dot" />
                </g>
              </svg>
            </div>
            <div className="px-5 py-3 border-t border-hairline bg-panel-2 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              <span>token: <span className="text-ink">INV-29A1</span></span>
              <span>amount: <span className="text-ink">100 mUSD</span></span>
              <span>due: <span className="text-ink">+30d</span></span>
            </div>
          </div>

          {/* Synchronized event log */}
          <EventLog logs={logs} />
        </div>
      </div>
    </section>
  );
};

function EventLog({ logs }: { logs: LogRow[] }) {
  const variantColor = (v: NodeId) =>
    v === "PAID"
      ? "text-status-ok"
      : v === "OVERDUE"
      ? "text-status-warn"
      : v === "REJECTED"
      ? "text-status-bad"
      : "text-ink";

  return (
    <div className="rounded-[18px] border border-hairline bg-inverse text-on-inverse overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
          <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-on-inverse-muted">
            events · live
          </span>
        </div>
        <span className="font-mono text-[10.5px] text-on-inverse-muted">tail –f</span>
      </div>
      <ul className="flex-1 px-4 py-4 font-mono text-[12.5px] leading-[1.7] text-on-inverse min-h-[280px]">
        {logs.map((l, idx) => (
          <li
            key={`${l.ts}-${idx}`}
            className="ticker-rise"
            style={{ opacity: 1 - idx * 0.12 }}
          >
            <span className="text-on-inverse-muted">{l.ts}</span>{" "}
            <span className={variantColor(l.node)}>{l.node.padEnd(10)}</span>{" "}
            <span className="text-on-inverse-muted">block</span>{" "}
            <span className="tabular">{l.block.toLocaleString()}</span>{" "}
            <span className="text-on-inverse-muted">tx</span>{" "}
            <span className="tabular">{l.hash}</span>
          </li>
        ))}
        {logs.length === 0 && (
          <li className="text-on-inverse-muted">waiting for first event…</li>
        )}
      </ul>
    </div>
  );
}
