import React from 'react';
import { FileSpreadsheet, Download } from 'lucide-react';

export const AdminReportsPage = () => {
  const reports = [
    { title: 'NCCT National Training Operations & Capacity Report', format: 'PDF & EXCEL', size: '14.8 MB', desc: 'Comprehensive monitoring report of 20 connected institutes, capacity utilisation, and certified candidates.' },
    { title: 'Institutional Hostel Occupancy & Resource Audit', format: 'PDF', size: '4.2 MB', desc: 'Detailed breakdown of Block A, B & C bed occupancy and equipment readiness.' },
    { title: 'PACS Financial Literacy Programme Performance Export', format: 'CSV', size: '920 KB', desc: 'Raw dataset for Ministry of Cooperation audit and central database sync.' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="ncct-page-header space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900">Reports & Operational Monitoring</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              NCCT Central Compliance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate and export official administrative reports for NCCT head office and Ministry of Cooperation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reports.map((r, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 ring-1 ring-indigo-200 text-indigo-700 tabular-nums text-[10px] font-bold">{r.format}</span>
                <h3 className="text-lg font-semibold text-slate-900">{r.title}</h3>
              </div>
              <p className="text-xs text-slate-600">{r.desc}</p>
              <span className="text-[10px] tabular-nums text-slate-400 block">File Size: {r.size}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Exporting ${r.title} as PDF...`)}
                className="px-3.5 py-2 rounded-full bg-white border border-slate-300 hover:bg-indigo-50 hover:border-indigo-300 text-indigo-700 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-slate-500" /> Export PDF
              </button>

              <button
                onClick={() => alert(`Exporting ${r.title} as CSV...`)}
                className="px-3.5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-4 h-4 text-teal-400" /> Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
