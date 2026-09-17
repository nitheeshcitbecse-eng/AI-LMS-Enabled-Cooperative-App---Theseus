import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, ArrowRight } from 'lucide-react';
import { useApp, useData } from '../../context/SystemStateContext';
import { aiService } from '../../services/api';

export const AITrainerAssistantDrawer = () => {
  const { trainer: trainerData } = useData();
  const { isAiDrawerOpen, setIsAiDrawerOpen, openModal, setSelectedTraineeForDrawer, traineeRiskList, language } = useApp();
  const [inputText, setInputText] = useState('');

  const initialMessages = [
    {
      id: 'm1',
      sender: 'ai',
      text: `Good morning, Dr. Priya. What would you like to review in Batch ${trainerData.batch} today?`,
      timestamp: 'Just now',
    },
  ];

  const [messages, setMessages] = useState(initialMessages);

  if (!isAiDrawerOpen) return null;

  const suggestedPrompts = [
    'Which trainees need attention today?',
    'What is the biggest skill gap in my batch?',
    'Which topic should I revise tomorrow?',
    'Who improved after intervention?',
    'Which trainees have low attendance?',
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const trainerMsg = {
      id: `trainer-${Date.now()}`,
      sender: 'trainer',
      text: query,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, trainerMsg]);
    if (!textToSend) setInputText('');

    // Generate contextual AI response based on Dr. Priya's batch data
    // With a backend configured, answers come from POST /ai/chat; otherwise the built-in responses below are used.
    if (aiService.isEnabled) {
      aiService
        .sendMessage({ role: 'trainer', message: query, language })
        .then(reply => setMessages(prev => [...prev, { id: `ai-${Date.now()}`, sender: 'ai', timestamp: 'Just now', ...reply }]))
        .catch(err =>
          setMessages(prev => [
            ...prev,
            { id: `ai-${Date.now()}`, sender: 'ai', timestamp: 'Just now', text: `Sorry, the assistant is unavailable right now (${err.message}).` },
          ])
        );
      return;
    }

    setTimeout(() => {
      let aiResponseText = '';
      let actionText;
      let actionModal;

      const lower = query.toLowerCase();
      if (lower.includes('trainees need attention') || lower.includes('who needs attention')) {
        aiResponseText = `7 trainees have repeated low performance patterns in Cooperative Accounting. 3 of these trainees (including Arun Kumar) also have incomplete LMS practical modules. I recommend assigning a 20-minute Financial Analysis booster.`;
        actionText = 'Review 7 Trainees & Assign Booster';
        actionModal = 'create_intervention_wizard';
      } else if (lower.includes('skill gap') || lower.includes('biggest gap')) {
        aiResponseText = `Financial Analysis & Accounting is the largest batch-level gap at 49% average (vs 70% benchmark). 7 trainees require targeted support in Working Capital ratio calculations.`;
        actionText = 'Create Skill Gap Intervention';
        actionModal = 'create_intervention_wizard';
      } else if (lower.includes('revise tomorrow') || lower.includes('topic')) {
        aiResponseText = `Cooperative Accounting & Ledger Ratios is the highest ROI topic to revise. Your batch heatmap shows 3 consecutive tests with average scores below 50%.`;
        actionText = 'Broadcast Revision Announcement';
        actionModal = 'announcement_modal';
      } else if (lower.includes('improved') || lower.includes('after intervention')) {
        aiResponseText = `11 trainees improved their scores after completing the closed-loop booster! For example, Arun Kumar's score increased by +28 percentage points (from 46% to 74%).`;
        actionText = 'Verify Competencies';
        actionModal = 'competency_view';
      } else if (lower.includes('attendance') || lower.includes('low attendance')) {
        aiResponseText = `Overall batch attendance is strong at 92%. However, 3 trainees (including Rahul Patel at 65%) are below the 75% threshold and require a check-in.`;
      } else {
        const domainKeywords = ['ncct', 'batch', 'trainer', 'trainee', 'risk', 'intervention', 'attendance', 'score', 'test', 'assessment', 'skill', 'resource', 'competency', 'booster', 'teaching', 'help', 'hi', 'hello', 'hey'];
        const isDomainQuery = domainKeywords.some(k => lower.includes(k));

        if (!isDomainQuery) {
          if (language === 'ta') {
            aiResponseText = `மன்னிக்கவும், எனக்கு இதில் நிச்சயமாக தெரியவில்லை. NCCT வகுப்புகள், பயிற்றுவிப்பாளர் பகுப்பாய்வு மற்றும் மாணவர்கள் செயல்திறன் தகவல்களுக்கு மட்டுமே என்னால் பதில் அளிக்க முடியும்.`;
          } else if (language === 'hi') {
            aiResponseText = `क्षमा करें, मुझे इस बारे में पक्की जानकारी नहीं है। मैं केवल NCCT बैच, प्रशिक्षक विश्लेषण और प्रशिक्षुओं के प्रदर्शन पर आधिकारिक जानकारी दे सकता हूँ।`;
          } else if (language === 'te') {
            aiResponseText = `క్షమించండి, నాకు దీని గురించి ఖచ్చితంగా తెలియదు. నేను NCCT బ్యాచ్‌లు, శిక్షకుల విశ్లేషణ మరియు శిక్షణార్థుల పనితీరు సమాచారాన్ని మాత్రమే అందించగలను.`;
          } else if (language === 'bn') {
            aiResponseText = `দুঃখিত, আমি এ বিষয়ে নিশ্চিত নই। আমি কেবল NCCT ব্যাচ, প্রশিক্ষক বিশ্লেষণ এবং প্রশিক্ষণার্থীদের কর্মক্ষমতা সংক্রান্ত তথ্য প্রদান করতে পারি।`;
          } else {
            aiResponseText = `Sorry, I am not sure about that. I am trained specifically on NCCT Batch Health, trainer interventions, attendance, and trainee assessment performance.`;
          }
        } else {
          aiResponseText = `I have analyzed Batch ${trainerData.batch} (42 trainees). Batch Learning Health is 82/100 ("Healthy"). Assessment average is 74% (+8% vs previous test). How else can I assist your teaching planning?`;
        }
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: 'Just now',
        actionText,
        actionModal,
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <>
      {/* Scrim — the drawer previously had none, so clicking away did nothing. */}
      <div
        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsAiDrawerOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[26rem] bg-white shadow-2xl ring-1 ring-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 ncct-chrome text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-indigo-950 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 fill-indigo-950" />
          </div>
          <div>
            <h3 className="text-[13px] font-medium text-white leading-tight">NCCT AI Trainer Assistant</h3>
            <p className="text-[11px] text-slate-400">Batch Intelligence Guide</p>
          </div>
        </div>

        <button
          onClick={() => setIsAiDrawerOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'trainer' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'trainer'
                  ? 'bg-amber-500 text-indigo-950'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {msg.sender === 'trainer' ? 'P' : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed space-y-2 ${
                msg.sender === 'trainer'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200 rounded-tl-none shadow-xs'
              }`}
            >
              <p>{msg.text}</p>
              {msg.actionText && msg.actionModal && (
                <button
                  onClick={() => openModal(msg.actionModal)}
                  className="w-full py-1.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-[11px] border border-amber-200 flex items-center justify-center gap-1 transition-colors"
                >
                  <span>{msg.actionText}</span>
                  <ArrowRight className="w-3 h-3 text-amber-700" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      <div className="p-3 border-t border-slate-200 bg-white space-y-2">
        <span className="text-[10px] uppercase tracking-[0.08em] font-medium text-slate-400 block">Suggested Trainer Queries</span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-700 font-medium border border-slate-200 transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI trainer assistant..."
          className="flex-1 px-3 py-2 text-xs bg-slate-100/70 border border-transparent rounded-lg placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-amber-500/10"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      </div>
    </>
  );
};
