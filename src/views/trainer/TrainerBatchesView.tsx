import React from 'react';
import { Users, Calendar, Award, BookOpen, ChevronRight, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { mockTrainer } from '../../data/mockTrainerData';
import { useApp } from '../../context/AppContext';

export const TrainerBatchesView: React.FC = () => {
  const { setActiveTab } = useApp();

  const activeBatches = [
    {
      id: 'CMDO-2026-B04',
      name: 'Cooperative Management & Digital Operations (B04)',
      institution: 'ICM Chennai (Subordinate Institute)',
      traineeCount: 42,
      startDate: '10 Jan 2026',
      endDate: '28 Feb 2026',
      progressPercent: 78,
      status: 'ACTIVE',
      avgScore: 82,
      atRiskCount: 3,
      currentModule: 'Module 4: Cooperative Law & Audit',
    },
    {
      id: 'FMC-2026-B01',
      name: 'Financial Management for Agricultural Cooperatives',
      institution: 'ICM Madurai',
      traineeCount: 35,
      startDate: '01 Mar 2026',
      endDate: '15 Apr 2026',
      progressPercent: 12,
      status: 'UPCOMING',
      avgScore: 0,
      atRiskCount: 0,
      currentModule: 'Orientation & Introduction',
    },
    {
      id: 'PACS-2025-B12',
      name: 'PACS Computerisation & Statutory Compliance',
      institution: 'RICM Bengaluru',
      traineeCount: 50,
      startDate: '01 Nov 2025',
      endDate: '20 Dec 2025',
      progressPercent: 100,
      status: 'COMPLETED',
      avgScore: 89,
      atRiskCount: 0,
      currentModule: 'Completed — Certificates Issued',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">My Batches & Training Cohorts</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              Dr. Priya Raman
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Overview of active, upcoming, and completed cooperative training programmes assigned to you across NCCT institutes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('trainer_overview')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Back to Overview
          </button>
        </div>
      </div>

      {/* Batch Cards */}
      <div className="grid grid-cols-1 gap-5">
        {activeBatches.map(batch => (
          <div key={batch.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 hover:border-indigo-300 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-white font-mono text-[10px] font-bold">
                    {batch.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    batch.status === 'ACTIVE'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : batch.status === 'UPCOMING'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{batch.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <span>{batch.institution}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {batch.startDate} – {batch.endDate}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('trainer_trainees')}
                  className="px-4 py-2 rounded-xl bg-indigo-950 text-white text-xs font-bold hover:bg-indigo-900 transition-colors flex items-center gap-1.5"
                >
                  <span>View Roster</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress & Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium block">Trainees Enrolled</span>
                <span className="text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600" /> {batch.traineeCount}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium block">Course Progress</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-indigo-600 h-full rounded-full" style={{ width: `${batch.progressPercent}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{batch.progressPercent}%</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium block">Batch Score Avg</span>
                <span className="text-lg font-extrabold text-emerald-700 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" /> {batch.avgScore > 0 ? `${batch.avgScore}%` : 'N/A'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium block">At-Risk Trainees</span>
                <span className={`text-lg font-extrabold flex items-center gap-1.5 ${batch.atRiskCount > 0 ? 'text-red-600' : 'text-slate-700'}`}>
                  {batch.atRiskCount > 0 ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {batch.atRiskCount} Trainees
                </span>
              </div>
            </div>

            <div className="text-xs text-indigo-900 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 flex items-center justify-between">
              <span className="font-semibold">Current Active Module: {batch.currentModule}</span>
              <button
                onClick={() => setActiveTab('trainer_assessments')}
                className="text-[11px] font-bold text-indigo-700 hover:underline flex items-center gap-1"
              >
                Go to Topic Assessments <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
