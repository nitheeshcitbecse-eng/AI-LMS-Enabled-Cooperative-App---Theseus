import React from 'react';
import { Award, QrCode, ShieldCheck, Download, Printer } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockCertificates } from '../data/mockData';
import { DigitallyVerifiedCertificate } from '../components/certificate/DigitallyVerifiedCertificate';

export const CertificatesView: React.FC = () => {
  const { openModal, setSelectedCertificate } = useApp();

  const handleVerify = (cert: typeof mockCertificates[0]) => {
    setSelectedCertificate(cert);
    openModal('qr_verify');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Certificates & Digital Credentials</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
              NCCT Verified Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-proof digital credentials verified by NCCT Blockchain & Ministry of Cooperation.
          </p>
        </div>

        <button
          onClick={() => handleVerify(mockCertificates[0])}
          className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-emerald-400" />
          <span>Verify Credential QR</span>
        </button>
      </div>

      {/* INLINE DIGITALLY VERIFIED SAMPLE CERTIFICATE DOCUMENT DISPLAY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" /> Digitally Verified Sample Certificate
          </h2>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            ✓ Live Status: Active Credential
          </span>
        </div>

        {/* Embedded Visual Certificate */}
        <DigitallyVerifiedCertificate certificate={mockCertificates[0]} showActions={true} />
      </div>

      {/* Additional Credentials List */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-extrabold text-slate-900">All Earned Credentials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockCertificates.map(cert => (
            <div key={cert.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{cert.title}</h4>
                    <span className="text-[10px] font-mono text-slate-500">Credential ID: {cert.credentialId}</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ✓ Verified
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                <p><strong>Issuer:</strong> {cert.issuer}</p>
                <p><strong>Issue Date:</strong> {cert.issueDate}</p>
                <p><strong>Verified Skills:</strong> {cert.skillsVerified.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
