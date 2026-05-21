"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "1",
    title: "Upload Invoices",
    description: "Submit you verified invoices. Our system extracts data automatically using high- fidelity OCR."
  },
  {
    number: "2",
    title: "AI Verification",
    description: "EMEI's AI analyzes credit risk, customer history, and market data in under 60 seconds."
  },
  {
    number: "3",
    title: "Instant Advance",
    description: "Receive up to 90% of the invoice value immediately in your digital wallet or bank account."
  },
  {
    number: "4",
    title: "Auto Settlement",
    description: "Your customer pays on their normal terms. EMEI closes the transaction and settles with investors."
  }
];

const PrevIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const NextIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export const HowItWorksSection = () => {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 lg:pl-[30px] lg:pr-[56px] lg:pt-[128px] lg:pb-[54px] z-10 border-t border-slate-900/60">
      <div className="flex flex-col lg:flex-row items-start justify-between w-full">
        
        {/* Left Column: Glassmorphic Slider Card (690x640px, rounded-none) */}
        <div className="w-full lg:w-[690px] shrink-0">
          <div 
            className="relative w-full min-h-[450px] lg:h-[640px] rounded-none border border-slate-800/80 backdrop-blur-md p-8 lg:p-[30px] lg:pb-[120px] flex flex-col justify-end overflow-hidden shadow-2xl group select-none"
            style={{
              background: "rgba(71, 71, 71, 0.3)", // #474747 with 30% opacity
            }}
          >
            {/* Ambient Background Grid Pattern Inside the Card */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent -z-0 pointer-events-none" />
 
            {/* Navigation Arrows (30px from left/right) */}
            <button aria-label="Previous slide" className="absolute left-[30px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-slate-800 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer z-10">
              <PrevIcon />
            </button>
            <button aria-label="Next slide" className="absolute right-[30px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-slate-800 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer z-10">
              <NextIcon />
            </button>
 
            {/* Text Content (30px from left) */}
            <div className="relative z-10 space-y-4 px-[10px] lg:px-0">
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
                How EMEI Works
              </h2>
              <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-md">
                A Seamless Bridge Between work completed and capital received. No paperwork, no waiting, just liquid assets
              </p>
            </div>
 
            {/* Pagination Dots (58px from bottom) */}
            <div className="flex justify-center gap-2.5 absolute bottom-[58px] left-1/2 -translate-x-1/2 z-10">
              <div className="w-2 h-2 rounded-full bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors" />
              <div className="w-2 h-2 rounded-full bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors" />
              <div className="w-2 h-2 rounded-full bg-white scale-125 cursor-pointer shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
              <div className="w-2 h-2 rounded-full bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors" />
              <div className="w-2 h-2 rounded-full bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors" />
            </div>
          </div>
        </div>
 
        {/* Right Column: Vertical Timeline Steps (531x601px, slightly offset downward, 133px gap) */}
        <div className="w-full lg:w-[531px] lg:h-[601px] lg:mt-[20px] shrink-0 relative">
          <div className="space-y-6 lg:space-y-0 lg:h-full lg:flex lg:flex-col lg:justify-between relative">
            {/* Symmetrical Vertical Connector Line (terminates safely inside circle 4, preventing bottom protrusion) */}
            <div className="absolute left-[20px] lg:left-[24px] top-[28px] lg:top-[32px] bottom-[72px] lg:bottom-[82px] w-[1.5px] bg-slate-800 pointer-events-none -z-10" />
 
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 md:gap-8 items-start relative z-10 py-2"
              >
                {/* Steps Circle Marker (Frosted Glassmorphic Lens) */}
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-sans text-sm md:text-base shrink-0 select-none shadow-[0_4px_30px_rgba(0,0,0,0.15)] backdrop-blur-lg z-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                  }}
                >
                  {step.number}
                </div>
 
                {/* Steps Details */}
                <div className="space-y-3 pt-0.5 md:pt-1">
                  <h3 className="text-[24px] font-serif text-white font-bold leading-tight tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[16px] text-slate-400 font-light leading-relaxed max-w-lg pl-2">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
