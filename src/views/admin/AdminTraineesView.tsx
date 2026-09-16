import React, { useState } from 'react';
import { GraduationCap, Search, Filter, AlertCircle, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminTraineesView: React.FC = () => {
  const { traineeRiskList, setSelectedTraineeForDrawer } = useApp();
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Trainee Operations & Roster Monitoring</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              National Trainee Registry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Institutional overview of 1,284 enrolled trainees across cooperative management programmes.
          </p>
        </div>
      </div>

      {/* Trainee Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name or ID..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Trainee</th>
                <th className="py-3 px-3">Attendance</th>
                <th className="py-3 px-3">Assessment Avg</th>
                <th className="py-3 px-3">Primary Skill Gap</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {traineeRiskList.map(trainee => (
                <tr
                  key={trainee.id}
                  onClick={() => setSelectedTraineeForDrawer(trainee)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
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

                  <td className="py-3 px-3 font-semibold text-slate-700">{trainee.attendance}%</td>
                  <td className="py-3 px-3 font-extrabold text-slate-900">{trainee.assessmentScore}%</td>
                  <td className="py-3 px-3 text-slate-600 font-medium">{trainee.skillGapTopic}</td>

                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      trainee.riskLevel === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {trainee.riskLevel === 'HIGH' ? 'High Risk' : 'On Track'}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center justify-end gap-0.5">
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
