/**
 * Services/apiClient.js
 * Configuration, token storage and the HTTP client used to talk to the FastAPI backend.
 * Endpoint functions live in Services/api.js.
 */

/* ---------------- Configuration ---------------- */

/*
 * Set these in `frontend/.env` (see `.env.example`):
 *   VITE_API_BASE_URL=http://localhost:8000/api
 *   VITE_USE_MOCK=false
 *
 * While VITE_USE_MOCK is anything other than "false", every call in api.js resolves
 * from local mock data (src/utils/mock), so the UI runs without a backend.
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

/** Registered by AuthContext so an expired token signs the user out. */
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

/** Low-level HTTP helpers used by Services/api.js. */
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
