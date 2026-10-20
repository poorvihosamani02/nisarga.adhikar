import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  FileCheck2, 
  Globe,
  Building
} from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/mockSchemes';

export default function AuthPage({ lang, setLang, onLoginSuccess }) {
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser) {
      setError(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಬಳಕೆದಾರ ಹೆಸರು ನಮೂದಿಸಿ' : lang === 'hi' ? 'कृपया यूज़रनेम दर्ज करें' : 'Please enter a valid username');
      return;
    }
    if (!cleanPass) {
      setError(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ' : lang === 'hi' ? 'कृपया पासवर्ड दर्ज करें' : 'Please enter your password');
      return;
    }
    if (cleanPass.length < 4) {
      setError(lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 4 ಅಕ್ಷರಗಳಾಗಿರಬೇಕು' : lang === 'hi' ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए' : 'Password must be at least 4 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        username: cleanUser,
        isNewUser: mode === 'signup'
      });
    }, 400);
  };

  const handleDemoLogin = (demoName = 'citizen_demo') => {
    setUsername(demoName);
    setPassword('demo2025');
    setIsLoading(true);
    // Explicitly reset profile setup to incomplete for judge presentations
    localStorage.removeItem('nagrik_profile_completed');
    localStorage.removeItem('nagrik_profile');
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        username: demoName,
        isNewUser: false,
        forceIncompleteProfile: true
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col justify-between selection:bg-zinc-900 selection:text-white">
      {/* Top Header / Language Switcher */}
      <header className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold tracking-tighter shadow-sm">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-zinc-950 font-sans">
                  {t.appName}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200 font-medium">
                  RAG v2.4
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-normal leading-none hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Language Selector Pill */}
          <div className="inline-flex items-center p-0.5 rounded-lg border border-zinc-200 bg-zinc-50 text-xs">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                lang === 'en'
                  ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('kn')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                lang === 'kn'
                  ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                lang === 'hi'
                  ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </header>

      {/* Main Center Auth Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          
          {/* Card Container */}
          <div className="bg-white border border-zinc-200 rounded-3xl shadow-lg shadow-zinc-200/50 overflow-hidden">
            
            {/* Top Card Banner */}
            <div className="p-8 pb-6 border-b border-zinc-100 bg-gradient-to-b from-zinc-50 to-white text-center">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
                {mode === 'login' ? 'Citizen Portal Sign In' : 'Create Citizen Account'}
              </h1>
              <p className="text-xs text-zinc-500 mt-1.5 max-w-xs mx-auto">
                {mode === 'login'
                  ? 'Access personalized gazette-verified entitlements and policy auditing.'
                  : 'Register with only your username and password for instant enclave access.'}
              </p>

              {/* Mode Switcher Tabs */}
              <div className="mt-6 p-1 bg-zinc-100 rounded-xl grid grid-cols-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className={`py-2 rounded-lg transition ${
                    mode === 'login'
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {t.login || 'Log In'}
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(''); }}
                  className={`py-2 rounded-lg transition ${
                    mode === 'signup'
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {t.signup || 'Sign Up'}
                </button>
              </div>
            </div>

            {/* Auth Form with 2 Details: Username and Password */}
            <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-4">
              
              {/* Error Alert */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium animate-in fade-in">
                  {error}
                </div>
              )}

              {/* Field 1: Username */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  {t.username || 'Username'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username (e.g. rahul_k)"
                    autoComplete="username"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  {t.password || 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1 transition"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 active:scale-[0.99] transition shadow-xs disabled:opacity-70 group"
              >
                {isLoading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In & Access Portal' : 'Create Account & Enter'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </>
                )}
              </button>

              {/* Instant 1-Click Demo Login Shortcut */}
              <div className="pt-4 border-t border-zinc-100 text-center">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('rahul_k')}
                  className="w-full py-2 px-3 rounded-xl border border-dashed border-zinc-300 hover:border-zinc-400 bg-zinc-50/60 hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant Demo: Enter as Guest Citizen</span>
                </button>
              </div>

            </form>

            {/* Enclave Trust Footer inside Card */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Zero-PII Storage • 256-Bit Cryptographic Enclave</span>
            </div>

          </div>

          {/* Bottom Trust Subtext */}
          <div className="mt-6 text-center text-xs text-zinc-400 space-y-1">
            <p>Official Karnataka Gazette & Central Welfare Intelligence</p>
            <p className="text-[11px]">Strictly adhering to SDG 16 (Peace, Justice & Strong Institutions)</p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-4 text-center text-xs text-zinc-400 font-mono">
        AdhikarAI Civic Intelligence Platform • Local Client-Side Sandbox
      </footer>
    </div>
  );
}
