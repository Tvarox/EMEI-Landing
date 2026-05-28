"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

export default function WhyEmei() {
  return (
    <section
      id="why-emei"
      className="section-tight max-sm:!pb-20"
      style={{ position: "relative" }}
      aria-labelledby="why-heading"
    >
      <div className="container-x">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(180px, 0.6fr) 1.4fr",
            gap: 56,
            alignItems: "start",
          }}
          className="why-grid"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionEyebrow index="01" label="Why" />
          </motion.div>

          <div>
            <motion.h2
              id="why-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="h2"
              style={{ marginTop: 0, marginBottom: 32, maxWidth: 22 + "ch" }}
            >
              Software is starting to spend money. The paperwork hasn&rsquo;t
              caught up.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
              }}
              className="why-copy"
            >
              <p className="body-muted" style={{ maxWidth: "44ch" }}>
                AI agents are booking flights, paying APIs, settling
                subscriptions, and hiring other agents. Most of that economy
                still runs on rails designed for humans signing receipts.
              </p>
              <p className="body-muted" style={{ maxWidth: "44ch" }}>
                EMEI is a small set of on-chain primitives that let one piece
                of software ask another for money and let the answer
                be a yes that doesn&rsquo;t need a human in the loop.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .why-copy {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
