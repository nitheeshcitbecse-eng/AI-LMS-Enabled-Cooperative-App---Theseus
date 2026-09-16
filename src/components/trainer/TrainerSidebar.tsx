import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarCheck,
  FileCheck2,
  GitFork,
  Zap,
  BookOpen,
  ShieldCheck,
  BarChart3,
  Bell,
  HelpCircle,
  User,
  Settings,
  WifiOff,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowLeftRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockTrainer } from '../../data/mockTrainerData';
import type { ActiveTab } from '../../types';

interface TrainerSidebarProps {
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const TrainerSidebar: React.FC<TrainerSidebarProps> = ({ isOpenMobile, setIsOpenMobile }) => {
  const {
    activeTab,
    setActiveTab,
    isOffline,
    setIsOffline,
    unreadNotificationCount,
    language,
    userRole,
    setUserRole,
  } = useApp();

  const getLabel = (en: string, ta: string, hi: string, te: string, bn: string) => {
    if (language === 'ta') return ta;
    if (language === 'hi') return hi;
    if (language === 'te') return te;
    if (language === 'bn') return bn;
    return en;
  };

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'trainer_overview', label: getLabel('Trainer Overview', 'பயிற்றுவிப்பாளர் மேலோட்டம்', 'प्रशिक्षक अवलोकन', 'శిక్షకుల అవలోకనం', 'প্রশিক্ষক বিবরণ'), icon: LayoutDashboard },
    { id: 'trainer_batches', label: getLabel('My Batches', 'என் குழுக்கள்', 'मेरे बैच', 'నా బ్యాచ్‌లు', 'আমার ব্যাচ'), icon: Users },
    { id: 'trainer_trainees', label: getLabel('Trainees Roster', 'பயிற்சியாளர்கள் பட்டியல்', 'प्रशिक्षु सूची', 'శిక్షణార్థుల జాబితా', 'প্রশিক্ষণার্থী তালিকা'), icon: UserCheck },
    { id: 'trainer_attendance', label: getLabel('Attendance Analytics', 'வருகைப் பகுப்பாய்வு', 'उपस्थिति विश्लेषण', 'హాజరు విశ్లేషణ', 'উপস্থিতি বিশ্লেষণ'), icon: CalendarCheck },
    { id: 'trainer_assessments', label: getLabel('Assessments & Heatmap', 'மதிப்பீடுகள் & வெப்பப்படம்', 'मूल्यांकन और हीटमैप', 'మూల్యాంకనాలు & హీట్‌మ్యాప్', 'মূল্যায়ন ও হিটম্যাপ'), icon: FileCheck2 },
    { id: 'trainer_skills', label: getLabel('Batch Skill Gap Map', 'திறன் இடைவெளி வரைபடம்', 'कौशल अंतर मानचित्र', 'నైపుణ్య లోప పటం', 'দক্ষতা গ্যাপ ম্যাপ'), icon: GitFork },
    { id: 'trainer_interventions', label: getLabel('Intervention Center', 'தலையீடு மையம்', 'हस्तक्षेप केंद्र', 'జోక్య కేంద్రం', 'হস্তক্ষেপ কেন্দ্র'), icon: Zap },
    { id: 'trainer_resources', label: getLabel('Teaching Resources', 'கற்பித்தல் வளங்கள்', 'शिक्षण संसाधन', 'బోధనా వనరులు', 'শিক্ষণ সম্পদ'), icon: BookOpen },
    { id: 'trainer_competency', label: getLabel('Competency Verification', 'திறன் சரிபார்ப்பு', 'योग्यता सत्यापन', 'సామర్థ్య ధృవీకరణ', 'যোগ্যতা যাচাইকরণ'), icon: ShieldCheck },
    { id: 'trainer_reports', label: getLabel('Reports & Exports', 'அறிக்கைகள்', 'रिपोर्ट और निर्यात', 'నివేదికలు & ఎగుమతులు', 'রিপোর্ট ও রফতানি'), icon: BarChart3 },
    { id: 'trainer_notifications', label: getLabel('Notifications', 'அறிவிப்புகள்', 'सूचनाएं', 'నోటిఫికేషన్లు', 'বিজ্ঞপ্তি'), icon: Bell, badge: unreadNotificationCount },
  ];

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  const handleSwitchRole = () => {
    setUserRole('trainee');
    setActiveTab('overview');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-indigo-950 text-white flex flex-col border-r border-indigo-900/60 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-indigo-900/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-indigo-950 font-bold">
              <Sparkles className="w-6 h-6 fill-indigo-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white">NCCT Connect</span>
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400 text-indigo-950 font-extrabold">
                  TRAINER
                </span>
              </div>
              <p className="text-xs text-indigo-300 font-medium tracking-wide">Human + AI Ecosystem</p>
            </div>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className="mx-4 my-2.5">
          <button
            onClick={handleSwitchRole}
            className="w-full py-1.5 px-3 rounded-xl bg-indigo-900/80 hover:bg-indigo-900 text-indigo-200 text-xs font-semibold flex items-center justify-between border border-indigo-700/60 transition-colors group"
          >
            <span className="flex items-center gap-2">
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-180 transition-transform duration-300" />
              <span>Switch to Trainee View</span>
            </span>
            <span className="text-[9px] bg-indigo-950 px-2 py-0.5 rounded text-amber-300 font-mono">Arun</span>
          </button>
        </div>

        {/* Trainer Quick Badge */}
        <div className="mx-4 mb-2 p-3 rounded-xl bg-indigo-900/50 border border-indigo-800/60 flex items-center gap-3">
          <div className="relative">
            <img
              src={mockTrainer.avatarUrl}
              alt={mockTrainer.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-indigo-950" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{mockTrainer.name}</h4>
            <p className="text-[10px] text-indigo-300 truncate">{mockTrainer.role}</p>
            <span className="text-[9px] text-teal-300 font-mono block">Batch: {mockTrainer.batch}</span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
          <div className="px-3 py-1 text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
            {getLabel('Trainer Workspace', 'பயிற்றுவிப்பாளர் பணிப்பகுதி', 'प्रशिक्षक कार्यस्थान', 'శిక్షకుల పనిప్రాంతం', 'প্রশিক্ষক কর্মক্ষেত্র')}
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-indigo-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-indigo-200 hover:bg-indigo-900/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-950' : 'text-indigo-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-indigo-950 text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-950 stroke-[3]" />}
              </button>
            );
          })}
        </div>

        {/* Bottom Profile & Settings Footer */}
        <div className="p-3 border-t border-indigo-900/70 bg-indigo-950/80 space-y-2">
          {/* Offline Toggle Quick Button */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              isOffline
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
            }`}
          >
            <div className="flex items-center gap-2">
              {isOffline ? (
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{isOffline ? 'Offline Trainer Mode' : 'Online & Synced'}</span>
            </div>
            <span className="text-[10px] underline font-sans text-indigo-300">
              {isOffline ? 'Go Online' : 'Simulate Offline'}
            </span>
          </button>

          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => handleNavClick('profile')}
              className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-900/60"
            >
              <User className="w-4 h-4 text-indigo-400" />
              <span>Trainer Profile</span>
            </button>
            <button
              onClick={() => handleNavClick('profile')}
              className="p-2 rounded-lg text-indigo-200 hover:bg-indigo-900/60 hover:text-white"
              title="Settings"
            >
              <Settings className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
