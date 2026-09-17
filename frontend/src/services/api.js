/**
 * services/api.js
 * The only module that talks to the FastAPI backend.
 *   1. Configuration, token storage and the HTTP client
 *   2. Every endpoint call, grouped by role
 * Each endpoint function returns mock data (src/data) while USE_MOCK is true, and calls FastAPI otherwise.
 * Full endpoint contract: frontend/BACKEND_INTEGRATION.md
 */
import * as traineeMock from '../data/mockData';
import * as trainerMock from '../data/mockTrainerData';
import * as adminMock from '../data/mockAdminData';

/* ---------------- Configuration ---------------- */

/*
 * Set these in `frontend/.env` (see `.env.example`):
 *   VITE_API_BASE_URL=http://localhost:8000/api
 *   VITE_USE_MOCK=false
 *
 * While VITE_USE_MOCK is anything other than "false", every call below resolves
 * from local mock data (src/data), so the UI runs without a backend.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/+$/, '');

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

/** Artificial latency for mock responses, so loading states are exercised. */
export const MOCK_DELAY_MS = Number(import.meta.env.VITE_MOCK_DELAY_MS ?? 250);

/** Request timeout for real API calls. */
export const REQUEST_TIMEOUT_MS = Number(import.meta.env.VITE_REQUEST_TIMEOUT_MS ?? 20000);

export const TOKEN_STORAGE_KEY = 'ncct_access_token';
export const USER_STORAGE_KEY = 'ncct_user';

/** Error raised for any non-2xx response, carrying FastAPI's `detail`. */
export class ApiError extends Error {
  constructor(message, status, detail) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

/* ---------------- Token storage ---------------- */

export const tokenStorage = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },
  set: token => {
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {
      /* storage unavailable (private mode) — token lives for this session only */
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  },
};

/* ---------------- 401 handling ---------------- */

let unauthorizedHandler = null;

/** Registered by SystemStateContext so an expired token signs the user out. */
export const onUnauthorized = handler => {
  unauthorizedHandler = handler;
};

/* ---------------- Core request ---------------- */

const buildUrl = (path, params) => {
  const url = new URL(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') url.searchParams.append(key, value);
    });
  }
  return url.toString();
};

/** FastAPI returns `detail` as a string or as a list of validation errors. */
const messageFromDetail = (detail, fallback) => {
  if (!detail) return fallback;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) return detail.map(d => d.msg || JSON.stringify(d)).join('; ');
  return fallback;
};

/**
 * Sends a request to the FastAPI backend.
 * @param {string} method  HTTP method
 * @param {string} path    Path relative to API_BASE_URL, e.g. "/trainee/dashboard"
 * @param {{ body?: any, params?: object, form?: boolean, headers?: object, auth?: boolean }} [options]
 */
export const request = async (method, path, { body, params, form = false, headers = {}, auth = true } = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const finalHeaders = { Accept: 'application/json', ...headers };
  const token = tokenStorage.get();
  if (auth && token) finalHeaders.Authorization = `Bearer ${token}`;

  let payload;
  if (body instanceof FormData) {
    payload = body;
  } else if (form && body) {
    finalHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    payload = new URLSearchParams(body).toString();
  } else if (body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(buildUrl(path, params), {
      method,
      headers: finalHeaders,
      body: payload,
      signal: controller.signal,
    });
  } catch (err) {
    const aborted = err.name === 'AbortError';
    throw new ApiError(aborted ? 'The server took too long to respond.' : 'Unable to reach the server.', 0, err.message);
  } finally {
    clearTimeout(timeout);
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = response.status === 204 ? null : isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401 && auth && unauthorizedHandler) unauthorizedHandler();
    throw new ApiError(messageFromDetail(data?.detail, `Request failed (${response.status})`), response.status, data?.detail);
  }
  return data;
};

/** Low-level HTTP helpers used by the services below. */
export const http = {
  get: (path, options) => request('GET', path, options),
  post: (path, body, options) => request('POST', path, { ...options, body }),
  put: (path, body, options) => request('PUT', path, { ...options, body }),
  patch: (path, body, options) => request('PATCH', path, { ...options, body }),
  delete: (path, options) => request('DELETE', path, options),
};

/* ---------------- Mock helper ---------------- */

