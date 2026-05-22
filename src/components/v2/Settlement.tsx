"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionEyebrow from "./SectionEyebrow";

export default function Settlement() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fillHeight = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);
  const yieldOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="settlement"
      ref={ref}
      className="section"
      style={{
        position: "relative",
        background: "var(--ink)",
        color: "#ffffff",
      }}
      aria-labelledby="settle-heading"
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-20%",
          top: "20%",
          width: "60vw",
          height: "60vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,85,0,0.18) 0%, transparent 60%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-x"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 64,
            alignItems: "center",
          }}
          className="settle-grid"
        >
          <motion.div style={{ y: headlineY }}>
            <SectionEyebrow index="04" label="Settlement" accent />
            <h2
              id="settle-heading"
              className="h2"
              style={{
                marginTop: 24,
                marginBottom: 24,
                color: "#ffffff",
                maxWidth: "16ch",
              }}
            >
              Paid in stablecoins. Earning while it sits.
            </h2>
            <p
              className="body"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: 17,
                lineHeight: 1.6,
                maxWidth: "52ch",
                marginBottom: 32,
              }}
            >
              USDC and other accepted stablecoins are normalized into mUSD
              through a slippage-bounded swap. Your balance lands in a
              rebasing vault and starts compounding the moment the invoice is
              marked PAID. Withdraw whenever — receipts anchor on-chain every
              ~30 seconds for cryptographic verification.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                maxWidth: 480,
              }}
            >
              <Stat
                label="Settlement asset"
                value="mUSD"
                sub="on Mantle · chain 5003"
              />
              <Stat
                label="Receipt anchoring"
                value="~30s"
                sub="Merkle-batched on-chain"
              />
              <Stat
                label="Slippage cap"
                value="≤ 1.0%"
                sub="USDC → mUSD swaps"
              />
              <Stat
                label="Withdrawal"
                value="Anytime"
                sub="self-custodial vault"
              />
            </div>
          </motion.div>

          <div
            style={{
              position: "relative",
              minHeight: 460,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 220,
                height: 380,
              }}
            >
              {/* Glass cylinder */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: 16,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  overflow: "hidden",
                }}
              >
                {/* Liquid */}
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: fillHeight,
                    background:
                      "linear-gradient(180deg, rgba(255,85,0,0.85) 0%, rgba(255,85,0,1) 100%)",
                  }}
                />
                {/* Liquid surface highlight */}
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: fillHeight,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "rgba(255,255,255,0.5)",
                    transform: "translateY(1px)",
                  }}
                />
              </div>

              {/* Tick marks */}
              {[20, 40, 60, 80].map((p) => (
                <div
                  key={p}
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: -28,
                    bottom: `${p}%`,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.08em",
                    transform: "translateY(50%)",
                  }}
                >
                  — {p}%
                </div>
              ))}

              {/* Yield label */}
              <motion.div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -32,
                  transform: "translateX(-50%)",
                  opacity: yieldOpacity,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--accent)",
                    textTransform: "uppercase",
                  }}
                >
                  ↑ rebase
                </div>
                <div
                  aria-hidden
                  style={{
                    width: 1,
                    height: 16,
                    background:
                      "linear-gradient(to bottom, var(--accent), transparent)",
                  }}
                />
              </motion.div>

              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: -32,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                }}
              >
                Vault · self-custodial
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .settle-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        className="display tabular"
        style={{
          fontSize: 22,
          color: "#ffffff",
          fontWeight: 500,
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {sub}
      </div>
    </div>
  );
}
