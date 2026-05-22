"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: "clamp(96px, 14vh, 160px)",
        paddingBottom: "clamp(96px, 14vh, 160px)",
        background: "var(--bg-2)",
        overflow: "hidden",
      }}
      aria-labelledby="cta-heading"
    >
      <div
        aria-hidden
        className="bg-grid"
        style={{
          opacity: 0.4,
          maskImage:
            "radial-gradient(ellipse 60% 80% at 50% 50%, black 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="bg-soft-glow"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "80vw",
          maxWidth: 900,
          maxHeight: 900,
        }}
      />

      <div
        className="container-x"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="terminal"
            style={{
              fontSize: 14,
              color: "var(--accent)",
              letterSpacing: "0.06em",
              marginBottom: 24,
            }}
          >
            {"// Built for the agents that already exist."}
          </div>
          <h2
            id="cta-heading"
            className="h1"
            style={{
              marginTop: 0,
              marginBottom: 32,
              maxWidth: "18ch",
              marginInline: "auto",
            }}
          >
            Read the protocol.{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "var(--accent)",
                fontFamily: "var(--font-display)",
              }}
            >
              Or run one.
            </em>
          </h2>
          <p
            className="lead"
            style={{
              marginInline: "auto",
              marginBottom: 40,
              maxWidth: "52ch",
            }}
          >
            Everything we&rsquo;ve built is on GitHub. The contracts, the
            facilitator, the CLI, the reference clients. Open an issue, fork
            the rail, or send your first invoice on testnet.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/Tvarox/EMEI-Contracts"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              View contracts
              <span aria-hidden>↗</span>
            </a>
            <a
              href="https://github.com/Tvarox/EMEI-Facilitator"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Run the facilitator
              <span aria-hidden>↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
