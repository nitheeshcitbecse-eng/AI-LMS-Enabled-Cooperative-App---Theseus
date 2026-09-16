import React from 'react';
import { Truck, Utensils, BookOpen, AlertTriangle, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { mockLogisticsChecklist } from '../../data/mockAdminData';

export const AdminLogisticsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Training Logistics & Operations Checklist</h1>
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
        {mockLogisticsChecklist.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-white font-mono text-[10px] font-bold">
                  {item.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                  item.status === 'Ready'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {item.status === 'Ready' ? '✓ Ready' : '⚠ Attention Needed'}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 font-medium">{item.statusText}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[10px]">Status: {item.metric}</span>
              <button
                onClick={() => alert(`Verified logistics item: ${item.title}`)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-colors"
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
