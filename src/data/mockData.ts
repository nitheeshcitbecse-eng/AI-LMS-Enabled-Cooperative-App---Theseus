import type {
  Trainee,
  Course,
  Assessment,
  Skill,
  Certificate,
  Attendance,
  CareerOpportunity,
  CareerReadiness,
  JourneyStage,
  AIRecommendation,
  ClosedLoopIntervention,
  NotificationItem,
  Gamification,
  SessionSchedule,
  HostelLogistics,
  NominationInfo,
} from '../types';

export const mockTrainee: Trainee = {
  id: 'tr-004281',
  name: 'Arun Kumar',
  role: 'Trainee',
  digitalId: 'NCCT-TR-2026-004281',
  institute: 'ICM Chennai (Institute of Cooperative Management)',
  programme: 'Cooperative Management & Digital Operations',
  batch: 'CMDO-2026-B04',
  trainingPeriod: '01 Sep 2026 – 30 Sep 2026',
  location: 'Chennai, Tamil Nadu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  profileCompletion: 88,
  email: 'arun.kumar.ncct@gov.in',
  phone: '+91 98765 43210',
  kycStatus: 'verified',
  pacsName: 'Primary Agricultural Credit Society (PACS) Kanchipuram',
};

export const mockHostelLogistics: HostelLogistics = {
  hostelBlock: 'Ramanujan Hostel Block B',
  roomNo: 'Room 304 (AC Twin Sharing)',
  messPassId: 'NCCT-MP-2026-8812',
  messType: 'Vegetarian',
  travelStipendStatus: 'Approved (₹1,200 Disbursed)',
  logisticsCoordinator: 'Mr. K. Senthil Nathan (Campus Warden)',
  contactNumber: '+91 94440 12345',
};

export const mockNominationInfo: NominationInfo = {
  nominationRefNo: 'NCCT-NOM-TN-2026-9921',
  nominatingSociety: 'Primary Agricultural Credit Society (PACS) Kanchipuram',
  societyRegNo: 'PACS-TN-KPM-104',
  sponsorshipStatus: 'Approved by Registrar',
  dateNominated: '24 Aug 2026',
  programmeCode: 'CMDO-2026-B04',
};

