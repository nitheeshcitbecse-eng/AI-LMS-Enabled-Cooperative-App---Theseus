import React from 'react';
import { Flame, Zap, Award, ShieldCheck, Trophy } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const GamificationCard = () => {
  const { gamification } = useData();
  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Learning Activity & Badges</h3>
          <p className="text-xs text-slate-500">Milestone achievements and continuous activity streak</p>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 flex items-center gap-1">
          <Trophy className="w-3 h-3 text-amber-600" />
          <span>{gamification.levelTitle}</span>
        </span>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl ncct-chrome text-white shadow-xs">
        <div>
          <div className="flex items-center justify-center gap-1 text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span className="text-base font-semibold">{gamification.streakDays} Days</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-indigo-200">Streak</span>
        </div>

        <div className="border-x border-indigo-800">
          <div className="flex items-center justify-center gap-1 text-emerald-400">
            <Zap className="w-4 h-4 fill-emerald-400" />
            <span className="text-base font-semibold">{gamification.xp} XP</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-indigo-200">Experience</span>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1 text-teal-300">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-base font-semibold">Lvl {gamification.level}</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-indigo-200">Level</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">Earned Badges</span>
        <div className="grid grid-cols-2 gap-2">
          {gamification.badges.map(badge => (
            <div
              key={badge.id}
              className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/50 flex items-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-slate-900 truncate">{badge.title}</h4>
                <p className="text-[9px] text-slate-500 truncate">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
