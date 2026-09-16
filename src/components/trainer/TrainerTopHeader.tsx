import React, { useState } from 'react';
import {
  Search,
  Wifi,
  WifiOff,
  RefreshCw,
  Bell,
  Globe,
  Menu,
  ChevronDown,
  Sparkles,
  Users,
  Sliders,
  ArrowLeftRight,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockTrainer } from '../../data/mockTrainerData';
import type { Language } from '../../types';

interface TrainerTopHeaderProps {
  onOpenMobileSidebar: () => void;
}

export const TrainerTopHeader: React.FC<TrainerTopHeaderProps> = ({ onOpenMobileSidebar }) => {
  const {
    isOffline,
    setIsOffline,
    isSyncing,
    syncData,
    lastSyncedTime,
    pendingSyncCount,
    language,
    setLanguage,
    unreadNotificationCount,
    setActiveTab,
    setIsAiDrawerOpen,
    userRole,
    setUserRole,
    demoMode,
    setDemoMode,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const languages: { code: Language; name: string; native: string }[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden focus:outline-hidden"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-extrabold text-slate-900 leading-tight">Trainer Overview</h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold border border-amber-300">
              Dr. Priya Raman
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Batch: {mockTrainer.batch} • {mockTrainer.batchSize} Trainees
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative hidden md:block w-64 lg:w-80 ml-2">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search trainees, skill gaps, assessments..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Hackathon Demo Toggle, Sync Status, Language, Notifications, Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Hackathon Live Presentation Demo Mode Switcher */}
        <div className="hidden xl:flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 px-2 flex items-center gap-1">
            <Sliders className="w-3 h-3 text-indigo-600" /> Hackathon Demo Mode:
          </span>
          <button
            onClick={() => setDemoMode('before')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
              demoMode === 'before'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pre-Intervention (48%)
          </button>
          <button
            onClick={() => setDemoMode('after')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
              demoMode === 'after'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Post-Intervention (74% Verified)
          </button>
        </div>

        {/* AI Assistant Quick Trigger */}
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          <span>NCCT AI</span>
        </button>

        {/* Connectivity & Sync Indicator */}
        <div className="flex items-center gap-2">
          {isOffline ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="hidden sm:inline">Offline Mode</span>
              <button
                onClick={syncData}
                disabled={isSyncing}
                className="ml-1 text-[11px] underline font-semibold hover:text-amber-900"
              >
                {isSyncing ? 'Syncing...' : `Sync (${pendingSyncCount})`}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline">Synced {lastSyncedTime}</span>
            </div>
          )}

          {isSyncing && (
            <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
          )}
        </div>

        {/* Language Selector */}
        <div className="relative group">
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="uppercase font-semibold text-slate-800">{language}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg hidden group-hover:block z-50 py-1">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${
                  language === lang.code ? 'font-semibold text-amber-700 bg-amber-50/50' : 'text-slate-700'
                }`}
              >
                <span>{lang.name}</span>
                <span className="text-[10px] text-slate-400">{lang.native}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Bell */}
        <button
          onClick={() => setActiveTab('trainer_notifications')}
          className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-hidden"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
          )}
        </button>

        {/* Role Switcher Pill (Quick) */}
        <button
          onClick={() => { setUserRole('trainee'); setActiveTab('overview'); }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 text-white hover:bg-indigo-900 text-xs font-bold transition-colors shadow-2xs"
          title="Switch to Trainee View (Arun Kumar)"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
          <span>Trainee View</span>
        </button>

        {/* Trainer Profile Avatar & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 text-left hover:opacity-90 focus:outline-hidden"
          >
            <img
              src={mockTrainer.avatarUrl}
              alt={mockTrainer.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-amber-400 ring-2 ring-amber-100"
            />
          </button>

          <button
            onClick={() => useApp().logout()}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Sign Out to Role Selection"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
