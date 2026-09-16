import React from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Notifications & System Alerts</h1>
          <p className="text-xs text-slate-500">Real-time alerts regarding assessments, booster recommendations, and credentials</p>
        </div>
      </div>

      <div className="ncct-card p-6 space-y-3">
        {notifications.map(item => (
          <div
            key={item.id}
            onClick={() => markNotificationAsRead(item.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              !item.read
                ? 'bg-indigo-50/50 border-indigo-200 font-semibold'
                : 'bg-white border-slate-200 opacity-80'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                item.priority === 'high'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-indigo-100 text-indigo-700'
              }`}>
                <Bell className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </div>
                <p className="text-xs text-slate-600 font-normal">{item.message}</p>
                <span className="text-[10px] text-slate-400 font-mono block">{item.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
