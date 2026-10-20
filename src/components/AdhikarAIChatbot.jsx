import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  HelpCircle,
  BookOpenCheck,
  ChevronDown,
  CornerDownLeft
} from 'lucide-react';
import { MOCK_SCHEMES } from '../data/mockSchemes';

export default function AdhikarAIChatbot({ 
  lang = 'en', 
  currentStep = 1, 
  profile,
  activeNavPage = 'home',
  onNavigatePage
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Namaste! I am your AdhikarAI Civic Assistant. I can help you with official schemes across India, required documents, eligibility rules, and the 3 steps of our platform. You can type or use the microphone to speak!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Setup Web Speech API (Speech Recognition)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'kn' ? 'kn-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        // Automatically send voice query
        handleSendQuery(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  // Voice output synthesizer (SpeechSynthesis)
  const speakText = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    // Clean markdown asterisks and formatting from speech
    const cleanText = text.replace(/[*_#`•]/g, ' ').replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = lang === 'kn' ? 'kn-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported by this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Could not start recognition:", err);
      }
    }
  };

  // Pre-programmed Knowledge Base for RAG queries
  const generateBotResponse = (query) => {
    const q = query.toLowerCase();

    // 0. Scam Shield Threat Checker
    if (q.includes('scam') || q.includes('whatsapp') || q.includes('fake') || q.includes('fraud') || q.includes('phishing') || q.includes('threat')) {
      if (onNavigatePage) {
        onNavigatePage('scam-shield');
      }
      return "🛡️ **AdhikarAI Scam Shield is active:**\n• You can paste any suspicious WhatsApp forward, SMS, or fake scheme link.\n• You can also upload suspicious sanction letters or PDFs to verify official government DSC seals.\n• **Golden Rule:** Genuine welfare schemes NEVER charge processing fees (e.g., ₹199 via UPI) and always use verified `.gov.in` or `.nic.in` portals.\n• Report cyber financial fraud immediately by dialing **1930** or visiting cybercrime.gov.in.\n\n*(I have opened the Scam Shield page for you!)*";
    }

    // 0.1 Know Your Rights
    if (q.includes('right') || q.includes('rights') || q.includes('rti') || q.includes('sakala') || q.includes('consumer') || q.includes('legal aid') || q.includes('constitution')) {
      if (onNavigatePage) {
        onNavigatePage('know-your-rights');
      }
      return "📖 **Know Your Rights — Citizen Legal Charter:**\n• **RTI Act, 2005:** Mandatory 30-day response; ₹250/day penalty on defaulting officers (rtionline.gov.in).\n• **Karnataka Sakala Act, 2011:** 1,100+ public services with fixed SLAs; ₹20/day delay compensation.\n• **Consumer Protection Act, 2019:** Protection against unfair trade practices; e-Daakhil filing.\n• **NALSA Free Legal Aid:** 100% free advocate appointed for women, children, SC/ST, and low-income families (Dial 15100).\n• **Aadhaar Biometric Lock:** Permanently lock fingerprints on myAadhaar to prevent unauthorized DBT leakage.\n\n*(I have opened the Know Your Rights portal for you!)*";
    }

    // 0.2 Civic Dashboard
    if (q.includes('dashboard') || q.includes('workspace') || q.includes('command center') || q.includes('categories')) {
      return "The **Civic Dashboard** is located in the top-right navbar beside the language selector. It features 4 key workspace categories:\n1. **Home Page** — Overview of national welfare schemes, matched recommendations, and Document Doctor.\n2. **Complete Profile** — Smart profiler for state, income, and category eligibility matching.\n3. **Scam Shield** — Cyber threat detector for fake WhatsApp messages and forged notices.\n4. **Know Your Rights** — Plain-language legal rights charter with verified government links.";
    }

    // 1. Steps of the website
    if (q.includes('step') || q.includes('how does it work') || q.includes('workflow') || q.includes('steps')) {
      return "AdhikarAI operates through 3 streamlined steps:\n\n1. **Step 1: Discover** — Explore national gazette statistics and overview of welfare schemes.\n2. **Step 2: Matched Schemes** — View tailored welfare recommendations matching your citizen profile, or toggle to the All-India Directory to browse all central and state schemes.\n3. **Step 3: Document Doctor** — Perform local client-side audit of your income certificates and Aadhaar seals to eliminate desk rejections before applying.\n\n*Tip:* Complete your profile setup in the top-right navbar to calculate exact match percentages!";
    }

    // 2. Profile setup
    if (q.includes('profile') || q.includes('complete profile') || q.includes('red dot') || q.includes('red mark')) {
      return "To complete your profile:\n• Look at the top-right navbar right beside the language selector.\n• Click the **'Dashboard'** button (marked with a pulsing red indicator) and select **'Complete Profile'**.\n• Choose your State, Occupation (Student, Farmer, Business, etc.), Age, Income bracket, and Category.\n• Click **'Analyze Eligibility with RAG'** to run vector matching against official gazettes!\n• Once completed, the red mark disappears and switches to a green checkmark.";
    }

    // 3. Document Doctor
    if (q.includes('document doctor') || q.includes('doc doctor') || q.includes('audit') || q.includes('verify')) {
      return "**Document Doctor** is AdhikarAI's deterministic verification engine:\n• Audits digital signatures (e.g., Tahsildar Class 3 DSC on Form-F).\n• Validates that certified family income is strictly below the gazette threshold.\n• Verifies NPCI Direct Benefit Transfer (DBT) bank seeding on your Aadhaar.\n• Runs 100% locally in your browser enclave with **Zero-PII logging**!";
    }

    // 4. Karnataka Post Matric Scholarship
    if (q.includes('post matric') || q.includes('scholarship') || q.includes('karnataka') || q.includes('ssp')) {
      return "**Karnataka State Post-Matric Scholarship:**\n• **Benefits:** ₹25,000/year tuition fee waiver + ₹1,200/month maintenance stipend.\n• **Eligibility:** Karnataka resident (≥ 7 yrs), Enrolled student, Family income ≤ ₹2,50,000, Category OBC/SC/ST/EWS.\n• **Required Documents:**\n  1. Income & Caste Certificate (RD Form-F from Tahsildar / Nadakacheri)\n  2. Aadhaar Card with active NPCI bank seeding\n  3. College Bonafide and previous year marksheet.\n• **Official Portal:** ssp.postmatric.karnataka.gov.in";
    }

    // 5. PM Kisan
    if (q.includes('kisan') || q.includes('farmer') || q.includes('agriculture')) {
      return "**PM-Kisan Samman Nidhi:**\n• **Benefits:** ₹6,00,0/year direct cash support in 3 equal installments of ₹2,000 via DBT.\n• **Eligibility:** Landholding farmer families with cultivable land in their names.\n• **Key Documents:** Land RTC / Pahani / Khata records and Aadhaar e-KYC.\n• **Official Portal:** pmkisan.gov.in";
    }

    // 6. PM Vidyalaxmi
    if (q.includes('vidyalaxmi') || q.includes('education loan') || q.includes('loan')) {
      return "**PM Vidyalaxmi Education Loan Scheme:**\n• **Benefits:** 100% collateral-free loans up to ₹7.5 Lakhs with 3% annual interest subvention.\n• **Eligibility:** Admitted into Top 860 NIRF-ranked Quality Higher Education Institutions; family income up to ₹8.00 Lakhs.\n• **Key Documents:** Admission letter, fee schedule, and Tahsildar income proof.\n• **Portal:** vidyalakshmi.co.in";
    }

    // 7. PM SVANidhi
    if (q.includes('svanidhi') || q.includes('vendor') || q.includes('small business') || q.includes('mudra')) {
      return "**PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi):**\n• **Benefits:** Collateral-free working capital loan: ₹10,000 (1st tranche), ₹20,000 (2nd), ₹50,000 (3rd) with 7% interest subvention and digital cashback.\n• **Eligibility:** Urban street vendors and micro-hawkers.\n• **Documents:** Certificate of Vending (CoV) / Urban Local Body ID and Bank passbook.";
    }

    // 8. Ayushman Bharat
    if (q.includes('ayushman') || q.includes('health') || q.includes('pmjay') || q.includes('hospital')) {
      return "**Ayushman Bharat (PM-JAY):**\n• **Benefits:** ₹5,00,000 per family per year cashless health coverage across 27,000+ empanelled public and private hospitals.\n• **Eligibility:** Families in SECC / BPL registry without pre-existing condition exclusions.\n• **Portal:** beneficiary.nha.gov.in";
    }

    // 9. Yuva Nidhi
    if (q.includes('yuva nidhi') || q.includes('unemployed') || q.includes('youth')) {
      return "**Karnataka Yuva Nidhi Scheme:**\n• **Benefits:** ₹3,000/month for degree holders, ₹1,500/month for diploma holders for up to 2 years while seeking employment.\n• **Eligibility:** Karnataka graduate/diploma pass-outs unemployed for ≥ 6 months.";
    }

    // 10. Required documents general
    if (q.includes('document') || q.includes('certificate') || q.includes('aadhaar') || q.includes('rd form')) {
      return "**Key Statutory Documents Commonly Required:**\n1. **Income & Caste Certificate (RD Form-F):** Issued by Tahsildar / Nadakacheri verifying family income ceiling.\n2. **Aadhaar Card with NPCI Seeding:** Critical for direct cash DBT to prevent payment failures.\n3. **Educational Bonafide:** Proves ≥ 75% attendance and active enrollment.\n4. **State Domicile Certificate:** Proves local residency criteria.";
    }

    // Default intelligent response
    return `AdhikarAI is cross-referenced with 450+ official Central and State Gazettes.\n\n• For your active profile (**${profile?.state || 'Karnataka'}**, **${profile?.occupation || 'Student'}**), check the **Matched Schemes** tab for personalized recommendations.\n• Or visit the **All-India Directory** tab to explore all state and central programs across the country.\n\nWould you like details on eligibility criteria, required documents, or application steps?`;
  };

  const handleSendQuery = (queryText) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate RAG retrieval response
    setTimeout(() => {
      const botResponseText = generateBotResponse(userMessage.text);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (voiceEnabled) {
        speakText(botResponseText);
      }
    }, 600);
  };

  const handleQuickPrompt = (promptText) => {
    stopSpeaking();
    handleSendQuery(promptText);
  };

  return (
    <>
      {/* Floating Launcher Button at Bottom-Right */}
      <div className="fixed bottom-5 right-5 z-50">
        {!isOpen && (
          <button
            onClick={() => { setIsOpen(true); stopSpeaking(); }}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-zinc-950 text-white shadow-2xl hover:bg-zinc-800 transition-all duration-200 border border-zinc-800 hover:scale-[1.03] active:scale-[0.98]"
            title="Ask AdhikarAI Assistant (Text & Voice)"
          >
            {/* Pulsing indicator */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>

            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-white">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="text-left pr-1">
              <div className="text-xs font-bold font-sans flex items-center gap-1.5">
                <span>AdhikarAI Assistant</span>
                <span className="text-[10px] font-mono text-zinc-400 font-normal">AI RAG</span>
              </div>
              <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                <span>Text & Voice</span>
                <span>•</span>
                <span className="text-emerald-400">Online</span>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[410px] h-[560px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400 shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight">AdhikarAI Assistant</h3>
                  <span className="text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 px-1.5 py-0.2 rounded font-semibold">
                    RAG Bot
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-normal">
                  Gazette Citations • Verification • Guidance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice Output Toggle */}
              <button
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setVoiceEnabled(!voiceEnabled);
                }}
                className={`p-2 rounded-lg transition text-xs ${
                  voiceEnabled ? 'text-emerald-400 hover:bg-zinc-800' : 'text-zinc-500 hover:bg-zinc-800'
                }`}
                title={voiceEnabled ? "Voice Output Active (Click to mute)" : "Voice Output Muted (Click to enable)"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Clear Chat */}
              <button
                onClick={() => {
                  stopSpeaking();
                  setMessages([{
                    id: 'welcome-reset',
                    sender: 'bot',
                    text: "Chat cleared! How can I assist you with schemes, documents, or steps today?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }]);
                }}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition text-xs"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                title="Minimize chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="px-3 py-2 bg-zinc-50 border-b border-zinc-100 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <button
              onClick={() => handleQuickPrompt("How does Scam Shield verify WhatsApp forwards and notices?")}
              className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-100 transition whitespace-nowrap font-medium"
            >
              🛡️ Scam Shield
            </button>
            <button
              onClick={() => handleQuickPrompt("What are my key citizen rights under RTI and Sakala?")}
              className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 transition whitespace-nowrap font-medium"
            >
              ⚖️ Citizen Rights
            </button>
            <button
              onClick={() => handleQuickPrompt("What are the 3 steps of AdhikarAI?")}
              className="px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition whitespace-nowrap"
            >
              🚀 3 Steps
            </button>
            <button
              onClick={() => handleQuickPrompt("What documents are needed for Karnataka scholarship?")}
              className="px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition whitespace-nowrap"
            >
              📄 Scholarship Docs
            </button>
            <button
              onClick={() => handleQuickPrompt("Tell me about PM-Kisan Samman Nidhi")}
              className="px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition whitespace-nowrap"
            >
              🌾 PM-Kisan
            </button>
            <button
              onClick={() => handleQuickPrompt("How does Document Doctor audit certificates?")}
              className="px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition whitespace-nowrap"
            >
              🛡️ Document Doctor
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-zinc-50/40 text-xs">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                      isBot
                        ? 'bg-white text-zinc-900 border border-zinc-200 shadow-2xs rounded-tl-sm'
                        : 'bg-zinc-900 text-white shadow-xs rounded-tr-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    
                    {/* Bot Voice Speaker Icon */}
                    {isBot && (
                      <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-400">
                        <span>{msg.timestamp}</span>
                        <button
                          onClick={() => speakText(msg.text)}
                          className="hover:text-zinc-900 p-0.5 rounded transition flex items-center gap-1"
                          title="Listen to this response aloud"
                        >
                          <Volume2 className="w-3 h-3 text-emerald-600" />
                          <span>Listen</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {!isBot && (
                    <span className="text-[10px] text-zinc-400 mt-1 px-1">{msg.timestamp}</span>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-zinc-200 w-32 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-zinc-400 font-mono ml-1">Searching...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Listening Active Indicator */}
          {isListening && (
            <div className="px-4 py-2 bg-rose-50 border-t border-rose-200 text-rose-800 text-xs flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                <span>Listening to your voice... Speak now!</span>
              </div>
              <button
                onClick={toggleListening}
                className="text-[11px] underline font-bold text-rose-900"
              >
                Stop
              </button>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-zinc-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery();
              }}
              className="flex items-center gap-2"
            >
              {/* Voice Input (Mic) Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl border transition flex-shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-700 shadow-sm animate-pulse'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200'
                }`}
                title={isListening ? "Listening... click to stop" : "Speak your question (Voice Input)"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-zinc-700" />}
              </button>

              {/* Text Input Field */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about schemes, documents, or steps..."
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-40 transition shadow-2xs flex-shrink-0"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
