import React, { useState } from 'react';
import { 
  ArrowRight, 
  BookOpenCheck, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  CreditCard, 
  FileCheck2, 
  ExternalLink, 
  Edit3, 
  BadgeCheck, 
  Sparkles, 
  AlertCircle, 
  SlidersHorizontal,
  Globe,
  MapPin,
  Filter,
  Search,
  Check
} from 'lucide-react';
import { UI_TRANSLATIONS, MOCK_SCHEMES, evaluateSchemeMatch } from '../data/mockSchemes';

export default function SchemeDashboard({
  lang,
  profile,
  onEditProfile,
  onSelectScheme,
  isProfileCompleted = false,
  viewMode = 'matched', // 'matched' | 'all-india'
  setViewMode
}) {
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  // Internal tab state if setViewMode not supplied externally
  const [internalMode, setInternalMode] = useState(viewMode);
  const activeMode = setViewMode ? viewMode : internalMode;
  const handleModeChange = (mode) => {
    if (setViewMode) setViewMode(mode);
    setInternalMode(mode);
  };

  // State filters for All-India directory
  const [selectedState, setSelectedState] = useState("All");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedScope, setSelectedScope] = useState("all"); // "all", "central", "state"
  const [searchKeyword, setSearchKeyword] = useState("");

  // Filter tabs for Matched view
  const [matchedScopeFilter, setMatchedScopeFilter] = useState("all"); // "all", "central", "state"

  // 1. Personalized Schemes (Evaluated against profile)
  const dynamicallyEvaluatedSchemes = MOCK_SCHEMES.map(scheme => 
    evaluateSchemeMatch(scheme, profile)
  ).sort((a, b) => b.matchScore - a.matchScore);

  const matchedFilteredSchemes = dynamicallyEvaluatedSchemes.filter(scheme => {
    if (matchedScopeFilter === "central") return scheme.level === "Central";
    if (matchedScopeFilter === "state") return scheme.level.includes("State") || scheme.level.includes(profile.state);
    return true;
  });

  // 2. All-India Unrestricted Schemes (No profile penalty or filtering)
  const allIndiaSchemes = MOCK_SCHEMES.filter(scheme => {
    // Scope filter
    if (selectedScope === "central" && scheme.level !== "Central") return false;
    if (selectedScope === "state" && scheme.level === "Central") return false;

    // State filter
    if (selectedState !== "All") {
      const schemeState = scheme.state || (scheme.level.includes("Karnataka") ? "Karnataka" : scheme.level.includes("Maharashtra") ? "Maharashtra" : scheme.level.includes("Delhi") ? "Delhi" : scheme.level.includes("Tamil Nadu") ? "Tamil Nadu" : scheme.level.includes("Uttar Pradesh") ? "Uttar Pradesh" : "All India");
      if (scheme.level !== "Central" && schemeState !== selectedState) {
        return false;
      }
    }

    // Sector filter
    if (selectedSector !== "All") {
      if (scheme.sector && scheme.sector !== selectedSector && !scheme.sector.includes(selectedSector)) {
        return false;
      }
    }

    // Search keyword
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchTitle = scheme.title.toLowerCase().includes(q);
      const matchMinistry = scheme.ministry.toLowerCase().includes(q);
      const matchBenefit = scheme.benefitSummary.toLowerCase().includes(q);
      if (!matchTitle && !matchMinistry && !matchBenefit) return false;
    }

    return true;
  });

  const availableStates = [
    "All",
    "Karnataka",
    "Maharashtra",
    "Delhi",
    "Tamil Nadu",
    "Uttar Pradesh",
    "Central / All India"
  ];

  const availableSectors = [
    "All",
    "Education",
    "Agriculture",
    "Healthcare",
    "Business",
    "Youth",
    "Social Security"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* View Mode Segmented Switcher: Personalized vs All-India Directory */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-zinc-200 shadow-2xs">
        <div className="inline-flex p-1 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-semibold w-full sm:w-auto">
          <button
            onClick={() => handleModeChange('matched')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
              activeMode === 'matched'
                ? 'bg-zinc-900 text-white shadow-xs font-bold'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.matchedTab || 'Personalized for You'}</span>
          </button>
          <button
            onClick={() => handleModeChange('all-india')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
              activeMode === 'all-india'
                ? 'bg-zinc-900 text-white shadow-xs font-bold'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.browseAllTab || 'Browse All Schemes (All-India)'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-zinc-700 text-zinc-200">
              {MOCK_SCHEMES.length}
            </span>
          </button>
        </div>

        <div className="text-xs text-zinc-500 font-mono hidden md:block pr-3">
          {activeMode === 'matched' 
            ? '⚡ Real-time Gazette RAG matching active' 
            : '🌐 Unrestricted All-India Central & State Repository'}
        </div>
      </div>

      {/* Alert Banner if Profile is Incomplete (in matched mode) */}
      {!isProfileCompleted && activeMode === 'matched' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs animate-in fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="text-sm font-bold text-amber-950">
                Citizen Profile Incomplete
              </div>
              <p className="text-xs text-amber-800 mt-0.5">
                Complete your profile setup to calculate exact statutory Gazette scores and pre-audit eligibility before applying.
              </p>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition shadow-xs flex-shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span>Complete Profile Setup</span>
          </button>
        </div>
      )}

      {/* MODE 1: PERSONALIZED MATCHED SCHEMES */}
      {activeMode === 'matched' && (
        <div className="space-y-6">
          {/* Top Banner & Profile Summary */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
                    Personalized Eligibility Matched
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-1">
                  Schemes Matched for Your Profile
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
                  Cross-referenced against Gazette Extraordinaire provisions for <strong className="text-zinc-900">{profile.state}</strong> and Central mandates.
                </p>
              </div>

              {/* Active Profile Chips & Edit Profile Action */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-zinc-50 p-3 sm:p-4 rounded-2xl border border-zinc-200">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-medium text-zinc-800 shadow-2xs">
                    📍 {profile.state} ({profile.domicile.split(' ')[0]})
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-medium text-zinc-800 shadow-2xs">
                    🎓 {profile.occupation} (Age {profile.age})
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-medium text-zinc-800 shadow-2xs">
                    💰 {profile.incomeBracket}
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-medium text-zinc-800 shadow-2xs">
                    🏷️ {profile.category}
                  </div>
                </div>

                {/* EDIT PROFILE BUTTON */}
                <button
                  onClick={onEditProfile}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-semibold shadow-xs transition flex-shrink-0"
                  title="Click to modify profile parameters"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t.editProfile || 'Edit Profile'}</span>
                </button>
              </div>

            </div>

            {/* Filter Tabs for Matched */}
            <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-3">
              <div className="inline-flex items-center p-1 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-medium">
                <button
                  onClick={() => setMatchedScopeFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    matchedScopeFilter === "all"
                      ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {t.filterAll} ({dynamicallyEvaluatedSchemes.length})
                </button>
                <button
                  onClick={() => setMatchedScopeFilter("central")}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    matchedScopeFilter === "central"
                      ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {t.filterCentral}
                </button>
                <button
                  onClick={() => setMatchedScopeFilter("state")}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    matchedScopeFilter === "state"
                      ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {profile.state} State ({dynamicallyEvaluatedSchemes.filter(s => s.level.includes("State") || s.level.includes(profile.state)).length})
                </button>
              </div>

              <div className="text-xs text-zinc-500 font-mono">
                Showing {matchedFilteredSchemes.length} evaluated schemes
              </div>
            </div>
          </div>

          {/* Scheme Cards Feed for Matched View */}
          <div className="space-y-5">
            {matchedFilteredSchemes.map((scheme, idx) => {
              const isTop = idx === 0 && scheme.matchScore >= 85;

              return (
                <div
                  key={scheme.id}
                  className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden ${
                    isTop 
                      ? 'border-zinc-900 shadow-md ring-1 ring-zinc-900/10' 
                      : 'border-zinc-200 hover:border-zinc-300 hover:shadow-xs'
                  }`}
                >
                  <div className="p-6 sm:p-7">
                    
                    {/* Header row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 font-medium border border-zinc-200">
                          {scheme.level}
                        </span>
                        {isTop && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-white font-medium flex items-center gap-1 shadow-xs">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            Top Recommendation
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono px-2.5 py-1 rounded-md font-semibold border flex items-center gap-1.5 ${
                          scheme.matchScore >= 80
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : scheme.matchScore >= 50
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                        }`}>
                          <CheckCircle2 className={`w-3.5 h-3.5 ${scheme.matchScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`} />
                          <span>{scheme.matchScore}% Match</span>
                        </span>
                      </div>
                    </div>

                    {/* Scheme Title & Ministry */}
                    <div className="mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-950">
                        {lang === 'kn' ? scheme.kannadaTitle : lang === 'hi' ? scheme.hindiTitle : scheme.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                        <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{scheme.ministry}</span>
                      </div>
                    </div>

                    {/* Key Benefit Summary Box */}
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                      <div className="sm:col-span-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                          Guaranteed Statutory Benefit
                        </span>
                        <p className="text-sm font-semibold text-zinc-950 mt-0.5">
                          {scheme.benefitSummary}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Disbursal: {scheme.disbursalMethod}
                        </p>
                      </div>

                      <div className="border-t sm:border-t-0 sm:border-l border-zinc-200 sm:pl-4 pt-2 sm:pt-0">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                          Application Window & Cost
                        </span>
                        <div className="text-xs font-medium text-zinc-900 mt-0.5">
                          {scheme.deadline}
                        </div>
                        <div className="text-xs font-mono text-emerald-700 font-semibold mt-1">
                          {scheme.fee}
                        </div>
                      </div>
                    </div>

                    {/* Gazette Citation */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[11px]">
                        <BookOpenCheck className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{scheme.citation}</span>
                      </div>

                      <div className="text-zinc-500 text-[11px] font-mono truncate max-w-sm">
                        Ref: {scheme.officialDocRef}
                      </div>
                    </div>

                    {/* Pre-evaluated criteria */}
                    <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase mr-1">
                        Pre-evaluated criteria:
                      </span>
                      {scheme.criteriaRules.map((rule, rIdx) => (
                        <span
                          key={rIdx}
                          className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border ${
                            rule.status === 'PASS'
                              ? 'bg-zinc-50 text-zinc-800 border-zinc-200'
                              : rule.status === 'WARN'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          <CheckCircle2 className={`w-3 h-3 ${rule.status === 'PASS' ? 'text-emerald-600' : 'text-amber-600'}`} />
                          <span>{rule.name}: <strong>{rule.userValue}</strong></span>
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Action Bar */}
                  <div className="bg-zinc-50 px-6 sm:px-7 py-3.5 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-zinc-400" />
                      <span>Document check recommended before applying on {scheme.portalName}</span>
                    </div>

                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition shadow-xs group"
                    >
                      <span>{t.verifyAction}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: ALL-INDIA DIRECTORY (BROWSE ALL SCHEMES WITHOUT CHECKING PROFILE) */}
      {activeMode === 'all-india' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* All-India Header Card */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
                    National Open Welfare Registry
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-1">
                  All-India Central & State Schemes Directory
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
                  Unrestricted public repository across all Indian States and Central Ministries. Explore welfare rights without demographic filters.
                </p>
              </div>

              {/* Search Bar for Directory */}
              <div className="w-full md:w-72">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Search by scheme name or ministry..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Comprehensive State-Wise & Central Filters */}
            <div className="mt-6 pt-6 border-t border-zinc-100 space-y-4">
              
              {/* Row 1: Scope Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-zinc-600 mr-2 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Scope:</span>
                </span>
                <button
                  onClick={() => setSelectedScope("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedScope === "all"
                      ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  All Schemes ({MOCK_SCHEMES.length})
                </button>
                <button
                  onClick={() => setSelectedScope("central")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedScope === "central"
                      ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  Central Govt ({MOCK_SCHEMES.filter(s => s.level === "Central").length})
                </button>
                <button
                  onClick={() => setSelectedScope("state")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedScope === "state"
                      ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  State Governments ({MOCK_SCHEMES.filter(s => s.level !== "Central").length})
                </button>
              </div>

              {/* Row 2: State Filter Selector */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100">
                <span className="text-xs font-semibold text-zinc-600 mr-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>State / Region:</span>
                </span>
                {availableStates.map(stateName => (
                  <button
                    key={stateName}
                    onClick={() => setSelectedState(stateName)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition ${
                      selectedState === stateName
                        ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                        : 'bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {stateName}
                  </button>
                ))}
              </div>

              {/* Row 3: Sector / Domain Filter */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100">
                <span className="text-xs font-semibold text-zinc-600 mr-2 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Sector:</span>
                </span>
                {availableSectors.map(sec => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSector(sec)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition ${
                      selectedSector === sec
                        ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                        : 'bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <div>
                Displaying <strong>{allIndiaSchemes.length}</strong> welfare schemes across India
              </div>
              <button
                onClick={() => { setSelectedState("All"); setSelectedSector("All"); setSelectedScope("all"); setSearchKeyword(""); }}
                className="text-zinc-600 hover:text-zinc-950 underline"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* All-India Scheme Cards Grid / Feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {allIndiaSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-3xl border border-zinc-200 hover:border-zinc-300 hover:shadow-xs transition flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-md font-medium border ${
                        scheme.level === 'Central'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {scheme.level}
                      </span>
                      {scheme.state && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                          📍 {scheme.state}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200 font-medium">
                      {scheme.sector || "General"}
                    </span>
                  </div>

                  {/* Scheme Title */}
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 leading-snug">
                    {lang === 'kn' ? scheme.kannadaTitle : lang === 'hi' ? scheme.hindiTitle : scheme.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span className="truncate">{scheme.ministry}</span>
                  </div>

                  {/* Benefits */}
                  <div className="mt-4 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                      Statutory Entitlement
                    </span>
                    <p className="font-semibold text-zinc-950 mt-0.5">
                      {scheme.benefitSummary}
                    </p>
                  </div>

                  {/* Gazette Citation & Deadline */}
                  <div className="mt-4 space-y-1.5 text-xs text-zinc-500 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <BookOpenCheck className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      <span className="truncate">{scheme.citation}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      <span>{scheme.deadline}</span>
                    </div>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-emerald-700 font-semibold">
                    {scheme.fee || "₹0 Fee"}
                  </span>

                  <button
                    onClick={() => onSelectScheme(scheme)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition shadow-xs group"
                  >
                    <span>Audit in Document Doctor</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
