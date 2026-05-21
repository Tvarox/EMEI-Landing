"use client";

import { motion } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { LiquidButton } from "@/components/ui/liquid-button";

interface InitialScreenProps {
  onStart: () => void;
}

/**
 * InitialScreen — The "decrypt" intro experience.
 * MeshGradient animated shader background + encrypted text reveal + liquid start button.
 */
export const InitialScreen = ({ onStart }: InitialScreenProps) => (
  <motion.div
    key="initial"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{
      opacity: 0,
      scale: 0.98,
    }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-black"
  >
    {/* Animated MeshGradient background */}
    <MeshGradient
      className="absolute inset-0 w-full h-full"
      colors={["#000000", "#0a0a0f", "#111122", "#1a1a2e"]}
      speed={0.4}
    />

    {/* Subtle lighting overlays — depth & atmosphere */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-900/8 rounded-full blur-2xl animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-slate-800/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: "8s", animationDelay: "0.5s" }} />
    </div>

    {/* Content — unchanged */}
    <div className="relative z-10 flex flex-col items-center justify-center gap-12 w-full h-full">
      <div className="flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-blue-500/40 text-[10px] font-medium tracking-[0.4em] uppercase"
        >
          Neural Interface Active
        </motion.div>
        <EncryptedText
          text="DECRYPT_LINK_01"
          revealText="Welcome to EMEI"
          className="text-4xl md:text-6xl tracking-tight text-white font-bold"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-20"
      >
        <LiquidButton
          onClick={() => {
            console.log("Transitioning...");
            onStart();
          }}
          size="lg"
          className="w-64"
        >
          START_INTERFACE
        </LiquidButton>
      </motion.div>
    </div>
  </motion.div>
);
