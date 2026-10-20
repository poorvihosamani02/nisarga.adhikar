import React, { useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  ShieldAlert, 
  BookOpen, 
  CheckCircle2, 
  X
} from 'lucide-react';

export default function CivicDashboardDropdown({
  isOpen,
  onClose,
  activeNavPage = 'home',
  onSelectPage,
  isProfileCompleted,
  onOpenCompleteProfile
}) {
  const menuRef = useRef(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-84 bg-white text-zinc-900 shadow-2xl border border-zinc-300 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150 select-none rounded-none"
    >
      {/* Header with sharp edges & white theme */}
      <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-zinc-200">
        <div className="flex items-center gap-2.5">
          {/* Sharp square badge */}
          <div className="w-8 h-8 rounded-none bg-orange-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
            A
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-wide text-zinc-950 font-sans flex items-center gap-1">
              <span>ADHIKAR</span>
              <span className="text-orange-600">AI</span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">
              CIVIC COMMAND CENTER
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1 rounded-none text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition"
          title="Close Dashboard"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Section Title */}
      <div className="px-2 py-1 mb-2">
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
          YOUR WORKSPACE
        </span>
      </div>

      {/* 4 Dashboard Options - All with sharp edges and white aesthetic */}
      <div className="space-y-1.5">
        
        {/* OPTION 1: HOME PAGE */}
        <button
          onClick={() => {
            onSelectPage('home');
            onClose();
          }}
          className={`w-full text-left p-3 rounded-none transition flex items-center justify-between border ${
            activeNavPage === 'home'
              ? 'bg-zinc-900 text-white font-bold border-zinc-900 shadow-xs'
              : 'bg-white text-zinc-800 hover:bg-zinc-50 border-transparent hover:border-zinc-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
              activeNavPage === 'home'
                ? 'bg-zinc-800 text-white'
                : 'bg-zinc-100 text-zinc-700'
            }`}>
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Home Page</div>
              <div className={`text-[10px] font-mono uppercase tracking-wider ${
                activeNavPage === 'home' ? 'text-zinc-300' : 'text-zinc-500'
              }`}>
                WELFARE SCHEMES & RAG
              </div>
            </div>
          </div>

          {activeNavPage === 'home' && (
            <span className="w-2 h-2 rounded-none bg-emerald-400 mr-1"></span>
          )}
        </button>

        {/* OPTION 2: COMPLETE PROFILE */}
        <button
          onClick={() => {
            onOpenCompleteProfile();
            onClose();
          }}
          className="w-full text-left p-3 rounded-none transition flex items-center justify-between bg-white text-zinc-800 hover:bg-zinc-50 border border-transparent hover:border-zinc-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-zinc-100 text-orange-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight text-zinc-900">Complete Profile</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                SMART PROFILER & GAZETTE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {!isProfileCompleted ? (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none text-[9px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-300">
                <span className="w-1.5 h-1.5 rounded-none bg-rose-600 animate-ping"></span>
                SETUP
              </span>
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
          </div>
        </button>

        {/* OPTION 3: SCAM SHIELD */}
        <button
          onClick={() => {
            onSelectPage('scam-shield');
            onClose();
          }}
          className={`w-full text-left p-3 rounded-none transition flex items-center justify-between border ${
            activeNavPage === 'scam-shield'
              ? 'bg-zinc-900 text-white font-bold border-zinc-900 shadow-xs'
              : 'bg-white text-zinc-800 hover:bg-zinc-50 border-transparent hover:border-zinc-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
              activeNavPage === 'scam-shield'
                ? 'bg-rose-900 text-rose-200'
                : 'bg-rose-50 text-rose-600'
            }`}>
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Scam Shield</div>
              <div className={`text-[10px] font-mono uppercase tracking-wider ${
                activeNavPage === 'scam-shield' ? 'text-zinc-300' : 'text-zinc-500'
              }`}>
                THREAT ALERT & FRAUD
              </div>
            </div>
          </div>

          {/* Sharp red dot indicator */}
          <span className="relative flex h-2.5 w-2.5 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-none h-2.5 w-2.5 bg-rose-600"></span>
          </span>
        </button>

        {/* OPTION 4: KNOW YOUR RIGHTS */}
        <button
          onClick={() => {
            onSelectPage('know-your-rights');
            onClose();
          }}
          className={`w-full text-left p-3 rounded-none transition flex items-center justify-between border ${
            activeNavPage === 'know-your-rights'
              ? 'bg-zinc-900 text-white font-bold border-zinc-900 shadow-xs'
              : 'bg-white text-zinc-800 hover:bg-zinc-50 border-transparent hover:border-zinc-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
              activeNavPage === 'know-your-rights'
                ? 'bg-blue-900 text-blue-200'
                : 'bg-blue-50 text-blue-600'
            }`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Know Your Rights</div>
              <div className={`text-[10px] font-mono uppercase tracking-wider ${
                activeNavPage === 'know-your-rights' ? 'text-zinc-300' : 'text-zinc-500'
              }`}>
                CITIZEN CHARTER & PORTALS
              </div>
            </div>
          </div>

          {activeNavPage === 'know-your-rights' && (
            <span className="w-2 h-2 rounded-none bg-blue-400 mr-1"></span>
          )}
        </button>

      </div>

      {/* Footer Info with sharp edges */}
      <div className="mt-3.5 pt-3 border-t border-zinc-200 text-[10px] font-mono text-zinc-500 text-center flex items-center justify-between px-1">
        <span>Gazette Grounded</span>
        <span>•</span>
        <span className="text-emerald-700 font-semibold">Zero-PII Local Enclave</span>
      </div>
    </div>
  );
}
