import React from 'react';
import { CheckCircle2, TrendingUp, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InterventionImpactCard: React.FC = () => {
  const { demoMode } = useApp();

  const beforeScore = 46;
  const afterScore = 74;
  const improvement = afterScore - beforeScore;

  return (
    <div className="ncct-card p-5 space-y-4 border-l-4 border-l-emerald-600 bg-gradient-to-br from-white via-white to-emerald-50/20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Closed-Loop Intervention Impact</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-300">
              ✓ Measured Results
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Detect → Target → Intervene → Reassess → Verify
          </p>
        </div>

        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Trainer Validated
        </span>
      </div>

      {/* BEFORE -> INTERVENTION -> AFTER Flow Diagram */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between font-extrabold text-xs text-slate-900 border-b border-slate-200 pb-2">
          <span>Topic: Cooperative Accounting & Working Capital Ratios</span>
          <span className="text-emerald-700">7 Trainees Group</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          {/* BEFORE */}
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-1">
            <span className="text-[10px] font-extrabold text-red-700 uppercase tracking-wider block">1. BEFORE</span>
            <span className="text-2xl font-extrabold text-red-950 block">{beforeScore}%</span>
            <span className="text-[10px] text-red-700 font-semibold block">Weak Spot Detected</span>
          </div>

          {/* INTERVENTION */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
            <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">2. INTERVENTION</span>
            <span className="text-xs font-bold text-amber-950 block pt-1">20m Booster + Revision</span>
            <span className="text-[10px] text-amber-800 font-semibold block">Assigned by Dr. Priya</span>
          </div>

          {/* AFTER */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1 shadow-2xs">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">3. AFTER</span>
            <span className="text-2xl font-extrabold text-emerald-700 block">
              {demoMode === 'after' ? `${afterScore}%` : '74% (Verified)'}
            </span>
            <span className="text-[10px] text-emerald-800 font-bold block">
              +28 Points Growth!
            </span>
          </div>
        </div>

        {/* Detailed Impact Breakdown */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-slate-200">
          <div>
            <span className="text-[10px] text-slate-500 font-bold block">Intervention Completed</span>
            <span className="font-extrabold text-slate-900">6 / 7 Trainees</span>
          </div>
          <div className="border-x border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block">Verified Improvement</span>
            <span className="font-extrabold text-emerald-700">5 / 7 Reached 70%+</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold block">Needs Further Support</span>
            <span className="font-extrabold text-amber-700">2 Trainees</span>
          </div>
        </div>
      </div>
    </div>
  );
};
