import React, { useState } from 'react';
import { 
  MapPin, 
  User, 
  IndianRupee, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Loader2, 
  ShieldCheck, 
  X,
  BadgeCheck
} from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/mockSchemes';

export default function CompleteProfileModal({
  isOpen,
  onClose,
  lang,
  profile,
  setProfile,
  onCompleteProfiler,
  username = '',
  isProfileCompleted = false
}) {
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const [subStep, setSubStep] = useState(1); // 1: Location, 2: Demographics, 3: Financials
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ragProgressStage, setRagProgressStage] = useState(0);

  if (!isOpen) return null;

  const statesList = [
    { id: "Karnataka", name: "Karnataka (ಕರ್ನಾಟಕ)", officialGazettes: 142 },
    { id: "Maharashtra", name: "Maharashtra (महाराष्ट्र)", officialGazettes: 118 },
    { id: "Delhi", name: "NCT of Delhi (दिल्ली)", officialGazettes: 64 },
    { id: "Tamil Nadu", name: "Tamil Nadu (தமிழ்நாடு)", officialGazettes: 95 },
    { id: "Uttar Pradesh", name: "Uttar Pradesh (उत्तर प्रदेश)", officialGazettes: 130 },
  ];

  const domicileOptions = [
    { id: "Resident > 5 yrs", label: "Permanent Resident (> 5 continuous years)", desc: "Satisfies majority of state domicile quotas" },
    { id: "Resident < 5 yrs", label: "Recent Resident (< 5 years)", desc: "Eligible for Central and non-domicile state schemes" },
    { id: "Migrant Worker", label: "Inter-State / Migrant Worker", desc: "Access One Nation One Ration & Building Cess benefits" },
  ];

  const occupationOptions = [
    { id: "Student", label: "Student / Enrolled Scholar", desc: "Post-matric, degree, technical or diploma courses" },
    { id: "Farmer", label: "Farmer / Agricultural Worker", desc: "Landholders, tenant farmers & agri-laborers" },
    { id: "Small Business", label: "Small Business / Street Vendor", desc: "MSMEs, Mudra applicants, artisans & vendors" },
    { id: "Unemployed", label: "Unemployed Youth / Jobseeker", desc: "Yuva Nidhi, apprenticeship & skill grants" },
  ];

  const incomeBrackets = [
    { id: "< ₹1.5 Lakh", label: "Less than ₹1.5 Lakh / year", desc: "Qualifies for Tier-1 priority BPL & full fee waivers" },
    { id: "₹1.5L - ₹2.5L", label: "₹1.5 Lakh to ₹2.5 Lakh / year", desc: "Meets Karnataka Post-Matric & central scholarship caps" },
    { id: "₹2.5L - ₹5L", label: "₹2.5 Lakh to ₹5 Lakh / year", desc: "Eligible for Vidyalaxmi, Mudra & interest subsidies" },
    { id: "> ₹5L", label: "Above ₹5 Lakh / year", desc: "Focuses on merit-based and non-means-tested initiatives" },
  ];

  const categoryOptions = [
    { id: "OBC", label: "OBC (Other Backward Classes)", desc: "Category-1, 2A, 2B, 3A, 3B in Karnataka" },
    { id: "SC/ST", label: "SC / ST (Scheduled Castes / Tribes)", desc: "Special central assistance & 100% tuition reimb." },
    { id: "EWS", label: "EWS (Economically Weaker Section)", desc: "Income & asset certificate eligible" },
    { id: "General", label: "General / Unreserved", desc: "Universal central welfare schemes" },
  ];

  const handleNext = () => {
    if (subStep < 3) {
      setSubStep(subStep + 1);
    } else {
      triggerRagAnalysis();
    }
  };

  const handlePrev = () => {
    if (subStep > 1) {
      setSubStep(subStep - 1);
    }
  };

  const triggerRagAnalysis = () => {
    setIsAnalyzing(true);
    setRagProgressStage(1);

    setTimeout(() => {
      setRagProgressStage(2);
    }, 500);

    setTimeout(() => {
      setRagProgressStage(3);
    }, 1000);

    setTimeout(() => {
      setIsAnalyzing(false);
      onCompleteProfiler(profile);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl my-auto bg-white border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Wizard Header */}
        <div className="border-b border-zinc-200 p-5 sm:p-6 bg-zinc-50/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                {subStep}/3
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-zinc-950 flex items-center gap-2">
                  <span>{isProfileCompleted ? (t.editProfile || 'Edit Citizen Profile') : (t.completeProfile || 'Complete Profile Setup')}</span>
                  {username && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-200/80 text-zinc-700 font-normal">
                      @{username}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Pinpoint exact Gazette Extraordinaire threshold matches for your profile.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition"
              title="Close Profile Setup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className={`h-1.5 rounded-full transition-all duration-300 ${subStep >= 1 ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
            <div className={`h-1.5 rounded-full transition-all duration-300 ${subStep >= 2 ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
            <div className={`h-1.5 rounded-full transition-all duration-300 ${subStep >= 3 ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
          </div>
        </div>

        {/* Wizard Body: Sub-Steps */}
        <div className="p-5 sm:p-7 max-h-[68vh] overflow-y-auto">
          
          {/* Sub-step 1: Location & Domicile */}
          {subStep === 1 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 mb-1">
                  <MapPin className="w-4 h-4 text-zinc-600" />
                  <span>Sub-step 1: Primary State of Residence</span>
                </div>
                <p className="text-xs text-zinc-500 mb-3">
                  Welfare schemes are co-funded between Central ministries and specific State gazettes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {statesList.map((state) => {
                    const isSelected = profile.state === state.id;
                    return (
                      <button
                        key={state.id}
                        type="button"
                        onClick={() => setProfile({ ...profile, state: state.id })}
                        className={`text-left p-3 rounded-xl border transition flex items-center justify-between ${
                          isSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                            : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">{state.name}</div>
                          <div className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                            {state.officialGazettes} gazettes indexed
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Domicile Options */}
              <div className="pt-4 border-t border-zinc-100">
                <label className="block text-xs font-semibold text-zinc-950 mb-1">
                  State Domicile & Residence History
                </label>
                <div className="space-y-2 mt-2">
                  {domicileOptions.map((opt) => {
                    const isSelected = profile.domicile === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setProfile({ ...profile, domicile: opt.id })}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-start justify-between ${
                          isSelected
                            ? 'border-zinc-900 bg-zinc-50 text-zinc-950 ring-1 ring-zinc-900'
                            : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-medium">{opt.label}</div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">{opt.desc}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                          isSelected ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Sub-step 2: Demographics & Occupation */}
          {subStep === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 mb-1">
                  <User className="w-4 h-4 text-zinc-600" />
                  <span>Sub-step 2: Primary Citizen Occupation</span>
                </div>
                <p className="text-xs text-zinc-500 mb-3">
                  Schemes are strictly partitioned by employment, farming, student, and business status.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {occupationOptions.map((occ) => {
                    const isSelected = profile.occupation === occ.id;
                    return (
                      <div
                        key={occ.id}
                        onClick={() => setProfile({ ...profile, occupation: occ.id })}
                        className={`p-3 rounded-xl border cursor-pointer transition ${
                          isSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                            : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{occ.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <p className={`text-[11px] mt-1 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {occ.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Age Input */}
              <div className="pt-4 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-zinc-950">
                    Applicant Age: <span className="font-mono text-zinc-900 font-bold">{profile.age} years</span>
                  </label>
                  <span className="text-[11px] text-zinc-500">
                    {profile.age <= 25 ? "Eligible for youth & scholarship quotas" : "Adult citizen welfare brackets"}
                  </span>
                </div>

                <input
                  type="range"
                  min="16"
                  max="65"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                />

                <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-1">
                  <span>16 yrs (Matric)</span>
                  <span>20 yrs (College)</span>
                  <span>35 yrs (Mid career)</span>
                  <span>65 yrs (Senior)</span>
                </div>
              </div>
            </div>
          )}

          {/* Sub-step 3: Financials & Category */}
          {subStep === 3 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 mb-1">
                  <IndianRupee className="w-4 h-4 text-zinc-600" />
                  <span>Sub-step 3: Annual Gross Household Income</span>
                </div>
                <p className="text-xs text-zinc-500 mb-3">
                  Official gazette clauses strictly enforce income caps through Tahsildar revenue certificates.
                </p>

                <div className="space-y-2">
                  {incomeBrackets.map((bracket) => {
                    const isSelected = profile.incomeBracket === bracket.id;
                    return (
                      <div
                        key={bracket.id}
                        onClick={() => setProfile({ ...profile, incomeBracket: bracket.id })}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                            : 'border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">{bracket.label}</div>
                          <div className={`text-[11px] ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                            {bracket.desc}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Category */}
              <div className="pt-4 border-t border-zinc-100">
                <label className="block text-xs font-semibold text-zinc-950 mb-1">
                  Constitutional Social Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  {categoryOptions.map((cat) => {
                    const isSelected = profile.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setProfile({ ...profile, category: cat.id })}
                        className={`p-2.5 rounded-lg border text-center transition ${
                          isSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white font-semibold'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        <div className="text-xs">{cat.label.split(' ')[0]}</div>
                        <div className={`text-[9px] mt-0.5 truncate ${isSelected ? 'text-zinc-300' : 'text-zinc-400'}`}>
                          {cat.id}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Simulated RAG Loading Skeleton Overlay */}
          {isAnalyzing && (
            <div className="mt-4 p-5 rounded-2xl bg-zinc-900 text-white border border-zinc-800 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-white animate-spin flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold font-mono tracking-wide text-zinc-100">
                    {t.simulatingRAG}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    {t.simulatingRAGSub}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Query: State=[{profile.state}] Occupation=[{profile.occupation}] Income=[{profile.incomeBracket}]</span>
                </div>
                {ragProgressStage >= 2 && (
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Vector Embedding: Matching Gazette Extraordinaire provisions...</span>
                  </div>
                )}
                {ragProgressStage >= 3 && (
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Calculated exact statutory eligibility with 99% confidence!</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer / Action Bar */}
        <div className="border-t border-zinc-200 p-4 sm:p-5 bg-zinc-50 flex items-center justify-between gap-4">
          {subStep > 1 ? (
            <button
              onClick={handlePrev}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-100 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              disabled={isAnalyzing}
              className="text-xs text-zinc-500 hover:text-zinc-800 transition px-2 py-1"
            >
              Cancel
            </button>
          )}

          {subStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition shadow-xs group"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 transition shadow-sm"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-300" />
                  <span>Analyzing Eligibility with RAG...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Analyze Eligibility with RAG</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
