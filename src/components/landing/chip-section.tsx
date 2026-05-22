"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useReducedMotion,
} from "framer-motion";

/* ---------------------------------------------------------------
   Protocol data — kept short, deliberately no claims about
   uptime, partners, or scale.
--------------------------------------------------------------- */
type Corner = "tl" | "tr" | "br" | "bl";

interface Protocol {
  id: string;
  index: number;
  label: string;
  name: string;
  tagline: string;
  blurb: string;
  corner: Corner;
}

const PROTOCOLS: Protocol[] = [
  {
    id: "x402",
    index: 1,
    label: "// 01 · TRANSPORT",
    name: "x402",
    tagline: "HTTP-native payments",
    blurb:
      "Agents settle on a 402 challenge. No API keys to mint, no invoices to chase — payment is part of the request.",
    corner: "tr",
  },
  {
    id: "mandate",
    index: 2,
    label: "// 02 · AUTHORITY",
    name: "AP2 Mandate",
    tagline: "Scoped, signed permissions",
    blurb:
      "A mandate defines who can pay whom, for what, up to how much, for how long. Cryptographic, revocable, narrow.",
    corner: "br",
  },
  {
    id: "erc8004",
    index: 3,
    label: "// 03 · IDENTITY",
    name: "ERC-8004",
    tagline: "Verifiable agent identity",
    blurb:
      "Every agent carries an on-chain identity with a portable reputation history — readable before any value moves.",
    corner: "bl",
  },
  {
    id: "musd",
    index: 4,
    label: "// 04 · SETTLEMENT",
    name: "mUSD on Mantle",
    tagline: "Yield-bearing settlement",
    blurb:
      "Invoices settle in mUSD on Mantle. Stable for accounting, productive enough that idle balances aren't lazy.",
    corner: "tl",
  },
];

/* ---------------------------------------------------------------
   Coordinate system — single 1200x800 viewBox for threads
--------------------------------------------------------------- */
const VB_W = 1200;
const VB_H = 800;
const CENTER = { x: VB_W / 2, y: VB_H / 2 }; // 600, 400

const CORNER_POS: Record<Corner, { x: number; y: number }> = {
  tl: { x: 200, y: 180 },
  tr: { x: 1000, y: 180 },
  br: { x: 1000, y: 620 },
  bl: { x: 200, y: 620 },
};

// Cubic-bezier curves from the chip edge out to each corner anchor
function threadPath(corner: Corner): string {
  const { x, y } = CORNER_POS[corner];
  // Choose a midpoint that bows toward the center axis
  const cx1 = (CENTER.x + x) / 2;
  const cy1 = CENTER.y;
  const cx2 = x;
  const cy2 = (CENTER.y + y) / 2;
  return `M ${CENTER.x} ${CENTER.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`;
}

/* ---------------------------------------------------------------
   Card placement (Tailwind classes per corner)
--------------------------------------------------------------- */
const CARD_POS: Record<Corner, string> = {
  tl: "left-4 top-24 sm:left-8 sm:top-28 md:left-12 md:top-24",
  tr: "right-4 top-24 sm:right-8 sm:top-28 md:right-12 md:top-24",
  br: "right-4 bottom-12 sm:right-8 sm:bottom-16 md:right-12 md:bottom-20",
  bl: "left-4 bottom-12 sm:left-8 sm:bottom-16 md:left-12 md:bottom-20",
};

