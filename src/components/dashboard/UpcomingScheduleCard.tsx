import React from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight } from 'lucide-react';
import { mockUpcomingSchedule } from '../../data/mockData';

export const UpcomingScheduleCard: React.FC = () => {
  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Upcoming Sessions</h3>
          <p className="text-xs text-slate-500">ICM Chennai live timetable</p>
        </div>
        <span className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 cursor-pointer flex items-center gap-1">
          Full Schedule <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-3">
        {mockUpcomingSchedule.map(item => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            {/* Calendar Date Badge */}
            <div className="w-12 h-12 rounded-lg bg-indigo-900 text-white flex flex-col items-center justify-center shrink-0 shadow-2xs">
              <span className="text-[10px] font-semibold uppercase text-indigo-200">{item.dateLabel}</span>
              <Calendar className="w-4 h-4 text-emerald-400 mt-0.5" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  item.type === 'assessment'
                    ? 'bg-amber-100 text-amber-800'
                    : item.type === 'practical'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {item.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> {item.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {item.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
