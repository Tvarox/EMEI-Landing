"use client";

import { motion } from "framer-motion";

/* ─── Stakeholder data (Mockup spec-compliant, fully centered, 1x4 row) ─── */
const STAKEHOLDERS = [
  {
    title: "Businesses",
    description:
      "Get paid faster. Stop waiting 90 days for capital. Access working capital the moment your invoice is verified.",
  },
  {
    title: "Customers",
    description:
      "Keep your normal payment terms. Your payment timeline doesn't change. EMEI absorbs the wait while you stay liquid.",
  },
  {
    title: "Investors",
    description:
      "Earn real yield by funding verified invoices. Returns are backed by real-world receivables and AI-driven risk models.",
  },
  {
    title: "EMEI Network",
    description:
      "Sustainable revenue through origination and platform fees. A transparent, high-margin ecosystem for modern finance.",
  },
] as const;

/* ─── Workflow Wavy Timeline Data (Alternating layout coordinates) ─── */
const WORKFLOW_STEPS = [
  {
    number: "1",
    title: "Work Completed & Invoices Sent",
    description:
      "Business finishes project. Issues invoices to customers. Payments take 30-90 days which causes cash flow problem.",
    position: "below",
    left: "10%",
  },
  {
    number: "2",
    title: "Upload & EMEI Digital Evaluation",
    description:
      "Invoices are verified. Using AI financial data is analysed for fraud, risk and validity and also calculation of risk score.",
    position: "above",
    left: "30%",
  },
  {
    number: "3",
    title: "Instant Funding Advanced",
    description:
      "Approved funds are advanced instantly via stable-coin. Business continues operating without wait time.",
    position: "below",
    left: "50%",
  },
  {
    number: "4",
    title: "Customer Repayment & Settlement",
    description:
      "Customer pays full invoice amount to EMEI. EMEI keeps a financing fee and distributes returns.",
    position: "above",
    left: "70%",
  },
  {
    number: "5",
    title: "Improved Reputation & Credit History",
    description:
      "EMEI maintains a digital trust score. Results in development of futuristic network of companies and AI agents.",
    position: "below",
    left: "90%",
  },
] as const;

export const WhoBenefitsSection = () => {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 lg:pl-[30px] lg:pr-[56px] lg:pt-[40px] lg:pb-[60px] z-10">
      


      {/* 2. Left-Aligned Title Block (Exact Underline & Margins) */}
      <div className="mb-16 max-w-[1380px] mx-auto px-[10px] lg:px-[30px]">
        <h2 className="text-4xl md:text-[44px] font-serif font-light text-white leading-tight">
          Who Benefits?
        </h2>
        {/* Figma Spec Underline */}
        <div className="w-[280px] h-[1px] bg-slate-300/30 mt-3 mb-6" />
        <p className="text-[16px] md:text-[18px] text-slate-400 font-light leading-relaxed max-w-2xl">
          EMEI creates a four-way value exchange that solves cash flow for businesses while providing yield for investors.
        </p>
      </div>

      {/* 3. Re-structured Stakeholder Cards (1x4 horizontal grid row, fully centered text) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1380px] mx-auto mb-28 px-[10px] lg:px-[30px]">
        {STAKEHOLDERS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="flex flex-col items-center justify-center p-4 rounded-[18px] border border-white/5 shadow-2xl text-center backdrop-blur-md min-h-[130px]"
            style={{
              background: "rgba(20, 28, 42, 0.45)",
            }}
          >
            <h3 className="text-[18px] font-serif font-bold text-white tracking-tight mb-3">
              {card.title}
            </h3>
            <p className="text-[13.5px] text-slate-400 font-light leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 4. Wavy Horizontal Timeline Diagram (Swipeable scrollable overflow container on mobile) */}
      <div className="w-full max-w-[1380px] mx-auto overflow-x-auto pb-10 px-[10px] lg:px-[30px] scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
        <div className="relative w-full min-w-[1100px] h-[440px] overflow-visible">
          
          {/* Continuous Bezier Wave & Gaps Intersection Dots Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" viewBox="0 0 1000 440" preserveAspectRatio="none">
            {/* The Wavy Glowing Ribbon */}
            <path
              d="M 0 220 C 50 90, 150 90, 200 220 C 250 350, 350 350, 400 220 C 450 90, 550 90, 600 220 C 650 350, 750 350, 800 220 C 850 90, 950 90, 1000 220"
              fill="none"
              stroke="url(#wave-gold-gradient)"
              strokeWidth="2.5"
              className="opacity-90"
            />
            {/* Soft outer aura for wave glow */}
            <path
              d="M 0 220 C 50 90, 150 90, 200 220 C 250 350, 350 350, 400 220 C 450 90, 550 90, 600 220 C 650 350, 750 350, 800 220 C 850 90, 950 90, 1000 220"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="6"
              className="opacity-[0.06] blur-sm"
            />
            
            <defs>
              <linearGradient id="wave-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
                <stop offset="20%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Glowing Golden dots exactly on the wave crossings */}
            <circle cx="200" cy="220" r="4.5" fill="#f59e0b" />
            <circle cx="200" cy="220" r="9" fill="#f59e0b" fillOpacity="0.15" />
            
            <circle cx="400" cy="220" r="4.5" fill="#f59e0b" />
            <circle cx="400" cy="220" r="9" fill="#f59e0b" fillOpacity="0.15" />
            
            <circle cx="600" cy="220" r="4.5" fill="#f59e0b" />
            <circle cx="600" cy="220" r="9" fill="#f59e0b" fillOpacity="0.15" />
            
            <circle cx="800" cy="220" r="4.5" fill="#f59e0b" />
            <circle cx="800" cy="220" r="9" fill="#f59e0b" fillOpacity="0.15" />
          </svg>

          {/* HTML Circle Nodes and Alternating Text Descriptions */}
          {WORKFLOW_STEPS.map((step, index) => (
            <div key={step.number} className="absolute inset-0 pointer-events-none">
              
              {/* Wavy Circle Badge (Double-border system) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.7 }}
                className="absolute top-[220px] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-auto"
                style={{ left: step.left }}
              >
                {/* Glowing Golden/Orange Outer Accent Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[172px] h-[172px] rounded-full border border-amber-500/25 opacity-70 animate-pulse" style={{ animationDuration: '4s', animationDelay: `${index * 0.5}s` }} />
                {/* Frosted Lens Circle Node */}
                <div
                  className="w-[150px] h-[150px] rounded-full flex items-center justify-center p-5 text-center backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.2)] border border-white/15"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 30, 48, 0.92) 0%, rgba(12, 18, 30, 0.92) 100%)",
                  }}
                >
                  <span className="font-serif font-bold text-white text-[13.5px] md:text-[14.5px] leading-snug">
                    {step.title}
                  </span>
                </div>
              </motion.div>

              {/* Dynamic Fading Text Description Block (Alternating top/bottom) */}
              <motion.div
                initial={{ opacity: 0, y: step.position === "above" ? -10 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + 0.2, duration: 0.6 }}
                className="absolute -translate-x-1/2 w-[210px] text-center pointer-events-auto"
                style={{
                  left: step.left,
                  top: step.position === "above" ? "auto" : "316px",
                  bottom: step.position === "above" ? "316px" : "auto",
                }}
              >
                <p className="text-[12.5px] md:text-[13.5px] text-slate-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

            </div>
          ))}

        </div>
      </div>

    </section>
  );
};
