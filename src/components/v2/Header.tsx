"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition:
          "background-color var(--dur-260) var(--ease-out-quart), border-color var(--dur-260) var(--ease-out-quart), backdrop-filter var(--dur-260) var(--ease-out-quart)",
        backgroundColor: scrolled
          ? "rgba(250, 249, 246, 0.86)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--hairline)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(140%) blur(8px)" : "none",
      }}
    >
      <div
        className="container-x"
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#top"
          aria-label="EMEI"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            color: "var(--ink)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 18,
              height: 18,
              border: "1.5px solid var(--ink)",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 4,
                background: "var(--accent)",
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              fontSize: 17,
            }}
          >
            EMEI
          </span>
        </a>

        <nav
          aria-label="primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <a
            href="#primitives"
            className="hidden md:inline-flex"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--muted)",
            }}
          >
            Protocol
          </a>
          <a
            href="#how-it-works"
            className="hidden md:inline-flex"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--muted)",
            }}
          >
            How it works
          </a>
          <a
            href="#status"
            className="hidden md:inline-flex"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--muted)",
            }}
          >
            Status
          </a>
          <a
            href="https://github.com/Tvarox/EMEI-Contracts"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            GitHub
            <span aria-hidden>↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
