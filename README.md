# AdhikarAI — Citizen Welfare Intelligence & RAG Eligibility Verification

**AdhikarAI** is an AI-powered GovTech platform that simplifies Indian welfare schemes and verifies citizen eligibility using Gazette-grounded RAG (Retrieval-Augmented Generation) and Document AI.

Built with **React**, **Tailwind CSS**, and **Lucide React** in a strict minimalist Apple/Vercel GovTech design aesthetic.

---

## 🌟 Key Highlights & Features

- **Grounded in Official Gazettes**: Cross-references claims against 450+ State (e.g., Karnataka Gazette Extraordinaire) and Central notifications with exact section and page citations.
- **SDG 16.6 Aligned**: Democratizes access to welfare rights and statutory entitlements without middlemen.
- **Privacy-Preserving Document Doctor**: Client-side document inspection validating cryptographic digital signatures (DSC/QR seals), expiry alert auditing, and field occlusion gap warnings.
- **Zero-LLM PII Logging**: Sensitive citizen identity documents are never logged or trained on remote LLM endpoints.
- **Multilingual Support**: Interactive language switcher supporting English, Kannada (ಕನ್ನಡ), and Hindi (हिंदी).
- **Exportable Application Dossier**: 1-click JSON export for direct integration into official portals like Karnataka SSP or Seva Sindhu.

---

## 🚀 Live Demo & Workflow

1. **Step 1: Landing Page (The Hook)** — Overview, high-impact headline, live welfare metrics, trust badges, and quick preview cards.
2. **Step 2: Smart Profiler (3-Step Wizard)** — Multi-step wizard capturing Location & Domicile, Demographics & Occupation, and Financials & Category with an animated RAG retrieval simulation.
3. **Step 3: Personalized Scheme Dashboard** — Match scores (e.g. 98% Match), statutory benefit summaries, and category filters (Central vs. State).
4. **Step 4: RAG Deep-Dive & Document Doctor** — Split-view showing official legal gazette extracts with highlighted thresholds alongside an interactive Document Doctor file scanner, 3-step preparation checklist, and official portal links.

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/poorvihosamani02/nagarikAI.git
cd nagarikAI

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
npm run build
```
The compiled static assets will be output to the `dist/` directory, ready for 1-click deployment on **Vercel**, **Netlify**, or **Cloudflare Pages**.

---

## 📄 License
This project is open-source under the MIT License.
