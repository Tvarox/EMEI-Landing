"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Lock } from "lucide-react";

/**
 * The Wedge.
 * Left: argument prose.
 * Right: a live, self-demonstrating MandateCard that animates its scope values
 * into place when the section enters the viewport.
 */
export const WedgeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [scope, setScope] = useState({
    cap: 0,
    counterparty: "—",
    category: "—",
    until: "—",
    status: "PENDING",
  });

  useEffect(() => {
    if (!inView) return;
    const cancellers: ReturnType<typeof setTimeout>[] = [];

    // animate cap from 0 to 5000
    let from = 0;
    const target = 5000;
    const duration = 1100;
    const start = performance.now();
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      from = Math.round(target * easeOutQuart(t));
      setScope((s) => ({ ...s, cap: from }));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    cancellers.push(
      setTimeout(
        () => setScope((s) => ({ ...s, counterparty: "0xVendor·a91e" })),
        300,
      ),
    );
    cancellers.push(
      setTimeout(() => setScope((s) => ({ ...s, category: "infra · api" })), 600),
    );
    cancellers.push(
      setTimeout(() => setScope((s) => ({ ...s, until: "2026-12-31" })), 900),
    );
    cancellers.push(
      setTimeout(() => setScope((s) => ({ ...s, status: "ACTIVE" })), 1200),
    );

    return () => cancellers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="product" ref={ref} className="relative w-full py-24 sm:py-28 md:py-36">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: argument */}
          <div>
            <span className="eyebrow">The wedge</span>
            <h2 className="mt-5 text-[clamp(34px,5vw,64px)] font-display tracking-[-0.015em] leading-[0.95] text-ink">
              Streams pay continuously.
              <br />
              Transfers pay once.
              <br />
              <span className="text-ink/40">Neither knows what an invoice is.</span>
            </h2>
            <p className="mt-7 max-w-[480px] text-[16px] leading-[1.6] text-ink/70">
              EMEI gives autonomous agents the one primitive accounting
              departments have trusted for forty years —{" "}
              <span className="text-ink font-semibold">
                a scoped standing permission to collect on terms.
              </span>
            </p>
            <p className="mt-4 max-w-[480px] text-[15px] leading-[1.6] text-ink/55">
              The payer signs once. Spend cap, approved counterparties,
              approved categories, validity window. Anything outside the
              scope can never collect against the mandate.
            </p>
          </div>

          {/* Right: live MandateCard */}
          <div className="relative">
            <div
              className="absolute -inset-3 sm:-inset-6 rounded-[28px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(224,94,70,0.08) 0%, rgba(224,94,70,0) 70%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="relative rounded-[20px] border border-hairline bg-white shadow-[0_2px_30px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-panel-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-ink/60" strokeWidth={2} />
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink/70">
                    EMEIMandate
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-muted">
                  0xF48C…3bD8
                </span>
              </div>

              {/* Body — scope rows */}
              <div className="px-5 py-5 grid grid-cols-1 gap-3.5">
                <ScopeRow
                  label="Spend cap"
                  value={
                    <span className="font-mono tabular">
                      {scope.cap.toLocaleString()} mUSD
                    </span>
                  }
                  meter={Math.min(1, scope.cap / 5000)}
                />
                <ScopeRow
                  label="Counterparty"
                  value={<span className="font-mono">{scope.counterparty}</span>}
                />
                <ScopeRow
                  label="Categories"
                  value={<span className="font-mono">{scope.category}</span>}
                />
                <ScopeRow
                  label="Valid until"
                  value={<span className="font-mono">{scope.until}</span>}
                />
              </div>

              {/* Footer — status */}
              <div className="px-5 py-3.5 border-t border-hairline bg-panel-2 flex items-center justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] uppercase ${
                    scope.status === "ACTIVE" ? "text-status-ok" : "text-muted"
                  }`}
                >
                  {scope.status === "ACTIVE" && <Check className="w-3 h-3" />}
                  {scope.status}
                </span>
              </div>
            </motion.div>

            <p className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
              Single signature · auto-collects on due date
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

function ScopeRow({
  label,
  value,
  meter,
}: {
  label: string;
  value: React.ReactNode;
  meter?: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-2">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
        {meter !== undefined && (
          <div className="h-1 w-full rounded-full bg-black/[0.06] overflow-hidden mt-1">
            <div
              className="h-full bg-accent transition-[width] duration-700"
              style={{ width: `${meter * 100}%` }}
            />
          </div>
        )}
      </div>
      <span className="text-[14px] text-ink">{value}</span>
    </div>
  );
}
