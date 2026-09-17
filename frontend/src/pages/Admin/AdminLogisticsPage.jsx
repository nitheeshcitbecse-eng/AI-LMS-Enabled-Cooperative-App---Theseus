import React from 'react';
import { useData } from '../../context/SystemStateContext';

export const AdminLogisticsPage = () => {
  const { logisticsChecklist } = useData();
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="ncct-page-header space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900">Training Logistics & Operations Checklist</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              Operational Readiness
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ensure all operational dependencies (transport, catering meals, materials, and hardware) are 100% prepared.
          </p>
        </div>
      </div>

      {/* Checklist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logisticsChecklist.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 ring-1 ring-indigo-200 text-indigo-700 tabular-nums text-[10px] font-bold">
                  {item.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                  item.status === 'Ready'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {item.status === 'Ready' ? '✓ Ready' : '⚠ Attention Needed'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 font-medium">{item.statusText}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 tabular-nums text-[10px]">Status: {item.metric}</span>
              <button
                onClick={() => alert(`Verified logistics item: ${item.title}`)}
                className="px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:bg-indigo-50 hover:border-indigo-300 text-indigo-700 font-bold text-[11px] transition-colors"
              >
                Inspect Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
