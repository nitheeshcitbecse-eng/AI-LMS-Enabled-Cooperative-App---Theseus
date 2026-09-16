import React from 'react';
import { UserCheck, AlertTriangle, CheckCircle2, ShieldCheck, Filter, Search, ArrowUpRight } from 'lucide-react';
import { mockNominationConflicts } from '../../data/mockAdminData';
import { useApp } from '../../context/AppContext';

export const AdminNominationsView: React.FC = () => {
  const { openModal, setSelectedConflictItem } = useApp();

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Smart Nomination Control ("One Trainee. One Seat.")</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              National Deduplication Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Centralized registry ensuring single seat allocation per candidate across all connected NCCT institutes.
          </p>
        </div>
      </div>

      {/* Nomination Funnel Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase block">Total Nominations Received</span>
          <div className="text-2xl font-black text-slate-900">1,462</div>
          <span className="text-[11px] text-slate-500 font-medium">Across Tamil Nadu & Regional Societies</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-emerald-600 font-bold uppercase block">Verified & Confirmed Seats</span>
          <div className="text-2xl font-black text-emerald-700">1,418</div>
          <span className="text-[11px] text-emerald-600 font-bold">✓ 97% Valid Allocations</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-300 shadow-2xs space-y-1 bg-amber-50/20">
          <span className="text-xs text-amber-700 font-bold uppercase block">Duplicate / Conflict Flags</span>
          <div className="text-2xl font-black text-amber-800">44</div>
          <span className="text-[11px] text-amber-700 font-bold">⚠ Requires Admin Verification</span>
        </div>
      </div>

      {/* Nomination Audit Roster */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Nomination Audit & Conflict Detection Roster</h2>
            <p className="text-xs text-slate-500">Click "Resolve Conflict" to resolve multi-institute double bookings</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Trainee & Digital ID</th>
                <th className="py-3 px-3">Target Programme</th>
                <th className="py-3 px-3">Nominated Institute</th>
                <th className="py-3 px-3">Nomination Status</th>
                <th className="py-3 px-3">Conflict Details</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockNominationConflicts.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{item.traineeName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.digitalId}</span>
                  </td>

                  <td className="py-3 px-3 font-semibold text-slate-800">{item.programmeName}</td>

                  <td className="py-3 px-3 text-slate-700">{item.instituteName}</td>

                  <td className="py-3 px-3">
                    {item.nominationStatus === 'Confirmed' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Confirmed
                      </span>
                    ) : item.nominationStatus === 'Conflict' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold border border-amber-300 flex items-center gap-1 w-max animate-pulse">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Conflict Flagged
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200 w-max block">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-slate-600 text-[11px]">
                    {item.conflictReason || 'No conflict detected. Single seat verified.'}
                  </td>

                  <td className="py-3 px-3 text-right">
                    {item.nominationStatus === 'Conflict' ? (
                      <button
                        onClick={() => {
                          setSelectedConflictItem(item);
                          openModal('nomination_conflict');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-xs shadow-2xs transition-colors"
                      >
                        Resolve Conflict
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400">Verified</span>
                    )}
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
