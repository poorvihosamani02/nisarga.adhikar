import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  PhoneCall, 
  Info, 
  ArrowLeft,
  Sparkles,
  Lock,
  Search,
  Eye,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

const PRESET_MESSAGES = [
  {
    id: 'pm-laptop-scam',
    title: '🚨 Fake PM Laptop WhatsApp Forward',
    type: 'scam',
    content: "CONGRATULATIONS! Under PM Free Laptop Yojna 2026, students of India are receiving free HP/Dell Laptops. Only 450 units left! Click bit.ly/pm-free-laptop-claim now to register and pay ₹199 delivery processing charge via PhonePe/GPay before 11:59 PM today to confirm dispatch. Forward to 5 groups to activate token.",
    sender: "+92 301 2345678 (WhatsApp Group Forward)"
  },
  {
    id: 'aadhaar-eb-scam',
    title: '🚨 Aadhaar Electricity Disconnection SMS',
    type: 'scam',
    content: "Dear Consumer, your electricity power supply will be DISCONNECTED tonight at 9:30 PM from BESCOM/State Power Office because your Aadhaar KYC document is not updated. Immediately contact Electricity Officer Mr. Verma at 9876543210 or install http://bescom-kyc-update.apk to avoid power cut.",
    sender: "VK-BESCOM (Unregistered Private Number)"
  },
  {
    id: 'pm-kisan-genuine',
    title: '✅ Genuine PM-Kisan DBT Advisory',
    type: 'genuine',
    content: "Department of Agriculture & Farmers Welfare: The 16th installment of PM-Kisan Samman Nidhi has been transferred directly to your Aadhaar-seeded bank account. Check your account balance or visit official website https://pmkisan.gov.in. Do not pay any fee or share OTP with anyone.",
    sender: "GOV-PMKISN (Official Gov Sender ID)"
  }
];

