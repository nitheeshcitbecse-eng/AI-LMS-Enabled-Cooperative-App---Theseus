import React from 'react';
import { BookOpen, Upload, FileText, Video, Link, Eye, Download, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrainerResourcesView: React.FC = () => {
  const { openModal } = useApp();

  const resources = [
    { title: 'NCCT Master Guide: Cooperative Law & Governance 2026', type: 'PDF', size: '4.2 MB', downloads: 42, category: 'Core Handbook', uploader: 'Dr. Priya Raman' },
    { title: 'Interactive Excel Model: PACS Balance Sheet & Audit Ledger', type: 'XLSX', size: '1.8 MB', downloads: 38, category: 'Practical Lab', uploader: 'Dr. Priya Raman' },
    { title: 'Video Lecture: RBI Cyber Security Guidelines for PACS', type: 'VIDEO', size: '45 mins', downloads: 40, category: 'Multimedia', uploader: 'Dr. Priya Raman' },
    { title: 'Remedial Reading: Simplified Double-Entry Accounting', type: 'PDF', size: '1.1 MB', downloads: 14, category: 'Remedial Material', uploader: 'Dr. Priya Raman' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Teaching Resources & Remedial Library</h1>
            <p className="text-xs text-slate-500 mt-1">
              Upload lectures, practical case studies, and assign targeted reading material directly to trainees.
            </p>
          </div>

          <button
            onClick={() => openModal('trainer_resource')}
            className="px-4 py-2.5 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 shadow-md transition-all flex items-center gap-2 w-max"
          >
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Upload New Material</span>
          </button>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 hover:border-indigo-300 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{item.size}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500">Uploaded by <span className="text-slate-700 font-semibold">{item.uploader}</span></p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">{item.downloads} Trainees Accessed</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Opening resource preview: ${item.title}`)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
