import React from 'react';
import { X, Boxes, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ResourceRequestModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();

  if (activeModal !== 'resource_request') return null;

  const handleSend = () => {
    alert('Resource exchange request sent to RICM Hyderabad. Notification logged in NCCT Central Registry.');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden space-y-4">
        <div className="p-4 bg-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-extrabold">NCCT Resource Exchange Request</h3>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg hover:bg-indigo-900 text-indigo-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Resource</span>
            <h4 className="font-extrabold text-slate-900">Biometric Face Recognition Attendance Kiosks (6 units)</h4>
            <p className="text-[11px] text-indigo-900 font-medium">Source Institute: RICM Hyderabad</p>
            <p className="text-[11px] text-teal-700 font-semibold">Requiring Institute: ICM Chennai</p>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Required Duration</label>
            <input
              type="text"
              defaultValue="12 Sep – 20 Sep 2026"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Purpose</label>
            <textarea
              defaultValue="Digital Cooperative Operations Batch B04 Practical Lab Setup"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 h-16"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded-xl bg-indigo-950 text-white font-bold hover:bg-indigo-900 transition-colors"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