export const mockLearningJourneyStages: JourneyStage[] = [
  {
    id: 'stage-1',
    name: 'REGISTERED',
    status: 'completed',
    date: '15 Aug 2026',
    description: 'Enrolled via State Cooperative Portal & NCCT National Register',
    milestone: 'KYC & Verification Completed',
  },
  {
    id: 'stage-2',
    name: 'NOMINATED',
    status: 'completed',
    date: '24 Aug 2026',
    description: 'Nominated by Primary Agricultural Credit Society (PACS) Kanchipuram',
    milestone: 'Sponsorship Approved',
  },
  {
    id: 'stage-3',
    name: 'TRAINING',
    status: 'completed',
    date: '01 Sep 2026',
    description: 'Induction & Core Modules started at ICM Chennai Campus',
    milestone: '78% Coursework Complete',
  },
  {
    id: 'stage-4',
    name: 'ASSESSMENT',
    status: 'completed',
    date: '10 Sep 2026',
    description: 'Periodic digital assessments & practical lab tests executed',
    milestone: '64% Average Score',
  },
  {
    id: 'stage-5',
    name: 'SKILL DEVELOPMENT',
    status: 'current',
    date: 'Active Now',
    description: 'AI-guided closed loop interventions & practical competency building',
    milestone: '3 Verified Skills Gained',
  },
  {
    id: 'stage-6',
    name: 'CERTIFICATION',
    status: 'upcoming',
    date: '28 Sep 2026',
    description: 'Final evaluation & tamper-proof NCCT Digital Credential issue',
    milestone: '2 Assessments Pending',
  },
  {
    id: 'stage-7',
    name: 'CAREER',
    status: 'upcoming',
    date: '01 Oct 2026',
    description: 'Direct placement matching with Cooperative Societies & PACS',
    milestone: '92% Top Match Role',
  },
  {
    id: 'stage-8',
    name: 'OUTCOME',
    status: 'upcoming',
    date: 'Post-Training',
    description: 'Long-term career tracking, ERP role onboarding & continuous upskilling',
    milestone: 'Continuous Digital Identity',
  },
];

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Cooperative Finance Fundamentals',
    code: 'NCCT-CFF-101',
    instructor: 'Dr. V. Ramanathan',
    progress: 72,
    category: 'Finance & Accounts',
    lastActivity: 'Working Capital Management',
    remainingMinutes: 18,
    totalModules: 5,
    completedModules: 3,
    description: 'Comprehensive guide to cooperative accounting practices, working capital calculations, and financial ledger compliance.',
    modules: [
      { id: 'm1', title: 'Principles of Cooperative Accounting', duration: '45 mins', status: 'completed', topics: ['Single entry vs double entry', 'Ledger balances'] },
      { id: 'm2', title: 'Working Capital Management', duration: '35 mins', status: 'in_progress', topics: ['Cash flow statements', 'Loan recovery ratios'] },
      { id: 'm3', title: 'Audit & Statutory Compliance', duration: '50 mins', status: 'upcoming', topics: ['NABARD guidelines', 'Annual returns'] },
    ],
  },
  {
    id: 'course-2',
    title: 'Digital Operations in PACS & Cooperatives',
    code: 'NCCT-DOP-102',
    instructor: 'Prof. S. Meenakshi',
    progress: 85,
    category: 'ERP & Technology',
    lastActivity: 'Member ERP Entry & Loan Disbursement',
    remainingMinutes: 12,
    totalModules: 4,
    completedModules: 3,
    description: 'Practical training on National PACS Computerization ERP software, digital member onboarding, and online loan management.',
    modules: [
      { id: 'm4', title: 'PACS ERP Interface Navigation', duration: '40 mins', status: 'completed', topics: ['User roles', 'Data security'] },
      { id: 'm5', title: 'Digital Loan Disbursement', duration: '30 mins', status: 'completed', topics: ['Direct Benefit Transfer', 'Kisan Credit Card integration'] },
    ],
  },
  {
    id: 'course-3',
    title: 'Cooperative Governance & Legal Framework',
    code: 'NCCT-CGL-103',
    instructor: 'Adv. R. Kulkarni',
    progress: 54,
    category: 'Governance & Law',
    lastActivity: 'Multi-State Cooperative Societies Act',
    remainingMinutes: 40,
    totalModules: 6,
    completedModules: 3,
    description: 'Legal rights, board governance structure, member voting protocols, and regulatory dispute resolution.',
    modules: [
      { id: 'm6', title: 'Bylaws & Committee Governance', duration: '50 mins', status: 'completed', topics: ['General body meetings', 'Resolution drafting'] },
    ],
  },
];

export const mockAssessments: Assessment[] = [
  { id: 'a1', title: 'Assessment 1 — Cooperative History & Principles', subject: 'Principles', score: 58, maxScore: 100, targetScore: 70, date: '03 Sep 2026', status: 'passed', attempts: 1 },
  { id: 'a2', title: 'Assessment 2 — PACS Digital ERP Entry', subject: 'Digital ERP', score: 61, maxScore: 100, targetScore: 70, date: '06 Sep 2026', status: 'passed', attempts: 1 },
  { id: 'a3', title: 'Assessment 3 — Cooperative Accounting Ledger', subject: 'Cooperative Accounting', score: 55, maxScore: 100, targetScore: 70, date: '09 Sep 2026', status: 'needs_improvement', attempts: 2 },
  { id: 'a4', title: 'Assessment 4 — Credit Rating & Loan Appraisal', subject: 'Finance', score: 64, maxScore: 100, targetScore: 70, date: '12 Sep 2026', status: 'passed', attempts: 1 },
  { id: 'a5', title: 'Assessment 5 — Member Grievance & Service ERP', subject: 'Digital ERP', score: 68, maxScore: 100, targetScore: 70, date: '14 Sep 2026', status: 'passed', attempts: 1 },
  { id: 'a6', title: 'Assessment 6 — Financial Analysis & Balance Sheets', subject: 'Financial Analysis', score: 74, maxScore: 100, targetScore: 70, date: '16 Sep 2026', status: 'passed', attempts: 1 },
];

