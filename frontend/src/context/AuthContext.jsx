import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authService } from '../Services/api';
import { onUnauthorized, tokenStorage, USE_MOCK } from '../Services/apiClient';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  // Mock mode restores the saved session instantly, so a page refresh keeps the user signed in.
  const [user, setUser] = useState(() => (USE_MOCK ? authService.getStoredUser() : null));
  // With a real backend, a stored token is validated with GET /auth/me before routes render.
  const [isRestoring, setIsRestoring] = useState(() => !USE_MOCK && !!tokenStorage.get());

  // True after the user deliberately signs out, so the route guard does not remember
  // the page they were on (an expired session, by contrast, returns them there after sign-in).
  const [signedOut, setSignedOut] = useState(false);

  const logout = useCallback(async () => {
    await authService.logout();
    setSignedOut(true);
    setUser(null);
  }, []);

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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isRestoring, signedOut, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
