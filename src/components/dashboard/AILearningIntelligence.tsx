import React from 'react';
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockAIRecommendation } from '../../data/mockData';

export const AILearningIntelligence: React.FC = () => {
  const { openModal, closedLoop } = useApp();

  return (
    <div className="ncct-card p-5 space-y-5 border-l-4 border-l-amber-500 bg-gradient-to-br from-white via-white to-amber-50/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 shadow-2xs">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">AI Learning Intelligence</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
                Pattern Detection
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Your learning pattern, translated into your next best action.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Learning Health: <strong>Good</strong></span>
        </div>
      </div>

      {/* Strong vs Needs Attention Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Strong Areas */}
        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Strong Competencies
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Cooperative Principles', 'Communication', 'Digital Tools'].map(item => (
              <span key={item} className="px-2 py-0.5 rounded bg-white text-emerald-900 text-xs font-semibold border border-emerald-200 shadow-2xs">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Needs Targeted Attention
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Cooperative Accounting', 'Financial Analysis'].map(item => (
              <span key={item} className="px-2 py-0.5 rounded bg-white text-amber-900 text-xs font-semibold border border-amber-200 shadow-2xs">
                ! {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Silent Weak Spot Main Interventional Alert Card */}
      <div className="p-4 rounded-xl bg-white border-2 border-amber-300/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Silent Weak Spot Identified
              </span>
              <span className="text-xs text-slate-500 font-medium">Cooperative Accounting</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Pattern: 3 assessments below benchmark threshold
            </h4>
            <p className="text-xs text-slate-600">
              Current performance level is <strong className="text-amber-700 font-bold">46%</strong> vs target benchmark of <strong className="text-emerald-700 font-bold">70%</strong>.
            </p>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => openModal('booster_quiz')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 shrink-0"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>{mockAIRecommendation.ctaText}</span>
          </button>
        </div>

        {/* Closed-Loop Learning Pipeline Visual */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Closed-Loop Learning Protocol</span>
            <span className="text-indigo-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              AI-assisted • Trainer validated
            </span>
          </div>

          {/* Flow Steps */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs pt-1">
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
              <span className="block text-[10px] text-amber-700 font-bold">1. DETECTED</span>
              <span className="font-bold text-amber-900">Score: {closedLoop.beforeScore}%</span>
            </div>
            <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200">
              <span className="block text-[10px] text-indigo-700 font-bold">2. TARGETED</span>
              <span className="font-medium text-indigo-900">15m Booster</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="block text-[10px] text-slate-500 font-bold">3. PRACTICE</span>
              <span className="font-medium text-slate-700">3 Ledger Drills</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="block text-[10px] text-slate-500 font-bold">4. REASSESS</span>
              <span className="font-medium text-slate-700">Interactive Quiz</span>
            </div>
            <div className={`p-2 rounded-lg border col-span-2 md:col-span-1 ${
              closedLoop.status === 'verified'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-slate-100 border-slate-300 text-slate-500'
            }`}>
              <span className="block text-[10px] font-bold uppercase">5. VERIFIED</span>
              <span className="font-bold text-emerald-700">
                {closedLoop.status === 'verified' ? `✓ ${closedLoop.afterScore}% Score` : 'Pending Quiz'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
