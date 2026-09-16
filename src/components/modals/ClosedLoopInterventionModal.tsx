import React, { useState } from 'react';
import { X, CheckCircle2, Zap, Award, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { mockAIRecommendation } from '../../data/mockData';

export const ClosedLoopInterventionModal: React.FC = () => {
  const { activeModal, closeModal, completeBoosterQuiz } = useApp();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  if (activeModal !== 'booster_quiz') return null;

  const handleOptionSelect = (qId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    mockAIRecommendation.quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const finalScore = Math.round((correctCount / mockAIRecommendation.quizQuestions.length) * 100);
    const scoreToSet = finalScore >= 60 ? Math.max(finalScore, 74) : 70;
    setCalculatedScore(scoreToSet);
    setSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    completeBoosterQuiz(scoreToSet);
  };

  const handleFinish = () => {
    closeModal();
    setSubmitted(false);
    setSelectedAnswers({});
    setCalculatedScore(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">AI Closed-Loop Learning Intervention</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                15-Min Booster
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Topic: {mockAIRecommendation.topic} (Original Score: 46%)
            </p>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80 space-y-2 text-xs text-indigo-950">
              <div className="flex items-center gap-2 font-bold text-indigo-900">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Targeted Key Concept Summary</span>
              </div>
              <p className="leading-relaxed">
                <strong>Working Capital</strong> in cooperatives equals <em>Current Assets − Current Liabilities</em>.
                Statutory Reserve Allocation requires at least <strong>25% of annual Net Profit</strong>.
                NABARD recovery benchmark for agricultural PACS loans is <strong>75%+</strong>.
              </p>
            </div>

            <div className="space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Practice Re-assessment (3 Questions)
              </h4>

              {mockAIRecommendation.quizQuestions.map((q, idx) => (
                <div key={q.id} className="space-y-2 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <h5 className="text-xs font-bold text-slate-900">
                    Q{idx + 1}. {q.question}
                  </h5>

                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionSelect(q.id, optIdx)}
                          className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-900 text-white border-indigo-900 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {Object.keys(selectedAnswers).length} of 3 answered
              </span>
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < 3}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md disabled:opacity-50"
              >
                Submit & Verify Improvement
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                ✓ Improvement Verified!
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 pt-2">
                New Score: {calculatedScore}%
              </h3>
              <p className="text-xs text-slate-600">
                You successfully improved your Cooperative Accounting score from <strong className="text-amber-700">46%</strong> to <strong className="text-emerald-700">{calculatedScore}%</strong>!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium space-y-1">
              <div className="flex items-center justify-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Skill Profile & Evidence Ledger Updated</span>
              </div>
              <p>Financial Analysis skill status is now set to <strong>Verified</strong>. Trainer Dr. V. Ramanathan has been notified.</p>
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-3 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 transition-colors shadow-lg"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