/** Resolves a deep copy of mock data after a short delay, mimicking a network call. */
export const mockResponse = (data, delay = MOCK_DELAY_MS) =>
  new Promise(resolve => setTimeout(() => resolve(structuredClone(data)), delay));

const { mockTrainee } = traineeMock;
const { mockTrainer } = trainerMock;
const { mockAdmin } = adminMock;

/* ==========================================================================
   Auth
   ========================================================================== */

/**
 * Authentication endpoints (FastAPI).
 *
 *   POST /auth/login    { email, password, role }            -> { access_token, token_type, user }
 *   POST /auth/signup   { name, email, password, role, institute } -> { access_token, token_type, user }
 *   GET  /auth/me                                             -> user
 *   POST /auth/logout                                         -> 204
 *
 * `user` shape: { id, name, email, role: "trainee" | "trainer" | "admin", institute, avatar_url }
 */

const mockUsers = {
  trainee: { id: mockTrainee.id, name: mockTrainee.name, role: 'trainee', institute: mockTrainee.institute, avatar_url: mockTrainee.avatarUrl },
  trainer: { id: mockTrainer.id, name: mockTrainer.name, role: 'trainer', institute: mockTrainer.institute, avatar_url: mockTrainer.avatarUrl },
  admin: { id: mockAdmin.id, name: mockAdmin.name, role: 'admin', institute: mockAdmin.instituteName, avatar_url: mockAdmin.avatarUrl },
};

const saveSession = ({ access_token, user }) => {
  if (access_token) tokenStorage.set(access_token);
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch {
    /* ignore */
  }
  return user;
};

