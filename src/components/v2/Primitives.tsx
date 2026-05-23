"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionEyebrow from "./SectionEyebrow";

const STATUSES = ["ISSUED", "PRESENTED", "PAID"] as const;

const PANELS = [
  {
    index: "01",
    title: "Invoice.",
    sub: "A lifecycle, not a document.",
    copy: "Every EMEI invoice is an on-chain object with its own state machine. Issuers create it. Payers see it the moment it exists. Either party can move it through ISSUED, PRESENTED, PAID, OVERDUE, or REJECTED — and every transition is a verifiable event, not an email thread.",
  },
  {
    index: "02",
    title: "Mandate.",
    sub: "Pay on rules you set in advance.",
    copy: "A mandate is a standing permission. You define a cap, a counterparty (or category), and a time window. When an invoice arrives that fits the scope, it auto-pays on the due date. Outside the scope, it never pays. You don't have to be online for either outcome.",
  },
  {
    index: "03",
    title: "Reputation.",
    sub: "Both sides clear before value moves.",
    copy: "EMEI reads ERC-8004 reputation at invoice creation and re-reads it at payment time. If either side falls below the threshold you require, settlement halts. Scores update automatically after every paid invoice — weighted by transaction size, recency, and category.",
  },
] as const;

export default function Primitives() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Track scroll of the tall container — aligned to the sticky pin point
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80px", "end end"],
  });

  // Apply spring physics for a premium, smooth momentum feel
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 150,
    damping: 20,
    restDelta: 0.001,
  });

  // We use a piecewise animation to pause on each panel:
  // 0.00 -> 0.15: Pause on Panel 1
  // 0.15 -> 0.40: Slide to Panel 2
  // 0.40 -> 0.60: Pause on Panel 2
  // 0.60 -> 0.85: Slide to Panel 3
  // 0.85 -> 1.00: Pause on Panel 3 (fully visible before unpinning)
  const x = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 0.6, 0.85, 1],
    ["0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw"]
  );

  // Progress indicator
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* ===== DESKTOP: Scroll-jacked horizontal carousel ===== */}
      <div
        ref={trackRef}
        className="primitives-desktop-track"
        id="primitives"
        style={{
          position: "relative",
          height: "400vh", // Increased track height for comfortable reading pauses
        }}
      >
        {/* Background dots */}
        <div
          aria-hidden
          className="bg-dots"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.4,
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
            pointerEvents: "none",
          }}
        />

        {/* Sticky viewport — pinned below header */}
        <div
          style={{
            position: "sticky",
            top: "80px",
            height: "calc(100vh - 80px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Section intro — always visible */}
          <div
            className="container-x"
            style={{
              paddingTop: "clamp(32px, 4vh, 56px)",
              paddingBottom: "clamp(24px, 3vh, 40px)",
              flexShrink: 0,
            }}
          >
            <SectionEyebrow index="02" label="Primitives" />
            <h2
              id="primitives-heading"
              className="h2"
              style={{ marginTop: 24, marginBottom: 16, maxWidth: "16ch" }}
            >
              Three pieces. Nothing else to learn.
            </h2>
            <p className="lead" style={{ marginTop: 0, marginBottom: 0 }}>
              An invoice you can hand to anything. A mandate that pays it on
              terms you set in advance. A reputation gate that keeps both sides
              honest.
            </p>

            {/* Scroll progress bar */}
            <div
              style={{
                marginTop: 24,
                height: 2,
                background: "var(--hairline)",
                borderRadius: 1,
                overflow: "hidden",
                maxWidth: 320,
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  width: progressWidth,
                  background: "var(--accent)",
                  borderRadius: 1,
                }}
              />
            </div>
          </div>

          {/* Horizontal sliding strip */}
          <motion.div
            style={{
              x,
              display: "flex",
              width: "300vw",
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Panel 1: Invoice */}
            <div
              style={{
                width: "100vw",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                className="container-x"
                style={{ width: "100%", maxWidth: 1280 }}
              >
                <PrimitivePanel
                  index={PANELS[0].index}
                  title={PANELS[0].title}
                  sub={PANELS[0].sub}
                  copy={PANELS[0].copy}
                  visual={<InvoiceVisual />}
                />
              </div>
            </div>

            {/* Panel 2: Mandate */}
            <div
              style={{
                width: "100vw",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                className="container-x"
                style={{ width: "100%", maxWidth: 1280 }}
              >
                <PrimitivePanel
                  index={PANELS[1].index}
                  title={PANELS[1].title}
                  sub={PANELS[1].sub}
                  copy={PANELS[1].copy}
                  visual={<MandateVisual />}
                />
              </div>
            </div>

            {/* Panel 3: Reputation */}
            <div
              style={{
                width: "100vw",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                className="container-x"
                style={{ width: "100%", maxWidth: 1280 }}
              >
                <PrimitivePanel
                  index={PANELS[2].index}
                  title={PANELS[2].title}
                  sub={PANELS[2].sub}
                  copy={PANELS[2].copy}
                  visual={<ReputationVisual />}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== MOBILE: Simple vertical stack ===== */}
      <section
        className="primitives-mobile-stack section max-sm:!pt-0 max-sm:!pb-20"
        style={{
          position: "relative",
          background: "transparent",
        }}
        aria-labelledby="primitives-heading-mobile"
      >
        <div
          aria-hidden
          className="bg-dots"
          style={{
            opacity: 0.4,
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
        <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: 64 }}>
            <SectionEyebrow index="02" label="Primitives" />
            <h2
              id="primitives-heading-mobile"
              className="h2"
              style={{ marginTop: 24, marginBottom: 16, maxWidth: "16ch" }}
            >
              Three pieces. Nothing else to learn.
            </h2>
            <p className="lead" style={{ marginTop: 0 }}>
              An invoice you can hand to anything. A mandate that pays it on
              terms you set in advance. A reputation gate that keeps both sides
              honest.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 80,
            }}
          >
            <MobilePrimitiveBlock
              index="01"
              title="Invoice."
              sub="A lifecycle, not a document."
              copy="Every EMEI invoice is an on-chain object with its own state machine. Issuers create it. Payers see it the moment it exists. Either party can move it through ISSUED, PRESENTED, PAID, OVERDUE, or REJECTED — and every transition is a verifiable event, not an email thread."
              visual={<InvoiceVisual />}
            />
            <MobilePrimitiveBlock
              index="02"
              title="Mandate."
              sub="Pay on rules you set in advance."
              copy="A mandate is a standing permission. You define a cap, a counterparty (or category), and a time window. When an invoice arrives that fits the scope, it auto-pays on the due date. Outside the scope, it never pays. You don't have to be online for either outcome."
              visual={<MandateVisual />}
            />
            <MobilePrimitiveBlock
              index="03"
              title="Reputation."
              sub="Both sides clear before value moves."
              copy="EMEI reads ERC-8004 reputation at invoice creation and re-reads it at payment time. If either side falls below the threshold you require, settlement halts. Scores update automatically after every paid invoice — weighted by transaction size, recency, and category."
              visual={<ReputationVisual />}
            />
          </div>
        </div>
      </section>

      <style>{`
        /* Desktop track shows, mobile hides */
        @media (min-width: 881px) {
          .primitives-mobile-stack {
            display: none !important;
          }
        }
        /* Mobile stack shows, desktop hides */
        @media (max-width: 880px) {
          .primitives-desktop-track {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

/* ----------------------------------------------------------- */
/* Desktop panel layout — text left, visual right              */
/* ----------------------------------------------------------- */

function PrimitivePanel({
  index,
  title,
  sub,
  copy,
  visual,
}: {
  index: string;
  title: string;
  sub: string;
  copy: string;
  visual: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "56px",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "var(--accent)",
            }}
          >
            {index}
          </span>
          <span
            aria-hidden
            style={{
              width: 24,
              height: 1,
              background: "var(--accent)",
              transform: "translateY(-4px)",
            }}
          />
        </div>
        <h3
          className="display"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            margin: 0,
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 1.6vw, 22px)",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 20,
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          {sub}
        </p>
        <p
          className="body-muted"
          style={{ maxWidth: "52ch", marginTop: 0 }}
        >
          {copy}
        </p>
      </div>
      <div>{visual}</div>
    </div>
  );
}

/* ----------------------------------------------------------- */
/* Mobile block — simple vertical card                         */
/* ----------------------------------------------------------- */

function MobilePrimitiveBlock({
  index,
  title,
  sub,
  copy,
  visual,
}: {
  index: string;
  title: string;
  sub: string;
  copy: string;
  visual: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "var(--accent)",
            }}
          >
            {index}
          </span>
          <span
            aria-hidden
            style={{
              width: 24,
              height: 1,
              background: "var(--accent)",
              transform: "translateY(-4px)",
            }}
          />
        </div>
        <h3
          className="display"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            margin: 0,
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 1.6vw, 22px)",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 20,
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          {sub}
        </p>
        <p
          className="body-muted"
          style={{ maxWidth: "52ch", marginTop: 0 }}
        >
          {copy}
        </p>
      </div>
      <div>{visual}</div>
    </motion.article>
  );
}

/* ----------------------------------------------------------- */
/* Invoice visual — three status chips cycle smoothly          */
/* ----------------------------------------------------------- */

function InvoiceVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setActive((n) => (n + 1) % STATUSES.length),
      1800,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="card"
      style={{
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxShadow: "0 22px 56px -28px rgba(15,15,15,0.18)",
      }}
    >
      <div className="eyebrow" style={{ fontSize: 11 }}>
        State machine
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {STATUSES.map((s, i) => (
          <div
            key={s}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <motion.span
              animate={{
                background:
                  i === active ? "var(--accent)" : "rgba(255, 85, 0, 0)",
                color:
                  i === active ? "#ffffff" : "var(--ink)",
                borderColor:
                  i === active
                    ? "var(--accent)"
                    : "var(--hairline-strong)",
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.16em",
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid var(--hairline-strong)",
              }}
            >
              {s}
            </motion.span>
            {i < STATUSES.length - 1 && (
              <span aria-hidden style={{ color: "var(--muted-2)" }}>
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        className="hairline-t"
        style={{
          paddingTop: 14,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          rowGap: 6,
          columnGap: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        <span>Issuer</span>
        <span style={{ color: "var(--ink)" }}>0xA14F…7e92</span>
        <span>Amount</span>
        <span style={{ color: "var(--ink)" }}>250.00 mUSD</span>
        <span>Terms</span>
        <span style={{ color: "var(--ink)" }}>Net 7 days</span>
        <span>Updated</span>
        <span style={{ color: "var(--ink)" }}>~30s ago · block 0x4f…</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- */
/* Mandate visual — depleting cap with mini scope summary      */
/* ----------------------------------------------------------- */

function MandateVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [pct, setPct] = useState(100);

  useEffect(() => {
    if (!inView) return;
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPct(40);
      return;
    }
    let p = 100;
    const id = window.setInterval(() => {
      p -= 4;
      if (p <= 40) {
        p = 40;
        window.clearInterval(id);
      }
      setPct(p);
    }, 60);
    return () => window.clearInterval(id);
  }, [inView]);

  const used = Math.round(((100 - pct) / 100) * 1000);
  const remaining = 1000 - used;

  return (
    <div
      ref={ref}
      className="card"
      style={{
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxShadow: "0 22px 56px -28px rgba(15,15,15,0.18)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="eyebrow" style={{ fontSize: 11 }}>
          Standing mandate
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 8px",
            borderRadius: 999,
            background: "var(--accent-soft)",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--accent)",
            }}
          />
          Active
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 8,
          }}
        >
          <span
            className="display"
            style={{ fontSize: 24, fontWeight: 600 }}
          >
            <span className="tabular">{remaining}</span>{" "}
            <span style={{ color: "var(--muted-2)" }}>mUSD</span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            of <span className="tabular">1,000</span> remaining
          </span>
        </div>
        <div
          style={{
            position: "relative",
            height: 6,
            background: "var(--bg-3)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              background: "var(--accent)",
            }}
          />
        </div>
      </div>

      <div
        className="hairline-t"
        style={{
          paddingTop: 14,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          rowGap: 6,
          columnGap: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        <span>Counterparty</span>
        <span style={{ color: "var(--ink)" }}>VENDOR_API_*</span>
        <span>Window</span>
        <span style={{ color: "var(--ink)" }}>Net 7 · expires Jul 12</span>
        <span>Categories</span>
        <span style={{ color: "var(--ink)" }}>compute · inference</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- */
/* Reputation visual — two avatars + threshold gauge           */
/* ----------------------------------------------------------- */

function ReputationVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <div
      ref={ref}
      className="card"
      style={{
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxShadow: "0 22px 56px -28px rgba(15,15,15,0.18)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="eyebrow" style={{ fontSize: 11 }}>
          ERC-8004 gate
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--accent)",
            textTransform: "uppercase",
          }}
        >
          <motion.span
            animate={{ opacity: inView ? 1 : 0.4 }}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--accent)",
            }}
          />
          {inView ? "Pass" : "Hold"}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Avatar label="A" score={73} threshold={50} accent={inView} />
        <motion.div
          aria-hidden
          animate={{
            scale: inView ? 1 : 0.92,
            opacity: inView ? 1 : 0.4,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.16em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            Threshold
          </div>
          <div
            style={{
              padding: "6px 10px",
              border: `1px solid ${inView ? "var(--accent)" : "var(--hairline-strong)"}`,
              borderRadius: 4,
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 600,
              color: inView ? "var(--accent)" : "var(--ink)",
            }}
          >
            ≥ 50
          </div>
        </motion.div>
        <Avatar label="B" score={68} threshold={50} accent={inView} />
      </div>

      <div
        className="hairline-t"
        style={{
          paddingTop: 14,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
          lineHeight: 1.6,
        }}
      >
        <div>
          Weighted: size <span style={{ color: "var(--ink)" }}>50%</span>{" "}
          · time <span style={{ color: "var(--ink)" }}>30%</span> · category{" "}
          <span style={{ color: "var(--ink)" }}>20%</span>
        </div>
        <div>
          Re-read on payment · halts settlement on either side falling.
        </div>
      </div>
    </div>
  );
}

function Avatar({
  label,
  score,
  threshold,
  accent,
}: {
  label: string;
  score: number;
  threshold: number;
  accent: boolean;
}) {
  const pass = score >= threshold;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          border: `2px solid ${pass && accent ? "var(--accent)" : "var(--hairline-strong)"}`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontSize: 24,
          fontWeight: 600,
          color: "var(--ink)",
          background: "#ffffff",
          transition:
            "border-color var(--dur-260) var(--ease-out-quart)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "var(--muted)",
        }}
      >
        score{" "}
        <span style={{ color: "var(--ink)", fontWeight: 600 }}>{score}</span>
      </div>
    </div>
  );
}
