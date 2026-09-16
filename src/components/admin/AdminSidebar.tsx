import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  UserCheck,
  CalendarDays,
  Gauge,
  Building2,
  Truck,
  UsersRound,
  GraduationCap,
  BarChart3,
  BadgeCheck,
  GitFork,
  Compass,
  FileSpreadsheet,
  Network,
  Settings,
  Sparkles,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  WifiOff,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockAdmin } from '../../data/mockAdminData';
import type { ActiveTab, UserRole } from '../../types';

interface AdminSidebarProps {
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpenMobile, setIsOpenMobile }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const {
    activeTab,
    setActiveTab,
    isOffline,
    setIsOffline,
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

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; category?: string }[] = [
    { id: 'admin_overview', label: getLabel('Executive Overview', 'செயல்பாட்டு மேலோட்டம்', 'कार्यकारी अवलोकन', 'కార్యనిర్వాహక అవలోకనం', 'কার্যনির্বাহী বিবরণ'), icon: LayoutDashboard },
    { id: 'admin_programmes', label: getLabel('Programmes', 'பயிற்சி திட்டங்கள்', 'कार्यक्रम', 'శిక్షణ కార్యక్రమాలు', 'প্রশিক্ষণ কর্মসূচী'), icon: BookOpen },
    { id: 'admin_nominations', label: getLabel('Nominations Control', 'பரிந்துரை கட்டுப்பாடு', 'नामांकन नियंत्रण', 'నామినేషన్ నియంత్రణ', 'মনোনয়ন নিয়ন্ত্রণ'), icon: UserCheck },
    { id: 'admin_timetable', label: getLabel('Smart Timetable', 'அறிவார்ந்த அட்டவணை', 'स्मार्ट समय सारणी', 'స్మార్ట్ టైమ్‌టేబుల్', 'স্মার্ট সময়সূচী'), icon: CalendarDays },
    { id: 'admin_capacity', label: getLabel('Capacity & Resources', 'திறன் & வளங்கள்', 'क्षमता और संसाधन', 'సామర్థ్యం & వనరులు', 'ক্ষমতা ও সম্পদ'), icon: Gauge },
    { id: 'admin_hostel', label: getLabel('Hostel & Accommodation', 'விடுதி & தங்குமிடம்', 'छात्रावास और आवास', 'హాస్టల్ & వసతి', 'হোস্টেল ও আবাসন'), icon: Building2 },
    { id: 'admin_logistics', label: getLabel('Training Logistics', 'பயிற்சி தளவாடங்கள்', 'प्रशिक्षण रसद', 'శిక్షణ లాజిస్టిక్స్', 'প্রশিক্ষণ সরবরাহ'), icon: Truck },
    { id: 'admin_trainers', label: getLabel('Trainer Capacity', 'பயிற்றுவிப்பாளர் திறன்', 'प्रशिक्षक क्षमता', 'శిక్షకుల సామర్థ్యం', 'প্রশিক্ষক ক্ষমতা'), icon: UsersRound },
    { id: 'admin_trainees', label: getLabel('Trainees Operations', 'பயிற்சியாளர்கள் செயல்பாடுகள்', 'प्रशिक्षु संचालन', 'శిక్షణార్థుల నిర్వహణ', 'প্রশিক্ষণার্থী পরিচালনা'), icon: GraduationCap },
    { id: 'admin_analytics', label: getLabel('Learning Analytics', 'கற்றல் பகுப்பாய்வு', 'सीखने का विश्लेषण', 'అభ్యాస విశ్లేషణ', 'শেখার বিশ্লেষণ'), icon: BarChart3 },
    { id: 'admin_certification', label: getLabel('Certification Pipeline', 'சான்றிதழ் குழாய்', 'प्रमाणन पाइपलाइन', 'ధృవీకరణ వ్యవస్థ', 'সার্টিফিকেশন পাইপলাইন'), icon: BadgeCheck },
    { id: 'admin_skills', label: getLabel('Skill Intelligence', 'திறன் நுண்ணறிவு', 'कौशल बुद्धिमत्ता', 'నైపుణ్య ఇంటెలిజెన్స్', 'দক্ষতা বুদ্ধিমত্তা'), icon: GitFork },
    { id: 'admin_outreach', label: getLabel('Outreach Intelligence', 'வெளியெல்லை நுண்ணறிவு', 'आउटरीच इंटेलिजेंस', 'ఔట్‌రీచ్ ఇంటెலிజెన్స్', 'আউটরিচ ইন্টেলিজেন্স'), icon: Compass },
    { id: 'admin_reports', label: getLabel('Reports & Monitoring', 'அறிக்கைகள் & கண்காணிப்பு', 'रिपोर्ट और निगरानी', 'నివేదికలు & పర్యవేక్షణ', 'রিপোর্ট ও মনিটরিং'), icon: FileSpreadsheet },
    { id: 'admin_network', label: getLabel('NCCT Network Map', 'NCCT நெட்வொர்க்', 'NCCT नेटवर्क', 'NCCT నెట్‌వర్క్', 'NCCT নেটওয়ার্ক'), icon: Network },
    { id: 'admin_settings', label: getLabel('Settings & Edge Mode', 'அமைப்புகள்', 'सेटिंग्स', 'సెట్టింగ్‌లు', 'সেটিংস'), icon: Settings },
  ];

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  const handleRoleCycle = () => {
    if (userRole === 'admin') setUserRole('trainee');
    else if (userRole === 'trainee') setUserRole('trainer');
    else setUserRole('admin');

    if (userRole === 'admin') setActiveTab('overview');
    else if (userRole === 'trainee') setActiveTab('trainer_overview');
    else setActiveTab('admin_overview');
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
        className={`fixed top-0 left-0 bottom-0 z-50 bg-indigo-950 text-white flex flex-col border-r border-indigo-900/60 shadow-xl transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 w-72' : isCollapsed ? 'w-20 -translate-x-full lg:translate-x-0' : 'w-72 -translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-indigo-900/70 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-teal-500/20 text-indigo-950 font-bold shrink-0">
              <Sparkles className="w-6 h-6 fill-indigo-950" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white truncate">NCCT Connect</span>
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-400 text-indigo-950 font-black shrink-0">
                    INSTITUTION
                  </span>
                </div>
                <p className="text-[11px] text-indigo-300 font-medium tracking-wide truncate">One Network. Smarter Training.</p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-900/60 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* 3-Way Role Switcher Pill */}
        <div className="mx-3 my-2.5">
          <button
            onClick={handleRoleCycle}
            className={`w-full py-1.5 px-3 rounded-xl bg-indigo-900/80 hover:bg-indigo-900 text-indigo-200 text-xs font-semibold flex items-center border border-indigo-700/60 transition-colors group ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
            title="Switch Persona Role"
          >
            <span className="flex items-center gap-2">
              <ArrowLeftRight className="w-3.5 h-3.5 text-teal-400 group-hover:rotate-180 transition-transform duration-300" />
              {!isCollapsed && <span>Switch View Persona</span>}
            </span>
            {!isCollapsed && (
              <span className="text-[9px] bg-teal-400 text-indigo-950 px-2 py-0.5 rounded font-extrabold uppercase">
                ADMIN
              </span>
            )}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1 scrollbar-thin">
          {!isCollapsed && (
            <div className="px-3 py-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
              {getLabel('Institutional Operations', 'நிறுவன செயல்பாடுகள்', 'संस्थागत संचालन', 'సంస్థాగత కార్యకలాపాలు', 'প্রাতিষ্ঠানিক ক্রিয়াকলাপ')}
            </div>
          )}

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-indigo-950 font-bold shadow-md shadow-teal-500/20'
                    : 'text-indigo-200 hover:bg-indigo-900/60 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-950' : 'text-indigo-400'}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Institution Badge & Profile Footer */}
        <div className="p-3 border-t border-indigo-900/70 bg-indigo-950/90 space-y-2">
          {!isCollapsed && (
            <div className="p-2.5 rounded-xl bg-indigo-900/40 border border-indigo-800/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">{mockAdmin.instituteName}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Status: Operational" />
              </div>
              <p className="text-[10px] font-mono text-teal-300">ID: {mockAdmin.adminId}</p>
              <p className="text-[10px] text-indigo-300">Admin: {mockAdmin.name}</p>
            </div>
          )}

          {/* Offline Toggle Button */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`w-full flex items-center px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
              isOffline
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
          >
            <div className="flex items-center gap-2">
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              {!isCollapsed && <span>{isOffline ? 'Edge Mode Active' : 'Cloud Synced'}</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[9px] underline text-indigo-300 font-sans">
                {isOffline ? 'Sync' : 'Simulate Offline'}
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
