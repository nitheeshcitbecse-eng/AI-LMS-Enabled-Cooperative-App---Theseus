import React from 'react';
import { Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AssessmentsView: React.FC = () => {
  const { assessments, openModal } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Assessments & Evaluation Ledger</h1>
          <p className="text-xs text-slate-500">Continuous digital evaluation logs for NCCT certification</p>
        </div>

        <button
          onClick={() => openModal('booster_quiz')}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Take AI Booster Assessment</span>
        </button>
      </div>

      <div className="ncct-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Completed Assessments ({assessments.length})</h3>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Average Score: 64%
          </span>
        </div>

        <div className="space-y-3">
          {assessments.map(item => {
            const isPassed = item.score >= item.targetScore;
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isPassed ? 'Passed' : 'Needs Booster'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span>Subject: <strong>{item.subject}</strong></span>
                    <span>Date: <strong>{item.date}</strong></span>
                    <span>Attempts: <strong>{item.attempts}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className={`text-lg font-extrabold block ${isPassed ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {item.score}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Target: {item.targetScore}%</span>
                  </div>

                  {!isPassed && (
                    <button
                      onClick={() => openModal('booster_quiz')}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-colors shadow-2xs"
                    >
                      Retake Booster
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
