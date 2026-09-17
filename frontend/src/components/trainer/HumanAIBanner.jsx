import React from 'react';
import { Sparkles } from 'lucide-react';
import { useData } from '../../context/SystemStateContext';

const steps = [
  { actor: '1. AI Pattern', title: 'Detect Drop', human: false },
  { actor: '2. AI Rec', title: 'Suggest Booster', human: false },
  { actor: '3. Trainer', title: 'Validate Gap', human: true },
  { actor: '4. Trainer', title: 'Assign / Teach', human: true },
  { actor: '5. System', title: 'Measure Impact', human: false },
  { actor: '6. Trainer', title: 'Confirm Competency', human: true },
];

export const HumanAIBanner = () => {
  const { trainer } = useData();
  return (
    <section className="ncct-hero">
      <img
        className="ncct-hero-media"
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
        alt=""
      />
      <div className="ncct-hero-scrim" />

      <div className="ncct-hero-inner space-y-10">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-sm font-medium ring-1 ring-white/25">
            <Sparkles className="w-4 h-4" />
            Core Innovation Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl">Welcome back, {trainer.name}</h1>
          <p className="text-lg text-white/85 leading-relaxed">
            <strong className="font-semibold text-white">Human + AI Collaborative Learning Loop.</strong> AI supports
            decisions. Trainers remain in complete control.
          </p>
          <p className="text-[15px] text-white/75">
            Batch {trainer.batch} · {trainer.batchSize} Trainees
          </p>
        </div>

        {/* Workflow steps */}
        <ol className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {steps.map(step => (
            <li
              key={step.actor + step.title}
              className={`rounded-lg px-4 py-3.5 backdrop-blur-sm ${
                step.human ? 'bg-white text-slate-900 shadow-lg' : 'bg-white/12 ring-1 ring-white/25 text-white'
              }`}
            >
              <span
                className={`block text-xs font-semibold uppercase tracking-wider ${
                  step.human ? 'text-indigo-700' : 'text-white/75'
                }`}
              >
                {step.actor}
              </span>
              <span className="block text-base font-semibold mt-0.5">{step.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
