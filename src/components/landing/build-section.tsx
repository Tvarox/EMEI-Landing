"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Mail } from "lucide-react";

const EASE = [0.25, 1, 0.5, 1] as const;

/** Inline GitHub mark — lucide-react v1.16 doesn't ship one. */
const GithubMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.16 0 0 1.01-.32 3.3 1.23.96-.27 1.99-.4 3.01-.41 1.02.01 2.05.14 3.01.41 2.29-1.55 3.3-1.23 3.3-1.23.65 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"
    />
  </svg>
);

const LINKS = [
  {
    icon: BookOpen,
    label: "Protocol docs",
    sub: "GitBook · architecture, mandates, x402 flow",
    href: "https://docs.emei.xyz",
    cta: "Open GitBook",
    external: true,
  },
  {
    icon: GithubMark,
    label: "Source",
    sub: "Facilitator + contracts on GitHub",
    href: "https://github.com/Tvarox/EMEI-Facilitator",
    cta: "View repo",
    external: true,
  },
  {
    icon: Mail,
    label: "Build with us",
    sub: "Early collaborators, no SLAs, just craft",
    href: "mailto:hello@emei.xyz",
    cta: "Say hi",
    external: false,
  },
];

export const BuildSection = () => {
  return (
    <section
      id="build"
      className="relative w-full bg-canvas py-24 sm:py-32 px-5 sm:px-6 overflow-hidden"
    >
      {/* hairline grid bg */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-[960px] mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="block text-center eyebrow"
        >
          {"// Build"}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-4 text-center font-display text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-0.02em] text-ink"
        >
          Read the spec.{" "}
          <span className="text-accent">Wire it up.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-5 text-center max-w-[520px] mx-auto text-[15px] leading-[1.55] text-ink/65"
        >
          EMEI is open and pre-production. The fastest way to understand it is
          to read the protocol, then wire a facilitator against testnet.
        </motion.p>

        {/* Three calm cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {LINKS.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group relative flex flex-col gap-4 rounded-2xl border border-hairline bg-panel hover:bg-white p-5 sm:p-6 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-ink/[0.04] text-ink group-hover:bg-accent group-hover:text-canvas transition-colors">
                  <l.icon className="w-4 h-4" strokeWidth={1.6} />
                </span>
                <ArrowUpRight className="w-4 h-4 text-ink/40 group-hover:text-ink transition-colors group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transform-gpu" />
              </div>

              <div>
                <h3 className="font-display text-[24px] leading-none text-ink">
                  {l.label}
                </h3>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {l.sub}
                </p>
              </div>

              <div className="mt-auto pt-2 border-t border-hairline/60 flex items-center justify-between">
                <span className="text-[13px] font-medium text-ink/80">
                  {l.cta}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {l.external ? "external" : "email"}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Honest closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted/80"
        >
          No partners listed · no production deployments · no uptime promised
        </motion.p>
      </div>
    </section>
  );
};
