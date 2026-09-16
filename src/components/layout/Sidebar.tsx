import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  Award,
  Briefcase,
  GitFork,
  Bell,
  HelpCircle,
  User,
  Settings,
  WifiOff,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Home,
  Database,
  Camera,
  FileText,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ActiveTab } from '../../types';

interface SidebarProps {
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, setIsOpenMobile }) => {
  const { activeTab, setActiveTab, isOffline, setIsOffline, unreadNotificationCount, language, openModal } = useApp();

  const getLabel = (en: string, ta: string, hi: string, te: string, bn: string) => {
    if (language === 'ta') return ta;
    if (language === 'hi') return hi;
    if (language === 'te') return te;
    if (language === 'bn') return bn;
    return en;
  };

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: getLabel('Overview', 'மேலோட்டம்', 'अवलोकन', 'అవలోకనం', 'সংক্ষিপ্ত বিবরণ'), icon: LayoutDashboard },
    { id: 'learning', label: getLabel('My Learning', 'என் கற்றல்', 'मेरी पढ़ाई', 'నా అభ్యాసం', 'আমার শিক্ষা'), icon: BookOpen },
    { id: 'assessments', label: getLabel('Assessments', 'மதிப்பீடுகள்', 'मूल्यांकन', 'మూల్యాంకనాలు', 'মূল্যায়ন'), icon: FileCheck2 },
    { id: 'skills', label: getLabel('My Skills', 'என் திறன்கள்', 'मेरे कौशल', 'నా నైపుణ్యాలు', 'আমার দক্ষতা'), icon: ShieldCheck },
    { id: 'certificates', label: getLabel('Certificates', 'சான்றிதழ்கள்', 'प्रमाणपत्र', 'సర్టిఫికెట్లు', 'সার্টিফিকেট'), icon: Award },
    { id: 'career', label: getLabel('Career Opportunities', 'வேலைவாய்ப்பு', 'करियर', 'ఉపాధి అవకాశాలు', 'ক্যারিয়ার সুবিধা'), icon: Briefcase },
    { id: 'learning_path', label: getLabel('Learning Path', 'கற்றல் பாதை', 'सीखने का मार्ग', 'అభ్యాస మార్గం', 'শেখার পথ'), icon: GitFork },
    { id: 'logistics', label: getLabel('Hostel & Logistics', 'விடுதி & தர்க்கவியல்', 'छात्रावास और लॉजिस्टिक्स', 'హాస్టల్ & లాజిస్టిక్స్', 'হোস্টেল ও আবাসন'), icon: Home },
    { id: 'erp_analytics', label: getLabel('ERP Analytics', 'ERP பகுப்பாய்வு', 'ईआरपी विश्लेषण', 'ERP విశ్లేషణ', 'ERP বিশ্লেষণ'), icon: Database },
    { id: 'notifications', label: getLabel('Notifications', 'அறிவிப்புகள்', 'सूचनाएं', 'నోటిఫికేషన్లు', 'বিজ্ঞপ্তি'), icon: Bell, badge: unreadNotificationCount },
    { id: 'help', label: getLabel('Help & Support', 'உதவி & ஆதரவு', 'सहायता और सहायता', 'సహాయం & మద్దతు', 'সাহায্য ও সহায়তা'), icon: HelpCircle },
  ];

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    setIsOpenMobile(false);
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
        <div className="p-5 border-b border-indigo-900/70 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <ShieldCheck className="w-6 h-6 text-indigo-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">NCCT Connect</span>
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                SIH2026
              </span>
            </div>
            <p className="text-xs text-indigo-300 font-medium tracking-wide">Train. Grow. Connect.</p>
          </div>
        </div>

        {/* Trainee Quick Badge */}
        <div className="mx-4 my-2.5 p-2.5 rounded-lg bg-indigo-900/50 border border-indigo-800/60 flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              alt="Arun Kumar"
              className="w-9 h-9 rounded-full object-cover border-2 border-emerald-400"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-indigo-950" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-white truncate">Arun Kumar</h4>
            <p className="text-[10px] text-indigo-300 truncate font-mono">NCCT-TR-2026-004281</p>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium border border-emerald-500/30">
            Active
          </span>
        </div>

        {/* Specialized Ecosystem Quick Triggers */}
        <div className="px-4 py-1 flex items-center justify-between gap-1 text-[11px]">
          <button
            onClick={() => openModal('face_attendance')}
            className="flex-1 py-1 px-2 rounded bg-indigo-900/80 hover:bg-indigo-800 text-teal-300 font-semibold flex items-center justify-center gap-1 border border-indigo-700/60 transition-colors"
            title="Mark Face ID Attendance"
          >
            <Camera className="w-3 h-3 text-teal-400" />
            <span>Face ID</span>
          </button>

          <button
            onClick={() => openModal('nomination_modal')}
            className="flex-1 py-1 px-2 rounded bg-indigo-900/80 hover:bg-indigo-800 text-emerald-300 font-semibold flex items-center justify-center gap-1 border border-indigo-700/60 transition-colors"
            title="Manage Nominations"
          >
            <FileText className="w-3 h-3 text-emerald-400" />
            <span>Nomination</span>
          </button>

          <button
            onClick={() => openModal('employer_preview')}
            className="flex-1 py-1 px-2 rounded bg-indigo-900/80 hover:bg-indigo-800 text-amber-300 font-semibold flex items-center justify-center gap-1 border border-indigo-700/60 transition-colors"
            title="Employer Recruiter Portal"
          >
            <Building className="w-3 h-3 text-amber-400" />
            <span>Employer</span>
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-3 py-1 text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
            {getLabel('Navigation', 'வழிசெலுத்தல்', 'नेविगेशन', 'నావిగేషన్', 'নেভিগেশন')}
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
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-md shadow-emerald-900/30'
                    : 'text-indigo-200 hover:bg-indigo-900/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-indigo-950 text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
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
              <span>{isOffline ? 'Offline Mode' : 'Online & Synced'}</span>
            </div>
            <span className="text-[10px] underline font-sans text-indigo-300">
              {isOffline ? 'Go Online' : 'Simulate Offline'}
            </span>
          </button>

          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => handleNavClick('profile')}
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-900/60 ${
                activeTab === 'profile' ? 'bg-indigo-900 text-white font-semibold' : ''
              }`}
            >
              <User className="w-4 h-4 text-indigo-400" />
              <span>Profile</span>
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
