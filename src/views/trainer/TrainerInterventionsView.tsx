import React from 'react';
import { InterventionImpactCard } from '../../components/trainer/InterventionImpactCard';
import { SilentWeakSpotCard } from '../../components/trainer/SilentWeakSpotCard';
import { Zap, Plus, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrainerInterventionsView: React.FC = () => {
  const { openModal, interventions } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">Intervention Center (Closed-Loop AI Loop)</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                Action → Outcome Ledger
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              "AI detects the gap → Trainer issues targeted intervention → Trainee completes action → System measures efficacy."
            </p>
          </div>

          <button
            onClick={() => openModal('create_intervention')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-950 to-indigo-900 text-white font-bold text-xs hover:from-indigo-900 hover:to-indigo-850 shadow-md transition-all flex items-center gap-2 w-max"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Launch Intervention Wizard</span>
          </button>
        </div>
      </div>

      {/* 2-column stats & impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SilentWeakSpotCard />
        <InterventionImpactCard />
      </div>

      {/* Interventions History & Active Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active & Historical Interventions Log</h3>
            <p className="text-xs text-slate-500">Track all interventions dispatched by Dr. Priya Raman and measured efficacy</p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100">
            {interventions.length} Total Executed
          </span>
        </div>

        <div className="space-y-3">
          {interventions.map(item => {
            const displayAfter = item.afterScore ?? 74;
            const diff = displayAfter - item.beforeScore;

            return (
              <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-white font-mono text-[10px] font-bold">
                      {item.id}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{item.topic} Remedial Intervention</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> Assigned: {item.createdDate}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium">Target Topic: <span className="text-slate-900 font-bold">{item.topic}</span></p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200/60">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Target Cohort</span>
                    <span className="text-xs font-bold text-slate-900">{item.affectedTraineesCount} Trainees</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Pre vs Post Score</span>
                    <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1">
                      {item.beforeScore}% <ArrowRight className="w-3 h-3 text-slate-400" /> {displayAfter}% (+{diff}%)
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Trainer Message</span>
                    <span className="text-xs font-medium text-indigo-700 truncate block">{item.trainerMessage}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
