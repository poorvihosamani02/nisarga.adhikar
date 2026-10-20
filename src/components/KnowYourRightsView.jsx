import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  ArrowLeft, 
  Search, 
  PhoneCall, 
  ChevronRight
} from 'lucide-react';

const CITIZEN_RIGHTS_DATA = [
  {
    id: 'rti-2005',
    category: 'transparency',
    title: 'Right to Information (RTI Act, 2005)',
    actName: 'The Right to Information Act, No. 22 of 2005',
    summary: 'Every Indian citizen has the statutory right to request information from any public authority, inspect government work, sample construction materials, and obtain certified copies of records.',
    sla: '30 Days (Mandatory) / 48 Hours if life or liberty is involved',
    penalty: '₹250 per day of delay up to ₹25,000 deducted directly from the Public Information Officer (PIO) salary under Section 20(1).',
    keyEntitlements: [
      'Inspect government projects, records, contracts, tenders, and muster rolls.',
      'Obtain certified copies of government orders, file notes, decisions, and circulars.',
      'Demand formal reasons for administrative or quasi-judicial decisions affecting you.'
    ],
    howToApply: 'File online at the Central RTI portal (rtionline.gov.in) or submit Form-A with ₹10 court fee stamp to the designated Public Information Officer.',
    portals: [
      { name: 'Central RTI Online Portal', url: 'https://rtionline.gov.in', description: 'File and track RTI applications across central ministries and departments' },
      { name: 'Central Information Commission', url: 'https://cic.gov.in', description: 'Apex appellate tribunal for second RTI appeals and complaints' }
    ]
  },
  {
    id: 'sakala-services-2011',
    category: 'public-services',
    title: 'Guarantee of Public Services (Karnataka Sakala Act, 2011)',
    actName: 'Karnataka Guarantee of Services to Citizens Act, 2011',
    summary: 'Guarantees citizens time-bound delivery of 1,100+ state government services including caste certificates, land records (RTC), income certificates, and driver licenses without delays or middlemen.',
    sla: '7 to 21 Days (Strict statutory SLA per specific service)',
    penalty: 'Citizens receive ₹20 per day of delay as compensatory compensation, automatically deducted from the defaulting public officer.',
    keyEntitlements: [
      'Immediate issuance of a unique 15-digit Guarantee of Service (GSC) tracking number upon submitting your application.',
      'Right to automatic grievance escalation if the service is not cleared within the prescribed time limit.',
      'Caste & Income certificates (RD Form-F) guaranteed within 14 working days.'
    ],
    howToApply: 'Apply through Seva Sindhu or Nadakacheri counters. Note your 15-digit GSC number to track real-time SLA status online.',
    portals: [
      { name: 'Karnataka Sakala Mission Portal', url: 'http://sakala.kar.nic.in', description: 'Check service SLAs, track GSC numbers, and file delay compensation claims' },
      { name: 'National Government Services Portal', url: 'https://services.india.gov.in', description: 'Centralized directory of all state and central citizen public services' }
    ]
  },
  {
    id: 'consumer-protection-2019',
    category: 'consumer',
    title: 'Consumer Protection Rights (CPA, 2019)',
    actName: 'Consumer Protection Act, No. 35 of 2019',
    summary: 'Empowers consumers against unfair trade practices, misleading advertisements, defective goods, and deficient public or private commercial services.',
    sla: '21 Days for notice reply; 3 to 5 months for Consumer Commission resolution',
    penalty: 'Strict product liability compensation, refund with interest, and heavy statutory fines for misleading endorsements.',
    keyEntitlements: [
      'Right to be protected against goods and services hazardous to life and property.',
      'Right to be informed regarding quality, quantity, potency, purity, standard, and price.',
      'Right to file complaints electronically via e-Daakhil without hiring an expensive advocate.'
    ],
    howToApply: 'Call National Consumer Helpline 1915 or file directly through the paperless e-Daakhil online portal.',
    portals: [
      { name: 'National Consumer Helpline (NCH)', url: 'https://consumerhelpline.gov.in', description: 'Department of Consumer Affairs grievance registration and mediation' },
      { name: 'e-Daakhil Consumer Grievance Portal', url: 'https://edaakhil.nic.in', description: 'File consumer cases online in District, State, and National commissions' }
    ]
  },
  {
    id: 'legal-aid-1987',
    category: 'legal-aid',
    title: 'Right to Free Legal Aid (NALSA Act, 1987)',
    actName: 'Legal Services Authorities Act, No. 39 of 1987',
    summary: 'Guarantees free legal counsel, advocate representation, and court fee waivers to ensure justice is not denied to any citizen by reason of economic disability (Article 39A of Constitution of India).',
    sla: 'Immediate allocation of panel advocate upon application verification',
    penalty: 'Constitutional guarantee under Article 21 & 39A; court proceedings conducted without offering legal counsel to eligible persons can be set aside.',
    keyEntitlements: [
      '100% free advocate appointed for women, children, SC/ST citizens, disabled persons, and industrial workmen.',
      'Citizens with annual income below ₹3,00,000 (varies by state) qualify automatically for free legal defense.',
      'Court fees, drafting charges, process fees, and certified copy expenses paid by the Government.'
    ],
    howToApply: 'Apply at your local District Legal Services Authority (DLSA) court complex or register via the NALSA online portal.',
    portals: [
      { name: 'National Legal Services Authority (NALSA)', url: 'https://nalsa.gov.in', description: 'Apply for free legal aid, legal clinics, and Lok Adalat dispute settlement' },
      { name: 'Tele-Law Justice Portal (DoJ)', url: 'https://tele-law.in', description: 'Video-consultation with pro-bono lawyers from Common Service Centres (CSC)' }
    ]
  },
  {
    id: 'dpdp-aadhaar-2023',
    category: 'privacy',
    title: 'Digital Privacy & Aadhaar Biometric Lock (DPDPA 2023)',
    actName: 'Digital Personal Data Protection Act, 2023 & Aadhaar Act, 2016',
    summary: 'Ensures citizens retain full control over their sensitive biometric and personal data, with statutory rights to lock biometrics, withdraw consent, and correct inaccuracies.',
    sla: 'Instant biometric locking / 72 hours for grievance response',
    penalty: 'Up to ₹250 Crores penalty on entities failing to prevent personal data breaches under the DPDP Act.',
    keyEntitlements: [
      'Right to permanently lock your Aadhaar biometrics (fingerprints/iris) to prevent unauthorized fraudulent cloning.',
      'No private entity or hotel can legally compel you to hand over a physical Aadhaar photocopy; Masked Aadhaar is legally valid.',
      'Right to receive instant SMS notification for every Aadhaar authentication attempt.'
    ],
    howToApply: 'Log in to the official myAadhaar UIDAI portal using OTP and toggle "Lock/Unlock Biometrics" with 1-click.',
    portals: [
      { name: 'UIDAI myAadhaar Biometric Lock Portal', url: 'https://uidai.gov.in/en/my-aadhaar/aadhaar-lock-unlock.html', description: 'Safeguard your biometric data against unauthorized bank transactions' },
      { name: 'Ministry of Electronics & IT (MeitY)', url: 'https://www.meity.gov.in', description: 'Digital personal data protection regulatory guidelines and advisory' }
    ]
  },
  {
    id: 'nfsa-food-2013',
    category: 'welfare',
    title: 'Right to Food & Ration Entitlements (NFSA, 2013)',
    actName: 'National Food Security Act, No. 20 of 2013',
    summary: 'Provides legal right to subsidized food grains to up to 75% of rural and 50% of urban population through the Targeted Public Distribution System (TPDS).',
    sla: 'Monthly quota allocation within first week of calendar month',
    penalty: 'Mandatory Food Security Allowance payable to beneficiary if entitled foodgrains are not supplied in time (Section 8).',
    keyEntitlements: [
      '5 kg of foodgrains per person/month for Priority Households at subsidized/free rates.',
      '35 kg of foodgrains per family/month for Antyodaya Anna Yojana (AAY) poor households.',
      'One Nation One Ration Card (ONORC): Portability to collect ration from any Fair Price Shop across India.'
    ],
    howToApply: 'Register at your local Food & Civil Supplies portal or Fair Price Shop using biometric e-PoS authentication.',
    portals: [
      { name: 'National Food Security Portal', url: 'https://nfsa.gov.in', description: 'Check ration card status, allocated quotas, and Fair Price Shop locations' },
      { name: 'Annavitran Portal', url: 'https://annavitran.nic.in', description: 'Real-time electronic PoS transaction tracking and foodgrain distribution metrics' }
    ]
  },
  {
    id: 'cpgrams-grievance',
    category: 'transparency',
    title: 'Right to Administrative Grievance Redressal (CPGRAMS)',
    actName: 'Centralized Public Grievance Redress and Monitoring System',
    summary: 'Direct mechanism for citizens to lodge grievances against any Central Ministry, Department, or State Government organization directly supervised by the Prime Minister’s Office.',
    sla: '30 Days maximum resolution SLA',
    penalty: 'Officer performance appraisal tied to time-bound disposal of public grievances; reviewable by Secretary-level committees.',
    keyEntitlements: [
      'Direct online petitioning without visiting bureaucratic offices or paying court fees.',
      'Right to file an appeal before independent Appellate Authorities if dissatisfied with the initial resolution.',
      'SMS and email tracking at every processing milestone.'
    ],
    howToApply: 'Submit grievance with supporting documents on pgportal.gov.in or via the UMANG mobile app.',
    portals: [
      { name: 'CPGRAMS Central Grievance Portal', url: 'https://pgportal.gov.in', description: 'Lodge grievances directly with Prime Minister’s Office and central departments' }
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Rights' },
  { id: 'transparency', label: 'Transparency & RTI' },
  { id: 'public-services', label: 'Public Services (Sakala)' },
  { id: 'consumer', label: 'Consumer Protection' },
  { id: 'legal-aid', label: 'Legal Aid & Justice' },
  { id: 'privacy', label: 'Digital Privacy & Aadhaar' },
  { id: 'welfare', label: 'Food & Welfare Rights' }
];

export default function KnowYourRightsView({ onNavigateHome, onNavigateScamShield, lang = 'en' }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter rights
  const filteredRights = CITIZEN_RIGHTS_DATA.filter((right) => {
    const matchesCategory = activeCategory === 'all' || right.category === activeCategory;
    const matchesSearch = 
      right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      right.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      right.actName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-in fade-in duration-200 font-sans text-zinc-900">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-200 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button 
            onClick={onNavigateHome}
            className="text-zinc-500 hover:text-zinc-950 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span className="text-zinc-300">/</span>
          <span className="text-zinc-900 font-semibold">
            Know Your Rights
          </span>
        </div>

        <button
          onClick={onNavigateScamShield}
          className="text-zinc-600 hover:text-zinc-950 transition flex items-center gap-1 font-sans"
        >
          <span>Scam Shield</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </div>

      {/* Clean Unboxed Header */}
      <div className="mb-10 pb-6 border-b border-zinc-200">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold mb-2">
          STATUTORY & CONSTITUTIONAL CITIZEN CHARTER
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
          Know Your Rights — Citizen Legal Empowerment
        </h1>
        <p className="text-sm text-zinc-600 mt-3 leading-relaxed max-w-3xl">
          Under Indian law, every citizen holds guaranteed statutory entitlements with enforceable timelines, compensatory penalties on bureaucratic delays, and direct escalation channels. Below is the full charter listed directly for your study.
        </p>

        {/* Clean minimal Search & Filter row */}
        <div className="mt-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by law, keyword, or topic (e.g. RTI, Sakala, Consumer, Delay penalty)..."
              className="w-full bg-zinc-50 border border-zinc-300 px-3 pl-9 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 border transition whitespace-nowrap text-xs ${
                  activeCategory === cat.id
                    ? 'bg-zinc-900 text-white border-zinc-900 font-medium'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rights Listed One After The Other In Clean Text (NO BOXES) */}
      <div className="divide-y divide-zinc-200">
        {filteredRights.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 text-xs">
            No citizen rights matching your search criteria. Try a different query.
          </div>
        ) : (
          filteredRights.map((right) => (
            <article key={right.id} className="py-8 first:pt-2">
              
              {/* Title & Act Header */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950">
                  {right.title}
                </h2>
                <div className="text-xs font-mono text-zinc-500 mt-1">
                  {right.actName}
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-sm text-zinc-800 mt-3 leading-relaxed">
                {right.summary}
              </p>

              {/* Timeline SLA */}
              <div className="mt-4 text-xs leading-relaxed">
                <span className="font-bold text-zinc-950">Statutory Service Level Agreement (SLA): </span>
                <span className="text-zinc-700">{right.sla}</span>
              </div>

              {/* Delay Penalty */}
              <div className="mt-2 text-xs leading-relaxed">
                <span className="font-bold text-zinc-950">Bureaucratic Accountability & Penalty on Delay: </span>
                <span className="text-zinc-700">{right.penalty}</span>
              </div>

              {/* Key Entitlements List */}
              <div className="mt-4 text-xs">
                <div className="font-bold text-zinc-950 mb-1.5">
                  What You Are Legally Entitled To:
                </div>
                <ul className="space-y-1.5 text-zinc-700 list-disc list-inside leading-relaxed">
                  {right.keyEntitlements.map((entitlement, idx) => (
                    <li key={idx}>
                      <span>{entitlement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Exercise */}
              <div className="mt-4 text-xs leading-relaxed">
                <span className="font-bold text-zinc-950">How to Exercise This Right: </span>
                <span className="text-zinc-700">{right.howToApply}</span>
              </div>

              {/* Official External Government Portals */}
              <div className="mt-5 text-xs">
                <div className="font-bold text-zinc-950 mb-2">
                  Official External Government Portals (Direct Access):
                </div>
                <div className="space-y-2">
                  {right.portals.map((portal, pIdx) => (
                    <div key={pIdx} className="flex flex-wrap items-baseline gap-2 text-xs leading-relaxed">
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-zinc-950 hover:text-blue-700 underline inline-flex items-center gap-1 transition"
                      >
                        <span>{portal.name}</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                      <span className="text-zinc-400 font-mono text-[11px]">({portal.url})</span>
                      <span className="text-zinc-600">— {portal.description}</span>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1 py-0.2 border border-emerald-200">
                        verified .gov.in
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </article>
          ))
        )}
      </div>

      {/* National Citizen Helplines - Listed Cleanly As Text */}
      <div className="mt-12 pt-8 border-t border-zinc-300">
        <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider font-mono mb-2">
          Emergency & Statutory Citizen Helplines (Toll-Free)
        </h3>
        <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
          Statutory toll-free assistance for instant escalation and citizen rights grievance registration:
        </p>

        <div className="space-y-2.5 text-xs">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-bold text-zinc-950">National Cyber Crime Reporting Helpline:</span>
            <span className="font-mono font-bold text-rose-700">Dial 1930</span>
            <span className="text-zinc-500">— Financial cyber fraud and fake government notice reporting</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-bold text-zinc-950">National Consumer Grievance Helpline (NCH):</span>
            <span className="font-mono font-bold text-zinc-900">Dial 1915</span>
            <span className="text-zinc-500">— Department of Consumer Affairs mediation and complaints</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-bold text-zinc-950">National Legal Services Authority (NALSA):</span>
            <span className="font-mono font-bold text-zinc-900">Dial 15100</span>
            <span className="text-zinc-500">— Free legal counsel for women, children, SC/ST, and low-income families</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-bold text-zinc-950">Karnataka Sakala Public Services Mission:</span>
            <span className="font-mono font-bold text-zinc-900">080-44554455</span>
            <span className="text-zinc-500">— State public service delivery tracking and delay compensation</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-bold text-zinc-950">Central Public Grievance Portal (CPGRAMS):</span>
            <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="font-mono text-blue-700 underline">
              pgportal.gov.in
            </a>
            <span className="text-zinc-500">— Direct escalation of department grievances to the Prime Minister’s Office</span>
          </div>
        </div>
      </div>

    </div>
  );
}
