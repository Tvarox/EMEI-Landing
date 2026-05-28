"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import CTA from "@/components/v2/CTA";
import Footer from "@/components/v2/Footer";
import Header from "@/components/v2/Header";
import Hero from "@/components/v2/Hero";
import HowItWorks from "@/components/v2/HowItWorks";
import Primitives from "@/components/v2/Primitives";
import Settlement from "@/components/v2/Settlement";
import WhyEmei from "@/components/v2/WhyEmei";

export default function Home() {
  const settlementRef = useRef<HTMLDivElement | null>(null);

  // Track scroll of Section 4 (Settlement).
  // With 20vh gap, when top of Section 4 is at 95% of viewport height,
  // Section 3's bottom line is exactly at 95% - 20% = 75% of viewport height (crossing 75% of the screen).
  // The transition completes exactly when the top of Section 4 reaches the center of the screen (50%).
  const { scrollYProgress: settlementEntryProgress } = useScroll({
    target: settlementRef,
    offset: ["start 95%", "start center"],
  });

  // Map scroll progress to all core theme variables over the full [0, 1] range
  const bg = useTransform(settlementEntryProgress, [0, 1], ["#faf9f6", "#0f0f0f"]);
  const bg2 = useTransform(settlementEntryProgress, [0, 1], ["#f4f2ec", "#121212"]);
  const bg3 = useTransform(settlementEntryProgress, [0, 1], ["#ecebe4", "#181818"]);
  const bgCard = useTransform(settlementEntryProgress, [0, 1], ["#ffffff", "#141414"]);
  const ink = useTransform(settlementEntryProgress, [0, 1], ["#0f0f0f", "#faf9f6"]);
  const muted = useTransform(settlementEntryProgress, [0, 1], ["#6b6b6b", "#a5a5a2"]);

  const hairline = useTransform(
    settlementEntryProgress,
    [0, 1],
    ["rgba(15, 15, 15, 0.08)", "rgba(255, 255, 255, 0.08)"]
  );

  const hairlineStrong = useTransform(
    settlementEntryProgress,
    [0, 1],
    ["rgba(15, 15, 15, 0.16)", "rgba(255, 255, 255, 0.16)"]
  );

  // Dynamically apply variables to the document element (html/body)
  useEffect(() => {
    // Immediate style application to prevent flash on reload
    const applyStyles = (vBg: string, vBg2: string, vBg3: string, vBgCard: string, vInk: string, vMuted: string, vHairline: string, vHairlineStrong: string) => {
      document.documentElement.style.setProperty("--bg", vBg);
      document.documentElement.style.setProperty("--bg-2", vBg2);
      document.documentElement.style.setProperty("--bg-3", vBg3);
      document.documentElement.style.setProperty("--bg-card", vBgCard);
      document.documentElement.style.setProperty("--ink", vInk);
      document.documentElement.style.setProperty("--muted", vMuted);
      document.documentElement.style.setProperty("--hairline", vHairline);
      document.documentElement.style.setProperty("--hairline-strong", vHairlineStrong);
    };

    // Use get() to read initial values from motion variables
    applyStyles(
      bg.get(),
      bg2.get(),
      bg3.get(),
      bgCard.get(),
      ink.get(),
      muted.get(),
      hairline.get(),
      hairlineStrong.get()
    );

    const unsubBg = bg.on("change", (v) => {
      document.documentElement.style.setProperty("--bg", v);
    });
    const unsubBg2 = bg2.on("change", (v) => {
      document.documentElement.style.setProperty("--bg-2", v);
    });
    const unsubBg3 = bg3.on("change", (v) => {
      document.documentElement.style.setProperty("--bg-3", v);
    });
    const unsubBgCard = bgCard.on("change", (v) => {
      document.documentElement.style.setProperty("--bg-card", v);
    });
    const unsubInk = ink.on("change", (v) => {
      document.documentElement.style.setProperty("--ink", v);
    });
    const unsubMuted = muted.on("change", (v) => {
      document.documentElement.style.setProperty("--muted", v);
    });
    const unsubHairline = hairline.on("change", (v) => {
      document.documentElement.style.setProperty("--hairline", v);
    });
    const unsubHairlineStrong = hairlineStrong.on("change", (v) => {
      document.documentElement.style.setProperty("--hairline-strong", v);
    });

    return () => {
      unsubBg();
      unsubBg2();
      unsubBg3();
      unsubBgCard();
      unsubInk();
      unsubMuted();
      unsubHairline();
      unsubHairlineStrong();

      // IMPORTANT: DO NOT remove properties on cleanup to prevent flash of white
      // when React unmounts/remounts during hot reloads or fast navigation.
    };
  }, [bg, bg2, bg3, bgCard, ink, muted, hairline, hairlineStrong]);

  return (
    <div style={{ backgroundColor: "var(--bg)", transition: "background-color 0.2s ease" }}>
      <Header />
      <main style={{ transition: "color 0.2s ease" }}>
        <Hero />
        <WhyEmei />
        <Primitives />
        <HowItWorks />
        <div className="transition-spacer" />
        <Settlement sectionRef={settlementRef} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
