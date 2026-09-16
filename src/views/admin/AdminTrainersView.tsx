import React from 'react';
import { UsersRound, AlertTriangle, CheckCircle2, Award, Calendar, ChevronRight } from 'lucide-react';
import { mockTrainerCapacity } from '../../data/mockAdminData';

export const AdminTrainersView: React.FC = () => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Trainer Faculty Capacity & Load Balancing</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              NCCT Senior Faculty Roster
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Monitor teaching workloads across institutes, prevent faculty burnout, and balance batch distribution.
          </p>
        </div>
      </div>

      {/* Trainer Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">Faculty Utilization & Availability</h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
            43 Active / 48 Total Trainers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Faculty Member</th>
                <th className="py-3 px-3">Specialisation</th>
                <th className="py-3 px-3">Active Batches</th>
                <th className="py-3 px-3">Workload Utilisation</th>
                <th className="py-3 px-3">Next Available</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTrainerCapacity.map(trainer => (
                <tr key={trainer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={trainer.avatarUrl}
                        alt={trainer.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{trainer.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{trainer.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-semibold text-slate-700">{trainer.specialisation}</td>
                  <td className="py-3 px-3 font-bold text-indigo-900">{trainer.activeBatches} Batches</td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-extrabold ${trainer.utilisation > 90 ? 'text-red-600' : 'text-slate-900'}`}>
                        {trainer.utilisation}%
                      </span>
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${trainer.utilisation > 90 ? 'bg-red-500' : 'bg-teal-500'}`}
                          style={{ width: `${trainer.utilisation}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">{trainer.nextAvailable}</td>

                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      trainer.status === 'Overloaded'
                        ? 'bg-red-100 text-red-800 border-red-200 animate-pulse'
                        : trainer.status === 'High Load'
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    }`}>
                      {trainer.status}
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
