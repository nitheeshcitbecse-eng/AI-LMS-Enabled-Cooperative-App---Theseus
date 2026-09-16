import React from 'react';
import { BadgeCheck, QrCode, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';

export const AdminCertificationView: React.FC = () => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Certification Pipeline & Verification Repository</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              Blockchain-Ready Credentials
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official NCCT micro-credentials pipeline, digital sign-offs, and public QR verification status.
          </p>
        </div>
      </div>

      {/* Funnel */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase block">Assessments Completed</span>
          <div className="text-2xl font-black text-slate-900">1,032</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-indigo-700 font-bold uppercase block">Eligibility Verified</span>
          <div className="text-2xl font-black text-indigo-950">980</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-teal-200 shadow-2xs space-y-1">
          <span className="text-xs text-teal-700 font-bold uppercase block">Processing Issue</span>
          <div className="text-2xl font-black text-teal-900">947</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-300 shadow-2xs space-y-1 bg-emerald-50/20">
          <span className="text-xs text-emerald-800 font-bold uppercase block">Certified & Issued</span>
          <div className="text-2xl font-black text-emerald-900">812</div>
        </div>
      </div>
    </div>
  );
};
