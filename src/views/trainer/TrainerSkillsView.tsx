import React from 'react';
import { BatchSkillGapMap } from '../../components/trainer/BatchSkillGapMap';
import { CompetencyVerificationCard } from '../../components/trainer/CompetencyVerificationCard';
import { GitFork, ShieldCheck, Zap } from 'lucide-react';

export const TrainerSkillsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Batch Skill Gap Map & Radar Comparison</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
              Cooperative Competency Framework 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Map aggregate cohort proficiency against national NCCT benchmarks and inspect individual trainee variance (e.g., Arun Kumar vs Batch mean).
          </p>
        </div>
      </div>

      {/* Batch Skill Gap Map */}
      <BatchSkillGapMap />

      {/* Competency Verification Card */}
      <CompetencyVerificationCard />
    </div>
  );
};
