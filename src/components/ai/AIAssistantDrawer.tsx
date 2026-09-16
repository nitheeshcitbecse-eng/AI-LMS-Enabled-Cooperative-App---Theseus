import React, { useState } from 'react';
import { X, Sparkles, Send, Brain, Bot, User, HelpCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockTrainee } from '../../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionText?: string;
  actionModal?: string;
}

export const AIAssistantDrawer: React.FC = () => {
  const { isAiDrawerOpen, setIsAiDrawerOpen, openModal, closedLoop, language } = useApp();
  const [inputText, setInputText] = useState('');

  const getGreetingText = () => {
    if (language === 'ta') return `வணக்கம் ${mockTrainee.name.split(' ')[0]} 👋 நான் உங்கள் NCCT AI கற்றல் வழிகாட்டி. உங்கள் மதிப்பீடுகள் மற்றும் திறன் நிலையை நான் கண்காணிக்கிறேன். இன்று உங்களுக்கு எவ்வாறு உதவட்டும்?`;
    if (language === 'hi') return `नमस्ते ${mockTrainee.name.split(' ')[0]} 👋 मैं आपका NCCT AI शिक्षण मार्गदर्शक हूँ। मैं आपके मूल्यांकन और कौशल अंतर की निगरानी करता हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?`;
    if (language === 'te') return `నమస్తే ${mockTrainee.name.split(' ')[0]} 👋 నేను మీ NCCT AI అభ్యాస మార్గదర్శకుడిని. నేను మీ మూల్యాంకనాలు మరియు నైపుణ్య లోపాలను పర్యవేక్షిస్తాను. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?`;
    if (language === 'bn') return `নমস্কার ${mockTrainee.name.split(' ')[0]} 👋 আমি আপনার NCCT এআই শিক্ষা গাইড। আমি আপনার মূল্যায়ন এবং দক্ষতার ব্যবধান পর্যবেক্ষণ করি। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?`;
    return `Hi ${mockTrainee.name.split(' ')[0]} 👋 I am your contextual NCCT AI Learning Guide. I monitor your assessment patterns, skill gaps, and career roadmap. How can I assist you today?`;
  };

  const initialMessages: ChatMessage[] = [
    {
      id: 'm1',
      sender: 'ai',
      text: getGreetingText(),
      timestamp: 'Just now',
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  if (!isAiDrawerOpen) return null;

  const suggestedPrompts = [
    language === 'ta' ? 'அடுத்து நான் என்ன கற்க வேண்டும்?' : language === 'hi' ? 'मुझे आगे क्या सीखना चाहिए?' : language === 'te' ? 'నేను తర్వాత ఏమి నేర్చుకోవాలి?' : language === 'bn' ? 'আমার পরবর্তীতে কী শেখা উচিত?' : 'What should I learn next?',
    language === 'ta' ? 'என் நிதி பகுப்பாய்வு திறன் குறைவாக இருப்பது ஏன்?' : language === 'hi' ? 'मेरा वित्तीय विश्लेषण कौशल कम क्यों है?' : language === 'te' ? 'నా ఆర్థిక విశ్లేషణ నైపుణ్యం ఎందుకు తక్కువగా ఉంది?' : language === 'bn' ? 'আমার আর্থিক বিশ্লেষণ দক্ষতা কম কেন?' : 'Why is my Financial Analysis skill low?',
    language === 'ta' ? 'என் அடுத்த மதிப்பீடு எப்போது?' : language === 'hi' ? 'मेरा अगला मूल्यांकन कब है?' : language === 'te' ? 'నా తదుపరి మూల్యాంకనం ఎప్పుడు?' : language === 'bn' ? 'আমার পরবর্তী মূল্যায়ন কখন?' : 'When is my next assessment?',
    language === 'ta' ? 'என் தொழில் தயார்நிலையை எவ்வாறு மேம்படுத்துவது?' : language === 'hi' ? 'मैं अपनी करियर तत्परता कैसे सुधार सकता हूँ?' : language === 'te' ? 'నేను నా కెరీర్ సన్నద్ధతను ఎలా మెరుగుపరచుకోవాలి?' : language === 'bn' ? 'আমি কীভাবে আমার ক্যারিয়ার প্রস্তুতি উন্নত করতে পারি?' : 'How can I improve my career readiness?',
    language === 'ta' ? 'நான் பெற்ற சான்றிதழ்கள் எவை?' : language === 'hi' ? 'मैंने कौन से प्रमाणपत्र हासिल किए हैं?' : language === 'te' ? 'నేను సంపాదించిన సర్టిఫికెట్లు ఏమిటి?' : language === 'bn' ? 'আমি কী কী সার্টিফিকেট অর্জন করেছি?' : 'What certificates have I earned?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate contextual AI response based on Arun's data & selected language
    setTimeout(() => {
      let aiResponseText = '';
      let actionText: string | undefined;
      let actionModal: string | undefined;

      const lower = query.toLowerCase();
      if (lower.includes('learn next') || lower.includes('what should i learn') || lower.includes('அடுத்து') || lower.includes('आगे') || lower.includes('తర్వాత') || lower.includes('পরবর্তীতে')) {
        if (language === 'ta') {
          aiResponseText = `கூட்டுறவு கணக்கியலில் உங்கள் பலவீனமான பகுதியை பகுப்பாய்வு செய்து (46%), 15 நிமிட நிதி பகுப்பாய்வு பூஸ்டரை முடிக்க பரிந்துரைக்கப்படுகிறது.`;
          actionText = 'பரிந்துரைக்கப்பட்ட பூஸ்டரைத் தொடங்கு';
        } else if (language === 'hi') {
          aiResponseText = `सहकारी लेखा (46%) में आपके कमजोर क्षेत्रों के विश्लेषण के आधार पर, 15 मिनट के वित्तीय विश्लेषण बूस्टर को पूरा करने की सिफारिश की जाती है।`;
          actionText = 'अनुशंसित बूस्टर शुरू करें';
        } else if (language === 'te') {
          aiResponseText = `సహకార అకౌంటింగ్‌లో మీ బలహీన ప్రాంత విశ్లేషణ ఆధారంగా (46%), 15 నిమిషాల ఆర్థిక విశ్లేషణ బూస్టర్‌ను పూర్తి చేయాలని సిఫార్సు చేయబడింది.`;
          actionText = 'సిఫార్సు చేసిన బూస్టర్‌ను ప్రారంభించండి';
        } else if (language === 'bn') {
          aiResponseText = `সমবায় হিসাবরক্ষণে আপনার দুর্বল এলাকার বিশ্লেষণের উপর ভিত্তি করে (৪৬%), ১৫ মিনিটের আর্থিক বিশ্লেষণ বুস্টারটি সম্পন্ন করার পরামর্শ দেওয়া হচ্ছে।`;
          actionText = 'সুপারিশকৃত বুস্টার শুরু করুন';
        } else {
          aiResponseText = `Based on your weak spot analysis in Cooperative Accounting (46%), your top recommendation is to complete the 15-minute Financial Analysis Booster.`;
          actionText = 'Start Recommended Booster';
        }
        actionModal = 'booster_quiz';
      } else if (lower.includes('financial analysis') || lower.includes('low') || lower.includes('நிதி') || lower.includes('वित्तीय') || lower.includes('ఆర్థిక') || lower.includes('আর্থিক')) {
        if (language === 'ta') {
          aiResponseText = `மதிப்பீடு 3 இல் பணி மூலதன விகிதங்களில் ஏற்பட்ட சிரமத்தால் உங்கள் நிதி பகுப்பாய்வு மதிப்பெண் 46% ஆக குறைந்தது. 15 நிமிட பூஸ்டரை எடுப்பது உங்கள் திறனை 74%+ ஆக மீட்டெடுக்கும்.`;
          actionText = 'நிதி பகுப்பாய்வு பூஸ்டர் எடுக்கவும்';
        } else if (language === 'hi') {
          aiResponseText = `मूल्यांकन 3 में कार्यशील पूंजी अनुपातों में कठिनाई के कारण आपका वित्तीय विश्लेषण स्कोर घटकर 46% हो गया। 15 मिनट का बूस्टर लेने से आपकी दक्षता 74%+ तक बहाल हो जाएगी।`;
          actionText = 'वित्तीय विश्लेषण बूस्टर लें';
        } else if (language === 'te') {
          aiResponseText = `మూల్యాంకనం 3లో వర్కింగ్ క్యాపిటల్ నిష్పత్తులతో వచ్చిన ఇబ్బంది కారణంగా మీ ఆర్థిక విశ్లేషణ స్కోర్ 46%కి పడిపోయింది. 15 నిమిషాల బూస్టర్‌ను తీసుకోవడం వలన మీ సామర్థ్యం 74%+కి పునరుద్ధరించబడుతుంది.`;
          actionText = 'ఆర్థిక విశ్లేషణ బూస్టర్ తీసుకోండి';
        } else if (language === 'bn') {
          aiResponseText = `মূল্যায়ন ৩-এ ওয়ার্কিং ক্যাপিটাল অনুপাতের জটিলতার কারণে আপনার আর্থিক বিশ্লেষণ স্কোর ৪৬%-এ নেমে এসেছে। ১৫ মিনিটের বুস্টার নিলে আপনার দক্ষতা ৭৪%+ পর্যন্ত পুনরুদ্ধার হবে।`;
          actionText = 'আর্থিক বিশ্লেষণ বুস্টার নিন';
        } else {
          aiResponseText = `Your Cooperative Accounting & Financial Analysis score dropped to 46% due to difficulty with Working Capital ratios in Assessment 3. Taking the 15-minute booster will restore your proficiency to 74%+.`;
          actionText = 'Take Financial Analysis Booster';
        }
        actionModal = 'booster_quiz';
      } else if (lower.includes('assessment') || lower.includes('next assessment') || lower.includes('மதிப்பீடு') || lower.includes('मूल्यांकन') || lower.includes('మూల్యాంకనం') || lower.includes('মূল্যায়ন')) {
        if (language === 'ta') {
          aiResponseText = `உங்கள் அடுத்த திட்டமிடப்பட்ட மதிப்பீடு 7: நிதி பகுப்பாய்வு & விகிதங்கள், டிஜிட்டல் மதிப்பீட்டு மையத்தில் 18 செப்டம்பர் 2026 காலை 11:00 மணிக்கு நடைபெறும்.`;
        } else if (language === 'hi') {
          aiResponseText = `आपका अगला निर्धारित मूल्यांकन 7: वित्तीय विश्लेषण और अनुपात, डिजिटल मूल्यांकन केंद्र में 18 सितंबर 2026 को सुबह 11:00 बजे निर्धारित है।`;
        } else if (language === 'te') {
          aiResponseText = `మీ తదుపరి షెడ్యూల్ చేసిన మూల్యాంకనం 7: ఆర్థిక విశ్లేషణ & నిష్పత్తులు, డిజిటల్ అసెస్‌మెంట్ సెంటర్‌లో 18 సెప్టెంబర్ 2026 ఉదయం 11:00 గంటలకు జరుగుతుంది.`;
        } else if (language === 'bn') {
          aiResponseText = `আপনার পরবর্তী নির্ধারিত মূল্যায়ন ৭: আর্থিক বিশ্লেষণ ও অনুপাত, ডিজিটাল অ্যাসেসমেন্ট সেন্টারে ১৮ সেপ্টেম্বর ২০২৬ সকাল ১১:০০ টায় অনুষ্ঠিত হবে।`;
        } else {
          aiResponseText = `Your next scheduled evaluation is Assessment 7: Financial Analysis & Ratios, scheduled for 18 Sep 2026 at 11:00 AM in the Digital Assessment Center.`;
        }
      } else if (lower.includes('career') || lower.includes('readiness') || lower.includes('தொழில்') || lower.includes('करियर') || lower.includes('కెరీర్') || lower.includes('ক্যারিয়ার')) {
        if (language === 'ta') {
          aiResponseText = `உங்கள் தற்போதைய தொழில் தயார்நிலை குறியீடு 76/100 ("சரியான பாதையில்"). TNSC வங்கி சென்னையில் கூட்டுறவு செயல்பாட்டு இணைப் பணிக்கு 92% திறன் பொருத்தம் உள்ளது!`;
        } else if (language === 'hi') {
          aiResponseText = `आपका वर्तमान करियर रेडीनेस इंडेक्स 76/100 ("सही रास्ते पर") है। TNSC बैंक चेन्नई में सहकारी परिचालन सहयोगी पद के लिए आपका 92% कौशल मिलान है!`;
        } else if (language === 'te') {
          aiResponseText = `మీ ప్రస్తుత కెరీర్ సన్నద్ధత సూచిక 76/100 ("సరియైన దారిలో"). TNSC బ్యాంక్ చెన్నైలో కోఆపరేటివ్ ఆపరేషన్స్ అసోసియేట్ రోల్ కోసం 92% నైపుణ్య సరిపోలిక ఉంది!`;
        } else if (language === 'bn') {
          aiResponseText = `আপনার বর্তমান ক্যারিয়ার রেডিনেস ইনডেক্স ৭৬/১০০ ("সঠিক পথে")। TNSC ব্যাংক চেন্নাইতে সমবায় অপারেশনস অ্যাসোসিয়েট পদের জন্য ৯২% দক্ষতা মিল রয়েছে!`;
        } else {
          aiResponseText = `Your current Career Readiness Index is 76/100 ("On Track"). You have a 92% skill match for Cooperative Operations Associate at TNSC Bank Chennai!`;
        }
      } else if (lower.includes('certificate') || lower.includes('earned') || lower.includes('சான்றிதழ்') || lower.includes('प्रमाणपत्र') || lower.includes('సర్టిఫికేట్') || lower.includes('সার্টিফিকেট')) {
        if (language === 'ta') {
          aiResponseText = `நீங்கள் 1 சரிபார்க்கப்பட்ட சான்றிதழைப் பெற்றுள்ளீர்கள்: "கூட்டுறவு மேலாண்மை அடிப்படைகள்" (ID: NCCT-CERT-28491). உங்கள் PACS டிஜிட்டல் ERP நிபுணர் பட்டயம் 68% நிறைவடைந்துள்ளது.`;
          actionText = 'NCCT சான்றுகளைப் பார்க்கவும்';
        } else if (language === 'hi') {
          aiResponseText = `आपने 1 सत्यापित क्रेडेंशियल हासिल किया है: "सहकारी प्रबंधन के मूल सिद्धांत" (ID: NCCT-CERT-28491)। आपका PACS डिजिटल ERP विशेषज्ञ डिप्लोमा 68% पूरा हो चुका है।`;
          actionText = 'NCCT क्रेडेंशियल देखें';
        } else if (language === 'te') {
          aiResponseText = `మీరు 1 ధృవీకరించబడిన ఆధారపత్రాన్ని సంపాదించారు: "సహకార నిర్వహణ ప్రాథమిక సూత్రాలు" (ID: NCCT-CERT-28491). మీ PACS డిజిటల్ ERP నిపుణుల డిప్లొమా 68% పూర్తయింది.`;
          actionText = 'NCCT ఆధారపత్రాలను చూడండి';
        } else if (language === 'bn') {
          aiResponseText = `আপনি ১টি যাচাইকৃত শংসাপত্র অর্জন করেছেন: "সমবায় ব্যবস্থাপনা মৌলিক বিষয়াবলি" (ID: NCCT-CERT-28491)। আপনার PACS ডিজিটাল ERP স্পেশালিস্ট ডিপ্লোমা ৬৮% সম্পন্ন হয়েছে।`;
          actionText = 'NCCT ক্রেডেনশিয়াল দেখুন';
        } else {
          aiResponseText = `You have earned 1 verified credential: "Cooperative Management Fundamentals" (ID: NCCT-CERT-28491). Your PACS Digital ERP Specialist diploma is 68% complete.`;
          actionText = 'View NCCT Credential';
        }
        actionModal = 'qr_verify';
      } else {
        // Strict Domain Boundary Check: If query is off-topic, decline gracefully
        const domainKeywords = ['ncct', 'course', 'training', 'assessment', 'score', 'skill', 'certificate', 'career', 'job', 'hostel', 'logistics', 'pacs', 'hdcm', 'attendance', 'batch', 'class', 'timetable', 'trainer', 'learn', 'booster', 'rank', 'profile', 'progress', 'help', 'hi', 'hello', 'hey'];
        const isDomainQuery = domainKeywords.some(k => lower.includes(k));

        if (!isDomainQuery) {
          if (language === 'ta') {
            aiResponseText = `மன்னிக்கவும், எனக்கு இதில் நிச்சயமாக தெரியவில்லை. NCCT கூட்டுறவு பயிற்சி திட்டங்கள், அட்டவணை, மதிப்பீடுகள் மற்றும் சான்றிதழ் தகவல்களுக்கு மட்டுமே என்னால் பதில் அளிக்க முடியும்.`;
          } else if (language === 'hi') {
            aiResponseText = `क्षमा करें, मुझे इस बारे में पक्की जानकारी नहीं है। मैं केवल NCCT सहकारी प्रशिक्षण, समय सारणी, मूल्यांकन और प्रमाणन संचालन पर आधिकारिक जानकारी दे सकता हूँ।`;
          } else if (language === 'te') {
            aiResponseText = `క్షమించండి, నాకు దీని గురించి ఖచ్చితంగా తెలియదు. నేను NCCT సహకార శిక్షణ, టైమ్‌టేబుల్, మూల్యాంకనాలు మరియు సర్టిఫికేషన్ సమాచారాన్ని మాత్రమే అందించగలను.`;
          } else if (language === 'bn') {
            aiResponseText = `দুঃখিত, আমি এ বিষয়ে নিশ্চিত নই। আমি কেবল NCCT সমবায় প্রশিক্ষণ, সময়সূচী, মূল্যায়ন এবং সার্টিফিকেট সংক্রান্ত তথ্য প্রদান করতে পারি।`;
          } else {
            aiResponseText = `Sorry, I am not sure about that. I am trained specifically on NCCT Cooperative Capacity Building programmes, assessments, timetable, certifications, and career pathways.`;
          }
        } else {
          if (language === 'ta') {
            aiResponseText = `நான் உங்கள் NCCT டிஜிட்டல் சுயவிவரத்தை ஆய்வு செய்துள்ளேன். உங்கள் ஒட்டுமொத்த முன்னேற்றம் 68%, வருகை 92%, மற்றும் 3 சரிபார்க்கப்பட்ட திறன்கள் உள்ளன.`;
          } else if (language === 'hi') {
            aiResponseText = `मैंने आपकी NCCT डिजिटल प्रोफ़ाइल का विश्लेषण किया है। आपकी कुल प्रगति 68%, उपस्थिति 92% है और आपके पास 3 सत्यापित मुख्य कौशल हैं।`;
          } else if (language === 'te') {
            aiResponseText = `నేను మీ NCCT డిజిటల్ ప్రొఫైల్‌ను విశ్లేషించాను. మీ మొత్తం పురోగతి 68%, హాజరు 92% మరియు మీకు 3 ధృవీకరించబడిన ప్రధాన నైపుణ్యాలు ఉన్నాయి.`;
          } else if (language === 'bn') {
            aiResponseText = `আমি আপনার NCCT ডিজিটাল প্রোফাইল বিশ্লেষণ করেছি। আপনার সামগ্রিক অগ্রগতি ৬৮%, উপস্থিতি ৯২% এবং ৩টি যাচাইকৃত মূল দক্ষতা রয়েছে।`;
          } else {
            aiResponseText = `I have analyzed your NCCT digital profile. Your current overall progress is 68%, attendance is 92%, and you have 3 verified core skills. Is there a specific course or assessment you would like me to explain?`;
          }
        }
      }

      const aiMsg: ChatMessage = {
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
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-950 to-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-tight">NCCT AI Learning Assistant</h3>
            <p className="text-[10px] text-indigo-300 font-medium">Contextual Trainee Guide</p>
          </div>
        </div>

        <button
          onClick={() => setIsAiDrawerOpen(false)}
          className="p-1 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-900/60"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-indigo-900 text-white'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              {msg.sender === 'user' ? 'A' : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-indigo-900 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
              }`}
            >
              <p>{msg.text}</p>
              {msg.actionText && msg.actionModal && (
                <button
                  onClick={() => openModal(msg.actionModal!)}
                  className="w-full py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-[11px] border border-emerald-200 flex items-center justify-center gap-1 transition-colors"
                >
                  <span>{msg.actionText}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-700" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts Pill Section */}
      <div className="p-3 border-t border-slate-200 bg-white space-y-2">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">Suggested Contextual Queries</span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 text-slate-700 font-medium border border-slate-200 transition-colors text-left"
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
          placeholder="Ask NCCT AI assistant..."
          className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 rounded-xl bg-indigo-950 text-white hover:bg-indigo-900 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
