import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const COLUMNS: Array<{
  heading: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    heading: "Product",
    links: [
      { label: "Invoicing", href: "#product" },
      { label: "Mandates", href: "#product" },
      { label: "Reputation", href: "#product" },
      { label: "Settlement", href: "#product" },
      { label: "Architecture", href: "#architecture" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Quickstart", href: "#developers" },
      { label: "CLI", href: "#developers" },
      { label: "API", href: "#developers" },
      { label: "Smart contracts", href: "#enterprise" },
      { label: "GitHub", href: "https://github.com/Tvarox/EMEI-Facilitator", external: true },
    ],
  },
  {
    heading: "Enterprise",
    links: [
      { label: "Talk to engineering", href: "#cta" },
      { label: "Security", href: "#enterprise" },
      { label: "Compliance", href: "#enterprise" },
      { label: "Contracts", href: "#enterprise" },
      { label: "Status", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Mission", href: "#" },
      { label: "Press", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export const PageFooter = () => (
  <footer className="relative w-full bg-inverse text-on-inverse pt-20 pb-10 overflow-hidden">
    {/* Edge glow */}
    <div
      className="absolute inset-x-0 top-0 h-40 pointer-events-none"
      style={{
        background:
          "radial-gradient(60% 80% at 50% 0%, rgba(224,94,70,0.10) 0%, rgba(0,0,0,0) 70%)",
      }}
    />

    <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6">
      {/* Top: brand + tagline + status */}
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start sm:items-end justify-between pb-12 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/Logo.svg" alt="" width={28} height={28} className="w-7 h-7 invert opacity-90" />
            <span className="font-semibold tracking-[0.22em] text-[15px] text-on-inverse">
              EMEI
            </span>
          </Link>
          <p className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] tracking-[-0.015em] text-on-inverse max-w-[520px]">
            The invoicing rail for autonomous economies.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-on-inverse-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-status-ok pulse-dot" />
            All systems operational
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] uppercase text-on-inverse-muted hover:text-on-inverse transition-colors"
          >
            Status
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-12">
        {COLUMNS.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-on-inverse-muted">
              {col.heading}
            </span>
            <ul className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-[13.5px] text-on-inverse/80 hover:text-on-inverse transition-colors inline-flex items-center gap-1"
                  >
                    {l.label}
                    {l.external && <ArrowUpRight className="w-3 h-3 opacity-60" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer baseline */}
      <div
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-8 border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-on-inverse-muted">
          <span>© {new Date().getFullYear()} EMEI Labs</span>
          <span>chain 5003 · mantle sepolia</span>
          <a
            href="mailto:security@emei.xyz"
            className="hover:text-on-inverse transition-colors"
          >
            security@emei.xyz
          </a>
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-on-inverse-muted/80">
          Built for autonomous commerce
        </span>
      </div>
    </div>
  </footer>
);
