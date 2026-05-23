"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionEyebrow from "./SectionEyebrow";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function Settlement({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const fillHeight = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="settlement"
      ref={sectionRef}
      className="section"
      style={{
        position: "relative",
        background: "transparent",
        color: "var(--ink)",
      }}
      aria-labelledby="settle-heading"
    >
      <DottedGlowBackground
        className="hidden md:block pointer-events-none"
        gap={14}
        radius={1.2}
        color="rgba(255, 85, 0, 0.3)"
        glowColor="rgba(255, 85, 0, 0.9)"
        opacity={0.7}
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.2}
        speedScale={1}
        fadeEdge={true}
      />

      {/* Dynamic theme background handles transition seamlessly */}


      <div
        className="container-x"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.7fr",
            gap: 64,
            alignItems: "center",
          }}
          className="settle-grid"
        >
          <motion.div style={{ y: headlineY }}>
            <SectionEyebrow index="04" label="Settlement" accent />
            <h2
              id="settle-heading"
              className="h2"
              style={{
                marginTop: 24,
                marginBottom: 24,
                maxWidth: "28ch",
                fontWeight: 400,
              }}
            >
              Paid in stablecoins. Earning while it sits.
            </h2>
            <p
              className="body"
              style={{
                color: "var(--muted)",
                fontSize: 17,
                lineHeight: 1.6,
                maxWidth: "58ch",
                marginBottom: 32,
              }}
            >
              USDC and other accepted stablecoins are normalized into mUSD
              through a slippage-bounded swap. Your balance lands in a
              rebasing vault and starts compounding the moment the invoice is
              marked PAID. Withdraw whenever — receipts anchor on-chain every
              ~30 seconds for cryptographic verification.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                paddingTop: 24,
                borderTop: "1px solid var(--hairline-strong)",
                maxWidth: 540,
              }}
            >
              <Stat
                label="Settlement asset"
                value="mUSD"
                sub="on Mantle · chain 5003"
                delay={0}
              />
              <Stat
                label="Receipt anchoring"
                value="~30s"
                sub="Merkle-batched on-chain"
                delay={120}
              />
              <Stat
                label="Slippage cap"
                value="≤ 1.0%"
                sub="USDC → mUSD swaps"
                delay={240}
              />
              <Stat
                label="Withdrawal"
                value="Anytime"
                sub="self-custodial vault"
                delay={360}
              />
            </div>
          </motion.div>

          <div
            style={{
              position: "relative",
              minHeight: 460,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 220,
                height: 380,
              }}
            >
              {/* Glass cylinder */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid var(--hairline-strong)",
                  borderRadius: 16,
                  background:
                    "linear-gradient(180deg, var(--bg-3) 0%, var(--bg-2) 100%)",
                  overflow: "hidden",
                }}
              >
                {/* Liquid */}
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: fillHeight,
                    background:
                      "linear-gradient(180deg, rgba(255,85,0,0.85) 0%, rgba(255,85,0,1) 100%)",
                  }}
                />
                {/* Liquid surface highlight */}
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: fillHeight,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "rgba(255,255,255,0.5)",
                    transform: "translateY(1px)",
                  }}
                />
              </div>

              {/* Tick marks */}
              {[20, 40, 60, 80].map((p) => (
                <div
                  key={p}
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: -28,
                    bottom: `${p}%`,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--muted)",
                    letterSpacing: "0.08em",
                    transform: "translateY(50%)",
                  }}
                >
                  — {p}%
                </div>
              ))}

              {/* Yield label */}
              <motion.div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -32,
                  transform: "translateX(-50%)",
                  opacity: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--accent)",
                    textTransform: "uppercase",
                  }}
                >
                  ↑ rebase
                </div>
                <div
                  aria-hidden
                  style={{
                    width: 1,
                    height: 16,
                    background:
                      "linear-gradient(to bottom, var(--accent), transparent)",
                  }}
                />
              </motion.div>

              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: -32,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                Vault · self-custodial
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .settle-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}

const GLYPHS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_@#$%-+=*";

function ScrambleText({
  text,
  duration = 800,
  delay = 0,
}: {
  text: string;
  duration?: number;
  delay?: number;
}) {
  const [displayDynamicText, setDisplayDynamicText] = useState(text);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsIntersecting(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let isCancelled = false;
    let startTimestamp: number | null = null;

    const run = (timestamp: number) => {
      if (startTimestamp === null) {
        startTimestamp = timestamp;
      }
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      const revealCount = Math.floor(progress * text.length);

      let scrambled = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealCount) {
          scrambled += text[i];
        } else {
          if (text[i] === " ") {
            scrambled += " ";
          } else {
            scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
      }

      if (!isCancelled) {
        setDisplayDynamicText(scrambled);
        if (progress < 1) {
          requestAnimationFrame(run);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(run);
    }, delay);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [text, duration, delay, isIntersecting]);

  return <span ref={ref}>{displayDynamicText}</span>;
}

function Stat({
  label,
  value,
  sub,
  delay,
}: {
  label: string;
  value: string;
  sub: string;
  delay: number;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "var(--muted)",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        className="display tabular"
        style={{
          fontSize: 22,
          color: "var(--ink)",
          fontWeight: 400,
          letterSpacing: "0.06em",
          marginBottom: 4,
        }}
      >
        <ScrambleText text={value} delay={delay} />
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        {sub}
      </div>
    </div>
  );
}
