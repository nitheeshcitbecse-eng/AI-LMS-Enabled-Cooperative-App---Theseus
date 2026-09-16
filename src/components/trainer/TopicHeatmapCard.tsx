import React from 'react';
import { Grid, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { mockTopicHeatmap } from '../../data/mockTrainerData';
import { useApp } from '../../context/AppContext';

export const TopicHeatmapCard: React.FC = () => {
  const { openModal } = useApp();

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Topic Performance Heatmap Matrix</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-[10px] font-extrabold border border-indigo-200">
              Batch Performance
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Topic-level score intensity across recent evaluations. Instantly highlights batch-wide weak spots.
          </p>
        </div>

        <button
          onClick={() => openModal('create_intervention_wizard')}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1 transition-colors shadow-2xs shrink-0"
        >
          <span>Create Intervention Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Heatmap Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <th className="py-2.5 px-3">Curriculum Topic Area</th>
              <th className="py-2.5 px-3 text-center">Test 1</th>
              <th className="py-2.5 px-3 text-center">Test 2</th>
              <th className="py-2.5 px-3 text-center">Test 3</th>
              <th className="py-2.5 px-3 text-center">Test 4</th>
              <th className="py-2.5 px-3 text-right">Batch Avg</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockTopicHeatmap.map(row => (
              <tr key={row.topicName} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900">{row.topicName}</td>

                {row.cells.map((cell, idx) => (
                  <td key={idx} className="py-3 px-3 text-center">
                    <span
                      title={`${row.topicName} - ${cell.assessmentName}: ${cell.score}%`}
                      className={`inline-block w-14 py-1 rounded font-extrabold text-xs transition-transform hover:scale-105 cursor-pointer ${
                        cell.score >= 75
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : cell.score >= 60
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300 shadow-2xs'
                      }`}
                    >
                      {cell.score}%
                    </span>
                  </td>
                ))}

                <td className="py-3 px-3 text-right">
                  <span className={`font-extrabold ${row.averageScore < 60 ? 'text-red-600' : 'text-emerald-700'}`}>
                    {row.averageScore}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Heatmap Legend */}
      <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Strong (75%+)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500 inline-block" /> Developing (60-74%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500 inline-block" /> Critical Gap (&lt;60%)
          </span>
        </div>
        <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
          2 Topics Require Intervention
        </span>
      </div>
    </div>
  );
};
