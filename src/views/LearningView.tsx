import React, { useState } from 'react';
import { PlayCircle, Clock, Zap } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const LearningView: React.FC = () => {
  const { openModal } = useApp();
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Learning & Course Modules</h1>
          <p className="text-xs text-slate-500">Cooperative Management & Digital Operations (CMDO-2026-B04)</p>
        </div>

        <button
          onClick={() => openModal('booster_quiz')}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Launch AI Booster Lesson</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockCourses.map(course => {
          const isSelected = selectedCourse.id === course.id;
          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                isSelected
                  ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded">
                  {course.code}
                </span>
                <span className="text-xs font-bold text-slate-900">{course.progress}%</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">{course.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Instructor: {course.instructor}</p>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.remainingMinutes}m left
                </span>
                <span className="font-semibold text-indigo-700">
                  {course.completedModules}/{course.totalModules} Modules
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ncct-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-700">{selectedCourse.code}</span>
            <h2 className="text-lg font-bold text-slate-900">{selectedCourse.title}</h2>
            <p className="text-xs text-slate-600 mt-0.5">{selectedCourse.description}</p>
          </div>

          <button
            onClick={() => alert(`Starting lesson: ${selectedCourse.lastActivity}`)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Continue Lesson</span>
          </button>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Course Syllabus & Lessons</h4>
          {selectedCourse.modules.map((mod, idx) => (
            <div
              key={mod.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Module 0{idx + 1}:</span>
                  <h4 className="text-xs font-bold text-slate-900">{mod.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    mod.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : mod.status === 'in_progress'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {mod.status === 'completed' ? 'Completed' : mod.status === 'in_progress' ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
                  {mod.topics.map(t => (
                    <span key={t} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                      • {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500">{mod.duration}</span>
                <button
                  onClick={() => alert(`Opening module: ${mod.title}`)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-indigo-50 text-slate-800 font-semibold text-xs transition-colors"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
