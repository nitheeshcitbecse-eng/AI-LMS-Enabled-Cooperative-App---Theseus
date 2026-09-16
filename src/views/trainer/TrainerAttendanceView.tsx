import React from 'react';
import { AttendanceScatterChart } from '../../components/trainer/AttendanceScatterChart';
import { CalendarCheck, QrCode, Scan, ShieldCheck, CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';

export const TrainerAttendanceView: React.FC = () => {
  const recentLogs = [
    { date: 'Today, 09:15 AM', trainee: 'Arun Kumar (NCCT-2026-8942)', method: 'Face Recognition', status: 'VERIFIED', location: 'ICM Hall A' },
    { date: 'Today, 09:14 AM', trainee: 'Kavitha S. (NCCT-2026-8945)', method: 'QR Code Scan', status: 'VERIFIED', location: 'ICM Hall A' },
    { date: 'Today, 09:10 AM', trainee: 'Meena R. (NCCT-2026-8948)', method: 'Face Recognition', status: 'VERIFIED', location: 'ICM Hall A' },
    { date: 'Today, 09:05 AM', trainee: 'Rajesh M. (NCCT-2026-8943)', method: 'Manual Trainer Sign-in', status: 'OVERRIDDEN', location: 'ICM Hall A' },
    { date: 'Yesterday, 09:20 AM', trainee: 'Prakash K. (NCCT-2026-8951)', method: 'Face Recognition', status: 'ABSENT', location: '—' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">Attendance Analytics & Biometric Logs</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                Face AI + QR Verification
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Correlate trainee attendance patterns directly with assessment scores to identify absent-learning risk correlation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Launching Biometric Kiosk Session for Dr. Priya Raman...')}
              className="px-3.5 py-2 rounded-xl bg-indigo-950 text-white hover:bg-indigo-900 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Scan className="w-4 h-4 text-amber-400" />
              <span>Launch Classroom Face Scanner</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Quadrant Scatter Chart */}
      <AttendanceScatterChart />

      {/* Live Attendance Audit Stream */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Live Biometric & QR Attendance Log</h3>
            <p className="text-xs text-slate-500">Tamper-evident digital attendance stream for Batch CMDO-2026-B04</p>
          </div>
          <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded border border-teal-200">
            Realtime Sync Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Time & Date</th>
                <th className="py-2.5 px-3">Trainee Name & ID</th>
                <th className="py-2.5 px-3">Verification Method</th>
                <th className="py-2.5 px-3">Classroom Location</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-3 text-slate-600 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {log.date}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">{log.trainee}</td>
                  <td className="py-3 px-3 text-slate-700 font-medium">{log.method}</td>
                  <td className="py-3 px-3 text-slate-500">{log.location}</td>
                  <td className="py-3 px-3">
                    {log.status === 'VERIFIED' ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                      </span>
                    ) : log.status === 'OVERRIDDEN' ? (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1 w-max">
                        <ShieldCheck className="w-3 h-3 text-amber-600" /> Trainer Sign-off
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold flex items-center gap-1 w-max">
                        <XCircle className="w-3 h-3 text-red-600" /> Unexcused Absent
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
