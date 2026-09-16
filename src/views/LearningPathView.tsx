import React from 'react';
import { LearningPathRoadmap } from '../components/dashboard/LearningPathRoadmap';

export const LearningPathView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Personalized Learning Path Roadmap</h1>
          <p className="text-xs text-slate-500">Continuous skill sequence from Foundation to Advanced Executive Strategy</p>
        </div>
      </div>

      <LearningPathRoadmap />
    </div>
  );
};
