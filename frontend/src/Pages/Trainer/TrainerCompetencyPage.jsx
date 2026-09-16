import React from 'react';
import { CompetencyVerificationCard } from '../../components/trainer/CompetencyVerificationCard';

export const TrainerCompetencyPage = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="ncct-page-header space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900">Competency Verification Ledger & Badging</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              NCCT Authorized Trainer Sign-off
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review trainee practical evidence submissions, verify skills, and digitally sign off on micro-credentials.
          </p>
        </div>
      </div>

      {/* Main Competency Verification Ledger Component */}
      <CompetencyVerificationCard />
    </div>
  );
};
