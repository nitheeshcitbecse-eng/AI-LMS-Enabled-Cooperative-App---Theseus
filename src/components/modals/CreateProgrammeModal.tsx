import React, { useState } from 'react';
import { X, BookOpen, Plus, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreateProgrammeModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [seats, setSeats] = useState('40');

  if (activeModal !== 'create_programme') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Programme created successfully: ${title || 'Cooperative Operations'} (${code || 'COP-2026'}) with ${seats} allocated seats.`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden space-y-4">
        <div className="p-4 bg-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-extrabold">Create New NCCT Training Programme</h3>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg hover:bg-indigo-900 text-indigo-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Programme Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Digital Cooperative Accounting & Audit"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-teal-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Programme Code</label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="e.g. DCAA-2026"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Allocated Seats</label>
              <input
                type="number"
                value={seats}
                onChange={e => setSeats(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-950 text-white font-bold hover:bg-indigo-900 transition-colors"
            >
              Create Programme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
