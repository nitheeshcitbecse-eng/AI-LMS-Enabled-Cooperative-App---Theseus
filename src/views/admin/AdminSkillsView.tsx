import React from 'react';
import { GitFork, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

export const AdminSkillsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">System-Wide Learning Intelligence</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              Curriculum Closed-Loop
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Detect repeated skill gap patterns across multiple institutes to update national NCCT training modules.
          </p>
        </div>
      </div>

      {/* Top Repeated Skill Gaps */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Top Repeated Skill Gaps Across Network</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">1. Financial Analysis & Working Capital</h3>
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-extrabold">38% Flagged</span>
            </div>
            <p className="text-xs text-slate-600">Cross-Institute Pattern detected across 6 batches in 3 institutions.</p>
            <div className="pt-2">
              <button
                onClick={() => alert('Initiating curriculum module revision for Financial Analysis...')}
                className="px-3 py-1.5 rounded-lg bg-indigo-950 text-white font-bold text-[11px] hover:bg-indigo-900 transition-colors"
              >
                Review Curriculum Module
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">2. Digital Record Management & Micro-ATMs</h3>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-extrabold">26% Flagged</span>
            </div>
            <p className="text-xs text-slate-600">Appears across 4 batches in ICM Chennai & RICM Bengaluru.</p>
            <div className="pt-2">
              <button
                onClick={() => alert('Initiating curriculum module revision for Digital Record Management...')}
                className="px-3 py-1.5 rounded-lg bg-indigo-950 text-white font-bold text-[11px] hover:bg-indigo-900 transition-colors"
              >
                Review Curriculum Module
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
