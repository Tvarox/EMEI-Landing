"use client";

import React from "react";
import { motion } from "framer-motion";

const ITEMS: Array<{ label: string; primary: string; secondary?: string }> = [
  { label: "Live on", primary: "Mantle Sepolia", secondary: "chain 5003" },
  { label: "Assets", primary: "USDC · mUSD", secondary: "yield 4–8% APY" },
  { label: "Verified", primary: "28 tests · 6 invariants", secondary: "76,800 fuzz calls" },
  { label: "Available", primary: "x402 pay-link", secondary: "any-chain payer" },
];

export const TrustStrip = () => {
  return (
    <section className="relative w-full">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="border-y border-hairline"
        >
          <ul className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-hairline">
            {ITEMS.map((item, i) => (
              <li
                key={item.label}
                className={`flex flex-col gap-1.5 py-6 px-5 sm:px-7 ${
                  i >= 2 ? "border-t lg:border-t-0 border-hairline" : ""
                }`}
              >
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
                  {item.label}
                </span>
                <span className="text-[15px] font-semibold text-ink leading-tight">
                  {item.primary}
                </span>
                {item.secondary && (
                  <span className="font-mono tabular text-[12px] text-muted">
                    {item.secondary}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
