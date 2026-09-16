import React from 'react';
import { TopicHeatmapCard } from '../../components/trainer/TopicHeatmapCard';
import { FileCheck2, Plus, Sparkles, HelpCircle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrainerAssessmentsView: React.FC = () => {
  const { openModal } = useApp();

  const assessmentModules = [
    { title: 'Cooperative Societies Act 1912 & State Amendments', totalQuestions: 20, avgScore: 84, completionRate: '100%', status: 'PUBLISHED' },
    { title: 'Double-Entry Cooperative Accounting & Balance Sheet', totalQuestions: 25, avgScore: 54, completionRate: '95%', status: 'NEEDS_INTERVENTION', highlight: true },
    { title: 'NABARD Rural Credit & Refinancing Framework', totalQuestions: 15, avgScore: 78, completionRate: '98%', status: 'PUBLISHED' },
    { title: 'PACS Digital Banking & Micro-ATM Cash Handling', totalQuestions: 20, avgScore: 89, completionRate: '100%', status: 'PUBLISHED' },
    { title: 'Cooperative Audit & Statutory Compliance Report', totalQuestions: 30, avgScore: 61, completionRate: '72%', status: 'IN_PROGRESS' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">Assessments & Topic Heatmap Matrix</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
                AI Diagnostic Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Analyze cohort skill mastery, detect topic drop-offs, and trigger adaptive remedial assessments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Launching AI Quiz Builder Wizard...')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-indigo-950 hover:from-amber-400 hover:to-amber-500 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 fill-indigo-950" />
              <span>AI Quiz Generator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Topic Heatmap Matrix Component */}
      <TopicHeatmapCard />

      {/* Assessment List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active Batch Assessments & Quizzes</h3>
            <p className="text-xs text-slate-500">Track mean cohort scores and target low-scoring modules</p>
          </div>
          <button
            onClick={() => openModal('create_intervention')}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
          >
            Create Remedial Quiz <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {assessmentModules.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                item.highlight
                  ? 'bg-amber-50/40 border-amber-300/80 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  {item.highlight && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-indigo-950 text-[9px] font-extrabold">
                      CRITICAL WEAKNESS DETECTED
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  {item.totalQuestions} Questions • Submissions: {item.completionRate}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Mean Score</span>
                  <span className={`text-base font-extrabold ${item.avgScore < 60 ? 'text-red-600' : 'text-emerald-700'}`}>
                    {item.avgScore}%
                  </span>
                </div>

                <button
                  onClick={() => openModal('create_intervention')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    item.highlight
                      ? 'bg-amber-500 text-indigo-950 hover:bg-amber-400'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.highlight ? 'Trigger Remedial' : 'View Breakdown'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
