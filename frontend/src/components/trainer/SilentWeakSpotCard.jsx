import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { useApp, useData } from '../../context/SystemStateContext';

export const SilentWeakSpotCard = () => {
  const { silentWeakSpots } = useData();
  const { openModal } = useApp();

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">Silent Weak Spots Identified</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-semibold border border-amber-300">
              AI Pattern Alert
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Hidden learning gaps detected across assessment topics, independent of high attendance.
          </p>
        </div>
      </div>

      {/* Weak Spots List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {silentWeakSpots.map(spot => (
          <div key={spot.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3 shadow-2xs">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-amber-800 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Silent Weak Spot
                </span>
                <h4 className="text-xs font-semibold text-slate-900 leading-tight">{spot.topic}</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-semibold text-[10px]">
                {spot.affectedTraineesCount} Trainees Affected
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-amber-200/80 text-xs space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span>Average Topic Score:</span>
                <strong className="text-amber-700 font-semibold">{spot.averageScore}%</strong>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                <strong>Pattern:</strong> {spot.pattern}
              </p>
            </div>

            <div className="pt-3 border-t border-amber-200/60 flex flex-col items-start gap-2.5">
              <span className="text-xs text-amber-900 font-medium leading-snug">
                {spot.suggestedAction}
              </span>
              <button
                onClick={() => openModal('create_intervention_wizard')}
                className="px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 shrink-0 shadow-2xs"
              >
                <span>Create Intervention</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
