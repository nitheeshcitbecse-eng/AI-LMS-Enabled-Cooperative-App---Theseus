import React from 'react';
import { ArrowRight, Clock, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NextBestActionCard: React.FC = () => {
  const { openModal } = useApp();

  return (
    <div className="ncct-card relative overflow-hidden p-6 bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white border border-indigo-700/60 shadow-lg">
      {/* Decorative SVG Light Beam Background */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Highest Priority Action</span>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            Improve Financial Analysis Competency
          </h2>

          <p className="text-xs text-indigo-200 leading-relaxed">
            <strong className="text-amber-300">Reason:</strong> Your last 3 assessments show difficulty with financial interpretation & working capital ledger ratios.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-indigo-200 pt-1">
            <div className="flex items-center gap-1.5 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Est. Time: <strong>20 Minutes</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              <Target className="w-3.5 h-3.5 text-teal-400" />
              <span>Outcome: <strong>Target 74%+ Proficiency</strong></span>
            </div>
          </div>
        </div>

        <button
          onClick={() => openModal('booster_quiz')}
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-indigo-950 font-bold text-xs hover:from-emerald-300 hover:to-teal-300 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-[0.98] shrink-0"
        >
          <span>Start Now</span>
          <ArrowRight className="w-4 h-4 text-indigo-950" />
        </button>
      </div>
    </div>
  );
};
