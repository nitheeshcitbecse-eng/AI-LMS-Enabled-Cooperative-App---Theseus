import React from 'react';
import { Briefcase, MapPin, CheckCircle2, ChevronRight, Building, Sparkles } from 'lucide-react';
import { mockCareerOpportunities } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const CareerPreviewCard: React.FC = () => {
  const { setSelectedOpportunity, openModal, setActiveTab } = useApp();

  const handleOpportunityClick = (opp: typeof mockCareerOpportunities[0]) => {
    setSelectedOpportunity(opp);
    openModal('career_detail');
  };

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Opportunities Matching Your Skills</h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
              Tamil Nadu PACS & Banks
            </span>
          </div>
          <p className="text-xs text-slate-500">Real-time matching based on your verified NCCT skill profile</p>
        </div>

        <button
          onClick={() => setActiveTab('career')}
          className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
        >
          <span>Explore All Opportunities</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Opportunity Cards List */}
      <div className="space-y-3">
        {mockCareerOpportunities.map(opp => (
          <div
            key={opp.id}
            onClick={() => handleOpportunityClick(opp)}
            className="p-4 rounded-xl border border-slate-200/80 bg-white hover:bg-indigo-50/30 hover:border-indigo-300 transition-all cursor-pointer space-y-2 group shadow-2xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                  {opp.title}
                </h4>
                <p className="text-[11px] text-slate-600 flex items-center gap-1 font-medium mt-0.5">
                  <Building className="w-3 h-3 text-slate-400" /> {opp.organization}
                </p>
              </div>

              {/* Match Badge */}
              <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-2xs shrink-0">
                {opp.matchPercentage}% Match
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {opp.location}
              </span>
              <span className="text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                Matched Skills: {opp.matchedSkills.length} verified
              </span>
              <span className="font-semibold text-slate-700">{opp.salaryRange}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
