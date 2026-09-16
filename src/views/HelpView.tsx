import React from 'react';
import { ArrowUpRight, BookOpen, HelpCircle, MessageSquare, ShieldCheck, Wifi } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HelpView: React.FC = () => {
  const { setIsAiDrawerOpen } = useApp();

  const faqs = [
    {
      q: 'How is my NCCT Digital ID created and verified?',
      a: 'Your NCCT Digital ID is generated upon PACS/Institute nomination. It cryptographically binds all your course progress, assessment scores, and verified skills into a persistent national ledger.',
    },
    {
      q: 'What is Silent Weak Spot Detection?',
      a: 'The NCCT AI engine analyzes assessment trends across topics. When score drops are detected (e.g. Cooperative Accounting below 70%), it automatically recommends a targeted 15-minute booster lesson.',
    },
    {
      q: 'Can I complete learning modules when offline in rural areas?',
      a: 'Yes. NCCT Connect uses IndexedDB local caching. All progress and offline quiz attempts are stored safely on your device and auto-synced when internet connectivity resumes.',
    },
    {
      q: 'How do employers verify my certificates?',
      a: 'Employers scan the QR code on your NCCT Digital Credential, which verifies the cryptographic ledger record directly with the Ministry of Cooperation database.',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <section className="relative overflow-hidden rounded-2xl bg-[#172b4d] px-6 py-7 text-white shadow-lg sm:px-8">
        <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full border-[28px] border-teal-300/10" />
        <div className="relative max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-200">
            <ShieldCheck className="h-4 w-4" /> Trusted learner support
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Find your next answer.</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
            Get clear guidance on your learning record, certificates, and rural offline access. NCCT support is available whenever your training takes you further.
          </p>
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#b8f0df] px-4 py-2.5 text-xs font-bold text-[#172b4d] shadow-lg shadow-black/10 transition hover:bg-white"
          >
            <MessageSquare className="h-4 w-4" /> Ask NCCT AI Assistant <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { icon: BookOpen, title: 'Learning guides', text: 'Browse course and assessment guidance.', color: 'text-blue-600 bg-blue-50' },
          { icon: Wifi, title: 'Offline learning', text: 'Keep progressing without a connection.', color: 'text-teal-700 bg-teal-50' },
          { icon: ShieldCheck, title: 'Credential safety', text: 'Understand your verified digital record.', color: 'text-amber-700 bg-amber-50' },
        ].map(item => (
          <div key={item.title} className="ncct-card flex items-start gap-3 p-4">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.color}`}><item.icon className="h-4 w-4" /></div>
            <div><h3 className="text-sm font-bold text-slate-900">{item.title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{item.text}</p></div>
          </div>
        ))}
      </section>

      <section className="ncct-card p-5 sm:p-6">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-slate-100 pb-4">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">Knowledge base</p><h2 className="mt-1 text-lg font-bold text-slate-900">Frequently asked questions</h2></div>
          <span className="hidden text-xs text-slate-400 sm:block">4 popular answers</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {faqs.map((faq, i) => (
            <article key={i} className="rounded-xl border border-slate-200 bg-[#fbfcfd] p-4 transition hover:border-teal-300 hover:bg-teal-50/30">
              <h3 className="flex items-start gap-2 text-sm font-bold leading-snug text-[#172b4d]"><HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" /><span>{faq.q}</span></h3>
              <p className="pl-6 pt-2 text-xs leading-relaxed text-slate-600">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
