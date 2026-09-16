import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { TrainerSidebar } from '../trainer/TrainerSidebar';
import { TrainerTopHeader } from '../trainer/TrainerTopHeader';
import { AdminSidebar } from '../admin/AdminSidebar';
import { AdminTopHeader } from '../admin/AdminTopHeader';
import { GlobalStatusStrip } from '../admin/GlobalStatusStrip';
import { useApp } from '../../context/AppContext';

// Trainee Views
import { OverviewView } from '../../views/OverviewView';
import { LearningView } from '../../views/LearningView';
import { AssessmentsView } from '../../views/AssessmentsView';
import { SkillsView } from '../../views/SkillsView';
import { CertificatesView } from '../../views/CertificatesView';
import { CareerView } from '../../views/CareerView';
import { LearningPathView } from '../../views/LearningPathView';
import { LogisticsView } from '../../views/LogisticsView';
import { ERPAnalyticsView } from '../../views/ERPAnalyticsView';
import { NotificationsView } from '../../views/NotificationsView';
import { ProfileView } from '../../views/ProfileView';
import { HelpView } from '../../views/HelpView';

// Trainer Views
import { TrainerOverviewView } from '../../views/trainer/TrainerOverviewView';
import { TrainerBatchesView } from '../../views/trainer/TrainerBatchesView';
import { TrainerTraineesView } from '../../views/trainer/TrainerTraineesView';
import { TrainerAttendanceView } from '../../views/trainer/TrainerAttendanceView';
import { TrainerAssessmentsView } from '../../views/trainer/TrainerAssessmentsView';
import { TrainerSkillsView } from '../../views/trainer/TrainerSkillsView';
import { TrainerInterventionsView } from '../../views/trainer/TrainerInterventionsView';
import { TrainerResourcesView } from '../../views/trainer/TrainerResourcesView';
import { TrainerCompetencyView } from '../../views/trainer/TrainerCompetencyView';
import { TrainerReportsView } from '../../views/trainer/TrainerReportsView';
import { TrainerNotificationsView } from '../../views/trainer/TrainerNotificationsView';

// Admin Views
import { AdminOverviewView } from '../../views/admin/AdminOverviewView';
import { AdminProgrammesView } from '../../views/admin/AdminProgrammesView';
import { AdminNominationsView } from '../../views/admin/AdminNominationsView';
import { AdminTimetableView } from '../../views/admin/AdminTimetableView';
import { AdminCapacityView } from '../../views/admin/AdminCapacityView';
import { AdminHostelView } from '../../views/admin/AdminHostelView';
import { AdminLogisticsView } from '../../views/admin/AdminLogisticsView';
import { AdminTrainersView } from '../../views/admin/AdminTrainersView';
import { AdminTraineesView } from '../../views/admin/AdminTraineesView';
import { AdminAnalyticsView } from '../../views/admin/AdminAnalyticsView';
import { AdminCertificationView } from '../../views/admin/AdminCertificationView';
import { AdminSkillsView } from '../../views/admin/AdminSkillsView';
import { AdminOutreachView } from '../../views/admin/AdminOutreachView';
import { AdminReportsView } from '../../views/admin/AdminReportsView';
import { AdminNetworkView } from '../../views/admin/AdminNetworkView';
import { AdminSettingsView } from '../../views/admin/AdminSettingsView';

// Shared Modals
import { QRVerificationModal } from '../modals/QRVerificationModal';
import { ClosedLoopInterventionModal } from '../modals/ClosedLoopInterventionModal';
import { CertificateDetailModal } from '../modals/CertificateDetailModal';
import { CareerDetailModal } from '../modals/CareerDetailModal';
import { BiometricAttendanceModal } from '../modals/BiometricAttendanceModal';
import { EmployerDashboardPreviewModal } from '../modals/EmployerDashboardPreviewModal';
import { NominationModal } from '../modals/NominationModal';

// Trainer Modals
import { CreateInterventionWizardModal } from '../modals/CreateInterventionWizardModal';
import { AnnouncementModal } from '../modals/AnnouncementModal';
import { TrainerResourceModal } from '../modals/TrainerResourceModal';

// Admin Modals
import { NominationConflictModal } from '../modals/NominationConflictModal';
import { CreateProgrammeModal } from '../modals/CreateProgrammeModal';
import { ScheduleSessionModal } from '../modals/ScheduleSessionModal';
import { ResourceRequestModal } from '../modals/ResourceRequestModal';
import { GlobalSearchModal } from '../modals/GlobalSearchModal';

