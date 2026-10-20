import React, { useState } from 'react';
import { ShieldCheck, Search, Globe, RotateCcw, Sparkles, CheckCircle2, User, LogOut, ChevronDown, ArrowLeft } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/mockSchemes';
import CivicDashboardDropdown from './CivicDashboardDropdown';

export default function Navbar({
  lang,
  setLang,
  currentStep,
  setCurrentStep,
  onResetDemo,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  user,
  onLogout,
  isProfileCompleted,
  onOpenCompleteProfile,
  activeNavPage = 'home',
  setActiveNavPage
}) {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => {
              if (setActiveNavPage) setActiveNavPage('home');
              setCurrentStep(1);
            }}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold tracking-tighter shadow-sm group-hover:bg-zinc-800 transition">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 font-sans">
                  {t.appName}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200 font-medium">
                  RAG v2.4
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-normal leading-none hidden md:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Search Bar & Return to Home button */}
          <div className="flex-1 max-w-sm hidden md:flex items-center gap-2">
            {activeNavPage === 'home' ? (
              <form onSubmit={onSearchSubmit} className="relative w-full">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search schemes, ministry, or gazette clause..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
                />
              </form>
            ) : (
              <button
                onClick={() => setActiveNavPage('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition border border-zinc-200"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-zinc-500" />
                <span>Return to Welfare Schemes Home</span>
              </button>
            )}
          </div>

          {/* Right Navigation & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Quick Link to Matched Schemes (Step 2) */}
            <button
              onClick={() => setCurrentStep(2)}
              className={`text-xs font-medium px-2.5 py-1.5 rounded-lg transition hidden lg:inline-flex items-center gap-1.5 ${
                currentStep === 2 
                  ? 'bg-zinc-100 text-zinc-900 font-semibold' 
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              Explore Schemes
            </button>

            {/* Language Selector Pill */}
            <div className="inline-flex items-center p-0.5 rounded-lg border border-zinc-200 bg-zinc-50 text-xs">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-md transition font-medium ${
                  lang === 'en'
                    ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('kn')}
                className={`px-2 py-1 rounded-md transition font-medium ${
                  lang === 'kn'
                    ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 rounded-md transition font-medium ${
                  lang === 'hi'
                    ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* CIVIC DASHBOARD TRIGGER & DROPDOWN (Positioned right beside the language selector) */}
            <div className="relative">
              <button
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-semibold transition border ${
                  activeNavPage !== 'home'
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                    : 'bg-white text-zinc-950 border-zinc-300 hover:bg-zinc-50 shadow-xs'
                }`}
                title="Civic Command Center Dashboard (Home, Complete Profile, Scam Shield, Know Your Rights)"
              >
                {/* Orange square 'A' badge with sharp edges */}
                <div className="w-4 h-4 rounded-none bg-orange-600 text-white flex items-center justify-center font-black text-[9px] shadow-2xs">
                  A
                </div>

                <span className="font-sans font-bold">Dashboard</span>

                {/* Red dot badge until user completes profile */}
                {!isProfileCompleted && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-none h-2 w-2 bg-rose-600"></span>
                  </span>
                )}

                <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${
                  isDashboardOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Civic Dashboard Menu (4 Workspace Options) */}
              <CivicDashboardDropdown
                isOpen={isDashboardOpen}
                onClose={() => setIsDashboardOpen(false)}
                activeNavPage={activeNavPage}
                onSelectPage={(page) => {
                  if (setActiveNavPage) setActiveNavPage(page);
                  if (page === 'home') setCurrentStep(1);
                }}
                isProfileCompleted={isProfileCompleted}
                onOpenCompleteProfile={onOpenCompleteProfile}
              />
            </div>

            {/* User Greeting / Logout Menu */}
            {user && (
              <div className="hidden sm:flex items-center gap-1.5 pl-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-800">
                  <User className="w-3 h-3 text-zinc-500" />
                  <span className="max-w-[80px] truncate">{user.username}</span>
                </span>
                <button
                  onClick={onLogout}
                  title="Sign Out of Citizen Session"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition border border-transparent hover:border-zinc-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Reset Demo Button */}
            <button
              onClick={onResetDemo}
              title="Reset Prototype State"
              className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 px-2 py-1.5 rounded-lg transition shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden xl:inline">{t.resetDemo}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
