import React, { useState } from 'react';
import { X, BookOpen, Upload, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrainerResourceModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();
  const [resourceTitle, setResourceTitle] = useState('PACS Working Capital Ledger Case Study 2026.pdf');
  const [uploaded, setUploaded] = useState(false);

  if (activeModal !== 'trainer_resource_modal') return null;

  const handleUpload = () => {
    setUploaded(true);
    setTimeout(() => {
      setUploaded(false);
      closeModal();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Upload & Assign Teaching Resource</h3>
            <p className="text-xs text-slate-500">Add PDF case study, lecture slides or video link</p>
          </div>
        </div>

        {!uploaded ? (
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Resource Title</label>
              <input
                type="text"
                value={resourceTitle}
                onChange={e => setResourceTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900"
              />
            </div>

            <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 text-center space-y-2 bg-slate-50">
              <Upload className="w-8 h-8 text-slate-400 mx-auto" />
              <span className="text-xs font-bold text-slate-700 block">Drag & drop document or click to browse</span>
              <span className="text-[10px] text-slate-400 block">Supports PDF, PPTX, MP4 (Max 50MB)</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:from-emerald-700 transition-all shadow-md"
              >
                Publish Resource to Batch
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">Resource Published to Batch!</h4>
          </div>
        )}
      </div>
    </div>
  );
};
