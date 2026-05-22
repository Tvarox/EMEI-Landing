"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";

const CHIPS = ["ISSUED", "PRESENTED", "PAID"] as const;

function InvoiceVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setActive((n) => (n + 1) % CHIPS.length),
      2000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      style={{
        fontFamily: "var(--brutalist-font-chrome)",
        fontSize: 12,
        letterSpacing: "0.12em",
      }}
    >
      {CHIPS.map((c, i) => (
        <span key={c} className="flex items-center gap-2">
          <span
            style={{
              border: "2px solid var(--brutalist-ink)",
              padding: "6px 10px",
              background:
                i === active ? "var(--brutalist-accent)" : "var(--brutalist-bg)",
              color:
                i === active ? "var(--brutalist-bg)" : "var(--brutalist-ink)",
            }}
          >
            [ {c} ]
          </span>
          {i < CHIPS.length - 1 && (
            <span style={{ color: "var(--brutalist-ink)" }}>{">"}</span>
          )}
        </span>
      ))}
    </div>
  );
}

const BAR_TOTAL = 18;

function MandateVisual() {
  const [filled, setFilled] = useState(BAR_TOTAL);
  const ref = useRef<HTMLDivElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // matchMedia is browser-only; one-shot static value when motion is disabled.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilled(7);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const target = 7;
            const stepsCount = BAR_TOTAL - target;
            let step = 0;
            const id = window.setInterval(() => {
              step += 1;
              setFilled(BAR_TOTAL - step);
              if (step >= stepsCount) window.clearInterval(id);
            }, 220);
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cap = Math.round((filled / BAR_TOTAL) * 1000);

  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: "var(--brutalist-font-chrome)",
          fontSize: 14,
          letterSpacing: "0.06em",
          color: "var(--brutalist-ink)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "clip",
        }}
      >
        {Array.from({ length: BAR_TOTAL }).map((_, i) => (
          <span
            key={i}
            style={{
              color:
                i < filled ? "var(--brutalist-accent)" : "var(--brutalist-ink)",
            }}
          >
            {i < filled ? "█" : "░"}
          </span>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          fontFamily: "var(--brutalist-font-chrome)",
          fontSize: 11,
          letterSpacing: "0.16em",
          color: "var(--brutalist-ink)",
        }}
      >
        CAP {cap} / 1000 &nbsp;&nbsp; NET 7 &nbsp;&nbsp; SCOPE: VENDOR_A
      </div>
    </div>
  );
}

function ReputationVisual() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // matchMedia is browser-only; one-shot static open when motion is disabled.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setOpen(entry.isIntersecting);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: "var(--brutalist-font-chrome)",
          fontSize: 16,
          letterSpacing: "0.04em",
          color: "var(--brutalist-ink)",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        [ A ]──────
        <span
          style={{
            color: open ? "var(--brutalist-accent)" : "var(--brutalist-ink)",
          }}
        >
          {open ? "┤ ├" : "┤├"}
        </span>
        ──────[ B ]
      </div>
      <div
        style={{
          marginTop: 12,
          fontFamily: "var(--brutalist-font-chrome)",
          fontSize: 11,
          letterSpacing: "0.16em",
          color: "var(--brutalist-ink)",
        }}
      >
        SCORE 73 / 50 &nbsp;&nbsp;{" "}
        <span
          style={{
            color: open ? "var(--brutalist-accent)" : "var(--brutalist-ink)",
          }}
        >
          {open ? "PASS" : "HOLD"}
        </span>
      </div>
    </div>
  );
}

function Card({
  index,
  label,
  title,
  copy,
  children,
}: {
  index: number;
  label: string;
  title: string;
  copy: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => setShown(true), index * 200);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`brutalist-reveal ${shown ? "in" : ""}`}
      style={{
        border: "2px solid var(--brutalist-ink)",
        background: "var(--brutalist-bg)",
        padding: 28,
        boxShadow: "6px 6px 0 0 var(--brutalist-ink)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minHeight: 320,
      }}
    >
      <div
        style={{
          fontFamily: "var(--brutalist-font-chrome)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--brutalist-ink)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--brutalist-font-mono)",
          fontSize: 32,
          lineHeight: 1.05,
          color: "var(--brutalist-ink)",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--brutalist-font-chrome)",
          fontSize: 13,
          lineHeight: 1.55,
          color: "var(--brutalist-ink)",
          letterSpacing: "0.02em",
          maxWidth: 320,
        }}
      >
        {copy}
      </div>
      <div style={{ marginTop: "auto", paddingTop: 16 }}>{children}</div>
    </div>
  );
}

export default function Primitives() {
  return (
    <section
      id="act-3"
      data-act="2"
      className="relative min-h-screen px-8 md:px-24 py-24 md:py-32"
    >
      <SectionLabel text="// ACT 03 :: PRIMITIVES" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <Card
          index={0}
          label="[ 01 / OBJECT ]"
          title="INVOICE."
          copy="A lifecycle, not a document."
        >
          <InvoiceVisual />
        </Card>
        <Card
          index={1}
          label="[ 02 / PERMISSION ]"
          title="MANDATE."
          copy="Standing permission. Cap. Counterparty. Clock."
        >
          <MandateVisual />
        </Card>
        <Card
          index={2}
          label="[ 03 / GATE ]"
          title="REPUTATION."
          copy="Both sides clear before value moves."
        >
          <ReputationVisual />
        </Card>
      </div>
    </section>
  );
}