export const mockSkills: Skill[] = [
  {
    id: 's1',
    name: 'Cooperative Management',
    category: 'Core Management',
    proficiency: 88,
    status: 'verified',
    evidenceCount: 4,
    evidence: [
      { assessmentName: 'Cooperative Principles Exam', score: 90, date: '04 Sep 2026', validatedBy: 'Dr. V. Ramanathan (ICM Faculty)' },
      { assessmentName: 'PACS Bylaws Case Study', score: 86, date: '11 Sep 2026', validatedBy: 'NCCT Assessment Engine' },
    ],
  },
  {
    id: 's2',
    name: 'Communication & Member Service',
    category: 'Soft Skills',
    proficiency: 81,
    status: 'verified',
    evidenceCount: 3,
    evidence: [
      { assessmentName: 'Member Grievance Viva', score: 84, date: '08 Sep 2026', validatedBy: 'Prof. S. Meenakshi' },
    ],
  },
  {
    id: 's3',
    name: 'Digital Operations & ERP',
    category: 'Technology',
    proficiency: 74,
    status: 'verified',
    evidenceCount: 3,
    evidence: [
      { assessmentName: 'PACS ERP Practical Lab', score: 78, date: '14 Sep 2026', validatedBy: 'ERP Certification System' },
    ],
  },
  {
    id: 's4',
    name: 'Data Interpretation',
    category: 'Analytics',
    proficiency: 63,
    status: 'developing',
    evidenceCount: 2,
    evidence: [
      { assessmentName: 'Crop Loan Data Analysis', score: 63, date: '15 Sep 2026', validatedBy: 'NCCT Analytics' },
    ],
  },
  {
    id: 's5',
    name: 'Financial Analysis & Accounting',
    category: 'Finance',
    proficiency: 46,
    status: 'needs_attention',
    evidenceCount: 1,
    recommendedAction: 'Complete 15-minute Cooperative Accounting Booster to reach 70% threshold',
    evidence: [
      { assessmentName: 'Cooperative Accounting Test', score: 46, date: '09 Sep 2026', validatedBy: 'NCCT Assessment Engine' },
    ],
  },
];

export const mockAIRecommendation: AIRecommendation = {
  id: 'rec-01',
  topic: 'Cooperative Accounting & Financial Analysis',
  pattern: '3 assessments below target (Current average: 46% vs 70% benchmark)',
  currentScore: 46,
  targetScore: 70,
  recommendationText: 'Complete the 15-minute Cooperative Accounting & Ratio Analysis Booster.',
  estimatedMinutes: 15,
  ctaText: 'Start Recommended Learning',
  quizQuestions: [
    {
      id: 1,
      question: 'Which statement correctly defines Working Capital in a Cooperative Credit Society?',
      options: [
        'Total fixed land and building assets',
        'Current Assets minus Current Liabilities used in daily operations',
        'Total statutory reserve fund deposited in State Cooperative Bank',
        'Member share capital contributions'
      ],
      correctAnswer: 1,
      explanation: 'Working Capital represents operational liquidity, calculated as Current Assets minus Current Liabilities.'
    },
    {
      id: 2,
      question: 'Under NABARD guidelines for PACS, what is the target recovery percentage for short-term agricultural loans?',
      options: [
        'Minimum 40%',
        'Minimum 55%',
        'Minimum 75%',
        'Minimum 90%'
      ],
      correctAnswer: 2,
      explanation: 'NABARD mandates a healthy recovery threshold (75%+) to maintain PACS credit flow eligibility.'
    },
    {
      id: 3,
      question: 'How is the Net Profit of a Cooperative Society allocated to the Reserve Fund by law?',
      options: [
        'At least 25% of Net Profit',
        '10% of Net Profit',
        '50% of Net Profit',
        'Entire Net Profit'
      ],
      correctAnswer: 0,
      explanation: 'Cooperative Acts stipulate that at least 25% of annual net profit must be transferred to the statutory Reserve Fund.'
    }
  ]
};

