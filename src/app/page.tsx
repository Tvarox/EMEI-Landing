"use client";

import { useEffect, useState } from "react";
import BootSequence from "@/components/brutalist/BootSequence";
import BracketFrame from "@/components/brutalist/BracketFrame";
import Chrome from "@/components/brutalist/Chrome";
import Closing from "@/components/brutalist/Closing";
import CustomCursor from "@/components/brutalist/CustomCursor";
import DotGrid from "@/components/brutalist/DotGrid";
import Hero from "@/components/brutalist/Hero";
import Manifesto from "@/components/brutalist/Manifesto";
import Primitives from "@/components/brutalist/Primitives";
import Settlement from "@/components/brutalist/Settlement";

export default function Page() {
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-act]"),
    );
    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number(visible[0].target.getAttribute("data-act") ?? 0);
          setPageIndex(idx);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
      },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ position: "relative", zIndex: 2 }}>
      <DotGrid />
      <BracketFrame />
      <Chrome pageIndex={pageIndex} />
      <CustomCursor />
      <BootSequence />

      <Hero />
      <Manifesto />
      <Primitives />
      <Settlement />
      <Closing />
    </main>
  );
}
