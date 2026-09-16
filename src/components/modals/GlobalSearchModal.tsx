import React, { useState } from 'react';
import { Search, X, BookOpen, User, MapPin, Building2, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { activeModal, closeModal, setActiveTab } = useApp();
  const [query, setQuery] = useState('');

  if (activeModal !== 'global_search') return null;

  const mockSearchResults = [
    { type: 'Trainee', title: 'Arun Kumar (NCCT-TR-2026-004281)', subtitle: 'Batch CMDO-B04 • ICM Chennai', tab: 'admin_trainees' },
    { type: 'Programme', title: 'Cooperative Management & Digital Operations (CMDO)', subtitle: '38/40 Seats Filled • Active', tab: 'admin_programmes' },
    { type: 'Trainer', title: 'Dr. Priya Raman (Senior Faculty)', subtitle: 'Specialisation: Cooperative Law & Audit', tab: 'admin_trainers' },
    { type: 'Room', title: 'Lecture Room 4 (ICM Chennai)', subtitle: '38% Utilisation • 62% Unused Capacity', tab: 'admin_capacity' },
    { type: 'Hostel', title: 'Block A (Main Men\'s Hostel)', subtitle: '96% Occupancy Rate • 4 Beds Remaining', tab: 'admin_hostel' },
  ];

  const filtered = mockSearchResults.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden space-y-2">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search trainee, programme, batch, trainer, room, hostel..."
            className="w-full text-sm bg-transparent border-none focus:outline-hidden font-medium text-slate-900 placeholder:text-slate-400"
            autoFocus
          />
          <button onClick={closeModal} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-3 block">
            Command Palette Results ({filtered.length})
          </span>

          {filtered.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveTab(item.tab as any);
                closeModal();
              }}
              className="p-3 rounded-xl hover:bg-indigo-50/60 border border-transparent hover:border-indigo-100 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-white font-mono text-[9px] font-bold uppercase">
                    {item.type}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-900">{item.title}</h4>
                </div>
                <p className="text-[11px] text-slate-500">{item.subtitle}</p>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 transition-colors" />
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between px-4">
          <span>Navigate using search keywords</span>
          <span className="font-mono">Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
