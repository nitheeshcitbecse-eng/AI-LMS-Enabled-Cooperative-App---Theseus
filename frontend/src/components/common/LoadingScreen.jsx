import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/** Full-page state shown while dashboard data loads from the API, or when it fails. */
export const LoadingScreen = ({ error, onRetry }) => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center bg-white">
      <div className="flex items-center gap-3">
        <span className="ncct-wordmark text-4xl text-indigo-800">NCCT</span>
        <span className="w-px h-9 bg-slate-300" />
        <span className="text-base font-semibold uppercase tracking-wide text-slate-700">Connect</span>
      </div>

      {error ? (
        <div className="max-w-md space-y-4">
          <div className="flex items-center justify-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-lg font-semibold">We couldn't load your dashboard</p>
          </div>
          <p className="text-slate-600">{error.message || 'Please check your connection and try again.'}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={onRetry} className="ncct-btn-primary">
              <RefreshCw className="w-4 h-4" /> Try again
            </button>
            <button onClick={logout} className="ncct-btn-secondary">
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-slate-600">
          <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
          <span>Loading your dashboard…</span>
        </div>
      )}
    </div>
  );
};
