"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATUSES = ["ISSUED", "PRESENTED", "PAID"] as const;

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.4 });

  const tx1 = useTransform(sx, (v) => `${v * 6}px`);
  const ty1 = useTransform(sy, (v) => `${v * 6}px`);
  const tx2 = useTransform(sx, (v) => `${v * 12}px`);
  const ty2 = useTransform(sy, (v) => `${v * 12}px`);
  const tx3 = useTransform(sx, (v) => `${v * 18}px`);
  const ty3 = useTransform(sy, (v) => `${v * 18}px`);
  const txGlow = useTransform(sx, (v) => `${v * 30}px`);
  const tyGlow = useTransform(sy, (v) => `${v * 30}px`);

  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setStatusIdx((n) => (n + 1) % STATUSES.length),
      2400,
    );
    return () => window.clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) / rect.width);
    my.set((e.clientY - cy) / rect.height);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const status = STATUSES[statusIdx];

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1.05",
        maxWidth: 520,
        marginInline: "auto",
      }}
      aria-hidden
    >
      {/* Soft accent glow */}
      <motion.div
        style={{
          position: "absolute",
          width: "70%",
          height: "70%",
          left: "15%",
          top: "10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,85,0,0.18) 0%, transparent 60%)",
          filter: "blur(40px)",
          x: txGlow,
          y: tyGlow,
        }}
      />

      {/* Background grid layer */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(15,15,15,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,15,15,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
          x: tx1,
          y: ty1,
        }}
      />

      {/* Back card (peeking) */}
      <motion.div
        style={{
          position: "absolute",
          left: "8%",
          top: "12%",
          width: "60%",
          aspectRatio: "1.4 / 1",
          background: "#ffffff",
          border: "1px solid var(--hairline)",
          borderRadius: 6,
          boxShadow:
            "0 1px 0 rgba(15,15,15,0.04), 0 12px 32px -12px rgba(15,15,15,0.18)",
          x: tx1,
          y: ty1,
          rotate: -4,
        }}
      >
        <div
          style={{
            padding: 18,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.16em",
              color: "var(--muted-2)",
              textTransform: "uppercase",
            }}
          >
            INV · 0x4a2f
          </div>
          <div
            style={{
              height: 8,
              width: "60%",
              background: "var(--bg-3)",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              height: 8,
              width: "80%",
              background: "var(--bg-3)",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              height: 8,
              width: "40%",
              background: "var(--bg-3)",
              borderRadius: 2,
            }}
          />
        </div>
      </motion.div>

      {/* Front card */}
      <motion.div
        className="max-sm:!w-[88%] max-sm:!right-[2%] max-sm:!aspect-auto max-sm:!pb-4"
        style={{
          position: "absolute",
          right: "6%",
          top: "20%",
          width: "72%",
          aspectRatio: "1.18 / 1",
          background: "#ffffff",
          border: "1px solid var(--hairline-strong)",
          borderRadius: 8,
          boxShadow:
            "0 1px 0 rgba(15,15,15,0.04), 0 22px 56px -16px rgba(15,15,15,0.18)",
          x: tx2,
          y: ty2,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              className="lg:!text-[12px]"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.16em",
                color: "var(--muted-2)",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              INVOICE · 0xB8E1
            </div>
            <div
              className="lg:!text-[28px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              250.00 <span style={{ color: "var(--muted-2)" }}>mUSD</span>
            </div>
          </div>
          <StatusChip status={status} />
        </div>

        <div
          className="max-sm:!gap-x-2 lg:!text-[14px]"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            columnGap: 14,
            rowGap: 8,
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            color: "var(--muted)",
          }}
        >
          <span>From</span>
          <span style={{ color: "var(--ink)" }}>0x742d…bEb0</span>
          <span>To</span>
          <span style={{ color: "var(--ink)" }}>0xa14F…7e92</span>
          <span>Terms</span>
          <span style={{ color: "var(--ink)" }}>Net 7 days</span>
          <span>Mandate</span>
          <span style={{ color: "var(--ink)" }}>Auto-collect</span>
        </div>

        <div
          className="max-sm:flex-col max-sm:items-start max-sm:gap-1 lg:!text-[12px]"
          style={{
            marginTop: "auto",
            paddingTop: 12,
            borderTop: "1px solid var(--hairline)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "var(--muted-2)",
            textTransform: "uppercase",
          }}
        >
          <span>Mantle · chain 5003</span>
          <span>Anchored · 30s</span>
        </div>
      </motion.div>

      {/* Floating chip (top right corner) */}
      <motion.div
        style={{
          position: "absolute",
          right: "2%",
          top: "6%",
          x: tx3,
          y: ty3,
          background: "var(--ink)",
          color: "var(--bg)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.16em",
          padding: "6px 10px",
          borderRadius: 4,
          textTransform: "uppercase",
        }}
      >
        Live · Testnet
      </motion.div>

    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const isPaid = status === "PAID";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 9px",
        borderRadius: 999,
        background: isPaid ? "var(--accent)" : "var(--bg-2)",
        color: isPaid ? "#ffffff" : "var(--ink)",
        border: isPaid
          ? "1px solid var(--accent)"
          : "1px solid var(--hairline-strong)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontWeight: 500,
        transition:
          "background var(--dur-260) var(--ease-out-quart), color var(--dur-260) var(--ease-out-quart), border-color var(--dur-260) var(--ease-out-quart)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: isPaid ? "#ffffff" : "var(--ink)",
        }}
      />
      {status}
    </div>
  );
}
