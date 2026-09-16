import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS, homePathFor } from './routePaths';

/**
 * Pages for signed-out users only (sign-in). Once signed in, the user goes to the page
 * they originally requested (saved by ProtectedRoute), or to their home page.
 */
export const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname;
    return <Navigate to={from && from !== PATHS.LOGIN ? from : homePathFor(user?.role)} replace />;
  }
  return <Outlet />;
};
