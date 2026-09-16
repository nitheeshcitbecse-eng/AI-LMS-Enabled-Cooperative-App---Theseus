import React from 'react';
import { X, ShieldCheck, Download, Share2, QrCode, Award, CheckCircle2, FileText, Printer } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockTrainee } from '../../data/mockData';

export const CertificateDetailModal: React.FC = () => {
  const { activeModal, closeModal, selectedCertificate, openModal } = useApp();

  if (activeModal !== 'certificate_detail' || !selectedCertificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert(`Downloading Sample Certificate PDF for ${mockTrainee.name} (${selectedCertificate.credentialId})...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 lg:p-8 shadow-2xl border border-slate-200 space-y-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold border border-amber-200">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Official NCCT Verified Sample Certificate</h2>
              <p className="text-xs text-slate-500">Tamper-Proof Blockchain Credential • Credential ID: {selectedCertificate.credentialId}</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* HIGH RESOLUTION SAMPLE CERTIFICATE DOCUMENT PREVIEW */}
        <div className="p-8 lg:p-12 rounded-2xl bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 border-8 border-double border-indigo-950/20 shadow-xl relative text-center space-y-6 select-none">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-indigo-950/40" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-indigo-950/40" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-indigo-950/40" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-indigo-950/40" />

          {/* Certificate Header Banner */}
          <div className="space-y-1.5 pt-2">
            <div className="w-16 h-16 rounded-full bg-indigo-950 text-amber-400 font-serif font-black text-xl flex items-center justify-center mx-auto shadow-lg border-2 border-amber-400">
              NCCT
            </div>
            <h1 className="text-sm lg:text-base font-serif font-black tracking-widest text-indigo-950 uppercase">
              National Council for Cooperative Training (NCCT)
            </h1>
            <p className="text-xs text-slate-600 font-medium tracking-wide">
              Ministry of Cooperation • Government of India, New Delhi
            </p>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase pt-1">
              National Accreditation Code: NCCT-GOI-2026-CERT-884
            </p>
          </div>

          {/* Divider Ribbon */}
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-3" />

          {/* Main Certificate Title */}
          <div className="space-y-3">
            <h2 className="text-xl lg:text-2xl font-serif font-extrabold text-amber-700 tracking-wide uppercase">
              Certificate of Skill Competency
            </h2>
            <p className="text-xs text-slate-500 font-serif italic">This is to officially certify that</p>

            <div className="py-1">
              <span className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 border-b-2 border-indigo-950 pb-1 px-6 inline-block">
                {mockTrainee.name}
              </span>
              <p className="text-[11px] text-slate-500 font-mono mt-1">Roll No: {mockTrainee.id} • Batch: {mockTrainee.batch}</p>
            </div>

            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed font-serif">
              has successfully completed the prescribed national curriculum and practical evaluation for
            </p>

            <div className="p-4 rounded-xl bg-indigo-950 text-white max-w-xl mx-auto shadow-md border border-indigo-900">
              <h3 className="text-base font-bold text-amber-300 font-sans">
                {selectedCertificate.title}
              </h3>
              <p className="text-xs text-indigo-200 mt-1 font-sans">
                Evaluation Grade: <span className="font-bold text-emerald-400">Distinction (88.4%)</span> • Issued at <span className="font-semibold text-white">{mockTrainee.institute}</span>
              </p>
            </div>
          </div>

          {/* Footer Signatures & QR Seal Area */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-3 items-end gap-4 text-left">
            {/* Signature 1 */}
            <div className="text-center space-y-1">
              <div className="font-serif italic text-indigo-950 font-bold text-sm tracking-wide">Dr. Priya Raman</div>
              <div className="w-28 h-0.5 bg-slate-400 mx-auto" />
              <p className="text-[10px] text-slate-500 font-bold uppercase">Senior Director of Training</p>
              <p className="text-[9px] text-slate-400">{mockTrainee.institute}</p>
            </div>

            {/* Central QR Code Seal */}
            <div className="text-center space-y-1 flex flex-col items-center justify-center">
              <div className="w-16 h-16 p-1 bg-white border-2 border-emerald-500 rounded-xl shadow-md flex items-center justify-center">
                <QrCode className="w-14 h-14 text-indigo-950" />
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block">
                QR VERIFIED
              </span>
            </div>

            {/* Signature 2 */}
            <div className="text-center space-y-1">
              <div className="font-serif italic text-indigo-950 font-bold text-sm tracking-wide">Meena Krishnan</div>
              <div className="w-28 h-0.5 bg-slate-400 mx-auto" />
              <p className="text-[10px] text-slate-500 font-bold uppercase">Secretary & Registrar</p>
              <p className="text-[9px] text-slate-400">NCCT New Delhi</p>
            </div>
          </div>

          {/* Verification Bar */}
          <div className="pt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-200">
            <span>Issue Date: {selectedCertificate.issueDate}</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Immutable Blockchain Credential
            </span>
            <span>Expiry: Lifetime Valid</span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => openModal('qr_verify')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <QrCode className="w-4 h-4 text-indigo-950" />
            <span>Verify Credential QR</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Certificate</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" /> Download PDF Certificate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
