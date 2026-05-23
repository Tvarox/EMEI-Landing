"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

const STEPS = [
  {
    n: "01",
    title: "Issue",
    body: "Agent A creates an invoice — payer address, amount, terms, optional category. It's an on-chain object the moment it exists.",
    side: "from",
  },
  {
    n: "02",
    title: "Present",
    body: "The invoice arrives at agent B's facilitator. If a mandate covers it, it's queued for auto-collection on the due date.",
    side: "to",
  },
  {
    n: "03",
    title: "Clear",
    body: "Both sides' ERC-8004 reputation is read. If either falls below the threshold, settlement halts and the invoice is flagged.",
    side: "to",
  },
  {
    n: "04",
    title: "Settle",
    body: "On the due date, mUSD moves on Mantle. The vault begins yielding immediately. A receipt is anchored on-chain within ~30 seconds.",
    side: "to",
  },
] as const;

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section"
      style={{
        position: "relative",
        background: "transparent",
      }}
      aria-labelledby="hiw-heading"
    >
      <div
        aria-hidden
        className="bg-grid"
        style={{ opacity: 0.5 }}
      />

      <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 64 }}>
          <SectionEyebrow index="03" label="How it works" />
          <motion.h2
            id="hiw-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h2"
            style={{ marginTop: 24, marginBottom: 16, maxWidth: "20ch" }}
          >
            From issued to settled. No human in the middle.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.08,
            }}
            className="lead"
          >
            Four states, all verifiable on-chain. Mandates collapse the wait
            from days to a single block.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            position: "relative",
          }}
          className="hiw-grid"
        >
          {/* Connecting line with a moving orange light beam */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 24, // Perfect center of the 48px circles (48 / 2 = 24)
              left: 24,
              right: 24,
              height: 2,
              background:
                "linear-gradient(to right, transparent, var(--hairline-strong) 8%, var(--hairline-strong) 92%, transparent)",
              zIndex: 0,
              overflow: "hidden",
              borderRadius: 1,
            }}
            className="hiw-line"
          >
            <motion.div
              initial={{ left: "-30%" }}
              animate={{ left: "100%" }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "30%",
                background: "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)",
              }}
            />
          </div>

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid var(--hairline-strong)",
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  color: "var(--accent)",
                }}
              >
                {s.n}
              </div>
              <h3
                className="h3"
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 2vw, 26px)",
                }}
              >
                {s.title}
              </h3>
              <p className="body-muted" style={{ fontSize: 13.5, marginTop: 0 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .hiw-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
          .hiw-line {
            display: none !important;
          }
        }
        @media (max-width: 540px) {
          .hiw-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
