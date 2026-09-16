import React from 'react';
import { BarChart3, TrendingUp, Award, CheckCircle2, Briefcase } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';

export const AdminAnalyticsView: React.FC = () => {
  const completionData = [
    { month: 'May', enrolled: 240, completed: 210 },
    { month: 'Jun', enrolled: 310, completed: 285 },
    { month: 'Jul', enrolled: 380, completed: 350 },
    { month: 'Aug', enrolled: 420, completed: 390 },
    { month: 'Sep', enrolled: 480, completed: 440 },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Learning & Outcome Analytics</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              NCCT Outcome Intelligence
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track completion trends, certification pass rates, and career placements across NCCT institutes.
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Enrolment vs Completion Trend</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip />
              <Bar dataKey="enrolled" fill="#1e1b4b" radius={[4, 4, 0, 0]} name="Enrolled Trainees" />
              <Bar dataKey="completed" fill="#0d9488" radius={[4, 4, 0, 0]} name="Course Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
