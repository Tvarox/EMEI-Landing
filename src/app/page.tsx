import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustStrip } from "@/components/landing/trust-strip";
import { WedgeSection } from "@/components/landing/wedge-section";
import { LifecycleSection } from "@/components/landing/lifecycle-section";
import { MandateExplainer } from "@/components/landing/mandate-explainer";
import { CorridorSection } from "@/components/landing/corridor-section";
import { ReputationSection } from "@/components/landing/reputation-section";
import { SettlementSection } from "@/components/landing/settlement-section";
import { ReceiptSection } from "@/components/landing/receipt-section";
import { FacilitatorConsole } from "@/components/landing/facilitator-console";
import { DeveloperSection } from "@/components/landing/developer-section";
import { TrustGrid } from "@/components/landing/trust-grid";
import { FinalCTA } from "@/components/landing/final-cta";
import { PageFooter } from "@/components/layout/page-footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative w-full bg-canvas text-ink overflow-x-hidden font-sans">
        {/* 01. Hero */}
        <HeroSection />

        {/* 02. Trust strip — chains · assets · audit · pay-link */}
        <TrustStrip />

        {/* 03. The Wedge — live Mandate card */}
        <WedgeSection />

        {/* 04. Invoice lifecycle state machine */}
        <LifecycleSection />

        {/* 05. Mandate explainer — 4 scope axes */}
        <MandateExplainer />

        {/* 06. Cross-chain corridor */}
        <CorridorSection />

        {/* 07. Reputation gate (Bay8004) */}
        <ReputationSection />

        {/* 08. Settlement engine + yield vault */}
        <SettlementSection />

        {/* 09. Receipt anchoring (Merkle) */}
        <ReceiptSection />

        {/* 10. Live facilitator console */}
        <FacilitatorConsole />

        {/* 11. Developer experience — CLI · API · SDK */}
        <DeveloperSection />

        {/* 12. Enterprise trust grid + verified contracts */}
        <TrustGrid />

        {/* 13. Final CTA / command center */}
        <FinalCTA />
      </main>

      {/* 14. Footer */}
      <PageFooter />
    </>
  );
}
