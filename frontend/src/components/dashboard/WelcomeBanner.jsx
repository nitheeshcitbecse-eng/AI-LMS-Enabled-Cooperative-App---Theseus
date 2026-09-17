import React from 'react';
import { PlayCircle, Calendar, Clock, MapPin, Building2, BookOpen } from 'lucide-react';
import { useApp, useData } from '../../context/SystemStateContext';

export const WelcomeBanner = () => {
  const { trainee } = useData();
  const { setActiveTab } = useApp();

  return (
    <section className="ncct-hero">
      <img
        className="ncct-hero-media"
        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000"
        alt=""
      />
      <div className="ncct-hero-scrim" />

      <div className="ncct-hero-inner grid gap-10 lg:grid-cols-[1fr_24rem] items-center">
        {/* Welcome */}
        <div className="space-y-5 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-sm font-medium ring-1 ring-white/25">
            <span className="w-2 h-2 rounded-full bg-emerald-300" />
            NCCT National Trainee Portal
          </span>

          <h1 className="text-4xl sm:text-5xl">Good morning, {trainee.name.split(' ')[0]}</h1>
          <p className="text-lg text-white/85 leading-relaxed">
            Here is your continuous learning journey at a glance. You have completed{' '}
            <strong className="text-white font-semibold">68%</strong> of your core programme requirements.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-[15px] text-white/85">
            <span className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {trainee.institute}
            </span>
            <span className="flex items-center gap-2 min-w-0">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="truncate max-w-[280px]">{trainee.programme}</span>
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {trainee.location}
            </span>
          </div>
        </div>

        {/* Next session panel */}
        <div className="bg-white text-slate-700 rounded-xl p-7 shadow-2xl space-y-5">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo-700">Next Scheduled Session</span>
            <h2 className="text-2xl text-slate-900 mt-1">Cooperative Finance</h2>
            <div className="flex items-center gap-4 text-[15px] text-slate-600 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" /> Today
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" /> 10:30 AM
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Programme progress</span>
              <span className="font-semibold text-slate-900">68%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-[68%] rounded-full bg-indigo-600" />
            </div>
          </div>

          <button onClick={() => setActiveTab('learning')} className="ncct-btn-primary w-full py-3">
            <PlayCircle className="w-5 h-5" />
            <span>Continue Learning</span>
          </button>
        </div>
      </div>
    </section>
  );
};
