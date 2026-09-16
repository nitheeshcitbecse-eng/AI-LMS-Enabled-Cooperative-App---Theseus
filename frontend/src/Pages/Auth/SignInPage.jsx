import React, { useState } from 'react';
import {
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
  AlertTriangle,
  Mic,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { speakText, parseVoiceInputForAuth, listenToMicrophone } from '../../utils/voiceAssistant';

export const SignInPage = () => {
  const { login, signup, language, setLanguage } = useApp();
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Runs a sign-in / sign-up call and surfaces backend errors (e.g. FastAPI 401 detail) on the form.
  const runAuth = async action => {
    setAuthError('');
    setIsSubmitting(true);
    try {
      await action();
    } catch (err) {
      setAuthError(err?.message || 'Unable to sign in. Please try again.');
      setSignupSuccessMsg('');
    } finally {
      setIsSubmitting(false);
    }
  };
  const [authMode, setAuthMode] = useState('signin');
  const [selectedRole, setSelectedRole] = useState('admin');

  // Sign In Form State
  const [email, setEmail] = useState('admin@ncct.gov.in');
  const [password, setPassword] = useState('••••••••••••');

  // Sign Up Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupRole, setSignupRole] = useState('trainee');
  const [signupInstitute, setSignupInstitute] = useState('ICM Chennai');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupSuccessMsg, setSignupSuccessMsg] = useState('');

  // Voice Activation State
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Voice Assistant ready. Click Activate Voice to speak.');
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

  const handleVoiceSimulate = (transcript) => {
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
          runAuth(() =>
            signup({
              name: fields.name || 'Rajesh Sharma',
              email: fields.email || signupEmail || 'rajesh.sharma@ncct.gov.in',
              password: signupPassword || 'pass12345',
              role: fields.role || 'trainee',
              institute: fields.institute || signupInstitute,
            })
          );
        }, 1500);
      } else {
        setAuthMode('signin');
        const confirmMsg = `Voice Sign In recognized for ${fields.role || 'admin'}. Accessing dashboard...`;
        setVoiceStatus(`✅ ${confirmMsg}`);
        speakText(confirmMsg, language);

        setTimeout(() => {
          runAuth(() => login({ email: fields.email || email, password, role: fields.role || 'admin' }));
        }, 1500);
      }
    }, 1000);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    runAuth(() => login({ email, password, role: selectedRole }));
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setSignupSuccessMsg(`Account registered for ${signupName || 'User'}! Redirecting to dashboard...`);
    speakText(`Account registered for ${signupName || 'User'}. Welcome to NCCT Connect.`, language);
    setTimeout(() => {
      runAuth(() =>
        signup({ name: signupName, email: signupEmail, password: signupPassword, role: signupRole, institute: signupInstitute })
      );
    }, 1200);
  };

  const languages = [
    { code: 'en', short: 'EN' },
    { code: 'ta', short: 'தமிழ்' },
    { code: 'hi', short: 'हिंदी' },
    { code: 'te', short: 'తెలుగు' },
    { code: 'bn', short: 'বাংলা' },
  ];

  const assurances = [
    {
      icon: ShieldCheck,
      title: 'NIC-grade security',
      body: 'Encrypted session handling aligned to Government of India portal standards.',
    },
    {
      icon: UsersRound,
      title: 'One identity, three workspaces',
      body: 'Trainee, trainer and institution views resolve from a single credential.',
    },
    {
      icon: Mic,
      title: 'Voice-first access',
      body: 'Sign in or register by speech in five Indian languages, for low-literacy users.',
    },
  ];

  const fieldClass =
    'w-full px-3.5 py-2.5 bg-white ring-1 ring-slate-300 rounded-lg text-[13px] text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const labelClass = 'text-[11px] font-medium text-slate-600 flex items-center gap-1.5';

  const voicePrompts = [
    { label: 'Sign up trainee', command: 'Sign up Ramesh Sharma as Trainee at ICM Chennai' },
    { label: 'Sign up trainer', command: 'Sign up Dr. Suresh as Trainer at RICM Hyderabad' },
    { label: 'Sign in as admin', command: 'Sign in as Admin' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-700 flex flex-col font-sans antialiased">
      {/* Brand bar */}
      <header className="bg-indigo-800 text-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-3 sm:py-0 sm:h-16 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex items-center gap-3 min-w-0">
            <span className="ncct-wordmark text-3xl leading-none">NCCT</span>
            <span className="w-px h-8 bg-white/40" />
            <span className="min-w-0">
              <span className="block text-base font-semibold uppercase tracking-wide leading-tight">Connect</span>
              <span className="hidden sm:block text-xs text-white/75 leading-tight">Government of India</span>
            </span>
          </div>

          {/* 5-Language Selector */}
          <div className="flex items-center gap-1 text-sm max-w-full overflow-x-auto scrollbar-none">
            {languages.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 py-1 rounded transition-colors duration-200 ${
                  language === lang.code ? 'bg-white text-indigo-800 font-semibold' : 'text-white/85 hover:bg-white/10'
                }`}
              >
                {lang.short}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Secondary bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-12 flex items-center justify-between gap-4 text-[15px]">
          <span className="font-semibold text-slate-800 truncate">National Council for Cooperative Training</span>
          <span className="hidden md:flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-indigo-600" /> Ministry of Cooperation
          </span>
        </div>
      </div>

      {/* Body: hero + authentication panel */}
      <main className="flex-1 grid lg:grid-cols-[1fr_34rem]">
        {/* Left: hero */}
        <section className="relative hidden lg:flex items-center overflow-hidden bg-indigo-900 text-white">
          <img
            className="ncct-hero-media"
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=2000"
            alt=""
          />
          <div className="ncct-hero-scrim" />
          <div className="relative px-12 xl:px-20 py-16 max-w-3xl space-y-8 animate-in fade-in duration-500">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 ring-1 ring-white/25 text-sm">
                <span className="ncct-live-dot text-emerald-300 w-1.5 h-1.5" />
                20 institutes · one training network
              </span>
              <h1 className="text-5xl font-normal tracking-[-0.02em] text-white leading-[1.1]">
                Cooperative training,
                <br />
                measured end to end.
              </h1>
              <p className="text-lg text-white/85 leading-relaxed max-w-xl">
                Nominations, attendance, competency and placement in one record — available offline
                at the edge and reconciled centrally.
              </p>
            </div>

            <ul className="grid gap-5 max-w-xl">
              {assurances.map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-4">
                    <span className="w-10 h-10 rounded-full bg-white/15 ring-1 ring-white/25 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="text-[15px] text-white/80 leading-relaxed mt-0.5">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Right: authentication panel */}
        <div className="bg-slate-50 flex items-center justify-center px-4 py-10 lg:px-10">
          {/* Right: Authentication Card */}
          <div className="w-full max-w-md bg-white text-slate-700 ring-1 ring-slate-200 rounded-xl p-6 lg:p-8 shadow-lg space-y-5 animate-in fade-in duration-500">
            {/* Header Title */}
            <div className="space-y-1">
              <h2 className="text-3xl font-normal text-slate-900 tracking-tight">NCCT Portal Access</h2>
              <p className="text-[15px] text-slate-500">Sign in or register by form or voice.</p>
            </div>

            {/* Voice Assistant Activation Bar */}
            <div className="p-3.5 rounded-xl bg-slate-50 ring-1 ring-slate-200 space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-medium text-slate-900 flex items-center gap-2">
                  <Mic className={`w-3.5 h-3.5 ${isVoiceActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  Voice Assistant
                  {isListening && (
                    <span className="text-[10px] text-indigo-600 font-normal animate-pulse-subtle">listening…</span>
                  )}
                </span>

                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`ncct-press px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1.5 ring-1 ${
                    isVoiceActive
                      ? 'bg-indigo-50 text-indigo-700 ring-indigo-200'
                      : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isVoiceActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isVoiceActive ? 'Active' : 'Activate'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 tabular-nums leading-snug min-h-8">{voiceStatus}</p>

              {/* Quick Voice Command Triggers */}
              <div className="flex flex-wrap items-center gap-1.5">
                {voicePrompts.map(item => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleVoiceSimulate(item.command)}
                    className="ncct-press px-2 py-1 rounded-md bg-white hover:bg-indigo-50 text-slate-600 hover:text-slate-900 text-[10px] ring-1 ring-slate-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Switcher: Sign In vs Sign Up */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-50 ring-1 ring-slate-200 text-[13px]">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  authMode === 'signin'
                    ? 'bg-white text-indigo-700 font-semibold shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  authMode === 'signup'
                    ? 'bg-white text-indigo-700 font-semibold shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>

            {/* Success Toast */}
            {authError && (
              <div role="alert" className="p-3 bg-red-50 ring-1 ring-red-200 rounded-lg text-red-700 text-[13px] flex items-start gap-2 animate-in fade-in duration-200">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {signupSuccessMsg && (
              <div className="p-3 bg-emerald-50 ring-1 ring-emerald-200 rounded-lg text-emerald-700 text-[13px] flex items-start gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{signupSuccessMsg}</span>
              </div>
            )}

            {/* SIGN IN FORM */}
            {authMode === 'signin' ? (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    <UsersRound className="w-3.5 h-3.5 text-slate-400" /> Select Dashboard Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={e => setSelectedRole(e.target.value )}
                    className={`${fieldClass} cursor-pointer`}
                  >
                    <option value="admin">Institution Administrator (Part 3)</option>
                    <option value="trainer">Trainer / Faculty (Part 2)</option>
                    <option value="trainee">Trainee / Student (Part 1)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Official Email ID
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={fieldClass}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>
                    <Lock className="w-3.5 h-3.5 text-slate-400" /> Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={fieldClass}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="disabled:opacity-70 disabled:cursor-wait ncct-press group w-full py-3 px-5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-sm flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isSubmitting ? 'Signing in…' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </button>
              </form>
            ) : (
              /* SIGN UP FORM */
              <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Sharma"
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    className={fieldClass}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Official Email ID
                  </label>
                  <input
                    type="email"
                    placeholder="ramesh@ncct.gov.in"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    className={fieldClass}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className={labelClass}>
                      <UsersRound className="w-3.5 h-3.5 text-slate-400" /> Role
                    </label>
                    <select
                      value={signupRole}
                      onChange={e => setSignupRole(e.target.value )}
                      className={`${fieldClass} cursor-pointer px-3`}
                    >
                      <option value="trainee">Trainee / Student</option>
                      <option value="trainer">Trainer / Faculty</option>
                      <option value="admin">Institution Admin</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClass}>
                      <Building className="w-3.5 h-3.5 text-slate-400" /> Institute
                    </label>
                    <select
                      value={signupInstitute}
                      onChange={e => setSignupInstitute(e.target.value)}
                      className={`${fieldClass} cursor-pointer px-3`}
                    >
                      <option value="ICM Chennai">ICM Chennai</option>
                      <option value="RICM Hyderabad">RICM Hyderabad</option>
                      <option value="RICM Bengaluru">RICM Bengaluru</option>
                      <option value="VAMNICOM Pune">VAMNICOM Pune</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>
                    <Lock className="w-3.5 h-3.5 text-slate-400" /> Password
                  </label>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    className={fieldClass}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="disabled:opacity-70 disabled:cursor-wait ncct-press group w-full py-3 px-5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-sm flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isSubmitting ? 'Creating account…' : 'Sign Up & Access Dashboard'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </button>
              </form>
            )}

            {/* Security Footer */}
            <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> NIC Encrypted Portal
              </span>
              <span className="tabular-nums">NCCT v2026.3</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-950 px-6 py-5 text-center text-sm text-white/70">
        National Council for Cooperative Training (NCCT) · Ministry of Cooperation · Smart India Hackathon 2026
      </footer>
    </div>
  );
};
