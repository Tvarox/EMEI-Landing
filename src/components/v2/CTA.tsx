"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion, AnimatePresence } from "framer-motion";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus("success");
        setEmail("");
        // If the server returns a specific message (like already exists), we can store it
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("Welcome to the network. You've been added to our waitlist.");
        }
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to join. Please check your connection.");
    }
  };

  return (
    <section id="cta" className="relative w-full bg-[var(--bg)] pt-16 pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[45vh] sm:min-h-[48vh] md:min-h-[50vh] transition-colors duration-200">
      {/* Subtle animating background beams */}
      <BackgroundBeams />
      
      {/* Static Content Layer */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6 py-10 sm:py-12">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[var(--ink)] mb-5 md:mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Get Early Access
        </h2>
        <p className="text-[var(--muted)] text-base md:text-xl mb-8 md:mb-10 max-w-2xl leading-relaxed">
          Join the network of forward-thinking businesses and autonomous agents building the future of programmable B2B liquidity.
        </p>
        
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} noValidate className="relative group">
            <div className="relative flex items-center p-1.5 rounded-full bg-[var(--bg-2)] backdrop-blur-xl border border-[var(--hairline)] shadow-[0_0_40px_rgba(0,0,0,0.05)] focus-within:border-[var(--muted)] transition-all duration-300">
              <input
                type="text"
                placeholder="Enter your email"
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                disabled={status === "loading" || status === "success"}
                className="flex-1 bg-transparent px-6 py-3 text-[var(--ink)] placeholder:text-[var(--muted)]/50 outline-none text-lg"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="flex items-center justify-center bg-[var(--ink)] text-[var(--bg)] p-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100"
              >
                {status === "loading" ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : status === "success" ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <ArrowRight className="w-6 h-6" />
                )}
              </button>
            </div>
          </form>
          
          {/* Subtle error message */}
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 text-red-500/80 text-sm font-light tracking-wide"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success/Error Toast notification */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-start justify-between">
              <div className="flex flex-col text-left">
                <span className={`text-sm font-semibold mb-0.5 ${status === "success" ? 'text-white' : 'text-red-400'}`}>
                  {status === "success" ? "Success" : "Error"}
                </span>
                <span className="text-white/50 text-xs">
                  {errorMessage}
                </span>
              </div>
              <button 
                onClick={() => setStatus("idle")}
                className="text-white/20 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


