import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpenCheck, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  FileCheck2, 
  UploadCloud, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Copy, 
  Download, 
  QrCode, 
  RotateCcw,
  CheckSquare,
  Lock,
  Layers,
  FileQuestion
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_SAMPLE_DOCUMENTS, UI_TRANSLATIONS } from '../data/mockSchemes';

export default function DocumentDoctorView({
  scheme,
  profile,
  lang,
  onBackToSchemes,
  onResetDemo
}) {
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  // Selected sample doc type: "incomeCert" or "aadhaarCard"
  const [selectedDocKey, setSelectedDocKey] = useState("incomeCert");
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [dossierDownloaded, setDossierDownloaded] = useState(false);

  // Active document data
  const currentDoc = MOCK_SAMPLE_DOCUMENTS[selectedDocKey];

  // Checklist state
  const [checklist, setChecklist] = useState({
    doc1: true,
    doc2: true,
    doc3: false
  });

  const triggerScan = () => {
    setIsScanning(true);
    setHasScanned(false);
    setScanStep(1);

    setTimeout(() => {
      setScanStep(2);
    }, 600);

    setTimeout(() => {
      setScanStep(3);
    }, 1200);

    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#18181b', '#52525b', '#10b981']
      });
    }, 1800);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(scheme.officialPortalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadDossier = () => {
    const exportPayload = {
      platform: "AdhikarAI Citizen Welfare Intelligence",
      timestamp: new Date().toISOString(),
      schemeTitle: scheme.title,
      ministry: scheme.ministry,
      gazetteCitation: scheme.citation,
      gazetteHash: scheme.docHash,
      beneficiaryProfile: profile,
      verifiedDocument: {
        type: currentDoc.docType,
        certNumber: currentDoc.certNumber,
        issuingAuthority: currentDoc.issuingAuthority,
        digitalSignature: currentDoc.digitalSignature.signer,
        annualIncomeCertified: currentDoc.annualIncome,
        validUntil: currentDoc.validUntil
      },
      auditResult: "PRE-VERIFIED_ELIGIBLE",
      applicationFee: scheme.fee
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AdhikarAI_Application_Dossier_${scheme.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDossierDownloaded(true);
    setTimeout(() => setDossierDownloaded(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSchemes}
            className="p-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 transition"
            title="Return to Schemes"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-semibold border border-zinc-200">
                Step 3: RAG Deep-Dive & Document Doctor
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                {scheme.matchScore}% Match
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 mt-1">
              {lang === 'kn' ? scheme.kannadaTitle : lang === 'hi' ? scheme.hindiTitle : scheme.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: The Policy Clause & Rule Engine (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Official Gazette Extract Box */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs">
            
            {/* Gazette Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
                  GOI
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950">
                    Official Gazette Extraordinaire
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono">
                    {scheme.officialDocRef}
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                {scheme.gazetteClause.page}
              </span>
            </div>

            {/* Extracted Clause Heading */}
            <div className="flex items-center gap-2 mb-2">
              <BookOpenCheck className="w-4 h-4 text-zinc-800" />
              <h2 className="text-sm font-bold text-zinc-950">
                {scheme.gazetteClause.section}
              </h2>
            </div>

            {/* Raw Legal Text with Highlighted Legal Thresholds */}
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 font-mono text-xs text-zinc-800 leading-relaxed relative">
              <div className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-600">
                OCR PARSED
              </div>
              <p className="pr-16">
                &ldquo;4.2. Eligibility Criteria: Candidates belonging to Backward Classes (Category-1, 2A, 3A, 3B), Scheduled Castes, or Scheduled Tribes who are{' '}
                <mark className="bg-zinc-200 text-zinc-950 font-semibold px-1 py-0.5 rounded">
                  bona fide residents of Karnataka State for not less than seven (7) continuous years
                </mark>
                , and whose total annual parental/family income from all sources{' '}
                <mark className="bg-emerald-100 text-emerald-950 font-semibold px-1 py-0.5 rounded border border-emerald-300">
                  does not exceed INR 2,50,000/- (Rupees Two Lakh Fifty Thousand only)
                </mark>
                {' '}as{' '}
                <mark className="bg-zinc-200 text-zinc-950 font-semibold px-1 py-0.5 rounded">
                  certified by the competent Revenue Authority (Tahsildar Form-F / RD Certificate)
                </mark>
                , shall be granted full exemption from tuition fees and laboratory dues, along with a graded monthly maintenance stipend.&rdquo;
              </p>
            </div>

            {/* Cryptographic SHA-256 Anti-Hallucination Pill */}
            <div className="mt-4 p-2.5 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-600">
              <div className="flex items-center gap-2 truncate">
                <Lock className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                <span className="truncate">Source Hash: {scheme.docHash}</span>
              </div>
              <span className="flex-shrink-0 text-emerald-700 font-semibold ml-2">VERIFIED</span>
            </div>
          </div>

          {/* Interactive Rule Engine Criteria Evaluation */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-900" />
                <h3 className="text-sm font-bold text-zinc-950">
                  RAG Rule Engine — Composite Evaluation
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                4 / 4 Rules Passed
              </span>
            </div>

            <div className="space-y-3">
              {scheme.criteriaRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/60 flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-zinc-950">
                        {rule.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        PASS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-[11px] font-mono">
                      <div className="bg-white p-2 rounded border border-zinc-200">
                        <span className="text-zinc-400 block text-[9px]">STATUTORY THRESHOLD</span>
                        <span className="text-zinc-700 font-medium">{rule.threshold}</span>
                      </div>
                      <div className="bg-white p-2 rounded border border-zinc-200">
                        <span className="text-zinc-400 block text-[9px]">PROFILE VALUE</span>
                        <span className="text-zinc-950 font-bold">{rule.userValue}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-500 mt-2 font-sans">
                      {rule.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Document Doctor Upload Zone (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs">
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-900" />
                <h2 className="text-sm font-bold text-zinc-950">
                  Document Doctor AI Audit
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 font-medium">
                Local Enclave
              </span>
            </div>

            <p className="text-xs text-zinc-500 mb-4">
              Pre-screen your certificate against official gazette thresholds to prevent rejection on the Karnataka SSP portal.
            </p>

            {/* Document Type Selector Toggle */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => { setSelectedDocKey("incomeCert"); setHasScanned(false); }}
                className={`p-2.5 rounded-xl border text-xs font-medium transition text-left ${
                  selectedDocKey === "incomeCert"
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="font-semibold text-xs truncate">Income Cert (Form-F)</div>
                <div className={`text-[10px] font-mono truncate mt-0.5 ${selectedDocKey === "incomeCert" ? 'text-zinc-300' : 'text-zinc-400'}`}>
                  Nadakacheri RD
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedDocKey("aadhaarCard"); setHasScanned(false); }}
                className={`p-2.5 rounded-xl border text-xs font-medium transition text-left ${
                  selectedDocKey === "aadhaarCard"
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="font-semibold text-xs truncate">Aadhaar (e-KYC)</div>
                <div className={`text-[10px] font-mono truncate mt-0.5 ${selectedDocKey === "aadhaarCard" ? 'text-zinc-300' : 'text-zinc-400'}`}>
                  UIDAI Masked
                </div>
              </button>
            </div>

            {/* Drag & Drop Simulation Box */}
            <div className="relative border-2 border-dashed border-zinc-300 rounded-xl p-5 text-center bg-zinc-50/50 hover:bg-zinc-50 transition overflow-hidden">
              
              {/* Animated Laser Scan Beam */}
              {isScanning && (
                <div className="scan-line" />
              )}

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 shadow-xs mb-3">
                  <FileText className="w-6 h-6 text-zinc-800" />
                </div>

                <div className="text-xs font-semibold text-zinc-950">
                  {currentDoc.fileName}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                  {currentDoc.fileSize} • {currentDoc.docType}
                </div>

                <div className="mt-2 text-[11px] text-zinc-500">
                  Issuing Authority: <span className="font-medium text-zinc-800">{currentDoc.issuingAuthority}</span>
                </div>
              </div>

              {/* Action Button: Simulate Scan */}
              <div className="mt-4 pt-3 border-t border-zinc-200/80">
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={triggerScan}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition shadow-sm"
                >
                  {isScanning ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>
                        {scanStep === 1 && "Verifying cryptographic digital seal..."}
                        {scanStep === 2 && "Running OCR text & clause benchmark..."}
                        {scanStep === 3 && "Analyzing name & income validity..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                      <span>{hasScanned ? "Re-Scan & Verify Document" : "Simulate Upload & AI Scan"}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Scan Results Card (Simulates AI Document Check) */}
            {hasScanned && (
              <div className="mt-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                
                {/* 1. Authenticity */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-emerald-950">
                      ✅ {currentDoc.aiScanSummary.authenticity.title}
                    </div>
                    <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                      {currentDoc.aiScanSummary.authenticity.description}
                    </p>
                    <div className="text-[10px] font-mono text-emerald-700 mt-1">
                      Signer: {currentDoc.digitalSignature.signer}
                    </div>
                  </div>
                </div>

                {/* 2. Expiry Alert */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-amber-950">
                      ⚠️ {currentDoc.aiScanSummary.expiry.title}
                    </div>
                    <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                      {currentDoc.aiScanSummary.expiry.description}
                    </p>
                  </div>
                </div>

                {/* 3. Gap Warning */}
                {currentDoc.aiScanSummary.gapWarning.status === "GAP_NOTICE" ? (
                  <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-rose-950">
                        ❌ {currentDoc.aiScanSummary.gapWarning.title}
                      </div>
                      <p className="text-[11px] text-rose-800 mt-0.5 leading-relaxed">
                        {currentDoc.aiScanSummary.gapWarning.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-zinc-950">
                        {currentDoc.aiScanSummary.gapWarning.title}
                      </div>
                      <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">
                        {currentDoc.aiScanSummary.gapWarning.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Extracted Key-Values OCR Table */}
                <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                  <div className="text-[11px] font-mono font-bold text-zinc-700 mb-2 uppercase">
                    Extracted OCR Key-Values:
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    {currentDoc.extractedFields.map((field, idx) => (
                      <div key={idx} className="flex items-center justify-between py-0.5 border-b border-zinc-200/60 last:border-0">
                        <span className="text-zinc-500 text-[11px]">{field.label}:</span>
                        <span className="font-semibold text-zinc-900 text-[11px]">{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {!hasScanned && (
              <div className="mt-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
                <p className="text-[11px] text-zinc-500">
                  Click <strong className="text-zinc-800">&quot;Simulate Upload & AI Scan&quot;</strong> above to trigger the multi-clause verification pass.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* BOTTOM SECTION: Action Checklist & Official Portal Export */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-zinc-900" />
              <h2 className="text-lg font-bold text-zinc-950">
                Application Preparation Checklist
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              3-step physical and digital verification before submitting to the official state portal.
            </p>
          </div>

          {/* Statutory Fee Notice */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono text-emerald-900">
            <span className="font-bold">Govt Application Fee: ₹0</span>
            <span className="text-[10px] text-emerald-700 block">Statutory citizen rights fee waiver</span>
          </div>
        </div>

        {/* 3-Step Interactive Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
          <div 
            onClick={() => setChecklist({ ...checklist, doc1: !checklist.doc1 })}
            className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 cursor-pointer transition flex items-start gap-3"
          >
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
              checklist.doc1 ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'
            }`}>
              {checklist.doc1 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-950">Step 1: Revenue RD Certificate</div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Keep the Nadakacheri Form-F 15-digit RD Number handy for direct SSP API validation.
              </p>
            </div>
          </div>

          <div 
            onClick={() => setChecklist({ ...checklist, doc2: !checklist.doc2 })}
            className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 cursor-pointer transition flex items-start gap-3"
          >
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
              checklist.doc2 ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'
            }`}>
              {checklist.doc2 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-950">Step 2: Bank NPCI Aadhaar Seeding</div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Ensure DBT mapper is active at your home bank branch for automatic tuition disbursal.
              </p>
            </div>
          </div>

          <div 
            onClick={() => setChecklist({ ...checklist, doc3: !checklist.doc3 })}
            className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 cursor-pointer transition flex items-start gap-3"
          >
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
              checklist.doc3 ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'
            }`}>
              {checklist.doc3 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-950">Step 3: College Bonafide E-Attestation</div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Request your college nodal officer to verify admission registration number on SSP portal.
              </p>
            </div>
          </div>

        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-100">
          
          <div className="flex items-center gap-2">
            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition shadow-xs"
            >
              <span>Open {scheme.portalName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
              <span>{copiedLink ? "Copied Link!" : "Copy Portal URL"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadDossier}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold border border-zinc-200 transition"
            >
              {dossierDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dossier Exported!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Export Citizen Dossier (JSON)</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