/* ---------------------------------------------------------------
   The Chip — a stylized SVG ASIC
--------------------------------------------------------------- */
function ChipCore({ pulse }: { pulse: MotionValue<number> }) {
  return (
    <motion.div
      className="relative"
      style={{
        // Subtle scale-pulse driven by scroll
        scale: useTransform(pulse, [0, 1], [0.96, 1.04]),
      }}
    >
      {/* Outer accent halo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-2xl blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(224,94,70,0.45), rgba(224,94,70,0) 70%)",
          opacity: useTransform(pulse, [0, 1], [0.25, 0.85]),
        }}
      />

      <svg
        width="280"
        height="280"
        viewBox="0 0 200 200"
        className="relative drop-shadow-[0_0_24px_rgba(224,94,70,0.18)]"
      >
        {/* Outer frame */}
        <rect
          x="20"
          y="20"
          width="160"
          height="160"
          rx="8"
          fill="#0e0d0a"
          stroke="rgba(224,94,70,0.55)"
          strokeWidth="0.8"
        />
        {/* Inner core */}
        <rect
          x="58"
          y="58"
          width="84"
          height="84"
          rx="3"
          fill="#161410"
          stroke="rgba(224,94,70,0.35)"
          strokeWidth="0.6"
        />

        {/* Inner trace grid */}
        <g stroke="rgba(244,243,239,0.10)" strokeWidth="0.4">
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="60"
              x2="140"
              y1={70 + i * 15}
              y2={70 + i * 15}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`v-${i}`}
              y1="60"
              y2="140"
              x1={70 + i * 15}
              x2={70 + i * 15}
            />
          ))}
        </g>

        {/* Edge pads — 4 per side */}
        {Array.from({ length: 4 }).map((_, i) => {
          const offset = 38 + i * 32;
          return (
            <g key={`pads-${i}`} fill="rgba(224,94,70,0.7)">
              {/* top */}
              <rect x={offset} y="14" width="6" height="6" rx="1" />
              {/* bottom */}
              <rect x={offset} y="180" width="6" height="6" rx="1" />
              {/* left */}
              <rect y={offset} x="14" width="6" height="6" rx="1" />
              {/* right */}
              <rect y={offset} x="180" width="6" height="6" rx="1" />
            </g>
          );
        })}

        {/* Corner registration marks */}
        {[
          [22, 22],
          [172, 22],
          [22, 172],
          [172, 172],
        ].map(([x, y], i) => (
          <g
            key={`reg-${i}`}
            stroke="rgba(244,243,239,0.55)"
            strokeWidth="0.8"
            fill="none"
          >
            <line x1={x} y1={y} x2={x + 6} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + 6} />
          </g>
        ))}

        {/* Center wordmark */}
        <text
          x="100"
          y="103"
          textAnchor="middle"
          fill="#f4f3ef"
          fontFamily="var(--font-mono)"
          fontSize="14"
          fontWeight="700"
          letterSpacing="2"
        >
          EMEI
        </text>
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fill="rgba(244,243,239,0.45)"
          fontFamily="var(--font-mono)"
          fontSize="6"
          letterSpacing="1.4"
        >
          v0 · MN5003
        </text>
      </svg>

      {/* live blinker */}
      <motion.span
        aria-hidden
        className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent"
        animate={{ opacity: [1, 0.25, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   A single thread (path) + travelling pulse, scroll-driven
--------------------------------------------------------------- */
function Thread({
  corner,
  progress, // 0..1 within this thread's slot
  active,
}: {
  corner: Corner;
  progress: MotionValue<number>;
  active: MotionValue<number>;
}) {
  const d = threadPath(corner);

  // pathLength (0..1) follows progress
  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  // Travelling pulse: position along path animates while active
  return (
    <g>
      {/* dim base trace */}
      <path
        d={d}
        stroke="rgba(244,243,239,0.06)"
        strokeWidth="1"
        fill="none"
      />
      {/* lit trace */}
      <motion.path
        d={d}
        stroke="url(#thread-grad)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        style={{ pathLength, opacity: active }}
      />
      {/* terminal node at the corner */}
      <motion.circle
        cx={CORNER_POS[corner].x}
        cy={CORNER_POS[corner].y}
        r="5"
        fill="#e05e46"
        style={{ opacity: active }}
      />
      <motion.circle
        cx={CORNER_POS[corner].x}
        cy={CORNER_POS[corner].y}
        r="10"
        fill="none"
        stroke="rgba(224,94,70,0.5)"
        strokeWidth="0.6"
        style={{ opacity: active }}
      />
    </g>
  );
}

/* ---------------------------------------------------------------
   Card — slides + fades in when its thread is active
--------------------------------------------------------------- */
function ProtocolCard({
  protocol,
  reveal, // 0..1
}: {
  protocol: Protocol;
  reveal: MotionValue<number>;
}) {
  const opacity = useTransform(reveal, [0, 0.5, 1], [0, 0.6, 1]);
  const y = useTransform(reveal, [0, 1], [16, 0]);

  return (
    <motion.div
      className={`absolute z-20 ${CARD_POS[protocol.corner]} w-[260px] sm:w-[300px] md:w-[320px] pointer-events-auto`}
      style={{ opacity, y }}
    >
      <div className="relative rounded-xl border border-[rgba(244,243,239,0.10)] bg-[rgba(22,20,16,0.72)] backdrop-blur-md p-4 sm:p-5 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        {/* corner ticks */}
        <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-accent/60" />
        <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-accent/60" />
        <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-accent/60" />
        <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-accent/60" />

        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-inverse-muted">
            {protocol.label}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
        </div>

        <h3 className="font-display text-[28px] sm:text-[32px] leading-none text-on-inverse">
          {protocol.name}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {protocol.tagline}
        </p>
        <p className="mt-3 text-[13.5px] leading-[1.55] text-on-inverse/75">
          {protocol.blurb}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   Mobile / reduced-motion fallback — vertical timeline
--------------------------------------------------------------- */
function StaticFallback() {
  return (
    <div className="relative bg-inverse text-on-inverse py-24 sm:py-32 px-5">
      <div className="max-w-[640px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-inverse-muted mb-3">
          {"// The chip"}
        </p>
        <h2 className="font-display text-[clamp(36px,7vw,56px)] leading-[0.95] tracking-[-0.01em]">
          One core. <span className="text-accent">Four protocols.</span>
        </h2>
        <p className="mt-4 text-[15px] text-on-inverse/70 leading-[1.55]">
          EMEI is a single facilitator threading four open standards into one
          payment rail for autonomous agents.
        </p>

        <ol className="mt-12 flex flex-col gap-6 relative">
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-[rgba(244,243,239,0.14)]"
          />
          {PROTOCOLS.map((p) => (
            <li key={p.id} className="relative pl-8">
              <span className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(224,94,70,0.18)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-inverse-muted">
                {p.label}
              </span>
              <h3 className="font-display text-[26px] leading-none mt-1">
                {p.name}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {p.tagline}
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-on-inverse/75">
                {p.blurb}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Main scroll-driven section
--------------------------------------------------------------- */
export const ChipSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Chip pulse — gentle, the entire section through
  const chipPulse = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0.7]);

  // Each protocol gets a slice of progress: 0.10–0.30, 0.30–0.50, 0.50–0.70, 0.70–0.90
  // We compute a sub-progress 0..1 for each thread (path draw)
  // and a sub-reveal 0..1 for each card (slightly delayed)
  const t1Path = useTransform(scrollYProgress, [0.10, 0.28], [0, 1]);
  const t2Path = useTransform(scrollYProgress, [0.30, 0.48], [0, 1]);
  const t3Path = useTransform(scrollYProgress, [0.50, 0.68], [0, 1]);
  const t4Path = useTransform(scrollYProgress, [0.70, 0.88], [0, 1]);

  const t1Active = useTransform(scrollYProgress, [0.08, 0.12], [0, 1]);
  const t2Active = useTransform(scrollYProgress, [0.28, 0.32], [0, 1]);
  const t3Active = useTransform(scrollYProgress, [0.48, 0.52], [0, 1]);
  const t4Active = useTransform(scrollYProgress, [0.68, 0.72], [0, 1]);

  const t1Card = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);
  const t2Card = useTransform(scrollYProgress, [0.38, 0.50], [0, 1]);
  const t3Card = useTransform(scrollYProgress, [0.58, 0.70], [0, 1]);
  const t4Card = useTransform(scrollYProgress, [0.78, 0.90], [0, 1]);

  // Headline crossfade — "One core" intro fades out, "All four threaded" fades in
  const introOpacity = useTransform(scrollYProgress, [0.02, 0.10, 0.85, 0.92], [0, 1, 1, 0]);
  const outroOpacity = useTransform(scrollYProgress, [0.88, 0.95], [0, 1]);

  // Step counter (1..4) for the bottom HUD
  const stepIdx = useTransform(scrollYProgress, (v): number => {
    if (v < 0.10) return 0;
    if (v < 0.30) return 1;
    if (v < 0.50) return 2;
    if (v < 0.70) return 3;
    return 4;
  });

  // Hoisted: HUD step-counter fade-in + bottom scroll-cue fade-out
  // (must be declared before the conditional return for hooks-rules)
  const stepCounterOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const scrollCueOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.92, 1],
    [1, 1, 1, 0],
  );

  // Reduced motion — render static, accessible version
  if (reduced) {
    return (
      <section id="protocol" className="bg-inverse">
        <StaticFallback />
      </section>
    );
  }

  const threads: Array<[Protocol, MotionValue<number>, MotionValue<number>, MotionValue<number>]> = [
    [PROTOCOLS[0], t1Path, t1Active, t1Card],
    [PROTOCOLS[1], t2Path, t2Active, t2Card],
    [PROTOCOLS[2], t3Path, t3Active, t3Card],
    [PROTOCOLS[3], t4Path, t4Active, t4Card],
  ];

  return (
    <>
      {/* Mobile fallback — readable vertical timeline */}
      <section id="protocol" className="lg:hidden bg-inverse">
        <StaticFallback />
      </section>

      {/* Desktop scroll-driven cinematic */}
      <section
        ref={sectionRef}
        id="protocol-desktop"
        className="hidden lg:block relative bg-inverse text-on-inverse"
        style={{ height: "500vh" }}
        aria-label="EMEI protocol architecture"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* --- Ambient backdrop --- */}
          {/* faint grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(244,243,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244,243,239,0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)",
            }}
          />
          {/* center spotlight */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(224,94,70,0.10) 0%, rgba(0,0,0,0) 70%)",
            }}
          />

          {/* --- Top HUD --- */}
          <div className="absolute top-24 left-0 right-0 px-6 z-30">
            <div className="max-w-[1100px] mx-auto flex items-center justify-between">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-on-inverse-muted">
                {"// The chip"}
              </span>
              <motion.span
                className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-on-inverse-muted tabular"
                style={{ opacity: stepCounterOpacity }}
              >
                <StepCounter step={stepIdx} /> / 04
              </motion.span>
            </div>
          </div>

          {/* --- Intro / outro headline overlays --- */}
          <motion.div
            style={{ opacity: introOpacity }}
            className="absolute inset-x-0 top-1/2 -translate-y-[210px] z-30 px-6 pointer-events-none"
          >
            <div className="max-w-[720px] mx-auto text-center">
              <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[0.95] tracking-[-0.01em]">
                One core. <span className="text-accent">Four protocols.</span>
              </h2>
              <p className="mt-3 text-[14px] text-on-inverse/65 max-w-[420px] mx-auto">
                Scroll. Each thread fires a piece of the rail.
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: outroOpacity }}
            className="absolute inset-x-0 top-1/2 -translate-y-[210px] z-30 px-6 pointer-events-none"
          >
            <div className="max-w-[720px] mx-auto text-center">
              <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[0.95] tracking-[-0.01em]">
                Four open standards.{" "}
                <span className="text-accent">One rail.</span>
              </h2>
              <p className="mt-3 text-[14px] text-on-inverse/65 max-w-[420px] mx-auto">
                EMEI is the facilitator that ties them together.
              </p>
            </div>
          </motion.div>

          {/* --- SVG threads (sized to viewport) --- */}
          <svg
            className="absolute inset-0 w-full h-full z-10"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="thread-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#e05e46" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e05e46" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            {threads.map(([p, path, active]) => (
              <Thread
                key={p.id}
                corner={p.corner}
                progress={path}
                active={active}
              />
            ))}
          </svg>

          {/* --- Center chip --- */}
          <div className="absolute inset-0 grid place-items-center z-20 pointer-events-none">
            <ChipCore pulse={chipPulse} />
          </div>

          {/* --- Cards --- */}
          {threads.map(([p, , , reveal]) => (
            <ProtocolCard key={p.id} protocol={p} reveal={reveal} />
          ))}

          {/* --- Bottom HUD: scroll cue --- */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-2"
            style={{ opacity: scrollCueOpacity }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-inverse-muted">
              scroll · trace
            </span>
            <motion.span
              className="block w-px h-8 bg-[rgba(244,243,239,0.35)]"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              style={{ transformOrigin: "top" }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

/* Tiny helper to render a motion-value-driven step counter.
   Avoids re-rendering parent by reading the value via an effect. */
function StepCounter({ step }: { step: MotionValue<number> }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => step.on("change", (latest) => setV(latest)), [step]);
  return <>{String(v).padStart(2, "0")}</>;
}
