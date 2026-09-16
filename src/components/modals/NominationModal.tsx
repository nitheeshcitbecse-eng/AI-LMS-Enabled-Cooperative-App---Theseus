import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Building, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockNominationInfo, mockTrainee } from '../../data/mockData';

export const NominationModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();
  const [registered, setRegistered] = useState(false);

  if (activeModal !== 'nomination_modal') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Programme Registration & Nomination Ledger</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Official NCCT Portal
              </span>
            </div>
            <p className="text-xs text-slate-500">
              State Registrar & Primary Agricultural Credit Society (PACS) Nomination
            </p>
          </div>
        </div>

        {/* Nomination Status Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Nomination Reference:</span>
            <span className="font-mono font-bold text-indigo-900">{mockNominationInfo.nominationRefNo}</span>
          </div>

          <div className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <Building className="w-4 h-4 text-slate-500" />
              <span>{mockNominationInfo.nominatingSociety}</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">Society Registration No: {mockNominationInfo.societyRegNo}</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-500">Registrar Sponsorship:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {mockNominationInfo.sponsorshipStatus}
            </span>
          </div>
        </div>

        {/* Available Specialized Capacity Building Programmes */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Register for Next NCCT Advanced Programme
          </h4>

          <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">Advanced PACS ERP & Financial Audit Diploma</span>
              <span className="text-[10px] bg-indigo-900 text-white px-2 py-0.5 rounded font-mono">OCT 2026</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Sponsored by Ministry of Cooperation for PACS Secretaries & Cooperative Staff in Tamil Nadu.
            </p>

            <button
              onClick={() => setRegistered(true)}
              disabled={registered}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:from-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow-2xs disabled:opacity-75"
            >
              {registered ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Registration Submitted to PACS Registrar!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Register & Request PACS Nomination</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => alert('Nomination Sponsorship Slip PDF Downloaded!')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Sponsorship Slip</span>
          </button>

          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
