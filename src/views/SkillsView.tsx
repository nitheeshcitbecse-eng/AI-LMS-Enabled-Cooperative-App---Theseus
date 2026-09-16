import React from 'react';
import { Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillsView: React.FC = () => {
  const { skills, openModal } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Skill Profile & Evidence Ledger</h1>
          <p className="text-xs text-slate-500">Every skill is backed by cryptographic assessment & trainer evidence</p>
        </div>

        <button
          onClick={() => openModal('booster_quiz')}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Verify Gap Skill via Booster</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map(skill => {
          const isVerified = skill.status === 'verified';
          const isAttention = skill.status === 'needs_attention';

          return (
            <div
              key={skill.id}
              className={`ncct-card p-5 space-y-4 ${
                isAttention ? 'border-amber-300 bg-amber-50/20' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{skill.name}</h3>
                  <span className="text-xs text-slate-500 font-medium">Category: {skill.category}</span>
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold text-slate-900 block">{skill.proficiency}%</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    isVerified
                      ? 'bg-emerald-100 text-emerald-800'
                      : isAttention
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {isVerified ? '✓ Verified' : isAttention ? '! Needs Attention' : '● Developing'}
                  </span>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isVerified ? 'bg-emerald-500' : isAttention ? 'bg-amber-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Underlying Evidence Ledger ({skill.evidence.length} Records)
                </span>
                <div className="space-y-1.5 text-xs">
                  {skill.evidence.map((ev, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-800 block">{ev.assessmentName}</span>
                        <span className="text-[10px] text-slate-400">Validated by: {ev.validatedBy}</span>
                      </div>
                      <span className="font-bold text-emerald-700">{ev.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {isAttention && (
                <button
                  onClick={() => openModal('booster_quiz')}
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Start Recommended Booster ({skill.recommendedAction})</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