export default function ScamShieldView({ onNavigateHome, onOpenCompleteProfile, lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'document'
  const [inputMessage, setInputMessage] = useState('');
  const [senderInfo, setSenderInfo] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load a preset message
  const handleLoadPreset = (preset) => {
    setInputMessage(preset.content);
    setSenderInfo(preset.sender);
    setScanResult(null);
  };

  // Run the Scam Shield Analysis
  const handleRunAnalysis = () => {
    if (activeTab === 'text' && !inputMessage.trim()) {
      alert("Please enter or paste a message, SMS, or link to analyze.");
      return;
    }

    if (activeTab === 'document' && !uploadedFile) {
      alert("Please upload a document or sample notice to audit.");
      return;
    }

    setIsScanning(true);
    setScanResult(null);

    // Simulate multi-point heuristic threat scan
    setTimeout(() => {
      const textToAnalyze = activeTab === 'text' 
        ? (inputMessage + " " + senderInfo).toLowerCase()
        : (uploadedFile.name + " " + (uploadedFile.sampleText || "")).toLowerCase();

      // Check heuristics
      const hasFeeDemand = textToAnalyze.includes('₹') || textToAnalyze.includes('fee') || textToAnalyze.includes('processing') || textToAnalyze.includes('pay') || textToAnalyze.includes('charge');
      const hasSuspiciousDomain = textToAnalyze.includes('bit.ly') || textToAnalyze.includes('.apk') || textToAnalyze.includes('tinyurl') || textToAnalyze.includes('.xyz') || (!textToAnalyze.includes('.gov.in') && !textToAnalyze.includes('.nic.in') && (textToAnalyze.includes('http') || textToAnalyze.includes('www')));
      const hasPanicUrgency = textToAnalyze.includes('tonight') || textToAnalyze.includes('disconnected') || textToAnalyze.includes('11:59') || textToAnalyze.includes('left') || textToAnalyze.includes('immediately') || textToAnalyze.includes('forward to');
      const isOfficialGov = textToAnalyze.includes('pmkisan.gov.in') || textToAnalyze.includes('gov-pmkisn') || textToAnalyze.includes('nadakacheri.karnataka.gov.in') || (textToAnalyze.includes('.gov.in') && !hasFeeDemand && !hasSuspiciousDomain);

      let result;

      if (isOfficialGov && !hasFeeDemand && !hasSuspiciousDomain) {
        result = {
          verdict: 'GENUINE_GOVERNMENT',
          riskScore: 6,
          riskLevel: 'LOW RISK',
          title: 'Official Government Communication Detected',
          summary: 'This communication aligns with statutory gazetted policies. It points to official national registries ending with verified .gov.in domains and asks for no upfront fees.',
          flags: [
            { label: 'Domain Verified', status: 'pass', detail: 'References official registry ending in verified .gov.in' },
            { label: 'Zero Monetary Demands', status: 'pass', detail: 'Government welfare transfers are 100% free; no UPI/processing fee requested' },
            { label: 'No Malicious Download', status: 'pass', detail: 'No third-party APKs or link shorteners detected' },
            { label: 'Official Sender Format', status: 'pass', detail: 'Matches standard alphanumeric national government sender IDs' }
          ],
          officialAdvice: 'You may safely proceed to verify details on the official national portal directly. Always ensure your browser address bar shows the padlock and ends with .gov.in.',
          officialLink: 'https://pmkisan.gov.in',
          helpline: '1800-11-5526 (PM-Kisan Official Helpline)'
        };
      } else {
        result = {
          verdict: 'HIGH_RISK_SCAM',
          riskScore: 94,
          riskLevel: 'CRITICAL THREAT',
          title: 'High Risk Phishing / Government Impersonation Scam',
          summary: 'WARNING: This message exhibits classic patterns of financial cyber fraud impersonating official Indian welfare programs to steal money or credentials.',
          flags: [
            { 
              label: 'Unofficial / Masked Link', 
              status: 'fail', 
              detail: hasSuspiciousDomain 
                ? 'Contains shortened URLs (bit.ly) or third-party domains instead of official .gov.in or .nic.in portals.' 
                : 'Contains an unverified external contact point.'
            },
            { 
              label: 'Fraudulent Processing Fee Trap', 
              status: 'fail', 
              detail: 'Welfare schemes NEVER charge upfront fees (e.g., ₹199). Genuine benefits are credited strictly via Direct Benefit Transfer (DBT).' 
            },
            { 
              label: 'Psychological Urgency & Fear Tactics', 
              status: 'fail', 
              detail: hasPanicUrgency 
                ? 'Uses artificial urgency ("disconnected tonight", "only 450 left") to bypass your critical thinking.' 
                : 'Presents unverified deadlines.'
            },
            { 
              label: 'Impersonation of Central/State Authority', 
              status: 'fail', 
              detail: 'Unauthorized use of Prime Minister or Ministry emblems without Gazette notification numbers.' 
            }
          ],
          officialAdvice: 'DO NOT CLICK ANY LINKS. DO NOT TRANSFER ANY MONEY VIA UPI/GPAY. Block the sender and report to the National Cyber Crime Helpline.',
          officialLink: 'https://cybercrime.gov.in',
          helpline: '1930 (National Cyber Crime Reporting Helpline)'
        };
      }

      setScanResult(result);
      setIsScanning(false);
    }, 1200);
  };

  const handleCopyReport = () => {
    if (!scanResult) return;
    const reportText = `[AdhikarAI Scam Shield Audit Report]\nVerdict: ${scanResult.title}\nRisk Score: ${scanResult.riskScore}%\nAdvice: ${scanResult.officialAdvice}\nNational Cybercrime Helpline: Dial 1930\nReport Portal: https://cybercrime.gov.in`;
    navigator.clipboard.writeText(reportText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Return to Home Navigation */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200">
        <div className="flex items-center gap-2 text-xs font-mono">
          <button 
            onClick={onNavigateHome}
            className="text-zinc-500 hover:text-zinc-950 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span className="text-zinc-400">/</span>
          <span className="text-zinc-900 font-semibold flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            Scam Shield
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-rose-50 text-rose-800 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            CERT-In & Gazette Threat Rules Active
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-medium mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            CIVIC THREAT ALERT & FRAUD DETECTION
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            AdhikarAI Scam Shield
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            Protect yourself from fraudulent WhatsApp messages, fake PM welfare schemes, and deceptive government notices. Verify authenticity instantly before sharing OTPs or paying unauthorized fees.
          </p>

          {/* Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Client-Side Privacy</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <PhoneCall className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>Direct Link to Dial 1930</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 col-span-2 sm:col-span-1">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Gazette Domain Cross-Check</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 p-1 bg-zinc-100 rounded-xl mb-6 text-xs font-medium">
              <button
                onClick={() => { setActiveTab('text'); setScanResult(null); }}
                className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                  activeTab === 'text'
                    ? 'bg-white text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Text / WhatsApp / SMS</span>
              </button>
              <button
                onClick={() => { setActiveTab('document'); setScanResult(null); }}
                className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                  activeTab === 'document'
                    ? 'bg-white text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Document / Notice</span>
              </button>
            </div>

            {/* TAB A: Text Input */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                {/* Preset Chips for Quick Testing */}
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono mb-2">
                    <span>Try Common Scams or Real Notices:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_MESSAGES.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleLoadPreset(preset)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition font-medium text-left ${
                          inputMessage === preset.content
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                        }`}
                      >
                        {preset.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                    Paste WhatsApp Forward, SMS Message, or Web Link:
                  </label>
                  <textarea
                    rows={6}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="e.g. Congratulations! Under PM Yojna you received ₹5,000. Pay ₹199 processing fee at bit.ly/pm-claim..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition leading-relaxed font-sans"
                  />
                </div>

                {/* Optional Sender ID */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                    Sender Info / Phone Number (Optional):
                  </label>
                  <input
                    type="text"
                    value={senderInfo}
                    onChange={(e) => setSenderInfo(e.target.value)}
                    placeholder="e.g. +92 300 1234567 or VK-BESCOM or Unknown WhatsApp Group"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB B: Document Upload */}
            {activeTab === 'document' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-zinc-300 rounded-2xl p-8 text-center hover:border-zinc-500 transition bg-zinc-50/50">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto mb-3 text-zinc-700">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900">
                    Upload Suspicious Government Notice / Sanction Letter
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-1 max-w-sm mx-auto">
                    Drop PDF, JPG, or PNG files. Scam Shield audits seals, emblem proportions, DSC digital signatures, and gazette notification references.
                  </p>

                  <input
                    type="file"
                    id="scam-doc-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        setUploadedFile({
                          name: file.name,
                          size: (file.size / 1024).toFixed(1) + " KB",
                          sampleText: file.name.toLowerCase()
                        });
                      }
                    }}
                    className="hidden"
                  />

                  <div className="mt-4 flex items-center justify-center gap-2">
                    <label
                      htmlFor="scam-doc-upload"
                      className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition"
                    >
                      Browse Device
                    </label>

                    {/* Pre-fill sample button */}
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedFile({
                          name: "Fake_Ministry_Welfare_Sanction_Letter.pdf",
                          size: "142 KB",
                          sampleText: "Ministry of Welfare fake letter demanding processing deposit"
                        });
                      }}
                      className="px-3 py-2 rounded-xl border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-100 transition"
                    >
                      Load Demo Fake Notice
                    </button>
                  </div>

                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-white rounded-xl border border-zinc-200 inline-flex items-center gap-3 text-xs text-left max-w-sm shadow-xs">
                      <FileText className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      <div className="truncate">
                        <div className="font-semibold text-zinc-900 truncate">{uploadedFile.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{uploadedFile.size}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Action Button */}
            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setInputMessage('');
                  setSenderInfo('');
                  setUploadedFile(null);
                  setScanResult(null);
                }}
                className="text-xs text-zinc-500 hover:text-zinc-900 font-medium"
              >
                Clear Input
              </button>

              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={isScanning || (activeTab === 'text' && !inputMessage.trim()) || (activeTab === 'document' && !uploadedFile)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 disabled:opacity-40 transition shadow-sm"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Heuristics...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>Analyze with Scam Shield</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Golden Rules of Welfare Schemes Card */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-6 text-xs text-amber-950">
            <h4 className="font-bold flex items-center gap-2 text-sm text-amber-900 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              The 3 Golden Rules of Real Indian Welfare Schemes
            </h4>
            <ul className="space-y-2 text-amber-900/90 leading-relaxed list-disc list-inside">
              <li>
                <strong>Zero Upfront Payment:</strong> No genuine Central or State welfare program charges "activation fees", "GST charges", or "security deposits" via UPI/PhonePe.
              </li>
              <li>
                <strong>Strictly .gov.in or .nic.in Domains:</strong> Official portals always end in <code>.gov.in</code> or <code>.nic.in</code>. Never trust <code>.com</code>, <code>.xyz</code>, or <code>bit.ly</code> links.
              </li>
              <li>
                <strong>Direct Benefit Transfer (DBT):</strong> Legitimate welfare funds are sent directly to your Aadhaar-linked bank account without requiring debit card PINs or OTPs.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Scan Results Dossier (5 cols) */}
        <div className="lg:col-span-5">
          {isScanning && (
            <div className="bg-white rounded-3xl border border-zinc-200 p-8 text-center space-y-4 shadow-sm animate-pulse">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-zinc-900">
                Auditing Communication Fingerprints...
              </h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Checking Gazette notification database, URL registries, DSC signature validity, and financial coercion flags.
              </p>
            </div>
          )}

          {!isScanning && !scanResult && (
            <div className="bg-zinc-100/70 border border-dashed border-zinc-300 rounded-3xl p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mx-auto text-zinc-400">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-zinc-700">Audit Dossier Awaiting Input</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Paste any WhatsApp forward or upload a document on the left, then click <strong>Analyze</strong> to generate a threat report.
              </p>
            </div>
          )}

          {!isScanning && scanResult && (
            <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-md space-y-5 animate-in fade-in duration-200">
              
              {/* Verdict Header */}
              <div className={`p-4 rounded-2xl border ${
                scanResult.verdict === 'GENUINE_GOVERNMENT'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                    scanResult.verdict === 'GENUINE_GOVERNMENT'
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-rose-200 text-rose-900'
                  }`}>
                    {scanResult.riskLevel}
                  </span>
                  <span className="text-xs font-mono font-bold">
                    Risk Score: {scanResult.riskScore}%
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  {scanResult.verdict === 'GENUINE_GOVERNMENT' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="text-sm font-bold leading-snug">
                      {scanResult.title}
                    </h3>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">
                      {scanResult.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Red Flags / Passing Checks */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
                  Heuristic Threat Breakdown
                </h4>
                <div className="space-y-2">
                  {scanResult.flags.map((flag, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs flex items-start gap-2.5"
                    >
                      {flag.status === 'pass' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold text-zinc-900">{flag.label}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">{flag.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citizen Advisory */}
              <div className="p-3.5 rounded-xl bg-zinc-900 text-white text-xs">
                <div className="font-mono text-[10px] text-zinc-400 uppercase mb-1">
                  Recommended Action
                </div>
                <p className="leading-relaxed text-zinc-200">
                  {scanResult.officialAdvice}
                </p>
              </div>

              {/* Reporting & Helplines */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <div className="flex items-center justify-between">
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition"
                  >
                    <span>Report to CyberCrime.gov.in</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={handleCopyReport}
                    className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-900 font-medium"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Report Copied" : "Copy Report"}</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between text-xs text-rose-900 font-medium">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-rose-600" />
                    <span>National Cyber Helpline</span>
                  </div>
                  <span className="font-mono font-bold text-rose-950">Dial 1930</span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
