import React, { useState } from 'react';
import { X, User, ShieldCheck, Zap, MessageSquare, AlertTriangle, FileText, CheckCircle2, Send, Clock, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TraineeDetailDrawer: React.FC = () => {
  const {
    selectedTraineeForDrawer,
    setSelectedTraineeForDrawer,
    openModal,
    trainerNotes,
    addTrainerNote,
    demoMode,
  } = useApp();

  const [noteInput, setNoteInput] = useState('');

  if (!selectedTraineeForDrawer) return null;

  const trainee = selectedTraineeForDrawer;
  const isArun = trainee.name.includes('Arun');
  const displayScore = (demoMode === 'after' && isArun) ? 74 : trainee.assessmentScore;

  const handleSaveNote = () => {
    if (!noteInput.trim()) return;
    addTrainerNote(trainee.id, noteInput);
    setNoteInput('');
  };

  const currentNotes = trainerNotes.filter(n => n.traineeId === trainee.id);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 md:w-[480px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-5 bg-gradient-to-r from-indigo-950 to-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={trainee.avatarUrl}
            alt={trainee.name}
            className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400"
          />
          <div>
            <h3 className="text-base font-bold text-white leading-tight">{trainee.name}</h3>
            <p className="text-xs font-mono text-indigo-200">NCCT ID: {trainee.digitalId}</p>
          </div>
        </div>

        <button
          onClick={() => setSelectedTraineeForDrawer(null)}
          className="p-1.5 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-900/60"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scroll Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50">
        {/* Quick Numbers Banner */}
        <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Attendance</span>
            <span className="text-base font-extrabold text-emerald-700">{trainee.attendance}%</span>
          </div>
          <div className="border-x border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Assessment Avg</span>
            <span className={`text-base font-extrabold ${displayScore < 60 ? 'text-red-600' : 'text-emerald-700'}`}>
              {displayScore}%
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">LMS Activity</span>
            <span className="text-base font-extrabold text-indigo-900">{trainee.lmsActivity}%</span>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-950">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>NCCT AI Diagnostic Insight</span>
          </div>
          <p className="leading-relaxed">
            Repeated difficulty detected in <strong>{trainee.skillGapTopic}</strong> across 3 consecutive assessment attempts.
          </p>
          <div className="pt-1 font-bold text-amber-800">
            Recommended Action: <em>"{trainee.recommendedAction}"</em>
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="ncct-card p-4 space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Competency Breakdown</span>
          <div className="space-y-2">
            {trainee.skills.map(skill => {
              const currentProf = (demoMode === 'after' && isArun && skill.name.includes('Financial Analysis')) ? 74 : skill.proficiency;
              const isLow = currentProf < 60;
              return (
                <div key={skill.name} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-800">{skill.name}</span>
                    <span className={`font-bold ${isLow ? 'text-red-600' : 'text-emerald-700'}`}>{currentProf}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`h-full rounded-full ${isLow ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${currentProf}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trainer Notes Section */}
        <div className="ncct-card p-4 space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Private Trainer Notes</span>
          
          <div className="space-y-2">
            {currentNotes.map(n => (
              <div key={n.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <p>{n.noteText}</p>
                <span className="text-[10px] text-slate-400 block font-mono">{n.createdAt}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={noteInput}
              onChange={e => setNoteInput(e.target.value)}
              placeholder="Add trainer observation..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
            />
            <button
              onClick={handleSaveNote}
              className="px-3 py-1.5 rounded-lg bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Action Footer */}
      <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-2">
        <button
          onClick={() => {
            setSelectedTraineeForDrawer(null);
            openModal('create_intervention_wizard');
          }}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:from-amber-600 transition-all flex items-center justify-center gap-1.5 shadow-md"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>Assign Intervention</span>
        </button>

        <button
          onClick={() => alert(`Sending message to ${trainee.name}...`)}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          title="Message Trainee"
        >
          <MessageSquare className="w-4 h-4 text-indigo-900" />
        </button>
      </div>
    </div>
  );
};
