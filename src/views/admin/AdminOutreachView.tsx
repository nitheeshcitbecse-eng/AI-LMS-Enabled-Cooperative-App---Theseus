import React from 'react';
import { Compass, MapPin, Plus, Sparkles } from 'lucide-react';

export const AdminOutreachView: React.FC = () => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Programme Outreach Intelligence</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              Future Demand Planning
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Leverage centralized database insights to identify underserved rural districts and plan target outreach.
          </p>
        </div>
      </div>

      {/* Outreach Priority Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">High Priority Rural Outreach Zone</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
            High Demand • Low Past Participation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Underserved Region</span>
            <span className="font-extrabold text-slate-900 text-sm">North Chennai Rural Belt</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Demand Signal</span>
            <span className="font-extrabold text-red-600 text-sm">High ↑</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Recommended Programme</span>
            <span className="font-extrabold text-indigo-900 text-sm">Digital Cooperative Operations</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Suggested Outreach</span>
            <span className="font-extrabold text-teal-700 text-sm">2 New Batches</span>
          </div>
        </div>

        <button
          onClick={() => alert('Creating Outreach Plan for North Chennai Rural Belt...')}
          className="px-4 py-2 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 transition-colors"
        >
          + Create Outreach Plan
        </button>
      </div>
    </div>
  );
};
