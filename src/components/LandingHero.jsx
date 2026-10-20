import React from 'react';
import { 
  ArrowRight, 
  FileCheck2, 
  ShieldCheck, 
  BookOpenCheck, 
  Sparkles, 
  ExternalLink,
  CheckCircle2,
  Building,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { UI_TRANSLATIONS, MOCK_SCHEMES } from '../data/mockSchemes';

export default function LandingHero({ lang, onStartProfiler, onBrowseAll, onSelectScheme }) {
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  // 3 prominent schemes for preview
  const previewSchemes = [
    MOCK_SCHEMES.find(s => s.id === 'karnataka-post-matric') || MOCK_SCHEMES[0],
    MOCK_SCHEMES.find(s => s.id === 'nats-apprenticeship') || MOCK_SCHEMES[1],
    MOCK_SCHEMES.find(s => s.id === 'ayushman-bharat') || MOCK_SCHEMES[4],
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-6 text-center max-w-4xl mx-auto px-4">
        
        {/* Release / Architecture Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs font-medium mb-6 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-zinc-500">Gazette RAG Engine:</span>
          <span>450+ Active Central & Karnataka Policies Mapped</span>
        </div>

        {/* High-Impact Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.15] font-sans">
          {t.heroHeadline}
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {t.heroSubhead}
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartProfiler}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition shadow-sm group"
          >
            <span>{t.btnFind}</span>
            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:translate-x-0.5 transition" />
          </button>

          <button
            onClick={onBrowseAll}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-800 text-sm font-medium hover:bg-zinc-50 hover:border-zinc-300 transition shadow-xs"
          >
            <span>{t.btnBrowse}</span>
          </button>
        </div>

        {/* Live Metrics Ticker */}
        <div className="mt-12 pt-8 border-t border-zinc-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-3 bg-white border border-zinc-200 rounded-xl">
            <div className="text-xs text-zinc-500 font-mono">INDEXED POLICIES</div>
            <div className="text-xl font-bold text-zinc-950 mt-0.5">450+ Gazettes</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">State & Central Depts</div>
          </div>
          <div className="p-3 bg-white border border-zinc-200 rounded-xl">
            <div className="text-xs text-zinc-500 font-mono">WELFARE CAPITAL</div>
            <div className="text-xl font-bold text-zinc-950 mt-0.5">₹4.2 Billion</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Direct Benefit Transfers</div>
          </div>
          <div className="p-3 bg-white border border-zinc-200 rounded-xl">
            <div className="text-xs text-zinc-500 font-mono">VERIFICATION SPEED</div>
            <div className="text-xl font-bold text-zinc-950 mt-0.5">&lt; 1.5 Sec</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Deterministic rule check</div>
          </div>
          <div className="p-3 bg-white border border-zinc-200 rounded-xl">
            <div className="text-xs text-zinc-500 font-mono">PRIVACY ENCLAVE</div>
            <div className="text-xl font-bold text-zinc-950 mt-0.5">Zero-LLM PII</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Client-side document OCR</div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Badge 1: SDG 16 */}
          <div className="p-5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-zinc-900">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200">
                  SDG 16.6
                </span>
                <h3 className="text-sm font-semibold text-zinc-950">{t.trustSd16}</h3>
              </div>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Building transparent, accountable institutions by democratizing access to official state entitlements without middlemen or bribes.
              </p>
            </div>
          </div>

          {/* Badge 2: Data Privacy */}
          <div className="p-5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-zinc-900">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Zero PII
                </span>
                <h3 className="text-sm font-semibold text-zinc-950">{t.trustPrivacy}</h3>
              </div>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Your Aadhaar and Income certificates are processed locally inside an ephemeral confidential enclave. Never trained on or stored.
              </p>
            </div>
          </div>

          {/* Badge 3: 100% Gazette Citations */}
          <div className="p-5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-zinc-900">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200">
                  Official Gazette
                </span>
                <h3 className="text-sm font-semibold text-zinc-950">{t.trustGazette}</h3>
              </div>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Every eligibility claim links directly to the specific gazette notification number, section, and page in the Govt Extraordinaire repository.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Scheme Cards (3 Prominent Preview Schemes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-950">
              Featured High-Impact Welfare Programs
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Verified schemes currently accepting fresh citizen applications
            </p>
          </div>
          <button
            onClick={onBrowseAll}
            className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 inline-flex items-center gap-1 group"
          >
            <span>View All Schemes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="group bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium border border-zinc-200">
                    {scheme.level}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {scheme.matchScore}% Match
                  </span>
                </div>

                {/* Scheme Title */}
                <h3 className="text-base font-semibold text-zinc-950 group-hover:text-black line-clamp-2">
                  {lang === 'kn' ? scheme.kannadaTitle : lang === 'hi' ? scheme.hindiTitle : scheme.title}
                </h3>
                
                <p className="text-xs text-zinc-500 mt-1 line-clamp-1 font-normal">
                  {scheme.ministry}
                </p>

                {/* Benefit Box */}
                <div className="mt-4 p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    Statutory Benefit
                  </span>
                  <p className="text-xs font-medium text-zinc-900 mt-0.5">
                    {scheme.benefitSummary}
                  </p>
                </div>

                {/* Citation Pill */}
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                  <BookOpenCheck className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                  <span className="truncate">{scheme.citation}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-400 font-mono">Fee: {scheme.fee.split(' ')[0]}</span>
                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition"
                >
                  <span>Verify Eligibility</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Showcase: How RAG works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 text-white rounded-2xl p-6 sm:p-8 border border-zinc-800">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              HOW ADHIKARAI RAG OPERATES
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Zero Hallucinations. 100% Gazette Grounded.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Generic LLMs frequently invent welfare policies or give outdated criteria. AdhikarAI uses a specialized Vector Hybrid Retrieval model that only executes rule evaluations directly parsed from official Gazette notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/80">
              <div className="text-zinc-400 text-[10px] mb-1">01 / RETRIEVAL</div>
              <div className="font-semibold text-zinc-200">Gazette PDF Ingestion</div>
              <p className="text-zinc-400 text-[11px] mt-1 font-sans">
                Official Gazette Notifications are OCR-tokenized and segmented into legal sections.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/80">
              <div className="text-zinc-400 text-[10px] mb-1">02 / RULE ENGINE</div>
              <div className="font-semibold text-zinc-200">Deterministic Thresholds</div>
              <p className="text-zinc-400 text-[11px] mt-1 font-sans">
                Income caps, domicile durations, and academic criteria are extracted as formal logical assertions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/80">
              <div className="text-zinc-400 text-[10px] mb-1">03 / VERIFICATION</div>
              <div className="font-semibold text-zinc-200">Local Document Doctor</div>
              <p className="text-zinc-400 text-[11px] mt-1 font-sans">
                User certificates are validated against digital seals and threshold rules before applying.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
