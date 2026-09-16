import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  User,
  Building,
  UsersRound,
  CheckCircle2,
  Mic,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { UserRole } from '../../types';
import { speakText, parseVoiceInputForAuth, listenToMicrophone } from '../../utils/voiceAssistant';

export const SignInPage: React.FC = () => {
  const { login, language, setLanguage } = useApp();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  // Sign In Form State
  const [email, setEmail] = useState('admin@ncct.gov.in');
  const [password, setPassword] = useState('••••••••••••');

  // Sign Up Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('trainee');
  const [signupInstitute, setSignupInstitute] = useState('ICM Chennai');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupSuccessMsg, setSignupSuccessMsg] = useState('');

  // Voice Activation State
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<string>('Voice Assistant ready. Click Activate Voice to speak.');
  const [isListening, setIsListening] = useState(false);

  // Announce voice welcome & start mic listener
  const handleToggleVoice = () => {
    const nextState = !isVoiceActive;
    setIsVoiceActive(nextState);

    if (nextState) {
      const msg = language === 'ta'
        ? 'NCCT குரல் உதவியாளர் செயலில் உள்ளது. பதிவு செய்ய பேசவும்.'
        : language === 'hi'
        ? 'NCCT वॉइस असिस्टेंट सक्रिय है। साइन अप करने के लिए बोलें।'
        : language === 'te'
        ? 'NCCT వాయిస్ అసిస్టెంట్ సక్రియంగా ఉంది. మాట్లాడండి.'
        : language === 'bn'
        ? 'NCCT ভয়েস সহকারী সক্রিয়। কথা বলুন।'
        : 'NCCT Voice Assistant active. Please speak your name, role, and institute to sign up, or click any voice command button.';
      
      setVoiceStatus('🎙️ Listening... Speak into microphone or select a voice prompt.');
      speakText(msg, language);

      // Start Browser Web Speech Microphone Listener
      listenToMicrophone(
        (transcript) => {
          handleVoiceSimulate(transcript);
        },
        (err) => {
          setVoiceStatus(`🎙️ Mic ready (Use buttons or speak): ${err}`);
        }
      );
    } else {
      setVoiceStatus('Voice Assistant muted.');
    }
  };

  const handleVoiceSimulate = (transcript: string) => {
    setIsListening(true);
    setVoiceStatus(`🎙️ Heard: "${transcript}"`);
    speakText(`Processing: ${transcript}`, language);

    setTimeout(() => {
      setIsListening(false);
      const fields = parseVoiceInputForAuth(transcript);

      if (fields.role) {
        setSelectedRole(fields.role);
        setSignupRole(fields.role);
      }
      if (fields.institute) {
        setSignupInstitute(fields.institute);
      }
      if (fields.name) {
        setSignupName(fields.name);
      }
      if (fields.email) {
        setSignupEmail(fields.email);
        setEmail(fields.email);
      }

      if (transcript.toLowerCase().includes('sign up') || fields.name) {
        setAuthMode('signup');
        if (!fields.name) setSignupName('Rajesh Sharma');
        if (!signupPassword) setSignupPassword('pass12345');
        
        const confirmMsg = `Voice Sign Up recognized for ${fields.name || 'Rajesh Sharma'} as ${fields.role || 'trainee'} at ${fields.institute || 'ICM Chennai'}. Redirecting...`;
        setVoiceStatus(`✅ ${confirmMsg}`);
        speakText(confirmMsg, language);

        setTimeout(() => {
          login(fields.role || 'trainee');
        }, 1500);
      } else {
        setAuthMode('signin');
        const confirmMsg = `Voice Sign In recognized for ${fields.role || 'admin'}. Accessing dashboard...`;
        setVoiceStatus(`✅ ${confirmMsg}`);
        speakText(confirmMsg, language);

        setTimeout(() => {
          login(fields.role || 'admin');
        }, 1500);
      }
    }, 1000);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupSuccessMsg(`Account registered for ${signupName || 'User'}! Redirecting to dashboard...`);
    speakText(`Account registered for ${signupName || 'User'}. Welcome to NCCT Connect.`, language);
    setTimeout(() => {
      login(signupRole);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans antialiased selection:bg-teal-500 selection:text-slate-950 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="px-6 lg:px-12 py-4 flex items-center justify-between border-b border-slate-800/80 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-amber-400 flex items-center justify-center shadow-lg shadow-teal-500/20 text-slate-950 font-black">
            <Sparkles className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">NCCT Connect</span>
              <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-teal-400 text-slate-950 font-black">
                GOVT OF INDIA
              </span>
            </div>
            <p className="text-[11px] text-slate-400">National Council for Cooperative Training • Ministry of Cooperation</p>
          </div>
        </div>

        {/* 5-Language Selector */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-xl text-xs font-bold">
          {(['en', 'ta', 'hi', 'te', 'bn'] as const).map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === lang ? 'bg-teal-400 text-slate-950 font-extrabold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'ta' ? 'தமிழ்' : lang === 'hi' ? 'हिंदी' : lang === 'te' ? 'తెలుగు' : 'বাংলা'}
            </button>
          ))}
        </div>
      </header>

      {/* Centered Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 lg:p-6 relative z-10">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-5">
          
          {/* Header Title */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tight">NCCT Portal Access</h1>
            <p className="text-xs text-slate-400">Sign in or sign up via form or voice assistant</p>
          </div>

          {/* Voice Assistant Activation Bar */}
          <div className="p-3 bg-gradient-to-r from-indigo-950 via-slate-950 to-indigo-950 rounded-2xl border border-indigo-800/70 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isVoiceActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
                <span className="text-xs font-extrabold text-teal-300 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-teal-400" /> Voice Assistant
                </span>
              </div>

              <button
                type="button"
                onClick={handleToggleVoice}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                  isVoiceActive ? 'bg-teal-400 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isVoiceActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isVoiceActive ? 'Voice Active' : 'Activate Voice'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-300 font-mono leading-tight truncate">
              {voiceStatus}
            </p>

            {/* Quick Voice Command Triggers */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
              <button
                type="button"
                onClick={() => handleVoiceSimulate('Sign up Ramesh Sharma as Trainee at ICM Chennai')}
                className="px-2 py-1 rounded bg-indigo-900/60 hover:bg-indigo-800 text-teal-300 font-bold border border-indigo-700/60 transition-colors"
              >
                🎙️ "Sign Up Trainee Ramesh"
              </button>

              <button
                type="button"
                onClick={() => handleVoiceSimulate('Sign up Dr. Suresh as Trainer at RICM Hyderabad')}
                className="px-2 py-1 rounded bg-indigo-900/60 hover:bg-indigo-800 text-amber-300 font-bold border border-indigo-700/60 transition-colors"
              >
                🎙️ "Sign Up Trainer Suresh"
              </button>

              <button
                type="button"
                onClick={() => handleVoiceSimulate('Sign in as Admin')}
                className="px-2 py-1 rounded bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 font-bold border border-indigo-700/60 transition-colors"
              >
                🎙️ "Sign In Admin"
              </button>
            </div>
          </div>

          {/* Tab Switcher: Sign In vs Sign Up */}
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                authMode === 'signin'
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Success Toast */}
          {signupSuccessMsg && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{signupSuccessMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {authMode === 'signin' ? (
            <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <UsersRound className="w-3.5 h-3.5 text-teal-400" /> Select Dashboard Role
                </label>
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white focus:outline-hidden focus:border-teal-400 cursor-pointer"
                >
                  <option value="admin">Institution Administrator (Part 3)</option>
                  <option value="trainer">Trainer / Faculty (Part 2)</option>
                  <option value="trainee">Trainee / Student (Part 1)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-400" /> Official Email ID
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white focus:outline-hidden focus:border-teal-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-teal-400" /> Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white focus:outline-hidden focus:border-teal-400"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-teal-400 to-amber-400 text-slate-950 font-black text-xs hover:from-teal-300 hover:to-amber-300 transition-all shadow-xl shadow-teal-500/10 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-teal-400" /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Sharma"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white focus:outline-hidden focus:border-teal-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-400" /> Official Email ID
                </label>
                <input
                  type="email"
                  placeholder="ramesh@ncct.gov.in"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white focus:outline-hidden focus:border-teal-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 flex items-center gap-1.5">
                    <UsersRound className="w-3.5 h-3.5 text-teal-400" /> Role
                  </label>
                  <select
                    value={signupRole}
                    onChange={e => setSignupRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white focus:outline-hidden focus:border-teal-400 cursor-pointer"
                  >
                    <option value="trainee">Trainee / Student</option>
                    <option value="trainer">Trainer / Faculty</option>
                    <option value="admin">Institution Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-teal-400" /> Institute
                  </label>
                  <select
                    value={signupInstitute}
                    onChange={e => setSignupInstitute(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white focus:outline-hidden focus:border-teal-400 cursor-pointer"
                  >
                    <option value="ICM Chennai">ICM Chennai</option>
                    <option value="RICM Hyderabad">RICM Hyderabad</option>
                    <option value="RICM Bengaluru">RICM Bengaluru</option>
                    <option value="VAMNICOM Pune">VAMNICOM Pune</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-teal-400" /> Password
                </label>
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white focus:outline-hidden focus:border-teal-400"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs hover:from-emerald-300 hover:to-teal-300 transition-all shadow-xl shadow-teal-500/10 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Sign Up & Access Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}

          {/* Security Footer */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-teal-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-400" /> NIC Encrypted Portal
            </span>
            <span className="font-mono text-[10px]">NCCT v2026.3</span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-900 text-center text-[11px] text-slate-400 relative z-10">
        National Council for Cooperative Training (NCCT) • Ministry of Cooperation • Smart India Hackathon 2026
      </footer>
    </div>
  );
};
