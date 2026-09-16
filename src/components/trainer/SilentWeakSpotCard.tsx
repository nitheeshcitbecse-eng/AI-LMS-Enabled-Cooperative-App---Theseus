import React from 'react';
import { AlertTriangle, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { mockSilentWeakSpots } from '../../data/mockTrainerData';
import { useApp } from '../../context/AppContext';

export const SilentWeakSpotCard: React.FC = () => {
  const { openModal } = useApp();

  return (
    <div className="ncct-card p-5 space-y-4 border-l-4 border-l-amber-500">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Silent Weak Spots Identified</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold border border-amber-300">
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
        {mockSilentWeakSpots.map(spot => (
          <div key={spot.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3 shadow-2xs">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-amber-800 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Silent Weak Spot
                </span>
                <h4 className="text-xs font-extrabold text-slate-900 leading-tight">{spot.topic}</h4>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-extrabold text-[10px]">
                {spot.affectedTraineesCount} Trainees Affected
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-amber-200/80 text-xs space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span>Average Topic Score:</span>
                <strong className="text-amber-700 font-extrabold">{spot.averageScore}%</strong>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                <strong>Pattern:</strong> {spot.pattern}
              </p>
            </div>

            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between gap-2">
              <span className="text-[10px] text-amber-900 font-semibold truncate max-w-[200px]">
                {spot.suggestedAction}
              </span>
              <button
                onClick={() => openModal('create_intervention_wizard')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs transition-colors flex items-center gap-1 shrink-0 shadow-2xs"
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
