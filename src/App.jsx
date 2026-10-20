import React, { useState } from 'react';
import Navbar from './components/Navbar';
import StepIndicator from './components/StepIndicator';
import LandingHero from './components/LandingHero';
import CompleteProfileModal from './components/CompleteProfileModal';
import SchemeDashboard from './components/SchemeDashboard';
import DocumentDoctorView from './components/DocumentDoctorView';
import AuthPage from './components/AuthPage';
import AdhikarAIChatbot from './components/AdhikarAIChatbot';
import ScamShieldView from './components/ScamShieldView';
import KnowYourRightsView from './components/KnowYourRightsView';
import { MOCK_SCHEMES, UI_TRANSLATIONS } from './data/mockSchemes';

export default function App() {
  const [lang, setLang] = useState('en');
  const [currentStep, setCurrentStep] = useState(1); // 1: Discover, 2: Matched Schemes, 3: Document Doctor
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active navigation page: 'home' (Default welfare schemes flow) | 'scam-shield' | 'know-your-rights'
  const [activeNavPage, setActiveNavPage] = useState('home');
  
  // View mode for Step 2: 'matched' (Personalized according to profile) vs 'all-india' (Unrestricted directory)
  const [viewMode, setViewMode] = useState('matched');

  // 1. Authenticated User Session (Starts at Auth Screen if not logged in)
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nagrik_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Default initial profile template for Karnataka Citizen demo flow
  const defaultProfile = {
    state: "Karnataka",
    domicile: "Resident > 5 yrs",
    occupation: "Student",
    age: 20,
    incomeBracket: "₹1.5L - ₹2.5L",
    category: "OBC"
  };

  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('nagrik_profile');
      return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  // 2. Profile completion indicator (false by default until user completes setup, showing the red badge)
  const [isProfileCompleted, setIsProfileCompleted] = useState(() => {
    return localStorage.getItem('nagrik_profile_completed') === 'true';
  });

  // Complete Profile Modal visibility
  const [isCompleteProfileOpen, setIsCompleteProfileOpen] = useState(false);

  const [selectedScheme, setSelectedScheme] = useState(MOCK_SCHEMES[0]);

  // Handler: Login Success from Auth Page
  const handleLoginSuccess = ({ username, isNewUser, forceIncompleteProfile }) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem('nagrik_auth_user', JSON.stringify(userData));

    // ALWAYS keep profile incomplete on Demo Citizen login or new users for judge presentations
    if (isNewUser || forceIncompleteProfile || username === 'citizen_demo') {
      setIsProfileCompleted(false);
      localStorage.removeItem('nagrik_profile_completed');
      localStorage.removeItem('nagrik_profile');
    }

    setCurrentStep(1);
    setActiveNavPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Logout to return to Login/Sign Up page
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nagrik_auth_user');
    setIsCompleteProfileOpen(false);
    setCurrentStep(1);
    setActiveNavPage('home');
  };

  // Handler: Completing the profile wizard
  const handleCompleteProfiler = (newProfile) => {
    const finalProfile = newProfile || profile;
    setProfile(finalProfile);
    setIsProfileCompleted(true);
    localStorage.setItem('nagrik_profile_completed', 'true');
    localStorage.setItem('nagrik_profile', JSON.stringify(finalProfile));
    setIsCompleteProfileOpen(false);
    
    // Automatically transition to Matched Schemes (Step 2) in personalized mode on Home Page
    setActiveNavPage('home');
    setViewMode('matched');
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Reset Demo
  const handleResetDemo = () => {
    setProfile(defaultProfile);
    setIsProfileCompleted(false);
    localStorage.removeItem('nagrik_profile_completed');
    localStorage.removeItem('nagrik_profile');
    setSelectedScheme(MOCK_SCHEMES[0]);
    setSearchQuery('');
    setViewMode('matched');
    setCurrentStep(1);
    setActiveNavPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Search Submission -> Navigates to All-India Directory (Step 2)
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim().length > 0) {
      setActiveNavPage('home');
      setViewMode('all-india');
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler: Selecting a scheme to inspect in Document Doctor (Step 3)
  const handleSelectScheme = (scheme) => {
    setSelectedScheme(scheme);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is not logged in, render the initial Login / Sign Up Page
  if (!user) {
    return (
      <AuthPage
        lang={lang}
        setLang={setLang}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white relative">
      
      {/* Global Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        currentStep={currentStep}
        setCurrentStep={(step) => {
          if (step === 2) setViewMode('all-india');
          setCurrentStep(step);
          setActiveNavPage('home');
        }}
        onResetDemo={handleResetDemo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        user={user}
        onLogout={handleLogout}
        isProfileCompleted={isProfileCompleted}
        onOpenCompleteProfile={() => setIsCompleteProfileOpen(true)}
        activeNavPage={activeNavPage}
        setActiveNavPage={setActiveNavPage}
      />

      {/* 3-Step Navigation Progress Bar: 1. Discover, 2. Matched Schemes, 3. Document Doctor (Visible on Home Page) */}
      {activeNavPage === 'home' && (
        <StepIndicator
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          lang={lang}
        />
      )}

      {/* Complete Profile Modal (Contains the full Smart Profiler wizard & RAG evaluation) */}
      <CompleteProfileModal
        isOpen={isCompleteProfileOpen}
        onClose={() => setIsCompleteProfileOpen(false)}
        lang={lang}
        profile={profile}
        setProfile={setProfile}
        onCompleteProfiler={handleCompleteProfiler}
        username={user?.username}
        isProfileCompleted={isProfileCompleted}
      />

      {/* Main Content Area: 4 Workspace Options */}
      <main className="flex-1">
        
        {/* VIEW A: SCAM SHIELD (Cyber Threat & Fake Welfare Notice Auditor) */}
        {activeNavPage === 'scam-shield' && (
          <ScamShieldView
            onNavigateHome={() => {
              setActiveNavPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCompleteProfile={() => setIsCompleteProfileOpen(true)}
            lang={lang}
          />
        )}

        {/* VIEW B: KNOW YOUR RIGHTS (Citizen Statutory Rights Charter & Portal Links) */}
        {activeNavPage === 'know-your-rights' && (
          <KnowYourRightsView
            onNavigateHome={() => {
              setActiveNavPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateScamShield={() => {
              setActiveNavPage('scam-shield');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {/* VIEW C: HOME PAGE (The default view with 3 Steps: Discover, Matched Schemes, Document Doctor) */}
        {activeNavPage === 'home' && (
          <>
            {/* Step 1: Discover (Overview, Highlights, Preview) */}
            {currentStep === 1 && (
              <LandingHero
                lang={lang}
                onStartProfiler={() => {
                  if (!isProfileCompleted) {
                    setIsCompleteProfileOpen(true);
                  } else {
                    setViewMode('matched');
                    setCurrentStep(2);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onBrowseAll={() => {
                  // Browse all schemes across India without profile restrictions
                  setViewMode('all-india');
                  setCurrentStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectScheme={handleSelectScheme}
              />
            )}

            {/* Step 2: Matched Schemes (Personalized Citizen Dashboard OR All-India Directory) */}
            {currentStep === 2 && (
              <SchemeDashboard
                lang={lang}
                profile={profile}
                onEditProfile={() => setIsCompleteProfileOpen(true)}
                onSelectScheme={handleSelectScheme}
                isProfileCompleted={isProfileCompleted}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            )}

            {/* Step 3: Document Doctor (Gazette RAG Deep-Dive & Certificate Auditing) */}
            {currentStep === 3 && (
              <DocumentDoctorView
                scheme={selectedScheme}
                profile={profile}
                lang={lang}
                onBackToSchemes={() => {
                  setCurrentStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onResetDemo={handleResetDemo}
              />
            )}
          </>
        )}
      </main>

      {/* AI Chatbot with Text and Voice - Always available in bottom-right corner */}
      <AdhikarAIChatbot
        lang={lang}
        currentStep={currentStep}
        profile={profile}
        activeNavPage={activeNavPage}
        onNavigatePage={(page) => {
          setActiveNavPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Minimalist GovTech Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-950">AdhikarAI</span>
              <span>•</span>
              <span>Open GovTech Welfare & Citizen Rights Intelligence</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span>Gazettes: Karnataka, Maharashtra, Delhi & Central Ministries</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Zero-PII Local Enclave</span>
              <span>•</span>
              <button 
                onClick={handleResetDemo}
                className="text-zinc-600 hover:text-zinc-950 underline"
              >
                Reset Prototype
              </button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
