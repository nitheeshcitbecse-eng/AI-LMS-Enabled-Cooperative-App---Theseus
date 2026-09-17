import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/SystemStateContext';
import { PATHS, homePathFor } from '../../routes/routePaths';

export const NotFoundPage = () => {
  const { isAuthenticated, user } = useAuth();
  const target = isAuthenticated ? homePathFor(user?.role) : PATHS.LOGIN;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-white">
      <div className="flex items-center gap-3">
        <span className="ncct-wordmark text-4xl text-indigo-800">NCCT</span>
        <span className="w-px h-9 bg-slate-300" />
        <span className="text-base font-semibold uppercase tracking-wide text-slate-700">Connect</span>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-indigo-700">404</p>
        <h1 className="text-4xl font-normal text-slate-900">Page not found</h1>
        <p className="text-slate-600">The page you are looking for doesn't exist or has moved.</p>
      </div>
      <Link to={target} className="ncct-btn-primary">
        <ArrowLeft className="w-4 h-4" />
        {isAuthenticated ? 'Back to dashboard' : 'Go to sign in'}
      </Link>
    </div>
  );
};
