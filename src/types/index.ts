export interface Trainee {
  id: string;
  name: string;
  role: string;
  digitalId: string;
  institute: string;
  programme: string;
  batch: string;
  trainingPeriod: string;
  location: string;
  avatarUrl: string;
  profileCompletion: number;
  email: string;
  phone: string;
  kycStatus: 'verified' | 'pending';
  pacsName: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  trainerId: string;
  institute: string;
  department: string;
  currentProgramme: string;
  batch: string;
  batchSize: number;
  activeTrainees: number;
  programmeProgress: number;
  avatarUrl: string;
  email: string;
}

export interface BatchHealth {
  overallScore: number;
  breakdown: {
    attendance: number;
    learningActivity: number;
    assessment: number;
    skillProgress: number;
    engagement: number;
  };
  statusText: string;
  primaryImprovementArea: string;
}

export interface PriorityInsight {
  id: string;
  level: 'high' | 'medium' | 'positive';
  title: string;
  affectedCount: number;
  reason: string;
  action: string;
  category: string;
}

export interface TraineeRiskItem {
  id: string;
  name: string;
  avatarUrl: string;
  digitalId: string;
  attendance: number;
  assessmentScore: number;
  skillGapTopic: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedAction: string;
  lmsActivity: number;
  lastActivityTime: string;
  skills: { name: string; proficiency: number }[];
}

export interface SilentWeakSpot {
  id: string;
  topic: string;
  affectedTraineesCount: number;
  averageScore: number;
  attempts: number;
  pattern: string;
  suggestedAction: string;
}

export interface InterventionItem {
  id: string;
  topic: string;
  affectedTraineesCount: number;
  traineesList: string[];
  beforeScore: number;
  afterScore: number | null;
  status: 'recommended' | 'active' | 'completed';
  createdDate: string;
  deadline: string;
  trainerMessage: string;
  durationMinutes: number;
  improvementPoints?: number;
}

export interface TopicHeatmapCell {
  assessmentName: string;
  score: number;
  status: 'weak' | 'developing' | 'strong';
}

export interface TopicHeatmapRow {
  topicName: string;
  cells: TopicHeatmapCell[];
  averageScore: number;
}

export interface CompetencyEvidenceClaim {
  id: string;
  traineeName: string;
  digitalId: string;
  competencyName: string;
  assessmentScore: number;
  practicalScore: number;
  projectStatus: 'Completed' | 'In Progress' | 'Pending';
  status: 'pending' | 'verified' | 'reassessment_requested';
}

export interface TrainerNote {
  id: string;
  traineeId: string;
  noteText: string;
  createdAt: string;
  isPrivate: boolean;
}

export interface HostelLogistics {
  hostelBlock: string;
  roomNo: string;
  messPassId: string;
  messType: 'Vegetarian' | 'Non-Vegetarian';
  travelStipendStatus: 'Approved (₹1,200 Disbursed)' | 'Pending';
  logisticsCoordinator: string;
  contactNumber: string;
}

export interface NominationInfo {
  nominationRefNo: string;
  nominatingSociety: string;
  societyRegNo: string;
  sponsorshipStatus: 'Approved by Registrar' | 'Pending Approval';
  dateNominated: string;
  programmeCode: string;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  topics: string[];
  videoUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  progress: number;
  category: string;
  lastActivity: string;
  remainingMinutes: number;
  totalModules: number;
  completedModules: number;
  description: string;
  modules: Module[];
}

export interface Assessment {
  id: string;
  title: string;
  subject: string;
  score: number;
  maxScore: number;
  targetScore: number;
  date: string;
  status: 'passed' | 'needs_improvement' | 'pending';
  attempts: number;
}

export interface SkillEvidence {
  assessmentName: string;
  score: number;
  date: string;
  validatedBy: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0 - 100
  status: 'verified' | 'developing' | 'needs_attention';
  evidenceCount: number;
  evidence: SkillEvidence[];
  recommendedAction?: string;
}

export interface Certificate {
  id: string;
  title: string;
  credentialId: string;
  issueDate: string;
  issuer: string;
  status: 'verified' | 'in_progress' | 'locked';
  qrData: string;
  skillsVerified: string[];
  pdfAvailable: boolean;
}

export interface AttendanceLog {
  date: string;
  sessionTitle: string;
  status: 'present' | 'absent' | 'excused';
  time: string;
  verificationMethod: 'Face Recognition' | 'QR Scan' | 'Biometric';
}

export interface Attendance {
  overallPercentage: number;
  presentSessions: number;
  totalSessions: number;
  absentSessions: number;
  statusMessage: string;
  recentLogs: AttendanceLog[];
}

export interface CareerOpportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  salaryRange: string;
  type: string;
  deadline: string;
  description: string;
}

export interface CareerReadiness {
  overallScore: number;
  breakdown: {
    verifiedSkills: number;
    learningProgress: number;
    assessmentScore: number;
    credentials: number;
    experience: number;
  };
  statusText: string;
  improvementTip: string;
}

export interface JourneyStage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  date: string;
  description: string;
  milestone: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface AIRecommendation {
  id: string;
  topic: string;
  pattern: string;
  currentScore: number;
  targetScore: number;
  recommendationText: string;
  estimatedMinutes: number;
  ctaText: string;
  quizQuestions: QuizQuestion[];
}

export interface ClosedLoopIntervention {
  topic: string;
  beforeScore: number;
  afterScore: number | null;
  status: 'detected' | 'in_progress' | 'verified';
  interventionCompleted: boolean;
  validatedByTrainer: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  type: 'assessment' | 'learning' | 'skill' | 'certificate' | 'career';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
}

