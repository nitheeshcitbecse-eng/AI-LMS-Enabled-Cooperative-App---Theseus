import React from 'react';
import { Network, Globe2, Sparkles, ArrowRight, Boxes, Plus } from 'lucide-react';
import { mockNetworkInstitutes, mockResourceExchange } from '../../data/mockAdminData';
import { useApp } from '../../context/AppContext';

export const AdminNetworkView: React.FC = () => {
  const { openModal } = useApp();

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">NCCT Network Command Centre & Resource Exchange</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              National Intelligence Network
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Connect institutional demand and capacity across 20 connected NCCT training institutes.
          </p>
        </div>
      </div>

      {/* National Seat Optimisation */}
      <div className="bg-indigo-950 text-white p-6 rounded-2xl shadow-xl space-y-4 border border-indigo-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800 pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-teal-400">National Optimisation Engine</span>
            <h2 className="text-base font-extrabold text-white">National Seat Capacity & Demand Balance</h2>
          </div>
          <button
            onClick={() => alert('Reviewing network seat reallocation recommendations...')}
            className="px-4 py-2 rounded-xl bg-teal-400 text-indigo-950 text-xs font-bold hover:bg-teal-300 transition-colors"
          >
            Review Reallocation Plan
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-indigo-900/60 rounded-xl border border-indigo-800">
            <span className="text-[10px] text-indigo-300 uppercase block">Total National Demand</span>
            <span className="text-xl font-black text-white">2,840 Seats</span>
          </div>
          <div className="p-3 bg-indigo-900/60 rounded-xl border border-indigo-800">
            <span className="text-[10px] text-indigo-300 uppercase block">Available Network Capacity</span>
            <span className="text-xl font-black text-teal-300">3,420 Seats</span>
          </div>
          <div className="p-3 bg-indigo-900/60 rounded-xl border border-indigo-800">
            <span className="text-[10px] text-indigo-300 uppercase block">Network Utilisation</span>
            <span className="text-xl font-black text-amber-300">83%</span>
          </div>
          <div className="p-3 bg-indigo-900/60 rounded-xl border border-indigo-800">
            <span className="text-[10px] text-indigo-300 uppercase block">Unmet Regional Demand</span>
            <span className="text-xl font-black text-red-400">318 Seats</span>
          </div>
        </div>
      </div>

      {/* NCCT Resource Exchange Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">NCCT Resource Exchange</h2>
            <p className="text-xs text-slate-500">Shareable faculty, smart classrooms, and hardware across institutions</p>
          </div>
          <button
            onClick={() => openModal('resource_request')}
            className="px-3.5 py-2 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 transition-colors flex items-center gap-1.5"
          >
            <Boxes className="w-4 h-4 text-teal-400" />
            <span>Request Resource</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockResourceExchange.map(res => (
            <div key={res.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-white font-mono text-[10px] font-bold">
                    {res.type}
                  </span>
                  <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Source: {res.sourceInstitute}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 mt-1">{res.resourceName}</h3>
                <p className="text-xs text-slate-600 font-medium">{res.availability}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openModal('resource_request')}
                  className="w-full py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xs transition-colors"
                >
                  Request Resource Transfer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
