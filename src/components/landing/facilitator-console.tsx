"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Live facilitator console.
 * Continuously prepends log lines on the four real service intervals:
 *   Receipt Batcher  (30s, here scaled to ~6s for liveness)
 *   Auto-Collector   (10s, here scaled to ~2.2s)
 *   Overdue Scanner  (60s, here scaled to ~12s)
 *   Event Indexer    (continuous, ~1.5s)
 */

type LogKind = "batch" | "collect" | "overdue" | "index" | "info";

type Line = {
  ts: string;
  kind: LogKind;
  msg: string;
};

const HASH_BANK = ["0xa1f2…7d", "0x9e21…04", "0x7c3a…be", "0x4b3c…9a", "0xc012…e7", "0xd14b…2f", "0x77ae…85", "0x3091…b1"];
const INV_BANK = ["INV-29A1", "INV-7C42", "INV-44B0", "INV-12FE", "INV-88AA"];

function nowTs() {
  const d = new Date();
  return (
    d.toTimeString().slice(0, 8) +
    "." +
    String(d.getMilliseconds()).padStart(3, "0")
  );
}
function pick<T>(a: T[]) { return a[Math.floor(Math.random() * a.length)]; }
function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min) + min); }

export const FacilitatorConsole = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const [lines, setLines] = useState<Line[]>([]);

  const push = (kind: LogKind, msg: string) =>
    setLines((prev) => [{ ts: nowTs(), kind, msg }, ...prev].slice(0, 12));

  useEffect(() => {
    if (!inView) return;
    const boot = setTimeout(() => {
      push("info", "facilitator boot · 4 services online · chain 5003");
    }, 0);

    const t1 = setInterval(() => {
      const size = rand(28, 64);
      const root = pick(HASH_BANK).replace("0x", "0x") + pick(["af", "1b", "2c", "9d"]);
      push("batch", `receipt-batch  size=${size}  root=${root}`);
    }, 6000);

    const t2 = setInterval(() => {
      const inv = pick(INV_BANK);
      const amt = rand(40, 600);
      const ok = Math.random() > 0.08;
      push(
        "collect",
        ok
          ? `auto-collect    inv=${inv}  amount=${amt} mUSD  ok`
          : `auto-collect    inv=${inv}  skip · counterparty below floor`,
      );
    }, 2200);

    const t3 = setInterval(() => {
      const proc = rand(2, 14);
      const flag = rand(0, 2);
      push("overdue", `overdue-scan   processed=${proc}  flagged=${flag}`);
    }, 12000);

    const t4 = setInterval(() => {
      const block = 1238400 + rand(0, 600);
      const events = rand(1, 22);
      push("index", `event-index    block=${block.toLocaleString()}  events=${events}`);
    }, 1500);

    return () => {
      clearTimeout(boot);
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
      clearInterval(t4);
    };
  }, [inView]);

  return (
    <section ref={ref} className="relative w-full py-24 sm:py-28 md:py-32 border-t border-hairline">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-12 items-start">
          {/* Left — narrative */}
          <div>
            <span className="eyebrow">Facilitator · runtime</span>
            <h2 className="mt-4 text-[clamp(34px,5vw,56px)] font-display tracking-[-0.015em] leading-[0.96] text-ink">
              Four services.
              <br />
              <span className="text-ink/40">Hard intervals.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.55] text-ink/70 max-w-[440px]">
              A Rust + Axum runtime with typed errors and signed writes. Four
              background services run on disciplined cadences. Nothing
              freelances.
            </p>

            <ul className="mt-7 grid grid-cols-1 gap-2.5">
              <ServiceRow color="batch"   name="Receipt Batcher"  interval="30s" tip="anchors a Merkle root every 30s" />
              <ServiceRow color="collect" name="Auto-Collector"   interval="10s" tip="pulls due invoices against active mandates" />
              <ServiceRow color="overdue" name="Overdue Scanner"  interval="60s" tip="flags missed dueAt boundaries" />
              <ServiceRow color="index"   name="Event Indexer"    interval="cont." tip="ingests every contract event into SQLite" />
            </ul>
          </div>

          {/* Right — terminal */}
          <div className="rounded-[18px] border border-hairline bg-inverse text-on-inverse overflow-hidden shadow-[0_2px_30px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
                <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-on-inverse-muted">
                  facilitator · live
                </span>
              </div>
              <span className="font-mono text-[10.5px] text-on-inverse-muted">
                p99 142ms · uptime 99.97%
              </span>
            </div>
            <ul className="font-mono text-[12px] leading-[1.85] px-4 py-4 min-h-[420px]">
              {lines.map((l, idx) => (
                <li
                  key={`${l.ts}-${idx}-${l.kind}`}
                  className="ticker-rise"
                  style={{ opacity: 1 - idx * 0.06 }}
                >
                  <span className="text-on-inverse-muted">{l.ts}</span>{" "}
                  <span className={kindClass(l.kind)}>{kindTag(l.kind)}</span>{" "}
                  <span className="text-on-inverse">{l.msg}</span>
                </li>
              ))}
              {lines.length === 0 && (
                <li className="text-on-inverse-muted">
                  scroll into view to start the facilitator…
                </li>
              )}
            </ul>
            <div className="px-4 py-3 border-t font-mono text-[10.5px] uppercase tracking-[0.14em] text-on-inverse-muted flex justify-between" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <span>tail –f facilitator.log</span>
              <span className="tabular">{lines.length} lines</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function ServiceRow({
  color,
  name,
  interval,
  tip,
}: {
  color: LogKind;
  name: string;
  interval: string;
  tip: string;
}) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-[12px] border border-hairline bg-white px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`w-2 h-2 rounded-full ${dotBg(color)}`} />
        <div className="min-w-0">
          <div className="font-mono text-[13px] text-ink">{name}</div>
          <div className="font-mono text-[11px] text-muted truncate">{tip}</div>
        </div>
      </div>
      <span className="font-mono tabular text-[11px] uppercase tracking-[0.14em] text-muted shrink-0">
        {interval}
      </span>
    </li>
  );
}

function kindTag(k: LogKind) {
  switch (k) {
    case "batch":   return "[batch  ]";
    case "collect": return "[collect]";
    case "overdue": return "[overdue]";
    case "index":   return "[index  ]";
    default:        return "[info   ]";
  }
}
function kindClass(k: LogKind) {
  switch (k) {
    case "batch":   return "text-accent";
    case "collect": return "text-status-ok";
    case "overdue": return "text-status-warn";
    case "index":   return "text-on-inverse-muted";
    default:        return "text-on-inverse-muted";
  }
}
function dotBg(k: LogKind) {
  switch (k) {
    case "batch":   return "bg-accent";
    case "collect": return "bg-status-ok";
    case "overdue": return "bg-status-warn";
    case "index":   return "bg-ink";
    default:        return "bg-muted";
  }
}