export const mockClosedLoopIntervention: ClosedLoopIntervention = {
  topic: 'Cooperative Accounting',
  beforeScore: 46,
  afterScore: 74,
  status: 'verified',
  interventionCompleted: true,
  validatedByTrainer: 'Dr. V. Ramanathan (Trainer Verified)',
};

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-101',
    title: 'Cooperative Management Fundamentals',
    credentialId: 'NCCT-CERT-28491',
    issueDate: '12 Sep 2026',
    issuer: 'National Council for Cooperative Training (NCCT)',
    status: 'verified',
    qrData: 'https://ncct.gov.in/verify/NCCT-CERT-28491',
    skillsVerified: ['Cooperative Management', 'Legal Bylaws', 'Member Governance'],
    pdfAvailable: true,
  },
  {
    id: 'cert-102',
    title: 'PACS Digital ERP Specialist',
    credentialId: 'NCCT-CERT-29104',
    issueDate: 'In Progress (Expected 28 Sep 2026)',
    issuer: 'NCCT & Ministry of Cooperation',
    status: 'in_progress',
    qrData: 'https://ncct.gov.in/verify/NCCT-CERT-29104-PENDING',
    skillsVerified: ['Digital Operations', 'ERP Data Entry', 'Direct Benefit Transfer'],
    pdfAvailable: false,
  },
];

export const mockAttendance: Attendance = {
  overallPercentage: 92,
  presentSessions: 23,
  totalSessions: 25,
  absentSessions: 2,
  statusMessage: 'Excellent attendance — keep it up!',
  recentLogs: [
    { date: '16 Sep 2026', sessionTitle: 'Cooperative Finance & Audit', status: 'present', time: '10:30 AM', verificationMethod: 'Face Recognition' },
    { date: '15 Sep 2026', sessionTitle: 'PACS Computerization Lab', status: 'present', time: '02:00 PM', verificationMethod: 'QR Scan' },
    { date: '14 Sep 2026', sessionTitle: 'Legal Dispute Resolution', status: 'present', time: '11:00 AM', verificationMethod: 'Face Recognition' },
    { date: '13 Sep 2026', sessionTitle: 'Member Onboarding Simulation', status: 'present', time: '09:30 AM', verificationMethod: 'Biometric' },
    { date: '10 Sep 2026', sessionTitle: 'Field Visit — PACS Kanchipuram', status: 'absent', time: 'Full Day', verificationMethod: 'QR Scan' },
  ],
};

export const mockCareerOpportunities: CareerOpportunity[] = [
  {
    id: 'opp-1',
    title: 'Cooperative Operations Associate',
    organization: 'Tamil Nadu State Apex Cooperative Bank (TNSC Bank)',
    location: 'Chennai / Kanchipuram, Tamil Nadu',
    matchPercentage: 92,
    matchedSkills: ['Cooperative Management', 'Digital Operations', 'Communication', 'PACS ERP'],
    missingSkills: ['Advanced Credit Appraisal'],
    salaryRange: '₹3.6 L - ₹4.8 L / annum',
    type: 'Full-time',
    deadline: '05 Oct 2026',
    description: 'Responsible for daily member transactions, PACS ERP synchronization, and loan ledger reconciliation.',
  },
  {
    id: 'opp-2',
    title: 'Digital Cooperative Coordinator',
    organization: 'National Agricultural Cooperative Marketing Federation (NAFED)',
    location: 'Coimbatore, Tamil Nadu',
    matchPercentage: 86,
    matchedSkills: ['Digital Operations', 'Communication', 'Cooperative Management', 'Data Entry'],
    missingSkills: ['E-NAM Market Integration'],
    salaryRange: '₹4.0 L - ₹5.2 L / annum',
    type: 'Full-time',
    deadline: '12 Oct 2026',
    description: 'Coordinate digital trading portals, farmer produce organization (FPO) onboarding, and procurement ERP entries.',
  },
  {
    id: 'opp-3',
    title: 'Cooperative Finance Assistant',
    organization: 'Primary Agricultural Credit Society (PACS) Chengalpattu',
    location: 'Chengalpattu, Tamil Nadu',
    matchPercentage: 81,
    matchedSkills: ['Cooperative Management', 'Communication', 'Digital ERP'],
    missingSkills: ['Financial Analysis (In Progress)'],
    salaryRange: '₹3.2 L - ₹4.2 L / annum',
    type: 'Full-time',
    deadline: '18 Oct 2026',
    description: 'Assist Senior Accountant in member credit verification, seasonal agricultural loan disbursement, and ledger reporting.',
  },
];

