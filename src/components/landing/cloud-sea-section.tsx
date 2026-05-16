"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  NetworkIcon,
  BoxIcon,
  LayersIcon,
  ActivityIcon,
} from "@/components/icons";

/* ─── Stakeholder data ─── */
const STAKEHOLDERS = [
  {
    title: "Businesses",
    description:
      "Get paid faster. Stop waiting 90 days for capital. Access working capital the moment your invoice is verified.",
    icon: <ActivityIcon />,
  },
  {
    title: "Customers",
    description:
      "Keep your normal payment terms. Your payment timeline doesn't change. EMEI absorbs the wait while you stay liquid.",
    icon: <BoxIcon />,
  },
  {
    title: "Investors",
    description:
      "Earn real yield by funding verified invoices. Returns are backed by real-world receivables and AI-driven risk models.",
    icon: <LayersIcon />,
  },
  {
    title: "EMEI Network",
    description:
      "Sustainable revenue through origination and platform fees. A transparent, high-margin ecosystem for modern finance.",
    icon: <NetworkIcon />,
  },
] as const;

/**
 * WhoBenefitsSection — 2x2 grid showing stakeholder value.
 */
export const WhoBenefitsSection = () => (
  <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10">
    <div className="mb-20 text-center">
      <div className="inline-block px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-medium tracking-widest uppercase mb-4">
        Ecosystem
      </div>
      <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
        Who Benefits?
      </h2>
      <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
        EMEI creates a four-way value exchange that solves cash flow for businesses while providing yield for investors.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {STAKEHOLDERS.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <FeatureCard {...item} />
        </motion.div>
      ))}
    </div>
  </section>
);
