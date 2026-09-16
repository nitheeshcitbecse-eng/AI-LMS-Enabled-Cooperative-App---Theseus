import React from 'react';
import { ShieldCheck, QrCode, Download, Printer, Award, CheckCircle2, FileCheck } from 'lucide-react';
import { mockTrainee, mockCertificates } from '../../data/mockData';

interface DigitallyVerifiedCertificateProps {
  certificate?: typeof mockCertificates[0];
  showActions?: boolean;
}

export const DigitallyVerifiedCertificate: React.FC<DigitallyVerifiedCertificateProps> = ({
  certificate = mockCertificates[0],
  showActions = true,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert(`Downloading Sample PDF Certificate for ${mockTrainee.name} (${certificate.credentialId})...`);
  };

  return (
    <div className="space-y-4">
      {/* DIGITALLY VERIFIED SAMPLE CERTIFICATE DOCUMENT CONTAINER */}
      <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 border-8 border-double border-slate-900/30 shadow-2xl relative text-center space-y-6 select-none overflow-hidden">
        
        {/* Decorative Corner Filigrees */}
        <div className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-amber-600/80 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-amber-600/80 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-amber-600/80 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-amber-600/80 rounded-br-lg pointer-events-none" />

        {/* Verification Status Ribbon Header */}
        <div className="flex items-center justify-between border-b border-amber-200/80 pb-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-800 font-extrabold bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>NCCT TAMPER-PROOF DIGITALLY VERIFIED</span>
          </span>
          <span className="text-slate-500 font-bold hidden sm:inline">
            BLOCKCHAIN HASH: <span className="text-slate-800 font-mono">0x9F4A...28491</span>
          </span>
        </div>

        {/* Header Crest & Ministry Branding */}
        <div className="space-y-2 pt-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950 text-amber-400 font-serif font-black text-xl sm:text-2xl flex items-center justify-center mx-auto shadow-xl border-4 border-amber-400">
            NCCT
          </div>
          <h1 className="text-base sm:text-xl font-serif font-black tracking-widest text-slate-950 uppercase leading-snug">
            National Council for Cooperative Training (NCCT)
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold tracking-wide">
            Ministry of Cooperation • Government of India, New Delhi
          </p>
          <p className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase">
            National Credential Accreditation ID: <span className="text-slate-700 font-bold">{certificate.credentialId}</span>
          </p>
        </div>

        {/* Golden Separator Line */}
        <div className="w-64 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full my-2" />

        {/* Main Certificate Title & Recipient Body */}
        <div className="space-y-4 py-2">
          <h2 className="text-xl sm:text-3xl font-serif font-extrabold text-amber-700 tracking-wider uppercase">
            Certificate of National Competency
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-serif italic">This is to officially certify that</p>

          <div className="py-2">
            <span className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 border-b-2 border-slate-900 pb-1.5 px-8 inline-block drop-shadow-xs">
              {mockTrainee.name}
            </span>
            <p className="text-xs text-slate-600 font-mono mt-2 font-bold">
              Roll No: <span className="text-indigo-950">{mockTrainee.id}</span> • Batch ID: <span className="text-indigo-950">{mockTrainee.batch}</span>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed font-serif">
            has successfully completed the prescribed national cooperative training program, practical evaluation and assessment for
          </p>

          {/* Certificate Course Title Highlight Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-white max-w-2xl mx-auto shadow-lg border-2 border-amber-400/80 space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-amber-300 font-sans tracking-wide">
              {certificate.title}
            </h3>
            <p className="text-xs text-slate-300 font-sans">
              Evaluated at <span className="font-bold text-white">{mockTrainee.institute}</span> • Grade: <span className="font-extrabold text-emerald-400">Pass with Distinction (88.4%)</span>
            </p>
          </div>
        </div>

        {/* Verified Skills Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 max-w-xl mx-auto">
          <span className="text-xs font-bold text-slate-500 mr-1">Verified Competencies:</span>
          {certificate.skillsVerified.map(skill => (
            <span key={skill} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 text-[11px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              {skill}
            </span>
          ))}
        </div>

        {/* Official Signatures & Central QR Seal */}
        <div className="pt-8 border-t-2 border-slate-300/80 grid grid-cols-3 items-end gap-4 text-left">
          {/* Signature 1 */}
          <div className="text-center space-y-1">
            <div className="font-serif italic text-slate-950 font-bold text-sm sm:text-base tracking-wide">Dr. Priya Raman</div>
            <div className="w-32 h-0.5 bg-slate-400 mx-auto" />
            <p className="text-[10px] sm:text-xs text-slate-700 font-extrabold uppercase">Senior Director of Training</p>
            <p className="text-[9px] sm:text-[10px] text-slate-500">{mockTrainee.institute}</p>
          </div>

          {/* Central QR Code Seal */}
          <div className="text-center space-y-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 p-1.5 bg-white border-2 border-emerald-500 rounded-2xl shadow-xl flex items-center justify-center">
              <QrCode className="w-16 h-16 sm:w-20 sm:h-20 text-slate-950" />
            </div>
            <span className="text-[10px] font-mono font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 block shadow-2xs">
              OFFICIAL QR VERIFIED
            </span>
          </div>

          {/* Signature 2 */}
          <div className="text-center space-y-1">
            <div className="font-serif italic text-slate-950 font-bold text-sm sm:text-base tracking-wide">Meena Krishnan</div>
            <div className="w-32 h-0.5 bg-slate-400 mx-auto" />
            <p className="text-[10px] sm:text-xs text-slate-700 font-extrabold uppercase">Secretary & Registrar</p>
            <p className="text-[9px] sm:text-[10px] text-slate-500">NCCT New Delhi</p>
          </div>
        </div>

        {/* Footer Verification Ledger */}
        <div className="pt-3 text-[10px] sm:text-xs text-slate-500 font-mono flex items-center justify-between border-t border-slate-200">
          <span>Issue Date: <strong className="text-slate-800">{certificate.issueDate}</strong></span>
          <span className="text-emerald-800 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Digital Ledger Verified
          </span>
          <span>Expiry: Lifetime Valid</span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800">Verified Sample Certificate Document</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Certificate</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Official PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
