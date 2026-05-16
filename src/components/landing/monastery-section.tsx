"use client";

/* ─── Vision Timeline Data ─── */
const EVOLUTION = [
  { phase: "Today", goal: "Invoice Financing", status: "CURRENT" },
  { phase: "Tomorrow", goal: "Credit Infrastructure", status: "NEXT" },
  { phase: "Long Term", goal: "Financial OS for AI Agents", status: "FUTURE" },
];

/* ─── Agent Flow Visual ─── */
const AgentFlowVisual = () => (
  <div className="relative aspect-square flex items-center justify-center">
    <div className="absolute inset-0 border border-slate-800 rounded-3xl bg-slate-950/50 backdrop-blur-xl flex items-center justify-center p-8 overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="relative w-full max-w-[320px] space-y-4 z-10">
        {/* Step 1: Agent */}
        <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-tighter">AI_AGENT_01</span>
          </div>
          <p className="text-xs text-white mt-2">Task Complete: $5,000 Project</p>
        </div>
        
        {/* Arrow Down */}
        <div className="flex justify-center py-1">
          <div className="w-[1px] h-8 bg-linear-to-b from-blue-500/50 to-amber-500/50" />
        </div>
        
        {/* Step 2: EMEI */}
        <div className="p-4 rounded-xl border border-amber-500/50 bg-amber-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.1)]">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-[0.2em]">EMEI_PROTOCOL</span>
            <span className="text-[10px] text-blue-400 font-mono">FINANCED</span>
          </div>
          <p className="text-xs text-white mt-2">Advance Sent: $4,500 (STABLECOIN)</p>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center py-1">
          <div className="w-[1px] h-8 bg-linear-to-b from-amber-500/50 to-blue-500/50" />
        </div>
        
        {/* Step 3: Action */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
          <p className="text-xs text-slate-400 font-light">Agent pays for GPU compute & builds credit reputation autonomously.</p>
        </div>
      </div>
    </div>
  </div>
);

/**
 * VisionSection — Highlights EMEI as the future financial OS for AI agents.
 */
export const VisionSection = () => (
  <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10">
    <div className="rounded-[3rem] border border-slate-800 bg-slate-900/30 p-8 md:p-16 backdrop-blur-sm overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        {/* Copy */}
        <div className="flex flex-col justify-center">
          <div className="inline-block px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px] font-medium tracking-widest uppercase mb-6 w-fit">
            The Vision
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">Autonomous Finance</h2>
          <p className="text-slate-400 mb-8 font-light leading-relaxed text-lg">
            As AI agents become economic actors, they need a financial system built for speed and autonomy. 
            EMEI provides the liquidity and credit infrastructure for the agents of tomorrow.
          </p>

          <div className="space-y-6">
            {EVOLUTION.map((item) => (
              <div key={item.phase} className="flex items-center gap-6">
                <div className={`text-[10px] font-mono uppercase tracking-widest w-24 ${item.status === 'CURRENT' ? 'text-blue-400' : 'text-slate-600'}`}>
                  {item.phase}
                </div>
                <div className={`h-[1px] flex-1 ${item.status === 'CURRENT' ? 'bg-blue-500/30' : 'bg-slate-800'}`} />
                <div className={`text-sm font-light ${item.status === 'CURRENT' ? 'text-white' : 'text-slate-500'}`}>
                  {item.goal}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <AgentFlowVisual />
      </div>
    </div>
  </section>
);
