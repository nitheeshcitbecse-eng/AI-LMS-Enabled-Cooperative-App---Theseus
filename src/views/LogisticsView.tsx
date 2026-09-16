import React from 'react';
import { Home, Calendar, Clock, MapPin, Phone, CheckCircle2, ShieldCheck, Utensils, Compass, Bus } from 'lucide-react';
import { mockHostelLogistics, mockUpcomingSchedule } from '../data/mockData';

export const LogisticsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Timetable, Hostel & Campus Logistics</h1>
          <p className="text-xs text-slate-500">ICM Chennai Residential Trainee Facilities & Logistics Management</p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Hostel Allotted & Verified</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Timetable & Hostel Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hostel Room Allocation Card */}
          <div className="ncct-card p-6 space-y-4 border-l-4 border-l-indigo-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-900 text-emerald-400 flex items-center justify-center font-bold shadow-xs">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Hostel Room & Mess Pass</h3>
                  <p className="text-xs text-slate-500">Campus Residence details for ICM Chennai</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-900 px-2.5 py-1 rounded border border-indigo-200">
                {mockHostelLogistics.messPassId}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 uppercase font-bold text-[10px] block">Block & Room</span>
                <span className="font-bold text-slate-900 block">{mockHostelLogistics.hostelBlock}</span>
                <span className="font-semibold text-indigo-700 block">{mockHostelLogistics.roomNo}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 uppercase font-bold text-[10px] block">Dining & Mess</span>
                <span className="font-bold text-slate-900 block flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-amber-600" /> {mockHostelLogistics.messType} Dining Hall
                </span>
                <span className="text-[11px] text-slate-600 block">Breakfast: 7:30 AM | Dinner: 8:00 PM</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">
              <span className="flex items-center gap-1.5">
                <Bus className="w-4 h-4 text-emerald-600" /> Travel Stipend: <strong>{mockHostelLogistics.travelStipendStatus}</strong>
              </span>
              <span className="text-slate-600 font-normal">Warden Contact: {mockHostelLogistics.contactNumber}</span>
            </div>
          </div>

          {/* Classroom Timetable */}
          <div className="ncct-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Daily Timetable & Classroom Schedule</h3>
            <div className="space-y-3">
              {mockUpcomingSchedule.map(item => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.title}</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <span><Clock className="w-3 h-3 inline text-slate-400" /> {item.time}</span>
                      <span><MapPin className="w-3 h-3 inline text-slate-400" /> {item.location}</span>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200">
                    {item.instructor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Logistics Contacts */}
        <div className="lg:col-span-1 space-y-6">
          <div className="ncct-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Campus Logistics Contacts</h3>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">{mockHostelLogistics.logisticsCoordinator}</span>
                <span className="text-[10px] text-slate-500 block">Hostel Warden & Logistics</span>
                <span className="font-mono text-indigo-900 font-semibold block mt-1">{mockHostelLogistics.contactNumber}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">ICM Chennai Main Control Desk</span>
                <span className="text-[10px] text-slate-500 block">24/7 Helpline & Medical Assist</span>
                <span className="font-mono text-indigo-900 font-semibold block mt-1">+91 44 2621 4321</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
