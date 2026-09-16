import React, { useState } from 'react';
import { X, Briefcase, Building, MapPin, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CareerDetailModal: React.FC = () => {
  const { activeModal, closeModal, selectedOpportunity } = useApp();
  const [applied, setApplied] = useState(false);

  if (activeModal !== 'career_detail' || !selectedOpportunity) return null;

  const handleApply = () => {
    setApplied(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Opportunity Header */}
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              {selectedOpportunity.matchPercentage}% Match Score
            </span>
            <span className="text-xs text-slate-500 font-medium">Deadline: {selectedOpportunity.deadline}</span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 leading-tight">{selectedOpportunity.title}</h2>
          <p className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
            <Building className="w-4 h-4 text-slate-400" /> {selectedOpportunity.organization}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedOpportunity.location}
            </span>
            <span>• {selectedOpportunity.salaryRange}</span>
            <span>• {selectedOpportunity.type}</span>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Role Description</h4>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
            {selectedOpportunity.description}
          </p>
        </div>

        {/* Matched Skills Ledger Breakdown */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Verified Skills Assessment</h4>
          <div className="space-y-1.5">
            {selectedOpportunity.matchedSkills.map(skill => (
              <div key={skill} className="flex items-center justify-between text-xs p-2 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-900 font-semibold">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> {skill}
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-emerald-300">
                  ✓ Verified in NCCT Ledger
                </span>
              </div>
            ))}

            {selectedOpportunity.missingSkills.map(skill => (
              <div key={skill} className="flex items-center justify-between text-xs p-2 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-900 font-medium">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> {skill}
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-amber-300">
                  Recommended Booster
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">One-Click Application via NCCT ID</span>
          {applied ? (
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Application Submitted!</span>
            </div>
          ) : (
            <button
              onClick={handleApply}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 shadow-md"
            >
              <span>Apply with NCCT Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
