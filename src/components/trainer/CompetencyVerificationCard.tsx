import React from 'react';
import { ShieldCheck, CheckCircle2, Award, FileText, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompetencyVerificationCard: React.FC = () => {
  const { competencyClaims, verifyCompetencyClaim } = useApp();

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Competency Verification Ledger</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
              Trainer Validation
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Skills are backed by Assessment + Practical + Project Evidence + Trainer Sign-off.
          </p>
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-3">
        {competencyClaims.map(claim => {
          const isVerified = claim.status === 'verified';

          return (
            <div
              key={claim.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-slate-900">{claim.traineeName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">({claim.digitalId})</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold ${
                    isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isVerified ? '✓ Verified' : 'Pending Trainer Validation'}
                  </span>
                </div>
                <p className="text-xs text-indigo-900 font-bold">
                  Claimed Competency: {claim.competencyName}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                  <span>Assessment: <strong>{claim.assessmentScore}%</strong></span>
                  <span>Practical Lab: <strong>{claim.practicalScore}%</strong></span>
                  <span>Capstone Project: <strong>{claim.projectStatus}</strong></span>
                </div>
              </div>

              {/* Validation Action Button */}
              <div className="flex items-center gap-2 shrink-0">
                {isVerified ? (
                  <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1.5 border border-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified by Trainer</span>
                  </div>
                ) : (
                  <button
                    onClick={() => verifyCompetencyClaim(claim.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs hover:from-emerald-700 transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Verify Competency</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
