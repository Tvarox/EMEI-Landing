"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

const SHIPPED = [
  "Invoice + mandate + reputation contracts on Mantle Sepolia",
  "Rust facilitator service with REST API",
  "CLI for issuing, presenting, and collecting",
  "Reference TypeScript and Python clients",
  "On-chain Merkle receipt anchoring",
];

const PENDING = [
  "Mainnet deployment",
  "Audited contracts",
  "Hosted facilitator (today: self-host only)",
  "Public testnet faucet",
];

export default function Status() {
  return (
    <section
      id="status"
      className="section"
      style={{ position: "relative" }}
      aria-labelledby="status-heading"
    >
      <div className="container-x">
        <div style={{ marginBottom: 56 }}>
          <SectionEyebrow index="05" label="Status" />
          <motion.h2
            id="status-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h2"
            style={{ marginTop: 24, marginBottom: 16, maxWidth: "16ch" }}
          >
            Live on testnet. Mainnet when it&rsquo;s ready.
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
            We&rsquo;re building this in public on Mantle Sepolia. Everything
            below is open-source. There are no production claims, no uptime
            promises, and no fake metrics on this page &mdash; only what&rsquo;s
            actually shipped.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
          className="status-grid"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="card"
            style={{ padding: 28 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 18,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--status-live)",
                }}
              />
              <span
                className="eyebrow"
                style={{ color: "var(--ink)", fontSize: 11 }}
              >
                Shipped
              </span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {SHIPPED.map((item, i) => (
                <li
                  key={i}
                  className="hairline-t"
                  style={{
                    padding: "14px 0",
                    display: "flex",
                    gap: 12,
                    fontSize: 15,
                    color: "var(--ink)",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      marginTop: 6,
                      width: 14,
                      height: 1,
                      background: "var(--accent)",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="card"
            style={{
              padding: 28,
              background: "var(--bg-2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 18,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--status-pending)",
                  border: "2px solid var(--bg-2)",
                  outline: "1px solid var(--status-pending)",
                  outlineOffset: -1,
                }}
              />
              <span
                className="eyebrow"
                style={{ color: "var(--ink)", fontSize: 11 }}
              >
                Pending
              </span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {PENDING.map((item, i) => (
                <li
                  key={i}
                  className="hairline-t"
                  style={{
                    padding: "14px 0",
                    display: "flex",
                    gap: 12,
                    fontSize: 15,
                    color: "var(--muted)",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      marginTop: 6,
                      width: 14,
                      height: 1,
                      background: "var(--hairline-strong)",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .status-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
