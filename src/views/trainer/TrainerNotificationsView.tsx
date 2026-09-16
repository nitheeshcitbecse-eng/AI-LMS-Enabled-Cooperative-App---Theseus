import React from 'react';
import { Bell, AlertCircle, CheckCircle2, Sparkles, UserCheck, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrainerNotificationsView: React.FC = () => {
  const notifications = [
    { title: 'AI Risk Alert: Arun Kumar score dropped below 50%', time: '10 mins ago', type: 'RISK', unread: true, desc: 'AI Intelligence engine flagged 2 consecutive low quiz scores in Cooperative Accounting.' },
    { title: 'Remedial Submission: Arun Kumar completed assigned quiz', time: '1 hour ago', type: 'SUCCESS', unread: true, desc: 'Arun scored 74% (+28% post-intervention improvement).' },
    { title: 'Competency Claim: Meena R. submitted audit balance sheet evidence', time: '3 hours ago', type: 'CLAIM', unread: false, desc: 'Requires digital sign-off from Dr. Priya Raman.' },
    { title: 'Biometric Attendance: 40/42 trainees verified for morning session', time: '4 hours ago', type: 'INFO', unread: false, desc: '2 trainees marked absent (Prakash K., Suresh T.).' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Trainer Notification Stream</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
              Live AI Signals
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Realtime updates on trainee interventions, AI risk triggers, biometric attendance alerts, and competency verification claims.
          </p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        {notifications.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
              item.unread ? 'bg-indigo-50/40 border-indigo-200' : 'bg-white border-slate-200'
            }`}
          >
            <div className="mt-0.5">
              {item.type === 'RISK' ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : item.type === 'SUCCESS' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : item.type === 'CLAIM' ? (
                <Sparkles className="w-5 h-5 text-amber-500" />
              ) : (
                <Bell className="w-5 h-5 text-indigo-500" />
              )}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
              </div>
              <p className="text-xs text-slate-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
