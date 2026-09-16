import React from 'react';
import { X, AlertTriangle, CheckCircle2, User, Building2, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NominationConflictModal: React.FC = () => {
  const { activeModal, closeModal, selectedConflictItem } = useApp();

  if (activeModal !== 'nomination_conflict') return null;

  const trainee = selectedConflictItem || {
    traineeName: 'Priya S.',
    digitalId: 'NCCT-TR-2026-009142',
    existingProgramme: {
      institute: 'RICM Hyderabad',
      programme: 'PACS Financial Management',
      dates: '12 Sep – 30 Sep 2026',
    },
    newProgramme: {
      institute: 'ICM Chennai',
      programme: 'Cooperative Digital Operations',
      dates: '15 Sep – 05 Oct 2026',
    },
  };

  const handleResolve = (choice: string) => {
    alert(`Nomination conflict resolved for ${trainee.traineeName}: Choice selected = "${choice}".`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden space-y-4">
        {/* Header */}
        <div className="p-4 bg-amber-500 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-slate-950" />
            <h3 className="text-sm font-extrabold">Nomination Conflict Detected</h3>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg hover:bg-amber-600">
            <X className="w-5 h-5 text-slate-950" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Candidate</span>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-sm">{trainee.traineeName}</span>
              <span className="font-mono text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-bold">
                {trainee.digitalId}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Existing Nomination */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Existing Nomination</span>
              <h4 className="font-bold text-slate-900">{trainee.existingProgramme?.programme}</h4>
              <p className="text-[11px] text-indigo-900 font-semibold">{trainee.existingProgramme?.institute}</p>
              <p className="text-[10px] text-slate-500 font-mono">{trainee.existingProgramme?.dates}</p>
            </div>

            {/* New Nomination Request */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-1">
              <span className="text-[10px] text-amber-800 font-extrabold uppercase block">New Request (ICM Chennai)</span>
              <h4 className="font-bold text-slate-900">{trainee.newProgramme?.programme}</h4>
              <p className="text-[11px] text-indigo-900 font-semibold">{trainee.newProgramme?.institute}</p>
              <p className="text-[10px] text-slate-500 font-mono">{trainee.newProgramme?.dates}</p>
            </div>
          </div>

          <div className="bg-slate-100 p-3 rounded-xl text-slate-600 text-[11px]">
            💡 <strong>"One Trainee. One Seat." Protocol</strong>: A candidate cannot hold concurrent nominations across two NCCT institutes for overlapping training dates.
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <button
              onClick={() => handleResolve('Keep Existing at RICM Hyderabad')}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              Keep Existing
            </button>

            <button
              onClick={() => handleResolve('Accept New at ICM Chennai')}
              className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs transition-colors shadow-2xs"
            >
              Accept New (Chennai)
            </button>

            <button
              onClick={() => handleResolve('Contact Coordinator')}
              className="py-2 px-3 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs transition-colors"
            >
              Contact Coordinator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
