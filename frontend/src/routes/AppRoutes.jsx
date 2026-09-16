import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute, RoleRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { PATHS, ROLE_ROUTES, homePathFor } from './routePaths';

// Auth
import { SignInPage } from '../Pages/Auth/SignInPage';
import { NotFoundPage } from '../Pages/NotFound/NotFoundPage';

// Trainee Pages
import { OverviewPage } from '../Pages/Trainee/OverviewPage';
import { LearningPage } from '../Pages/Trainee/LearningPage';
import { LearningPathPage } from '../Pages/Trainee/LearningPathPage';
import { AssessmentsPage } from '../Pages/Trainee/AssessmentsPage';
import { SkillsPage } from '../Pages/Trainee/SkillsPage';
import { CertificatesPage } from '../Pages/Trainee/CertificatesPage';
import { CareerPage } from '../Pages/Trainee/CareerPage';
import { LogisticsPage } from '../Pages/Trainee/LogisticsPage';
import { ERPAnalyticsPage } from '../Pages/Trainee/ERPAnalyticsPage';
import { NotificationsPage } from '../Pages/Trainee/NotificationsPage';
import { ProfilePage } from '../Pages/Trainee/ProfilePage';
import { HelpPage } from '../Pages/Trainee/HelpPage';

// Trainer Pages
import { TrainerOverviewPage } from '../Pages/Trainer/TrainerOverviewPage';
import { TrainerBatchesPage } from '../Pages/Trainer/TrainerBatchesPage';
import { TrainerTraineesPage } from '../Pages/Trainer/TrainerTraineesPage';
import { TrainerAttendancePage } from '../Pages/Trainer/TrainerAttendancePage';
import { TrainerAssessmentsPage } from '../Pages/Trainer/TrainerAssessmentsPage';
import { TrainerSkillsPage } from '../Pages/Trainer/TrainerSkillsPage';
import { TrainerCompetencyPage } from '../Pages/Trainer/TrainerCompetencyPage';
import { TrainerInterventionsPage } from '../Pages/Trainer/TrainerInterventionsPage';
import { TrainerResourcesPage } from '../Pages/Trainer/TrainerResourcesPage';
import { TrainerReportsPage } from '../Pages/Trainer/TrainerReportsPage';
import { TrainerNotificationsPage } from '../Pages/Trainer/TrainerNotificationsPage';

// Admin Pages
import { AdminOverviewPage } from '../Pages/Admin/AdminOverviewPage';
import { AdminProgrammesPage } from '../Pages/Admin/AdminProgrammesPage';
import { AdminNominationsPage } from '../Pages/Admin/AdminNominationsPage';
import { AdminTimetablePage } from '../Pages/Admin/AdminTimetablePage';
import { AdminCertificationPage } from '../Pages/Admin/AdminCertificationPage';
import { AdminCapacityPage } from '../Pages/Admin/AdminCapacityPage';
import { AdminHostelPage } from '../Pages/Admin/AdminHostelPage';
import { AdminLogisticsPage } from '../Pages/Admin/AdminLogisticsPage';
import { AdminTrainersPage } from '../Pages/Admin/AdminTrainersPage';
import { AdminTraineesPage } from '../Pages/Admin/AdminTraineesPage';
import { AdminAnalyticsPage } from '../Pages/Admin/AdminAnalyticsPage';
import { AdminSkillsPage } from '../Pages/Admin/AdminSkillsPage';
import { AdminOutreachPage } from '../Pages/Admin/AdminOutreachPage';
import { AdminReportsPage } from '../Pages/Admin/AdminReportsPage';
import { AdminNetworkPage } from '../Pages/Admin/AdminNetworkPage';
import { AdminSettingsPage } from '../Pages/Admin/AdminSettingsPage';

/** Page component for every page id in routePaths.js. */
const PAGE_COMPONENTS = {
  trainee: {
    overview: OverviewPage,
    learning: LearningPage,
    learning_path: LearningPathPage,
    assessments: AssessmentsPage,
    skills: SkillsPage,
    certificates: CertificatesPage,
    career: CareerPage,
    logistics: LogisticsPage,
    erp_analytics: ERPAnalyticsPage,
    notifications: NotificationsPage,
    profile: ProfilePage,
    help: HelpPage,
  },
  trainer: {
    trainer_overview: TrainerOverviewPage,
    trainer_batches: TrainerBatchesPage,
    trainer_trainees: TrainerTraineesPage,
    trainer_attendance: TrainerAttendancePage,
    trainer_assessments: TrainerAssessmentsPage,
    trainer_skills: TrainerSkillsPage,
    trainer_competency: TrainerCompetencyPage,
    trainer_interventions: TrainerInterventionsPage,
    trainer_resources: TrainerResourcesPage,
    trainer_reports: TrainerReportsPage,
    trainer_notifications: TrainerNotificationsPage,
    profile: ProfilePage,
  },
  admin: {
    admin_overview: AdminOverviewPage,
    admin_programmes: AdminProgrammesPage,
    admin_nominations: AdminNominationsPage,
    admin_timetable: AdminTimetablePage,
    admin_certification: AdminCertificationPage,
    admin_capacity: AdminCapacityPage,
    admin_hostel: AdminHostelPage,
    admin_logistics: AdminLogisticsPage,
    admin_trainers: AdminTrainersPage,
    admin_trainees: AdminTraineesPage,
    admin_analytics: AdminAnalyticsPage,
    admin_skills: AdminSkillsPage,
    admin_outreach: AdminOutreachPage,
    admin_reports: AdminReportsPage,
    admin_network: AdminNetworkPage,
    admin_settings: AdminSettingsPage,
    profile: ProfilePage,
  },
};

/** "/" goes to the signed-in user's home page, or to sign-in. */
const RootRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  return <Navigate to={isAuthenticated ? homePathFor(user?.role) : PATHS.LOGIN} replace />;
};

export const AppRoutes = () => (
  <Routes>
    <Route path={PATHS.ROOT} element={<RootRedirect />} />

    {/* Signed-out only */}
    <Route element={<PublicRoute />}>
      <Route path={PATHS.LOGIN} element={<SignInPage />} />
    </Route>

    {/* Signed-in: every portal shares the site header, footer and dialogs */}
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        {Object.entries(ROLE_ROUTES).map(([role, { base, pages }]) => (
          <Route key={role} path={base} element={<RoleRoute role={role} />}>
            <Route index element={<Navigate to="overview" replace />} />
            {Object.entries(pages).map(([tab, segment]) => {
              const Page = PAGE_COMPONENTS[role][tab];
              return <Route key={tab} path={segment} element={<Page />} />;
            })}
          </Route>
        ))}
      </Route>
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
