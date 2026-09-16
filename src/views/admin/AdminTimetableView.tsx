import React, { useState } from 'react';
import { CalendarDays, AlertTriangle, Plus, Clock, MapPin, User, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockTimetableSessions } from '../../data/mockAdminData';
import { useApp } from '../../context/AppContext';

export const AdminTimetableView: React.FC = () => {
  const { openModal } = useApp();
  const [viewMode, setViewMode] = useState<'Week' | 'Day'>('Week');
  const [hasResolvedConflict, setHasResolvedConflict] = useState<boolean>(false);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Smart Timetable & Classroom Schedule</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              Conflict-Free Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated session scheduling with real-time trainer, room, and equipment conflict detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Week/Day Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewMode('Week')}
              className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'Week' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}`}
            >
              Week View
            </button>
            <button
              onClick={() => setViewMode('Day')}
              className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'Day' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}`}
            >
              Day View
            </button>
          </div>

          <button
            onClick={() => openModal('schedule_session')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-950 to-slate-900 text-white font-bold text-xs hover:from-indigo-900 shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-teal-400" />
            <span>+ Schedule Session</span>
          </button>
        </div>
      </div>

      {/* Conflict Alert Banner */}
      {!hasResolvedConflict && (
        <div className="bg-amber-500/10 border border-amber-500/40 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Scheduling Conflict Detected — Dr. Priya Raman</h3>
              <p className="text-[11px] text-slate-700">
                Assigned to <strong>Batch B04 (Room 2)</strong> and <strong>Batch B06 (Room 4)</strong> at 10:00 AM – 11:00 AM Monday.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setHasResolvedConflict(true);
              alert('Conflict Resolved: Reassigned Batch B06 session to Room 4 with Dr. Kavitha S.');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors shrink-0 shadow-2xs"
          >
            Resolve Conflict
          </button>
        </div>
      )}

      {/* Timetable Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Weekly Master Schedule (ICM Chennai)</h2>
            <span className="text-xs text-slate-400 font-mono">08 Sep – 14 Sep 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {mockTimetableSessions.map(session => {
            const isColliding = session.hasConflict && !hasResolvedConflict;

            return (
              <div
                key={session.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isColliding
                    ? 'bg-amber-50/50 border-amber-300 shadow-2xs'
                    : 'bg-slate-50/50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-white font-mono text-[10px] font-bold">
                      {session.timeSlot}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">
                      {session.day}
                    </span>
                    {isColliding && (
                      <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[9px] font-extrabold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-slate-950" /> COLLISION DETECTED
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">{session.programme}</h3>
                  <p className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-indigo-600" /> {session.trainer}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-teal-600" /> {session.room}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal('schedule_session')}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
                  >
                    Edit Session
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
