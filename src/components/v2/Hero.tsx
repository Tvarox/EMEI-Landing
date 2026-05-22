"use client";

import { motion } from "framer-motion";
import HeroVisual from "./HeroVisual";

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

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        paddingTop: "calc(64px + clamp(48px, 9vh, 120px))",
        paddingBottom: "clamp(64px, 10vh, 120px)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        className="bg-grid"
        style={{
          opacity: 0.6,
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
        }}
      />
      <div
        aria-hidden
        className="bg-soft-glow"
        style={{
          top: "-10%",
          right: "-15%",
        }}
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
              style={{ marginTop: 0, marginBottom: 24 }}
            >
              Invoicing for <em
                style={{
                  fontStyle: "italic",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  color: "var(--accent)",
                }}
              >
                machines.
              </em>
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
              style={{ marginTop: 0, marginBottom: 36 }}
            >
              EMEI is an open protocol where software issues, presents, and
              collects invoices on-chain &mdash; with programmable mandates,
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
              <a
                href="https://github.com/Tvarox/EMEI-Contracts"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                View on GitHub
                <span aria-hidden>↗</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              style={{
                marginTop: 56,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                className="eyebrow"
                style={{ fontSize: 10, whiteSpace: "nowrap" }}
              >
                Built on
              </div>
              <div
                aria-hidden
                style={{
                  flex: 1,
                  height: 1,
                  background: "var(--hairline)",
                }}
              />
              <div
                className="terminal"
                style={{
                  fontSize: 18,
                  color: "var(--ink)",
                  letterSpacing: "0.04em",
                }}
              >
                MANTLE · USDC · mUSD · ERC&#x2011;8004
              </div>
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
          marginTop: "clamp(56px, 8vh, 96px)",
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
            gap: 48,
            whiteSpace: "nowrap",
            width: "max-content",
          }}
        >
          {[...PROOF_TAGS, ...PROOF_TAGS].map((tag, i) => (
            <span
              key={i}
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
