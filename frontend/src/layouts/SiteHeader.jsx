import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Bell,
  Globe,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LogOut,
  Check,
  User,
  Settings,
  WifiOff,
  RefreshCw,
  ArrowLeftRight,
  Camera,
  FileText,
  Building,
  Globe2,
  Sliders,
} from 'lucide-react';
import { useApp, useData } from '../context/SystemStateContext';
import { t } from '../utils/i18n';
import { getRoleNav, findNavPosition } from './navConfig';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
];

/** Closes a popover on outside click or Escape. */
const useDismiss = (open, close) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target )) close();
    };
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);
  return ref;
};

export const SiteHeader = () => {
  const { trainee: traineeData, trainer: trainerData, admin: adminData } = useData();
  const {
    activeTab,
    setActiveTab,
    userRole,
    setUserRole,
    language,
    setLanguage,
    isOffline,
    setIsOffline,
    isSyncing,
    syncData,
    lastSyncedTime,
    pendingSyncCount,
    unreadNotificationCount,
    setIsAiDrawerOpen,
    openModal,
    logout,
    demoMode,
    setDemoMode,
    selectedInstitute,
    setSelectedInstitute,
  } = useApp();

  const nav = getRoleNav(userRole, language);
  const position = findNavPosition(nav, activeTab);

  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const closeMenu = React.useCallback(() => setOpenMenu(null), []);
  const navRef = useDismiss(openMenu !== null, closeMenu);

  const go = (id) => {
    setActiveTab(id);
    setOpenMenu(null);
    setIsMobileOpen(false);
  };
  const toggle = (key) => setOpenMenu(current => (current === key ? null : key));

  const person =
    userRole === 'admin'
      ? { name: adminData.name, subtitle: adminData.role, avatar: adminData.avatarUrl }
      : userRole === 'trainer'
      ? { name: trainerData.name, subtitle: `Batch ${trainerData.batch} · ${trainerData.batchSize} Trainees`, avatar: trainerData.avatarUrl }
      : { name: traineeData.name, subtitle: 'Trainee', avatar: traineeData.avatarUrl };

  const openNotifications = () => {
    setOpenMenu(null);
    if (userRole === 'admin') openModal('notifications');
    else setActiveTab(userRole === 'trainer' ? 'trainer_notifications' : 'notifications');
  };

  const switchPersona = () => {
    setOpenMenu(null);
    setIsMobileOpen(false);
    if (userRole === 'admin') {
      setUserRole('trainee');
      setActiveTab('overview');
    } else if (userRole === 'trainer') {
      setUserRole('trainee');
      setActiveTab('overview');
    }
  };

  const traineeServices = [
    { id: 'face_attendance', label: 'Face ID Attendance', icon: Camera },
    { id: 'nomination_modal', label: 'Manage Nominations', icon: FileText },
    { id: 'employer_preview', label: 'Employer Recruiter Portal', icon: Building },
  ];

  const isGroupActive = (group) =>
    group.item ? group.item.id === activeTab : !!group.items?.some(x => x.id === activeTab);

  /* ------------------------------------------------------------------ */

  const syncStatus = isOffline ? (
    <span className="flex items-center gap-2 text-[13px]">
      <WifiOff className="w-3.5 h-3.5 text-amber-300" />
      <span className="hidden md:inline text-white/90">Offline mode</span>
      <button
        onClick={syncData}
        disabled={isSyncing}
        className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 text-white text-xs font-semibold disabled:opacity-60 flex items-center gap-1"
      >
        {isSyncing && <RefreshCw className="w-3 h-3 animate-spin" />}
        {isSyncing ? 'Syncing…' : `Sync (${pendingSyncCount})`}
      </button>
    </span>
  ) : (
    <span className="flex items-center gap-2 text-[13px]">
      <span className="ncct-live-dot text-emerald-300 w-1.5 h-1.5" />
      <span className="hidden md:inline text-white/90">
        {userRole === 'admin' ? t('cloudSynced', language) : `Synced ${lastSyncedTime}`}
      </span>
      <button
        onClick={() => setIsOffline(true)}
        className="hidden sm:inline text-xs text-white/70 hover:text-white underline-offset-2 hover:underline"
        title="Simulate Rural Offline Mode"
      >
        Simulate offline
      </button>
    </span>
  );

  return (
    <header className="sticky top-0 z-40 shadow-[0_1px_0_var(--ncct-border)]" ref={navRef}>
      {/* ---------------- Brand bar ---------------- */}
      <div className="bg-indigo-800 text-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsMobileOpen(o => !o)}
              className="lg:hidden p-2 -ml-2 rounded text-white hover:bg-white/10"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button onClick={() => go(nav.home)} className="flex items-center gap-3 min-w-0 text-left">
              <span className="ncct-wordmark text-[26px] leading-none text-white">NCCT</span>
              <span className="w-px h-7 bg-white/40" />
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold tracking-wide uppercase leading-tight">Connect</span>
                <span className="hidden sm:block text-xs text-white/75 leading-tight truncate">{nav.portalName}</span>
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <div className="hidden sm:flex">{syncStatus}</div>

            {/* Language */}
            <div className="relative">
              <button
                onClick={() => toggle('lang')}
                aria-expanded={openMenu === 'lang'}
                aria-haspopup="menu"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[13px] text-white hover:bg-white/10"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden md:inline">{languages.find(l => l.code === language)?.native}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === 'lang' ? 'rotate-180' : ''}`} />
              </button>
              {openMenu === 'lang' && (
                <div role="menu" className="ncct-menu right-0 w-48">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      role="menuitem"
                      onClick={() => {
                        setLanguage(lang.code);
                        setOpenMenu(null);
                      }}
                      className={`ncct-menu-item justify-between ${language === lang.code ? 'text-indigo-700 font-semibold bg-indigo-50' : ''}`}
                    >
                      <span className="flex items-center gap-2">
                        {language === lang.code ? <Check className="w-3.5 h-3.5" /> : <span className="w-3.5" />}
                        {lang.name}
                      </span>
                      <span className="text-xs text-slate-400">{lang.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button
              onClick={openNotifications}
              className="relative p-2 rounded text-white hover:bg-white/10"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-amber-400 text-indigo-950 text-[10px] font-bold flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Account */}
            <div className="relative">
              <button
                onClick={() => toggle('account')}
                aria-expanded={openMenu === 'account'}
                aria-haspopup="menu"
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded hover:bg-white/10"
              >
                <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-white/40" />
                <span className="hidden xl:block text-left">
                  <span className="block text-[13px] font-semibold leading-tight">{person.name}</span>
                  <span className="block text-xs text-white/70 leading-tight">{person.subtitle}</span>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-white/80" />
              </button>
              {openMenu === 'account' && (
                <div role="menu" className="ncct-menu right-0 w-72">
                  <div className="px-3 py-3 flex items-center gap-3 border-b border-slate-100 mb-1">
                    <img src={person.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{person.name}</p>
                      <p className="text-xs text-slate-500 truncate">{person.subtitle}</p>
                      {userRole === 'admin' && (
                        <p className="text-xs text-slate-500 truncate">
                          {adminData.instituteName} · <span className="font-mono">{adminData.adminId}</span>
                        </p>
                      )}
                      {userRole === 'trainee' && <p className="text-xs text-slate-500 font-mono">NCCT-TR-2026-004281</p>}
                    </div>
                  </div>
                  <button role="menuitem" onClick={() => go('profile')} className="ncct-menu-item">
                    <User className="w-4 h-4 text-slate-400" /> {userRole === 'trainer' ? 'Trainer Profile' : 'Profile'}
                  </button>
                  <button role="menuitem" onClick={() => go(userRole === 'admin' ? 'admin_settings' : 'profile')} className="ncct-menu-item">
                    <Settings className="w-4 h-4 text-slate-400" /> Settings
                  </button>
                  <button
                    role="menuitem"
                    onClick={() => {
                      setIsOffline(!isOffline);
                      setOpenMenu(null);
                    }}
                    className="ncct-menu-item"
                  >
                    <WifiOff className="w-4 h-4 text-slate-400" /> {isOffline ? 'Go online' : 'Simulate offline mode'}
                  </button>
                  {userRole !== 'trainee' && (
                    <button role="menuitem" onClick={switchPersona} className="ncct-menu-item">
                      <ArrowLeftRight className="w-4 h-4 text-slate-400" />
                      {userRole === 'admin' ? 'Switch view persona' : 'Switch to Trainee View'}
                    </button>
                  )}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      role="menuitem"
                      onClick={() => {
                        setOpenMenu(null);
                        logout();
                      }}
                      className="ncct-menu-item text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> {userRole === 'admin' ? t('signOut', language) : 'Sign out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Primary navigation ---------------- */}
      <div className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-4">
          <nav className="hidden lg:flex items-stretch h-full -ml-3" aria-label="Primary">
            {nav.groups.map(group => {
              const active = isGroupActive(group);
              if (group.item) {
                const item = group.item;
                return (
                  <button
                    key={group.key}
                    onClick={() => go(item.id)}
                    data-active={active}
                    className="ncct-topnav-link"
                  >
                    {group.label}
                  </button>
                );
              }
              return (
                <div key={group.key} className="relative flex">
                  <button
                    onClick={() => toggle(group.key)}
                    aria-expanded={openMenu === group.key}
                    aria-haspopup="menu"
                    data-active={active}
                    className="ncct-topnav-link gap-1"
                  >
                    {group.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === group.key ? 'rotate-180' : ''}`} />
                  </button>
                  {openMenu === group.key && (
                    <div role="menu" className="ncct-menu left-0 w-72 top-[calc(100%-2px)]">
                      {group.items.map(item => {
                        const Icon = item.icon;
                        const current = item.id === activeTab;
                        return (
                          <button
                            key={item.id}
                            role="menuitem"
                            onClick={() => go(item.id)}
                            className={`ncct-menu-item ${current ? 'bg-indigo-50 text-indigo-700 font-semibold' : ''}`}
                          >
                            <Icon className={`w-4 h-4 ${current ? 'text-indigo-600' : 'text-slate-400'}`} />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile: show where you are */}
          <div className="lg:hidden min-w-0 text-[15px] font-semibold text-slate-900 truncate">
            {position?.item.label}
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            {userRole === 'admin' ? (
              <button
                onClick={() => openModal('global_search')}
                className="hidden md:flex items-center gap-2 w-56 xl:w-64 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200/70 text-slate-500 text-sm"
              >
                <Search className="w-4 h-4" />
                <span className="flex-1 text-left truncate">{t('searchPlaceholder', language)}</span>
                <kbd className="text-[10px] font-mono bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">Ctrl K</kbd>
              </button>
            ) : (
              <label className="hidden md:flex items-center gap-2 w-52 xl:w-64 px-3 py-2 rounded-full bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500 text-sm">
                <Search className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={userRole === 'trainer' ? 'Search trainees, skill gaps…' : 'Search courses, skills…'}
                  className="w-full bg-transparent text-slate-800 placeholder:text-slate-500 focus:outline-none"
                />
              </label>
            )}

            {/* Role-specific controls */}
            {userRole === 'trainee' && (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => toggle('services')}
                  aria-expanded={openMenu === 'services'}
                  className="ncct-btn-secondary"
                >
                  Quick services <ChevronDown className="w-4 h-4" />
                </button>
                {openMenu === 'services' && (
                  <div role="menu" className="ncct-menu right-0 w-64">
                    {traineeServices.map(s => {
                      const Icon = s.icon;
                      return (
                        <button
                          key={s.id}
                          role="menuitem"
                          onClick={() => {
                            setOpenMenu(null);
                            openModal(s.id);
                          }}
                          className="ncct-menu-item"
                        >
                          <Icon className="w-4 h-4 text-slate-400" /> {s.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {userRole === 'trainer' && (
              <div className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-slate-100 text-xs" title="Presentation demo mode">
                <Sliders className="w-3.5 h-3.5 text-slate-500 mx-1.5" />
                <button
                  onClick={() => setDemoMode('before')}
                  className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap ${demoMode === 'before' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Before · 48%
                </button>
                <button
                  onClick={() => setDemoMode('after')}
                  className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap ${demoMode === 'after' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  After · 74%
                </button>
              </div>
            )}

            {userRole === 'admin' && (
              <label className="relative hidden xl:flex items-center gap-1.5 pl-3 pr-8 py-2 rounded-full border border-slate-300 hover:border-slate-400 text-sm">
                <Globe2 className="w-4 h-4 text-slate-500" />
                <select
                  value={selectedInstitute}
                  onChange={e => setSelectedInstitute(e.target.value)}
                  className="appearance-none bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="ICM Chennai">ICM Chennai (Host)</option>
                  <option value="RICM Hyderabad">RICM Hyderabad</option>
                  <option value="RICM Bengaluru">RICM Bengaluru</option>
                  <option value="VAMNICOM Pune">VAMNICOM Pune</option>
                  <option value="All NCCT Network">All 20 NCCT Institutes</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 pointer-events-none" />
              </label>
            )}

            <button onClick={() => setIsAiDrawerOpen(true)} className="ncct-btn-primary">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">NCCT AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile menu ---------------- */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 max-h-[calc(100vh-7rem)] overflow-y-auto shadow-lg animate-in fade-in duration-200">
          <div className="px-4 py-3 space-y-4">
            <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 sm:hidden">
              <span className="text-sm text-slate-600">{isOffline ? 'Offline mode' : `Synced ${lastSyncedTime}`}</span>
              <button
                onClick={() => (isOffline ? syncData() : setIsOffline(true))}
                className="text-sm font-semibold text-indigo-700"
              >
                {isOffline ? `Sync (${pendingSyncCount})` : 'Simulate offline'}
              </button>
            </div>
            {nav.groups.map(group => (
              <div key={group.key}>
                {group.items && (
                  <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{group.label}</p>
                )}
                {(group.items ?? [group.item]).map(item => {
                  const Icon = item.icon;
                  const current = item.id === activeTab;
                  return (
                    <button
                      key={item.id}
                      onClick={() => go(item.id)}
                      className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-md text-[15px] ${
                        current ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" /> {item.label}
                    </button>
                  );
                })}
              </div>
            ))}
            {userRole === 'trainee' && (
              <div>
                <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Quick services</p>
                {traineeServices.map(s => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setIsMobileOpen(false);
                        openModal(s.id);
                      }}
                      className="w-full flex items-center gap-3 px-2 py-2.5 rounded-md text-[15px] text-slate-700 hover:bg-slate-50"
                    >
                      <Icon className="w-4 h-4" /> {s.label}
                    </button>
                  );
                })}
              </div>
            )}
            {userRole === 'trainer' && (
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm text-slate-500">Demo mode</span>
                <button onClick={() => setDemoMode('before')} className={`px-3 py-1 rounded-full text-xs font-semibold ${demoMode === 'before' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Before · 48%</button>
                <button onClick={() => setDemoMode('after')} className={`px-3 py-1 rounded-full text-xs font-semibold ${demoMode === 'after' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>After · 74%</button>
              </div>
            )}
            {userRole === 'admin' && (
              <select
                value={selectedInstitute}
                onChange={e => setSelectedInstitute(e.target.value)}
                className="w-full px-3 py-2.5 rounded-md border border-slate-300 text-sm bg-white"
              >
                <option value="ICM Chennai">ICM Chennai (Host)</option>
                <option value="RICM Hyderabad">RICM Hyderabad</option>
                <option value="RICM Bengaluru">RICM Bengaluru</option>
                <option value="VAMNICOM Pune">VAMNICOM Pune</option>
                <option value="All NCCT Network">All 20 NCCT Institutes</option>
              </select>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
