import React from 'react';
import { Database, TrendingUp, Users, Building2, BarChart2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const ERPAnalyticsView: React.FC = () => {
  const nationalData = [
    { region: 'Tamil Nadu (ICM Chennai)', trainees: 1420, erpAdoption: 94, verifiedSkills: 88 },
    { region: 'Maharashtra (RICM Pune)', trainees: 1680, erpAdoption: 91, verifiedSkills: 85 },
    { region: 'Gujarat (ICM Gandhinagar)', trainees: 1350, erpAdoption: 96, verifiedSkills: 90 },
    { region: 'Karnataka (ICM Bengaluru)', trainees: 1210, erpAdoption: 89, verifiedSkills: 82 },
    { region: 'Kerala (ICM Trivandrum)', trainees: 1100, erpAdoption: 93, verifiedSkills: 86 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">NCCT National ERP & Centralized Data Analytics</h1>
          <p className="text-xs text-slate-500">
            Real-time monitoring across 28 Institutes of Cooperative Management (ICMs) & PACS Computerization
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold">
          <Database className="w-4 h-4 text-indigo-600" />
          <span>Centralized National Database</span>
        </div>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="ncct-card p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total NCCT Trainees</span>
          <span className="text-2xl font-extrabold text-indigo-950 block">14,280</span>
          <span className="text-[11px] text-emerald-700 font-semibold">↑ +14.2% YoY Outreach</span>
        </div>

        <div className="ncct-card p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">PACS ERP Computerization</span>
          <span className="text-2xl font-extrabold text-teal-700 block">94.2%</span>
          <span className="text-[11px] text-teal-800 font-semibold">63,000 PACS Onboarded</span>
        </div>

        <div className="ncct-card p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Verified Skill Badges</span>
          <span className="text-2xl font-extrabold text-emerald-700 block">38,940</span>
          <span className="text-[11px] text-emerald-800 font-semibold">Tamper-Proof Ledger</span>
        </div>

        <div className="ncct-card p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Placement Match Rate</span>
          <span className="text-2xl font-extrabold text-amber-700 block">89.6%</span>
          <span className="text-[11px] text-amber-800 font-semibold">Cooperative Societies</span>
        </div>
      </div>

      {/* Main Bar Chart: Regional Capacity Building */}
      <div className="ncct-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Regional Outreach & PACS Computerization Readiness</h3>
            <p className="text-xs text-slate-500">Cross-state capacity building metrics across key Institutes of Cooperative Management</p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded border border-indigo-200">
            Live Feed: 2026 Batch
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nationalData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="region" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1b4b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="trainees" fill="#3730a3" name="Active Trainees" radius={[4, 4, 0, 0]} />
              <Bar dataKey="erpAdoption" fill="#0d9488" name="PACS ERP Adoption %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="verifiedSkills" fill="#059669" name="Verified Skill Rate %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
