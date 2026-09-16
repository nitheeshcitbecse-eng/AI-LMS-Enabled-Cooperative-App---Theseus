import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';

export const AttendanceCard = () => {
  const { attendance } = useData();
  const { openModal } = useApp();

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Digital Attendance & Biometrics</h3>
          <p className="text-xs text-slate-500">Face Recognition & Classroom QR check-in</p>
        </div>
        <button
          onClick={() => openModal('face_attendance')}
          className="px-3 py-1.5 rounded-full bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-2xs"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Face ID / QR Check-In</span>
        </button>
      </div>

      {/* Quick Numbers Bar */}
      <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase block">Present</span>
          <span className="text-lg font-bold text-emerald-700">{attendance.presentSessions}</span>
        </div>
        <div className="border-x border-slate-200">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">Absent</span>
          <span className="text-lg font-bold text-amber-700">{attendance.absentSessions}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase block">Total</span>
          <span className="text-lg font-bold text-slate-800">{attendance.totalSessions}</span>
        </div>
      </div>

      {/* Mini Heatmap Visualization grid */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">September 2026 Biometric Matrix</span>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 25 }).map((_, i) => {
            const isAbsent = i === 9 || i === 18;
            return (
              <div
                key={i}
                onClick={() => openModal('face_attendance')}
                title={`Session ${i + 1}: ${isAbsent ? 'Absent' : 'Present (Face ID Verified)'}`}
                className={`h-5 rounded text-[9px] font-bold flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                  isAbsent
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-500 text-white shadow-2xs'
                }`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Encouragement Notice */}
      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900 font-semibold">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{attendance.statusMessage}</span>
        </div>
        <span className="text-[10px] text-slate-500 tabular-nums">Verified by AI Face ID</span>
      </div>
    </div>
  );
};
