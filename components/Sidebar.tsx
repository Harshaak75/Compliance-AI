import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Scale, Settings, X, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const links = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Policies', icon: FileText, path: '/policies' },
    { name: 'Govt Updates', icon: Scale, path: '/updates' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Content 
          Changed logic: Always 'fixed'. 
          On Mobile: translates in/out.
          On Desktop (lg): always translate-0.
      */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">CompliFit</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="lg:hidden text-slate-500 hover:text-slate-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold ring-2 ring-white">
                    TC
                 </div>
                 <div>
                    <p className="text-xs font-medium text-slate-900">Tech Corp Inc.</p>
                    <p className="text-[10px] text-slate-500">Enterprise Plan</p>
                 </div>
            </div>
        </div>
      </aside>
    </>
  );
};