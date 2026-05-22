"use client";

import { useEffect, useState } from "react";

const LINES = [
  "> BOOT EMEI/0.1",
  "> LOAD PRIMITIVES ... OK",
  "> LINK MANTLE ........ OK",
  "> CHECK SCOPE ........ OK",
  "> READY.",
];

const STORAGE_KEY = "emei.boot.shown";

export default function BootSequence() {
  const [printed, setPrinted] = useState(0);
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let already = false;
    try {
      already = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      already = false;
    }
    if (already) return;
    if (reduce) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      return;
    }
    // One-shot reveal that requires window/sessionStorage; cannot run during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    if (printed >= LINES.length) {
      const t = window.setTimeout(() => {
        setHidden(true);
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}
      }, 250);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setPrinted((n) => n + 1), 140);
    return () => window.clearTimeout(t);
  }, [printed, show]);

  if (!show || hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end"
      style={{
        background: "var(--brutalist-bg)",
        color: "var(--brutalist-ink)",
        fontFamily: "var(--brutalist-font-chrome)",
        fontSize: 14,
        letterSpacing: "0.04em",
      }}
      aria-hidden
    >
      <div className="px-8 pb-12 md:px-16 md:pb-16">
        {LINES.slice(0, printed).map((line, i) => (
          <div key={i} style={{ lineHeight: 1.6 }}>
            {line}
          </div>
        ))}
        {printed < LINES.length && (
          <span
            className="brutalist-blink"
            style={{
              display: "inline-block",
              width: 10,
              height: 16,
              background: "var(--brutalist-accent)",
              verticalAlign: "middle",
              marginTop: 4,
            }}
          />
        )}
      </div>
    </div>
  );
}
