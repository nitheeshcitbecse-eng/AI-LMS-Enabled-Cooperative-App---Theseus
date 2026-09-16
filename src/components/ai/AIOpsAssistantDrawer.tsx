import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, ArrowRight, Mic, Volume2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockAdmin } from '../../data/mockAdminData';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'admin';
  text: string;
  timestamp: string;
  evidenceBadge?: string[];
  actionText?: string;
  actionTab?: string;
}

export const AIOpsAssistantDrawer: React.FC = () => {
  const { isAiDrawerOpen, setIsAiDrawerOpen, setActiveTab, language } = useApp();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const initialMessages: ChatMessage[] = [
    {
      id: 'm1',
      sender: 'ai',
      text: language === 'ta'
        ? `காலை வணக்கம், ${mockAdmin.name}. நான் உங்கள் NCCT செயல்பாட்டு AI உதவி அமைப்பாளர். இன்று சென்னை ICM மற்றும் நெட்வொர்க்கில் நீங்கள் எதை ஆய்வு செய்ய விரும்புகிறீர்கள்?`
        : language === 'hi'
        ? `शुभ प्रभात, ${mockAdmin.name}। मैं आपका NCCT परिचालन AI सहायक हूँ। आज आप ICM चेन्नई और नेटवर्क में क्या जांचना चाहेंगे?`
        : language === 'te'
        ? `శుభోదయం, ${mockAdmin.name}. నేను మీ NCCT ఆపరేషన్స్ AI అసిస్టెంట్‌ని. ఈ రోజు ICM చెన్నై మరియు నెట్‌వర్క్‌లో మీరు దేనిని పరిశీలించాలనుకుంటున్నారు?`
        : language === 'bn'
        ? `শুভ সকাল, ${mockAdmin.name}। আমি আপনার NCCT অপারেশনস এআই সহকারী। আজ আপনি ICM চেন্নাই এবং নেটওয়ার্ক জুড়িয়া কী পরীক্ষা করতে চান?`
        : `Good morning, ${mockAdmin.name}. I am your NCCT Operations Assistant. What would you like to inspect across ICM Chennai and the network today?`,
      timestamp: 'Just now',
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  if (!isAiDrawerOpen) return null;

  const suggestedPrompts = [
    'Which programmes are over capacity?',
    'Show me trainer conflicts today.',
    'Which classrooms are underutilised?',
    'Which institutes have spare capacity?',
    'Where should we add another batch?',
  ];

  const handleVoiceSimulate = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend('Which programmes are over capacity?');
    }, 1500);
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const adminMsg: ChatMessage = {
      id: `admin-${Date.now()}`,
      sender: 'admin',
      text: query,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, adminMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      let aiText = '';
      let evidenceBadge: string[] | undefined;
      let actionText: string | undefined;
      let actionTab: string | undefined;

      const lower = query.toLowerCase();
      if (lower.includes('over capacity') || lower.includes('programmes over capacity')) {
        if (language === 'ta') {
          aiText = `1 அதிக முன்னுரிமை திறன் பற்றாக்குறையை நான் கண்டறிந்துள்ளேன்: டிஜிட்டல் கூட்டுறவு செயல்பாடுகள் (CMDO-B04) 30 ஒதுக்கீடு செய்யப்பட்ட இடங்களுக்கு எதிராக 42 பதிவு செய்யப்பட்ட பரிந்துரைகளைக் கொண்டுள்ளது (12 இடங்கள் பற்றாக்குறை).`;
          actionText = 'திறன் மறுஒதுக்கீட்டை மதிப்பாய்வு செய்';
        } else if (language === 'hi') {
          aiText = `मुझे 1 उच्च प्राथमिकता क्षमता की कमी मिली: डिजिटल सहकारी संचालन (CMDO-B04) में 30 आवंटित सीटों के मुकाबले 42 पंजीकृत नामांकन हैं (12 सीटों की कमी)।`;
          actionText = 'क्षमता और पुनर्वितरण की समीक्षा करें';
        } else if (language === 'te') {
          aiText = `నేను 1 అధిక ప్రాధాన్యత కలిగిన సామర్థ్య కొరతను కనుగొన్నాను: డిజిటల్ సహకార కార్యకలాపాలు (CMDO-B04) కేటాయించిన 30 సీట్లకు వ్యతిరేకంగా 42 నమోదు చేయబడిన నామినేషన్లను కలిగి ఉన్నాయి (12 సీట్ల కొరత).`;
          actionText = 'సామర్థ్య పునఃకేటాయింపును సమీక్షించండి';
        } else if (language === 'bn') {
          aiText = `আমি ১টি উচ্চ অগ্রাধিকার ক্ষমতা ঘাটতি খুঁজে পেয়েছি: ডিজিটাল সমবায় অপারেশন (CMDO-B04)-এ ৩০টি বরাদ্দকৃত আসনের বিপরীতে ৪২টি নিবন্ধিত মনোনয়ন রয়েছে (১২টি আসনের ঘাটতি)।`;
          actionText = 'ক্ষমতা ও পুনর্বণ্টন পর্যালোচনা করুন';
        } else {
          aiText = `I found 1 high-priority capacity shortage: Digital Cooperative Operations (CMDO-B04) has 42 registered nominations against 30 allocated seats (12-seat shortage).`;
          actionText = 'Review Capacity & Reallocate';
        }
        evidenceBadge = ['42 registered nominations', '30 allocated seats', '92% historical completion', 'High regional demand'];
        actionTab = 'admin_capacity';
      } else if (lower.includes('trainer conflict') || lower.includes('conflicts today')) {
        aiText = `Dr. Priya Raman is assigned to 2 sessions simultaneously at 10:00 AM – 11:00 AM (Batch B04 in Room 2 and Batch B06 in Room 4).`;
        evidenceBadge = ['Room 2 (Batch B04)', 'Room 4 (Batch B06)', '10:00 AM Monday schedule collision'];
        actionText = 'Open Timetable Resolver';
        actionTab = 'admin_timetable';
      } else if (lower.includes('underutilised') || lower.includes('classrooms')) {
        aiText = `Lecture Room 4 at ICM Chennai recorded only 38% utilisation rate this week (62% unused capacity available).`;
        evidenceBadge = ['38% weekly utilisation', '62% unused capacity', 'Room 1 at 94% overload'];
        actionText = 'Optimise Room Schedule';
        actionTab = 'admin_capacity';
      } else if (lower.includes('spare capacity') || lower.includes('institutes')) {
        aiText = `RICM Bengaluru currently has 61% capacity utilisation with 164 available seats across active programmes.`;
        evidenceBadge = ['RICM Bengaluru 61% utilisation', '164 available seats', '256 filled / 420 total'];
        actionText = 'View Network Map';
        actionTab = 'admin_network';
      } else {
        const domainKeywords = ['ncct', 'programme', 'batch', 'trainer', 'trainee', 'capacity', 'room', 'schedule', 'conflict', 'nomination', 'hostel', 'logistics', 'institute', 'vamnicom', 'icm', 'ricm', 'report', 'analytics', 'sync', 'help', 'hi', 'hello', 'hey'];
        const isDomainQuery = domainKeywords.some(k => lower.includes(k));

        if (!isDomainQuery) {
          if (language === 'ta') {
            aiText = `மன்னிக்கவும், எனக்கு இதில் நிச்சயமாக தெரியவில்லை. NCCT செயல்பாடுகள், திறன் பயன்பாடு, அட்டவணை மற்றும் நெட்வொர்க் தகவல்களுக்கு மட்டுமே என்னால் பதில் அளிக்க முடியும்.`;
          } else if (language === 'hi') {
            aiText = `क्षमा करें, मुझे इस बारे में पक्की जानकारी नहीं है। मैं केवल NCCT संचालन, क्षमता उपयोग, समय सारणी और नेटवर्क जानकारी दे सकता हूँ।`;
          } else if (language === 'te') {
            aiText = `క్షమించండి, నాకు దీని గురించి ఖచ్చితంగా తెలియదు. నేను NCCT కార్యకలాపాలు, సామర్థ్య వినియోగం మరియు నెట్‌వర్క్ సమాచారాన్ని మాత్రమే అందించగలను.`;
          } else if (language === 'bn') {
            aiText = `দুঃখিত, আমি এ বিষয়ে নিশ্চিত নই। আমি কেবল NCCT অপারেশন, ক্ষমতা ব্যবহার এবং নেটওয়ার্ক সংক্রান্ত তথ্য প্রদান করতে পারি।`;
          } else {
            aiText = `Sorry, I am not sure about that. I am trained specifically on NCCT Operations, capacity allocation, timetable scheduling, and network institute management.`;
          }
        } else {
          aiText = `I analyzed ICM Chennai (42 active programmes, 1,284 trainees enrolled, 82% capacity utilisation). All operational signals are monitored in real time. How else can I support institutional decision making?`;
          evidenceBadge = ['20 Connected Institutes', '98.7% Live Sync', '82% Network Utilisation'];
        }
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: 'Just now',
        evidenceBadge,
        actionText,
        actionTab,
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-400 text-indigo-950 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 fill-indigo-950" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-tight">NCCT Operations Assistant</h3>
            <p className="text-[10px] text-teal-300 font-medium">Multilingual Intelligence • {language.toUpperCase()}</p>
          </div>
        </div>

        <button
          onClick={() => setIsAiDrawerOpen(false)}
          className="p-1 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-900/60"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'admin' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'admin' ? 'bg-teal-500 text-indigo-950' : 'bg-indigo-950 text-white'
              }`}
            >
              {msg.sender === 'admin' ? 'M' : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2.5 ${
                msg.sender === 'admin'
                  ? 'bg-indigo-950 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
              }`}
            >
              <p>{msg.text}</p>

              {/* Evidence Badges */}
              {msg.evidenceBadge && msg.evidenceBadge.length > 0 && (
                <div className="pt-1 border-t border-slate-100 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Based on:</span>
                  <div className="flex flex-wrap gap-1">
                    {msg.evidenceBadge.map((ev, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 font-bold border border-indigo-100">
                        • {ev}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {msg.actionText && msg.actionTab && (
                <button
                  onClick={() => {
                    setActiveTab(msg.actionTab as any);
                    setIsAiDrawerOpen(false);
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-teal-400 hover:bg-teal-300 text-indigo-950 font-extrabold text-[11px] flex items-center justify-center gap-1 transition-colors shadow-2xs"
                >
                  <span>{msg.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-950" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      <div className="p-3 border-t border-slate-200 bg-white space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Suggested Multilingual Queries</span>
          <button
            onClick={handleVoiceSimulate}
            className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Mic className="w-3 h-3 text-indigo-600" />
            <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 font-medium border border-slate-200 transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder={`Ask AI Assistant (${language.toUpperCase()})...`}
          className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 rounded-xl bg-teal-400 text-indigo-950 hover:bg-teal-300 font-bold transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
