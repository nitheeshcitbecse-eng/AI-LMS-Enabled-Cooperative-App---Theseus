import React from 'react';
import { Zap, Camera, Bell, BookOpen, FileCheck2, BarChart3, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickActionCenter: React.FC = () => {
  const { openModal, setActiveTab } = useApp();

  const actions = [
    { label: 'Create Intervention', icon: Zap, color: 'bg-amber-500 text-slate-950', onClick: () => openModal('create_intervention_wizard') },
    { label: 'Face ID Attendance', icon: Camera, color: 'bg-teal-600 text-white', onClick: () => openModal('face_attendance') },
    { label: 'Send Announcement', icon: Bell, color: 'bg-indigo-900 text-white', onClick: () => openModal('announcement_modal') },
    { label: 'Upload Resource', icon: BookOpen, color: 'bg-emerald-600 text-white', onClick: () => openModal('trainer_resource_modal') },
    { label: 'Verify Competency', icon: ShieldCheck, color: 'bg-purple-600 text-white', onClick: () => setActiveTab('trainer_competency') },
    { label: 'Batch Reports', icon: BarChart3, color: 'bg-slate-800 text-white', onClick: () => setActiveTab('trainer_reports') },
  ];

  return (
    <div className="ncct-card p-5 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold text-slate-900">Trainer Quick Action Center</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase">Fast Workflows</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {actions.map(act => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              onClick={act.onClick}
              className={`p-3 rounded-xl ${act.color} font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-105 shadow-2xs text-center`}
            >
              <Icon className="w-4 h-4" />
              <span className="leading-tight">{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
