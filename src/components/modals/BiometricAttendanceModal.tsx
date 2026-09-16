import React, { useState, useEffect } from 'react';
import { X, Camera, Scan, CheckCircle2, QrCode, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockTrainee } from '../../data/mockData';

export const BiometricAttendanceModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();
  const [scanStep, setScanStep] = useState<'scanning' | 'matched' | 'confirmed'>('scanning');
  const [activeTab, setActiveTab] = useState<'face' | 'qr'>('face');

  useEffect(() => {
    if (activeModal === 'face_attendance') {
      setScanStep('scanning');
      const timer1 = setTimeout(() => setScanStep('matched'), 1800);
      const timer2 = setTimeout(() => setScanStep('confirmed'), 3200);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [activeModal]);

  if (activeModal !== 'face_attendance') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-200 shadow-2xs">
            <Camera className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Digital Biometric Attendance Check-In</h3>
          <p className="text-xs text-slate-500">AI Face Recognition & QR Verification for ICM Chennai</p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs">
          <button
            onClick={() => { setActiveTab('face'); setScanStep('scanning'); }}
            className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'face' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> Face ID Recognition
          </button>
          <button
            onClick={() => { setActiveTab('qr'); setScanStep('confirmed'); }}
            className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'qr' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" /> Classroom QR Scan
          </button>
        </div>

        {/* Camera Viewfinder Simulation */}
        {activeTab === 'face' ? (
          <div className="relative w-full h-64 rounded-2xl bg-slate-950 overflow-hidden border-2 border-indigo-900 flex flex-col items-center justify-center text-white shadow-inner">
            {/* Background Simulated Live Video Feed */}
            <img
              src={mockTrainee.avatarUrl}
              alt={mockTrainee.name}
              className="absolute inset-0 w-full h-full object-cover opacity-60 filter blur-[1px]"
            />

            {/* Bounding Box Frame */}
            <div className={`relative w-40 h-40 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center justify-center ${
              scanStep === 'confirmed'
                ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-400/40'
                : scanStep === 'matched'
                ? 'border-teal-400 bg-teal-500/20 animate-pulse'
                : 'border-amber-400 bg-amber-500/10'
            }`}>
              {/* Corner accents */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

              {scanStep === 'scanning' && (
                <div className="space-y-1 text-center animate-bounce">
                  <Scan className="w-8 h-8 text-amber-300 mx-auto" />
                  <span className="text-[10px] font-bold text-amber-200 block uppercase tracking-wider">
                    Analyzing Face ID...
                  </span>
                </div>
              )}

              {scanStep === 'matched' && (
                <div className="space-y-1 text-center">
                  <Sparkles className="w-8 h-8 text-teal-300 mx-auto animate-spin" />
                  <span className="text-[10px] font-bold text-teal-200 block uppercase tracking-wider">
                    Match: 99.4% Confidence
                  </span>
                </div>
              )}

              {scanStep === 'confirmed' && (
                <div className="space-y-1 text-center animate-in zoom-in-95 duration-300">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <span className="text-[10px] font-extrabold text-emerald-200 block uppercase tracking-wider">
                    Verified Present!
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Status Ribbon */}
            <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-center text-xs font-semibold border border-white/10">
              {scanStep === 'confirmed' ? (
                <span className="text-emerald-300">✓ Biometric Check-In Recorded • 16 Sep 10:30 AM</span>
              ) : (
                <span className="text-amber-200">Align face within frame for biometric log</span>
              )}
            </div>
          </div>
        ) : (
          /* QR Mode */
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-40 h-40 bg-white border-2 border-indigo-900 rounded-xl p-2 mx-auto flex items-center justify-center shadow-inner">
              <QrCode className="w-32 h-32 text-indigo-950" />
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Scan classroom QR code displayed at Room 204 lecture hall
            </p>
          </div>
        )}

        {/* Action Footer */}
        <div className="pt-2">
          <button
            onClick={closeModal}
            className="w-full py-2.5 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 transition-colors shadow-md"
          >
            {scanStep === 'confirmed' ? 'Done & Return to Dashboard' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};
