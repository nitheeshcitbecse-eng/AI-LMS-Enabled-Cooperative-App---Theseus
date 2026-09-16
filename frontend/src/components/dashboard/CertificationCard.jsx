import React from 'react';
import { Award, Eye, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';

export const CertificationCard = () => {
  const { certificates: certificatesData } = useData();
  const { openModal, setSelectedCertificate, setActiveTab } = useApp();

  const handleViewCert = (cert) => {
    setSelectedCertificate(cert);
    openModal('certificate_detail');
  };

  const handleVerifyCert = (cert) => {
    setSelectedCertificate(cert);
    openModal('qr_verify');
  };

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Digitally Verified Credentials</h3>
            <p className="text-xs text-slate-500">NCCT Tamper-Proof Sample Certificates Ledger</p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('certificates')}
          className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-lg transition-colors"
        >
          View Full Certificate Section
        </button>
      </div>

      {/* SAMPLE CERTIFICATE DOCUMENT BANNER PREVIEW */}
      <div
        onClick={() => handleViewCert(certificatesData[0])}
        className="p-4 rounded-2xl ncct-chrome text-white cursor-pointer hover:border-amber-400 border border-slate-800 transition-all shadow-md group relative overflow-hidden space-y-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] tabular-nums font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
            OFFICIAL SAMPLE CERTIFICATE
          </span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Digitally Signed
          </span>
        </div>

        <div>
          <h4 className="text-sm font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
            {certificatesData[0].title}
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Credential ID: <span className="tabular-nums text-amber-300">{certificatesData[0].credentialId}</span> • National Accreditation Code
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400 tabular-nums text-[11px]">Issued by NCCT New Delhi</span>
          <span className="text-teal-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <Eye className="w-3.5 h-3.5" /> Click to Open Certificate Document →
          </span>
        </div>
      </div>

      {/* Certificate Progress Bar */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
        <div className="flex items-center justify-between font-bold">
          <span className="text-slate-800">Overall Diploma Progress</span>
          <span className="text-emerald-700">68% Unlocked</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full rounded-full bg-emerald-500 w-[68%]" />
        </div>
      </div>
    </div>
  );
};
