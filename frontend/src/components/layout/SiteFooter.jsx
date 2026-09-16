import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getRoleNav, findNavPosition } from './navConfig';

/** Home › Section › Page, shown above every page except the role's home. */
export const PageBreadcrumb = () => {
  const { userRole, language, activeTab, setActiveTab } = useApp();
  const nav = getRoleNav(userRole, language);
  const position = findNavPosition(nav, activeTab);
  if (!position || activeTab === nav.home) return null;

  const homeLabel = nav.groups[0].label;
  return (
    <div className="ncct-band w-full">
    <nav aria-label="Breadcrumb" className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-6 pb-1">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <li>
          <button onClick={() => setActiveTab(nav.home)} className="hover:text-indigo-700 hover:underline underline-offset-2">
            {homeLabel}
          </button>
        </li>
        {position.group?.items && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <li>{position.group.label}</li>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <li aria-current="page" className="font-semibold text-slate-800">
          {position.item.label}
        </li>
      </ol>
    </nav>
    </div>
  );
};

export const SiteFooter = () => {
  const { userRole, language, setActiveTab } = useApp();
  const nav = getRoleNav(userRole, language);
  const columns = nav.groups.filter(g => g.items);
  const singles = nav.groups.filter(g => g.item).map(g => g.item);

  return (
    <footer className="bg-indigo-950 text-white mt-16">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="ncct-wordmark text-3xl leading-none">NCCT</span>
            <span className="w-px h-8 bg-white/30" />
            <span className="text-sm font-semibold uppercase tracking-wide leading-tight">
              Connect
              <span className="block text-xs font-normal normal-case tracking-normal text-white/70">{nav.portalName}</span>
            </span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-xs">
            National Council for Cooperative Training, Ministry of Cooperation, Government of India.
          </p>
        </div>

        {columns.map(group => (
          <div key={group.key}>
            <h3 className="text-sm font-semibold text-white mb-3">{group.label}</h3>
            <ul className="space-y-2">
              {group.items.map(item => (
                <li key={item.id}>
                  <button onClick={() => setActiveTab(item.id)} className="text-sm text-white/70 hover:text-white hover:underline underline-offset-2 text-left">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Quick links</h3>
          <ul className="space-y-2">
            {[...singles, ...nav.utility].map(item => (
              <li key={item.id}>
                <button onClick={() => setActiveTab(item.id)} className="text-sm text-white/70 hover:text-white hover:underline underline-offset-2 text-left">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <span>© 2026 National Council for Cooperative Training (NCCT)</span>
          <span>Ministry of Cooperation · Smart India Hackathon 2026</span>
        </div>
      </div>
    </footer>
  );
};
