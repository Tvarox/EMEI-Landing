"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NoiseBackground } from "@/components/ui/noise-background";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { AgentButton } from "@/components/ui/agent-button";

// A High-Density Feature Card component
const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-blue-500/50">
    <div className="mb-4 text-blue-400">{icon}</div>
    <h3 className="mb-2 text-sm font-semibold tracking-tight text-white">{title}</h3>
    <p className="text-xs leading-relaxed text-slate-400">{description}</p>
    {/* Subtle decorative accent */}
    <div className="absolute -right-2 -bottom-2 h-12 w-12 rounded-full bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500" />
  </div>
);

// Basic SVG Icons (Thin-line, architectural)
const Icons = {
  Terminal: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>,
  Layers: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>,
  Zap: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  Box: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  Activity: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Network: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><rect x="9" y="2" width="6" height="6" rx="1"></rect><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path><path d="M12 12V8"></path></svg>
};

export default function Home() {
  const [isTransitioned, setIsTransitioned] = useState(false);

  const handleTransition = () => {
    setIsTransitioned(true);
  };

  return (
    <main className={`relative min-h-screen w-full transition-colors duration-1000 ${isTransitioned ? 'bg-slate-950 overflow-x-hidden' : 'bg-black overflow-hidden'}`}>
      <AnimatePresence mode="wait">
        {!isTransitioned ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.95,
              filter: "blur(20px)"
            }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="w-full h-screen flex items-center justify-center"
          >
            {/* Restore the original cinematic Noise Background */}
            <NoiseBackground className="flex flex-col items-center justify-center gap-12 w-full h-full">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-emerald-500/40 text-[10px] font-medium tracking-[0.4em] uppercase"
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
              >
                <AgentButton onClick={handleTransition}>
                  START
                </AgentButton>
              </motion.div>
            </NoiseBackground>
          </motion.div>
        ) : (
          <motion.div
            key="emei"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
            className="flex flex-col w-full text-slate-50 relative z-10"
          >
            {/* Ambient background glow for the whole page */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full" />
              <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full" />
              
              {/* Subtle vertical lines mimicking mountain steps */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
            </div>

            {/* The Reveal Section (Hero part 1) */}
            <div className="relative flex flex-col items-center justify-center min-h-screen w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1.2 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -z-10"
              />
              
              <div className="relative group z-10">
                <motion.h1 
                  initial={{ letterSpacing: "2em", opacity: 0, filter: "blur(40px)" }}
                  animate={{ letterSpacing: "0.15em", opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-8xl md:text-[14rem] font-serif font-bold text-white tracking-[0.15em] select-none"
                >
                  EMEI
                </motion.h1>
                
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
                  className="absolute -bottom-4 left-0 h-[1px] bg-linear-to-r from-transparent via-amber-500/60 to-transparent"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="mt-12 text-blue-400 font-medium text-[10px] tracking-[0.6em] uppercase z-10"
              >
                Ascension Complete
              </motion.div>
              
              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-widest uppercase"
              >
                <span>Descend into the Cloud Sea</span>
                <div className="w-[1px] h-12 bg-linear-to-b from-slate-500 to-transparent" />
              </motion.div>
            </div>

            {/* The Ascent: Split Grid Hero */}
            <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-8">
                  <h2 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight tracking-tight">
                    Elevate your workflow to the <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500 font-medium">Golden Summit</span>.
                  </h2>
                  <p className="text-lg text-slate-400 max-w-xl font-light leading-relaxed">
                    A high-density ecosystem designed for clarity, elevation, and stability. 
                    Navigate complex architectures with the serenity of a sacred monastery.
                  </p>
                </div>
                
                <div className="lg:col-span-5">
                  <div className="relative group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
                    
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/50 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-medium tracking-widest text-slate-300 uppercase">System Status</span>
                      </div>
                      <span className="text-xs text-blue-400 font-mono">v2.0.4 - STABLE</span>
                    </div>
                    
                    <div className="space-y-6 relative z-10">
                      {[
                        { label: "Active Nodes", val: "1,204", metric: "+12%" },
                        { label: "Throughput", val: "45.2 GB/s", metric: "Optimal" },
                        { label: "Latency", val: "12ms", metric: "-2ms" }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                            <p className="text-2xl font-light text-white">{stat.val}</p>
                          </div>
                          <span className="text-xs text-blue-400 font-mono">{stat.metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The Cloud Sea: Feature Grid */}
            <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10">
              <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">The Cloud Sea</h2>
                <p className="text-slate-400 text-sm tracking-wide uppercase">High-density component architecture</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <FeatureCard 
                  title="Cognitive Routing" 
                  description="Intelligent pathfinding through neural architectures, minimizing latency and optimizing resource allocation across the grid."
                  icon={Icons.Network}
                />
                <FeatureCard 
                  title="Stateful Isolation" 
                  description="Complete containerized separation for active tasks, ensuring pristine execution environments free from state-bleed."
                  icon={Icons.Box}
                />
                <FeatureCard 
                  title="Temporal Caching" 
                  description="Predictive memory layers that surface relevant context before it's requested, operating purely on interaction history."
                  icon={Icons.Layers}
                />
                <FeatureCard 
                  title="Quantum Telemetry" 
                  description="Zero-overhead observability injected directly into the runtime, providing sub-millisecond insight into complex workflows."
                  icon={Icons.Activity}
                />
                <FeatureCard 
                  title="Ephemeral Persistence" 
                  description="Short-lived data structures that securely evaporate post-execution, leaving no digital footprint."
                  icon={Icons.Zap}
                />
                <FeatureCard 
                  title="Semantic Interfaces" 
                  description="Command line and GUI bridges built on natural language understanding, bridging the gap between thought and execution."
                  icon={Icons.Terminal}
                />
              </div>
            </section>

            {/* The Monastery: Integration Section */}
            <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 md:p-16 backdrop-blur-sm overflow-hidden relative">
                {/* Decorative background for the monastery */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="monastery-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#monastery-grid)" />
                  </svg>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-serif font-light text-white mb-6">The Monastery</h2>
                    <p className="text-slate-400 mb-8 font-light leading-relaxed">
                      Connect your existing stack to EMEI's serene architecture. 
                      Data flows seamlessly through a stateful graph, ensuring every node remains synchronized and elevated.
                    </p>
                    
                    <ul className="space-y-4 text-sm text-slate-300 font-light">
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Next.js App Router Native
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Prisma ORM Synchronization
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        LangGraph Logic Gates
                      </li>
                    </ul>
                  </div>
                  
                  {/* Stateful Graph Visual */}
                  <div className="relative aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 border border-slate-800 rounded-2xl bg-slate-950/50 backdrop-blur flex items-center justify-center p-8 overflow-hidden">
                      <div className="relative w-full max-w-[400px] aspect-square">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Lines */}
                          <path d="M200 100 L200 200" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                          <path d="M110 270 L200 200" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                          <path d="M290 270 L200 200" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

                          {/* Animated pulses */}
                          <circle cx="200" cy="150" r="3" fill="#3b82f6" className="animate-pulse" style={{ animationDuration: '3s' }} />
                          <circle cx="155" cy="235" r="3" fill="#f59e0b" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                          <circle cx="245" cy="235" r="3" fill="#3b82f6" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '2s' }} />

                          {/* Central Node: EMEI */}
                          <rect x="160" y="160" width="80" height="80" rx="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                          <text x="200" y="205" fill="#f59e0b" fontSize="16" fontWeight="bold" fontFamily="serif" letterSpacing="4" textAnchor="middle">EMEI</text>

                          {/* Orbital Nodes */}
                          <rect x="160" y="60" width="80" height="40" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                          <text x="200" y="85" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">Next.js</text>

                          <rect x="70" y="270" width="80" height="40" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                          <text x="110" y="295" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">LangGraph</text>

                          <rect x="250" y="270" width="80" height="40" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                          <text x="290" y="295" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">Prisma</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Footer */}
            <footer className="w-full py-8 text-center border-t border-slate-900 z-10 mt-20">
              <p className="text-xs text-slate-600 font-mono">&copy; 2026 EMEI SYSTEM. ALL RIGHTS RESERVED.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-overlay bg-zinc-100" />
    </main>
  );
}

