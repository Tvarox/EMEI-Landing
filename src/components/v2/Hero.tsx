"use client";

import { motion } from "framer-motion";
import HeroVisual from "./HeroVisual";
import AsciiWave from "./AsciiWave";
import { MorphingText } from "@/components/ui/morphing-text";

const PROOF_TAGS = [
  "Mantle Sepolia",
  "Open source",
  "ERC-8004 reputation",
  "x402-ready",
  "mUSD settlement",
  "Self-custodial",
  "On-chain receipts",
  "Programmable mandates",
];

const HERO_WORDS = [
  "machines.",
  "AI agents.",
  "business.",
];

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        paddingTop: "calc(64px + clamp(48px, 9vh, 120px))",
        paddingBottom: "clamp(48px, 8vh, 80px)",
        overflow: "hidden",
      }}
    >
      <AsciiWave
        className="absolute inset-0 pointer-events-none opacity-25"
      />

      <div
        className="container-x"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="status-pill"
              style={{ marginBottom: 28 }}
            >
              <span className="status-dot" />
              <span>Live on Mantle Sepolia · v0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.05,
              }}
              className="h1"
              style={{
                marginTop: 0,
                marginBottom: 18,
                fontSize: "clamp(38px, 6vw, 76px)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
              }}
            >
              Invoicing for{" "}
              <MorphingText
                texts={HERO_WORDS}
                style={{ color: "var(--accent)" }}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15,
              }}
              className="lead"
              style={{ marginTop: 0, marginBottom: 28 }}
            >
              EMEI is an open protocol where software issues, presents, and
              collects invoices on-chain with programmable mandates,
              reputation gating, and stablecoin settlement on Mantle.
              Built for the agents that already exist.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.25,
              }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <a
                href="#primitives"
                className="btn btn-primary"
                aria-label="Read the protocol"
              >
                Read the protocol
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Proof marquee */}
      <div
        aria-hidden
        className="hairline-t"
        style={{
          marginTop: "clamp(32px, 4vh, 48px)",
          paddingTop: 18,
          paddingBottom: 18,
          background: "var(--bg)",
          overflow: "hidden",
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            width: "max-content",
          }}
        >
          <div style={{ display: "flex", gap: 48, paddingRight: 48 }}>
            {PROOF_TAGS.map((tag, i) => (
              <span
                key={`a-${i}`}
                className="eyebrow"
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0,
                  }}
                />
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 48, paddingRight: 48 }}>
            {PROOF_TAGS.map((tag, i) => (
              <span
                key={`b-${i}`}
                className="eyebrow"
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0,
                  }}
                />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
