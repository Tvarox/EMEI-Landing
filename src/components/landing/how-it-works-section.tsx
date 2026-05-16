"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Upload Invoice",
    description: "Submit your verified invoice. Our system extracts data automatically using high-fidelity OCR."
  },
  {
    number: "02",
    title: "AI Verification",
    description: "EMEI's AI analyzes credit risk, customer history, and market data in under 60 seconds."
  },
  {
    number: "03",
    title: "Instant Advance",
    description: "Receive up to 90% of the invoice value immediately in your digital wallet or bank account."
  },
  {
    number: "04",
    title: "Auto Settlement",
    description: "Your customer pays on their normal terms. EMEI closes the transaction and settles with investors."
  }
];

export const HowItWorksSection = () => (
  <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10 border-t border-slate-900">
    <div className="mb-20">
      <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6 text-center">How EMEI Works</h2>
      <p className="text-slate-400 text-center max-w-2xl mx-auto font-light">
        A seamless bridge between work completed and capital received. No paperwork, no waiting, just liquid assets.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
      {/* Connecting line for desktop */}
      <div className="hidden lg:block absolute top-6 left-[12.5%] w-[75%] h-[1px] bg-slate-800 -z-10">
        {/* Pulsating Light Effect */}
        <motion.div
          animate={{
            left: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 -translate-y-1/2 w-20 h-[2px] bg-linear-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_10px_rgba(245,158,11,0.5)]"
        />
      </div>
      
      {STEPS.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative group"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:border-blue-500/50 transition-colors bg-black">
              <span className="text-blue-400 font-mono text-sm">{step.number}</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-3 tracking-tight">{step.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light px-2">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);
