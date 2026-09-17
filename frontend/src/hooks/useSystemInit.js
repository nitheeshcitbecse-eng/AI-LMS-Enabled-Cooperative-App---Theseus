import { useCallback, useEffect, useState } from 'react';
import { useApi } from './useApi';
import { adminService, authService, onUnauthorized, tokenStorage, traineeService, trainerService, USE_MOCK } from '../services/api';

const mockSnapshot = () => ({
  ...traineeService.getMockDashboard(),
  ...trainerService.getMockDashboard(),
  ...adminService.getMockDashboard(),
});

/**
 * Dashboard bundles each role needs.
 * Admins and trainers can switch into other views, so they also load those bundles.
 */
const bundlesFor = role => {
  if (role === 'admin') return ['admin', 'trainer', 'trainee'];
  if (role === 'trainer') return ['trainer', 'trainee'];
  return ['trainee'];
};

const loaders = {
  trainee: () => traineeService.getDashboard(),
  trainer: () => trainerService.getDashboard(),
  admin: () => adminService.getDashboard(),
};

/** Loads every bundle for a role. The role's own bundle is required; the others are optional. */
const loadDashboards = async role => {
  const names = bundlesFor(role);
  const results = await Promise.allSettled(names.map(name => loaders[name]()));

  const merged = {};
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      Object.assign(merged, result.value);
    } else if (i === 0) {
      throw result.reason;
    } else {
      console.warn(`[useSystemInit] Optional "${names[i]}" data failed to load:`, result.reason);
    }
  });
  return merged;
};

/**
 * Boots the app: restores the session and loads dashboard data for the signed-in role.
 *
 * Mock mode restores the saved session and data synchronously, so a refresh renders instantly.
 * With a real backend, a stored token is validated with GET /auth/me, then the role's
 * dashboards are fetched.
 */
export const useSystemInit = () => {
  /* ---------------- Session ---------------- */

  const [user, setUser] = useState(() => (USE_MOCK ? authService.getStoredUser() : null));
  const [isRestoring, setIsRestoring] = useState(() => !USE_MOCK && !!tokenStorage.get());

  // True after the user deliberately signs out, so the route guard does not remember
  // the page they were on (an expired session, by contrast, returns them there after sign-in).
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    onUnauthorized(() => setUser(null));
    if (USE_MOCK || !tokenStorage.get()) return;
    authService
      .getCurrentUser()
      .then(current => setUser(current))
      .catch(() => authService.logout())
      .finally(() => setIsRestoring(false));
  }, []);

  const login = useCallback(async credentials => {
    const signedIn = await authService.login(credentials);
    setSignedOut(false);
    setUser(signedIn);
    return signedIn;
  }, []);

  const signup = useCallback(async details => {
    const created = await authService.signup(details);
    setSignedOut(false);
    setUser(created);
    return created;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setSignedOut(true);
    setUser(null);
  }, []);

  /* ---------------- Dashboard data ---------------- */

  const dashboards = useApi(loadDashboards, {
    initialData: USE_MOCK ? mockSnapshot() : {},
    initialStatus: USE_MOCK ? 'ready' : 'idle',
    // Keep bundles from an earlier load alongside the new ones.
    merge: (previous, result) => ({ ...previous, ...result }),
  });
  const { execute: loadRole } = dashboards;

  const isAuthenticated = !!user;
  const role = user?.role;

  useEffect(() => {
    // Mock data is already in place; only a real backend needs a fetch after sign-in.
    if (!USE_MOCK && isAuthenticated && role) loadRole(role);
  }, [isAuthenticated, role, loadRole]);

  const reloadData = useCallback(() => role && loadRole(role), [role, loadRole]);

  return {
    auth: { user, isAuthenticated, isRestoring, signedOut, login, signup, logout },
    data: {
      ...dashboards.data,
      dataStatus: dashboards.status,
      dataError: dashboards.error,
      reloadData,
    },
  };
};
