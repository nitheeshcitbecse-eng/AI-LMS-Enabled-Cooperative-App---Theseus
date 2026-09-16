import React from 'react';
import { AlertTriangle, Clock, TrendingUp, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockPriorityInsights } from '../../data/mockTrainerData';

export const PrioritiesEngine: React.FC = () => {
  const { openModal, setActiveTab, setSelectedTraineeForDrawer, traineeRiskList } = useApp();

  const handleReviewHighPriority = () => {
    // Select Arun Kumar (first high risk trainee) and open drawer
    const arun = traineeRiskList.find(t => t.name.includes('Arun')) || traineeRiskList[0];
    setSelectedTraineeForDrawer(arun);
  };

  return (
    <div className="ncct-card p-5 space-y-4 border-l-4 border-l-amber-500 bg-gradient-to-br from-white via-white to-amber-50/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 shadow-2xs">
            <Zap className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Today's Training Priorities Engine</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase border border-amber-300">
                AI Priority System
              </span>
            </div>
            <p className="text-xs text-slate-500">
              AI-assisted insights based on attendance logs, assessment scores, and LMS activity patterns.
            </p>
          </div>
        </div>

        <button
          onClick={handleReviewHighPriority}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shrink-0"
        >
          <span>Review Today's Priorities</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>

      {/* Priority Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* High Priority */}
        <div className="p-4 rounded-xl bg-red-50/80 border border-red-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              High Priority
            </span>
            <span className="text-[10px] text-red-700 font-bold">7 Trainees Affected</span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-red-950 leading-tight">
              7 trainees need immediate intervention
            </h4>
            <p className="text-xs text-red-800 mt-1 leading-normal">
              <strong>Reason:</strong> Repeated low scores in Cooperative Accounting & Financial Ratios across 3 tests.
            </p>
          </div>

          <div className="pt-2 border-t border-red-200/60 flex items-center justify-between">
            <span className="text-[10px] text-red-700 font-semibold">Action: Assign 20m Booster</span>
            <button
              onClick={() => openModal('create_intervention_wizard')}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              Assign Booster
            </button>
          </div>
        </div>

        {/* Medium Priority */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-amber-500 text-indigo-950 text-[10px] font-extrabold uppercase tracking-wider">
              Medium Priority
            </span>
            <span className="text-[10px] text-amber-800 font-bold">4 Trainees Falling Behind</span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-amber-950 leading-tight">
              4 trainees show low LMS activity
            </h4>
            <p className="text-xs text-amber-900 mt-1 leading-normal">
              <strong>Reason:</strong> Incomplete PACS ERP practical modules & no LMS login for 3 days.
            </p>
          </div>

          <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
            <span className="text-[10px] text-amber-800 font-semibold">Action: Send Reminder</span>
            <button
              onClick={() => openModal('announcement_modal')}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-indigo-950 text-xs font-bold transition-colors shadow-2xs"
            >
              Send Reminder
            </button>
          </div>
        </div>

        {/* Positive Signal */}
        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              Positive Signal
            </span>
            <span className="text-[10px] text-emerald-800 font-bold">+14% Score Growth</span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-emerald-950 leading-tight">
              11 trainees improved post-intervention
            </h4>
            <p className="text-xs text-emerald-900 mt-1 leading-normal">
              <strong>Reason:</strong> Closed-loop accounting booster completed with 74%+ reassessment average.
            </p>
          </div>

          <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between">
            <span className="text-[10px] text-emerald-800 font-semibold">Action: Verify Competencies</span>
            <button
              onClick={() => setActiveTab('trainer_competency')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              Verify Badges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
