import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { adminService } from '../../Services/api';

export const CreateProgrammeModal = () => {
  const { activeModal, closeModal } = useApp();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [seats, setSeats] = useState('40');

  if (activeModal !== 'create_programme') return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.createProgramme({ title: title || 'Cooperative Operations', code: code || 'COP-2026', seats });
    } catch (err) {
      alert(`Could not create programme: ${err.message}`);
      return;
    }
    alert(`Programme created successfully: ${title || 'Cooperative Operations'} (${code || 'COP-2026'}) with ${seats} allocated seats.`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full ring-1 ring-slate-200 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden space-y-4">
        <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-semibold">Create New NCCT Training Programme</h3>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg hover:bg-indigo-700 text-indigo-200">
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
              className="px-4 py-2 rounded-full bg-white border border-slate-300 text-indigo-700 font-bold hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Create Programme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
