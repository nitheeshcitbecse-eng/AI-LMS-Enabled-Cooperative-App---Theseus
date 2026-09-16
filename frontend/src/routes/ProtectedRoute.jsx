import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS, canAccessRole, homePathFor } from './routePaths';

/** Requires a signed-in user; otherwise sends them to /login and remembers where they were going. */
export const ProtectedRoute = () => {
  const { isAuthenticated, signedOut } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace state={signedOut ? undefined : { from: location }} />;
  }
  return <Outlet />;
};

/** Restricts a portal to the roles allowed to open it; others are sent to their own home page. */
export const RoleRoute = ({ role }) => {
  const { user } = useAuth();

  if (!canAccessRole(user?.role, role)) {
    return <Navigate to={homePathFor(user?.role)} replace />;
  }
  return <Outlet />;
};
