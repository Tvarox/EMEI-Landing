"use client";

import { motion } from "framer-motion";
import { NoiseBackground } from "@/components/ui/noise-background";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { LiquidButton } from "@/components/ui/liquid-button";

interface InitialScreenProps {
  onStart: () => void;
}

/**
 * InitialScreen — The "decrypt" intro experience.
 * Noise background + encrypted text reveal + liquid start button.
 */
export const InitialScreen = ({ onStart }: InitialScreenProps) => (
  <motion.div
    key="initial"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{
      opacity: 0,
      scale: 0.95,
      filter: "blur(20px)",
    }}
    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    className="w-full h-screen flex items-center justify-center"
  >
    <NoiseBackground className="flex flex-col items-center justify-center gap-12 w-full h-full relative">
      {/* Ambient neural glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center gap-2 relative z-10">
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
    </NoiseBackground>
  </motion.div>
);
