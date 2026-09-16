import React from 'react';
import { Brain, UserCheck, ShieldCheck, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';

export const HumanAIBanner: React.FC = () => {
  return (
    <div className="ncct-card p-5 bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 text-white space-y-4 shadow-lg border border-indigo-800/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-indigo-950 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 fill-indigo-950" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Human + AI Collaborative Learning Loop</h3>
            <p className="text-xs text-indigo-200">AI supports decisions. Trainers remain in complete control.</p>
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Core Innovation Architecture
        </span>
      </div>

      {/* Workflow Steps Horizontal Flow */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-lg bg-indigo-900/60 border border-indigo-800/80 space-y-1">
          <span className="text-[9px] text-amber-300 font-extrabold block uppercase">1. AI PATTERN</span>
          <span className="text-white font-bold block text-[11px]">Detect Drop</span>
        </div>

        <div className="p-2.5 rounded-lg bg-indigo-900/60 border border-indigo-800/80 space-y-1">
          <span className="text-[9px] text-amber-300 font-extrabold block uppercase">2. AI REC</span>
          <span className="text-white font-bold block text-[11px]">Suggest Booster</span>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/80 space-y-1 ring-1 ring-emerald-400/40">
          <span className="text-[9px] text-emerald-300 font-extrabold block uppercase">3. TRAINER</span>
          <span className="text-white font-bold block text-[11px]">Validate Gap</span>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/80 space-y-1 ring-1 ring-emerald-400/40">
          <span className="text-[9px] text-emerald-300 font-extrabold block uppercase">4. TRAINER</span>
          <span className="text-white font-bold block text-[11px]">Assign / Teach</span>
        </div>

        <div className="p-2.5 rounded-lg bg-indigo-900/60 border border-indigo-800/80 space-y-1">
          <span className="text-[9px] text-teal-300 font-extrabold block uppercase">5. SYSTEM</span>
          <span className="text-white font-bold block text-[11px]">Measure Impact</span>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/80 space-y-1">
          <span className="text-[9px] text-emerald-300 font-extrabold block uppercase">6. TRAINER</span>
          <span className="text-white font-bold block text-[11px]">Confirm Competency</span>
        </div>
      </div>
    </div>
  );
};