export const mockCareerReadiness: CareerReadiness = {
  overallScore: 76,
  breakdown: {
    verifiedSkills: 82,
    learningProgress: 74,
    assessmentScore: 71,
    credentials: 80,
    experience: 65,
  },
  statusText: "You're on track for placement upon programme completion.",
  improvementTip: 'Improve Financial Analysis by completing the booster module to boost your score to 84+ and unlock senior finance roles.',
};

export const mockGamification: Gamification = {
  streakDays: 7,
  xp: 1240,
  level: 4,
  levelTitle: 'Skilled Learner',
  badges: [
    { id: 'b1', title: 'Fast Learner', description: 'Completed 3 modules in a single day', icon: 'Zap', earnedDate: '05 Sep 2026' },
    { id: 'b2', title: 'Assessment Ace', description: 'Scored above 70% in Assessment 6', icon: 'Award', earnedDate: '16 Sep 2026' },
    { id: 'b3', title: 'Consistent Learner', description: '7-day learning streak maintained', icon: 'Flame', earnedDate: 'Today' },
    { id: 'b4', title: 'Cooperative Champion', description: 'Verified 3 core cooperative competencies', icon: 'ShieldCheck', earnedDate: '14 Sep 2026' },
  ],
};

export const mockUpcomingSchedule: SessionSchedule[] = [
  {
    id: 's-1',
    title: 'Cooperative Finance & Working Capital',
    time: 'Today • 10:30 AM',
    dateLabel: 'Today',
    location: 'Classroom • Room 204',
    instructor: 'Dr. V. Ramanathan',
    type: 'lecture',
  },
  {
    id: 's-2',
    title: 'Digital Cooperative Operations Practical Lab',
    time: 'Tomorrow • 2:00 PM',
    dateLabel: 'Tomorrow',
    location: 'Computer Lab 2',
    instructor: 'Prof. S. Meenakshi',
    type: 'practical',
  },
  {
    id: 's-3',
    title: 'Assessment: Financial Analysis & Ratios',
    time: '18 Sep 2026 • 11:00 AM',
    dateLabel: '18 Sep',
    location: 'Digital Assessment Center',
    instructor: 'NCCT Evaluation Board',
    type: 'assessment',
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Assessment Tomorrow',
    message: 'Your Financial Analysis & Ratios assessment is scheduled for 18 Sep at 11:00 AM.',
    timestamp: '10 mins ago',
    priority: 'high',
    read: false,
    type: 'assessment',
  },
  {
    id: 'n-2',
    title: 'Silent Weak Spot Alert',
    message: 'NCCT AI detected a gap in Cooperative Accounting. Booster module available.',
    timestamp: '2 hours ago',
    priority: 'high',
    read: false,
    type: 'learning',
  },
  {
    id: 'n-3',
    title: 'Score Improvement Verified',
    message: 'You improved your Cooperative Accounting score by 28% after completing intervention.',
    timestamp: 'Yesterday',
    priority: 'medium',
    read: true,
    type: 'skill',
  },
  {
    id: 'n-4',
    title: 'Certificate Ready for Download',
    message: 'Cooperative Management Fundamentals certificate is verified and ready for download.',
    timestamp: '2 days ago',
    priority: 'medium',
    read: true,
    type: 'certificate',
  },
  {
    id: 'n-5',
    title: 'New Career Opportunity Match',
    message: 'Cooperative Operations Associate at TNSC Bank matches 92% of your verified skills.',
    timestamp: '3 days ago',
    priority: 'low',
    read: true,
    type: 'career',
  },
];
