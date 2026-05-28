"use client";

import { useEffect, useState } from "react";

function pad(n: number, w: number) {
  return n.toString().padStart(w, "0");
}

function formatUptime(s: number) {
  const hh = pad(Math.floor(s / 3600), 4);
  const mm = pad(Math.floor((s % 3600) / 60), 2);
  const ss = pad(s % 60, 2);
  return `T+${hh}:${mm}:${ss}`;
}

export default function Chrome({ pageIndex }: { pageIndex: number }) {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setUptime((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const total = 5;
  const page = `PAGE ${pad(pageIndex + 1, 2)} / ${pad(total, 2)}`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden
      style={{ fontFamily: "var(--brutalist-font-chrome)" }}
    >
      <div
        className="absolute brutalist-chrome-tl"
        style={{
          fontFamily: "var(--brutalist-font-display)",
          fontSize: 14,
          letterSpacing: "0.04em",
          color: "var(--brutalist-ink)",
        }}
      >
        EMEI
      </div>

      <div
        className="absolute hidden md:block"
        style={{
          top: 36,
          right: 64,
          fontSize: 12,
          letterSpacing: "0.18em",
          color: "var(--brutalist-ink)",
        }}
      >
        MANTLE :: TESTNET ::{" "}
        <span
          className="brutalist-blink-slow"
          style={{ color: "var(--brutalist-accent)" }}
        >
          ONLINE
        </span>
      </div>

      <div
        className="absolute brutalist-chrome-bl"
        style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--brutalist-ink)",
        }}
      >
        {page}
      </div>

      <div
        className="absolute hidden md:block"
        style={{
          bottom: 36,
          right: 64,
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--brutalist-ink)",
        }}
      >
        {formatUptime(uptime)}
      </div>
    </div>
  );
}
