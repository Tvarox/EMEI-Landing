"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";

const TOTAL_CELLS = 12;

export default function Settlement() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // matchMedia is browser-only; one-shot fill when motion is disabled.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilled(TOTAL_CELLS);
      return;
    }

    let raf = 0;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const total = el.offsetHeight - vh;
      const ratio = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      const next = Math.round(ratio * TOTAL_CELLS);
      setFilled(next);
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const headlineVisible = filled >= TOTAL_CELLS;

  return (
    <section
      id="act-4"
      data-act="3"
      ref={sectionRef}
      className="relative px-8 md:px-24"
      style={{ height: "240vh" }}
    >
      <SectionLabel text="// ACT 04 :: OUTCOME" />

      <div
        className="sticky top-0 flex items-center"
        style={{ height: "100vh" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full items-center">
          <div className="md:col-span-4 flex md:block items-center justify-center">
            <div className="hidden md:flex flex-col-reverse gap-2">
              {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
                const lit = i < filled;
                return (
                  <div
                    key={i}
                    aria-hidden
                    style={{
                      width: 56,
                      height: 28,
                      border: "2px solid var(--brutalist-ink)",
                      background: lit
                        ? "var(--brutalist-accent)"
                        : "var(--brutalist-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--brutalist-font-chrome)",
                      fontSize: 11,
                      color: lit ? "var(--brutalist-bg)" : "var(--brutalist-ink)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {lit ? "[X]" : "[ ]"}
                  </div>
                );
              })}
            </div>
            <div className="md:hidden flex gap-1 flex-wrap">
              {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
                const lit = i < filled;
                return (
                  <div
                    key={i}
                    aria-hidden
                    style={{
                      width: 24,
                      height: 24,
                      border: "2px solid var(--brutalist-ink)",
                      background: lit
                        ? "var(--brutalist-accent)"
                        : "var(--brutalist-bg)",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="md:col-span-8">
            <div
              className={`brutalist-reveal ${headlineVisible ? "in" : ""}`}
              style={{ visibility: headlineVisible ? "visible" : "hidden" }}
            >
              <h2
                style={{
                  fontFamily: "var(--brutalist-font-mono)",
                  fontSize: "clamp(28px, 4.5vw, 56px)",
                  lineHeight: 1.1,
                  color: "var(--brutalist-ink)",
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                PAID IN STABLECOINS. EARNING WHILE IT SITS.
              </h2>
              <p
                style={{
                  marginTop: 16,
                  fontFamily: "var(--brutalist-font-chrome)",
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  color: "var(--brutalist-ink)",
                }}
              >
                Settles on Mantle. Withdraw whenever.
              </p>
            </div>

            {!headlineVisible && (
              <div
                style={{
                  fontFamily: "var(--brutalist-font-chrome)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--brutalist-ink)",
                }}
              >
                {String(filled).padStart(2, "0")} / 12
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
