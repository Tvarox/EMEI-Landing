import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ChipSection } from "@/components/landing/chip-section";
import { BuildSection } from "@/components/landing/build-section";
import { PageFooter } from "@/components/layout/page-footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative w-full bg-canvas text-ink overflow-x-hidden font-sans">
        {/* 01 — Hero: one line, honest dev status */}
        <HeroSection />

        {/* 02 — The chip: scroll-driven reveal of x402, AP2 mandate, ERC-8004, mUSD */}
        <ChipSection />

        {/* 03 — Build: GitBook, GitHub, email */}
        <BuildSection />
      </main>

      {/* 04 — Footer */}
      <PageFooter />
    </>
  );
}
