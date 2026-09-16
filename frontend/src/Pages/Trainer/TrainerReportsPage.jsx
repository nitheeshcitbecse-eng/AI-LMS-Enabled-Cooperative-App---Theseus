import React from 'react';
import { Download } from 'lucide-react';

export const TrainerReportsPage = () => {
  const reports = [
    { title: 'Batch CMDO-2026-B04 Comprehensive Capacity Building Report', format: 'PDF & EXCEL', size: '12.4 MB', date: '08 Feb 2026', description: 'Complete record of attendance, assessment scores, pre/post intervention impact, and micro-credential sign-offs.' },
    { title: 'Silent Weak Spot Analysis & Remedial Outcome Summary', format: 'PDF', size: '3.1 MB', date: '07 Feb 2026', description: 'AI diagnostic breakdown for Cooperative Accounting intervention closed-loop validation.' },
    { title: 'NCCT National Training Portal Sync Export (ERP Schema)', format: 'JSON / CSV', size: '850 KB', date: 'Today, 08:30 AM', description: 'Centralized database synchronization payload for NCCT Head Office monitoring.' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="ncct-page-header space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900">Reports, Exports & ERP Audit Trail</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              NCCT Central Compliance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate official NCCT training completion certificates, batch analytics reports, and statutory audit compliance exports.
          </p>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 gap-4">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 ring-1 ring-indigo-200 text-indigo-700 tabular-nums text-[10px] font-bold">
                  {report.format}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{report.title}</h3>
              </div>
              <p className="text-xs text-slate-600">{report.description}</p>
              <span className="text-[11px] text-slate-400 tabular-nums block">Generated: {report.date} • {report.size}</span>
            </div>

            <button
              onClick={() => alert(`Downloading report: ${report.title}`)}
              className="px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 w-max"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download File</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
