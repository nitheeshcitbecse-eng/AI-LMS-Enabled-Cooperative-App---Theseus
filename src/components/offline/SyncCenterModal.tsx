import React from 'react';
import { X, Wifi, WifiOff, RefreshCw, HardDrive } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SyncCenterModal: React.FC = () => {
  const { activeModal, closeModal, isOffline, setIsOffline, isSyncing, syncData, pendingSyncCount, lastSyncedTime } = useApp();

  if (activeModal !== 'sync_center') return null;

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
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
            isOffline ? 'bg-amber-500' : 'bg-emerald-600'
          }`}>
            {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">NCCT Rural Offline Sync Center</h3>
            <p className="text-xs text-slate-500">IndexedDB local storage & background synchronization</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border space-y-2 text-xs ${
          isOffline
            ? 'bg-amber-50/80 border-amber-200 text-amber-900'
            : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
        }`}>
          <div className="flex items-center justify-between font-bold">
            <span>{isOffline ? 'Status: Offline Mode Active' : 'Status: Connected & Synchronized'}</span>
            <span className="text-[10px] uppercase bg-white px-2 py-0.5 rounded border border-current">
              {isOffline ? 'Local DB' : 'Cloud Ledger Live'}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {isOffline
              ? 'You are currently offline. Your progress will be stored securely in local browser storage and synchronised when you reconnect.'
              : `All offline learning logs, assessments, and attendance records are fully synchronized with the NCCT Central Server. Last synced: ${lastSyncedTime}.`}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Locally Cached Data Items</span>
            <span className="text-indigo-900">{pendingSyncCount} Pending Sync</span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-indigo-600" /> Cooperative Finance Progress
              </span>
              <span className="text-[10px] text-slate-500 font-mono">72% Progress</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-indigo-600" /> Assessment 6 Attempt
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Score: 74%</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-indigo-600" /> Daily Biometric Attendance Log
              </span>
              <span className="text-[10px] text-slate-500 font-mono">16 Sep Present</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsOffline(!isOffline)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            Toggle {isOffline ? 'Online Mode' : 'Offline Mode'}
          </button>

          <button
            onClick={syncData}
            disabled={isSyncing || (!isOffline && pendingSyncCount === 0)}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronizing Data...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