import { SyncCenterModal } from '../offline/SyncCenterModal';
import { AIAssistantDrawer } from '../ai/AIAssistantDrawer';
import { AITrainerAssistantDrawer } from '../ai/AITrainerAssistantDrawer';
import { AIOpsAssistantDrawer } from '../ai/AIOpsAssistantDrawer';
import { SignInPage } from '../auth/SignInPage';
import { WifiOff, RefreshCw, Sparkles } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const { activeTab, isOffline, syncData, isSyncing, openModal, setIsAiDrawerOpen, userRole, isAuthenticated } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openModal('global_search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openModal]);

  if (!isAuthenticated) {
    return <SignInPage />;
  }

  const renderActiveView = () => {
    if (userRole === 'admin') {
      switch (activeTab) {
        case 'admin_overview':
          return <AdminOverviewView />;
        case 'admin_programmes':
          return <AdminProgrammesView />;
        case 'admin_nominations':
          return <AdminNominationsView />;
        case 'admin_timetable':
          return <AdminTimetableView />;
        case 'admin_capacity':
          return <AdminCapacityView />;
        case 'admin_hostel':
          return <AdminHostelView />;
        case 'admin_logistics':
          return <AdminLogisticsView />;
        case 'admin_trainers':
          return <AdminTrainersView />;
        case 'admin_trainees':
          return <AdminTraineesView />;
        case 'admin_analytics':
          return <AdminAnalyticsView />;
        case 'admin_certification':
          return <AdminCertificationView />;
        case 'admin_skills':
          return <AdminSkillsView />;
        case 'admin_outreach':
          return <AdminOutreachView />;
        case 'admin_reports':
          return <AdminReportsView />;
        case 'admin_network':
          return <AdminNetworkView />;
        case 'admin_settings':
          return <AdminSettingsView />;
        case 'profile':
          return <ProfileView />;
        default:
          return <AdminOverviewView />;
      }
    }

    if (userRole === 'trainer') {
      switch (activeTab) {
        case 'trainer_overview':
          return <TrainerOverviewView />;
        case 'trainer_batches':
          return <TrainerBatchesView />;
        case 'trainer_trainees':
          return <TrainerTraineesView />;
        case 'trainer_attendance':
          return <TrainerAttendanceView />;
        case 'trainer_assessments':
          return <TrainerAssessmentsView />;
        case 'trainer_skills':
          return <TrainerSkillsView />;
        case 'trainer_interventions':
          return <TrainerInterventionsView />;
        case 'trainer_resources':
          return <TrainerResourcesView />;
        case 'trainer_competency':
          return <TrainerCompetencyView />;
        case 'trainer_reports':
          return <TrainerReportsView />;
        case 'trainer_notifications':
          return <TrainerNotificationsView />;
        case 'profile':
          return <ProfileView />;
        default:
          return <TrainerOverviewView />;
      }
    }

    // Default Trainee Views
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'learning':
        return <LearningView />;
      case 'assessments':
        return <AssessmentsView />;
      case 'skills':
        return <SkillsView />;
      case 'certificates':
        return <CertificatesView />;
      case 'career':
        return <CareerView />;
      case 'learning_path':
        return <LearningPathView />;
      case 'logistics':
        return <LogisticsView />;
      case 'erp_analytics':
        return <ERPAnalyticsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'help':
        return <HelpView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Dynamic Sidebar based on User Role */}
      {userRole === 'admin' ? (
        <AdminSidebar isOpenMobile={isOpenMobile} setIsOpenMobile={setIsOpenMobile} />
      ) : userRole === 'trainer' ? (
        <TrainerSidebar isOpenMobile={isOpenMobile} setIsOpenMobile={setIsOpenMobile} />
      ) : (
        <Sidebar isOpenMobile={isOpenMobile} setIsOpenMobile={setIsOpenMobile} />
      )}

      {/* Main Content Area */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        {/* Dynamic Top Header based on User Role */}
        {userRole === 'admin' ? (
          <AdminTopHeader onOpenMobileSidebar={() => setIsOpenMobile(true)} />
        ) : userRole === 'trainer' ? (
          <TrainerTopHeader onOpenMobileSidebar={() => setIsOpenMobile(true)} />
        ) : (
          <TopHeader onOpenMobileSidebar={() => setIsOpenMobile(true)} />
        )}

        {/* Admin Global Status Strip */}
        {userRole === 'admin' && <GlobalStatusStrip />}

        {/* Offline Banner Alert */}
        {isOffline && (
          <div className="bg-amber-500 text-indigo-950 px-4 py-2 text-xs font-semibold flex items-center justify-between border-b border-amber-600/30">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-indigo-950" />
              <span>
                You are currently in <strong>Rural Edge Mode</strong>. Local records saved to IndexedDB and will sync automatically to Central Cloud.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal('sync_center')}
                className="px-2.5 py-1 rounded bg-indigo-950 text-white text-[11px] font-bold hover:bg-indigo-900 transition-colors"
              >
                Sync Center
              </button>
              <button
                onClick={syncData}
                disabled={isSyncing}
                className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold transition-colors flex items-center gap-1"
              >
                {isSyncing ? <RefreshCw className="w-3 h-3 animate-spin" /> : null}
                <span>{isSyncing ? 'Syncing...' : 'Go Online & Sync'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Wrapper */}
        <main className="flex-1 p-4 lg:p-8 max-w-[1440px] w-full mx-auto app-page-enter">
          {renderActiveView()}
        </main>
      </div>

      {/* Shared Modals */}
      <QRVerificationModal />
      <ClosedLoopInterventionModal />
      <CertificateDetailModal />
      <CareerDetailModal />
      <BiometricAttendanceModal />
      <EmployerDashboardPreviewModal />
      <NominationModal />
      <SyncCenterModal />

      {/* Trainer Modals */}
      <CreateInterventionWizardModal />
      <AnnouncementModal />
      <TrainerResourceModal />

      {/* Admin Modals */}
      <NominationConflictModal />
      <CreateProgrammeModal />
      <ScheduleSessionModal />
      <ResourceRequestModal />
      <GlobalSearchModal />

      {/* Role-based AI Drawers */}
      {userRole === 'admin' ? (
        <AIOpsAssistantDrawer />
      ) : userRole === 'trainer' ? (
        <AITrainerAssistantDrawer />
      ) : (
        <AIAssistantDrawer />
      )}

      {/* Floating AI Button */}
      <button
        onClick={() => setIsAiDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-950 to-slate-900 text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all border border-indigo-700/60 flex items-center gap-2 group"
      >
        <div className="w-6 h-6 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center border border-teal-400/40 group-hover:scale-110 transition-transform">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span>
          {userRole === 'admin'
            ? 'NCCT Ops Assistant'
            : userRole === 'trainer'
            ? 'NCCT AI Trainer Assistant'
            : 'NCCT AI Assistant'}
        </span>
      </button>
    </div>
  );
};