export const authService = {
  /** Signs in and stores the access token. Resolves to the user. */
  async login({ email, password, role }) {
    if (USE_MOCK) {
      const session = await mockResponse({ access_token: 'mock-token', token_type: 'bearer', user: { ...mockUsers[role], email } });
      return saveSession(session);
    }
    const session = await http.post('/auth/login', { email, password, role }, { auth: false });
    return saveSession(session);
  },

  /** Registers a new account and signs in. Resolves to the user. */
  async signup({ name, email, password, role, institute }) {
    if (USE_MOCK) {
      const session = await mockResponse({
        access_token: 'mock-token',
        token_type: 'bearer',
        user: { ...mockUsers[role], name: name || mockUsers[role].name, email, institute },
      });
      return saveSession(session);
    }
    const session = await http.post('/auth/signup', { name, email, password, role, institute }, { auth: false });
    return saveSession(session);
  },

  /** The user saved at sign-in, read synchronously (null if there is no stored session). */
  getStoredUser() {
    if (!tokenStorage.get()) return null;
    try {
      return JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
    } catch {
      return null;
    }
  },

  /** Returns the current user for a stored token, or null. */
  async getCurrentUser() {
    if (!tokenStorage.get()) return null;
    if (USE_MOCK) return this.getStoredUser();
    return http.get('/auth/me');
  },

  async logout() {
    try {
      if (!USE_MOCK && tokenStorage.get()) await http.post('/auth/logout');
    } catch {
      /* the local session is cleared regardless */
    } finally {
      tokenStorage.clear();
      try {
        localStorage.removeItem(USER_STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  },
};

/* ==========================================================================
   Trainee
   ========================================================================== */

/**
 * Trainee endpoints (FastAPI).
 *
 *   GET   /trainee/dashboard                    -> TraineeDashboard (see keys below)
 *   PATCH /trainee/notifications/{id}/read      -> 204
 *   POST  /trainee/booster-quiz                 { score }                      -> { score, status }
 *   POST  /attendance/check-in                  { method: "face" | "qr" }      -> { status, timestamp }
 *   POST  /trainee/career-applications          { opportunity_id }             -> { status }
 *
 * TraineeDashboard keys (camelCase, as the UI expects):
 *   trainee, hostelLogistics, nominationInfo, learningJourneyStages, courses, assessments,
 *   skills, aiRecommendation, closedLoopIntervention, certificates, attendance,
 *   careerOpportunities, careerReadiness, gamification, upcomingSchedule, notifications
 */

const traineeMockDashboard = () => ({
  trainee: traineeMock.mockTrainee,
  hostelLogistics: traineeMock.mockHostelLogistics,
  nominationInfo: traineeMock.mockNominationInfo,
  learningJourneyStages: traineeMock.mockLearningJourneyStages,
  courses: traineeMock.mockCourses,
  assessments: traineeMock.mockAssessments,
  skills: traineeMock.mockSkills,
  aiRecommendation: traineeMock.mockAIRecommendation,
  closedLoopIntervention: traineeMock.mockClosedLoopIntervention,
  certificates: traineeMock.mockCertificates,
  attendance: traineeMock.mockAttendance,
  careerOpportunities: traineeMock.mockCareerOpportunities,
  careerReadiness: traineeMock.mockCareerReadiness,
  gamification: traineeMock.mockGamification,
  upcomingSchedule: traineeMock.mockUpcomingSchedule,
  notifications: traineeMock.mockNotifications,
});

export const traineeService = {
  /** Synchronous mock snapshot, used to render instantly in mock mode. */
  getMockDashboard: traineeMockDashboard,

  getDashboard() {
    return USE_MOCK ? mockResponse(traineeMockDashboard()) : http.get('/trainee/dashboard');
  },

  markNotificationRead(notificationId) {
    return USE_MOCK ? mockResponse(null) : http.patch(`/trainee/notifications/${notificationId}/read`);
  },

  submitBoosterQuiz(score) {
    return USE_MOCK ? mockResponse({ score, status: 'verified' }) : http.post('/trainee/booster-quiz', { score });
  },

  checkInAttendance(method) {
    return USE_MOCK
      ? mockResponse({ status: 'verified', timestamp: new Date().toISOString() })
      : http.post('/attendance/check-in', { method });
  },

  applyForOpportunity(opportunityId) {
    return USE_MOCK
      ? mockResponse({ status: 'submitted' })
      : http.post('/trainee/career-applications', { opportunity_id: opportunityId });
  },
};

/* ==========================================================================
   Trainer
   ========================================================================== */

/**
 * Trainer endpoints (FastAPI).
 *
 *   GET  /trainer/dashboard                          -> TrainerDashboard (see keys below)
 *   POST /trainer/interventions                      { topic, trainees, message, duration_minutes } -> Intervention
 *   POST /trainer/competency-claims/{id}/verify      -> { id, status }
 *   POST /trainer/notes                              { trainee_id, note_text }  -> TrainerNote
 *   POST /trainer/announcements                      { message }                -> { status }
 *   POST /trainer/resources                          multipart: file, title     -> Resource
 *
 * TrainerDashboard keys:
 *   trainer, batchHealth, priorityInsights, traineeRiskList, silentWeakSpots,
 *   interventions, topicHeatmap, competencyEvidenceClaims, trainerNotes
 */

const trainerMockDashboard = () => ({
  trainer: trainerMock.mockTrainer,
  batchHealth: trainerMock.mockBatchHealth,
  priorityInsights: trainerMock.mockPriorityInsights,
  traineeRiskList: trainerMock.mockTraineeRiskList,
  silentWeakSpots: trainerMock.mockSilentWeakSpots,
  interventions: trainerMock.mockInterventions,
  topicHeatmap: trainerMock.mockTopicHeatmap,
  competencyEvidenceClaims: trainerMock.mockCompetencyEvidenceClaims,
  trainerNotes: trainerMock.mockTrainerNotes,
});

export const trainerService = {
  getMockDashboard: trainerMockDashboard,

  getDashboard() {
    return USE_MOCK ? mockResponse(trainerMockDashboard()) : http.get('/trainer/dashboard');
  },

  createIntervention({ topic, trainees, message, duration }) {
    return USE_MOCK
      ? mockResponse({ status: 'created' })
      : http.post('/trainer/interventions', { topic, trainees, message, duration_minutes: duration });
  },

  verifyCompetencyClaim(claimId) {
    return USE_MOCK
      ? mockResponse({ id: claimId, status: 'verified' })
      : http.post(`/trainer/competency-claims/${claimId}/verify`);
  },

  addTraineeNote({ traineeId, text }) {
    return USE_MOCK ? mockResponse({ status: 'saved' }) : http.post('/trainer/notes', { trainee_id: traineeId, note_text: text });
  },

  sendAnnouncement(message) {
    return USE_MOCK ? mockResponse({ status: 'sent' }) : http.post('/trainer/announcements', { message });
  },

  /** `file` is optional: the demo modal only sends a title. */
  uploadResource({ title, file }) {
    if (USE_MOCK) return mockResponse({ status: 'uploaded', title });
    const body = new FormData();
    body.append('title', title);
    if (file) body.append('file', file);
    return http.post('/trainer/resources', body);
  },
};

/* ==========================================================================
   Institution admin
   ========================================================================== */

/**
 * Institution admin endpoints (FastAPI).
 *
 *   GET  /admin/dashboard                          ?institute=ICM Chennai -> AdminDashboard (see keys below)
 *   POST /admin/programmes                         { title, code, seats }            -> Programme
 *   POST /admin/timetable/sessions                 { trainer, room, time_slot }      -> Session
 *   POST /admin/nominations/conflicts/{id}/resolve { resolution }                    -> { status }
 *   POST /admin/resource-requests                  { resource_id?, note? }           -> { status }
 *
 * AdminDashboard keys:
 *   admin, networkInstitutes, operationalSignals, demandSignals, programmeOperations,
 *   nominationConflicts, timetableSessions, hostelBlocks, hostelAllocations,
 *   logisticsChecklist, trainerCapacity, resourceExchange
 */

const adminMockDashboard = () => ({
  admin: adminMock.mockAdmin,
  networkInstitutes: adminMock.mockNetworkInstitutes,
  operationalSignals: adminMock.mockOperationalSignals,
  demandSignals: adminMock.mockDemandSignals,
  programmeOperations: adminMock.mockProgrammeOperations,
  nominationConflicts: adminMock.mockNominationConflicts,
  timetableSessions: adminMock.mockTimetableSessions,
  hostelBlocks: adminMock.mockHostelBlocks,
  hostelAllocations: adminMock.mockHostelAllocations,
  logisticsChecklist: adminMock.mockLogisticsChecklist,
  trainerCapacity: adminMock.mockTrainerCapacity,
  resourceExchange: adminMock.mockResourceExchange,
});

export const adminService = {
  getMockDashboard: adminMockDashboard,

  getDashboard(institute) {
    return USE_MOCK ? mockResponse(adminMockDashboard()) : http.get('/admin/dashboard', { params: { institute } });
  },

  createProgramme({ title, code, seats }) {
    return USE_MOCK
      ? mockResponse({ title, code, seats: Number(seats) })
      : http.post('/admin/programmes', { title, code, seats: Number(seats) });
  },

  scheduleSession({ trainer, room, time }) {
    return USE_MOCK
      ? mockResponse({ trainer, room, time_slot: time, conflicts: 0 })
      : http.post('/admin/timetable/sessions', { trainer, room, time_slot: time });
  },

  resolveNominationConflict(conflictId, resolution) {
    return USE_MOCK
      ? mockResponse({ status: 'resolved' })
      : http.post(`/admin/nominations/conflicts/${conflictId}/resolve`, { resolution });
  },

  requestResource(payload = {}) {
    return USE_MOCK ? mockResponse({ status: 'requested' }) : http.post('/admin/resource-requests', payload);
  },
};

/* ==========================================================================
   AI assistant
   ========================================================================== */

/**
 * AI assistant endpoint (FastAPI).
 *
 *   POST /ai/chat   { role, message, language }
 *     -> { reply, action_text?, action_modal?, action_tab?, evidence_badge? }
 *
 * In mock mode the assistant drawers answer from their built-in rule-based
 * responses, so `isEnabled` is false and `sendMessage` is not called.
 */
export const aiService = {
  isEnabled: !USE_MOCK,

  async sendMessage({ role, message, language }) {
    const res = await http.post('/ai/chat', { role, message, language });
    return {
      text: res.reply,
      actionText: res.action_text,
      actionModal: res.action_modal,
      actionTab: res.action_tab,
      evidenceBadge: res.evidence_badge,
    };
  },
};

/* ==========================================================================
   Offline sync
   ========================================================================== */

/**
 * Offline sync endpoint (FastAPI).
 *
 *   POST /sync   { records: [...] }   -> { synced, last_synced_at }
 *
 * Records captured while offline (attendance, quiz attempts, notes) are pushed
 * here when the device reconnects.
 */
export const syncService = {
  syncOfflineRecords(records = []) {
    return USE_MOCK
      ? mockResponse({ synced: records.length, last_synced_at: new Date().toISOString() }, 1500)
      : http.post('/sync', { records });
  },
};
