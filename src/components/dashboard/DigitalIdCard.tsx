import React from 'react';
import { QrCode, ShieldCheck, ExternalLink, Building2, User, Sparkles } from 'lucide-react';
import { mockTrainee } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const DigitalIdCard: React.FC = () => {
  const { openModal, setActiveTab } = useApp();

  return (
    <div className="ncct-card relative overflow-hidden p-5 flex flex-col justify-between border-l-4 border-l-indigo-700">
      {/* Background Seal Watermark Visual */}
      <div className="absolute top-2 right-2 opacity-5 pointer-events-none">
        <ShieldCheck className="w-40 h-40 text-indigo-900" />
      </div>

      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-900 text-emerald-400 flex items-center justify-center font-bold text-xs">
              NCCT
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">NCCT Digital Identity</h3>
              <p className="text-[10px] text-slate-500">Ministry of Cooperation</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Verified</span>
          </span>
        </div>

        {/* Trainee Details */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={mockTrainee.avatarUrl}
              alt={mockTrainee.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-100 shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 bg-indigo-900 text-white rounded-full p-0.5 border border-white">
              <User className="w-3 h-3" />
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-bold text-slate-900 leading-tight">{mockTrainee.name}</h4>
            <div className="inline-block font-mono text-[11px] font-semibold bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded border border-indigo-100">
              {mockTrainee.digitalId}
            </div>

            <div className="text-[11px] text-slate-600 pt-1 space-y-0.5">
              <p className="flex items-center gap-1.5 truncate">
                <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="font-medium text-slate-700">{mockTrainee.institute}</span>
              </p>
              <p className="text-slate-500 truncate text-[10px]">
                Batch: {mockTrainee.batch}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => openModal('qr_verify')}
          className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition-colors text-left group"
        >
          {/* Simulated QR Visual */}
          <div className="w-8 h-8 rounded bg-white border border-slate-300 p-0.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <QrCode className="w-full h-full text-indigo-900" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-indigo-950 block group-hover:text-indigo-600">
              Verify NCCT Profile
            </span>
            <span className="text-[9px] text-slate-500 block">Scan to check credential ledger</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1 transition-colors border border-indigo-100"
        >
          <span>View Profile</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
