import React from 'react';
import { Network, RefreshCw, BookOpen, Users, Gauge } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/i18n';

export const GlobalStatusStrip: React.FC = () => {
  const { isOffline, pendingSyncCount, selectedInstitute, language } = useApp();

  return (
    <div className="bg-slate-900 text-white px-4 lg:px-8 py-2 text-xs border-b border-slate-800 shadow-inner flex items-center justify-between overflow-x-auto gap-4 scrollbar-none">
      <div className="flex items-center gap-6 shrink-0">
        <div className="flex items-center gap-2">
          <Network className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('stripNetwork', language)}</span>
          <span className="font-extrabold text-teal-300">{t('stripConnected', language)}</span>
        </div>

        <div className="flex items-center gap-2">
          <RefreshCw className={`w-3.5 h-3.5 ${isOffline ? 'text-amber-400' : 'text-emerald-400 animate-spin-slow'}`} />
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('stripLiveSync', language)}</span>
          <span className={`font-extrabold ${isOffline ? 'text-amber-300' : 'text-emerald-400'}`}>
            {isOffline ? `Edge Mode (${pendingSyncCount} Pending)` : t('stripHealth', language)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('stripActiveProgs', language)}</span>
          <span className="font-extrabold text-white">42 Active</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('stripEnrolled', language)}</span>
          <span className="font-extrabold text-amber-300">1,284 Enrolled</span>
        </div>

        <div className="flex items-center gap-2">
          <Gauge className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('stripCapacity', language)}</span>
          <span className="font-extrabold text-teal-300">82% Overall</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 shrink-0">
        <span className="text-[10px] text-slate-400">Viewing Scope:</span>
        <span className="px-2 py-0.5 rounded bg-indigo-950 text-teal-300 text-[10px] font-mono font-bold border border-indigo-800">
          {selectedInstitute}
        </span>
      </div>
    </div>
  );
};
