import React, { useState } from 'react';
import { BookOpen, Plus, Search, Filter, Calendar, Users, ChevronRight, Download, Upload } from 'lucide-react';
import { mockProgrammeOperations } from '../../data/mockAdminData';
import { useApp } from '../../context/AppContext';

export const AdminProgrammesView: React.FC = () => {
  const { openModal } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Active' | 'Upcoming' | 'Full' | 'At Risk'>('ALL');

  const filteredProgrammes = mockProgrammeOperations.filter(prog => {
    const matchesSearch = prog.title.toLowerCase().includes(searchTerm.toLowerCase()) || prog.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || prog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Programme Operations</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              NCCT Central Registry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage training programmes, batch seat allocations, and trainer assignments across ICM Chennai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_programme')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-950 to-slate-900 text-white font-bold text-xs hover:from-indigo-900 hover:to-slate-850 shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-teal-400" />
            <span>+ Create Programme</span>
          </button>
          <button
            onClick={() => alert('Importing programmes CSV...')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* Programme Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search programme or code..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['ALL', 'Active', 'Upcoming', 'Full', 'At Risk'] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg transition-all text-[11px] ${
                  statusFilter === status ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Programme & Code</th>
                <th className="py-3 px-3">Institute</th>
                <th className="py-3 px-3">Batch & Trainer</th>
                <th className="py-3 px-3">Dates</th>
                <th className="py-3 px-3">Seats (Filled / Total)</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProgrammes.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-950 text-white font-mono text-[10px] font-bold">
                        {item.code}
                      </span>
                      <span className="font-bold text-slate-900">{item.title}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-semibold text-slate-700">{item.institute}</td>

                  <td className="py-3 px-3">
                    <span className="font-bold text-indigo-900 block">Batch {item.batch}</span>
                    <span className="text-[10px] text-slate-500">{item.trainerName}</span>
                  </td>

                  <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                    {item.startDate} – {item.endDate}
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">{item.filledSeats} / {item.totalSeats}</span>
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${(item.filledSeats / item.totalSeats) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      item.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : item.status === 'Upcoming'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : item.status === 'Full'
                        ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => openModal('create_programme')}
                      className="text-indigo-700 hover:text-indigo-900 font-bold text-[11px] flex items-center justify-end gap-0.5 ml-auto"
                    >
                      Manage <ChevronRight className="w-3.5 h-3.5" />
                    </button>
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
