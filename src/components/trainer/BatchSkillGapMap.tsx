import React from 'react';
import { GitFork, AlertTriangle, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BatchSkillGapMap: React.FC = () => {
  const { openModal, demoMode } = useApp();

  const skillsData = [
    { name: 'Cooperative Management', proficiency: 88, status: 'strong' },
    { name: 'Communication & Soft Skills', proficiency: 82, status: 'strong' },
    { name: 'Digital Operations & ERP', proficiency: 74, status: 'developing' },
    { name: 'Leadership & Strategy', proficiency: 67, status: 'developing' },
    { name: 'Data Interpretation', proficiency: 58, status: 'developing' },
    { name: 'Financial Analysis & Accounting', proficiency: demoMode === 'after' ? 74 : 49, status: demoMode === 'after' ? 'strong' : 'weak' },
  ];

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Batch Skill Gap Map</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-[10px] font-extrabold border border-indigo-200">
              Batch Competency Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Percentage of 42 trainees meeting competency benchmarks across core NCCT skills.
          </p>
        </div>

        <button
          onClick={() => openModal('create_intervention_wizard')}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1 transition-colors shadow-2xs shrink-0"
        >
          <span>Plan Batch Intervention</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Skill Bars */}
      <div className="space-y-3">
        {skillsData.map(skill => (
          <div key={skill.name} className="space-y-1.5 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900">{skill.name}</span>
              <span className={`font-extrabold ${skill.proficiency < 60 ? 'text-red-600' : 'text-emerald-700'}`}>
                {skill.proficiency}% Batch Rate
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  skill.proficiency < 60 ? 'bg-red-500' : skill.proficiency < 75 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Individual vs Batch Comparison Box */}
      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-2 text-xs text-indigo-950">
        <div className="flex items-center gap-2 font-extrabold text-indigo-900">
          <User className="w-4 h-4 text-indigo-600" />
          <span>Individual vs. Batch Competency Comparison</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-2.5 rounded-lg bg-white border border-indigo-200 space-y-1">
            <span className="font-bold text-slate-900 block">Arun's Financial Analysis</span>
            <div className="flex justify-between text-[11px] text-slate-600">
              <span>Individual: <strong className="text-red-600">46%</strong></span>
              <span>Batch Avg: <strong>49%</strong></span>
              <span>Target: <strong>70%</strong></span>
            </div>
            <span className="text-[10px] text-red-700 font-semibold block">Slightly below batch avg → Needs Booster</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-indigo-200 space-y-1">
            <span className="font-bold text-slate-900 block">Meena's Communication</span>
            <div className="flex justify-between text-[11px] text-slate-600">
              <span>Individual: <strong className="text-emerald-700">91%</strong></span>
              <span>Batch Avg: <strong>82%</strong></span>
              <span>Target: <strong>70%</strong></span>
            </div>
            <span className="text-[10px] text-emerald-800 font-semibold block">Strong Competency → Ready to Certify</span>
          </div>
        </div>
      </div>
    </div>
  );
};
