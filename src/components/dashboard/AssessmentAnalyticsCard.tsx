import React, { useState } from 'react';
import { TrendingUp, FileText, Filter, Calendar } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const AssessmentAnalyticsCard: React.FC = () => {
  const { assessments } = useApp();
  const [filterTime, setFilterTime] = useState<'all' | 'weekly' | 'monthly'>('all');

  const chartData = assessments.map(a => ({
    name: a.title.split(' — ')[0],
    score: a.score,
    target: a.targetScore,
  }));

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Assessment Performance</h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" /> +16% Improvement
            </span>
          </div>
          <p className="text-xs text-slate-500">Historical performance across periodic NCCT evaluation tests</p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
          {(['all', 'weekly', 'monthly'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setFilterTime(mode)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-all ${
                filterTime === mode ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={10} domain={[40, 100]} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1b4b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
                padding: '8px 12px',
              }}
              formatter={(value: any) => [`${value}% Score`, 'Result']}
            />
            <ReferenceLine y={70} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Target 70%', fill: '#d97706', fontSize: 10, position: 'right' }} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3730a3"
              strokeWidth={3}
              dot={{ fill: '#059669', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7, fill: '#0d9488' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Summary Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-indigo-700 inline-block" />
            <span>Score Trajectory</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-500 border-b border-dashed border-amber-500 inline-block" />
            <span>Benchmark Threshold (70%)</span>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
          Steady Growth Trajectory
        </span>
      </div>
    </div>
  );
};
