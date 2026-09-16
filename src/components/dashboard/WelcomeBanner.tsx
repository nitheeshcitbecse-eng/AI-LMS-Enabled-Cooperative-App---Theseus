import React from 'react';
import { PlayCircle, Calendar, Clock, MapPin, Building2, BookOpen } from 'lucide-react';
import { mockTrainee } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const WelcomeBanner: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 text-white p-6 lg:p-8 shadow-md border border-indigo-800/50">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
        {/* Left Welcome Text & Metadata */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NCCT National Trainee Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Good morning, {mockTrainee.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Here is your continuous learning journey at a glance. You have completed{' '}
            <strong className="text-white font-semibold">68%</strong> of your core programme requirements.
          </p>

          {/* Key Quick Metadata Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-indigo-200">
            <div className="flex items-center gap-1.5 bg-indigo-900/60 px-3 py-1.5 rounded-lg border border-indigo-800/80">
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              <span>{mockTrainee.institute}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-900/60 px-3 py-1.5 rounded-lg border border-indigo-800/80">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate max-w-[200px]">{mockTrainee.programme}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-900/60 px-3 py-1.5 rounded-lg border border-indigo-800/80">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{mockTrainee.location}</span>
            </div>
          </div>
        </div>

        {/* Right Session & Next Action CTA Card */}
        <div className="w-full xl:w-auto bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-start justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-300">
              Next Scheduled Session
            </span>
            <h4 className="text-sm font-semibold text-white mt-0.5">Cooperative Finance</h4>
            <div className="flex items-center gap-3 text-xs text-indigo-200 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-300" /> Today
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-300" /> 10:30 AM
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('learning')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
          >
            <PlayCircle className="w-4 h-4 text-slate-950" />
            <span>Continue Learning</span>
          </button>
        </div>
      </div>
    </div>
  );
};
