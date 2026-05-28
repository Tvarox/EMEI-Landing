"use client";

import { useEffect, useState } from "react";
import InvoiceSprite from "./InvoiceSprite";
import SectionLabel from "./SectionLabel";

const HEADLINE = "INVOICING FOR MACHINES.";

export default function Hero() {
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // matchMedia is browser-only; one-shot static reveal when motion is disabled.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChars(HEADLINE.length);
      setDone(true);
      return;
    }
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setChars(n);
      if (n >= HEADLINE.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 60);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="act-1"
      data-act="0"
      className="relative min-h-screen pt-24 md:pt-28 pb-24 md:pb-28 px-8 md:px-24"
    >
      <SectionLabel text="// ACT 01 :: ENTRY" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center min-h-[80vh]">
        <div className="md:col-span-7">
          <h1
            style={{
              fontFamily: "var(--brutalist-font-display)",
              fontSize: "clamp(28px, 7vw, 88px)",
              lineHeight: 1.15,
              color: "var(--brutalist-ink)",
              letterSpacing: "0.01em",
              marginTop: 0,
              marginBottom: 32,
              wordBreak: "break-word",
            }}
            aria-label={HEADLINE}
          >
            <span aria-hidden>{HEADLINE.slice(0, chars)}</span>
            <span
              aria-hidden
              className="brutalist-blink"
              style={{
                display: "inline-block",
                width: "0.55em",
                height: "0.85em",
                background: "var(--brutalist-accent)",
                verticalAlign: "baseline",
                marginLeft: 4,
                position: "relative",
                top: "0.05em",
                visibility: done ? "visible" : "visible",
              }}
            />
          </h1>

          <p
            style={{
              fontFamily: "var(--brutalist-font-mono)",
              fontSize: "clamp(20px, 2.4vw, 28px)",
              lineHeight: 1.35,
              color: "var(--brutalist-ink)",
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            On-chain invoices for software that buys things on its own.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#act-3"
              className="brutalist-link"
              data-interactive="true"
            >
              [ READ THE PROTOCOL → ]
            </a>
            <a
              href="#act-5"
              className="brutalist-link"
              data-interactive="true"
            >
              [ RUN THE FACILITATOR → ]
            </a>
          </div>
        </div>

        <div className="md:col-span-5 flex items-center justify-center">
          <div
            className="w-full max-w-[420px]"
            style={{ aspectRatio: "1 / 1" }}
          >
            <InvoiceSprite />
          </div>
        </div>
      </div>
    </section>
  );
}
