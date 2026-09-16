import React from 'react';
import { Activity, ShieldCheck, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { mockBatchHealth } from '../../data/mockTrainerData';

export const BatchHealthCard: React.FC = () => {
  const breakdownMetrics = [
    { label: 'Attendance', score: mockBatchHealth.breakdown.attendance, color: 'bg-emerald-500' },
    { label: 'Learning Activity', score: mockBatchHealth.breakdown.learningActivity, color: 'bg-teal-500' },
    { label: 'Assessment Avg', score: mockBatchHealth.breakdown.assessment, color: 'bg-indigo-600' },
    { label: 'Skill Progress', score: mockBatchHealth.breakdown.skillProgress, color: 'bg-amber-500' },
    { label: 'Engagement', score: mockBatchHealth.breakdown.engagement, color: 'bg-purple-600' },
  ];

  return (
    <div className="ncct-card p-5 space-y-4 border-l-4 border-l-teal-600">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Batch Learning Health Index</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-extrabold">
              82 / 100 Index
            </span>
          </div>
          <p className="text-xs text-slate-500">AI-assisted batch health indicator across 42 trainees</p>
        </div>

        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
          <Activity className="w-5 h-5" />
        </div>
      </div>

      {/* Main Score & Status Box */}
      <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-200"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-teal-600 transition-all duration-1000 ease-out"
              strokeDasharray="82, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-extrabold text-slate-900 leading-none">82</span>
            <span className="text-[9px] text-slate-500 uppercase font-bold">Health</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold">
            ✓ {mockBatchHealth.statusText}
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Primary Improvement Focus:</strong> {mockBatchHealth.primaryImprovementArea}
          </p>
        </div>
      </div>

      {/* Metric Breakdown Bars */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">Health Component Metrics</span>
        {breakdownMetrics.map(item => (
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
    </div>
  );
};
