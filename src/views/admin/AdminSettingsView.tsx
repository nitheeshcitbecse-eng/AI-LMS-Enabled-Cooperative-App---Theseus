import React from 'react';
import { Settings, Wifi, WifiOff, RefreshCw, CheckCircle2, Server, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSettingsView: React.FC = () => {
  const { isOffline, setIsOffline, isSyncing, syncData, pendingSyncCount, lastSyncedTime } = useApp();

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Institution Settings & Rural Edge Gateway</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              Hardware + Software Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage local institution parameters, edge server connectivity, and offline database synchronization.
          </p>
        </div>
      </div>

      {/* SECTION 19 — RURAL EDGE CONNECTIVITY HARDWARE PANEL */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-700" />
              <h2 className="text-base font-extrabold text-slate-900">Rural Edge Connectivity Gateway</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isOffline ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {isOffline ? '● EDGE MODE ACTIVE' : '● CLOUD SYNCED'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Local training operations continue seamlessly even during internet disruption in rural centers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                isOffline
                  ? 'bg-amber-50 text-amber-900 border-amber-400 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-400 hover:bg-emerald-100'
              }`}
            >
              {isOffline ? 'Go Online' : 'Simulate Offline Mode'}
            </button>
          </div>
        </div>

        {/* Sync Animation Banner */}
        {isOffline && (
          <div className="bg-amber-500/10 border border-amber-500/40 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950">
            <div className="flex items-center gap-3">
              <WifiOff className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h3 className="text-xs font-bold text-slate-900">EDGE MODE ACTIVE — Disconnected from Central Cloud</h3>
                <p className="text-[11px] text-slate-700">
                  Training operations continue locally. {pendingSyncCount} records will sync automatically when connectivity returns.
                </p>
              </div>
            </div>

            <button
              onClick={syncData}
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors shrink-0 shadow-2xs flex items-center gap-1.5"
            >
              {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
              <span>{isSyncing ? 'Synchronising 27 Records...' : 'Sync Now'}</span>
            </button>
          </div>
        )}

        {/* Hardware Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">QR Attendance Device</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs text-slate-500 block">● Online & Local Synced</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Training Kiosk Node</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs text-slate-500 block">● Online & Operational</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Local Learning Server</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs text-slate-500 block">● Online • 34% Local Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
