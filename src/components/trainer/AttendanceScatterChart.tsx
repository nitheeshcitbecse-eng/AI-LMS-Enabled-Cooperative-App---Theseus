import React from 'react';
import { AlertCircle, TrendingUp, HelpCircle, Users, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const AttendanceScatterChart: React.FC = () => {
  const { traineeRiskList } = useApp();

  const scatterData = traineeRiskList.map(t => ({
    name: t.name,
    attendance: t.attendance,
    score: t.assessmentScore,
    risk: t.riskLevel,
  }));

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Attendance vs. Learning Correlation</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-[10px] font-extrabold border border-indigo-200">
              4-Quadrant Analysis
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Prevents assuming "High Attendance = High Learning". Identifies learners needing concept support.
          </p>
        </div>
      </div>

      {/* Scatter Chart Canvas */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              type="number"
              dataKey="attendance"
              name="Attendance"
              unit="%"
              domain={[50, 100]}
              stroke="#64748b"
              fontSize={11}
              label={{ value: 'Attendance Rate (%)', position: 'bottom', offset: 0, fontSize: 10, fill: '#64748b' }}
            />
            <YAxis
              type="number"
              dataKey="score"
              name="Assessment Avg"
              unit="%"
              domain={[40, 100]}
              stroke="#64748b"
              fontSize={11}
              label={{ value: 'Assessment Score (%)', angle: -90, position: 'left', offset: 0, fontSize: 10, fill: '#64748b' }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#1e1b4b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(value: any, name: any) => [`${value}%`, name]}
            />
            {/* 70% Target lines */}
            <ReferenceLine y={70} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Target 70%', fill: '#d97706', fontSize: 10, position: 'right' }} />
            <ReferenceLine x={80} stroke="#94a3b8" strokeDasharray="3 3" />
            <Scatter name="Trainees" data={scatterData} fill="#3730a3" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* 4 Quadrants Legend & Key Insight */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5 text-amber-950">
        <div className="flex items-center gap-2 font-extrabold text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Key Analytical Insight</span>
        </div>
        <p className="leading-relaxed">
          <strong>4 trainees (including Arun Kumar)</strong> have high attendance (90%+) but continue to score below target in Cooperative Accounting.
        </p>
        <span className="text-[11px] font-bold text-amber-800 block pt-0.5">
          Action: Assign targeted booster rather than assuming attendance indicates comprehension.
        </span>
      </div>
    </div>
  );
};