export interface Gamification {
  streakDays: number;
  xp: number;
  level: number;
  levelTitle: string;
  badges: Badge[];
}

export interface SessionSchedule {
  id: string;
  title: string;
  time: string;
  dateLabel: string;
  location: string;
  instructor: string;
  type: 'lecture' | 'practical' | 'assessment';
}

export type UserRole = 'trainee' | 'trainer' | 'admin';

export type ActiveTab = 
  | 'overview' 
  | 'learning' 
  | 'assessments' 
  | 'skills' 
  | 'certificates' 
  | 'career' 
  | 'learning_path' 
  | 'logistics'
  | 'erp_analytics'
  | 'notifications' 
  | 'profile' 
  | 'help'
  // Trainer Specific Active Tabs
  | 'trainer_overview'
  | 'trainer_batches'
  | 'trainer_trainees'
  | 'trainer_attendance'
  | 'trainer_assessments'
  | 'trainer_skills'
  | 'trainer_interventions'
  | 'trainer_resources'
  | 'trainer_competency'
  | 'trainer_reports'
  | 'trainer_notifications'
  // Institution / Admin Specific Active Tabs
  | 'admin_overview'
  | 'admin_programmes'
  | 'admin_nominations'
  | 'admin_timetable'
  | 'admin_capacity'
  | 'admin_hostel'
  | 'admin_logistics'
  | 'admin_trainers'
  | 'admin_trainees'
  | 'admin_analytics'
  | 'admin_certification'
  | 'admin_skills'
  | 'admin_outreach'
  | 'admin_reports'
  | 'admin_network'
  | 'admin_settings';

export type Language = 'en' | 'ta' | 'hi' | 'te' | 'bn';

// ==========================================
// INSTITUTION & NETWORK ADMINISTRATION TYPES
// ==========================================

export interface InstitutionAdmin {
  id: string;
  name: string;
  role: string;
  adminId: string;
  instituteName: string;
  instituteCode: string;
  avatarUrl: string;
  email: string;
  phone: string;
  status: 'Operational' | 'Maintenance' | 'Offline';
}

export interface NetworkInstitute {
  id: string;
  name: string;
  code: string;
  location: string;
  type: 'ICM' | 'RICM' | 'VAMNICOM';
  activeProgrammes: number;
  capacityUtilisation: number; // 0 - 100
  demandStatus: 'High Demand' | 'Healthy' | 'Available' | 'Over Capacity';
  totalSeats: number;
  filledSeats: number;
  status: 'Healthy' | 'High Demand' | 'Available';
}

export interface OperationalPrioritySignal {
  id: string;
  category: 'CAPACITY GAP' | 'TRAINER CONFLICT' | 'HOSTEL PRESSURE' | 'LOW ATTENDANCE SIGNAL' | 'UNUSED CAPACITY';
  title: string;
  description: string;
  impactText: string;
  actionText: string;
  actionModal: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'POSITIVE';
}

export interface DemandSignal {
  id: string;
  programmeName: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  currentCapacity: number;
  requiredCapacity: number;
  gapOrSurplus: number;
  recommendation: string;
}

export interface ProgrammeOperationItem {
  id: string;
  title: string;
  code: string;
  institute: string;
  batch: string;
  trainerName: string;
  startDate: string;
  endDate: string;
  totalSeats: number;
  filledSeats: number;
  status: 'Active' | 'Upcoming' | 'Full' | 'At Risk' | 'Completed';
  category: string;
}

export interface NominationConflictItem {
  id: string;
  traineeName: string;
  digitalId: string;
  programmeName: string;
  instituteName: string;
  nominationStatus: 'Confirmed' | 'Conflict' | 'Pending';
  conflictReason?: string;
  existingProgramme?: {
    institute: string;
    programme: string;
    dates: string;
  };
  newProgramme?: {
    institute: string;
    programme: string;
    dates: string;
  };
}

export interface TimetableSessionAdmin {
  id: string;
  timeSlot: string;
  programme: string;
  batch: string;
  trainer: string;
  room: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  category: 'Cooperative Law' | 'Accounting' | 'Digital Operations' | 'PACS Audit';
  hasConflict?: boolean;
  conflictDetails?: string;
}

export interface HostelBlockItem {
  id: string;
  blockName: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  occupancyRate: number;
  status: 'Critical' | 'High' | 'Optimal';
}

export interface HostelAllocationItem {
  id: string;
  traineeName: string;
  programme: string;
  batch: string;
  checkIn: string;
  checkOut: string;
  block: string;
  roomNo: string;
  bedNo: string;
  status: 'Allocated' | 'Pending' | 'Checkout Alert';
}

export interface LogisticsChecklistItem {
  id: string;
  category: 'Transport' | 'Meals' | 'Training Materials' | 'Equipment' | 'Classrooms' | 'Hostel' | 'Certificates';
  title: string;
  statusText: string;
  status: 'Ready' | 'Attention' | 'Pending';
  metric: string;
}

export interface TrainerCapacityItem {
  id: string;
  name: string;
  specialisation: string;
  activeBatches: number;
  utilisation: number;
  nextAvailable: string;
  status: 'High Load' | 'Available' | 'Overloaded' | 'Optimal';
  avatarUrl: string;
}

export interface ResourceExchangeItem {
  id: string;
  resourceName: string;
  sourceInstitute: string;
  availability: string;
  isShareable: boolean;
  type: 'Trainer' | 'Classroom' | 'Equipment' | 'Programme Capacity';
}

