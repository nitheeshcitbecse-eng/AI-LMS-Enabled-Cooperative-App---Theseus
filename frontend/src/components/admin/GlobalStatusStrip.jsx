import React from 'react';
import { Network, RefreshCw, BookOpen, Users, Gauge } from 'lucide-react';
import { useApp } from '../../context/SystemStateContext';
import { t } from '../../utils/i18n';

export const GlobalStatusStrip = () => {
  const { isOffline, pendingSyncCount, selectedInstitute, language } = useApp();

  // Label/value pairs read as a single row of telemetry; the value carries the
  // colour, the label stays neutral so the row does not turn into a rainbow.
  const metrics

 = [
    {
      icon: Network,
      label: t('stripNetwork', language),
      value: t('stripConnected', language),
      tone: 'text-indigo-700',
      iconTone: 'text-indigo-500',
    },
    {
      icon: RefreshCw,
      label: t('stripLiveSync', language),
      value: isOffline ? `Edge Mode (${pendingSyncCount} Pending)` : t('stripHealth', language),
      tone: isOffline ? 'text-amber-700' : 'text-emerald-700',
      iconTone: isOffline ? 'text-amber-500' : 'text-emerald-500',
    },
    {
      icon: BookOpen,
      label: t('stripActiveProgs', language),
      value: '42 Active',
      tone: 'text-slate-900',
      iconTone: 'text-slate-400',
    },
    {
      icon: Users,
      label: t('stripEnrolled', language),
      value: '1,284 Enrolled',
      tone: 'text-slate-900',
      iconTone: 'text-slate-400',
    },
    {
      icon: Gauge,
      label: t('stripCapacity', language),
      value: '82% Overall',
      tone: 'text-indigo-700',
      iconTone: 'text-indigo-500',
    },
  ];

  return (
    <div className="bg-indigo-50/70 border-b border-indigo-100 text-[13px]"><div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between overflow-x-auto gap-6 scrollbar-none">
      <div className="flex items-center shrink-0">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          const isSpinning = metric.icon === RefreshCw && !isOffline;
          return (
            <div
              key={metric.label}
              className={`flex items-center gap-2 px-4 ${i > 0 ? 'border-l border-indigo-100' : 'pl-0'}`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${metric.iconTone} ${isSpinning ? 'animate-spin-slow' : ''}`} />
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {metric.label}
              </span>
              <span className={`font-medium whitespace-nowrap ${metric.tone}`}>{metric.value}</span>
            </div>
          );
        })}
      </div>

      <div className="hidden 2xl:flex items-center gap-2 shrink-0">
        <span className="text-xs text-slate-500">Viewing scope</span>
        <span className="px-2 py-0.5 rounded-full bg-white text-indigo-700 text-xs font-semibold ring-1 ring-indigo-200">
          {selectedInstitute}
        </span>
      </div>
    </div>
    </div>
  );
};
