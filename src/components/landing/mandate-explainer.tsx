"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coins, Users, Tag, CalendarRange } from "lucide-react";

const CARDS = [
  {
    icon: Coins,
    title: "Spend cap",
    body:
      "The maximum total that can be auto-collected over the mandate's lifetime. Cumulative, enforced on-chain.",
    viz: <CapMeter />,
  },
  {
    icon: Users,
    title: "Counterparties",
    body:
      "An explicit list of issuer addresses. Anything outside this set cannot present against the mandate.",
    viz: <CounterpartyList />,
  },
  {
    icon: Tag,
    title: "Categories",
    body:
      "Free-form labels (api, infra, data) committed at invoice creation. Mandate matches by exact set.",
    viz: <CategoryChips />,
  },
  {
    icon: CalendarRange,
    title: "Validity window",
    body:
      "A start and end timestamp. The mandate is dormant outside the window. No retroactive collection.",
    viz: <TimeBar />,
  },
];

export const MandateExplainer = () => {
  return (
    <section className="relative w-full py-24 sm:py-28 md:py-32 border-t border-hairline bg-panel-2/40">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="max-w-[640px] mb-12 sm:mb-14">
          <span className="eyebrow">EMEIMandate · scope</span>
          <h2 className="mt-4 text-[clamp(34px,5vw,56px)] font-display tracking-[-0.015em] leading-[0.96] text-ink">
            Permission, not approval.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-ink/70 max-w-[540px]">
            One signature defines four scope axes. Any invoice that matches all
            four is auto-collected on its due date. Anything else is denied at
            the contract level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="group relative rounded-[16px] border border-hairline bg-white p-5 hover:border-hairline-strong transition-colors"
            >
              <div className="h-[88px] mb-5">{c.viz}</div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-accent/10 text-accent rounded-full p-1.5">
                  <c.icon className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                  {c.title}
                </h3>
              </div>
              <p className="text-[13.5px] leading-[1.55] text-ink/65">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- mini visualizations (88px tall, hairline aesthetic) ---------- */

function CapMeter() {
  return (
    <div className="h-full flex flex-col justify-center gap-2.5">
      <div className="flex items-center justify-between font-mono text-[10.5px] text-muted">
        <span>spent</span>
        <span className="tabular">3,200 / 5,000</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-black/[0.06] overflow-hidden">
        <div className="h-full bg-accent" style={{ width: "64%" }} />
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] text-muted/80">
        <span>0</span><span>5k</span>
      </div>
    </div>
  );
}

function CounterpartyList() {
  const items = ["0xVendor·a91e", "0xPartner·77b3", "0xAgent·d014"];
  return (
    <ul className="h-full flex flex-col justify-center gap-1.5 font-mono text-[11px]">
      {items.map((c) => (
        <li
          key={c}
          className="flex items-center gap-2 text-ink"
        >
          <span className="w-1 h-1 rounded-full bg-accent" />
          <span className="tabular">{c}</span>
        </li>
      ))}
      <li className="text-muted/70 text-[10.5px] mt-1">+ 0 others</li>
    </ul>
  );
}

function CategoryChips() {
  const cats = ["api", "infra", "data"];
  return (
    <div className="h-full flex items-center flex-wrap gap-1.5">
      {cats.map((c) => (
        <span
          key={c}
          className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-hairline-strong text-ink bg-canvas"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function TimeBar() {
  return (
    <div className="h-full flex flex-col justify-center gap-2">
      <div className="relative h-1.5 w-full rounded-full bg-black/[0.06] overflow-hidden">
        <div className="absolute inset-y-0 left-[12%] right-[18%] bg-accent" />
        <div className="absolute inset-y-[-2px] left-[42%] w-[2px] bg-ink" />
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] text-muted">
        <span>2025-01-01</span>
        <span className="text-ink">now</span>
        <span>2026-12-31</span>
      </div>
    </div>
  );
}
