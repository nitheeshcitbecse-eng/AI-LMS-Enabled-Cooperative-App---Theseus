import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Search, Filter, ChevronRight, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { TraineeRiskItem } from '../../types';

export const TraineeAttentionTable: React.FC = () => {
  const { traineeRiskList, setSelectedTraineeForDrawer, demoMode } = useApp();
  const [searchFilter, setSearchFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');

  const filteredList = traineeRiskList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchFilter.toLowerCase()) || item.digitalId.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || item.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Trainees Needing Attention</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-extrabold border border-red-200">
              Risk-Ranked Roster
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Click any trainee row to open their deep learning drawer & assign interventions.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="Search name or ID..."
              className="w-full pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(risk => (
              <button
                key={risk}
                onClick={() => setRiskFilter(risk)}
                className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase transition-all ${
                  riskFilter === risk ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <th className="py-2.5 px-3">Trainee</th>
              <th className="py-2.5 px-3">Attendance</th>
              <th className="py-2.5 px-3">Assessment Avg</th>
              <th className="py-2.5 px-3">Primary Skill Gap</th>
              <th className="py-2.5 px-3">Risk Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredList.map(trainee => {
              const displayScore = (demoMode === 'after' && trainee.name === 'Arun Kumar') ? 74 : trainee.assessmentScore;
              const displayRisk = (demoMode === 'after' && trainee.name === 'Arun Kumar') ? 'LOW' : trainee.riskLevel;

              return (
                <tr
                  key={trainee.id}
                  onClick={() => setSelectedTraineeForDrawer(trainee)}
                  className="hover:bg-indigo-50/40 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={trainee.avatarUrl}
                        alt={trainee.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block group-hover:text-indigo-900">
                          {trainee.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{trainee.digitalId}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-semibold text-slate-700">
                    {trainee.attendance}%
                  </td>

                  <td className="py-3 px-3">
                    <span className={`font-extrabold ${
                      displayScore < 60 ? 'text-red-600' : displayScore < 70 ? 'text-amber-600' : 'text-emerald-700'
                    }`}>
                      {displayScore}%
                    </span>
                  </td>

                  <td className="py-3 px-3 text-slate-600 font-medium">
                    {trainee.skillGapTopic}
                  </td>

                  <td className="py-3 px-3">
                    {displayRisk === 'HIGH' ? (
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-extrabold flex items-center gap-1 w-max border border-red-200">
                        <AlertCircle className="w-3 h-3 text-red-600" /> HIGH RISK
                      </span>
                    ) : displayRisk === 'MEDIUM' ? (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-extrabold flex items-center gap-1 w-max border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> MEDIUM RISK
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1 w-max border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ON TRACK
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center justify-end gap-0.5">
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
