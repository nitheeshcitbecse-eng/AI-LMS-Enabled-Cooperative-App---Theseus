import React from 'react';
import { Target, TrendingUp, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
import { mockCareerReadiness } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const CareerReadinessCard: React.FC = () => {
  const { openModal } = useApp();

  const breakdownItems = [
    { label: 'Verified Skills', score: mockCareerReadiness.breakdown.verifiedSkills, color: 'bg-emerald-500' },
    { label: 'Learning Progress', score: mockCareerReadiness.breakdown.learningProgress, color: 'bg-teal-500' },
    { label: 'Assessment Score', score: mockCareerReadiness.breakdown.assessmentScore, color: 'bg-indigo-600' },
    { label: 'Credentials', score: mockCareerReadiness.breakdown.credentials, color: 'bg-purple-600' },
    { label: 'Practical Experience', score: mockCareerReadiness.breakdown.experience, color: 'bg-amber-500' },
  ];

  return (
    <div className="ncct-card p-5 space-y-4 border-l-4 border-l-teal-600">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Career Readiness Score</h3>
          <p className="text-xs text-slate-500">Placement probability index</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>76 / 100 Index</span>
        </span>
      </div>

      {/* Main Score & Recommendation */}
      <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-900 to-teal-700 text-white flex flex-col items-center justify-center shrink-0 shadow-md shadow-indigo-950/20">
          <span className="text-2xl font-extrabold leading-none">{mockCareerReadiness.overallScore}</span>
          <span className="text-[9px] uppercase tracking-widest text-teal-200 font-bold">Score</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md inline-block">
            ✓ You're on track for placement
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {mockCareerReadiness.improvementTip}
          </p>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">Readiness Components</span>
        {breakdownItems.map(item => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-medium text-slate-700">
              <span>{item.label}</span>
              <span className="font-bold text-slate-900">{item.score}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Booster CTA */}
      <button
        onClick={() => openModal('booster_quiz')}
        className="w-full py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs border border-indigo-200 flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>Boost Readiness to 84+ (Take Booster)</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
