import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { traineeService, trainerService, adminService } from '../Services/api';
import { USE_MOCK } from '../Services/apiClient';

const DataContext = createContext(undefined);

const mockSnapshot = () => ({
  ...traineeService.getMockDashboard(),
  ...trainerService.getMockDashboard(),
  ...adminService.getMockDashboard(),
});

/**
 * Loads the dashboard data each role needs from the services layer.
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

export const DataProvider = ({ children }) => {
  const { user, isAuthenticated, isRestoring } = useAuth();
  // Mock mode renders immediately from local data; API mode starts empty and loads after sign-in.
  const [data, setData] = useState(() => (USE_MOCK ? mockSnapshot() : {}));
  const [status, setStatus] = useState(USE_MOCK ? 'ready' : 'idle');
  const [error, setError] = useState(null);

  const load = useCallback(async role => {
    setStatus('loading');
    setError(null);
    const names = bundlesFor(role);
    const results = await Promise.allSettled(names.map(name => loaders[name]()));

    const merged = {};
    let primaryError = null;
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        Object.assign(merged, result.value);
      } else if (i === 0) {
        primaryError = result.reason;
      } else {
        console.warn(`[DataContext] Optional "${names[i]}" data failed to load:`, result.reason);
      }
    });

    if (primaryError) {
      setError(primaryError);
      setStatus('error');
      return;
    }
    setData(prev => ({ ...prev, ...merged }));
    setStatus('ready');
  }, []);

  useEffect(() => {
    // Mock data is already in place; only a real backend needs a fetch after sign-in.
    if (!USE_MOCK && isAuthenticated && user?.role) load(user.role);
  }, [isAuthenticated, user?.role, load]);

  const reload = useCallback(() => user?.role && load(user.role), [user?.role, load]);

  if (isRestoring) return <LoadingScreen />;
  if (isAuthenticated && !USE_MOCK && status !== 'ready') {
    return <LoadingScreen error={status === 'error' ? error : null} onRetry={reload} />;
  }

  return <DataContext.Provider value={{ ...data, dataStatus: status, dataError: error, reloadData: reload }}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
