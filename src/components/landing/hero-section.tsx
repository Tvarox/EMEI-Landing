"use client";

import { motion } from "framer-motion";

/**
 * HeroSection — The grand EMEI reveal with scroll indicator.
 *
 * Replaces the animated blur-[120px] blob with a CSS radial gradient
 * that breathes via opacity/scale — no blur computation needed.
 */
export const HeroSection = () => (
  <div className="relative flex flex-col items-center justify-center min-h-screen w-full">
    {/* Breathing ambient glow — radial gradient, no blur */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.35, scale: 1.1 }}
      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      className="absolute w-[500px] h-[500px] rounded-full -z-10"
      style={{
        background:
          "radial-gradient(circle, rgba(59, 130, 246, 0.14) 0%, rgba(59, 130, 246, 0.04) 45%, transparent 70%)",
      }}
    />

    {/* EMEI Title */}
    <div className="relative group z-10">
      <motion.h1
        initial={{ letterSpacing: "2em", opacity: 0, filter: "blur(40px)" }}
        animate={{ letterSpacing: "0.15em", opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="text-8xl md:text-[14rem] font-serif font-bold text-white tracking-[0.15em] select-none"
      >
        EMEI
      </motion.h1>

      {/* Gold underline reveal */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
        className="absolute -bottom-4 left-0 h-[1px] bg-linear-to-r from-transparent via-amber-500/60 to-transparent"
      />
    </div>

    {/* Status badge - Tagline */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="mt-12 text-blue-400 font-medium text-xs md:text-sm tracking-[0.2em] uppercase z-10 text-center max-w-2xl px-6"
    >
      Turn unpaid invoices into instant cash — powered by AI and blockchain.
    </motion.div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 1 }}
      className="absolute bottom-12 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-widest uppercase"
    >
      <span>See how it works</span>
      <div className="w-[1px] h-12 bg-linear-to-b from-slate-500 to-transparent" />
    </motion.div>
  </div>
);
