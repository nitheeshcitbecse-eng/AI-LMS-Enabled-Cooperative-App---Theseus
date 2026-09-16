import React, { useState } from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2, Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockTrainee } from '../../data/mockData';

export const QRVerificationModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();
  const [copied, setCopied] = useState(false);

  if (activeModal !== 'qr_verify') return null;

  const verificationHash = '0x8f4a9b...7c2e91';
  const qrUrl = `https://ncct.gov.in/verify/profile/${mockTrainee.digitalId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">NCCT Verified Credential</h3>
          <p className="text-xs text-slate-500">Official National Council for Cooperative Training Ledger</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <div className="w-44 h-44 bg-white border-2 border-indigo-900 rounded-xl p-2 mx-auto flex items-center justify-center shadow-inner relative group">
            <div className="w-full h-full bg-slate-900 p-2 rounded flex flex-col items-center justify-center text-white">
              <QrCode className="w-32 h-32 text-emerald-400" />
              <span className="text-[8px] font-mono text-slate-300 mt-1">NCCT-BLOCKCHAIN-LEDGER</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Cryptographically Signed & Valid</span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-700 bg-slate-50/70 p-3 rounded-lg border border-slate-200">
          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span className="text-slate-500">Trainee Name:</span>
            <span className="font-bold text-slate-900">{mockTrainee.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span className="text-slate-500">Digital ID:</span>
            <span className="font-mono font-bold text-indigo-900">{mockTrainee.digitalId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span className="text-slate-500">Institute:</span>
            <span className="font-semibold text-slate-800">{mockTrainee.institute}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Ledger Hash:</span>
            <span className="font-mono text-slate-500 text-[10px]">{verificationHash}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={copyLink}
            className="flex-1 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs border border-indigo-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Verification URL!' : 'Copy Public Verification Link'}</span>
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
