import React, { useState } from 'react';
import { X, Bell, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnnouncementModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();
  const [announcementText, setAnnouncementText] = useState('Tomorrow\'s assessment will cover Financial Analysis and Cooperative Accounting. Please review the booster modules.');
  const [sent, setSent] = useState(false);

  if (activeModal !== 'announcement_modal') return null;

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
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
          <div className="w-10 h-10 rounded-xl bg-indigo-900 text-amber-400 flex items-center justify-center font-bold shadow-md">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Send Batch Broadcast Announcement</h3>
            <p className="text-xs text-slate-500">Pushes real-time notification to all 42 trainees</p>
          </div>
        </div>

        {!sent ? (
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Target Audience</label>
              <select className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900">
                <option>All 42 Trainees (CMDO-2026-B04)</option>
                <option>7 Trainees Needing Attention (High Risk Group)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Broadcast Message</label>
              <textarea
                value={announcementText}
                onChange={e => setAnnouncementText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-600 transition-all flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Broadcast Announcement</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">Announcement Broadcast Sent!</h4>
          </div>
        )}
      </div>
    </div>
  );
};
