"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Enterprise trust grid.
 * Six numbers a procurement officer can verify before a meeting.
 * Restraint is the message — no decoration, no motion beyond a fade.
 */

const TILES = [
  {
    value: "28",
    label: "Unit tests",
    meta: "Foundry · per-PR CI",
  },
  {
    value: "6",
    label: "Invariant suites",
    meta: "Cap · scope · weights · CEI",
  },
  {
    value: "76,800",
    label: "Fuzz calls",
    meta: "across all suites",
  },
  {
    value: "99.97%",
    label: "Facilitator uptime",
    meta: "30-day rolling",
  },
  {
    value: "30s",
    label: "Receipt anchoring",
    meta: "Merkle root → on-chain",
  },
  {
    value: "5",
    label: "Verified contracts",
    meta: "Mantlescan · ABIs public",
  },
];

const CONTRACTS = [
  { name: "EMEIInvoice",    addr: "0xC35f709255D7199394655F16008e8d1A3AD80005" },
  { name: "EMEIMandate",    addr: "0xF48C3bd4FE046629A9c12A39693f39c297893bD8" },
  { name: "Bay8004",        addr: "0xE61B57D84fb55E2601ab47B83c367612E348d409" },
  { name: "EMEISettlement", addr: "0xfdCb7bA077069A7Da44711Ee6bdB49174AFA4dD0" },
  { name: "EMEIReceipt",    addr: "0x558a20766d5998765B056597b8b78fe1914f3969" },
];

const short = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;
const mantlescan = (a: string) =>
  `https://explorer.sepolia.mantle.xyz/address/${a}`;

export const TrustGrid = () => {
  return (
    <section
      id="enterprise"
      className="relative w-full py-24 sm:py-28 md:py-32 border-t border-hairline"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="max-w-[640px] mb-12 sm:mb-14">
          <span className="eyebrow">Enterprise · trust artifacts</span>
          <h2 className="mt-4 text-[clamp(34px,5vw,56px)] font-display tracking-[-0.015em] leading-[0.96] text-ink">
            Built for the receivables
            <br />
            <span className="text-ink/40">your treasury already runs.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-ink/70 max-w-[540px]">
            Net-terms, recurring authorization, milestone payouts, auditable
            settlement, sanctioned-counterparty screening. Numbers, addresses,
            and source — all public.
          </p>
        </div>

        {/* Numbers grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-hairline rounded-[16px] overflow-hidden bg-white">
          {TILES.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
              className={`flex flex-col gap-2 p-5 sm:p-6 ${
                i % 6 !== 5 ? "lg:border-r" : ""
              } ${i % 3 !== 2 ? "md:border-r" : ""} ${
                i % 2 !== 1 ? "border-r" : ""
              } ${i < 4 ? "border-b lg:border-b-0" : ""} ${
                i < 3 ? "md:border-b lg:border-b-0" : ""
              } border-hairline`}
            >
              <span className="font-display text-[40px] sm:text-[48px] tabular leading-none text-ink">
                {t.value}
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted mt-1">
                {t.label}
              </span>
              <span className="font-mono text-[11px] text-muted/85">
                {t.meta}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Contracts */}
        <div className="mt-8 sm:mt-10 rounded-[16px] border border-hairline bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-panel-2">
            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted">
              Verified contracts · Mantle Sepolia
            </span>
            <span className="font-mono text-[10.5px] text-muted">chain 5003</span>
          </div>
          <ul className="divide-y divide-hairline">
            {CONTRACTS.map((c) => (
              <li key={c.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[13px] font-semibold text-ink">{c.name}</span>
                  <span className="font-mono text-[10.5px] text-muted">verified · ABI public</span>
                </div>
                <span className="font-mono tabular text-[12px] text-ink/85 hidden sm:inline">
                  {short(c.addr)}
                </span>
                <a
                  href={mantlescan(c.addr)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-accent transition-colors"
                >
                  Mantlescan
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance posture */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Sanctions screening", b: "Address-list checks at the facilitator boundary on present and pay events. Daily refresh." },
            { t: "SOC 2 path",          b: "Type I within 6 months of GA. Type II within 12. Internal controls catalog ready on request." },
            { t: "Data portability",    b: "SQLite ledger by default. Postgres with pinned region on the enterprise tier." },
          ].map((c) => (
            <div key={c.t} className="rounded-[14px] border border-hairline bg-white px-5 py-5">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">{c.t}</div>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-ink/75">{c.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
