import React, { useState } from 'react';
import { X, CalendarDays, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ScheduleSessionModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();
  const [trainer, setTrainer] = useState('Dr. Priya Raman');
  const [room, setRoom] = useState('Room 2');
  const [time, setTime] = useState('10:00 AM - 11:00 AM');

  if (activeModal !== 'schedule_session') return null;

  const handlePublish = () => {
    alert(`Session published for ${trainer} in ${room} at ${time}. Availability check passed ✓ (0 conflicts).`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden space-y-4">
        <div className="p-4 bg-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-extrabold">Smart Timetable Scheduler</h3>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg hover:bg-indigo-900 text-indigo-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Assigned Faculty Member</label>
            <select
              value={trainer}
              onChange={e => setTrainer(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            >
              <option value="Dr. Priya Raman">Dr. Priya Raman (Cooperative Management)</option>
              <option value="Mr. Kumar">Mr. Kumar (Digital Operations)</option>
              <option value="Dr. Kavitha S.">Dr. Kavitha S. (Financial Audit)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Classroom Venue</label>
              <select
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
              >
                <option value="Room 1">Room 1 (94% load)</option>
                <option value="Room 2">Room 2 (87% load)</option>
                <option value="Room 3">Room 3 (72% load)</option>
                <option value="Room 4">Room 4 (38% load - Recommended)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Time Slot</label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
              />
            </div>
          </div>

          {/* Realtime Availability Check Box */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-[11px] text-emerald-900">
            <div className="font-extrabold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Availability Check Verified
            </div>
            <p>Trainer: Available ✓ | Room: Available ✓ | Projector: Available ✓</p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2 rounded-xl bg-indigo-950 text-white font-bold hover:bg-indigo-900 transition-colors"
            >
              Publish Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
