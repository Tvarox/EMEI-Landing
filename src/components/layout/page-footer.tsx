import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const COLUMNS: Array<{
  heading: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    heading: "Protocol",
    links: [
      { label: "x402", href: "#protocol" },
      { label: "AP2 mandate", href: "#protocol" },
      { label: "ERC-8004", href: "#protocol" },
      { label: "mUSD on Mantle", href: "#protocol" },
    ],
  },
  {
    heading: "Build",
    links: [
      {
        label: "GitBook",
        href: "https://docs.emei.xyz",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/Tvarox/EMEI-Facilitator",
        external: true,
      },
      { label: "Email", href: "mailto:hello@emei.xyz" },
    ],
  },
];

export const PageFooter = () => (
  <footer className="relative w-full bg-inverse text-on-inverse pt-16 pb-10 overflow-hidden">
    <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6">
      {/* Top: brand */}
      <div
        className="pb-8 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <Link href="/" className="flex items-center gap-3 w-fit">
          <Image
            src="/Logo.svg"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 invert opacity-90"
          />
          <span className="font-semibold tracking-[0.22em] text-[15px] text-on-inverse">
            EMEI
          </span>
        </Link>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 sm:gap-10 py-12 max-w-[640px]">
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
                    {l.external && (
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    )}
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
          <span>© {new Date().getFullYear()} EMEI</span>
          <span>built on Mantle Sepolia · chain 5003</span>
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-on-inverse-muted/80">
          Open-source · pre-production
        </span>
      </div>
    </div>
  </footer>
);
