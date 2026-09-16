import React, { useState } from 'react';
import { X, Zap, CheckCircle2, ArrowRight, ArrowLeft, Users, Calendar, BookOpen, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { mockTraineeRiskList } from '../../data/mockTrainerData';

export const CreateInterventionWizardModal: React.FC = () => {
  const { activeModal, closeModal, createIntervention } = useApp();

  const [step, setStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState('Cooperative Accounting & Working Capital Ratios');
  const [selectedTraineeIds, setSelectedTraineeIds] = useState<string[]>(['tr-004281', 'tr-004282', 'tr-004283']);
  const [contentTitle, setContentTitle] = useState('Financial Analysis & Ratio Booster');
  const [duration, setDuration] = useState(20);
  const [deadline, setDeadline] = useState('18 Sep 2026');
  const [instruction, setInstruction] = useState('Please complete this booster module before tomorrow\'s revision session.');
  const [isAssigned, setIsAssigned] = useState(false);

  if (activeModal !== 'create_intervention_wizard') return null;

  const toggleTrainee = (id: string) => {
    if (selectedTraineeIds.includes(id)) {
      setSelectedTraineeIds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedTraineeIds(prev => [...prev, id]);
    }
  };

  const handleFinishAssignment = () => {
    const selectedNames = mockTraineeRiskList
      .filter(t => selectedTraineeIds.includes(t.id))
      .map(t => t.name);

    createIntervention(selectedTopic, selectedNames, instruction, duration);
    setIsAssigned(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleClose = () => {
    closeModal();
    setStep(1);
    setIsAssigned(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            <Zap className="w-6 h-6 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Intervention Creation Wizard</h3>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                Step {step} of 6
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Create a targeted learning intervention for struggling batch trainees.
            </p>
          </div>
        </div>

        {!isAssigned ? (
          <div className="space-y-5">
            {/* Step 1: Select Topic */}
            {step === 1 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 1: Select Target Skill Gap Topic</h4>
                <div className="space-y-2">
                  {[
                    'Cooperative Accounting & Working Capital Ratios',
                    'Data Interpretation & PACS Audit Trail',
                    'Digital PACS Operations & Loan Disbursement',
                    'Cooperative Governance & Bylaws',
                  ].map(topic => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                        selectedTopic === topic
                          ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-400/40'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{topic}</span>
                      {selectedTopic === topic && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Trainees */}
            {step === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 2: Select Target Trainees</h4>
                  <span className="text-xs font-bold text-indigo-900">{selectedTraineeIds.length} Selected</span>
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {mockTraineeRiskList.map(t => {
                    const isSelected = selectedTraineeIds.includes(t.id);
                    return (
                      <div
                        key={t.id}
                        onClick={() => toggleTrainee(t.id)}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-400 font-bold text-indigo-950'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={t.avatarUrl} alt={t.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <span className="block font-bold">{t.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">Score: {t.assessmentScore}%</span>
                          </div>
                        </div>
                        <input type="checkbox" checked={isSelected} onChange={() => {}} className="accent-indigo-900" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Choose Content & Duration */}
            {step === 3 && (
              <div className="space-y-3 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 3: Content & Duration</h4>
                
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Booster Content Title</label>
                  <input
                    type="text"
                    value={contentTitle}
                    onChange={e => setContentTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Estimated Completion Time (Minutes)</label>
                  <select
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900"
                  >
                    <option value={15}>15 Minutes (Micro-Booster)</option>
                    <option value={20}>20 Minutes (Standard Revision)</option>
                    <option value={30}>30 Minutes (Deep Lab Drill)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Deadline & Instruction */}
            {step === 4 && (
              <div className="space-y-3 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 4: Deadline & Trainer Message</h4>
                
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Completion Deadline</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Trainer Note / Guidance Message</label>
                  <textarea
                    value={instruction}
                    onChange={e => setInstruction(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>
            )}

            {/* Step 5 & 6: Review & Confirm */}
            {step >= 5 && (
              <div className="space-y-3 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 5: Review & Assign Intervention</h4>
                
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
                  <p><strong>Topic:</strong> {selectedTopic}</p>
                  <p><strong>Trainees Assigned:</strong> {selectedTraineeIds.length} Trainees</p>
                  <p><strong>Content:</strong> {contentTitle} ({duration} mins)</p>
                  <p><strong>Deadline:</strong> {deadline}</p>
                  <p><strong>Trainer Message:</strong> "{instruction}"</p>
                </div>
              </div>
            )}

            {/* Wizard Controls */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishAssignment}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:from-amber-600 transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Assign Intervention to {selectedTraineeIds.length} Trainees</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                ✓ Intervention Active!
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 pt-2">
                Assigned to {selectedTraineeIds.length} Trainees
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Trainees have received the recommendation on their digital dashboard under <strong>"Recommended by your trainer"</strong>.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 transition-colors shadow-lg"
            >
              Return to Trainer Workspace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
