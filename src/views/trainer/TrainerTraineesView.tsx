import React from 'react';
import { TraineeAttentionTable } from '../../components/trainer/TraineeAttentionTable';
import { TraineeDetailDrawer } from '../../components/trainer/TraineeDetailDrawer';
import { Users, UserCheck, Sparkles, Filter, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrainerTraineesView: React.FC = () => {
  const { traineeRiskList } = useApp();

  const totalCount = traineeRiskList.length;
  const highRiskCount = traineeRiskList.filter(t => t.riskLevel === 'HIGH').length;
  const medRiskCount = traineeRiskList.filter(t => t.riskLevel === 'MEDIUM').length;
  const onTrackCount = traineeRiskList.filter(t => t.riskLevel === 'LOW').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Trainees Roster & Individual Profiles</h1>
            <p className="text-xs text-slate-500 mt-1">
              Batch <span className="font-mono font-bold text-indigo-950">CMDO-2026-B04</span> — Interactive AI learning risk analytics and profile drawer.
            </p>
          </div>
          <button
            onClick={() => alert('Exporting full batch roster to CSV...')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 w-max"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Roster (CSV)</span>
          </button>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Trainees</span>
              <span className="text-base font-extrabold text-slate-900">{totalCount}</span>
            </div>
          </div>

          <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-800 flex items-center justify-center font-bold">
              {highRiskCount}
            </div>
            <div>
              <span className="text-[10px] text-red-600 font-semibold uppercase block">High Risk</span>
              <span className="text-xs font-bold text-red-900">Requires Intervention</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              {medRiskCount}
            </div>
            <div>
              <span className="text-[10px] text-amber-600 font-semibold uppercase block">Medium Risk</span>
              <span className="text-xs font-bold text-amber-900">Monitor Progress</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              {onTrackCount}
            </div>
            <div>
              <span className="text-[10px] text-emerald-600 font-semibold uppercase block">On Track</span>
              <span className="text-xs font-bold text-emerald-900">High Performers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trainee Risk Table */}
      <TraineeAttentionTable />

      {/* Trainee Detail Drawer */}
      <TraineeDetailDrawer />
    </div>
  );
};
