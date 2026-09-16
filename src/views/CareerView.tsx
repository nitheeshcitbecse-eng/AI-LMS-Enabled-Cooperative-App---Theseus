import React from 'react';
import { Building, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareerReadinessCard } from '../components/dashboard/CareerReadinessCard';

export const CareerView: React.FC = () => {
  const { opportunities, setSelectedOpportunity, openModal } = useApp();

  const handleOpportunityClick = (opp: typeof opportunities[0]) => {
    setSelectedOpportunity(opp);
    openModal('career_detail');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Career & Placement Ecosystem Preview</h1>
          <p className="text-xs text-slate-500">
            Directly matching your NCCT verified skills with Tamil Nadu Cooperative Banks & PACS
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Part 1 Trainee Preview</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Recommended Cooperative Openings</h3>

          {opportunities.map(opp => (
            <div
              key={opp.id}
              onClick={() => handleOpportunityClick(opp)}
              className="ncct-card p-5 space-y-3 hover:border-indigo-300 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{opp.title}</h4>
                  <p className="text-xs text-slate-600 flex items-center gap-1 font-semibold mt-0.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" /> {opp.organization}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-2xs">
                  {opp.matchPercentage}% Skill Match
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                {opp.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {opp.location}
                </span>
                <span className="font-semibold text-slate-800">{opp.salaryRange}</span>
                <button className="text-indigo-700 font-bold hover:underline flex items-center gap-0.5">
                  View Role Details & Apply <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <CareerReadinessCard />
        </div>
      </div>
    </div>
  );
};
