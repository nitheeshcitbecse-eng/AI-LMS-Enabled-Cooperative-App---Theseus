import React from 'react';
import { Gauge, Sparkles, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../../context/AppContext';

export const AdminCapacityView: React.FC = () => {
  const { openModal } = useApp();

  const roomData = [
    { room: 'Room 1', utilisation: 94 },
    { room: 'Room 2', utilisation: 87 },
    { room: 'Room 3', utilisation: 72 },
    { room: 'Room 4', utilisation: 38 },
  ];

  const trainerData = [
    { name: 'Dr. Priya', load: 91 },
    { name: 'Mr. Kumar', load: 78 },
    { name: 'Dr. Kavitha', load: 96 },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Capacity & Resource Intelligence</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              National Optimisation Layer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Realtime monitoring of classroom utilization, faculty workloads, and training hardware availability.
          </p>
        </div>
      </div>

      {/* Smart Allocation Recommendation Banner */}
      <div className="bg-indigo-950 text-white p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-400 text-indigo-950 flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-5 h-5 fill-indigo-950" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-white">Smart Allocation Recommendation</h3>
            <p className="text-xs text-indigo-200 mt-0.5">
              "Room 4 has 62% unused capacity this week. Reallocate 12 surplus trainees from CMDO-B04."
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Optimising schedule: Reallocated surplus trainees to Lecture Room 4.')}
          className="px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-indigo-950 text-xs font-bold transition-colors shrink-0 shadow-md"
        >
          Optimise Schedule
        </button>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classroom Utilisation Bar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Classroom Utilisation Rate</h2>
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              ICM Chennai
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roomData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="room" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="utilisation" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trainer Workload Bar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Trainer Faculty Load (%)</h2>
            <span className="text-xs font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Weekly Allocation
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trainerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="load" fill="#1e1b4b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Equipment Availability Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Equipment & Hardware Availability</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-700 block">Interactive Projectors</span>
            <span className="text-xl font-black text-slate-900">12 / 14 Available</span>
            <span className="text-[10px] text-amber-700 font-bold block">2 units in Room 4 maintenance</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-700 block">PACS Training Kiosks</span>
            <span className="text-xl font-black text-slate-900">8 / 10 Available</span>
            <span className="text-[10px] text-emerald-700 font-bold block">✓ Fully operational</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-700 block">QR Attendance Scanners</span>
            <span className="text-xl font-black text-slate-900">18 / 20 Available</span>
            <span className="text-[10px] text-emerald-700 font-bold block">✓ Synced to Rural Edge</span>
          </div>
        </div>
      </div>
    </div>
  );
};
