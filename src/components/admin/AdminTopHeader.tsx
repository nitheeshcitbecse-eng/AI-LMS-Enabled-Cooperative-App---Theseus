import React from 'react';
import { Search, Globe2, Bell, HelpCircle, Wifi, WifiOff, Menu, ChevronDown, ShieldCheck, Sparkles, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockAdmin, mockNetworkInstitutes } from '../../data/mockAdminData';
import { t } from '../../utils/i18n';

interface AdminTopHeaderProps {
  onOpenMobileSidebar: () => void;
}

export const AdminTopHeader: React.FC<AdminTopHeaderProps> = ({ onOpenMobileSidebar }) => {
  const {
    isOffline,
    openModal,
    unreadNotificationCount,
    language,
    setLanguage,
    selectedInstitute,
    setSelectedInstitute,
    pendingSyncCount,
    syncData,
    isSyncing,
    logout,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-2xs px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left Area: Mobile Menu Toggle & Global Search Command Palette */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar (Triggers Command Palette Modal) */}
        <button
          onClick={() => openModal('global_search')}
          className="w-full max-w-md px-3.5 py-2 rounded-xl bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 text-slate-500 text-xs font-medium flex items-center justify-between transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <span className="truncate">{t('searchPlaceholder', language)}</span>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono font-bold bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
            Ctrl+K
          </span>
        </button>
      </div>

      {/* Right Area: Controls & Indicators */}
      <div className="flex items-center gap-3">
        {/* Network Selector Dropdown */}
        <div className="relative hidden md:block">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/70 border border-indigo-200/80 rounded-xl text-xs font-bold text-indigo-950">
            <Globe2 className="w-3.5 h-3.5 text-indigo-700" />
            <select
              value={selectedInstitute}
              onChange={e => setSelectedInstitute(e.target.value)}
              className="bg-transparent text-xs font-bold text-indigo-950 focus:outline-hidden cursor-pointer"
            >
              <option value="ICM Chennai">ICM Chennai (Host)</option>
              <option value="RICM Hyderabad">RICM Hyderabad</option>
              <option value="RICM Bengaluru">RICM Bengaluru</option>
              <option value="VAMNICOM Pune">VAMNICOM Pune</option>
              <option value="All NCCT Network">All 20 NCCT Institutes</option>
            </select>
          </div>
        </div>

        {/* Connectivity Indicator */}
        <div className="hidden sm:flex items-center">
          {isOffline ? (
            <button
              onClick={syncData}
              disabled={isSyncing}
              className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors"
              title="Click to Sync Edge Records to Cloud"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>{t('edgeActive', language)} ({pendingSyncCount})</span>
            </button>
          ) : (
            <div className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{t('cloudSynced', language)}</span>
            </div>
          )}
        </div>

        {/* 5-Language Selector */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-bold overflow-x-auto">
          {(['en', 'ta', 'hi', 'te', 'bn'] as const).map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-1 rounded-lg transition-all ${
                language === lang ? 'bg-white text-indigo-950 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'ta' ? 'தமிழ்' : lang === 'hi' ? 'हिंदी' : lang === 'te' ? 'తెలుగు' : 'বাংলা'}
            </button>
          ))}
        </div>

        {/* Notifications Icon */}
        <button
          onClick={() => openModal('notifications')}
          className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
          )}
        </button>

        {/* Admin Profile Menu & Logout */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <img
            src={mockAdmin.avatarUrl}
            alt={mockAdmin.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-teal-500"
          />
          <div className="hidden xl:block text-left">
            <span className="text-xs font-extrabold text-slate-900 block leading-tight">{mockAdmin.name}</span>
            <span className="text-[10px] text-slate-500 font-medium">{mockAdmin.role}</span>
          </div>

          <button
            onClick={() => logout()}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span className="hidden sm:inline text-[11px] font-bold text-red-600">{t('signOut', language)}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
