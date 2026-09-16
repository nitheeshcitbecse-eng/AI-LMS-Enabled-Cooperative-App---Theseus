import React, { createContext, useContext, useState } from 'react';
import type {
  ActiveTab,
  Language,
  Skill,
  Assessment,
  Certificate,
  CareerOpportunity,
  ClosedLoopIntervention,
  NotificationItem,
  UserRole,
  TraineeRiskItem,
  InterventionItem,
  CompetencyEvidenceClaim,
  TrainerNote,
} from '../types';
import {
  mockSkills,
  mockAssessments,
  mockCertificates,
  mockCareerOpportunities,
  mockNotifications,
  mockClosedLoopIntervention,
} from '../data/mockData';
import {
  mockTraineeRiskList,
  mockInterventions,
  mockCompetencyEvidenceClaims,
  mockTrainerNotes,
} from '../data/mockTrainerData';

interface AppContextType {
  // Auth & Role Management
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  isSyncing: boolean;
  syncData: () => void;
  lastSyncedTime: string;
  pendingSyncCount: number;
  
  // Admin Network Selector State
  selectedInstitute: string;
  setSelectedInstitute: (inst: string) => void;
  selectedConflictItem: any | null;
  setSelectedConflictItem: (item: any | null) => void;

  // Hackathon Presentation Demo Mode Toggle ('before' | 'after')
  demoMode: 'before' | 'after';
  setDemoMode: (mode: 'before' | 'after') => void;

  // Modals & Drawers
  activeModal: string | null;
  openModal: (modalName: string) => void;
  closeModal: () => void;
  selectedCertificate: Certificate | null;
  setSelectedCertificate: (cert: Certificate | null) => void;
  selectedOpportunity: CareerOpportunity | null;
  setSelectedOpportunity: (opp: CareerOpportunity | null) => void;
  selectedTraineeForDrawer: TraineeRiskItem | null;
  setSelectedTraineeForDrawer: (trainee: TraineeRiskItem | null) => void;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
  
  // Closed-loop intervention state & actions
  closedLoop: ClosedLoopIntervention;
  completeBoosterQuiz: (score: number) => void;
  
  // Trainer Specific State
  interventions: InterventionItem[];
  createIntervention: (topic: string, trainees: string[], message: string, duration: number) => void;
  competencyClaims: CompetencyEvidenceClaim[];
  verifyCompetencyClaim: (id: string) => void;
  trainerNotes: TrainerNote[];
  addTrainerNote: (traineeId: string, text: string) => void;
  traineeRiskList: TraineeRiskItem[];

  // Data state
  skills: Skill[];
  assessments: Assessment[];
  certificates: Certificate[];
  opportunities: CareerOpportunity[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  unreadNotificationCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Start at Sign In Page!
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<ActiveTab>('admin_overview');
  const [language, setLanguage] = useState<Language>('en');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('09:42 AM');
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(27);
  const [selectedInstitute, setSelectedInstitute] = useState<string>('ICM Chennai');
  const [selectedConflictItem, setSelectedConflictItem] = useState<any | null>(null);

  const login = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    if (role === 'trainee') setActiveTab('overview');
    else if (role === 'trainer') setActiveTab('trainer_overview');
    else setActiveTab('admin_overview');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };


  const [demoMode, setDemoMode] = useState<'before' | 'after'>('before');

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(mockCertificates[0]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<CareerOpportunity | null>(mockCareerOpportunities[0]);
  const [selectedTraineeForDrawer, setSelectedTraineeForDrawer] = useState<TraineeRiskItem | null>(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  
  const [closedLoop, setClosedLoop] = useState<ClosedLoopIntervention>(mockClosedLoopIntervention);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments);
  const [certificates] = useState<Certificate[]>(mockCertificates);
  const [opportunities] = useState<CareerOpportunity[]>(mockCareerOpportunities);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // Trainer State
  const [interventions, setInterventions] = useState<InterventionItem[]>(mockInterventions);
  const [competencyClaims, setCompetencyClaims] = useState<CompetencyEvidenceClaim[]>(mockCompetencyEvidenceClaims);
  const [trainerNotes, setTrainerNotes] = useState<TrainerNote[]>(mockTrainerNotes);
  const [traineeRiskList, setTraineeRiskList] = useState<TraineeRiskItem[]>(mockTraineeRiskList);

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const syncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPendingSyncCount(0);
      setLastSyncedTime('Just now');
      setIsOffline(false);
    }, 1500);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const completeBoosterQuiz = (score: number) => {
    setClosedLoop(prev => ({
      ...prev,
      afterScore: score,
      status: 'verified',
      interventionCompleted: true,
    }));

    setAssessments(prev =>
      prev.map(a =>
        a.title.includes('Cooperative Accounting')
          ? { ...a, score: score, status: 'passed' }
          : a
      )
    );

    setSkills(prev =>
      prev.map(s =>
        s.name.includes('Financial Analysis')
          ? { ...s, proficiency: score, status: 'verified' }
          : s
      )
    );
  };

  const createIntervention = (topic: string, trainees: string[], message: string, duration: number) => {
    const newIntervention: InterventionItem = {
      id: `INT-2026-0${interventions.length + 1}`,
      topic,
      affectedTraineesCount: trainees.length,
      traineesList: trainees,
      beforeScore: 46,
      afterScore: 74,
      status: 'completed',
      createdDate: 'Today',
      deadline: 'In 3 days',
      trainerMessage: message,
      durationMinutes: duration,
      improvementPoints: 28,
    };
    setInterventions(prev => [newIntervention, ...prev]);
  };

  const verifyCompetencyClaim = (id: string) => {
    setCompetencyClaims(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'verified' } : c))
    );
  };

  const addTrainerNote = (traineeId: string, text: string) => {
    const newNote: TrainerNote = {
      id: `NOTE-${Date.now()}`,
      traineeId,
      noteText: text,
      createdAt: 'Just now',
      isPrivate: true,
    };
    setTrainerNotes(prev => [newNote, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        isOffline,
        setIsOffline,
        isSyncing,
        syncData,
        lastSyncedTime,
        pendingSyncCount,
        selectedInstitute,
        setSelectedInstitute,
        selectedConflictItem,
        setSelectedConflictItem,
        demoMode,
        setDemoMode,
        activeModal,
        openModal,
        closeModal,
        selectedCertificate,
        setSelectedCertificate,
        selectedOpportunity,
        setSelectedOpportunity,
        selectedTraineeForDrawer,
        setSelectedTraineeForDrawer,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        closedLoop,
        completeBoosterQuiz,
        interventions,
        createIntervention,
        competencyClaims,
        verifyCompetencyClaim,
        trainerNotes,
        addTrainerNote,
        traineeRiskList,
        skills,
        assessments,
        certificates,
        opportunities,
        notifications,
        markNotificationAsRead,
        unreadNotificationCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
