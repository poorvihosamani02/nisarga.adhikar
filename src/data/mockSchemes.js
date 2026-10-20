export const MOCK_SCHEMES = [
  {
    id: "karnataka-post-matric",
    title: "Karnataka State Post-Matric Scholarship",
    kannadaTitle: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ",
    hindiTitle: "कर्नाटक राज्य उत्तर-मैट्रिक छात्रवृत्ति",
    ministry: "Department of Social Welfare & Backward Classes, Govt of Karnataka",
    level: "State (Karnataka)",
    categoryTarget: ["OBC", "SC/ST", "EWS"],
    occupationTarget: ["Student"],
    incomeLimit: 250000,
    matchScore: 98,
    isTopPick: true,
    citation: "Gazette Notification Sec 4.2 (Page 14)",
    officialDocRef: "Notification No. SWD 144 SCH 2023, Karnataka Gazette Extraordinaire Vol. 58",
    docHash: "sha256:8f3c7e91a24d0811b7f94cd4c31102919d85601abce4d13e3b7b91c890123ef1",
    benefitSummary: "₹25,000/year tuition support + ₹1,200/month maintenance allowance (Direct DBT)",
    disbursalMethod: "Direct Benefit Transfer (DBT) to Aadhaar-Seeded Bank Account",
    deadline: "31st December 2025 (Active Cycle)",
    officialPortalUrl: "https://ssp.postmatric.karnataka.gov.in",
    portalName: "State Scholarship Portal (SSP Karnataka)",
    fee: "₹0 (Zero application or processing fee)",
    gazetteClause: {
      section: "Section 4.2 — Financial Eligibility & Domicile Ceiling",
      page: "Official Gazette Page 14, Paragraph 3",
      rawText: "4.2. Eligibility Criteria: Candidates belonging to Backward Classes (Category-1, 2A, 3A, 3B), Scheduled Castes, or Scheduled Tribes who are bona fide residents of Karnataka State for not less than seven (7) continuous years, and whose total annual parental/family income from all sources does not exceed INR 2,50,000/- (Rupees Two Lakh Fifty Thousand only) as certified by the competent Revenue Authority (Tahsildar Form-F / RD Certificate), shall be granted full exemption from tuition fees and laboratory dues, along with a graded monthly maintenance stipend.",
      highlights: [
        { text: "residents of Karnataka State for not less than seven (7) continuous years", type: "domicile" },
        { text: "does not exceed INR 2,50,000/- (Rupees Two Lakh Fifty Thousand only)", type: "income" },
        { text: "certified by the competent Revenue Authority (Tahsildar Form-F / RD Certificate)", type: "doc" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-domicile",
        name: "Karnataka Domicile Requirement",
        threshold: "Permanent resident of Karnataka (≥ 7 yrs domicile / school records)",
        userValue: "Karnataka Resident (Resident > 5 yrs)",
        status: "PASS",
        details: "Verified via state domicile criteria & local revenue jurisdiction"
      },
      {
        id: "rule-income",
        name: "Annual Household Income Ceiling",
        threshold: "Gross Family Income ≤ ₹2,50,000 per annum",
        userValue: "₹1,80,000 / year (Income bracket: ₹1.5L - ₹2.5L)",
        status: "PASS",
        details: "Comfortably satisfies threshold with ₹70,000 safety buffer below the limit"
      },
      {
        id: "rule-academic",
        name: "Academic Enrollment & Course Level",
        threshold: "Enrolled in recognized Post-Matric / Degree / Diploma program",
        userValue: "Full-Time Student (Age 20)",
        status: "PASS",
        details: "Course verified under UGC / AICTE recognized affiliated college"
      },
      {
        id: "rule-category",
        name: "Social Category & Reservation",
        threshold: "Belongs to OBC (Cat 1, 2A, 3A, 3B) / SC / ST / EWS",
        userValue: "OBC Category",
        status: "PASS",
        details: "Entitled to 100% tuition reimbursement and maintenance subsidy"
      }
    ],
    requiredDocuments: [
      {
        name: "Income & Caste Certificate (RD Form-F)",
        mandatory: true,
        issuer: "Revenue Department (Nadakacheri / Tahsildar)",
        purpose: "Validates income ≤ ₹2.5 Lakh and caste entitlement"
      },
      {
        name: "Aadhaar Card (NPCI-Seeded)",
        mandatory: true,
        issuer: "UIDAI",
        purpose: "Required for Aadhaar-based DBT direct scholarship disbursal"
      },
      {
        name: "College Bonafide & Previous Year Marksheet",
        mandatory: true,
        issuer: "Registered Educational Institution",
        purpose: "Authenticates active enrollment and ≥ 75% attendance record"
      }
    ]
  },
  {
    id: "nats-apprenticeship",
    title: "National Apprenticeship Training Scheme (NATS 2.0)",
    kannadaTitle: "ರಾಷ್ಟ್ರೀಯ ಅಪ್ರೆಂಟಿಸ್‌ಶಿಪ್ ತರಬೇತಿ ಯೋಜನೆ",
    hindiTitle: "राष्ट्रीय शिक्षुता प्रशिक्षण योजना (NATS 2.0)",
    ministry: "Ministry of Education (MoE), Govt of India",
    level: "Central",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Student", "Unemployed"],
    incomeLimit: 800000,
    matchScore: 94,
    isTopPick: false,
    citation: "Govt of India Gazette GSR 822(E) Part II Sec 3(i)",
    officialDocRef: "Apprenticeship Rules Amendment Act 2023, Gazette of India Ext. No. 411",
    docHash: "sha256:3d91f2c418e69002ab9892cfa71295b98451f284e601247bca89d31190bc4123",
    benefitSummary: "₹9,000/month direct government stipend subsidy for 12 months with industry placement",
    disbursalMethod: "Monthly DBT directly credited into trainee bank account",
    deadline: "Open rolling enrollment (Round 4 Active)",
    officialPortalUrl: "https://nats.education.gov.in",
    portalName: "National Apprenticeship Portal",
    fee: "₹0 (100% Free Government Initiative)",
    gazetteClause: {
      section: "Sub-section 3(b) — Stipend Grant & Eligibility Matrix",
      page: "Gazette Notification GSR 822(E), Page 7",
      rawText: "3(b). Every candidate possessing a Degree or Diploma in Engineering, Humanities, Science, or Commerce conferred by a recognized University, who has completed said qualification within the preceding three years and has not previously completed one year of apprenticeship training in any establishment, shall be eligible to receive monthly stipend assistance of INR 9,000 per mensem under DBT mechanism.",
      highlights: [
        { text: "Degree or Diploma in Engineering, Humanities, Science, or Commerce", type: "education" },
        { text: "within the preceding three years", type: "recency" },
        { text: "monthly stipend assistance of INR 9,000 per mensem under DBT", type: "benefit" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-nats-edu",
        name: "Educational Credential Qualification",
        threshold: "Graduated or pursuing final year degree/diploma",
        userValue: "Undergraduate / College Student",
        status: "PASS",
        details: "Eligible for pre-graduation apprenticeship onboarding"
      },
      {
        id: "rule-nats-work",
        name: "Prior Formal Employment History",
        threshold: "No prior corporate EPF/ESIC registered employment > 1 year",
        userValue: "Fresher / Zero prior corporate registration",
        status: "PASS",
        details: "Meets fresher requirement for subsidized training mandate"
      },
      {
        id: "rule-nats-dbt",
        name: "Aadhaar e-KYC Seeded Bank Account",
        threshold: "Active Aadhaar linking in PFMS / NPCI mapper",
        userValue: "Aadhaar verified",
        status: "PASS",
        details: "Direct subsidy transfer readiness confirmed"
      }
    ],
    requiredDocuments: [
      {
        name: "Provisional Degree / Bonafide Student Certificate",
        mandatory: true,
        issuer: "University / College Registrar",
        purpose: "Validates technical/general education qualification"
      },
      {
        name: "Aadhaar Card",
        mandatory: true,
        issuer: "UIDAI",
        purpose: "Identity proof and e-KYC authentication"
      },
      {
        name: "Bank Passbook with Printed IFSC & Name",
        mandatory: true,
        issuer: "Scheduled Commercial Bank",
        purpose: "Enables public financial management system (PFMS) routing"
      }
    ]
  },
  {
    id: "pm-vidyalaxmi",
    title: "PM Vidyalaxmi Education Loan & Interest Subsidy Scheme",
    kannadaTitle: "ಪ್ರಧಾನಮಂತ್ರಿ ವಿದ್ಯಾಲಕ್ಷ್ಮಿ ಶಿಕ್ಷಣ ಸಾಲ ಯೋಜನೆ",
    hindiTitle: "पीएम विद्यालक्ष्मी शिक्षा ऋण एवं ब्याज सब्सिडी योजना",
    ministry: "Department of Higher Education, Govt of India",
    level: "Central",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Student"],
    incomeLimit: 800000,
    matchScore: 91,
    isTopPick: false,
    citation: "Cabinet Circular MoE/HE/2024/09 (Clause 7.1)",
    officialDocRef: "Cabinet Resolution on Comprehensive Student Financial Support, Oct 2024",
    docHash: "sha256:7198ba29d041eef554a938c1192837bc901e12739b8fa018471bcca1172849e0",
    benefitSummary: "100% collateral-free loan up to ₹7.5 Lakhs with 3% annual interest subvention",
    disbursalMethod: "Direct electronic sanction to accredited institution via Canara/SBI nodal network",
    deadline: "Available throughout academic year",
    officialPortalUrl: "https://vidyalakshmi.co.in",
    portalName: "Vidyalakshmi National Portal",
    fee: "₹0 (Zero upfront collateral / zero processing fee for govt quota)",
    gazetteClause: {
      section: "Clause 7.1 — Quality Institution Cohort & Subvention Coverage",
      page: "Circular Ref MoE/HE/2024/09, Clause 7",
      rawText: "7.1. Collateral-Free Guarantee: Students securing admission into the Top 860 Quality Higher Education Institutions (QHEIs) ranked in the NIRF overall/discipline bands, whose family income is up to INR 8.00 Lakhs, shall be extended 100% credit guarantee through NCGTC for loans up to INR 7.5 Lakhs, with an additional 3% interest subvention during the moratorium period.",
      highlights: [
        { text: "Top 860 Quality Higher Education Institutions (QHEIs) ranked in the NIRF", type: "institution" },
        { text: "whose family income is up to INR 8.00 Lakhs", type: "income" },
        { text: "100% credit guarantee through NCGTC for loans up to INR 7.5 Lakhs", type: "benefit" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-vidya-income",
        name: "Household Income Threshold",
        threshold: "Annual gross household income ≤ ₹8,00,000",
        userValue: "₹1,80,000 per annum",
        status: "PASS",
        details: "Well below the ₹8 Lakh cap; qualifies for full 3% interest rebate"
      },
      {
        id: "rule-vidya-collateral",
        name: "Collateral & Third-Party Guarantee Waiver",
        threshold: "No property mortgage or third-party guarantee required up to ₹7.5L",
        userValue: "Requesting academic tuition coverage",
        status: "PASS",
        details: "100% sovereign guarantee under NCGTC portal protocol"
      }
    ],
    requiredDocuments: [
      {
        name: "Admission Offer Letter & Official College Fee Schedule",
        mandatory: true,
        issuer: "Admitting College / University",
        purpose: "Specifies exact semester tuition, library, and examination fees"
      },
      {
        name: "Salary Slip / Tahsildar Income Certificate",
        mandatory: true,
        issuer: "Competent Authority",
        purpose: "Establishes family income eligibility under ₹8L benchmark"
      },
      {
        name: "PAN & Aadhaar of Student and Co-applicant",
        mandatory: true,
        issuer: "Income Tax Dept / UIDAI",
        purpose: "Digital KYC and credit bureau reporting"
      }
    ]
  },
  {
    id: "karnataka-yuva-nidhi",
    title: "Karnataka Yuva Nidhi Scheme (Guarantee Scheme)",
    kannadaTitle: "ಕರ್ನಾಟಕ ಯುವ ನಿಧಿ ಯೋಜನೆ",
    hindiTitle: "कर्नाटक युवा निधि योजना",
    ministry: "Department of Skill Development & Livelihood, Govt of Karnataka",
    level: "State (Karnataka)",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Student", "Unemployed"],
    incomeLimit: 9999999,
    matchScore: 96,
    isTopPick: false,
    citation: "Govt Order No. SDET 15 ETS 2023, Karnataka Gazette",
    officialDocRef: "Karnataka Gazette Notification SDET-15-ETS, 2023",
    docHash: "sha256:1a84f3e66299b8ac49d84e90141bbce820194481239bf0901eac847291840134",
    benefitSummary: "₹3,000/month for degree holders, ₹1,500/month for diploma holders for up to 24 months",
    disbursalMethod: "Direct monthly DBT via Karnataka Seva Sindhu / DBT Portal",
    deadline: "Continuous registration for recent batches",
    officialPortalUrl: "https://sevasindhugs.karnataka.gov.in",
    portalName: "Seva Sindhu Guarantee Services",
    fee: "₹0 (Zero cost service)",
    gazetteClause: {
      section: "Section 2.1 — Unemployment Allowance & Continuous Domicile",
      page: "Govt Order Page 4, Section 2",
      rawText: "2.1. Unemployed youth who have passed their Degree or Diploma in the academic year 2022-23 and subsequent batches, who are domiciled in Karnataka for a minimum of 6 years, and who have not gained employment or self-employment 180 days after course completion shall receive monthly financial assistance of ₹3,000 (Degree) or ₹1,500 (Diploma) directly into their Aadhaar-linked accounts.",
      highlights: [
        { text: "domiciled in Karnataka for a minimum of 6 years", type: "domicile" },
        { text: "monthly financial assistance of ₹3,000 (Degree) or ₹1,500 (Diploma)", type: "benefit" },
        { text: "not gained employment 180 days after course completion", type: "status" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-yuva-domicile",
        name: "State Domicile Requirement",
        threshold: "Minimum 6 years of residence / study in Karnataka",
        userValue: "Karnataka Resident",
        status: "PASS",
        details: "Matches state education board / residence validation"
      },
      {
        id: "rule-yuva-age",
        name: "Age & Target Demographic",
        threshold: "Youth between 18 to 29 years of age",
        userValue: "Age 20",
        status: "PASS",
        details: "Within youth priority demographic bracket"
      }
    ],
    requiredDocuments: [
      {
        name: "Degree or Diploma Marks Card with Registration Number",
        mandatory: true,
        issuer: "Karnataka State Examination Board / University",
        purpose: "Proves graduation completion date"
      },
      {
        name: "Aadhaar Card Linked to Mobile & Bank Account",
        mandatory: true,
        issuer: "UIDAI",
        purpose: "Mandatory for Aadhaar-based DBT payment authentication"
      }
    ]
  },
  {
    id: "pm-kisan",
    title: "PM-Kisan Samman Nidhi",
    kannadaTitle: "ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ",
    hindiTitle: "पीएम-किसान सम्मान निधि",
    ministry: "Ministry of Agriculture & Farmers Welfare, Govt of India",
    level: "Central",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Farmer"],
    incomeLimit: 500000,
    matchScore: 88,
    isTopPick: false,
    citation: "Gazette Notification No. 1-1/2019-Credit-I Sec 3",
    officialDocRef: "Operational Guidelines of PM-KISAN, Gazette of India Ext.",
    docHash: "sha256:4b912a784d09210081eefc491295ba12994019a8421b84ef90123ca49081274a",
    benefitSummary: "₹6,000/year assured income support in 3 equal quarterly installments of ₹2,000",
    disbursalMethod: "Direct PFMS transfer into farmer landholder account",
    deadline: "Ongoing registration with e-KYC mandatory",
    officialPortalUrl: "https://pmkisan.gov.in",
    portalName: "PM Kisan Samman Portal",
    fee: "₹0",
    gazetteClause: {
      section: "Section 3.1 — Landholder Definition & Institutional Exclusions",
      page: "Operational Guidelines, Gazette Page 3",
      rawText: "3.1. Under the PM-KISAN scheme, financial benefit of Rs. 6000/- per year is provided to all landholding farmer families having cultivable land in their names, subject to certain exclusion categories related to higher economic status (such as serving/retired government officials or income tax payers).",
      highlights: [
        { text: "financial benefit of Rs. 6000/- per year", type: "benefit" },
        { text: "all landholding farmer families having cultivable land", type: "land" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-kisan-land",
        name: "Cultivable Landholding Ownership",
        threshold: "Name recorded in state land revenue records (RTC / Pahani)",
        userValue: "Farmer profile land record",
        status: "PASS",
        details: "Verified against state Bhoomi land database"
      }
    ],
    requiredDocuments: [
      {
        name: "Land RTC / Khata / Pahani Document",
        mandatory: true,
        issuer: "State Revenue Department (Bhoomi)",
        purpose: "Validates ownership of cultivable parcel"
      }
    ]
  },
  {
    id: "ayushman-bharat",
    title: "Ayushman Bharat — Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    kannadaTitle: "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ ಆರೋಗ್ಯ ಯೋಜನೆ",
    hindiTitle: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    ministry: "National Health Authority (NHA), Ministry of Health & Family Welfare",
    level: "Central",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Student", "Farmer", "Small Business", "Unemployed"],
    incomeLimit: 250000,
    matchScore: 92,
    isTopPick: false,
    citation: "Gazette Notification Part I Sec 1 (No. 341)",
    officialDocRef: "NHA National Health Protection Guidelines, Gazette Notification No. 341",
    docHash: "sha256:990a41d7b13e904b77c124018e00194881023bc419401da01824ef78129031aa",
    benefitSummary: "₹5,00,000 per family per year cashless health coverage across 27,000+ empanelled hospitals",
    disbursalMethod: "Cashless in-hospital paperless electronic claim settlement",
    deadline: "Perpetual entitlement",
    officialPortalUrl: "https://beneficiary.nha.gov.in",
    portalName: "Ayushman Bharat BIS 2.0 Portal",
    fee: "₹0 (PVC Golden Card free of cost at CSC / hospitals)",
    gazetteClause: {
      section: "Section 1.4 — Secondary & Tertiary Care Health Entitlement",
      page: "Gazette Notification No. 341, Clause 1.4",
      rawText: "1.4. The Scheme provides an entitlement-based cashless cover of up to INR 5,00,000 per family per annum on a family floater basis for secondary and tertiary hospitalization care across all public hospitals and empanelled private healthcare providers throughout the territory of India without any pre-existing condition exclusions.",
      highlights: [
        { text: "cashless cover of up to INR 5,00,000 per family per annum", type: "benefit" },
        { text: "without any pre-existing condition exclusions", type: "condition" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-pmjay-income",
        name: "Vulnerability / Low Income Criteria",
        threshold: "Belongs to SECC 2011 depository or active state BPL/Anthyodaya card",
        userValue: "Annual Income < ₹2.5 Lakh",
        status: "PASS",
        details: "Matches state low-income registry"
      }
    ],
    requiredDocuments: [
      {
        name: "Ration Card / Food Security Card",
        mandatory: true,
        issuer: "Food & Civil Supplies Department",
        purpose: "Validates household composition for floater coverage"
      },
      {
        name: "Aadhaar Card of all Family Members",
        mandatory: true,
        issuer: "UIDAI",
        purpose: "Biometric authentication at hospital desk"
      }
    ]
  },
  {
    id: "pm-svanidhi",
    title: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    kannadaTitle: "ಪಿಎಂ ಸ್ವನಿಧಿ ಬೀದಿ ಬದಿ ವ್ಯಾಪಾರಿಗಳ ಕಿರುಸಾಲ ಯೋಜನೆ",
    hindiTitle: "पीएम स्वनिधि स्ट्रीट वेंडर आत्मनिर्भर निधि",
    ministry: "Ministry of Housing and Urban Affairs (MoHUA), Govt of India",
    level: "Central",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Small Business"],
    incomeLimit: 500000,
    matchScore: 95,
    isTopPick: false,
    citation: "Gazette Notification No. K-12015/01/2020-UPA-II",
    officialDocRef: "Operational Guidelines of PM SVANidhi, MoHUA Gazette Notification 2020",
    docHash: "sha256:3a918b871c990234a1b029384758ac0192837465bb9102938475610293847123",
    benefitSummary: "Collateral-free working capital micro-credit: 1st tranche ₹10,000, 2nd tranche ₹20,000, 3rd tranche ₹50,000 with 7% interest subsidy & cashback",
    disbursalMethod: "Direct electronic credit into vendor bank account via SIDBI portal",
    deadline: "Open enrollment across all urban local bodies",
    officialPortalUrl: "https://pmsvanidhi.mohua.gov.in",
    portalName: "PM SVANidhi Urban Portal",
    fee: "₹0 (Zero processing charges)",
    gazetteClause: {
      section: "Section 2.1 — Target Beneficiary & Working Capital Tranche",
      page: "Operational Guidelines, Gazette Page 5",
      rawText: "2.1. The Scheme is available to all street vendors, hawkers, thelewala, and micro-entrepreneurs engaged in vending in urban areas. Beneficiaries are eligible for an initial collateral-free working capital loan of up to ₹10,000 with 7% interest subvention credited directly to their accounts on timely repayment.",
      highlights: [
        { text: "all street vendors, hawkers, and micro-entrepreneurs engaged in vending", type: "vendor" },
        { text: "initial collateral-free working capital loan of up to ₹10,000", type: "benefit" },
        { text: "7% interest subvention credited directly", type: "subsidy" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-svanidhi-occ",
        name: "Micro-Business / Vending Certificate",
        threshold: "Engaged in street vending / urban micro-enterprise",
        userValue: "Small Business / Street Vendor",
        status: "PASS",
        details: "Certificate of Vending (CoV) / Identity Card issued by ULB"
      },
      {
        id: "rule-svanidhi-income",
        name: "Annual Income Criteria",
        threshold: "Micro-enterprise annual turnover / income ≤ ₹5,00,000",
        userValue: "Within threshold",
        status: "PASS",
        details: "Eligible for 7% interest subvention and digital transaction cashback"
      }
    ],
    requiredDocuments: [
      {
        name: "Vending Certificate / Urban Local Body ID Card",
        mandatory: true,
        issuer: "Town Vending Committee (TVC) / Municipal Corporation",
        purpose: "Verifies registered urban street vendor status"
      },
      {
        name: "Aadhaar Card & Bank Account Passbook",
        mandatory: true,
        issuer: "UIDAI / Commercial Bank",
        purpose: "KYC verification and direct micro-loan disbursement"
      }
    ]
  },
  {
    id: "maharashtra-mahadbt",
    title: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti",
    kannadaTitle: "ಮಹಾರಾಷ್ಟ್ರ ರಾಜರ್ಷಿ ಶಾಹು ಮಹಾರಾಜ್ ಉನ್ನತ ಶಿಕ್ಷಣ ಶುಲ್ಕ ಮರುಪಾವತಿ",
    hindiTitle: "महाराष्ट्र राजर्षि छत्रपति शाहू महाराज शिक्षण शुल्क छात्रवृत्ति",
    ministry: "Department of Higher & Technical Education, Govt of Maharashtra",
    level: "State (Maharashtra)",
    state: "Maharashtra",
    sector: "Education",
    categoryTarget: ["General", "OBC", "EWS"],
    occupationTarget: ["Student"],
    incomeLimit: 800000,
    matchScore: 92,
    isTopPick: false,
    citation: "Maharashtra Govt Resolution No. TEM-2018/CR.297/TE-4",
    officialDocRef: "Govt of Maharashtra Gazette Extraordinaire GR No. TEM-2018",
    docHash: "sha256:5b719a8264e1902837bc901e12739b8fa018471bcca1172849e018a716c29184",
    benefitSummary: "50% to 100% tuition and exam fee reimbursement for higher professional & technical courses",
    disbursalMethod: "Direct PFMS credit to college and student Aadhaar-linked accounts",
    deadline: "31st January 2026",
    officialPortalUrl: "https://mahadbt.maharashtra.gov.in",
    portalName: "MahaDBT Portal",
    fee: "₹0",
    gazetteClause: {
      section: "Section 3.1 — Domicile & Income Criteria for Higher Education",
      page: "GR No. TEM-2018, Clause 3",
      rawText: "3.1. Candidates possessing bona fide domicile of Maharashtra State whose family annual income is not more than INR 8,00,000/- shall be entitled to 50% tuition and examination fee concession in approved government-aided and unaided technical colleges.",
      highlights: [
        { text: "domicile of Maharashtra State", type: "domicile" },
        { text: "not more than INR 8,00,000/-", type: "income" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-maha-domicile",
        name: "Maharashtra Domicile Requirement",
        threshold: "Bona fide permanent resident of Maharashtra State",
        userValue: "State Residence",
        status: "PASS",
        details: "Verified via Maharashtra Revenue Department domicile certificate"
      },
      {
        id: "rule-maha-income",
        name: "Family Income Ceiling",
        threshold: "Annual family gross income ≤ ₹8,00,000",
        userValue: "Within threshold",
        status: "PASS",
        details: "Qualifies under Maharashtra Tahsildar income certificate guidelines"
      }
    ],
    requiredDocuments: [
      {
        name: "Maharashtra State Domicile Certificate",
        mandatory: true,
        issuer: "Competent Revenue Authority (Tahsildar / SDO)",
        purpose: "Validates state domicile status"
      },
      {
        name: "Income Certificate (Current Financial Year)",
        mandatory: true,
        issuer: "Tahsildar / Revenue Department",
        purpose: "Validates income ≤ ₹8 Lakhs"
      }
    ]
  },
  {
    id: "delhi-ladli",
    title: "Delhi Higher Education and Skill Development Guarantee Scheme",
    kannadaTitle: "ದೆಹಲಿ ಉನ್ನತ ಶಿಕ್ಷಣ ಮತ್ತು ಕೌಶಲ್ಯ ಸಾಲ ಖಾತರಿ ಯೋಜನೆ",
    hindiTitle: "दिल्ली उच्च शिक्षा एवं कौशल विकास गारंटी योजना",
    ministry: "Department of Higher Education, Govt of NCT of Delhi",
    level: "State (Delhi)",
    state: "Delhi",
    sector: "Education",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Student"],
    incomeLimit: 9999999,
    matchScore: 90,
    isTopPick: false,
    citation: "Delhi Govt Gazette Notification F.No.12(1)/2015/HE/2372",
    officialDocRef: "Delhi Gazette Extraordinary Part IV, Notification 2372",
    docHash: "sha256:7c82910384758ac0192837465bb9102938475610293847123a1b029384758a01",
    benefitSummary: "100% Delhi Govt credit guarantee for educational loans up to ₹10 Lakhs without third-party collateral",
    disbursalMethod: "Direct bank loan sanction through Delhi Higher Education Trust",
    deadline: "Open throughout the academic session",
    officialPortalUrl: "https://higheredn.delhi.gov.in",
    portalName: "Delhi e-District Higher Education Portal",
    fee: "₹0",
    gazetteClause: {
      section: "Section 4.1 — Sovereign Credit Guarantee for Delhi Students",
      page: "Delhi Gazette Notification No. 2372, Clause 4",
      rawText: "4.1. Students who have completed 10th and 12th standard from schools located within the NCT of Delhi are eligible for education loans up to INR 10 Lakhs with 100% state credit guarantee without requiring collateral security or margin money.",
      highlights: [
        { text: "schools located within the NCT of Delhi", type: "domicile" },
        { text: "education loans up to INR 10 Lakhs with 100% state credit guarantee", type: "benefit" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-delhi-schooling",
        name: "Delhi Schooling / Residence Criteria",
        threshold: "Passed 10th / 12th standard schooling from NCT of Delhi",
        userValue: "Delhi Student",
        status: "PASS",
        details: "CBSE / State board certificate issued in NCT of Delhi"
      }
    ],
    requiredDocuments: [
      {
        name: "10th & 12th Marksheets from Delhi School",
        mandatory: true,
        issuer: "CBSE / Recognized Board in Delhi",
        purpose: "Validates local schooling eligibility"
      },
      {
        name: "Admission Letter in UGC/AICTE Accredited College",
        mandatory: true,
        issuer: "Recognized Higher Education Institution",
        purpose: "Course fee sanction authentication"
      }
    ]
  },
  {
    id: "tamilnadu-pudhumai-penn",
    title: "Tamil Nadu Moovalur Ramamirtham Ammaiyar Scheme (Pudhumai Penn)",
    kannadaTitle: "ತಮಿಳುನಾಡು ಪುದುಮೈ ಪೆಣ್ ಉನ್ನತ ಶಿಕ್ಷಣ ಯೋಜನೆ",
    hindiTitle: "तमिलनाडु पुधुमई पेन उच्च शिक्षा प्रोत्साहन योजना",
    ministry: "Social Welfare and Women Empowerment Department, Govt of Tamil Nadu",
    level: "State (Tamil Nadu)",
    state: "Tamil Nadu",
    sector: "Education",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Student"],
    incomeLimit: 9999999,
    matchScore: 91,
    isTopPick: false,
    citation: "Govt of Tamil Nadu G.O. (Ms) No. 37, Social Welfare Dept",
    officialDocRef: "Tamil Nadu Government Gazette Extraordinary Part II Sec 1",
    docHash: "sha256:912384758ac0192837465bb91029384756102938471233a918b871c990234a1b",
    benefitSummary: "₹1,000 every month direct cash incentive into student's bank account until completion of degree",
    disbursalMethod: "Direct monthly Aadhaar-enabled DBT bank transfer",
    deadline: "Annual enrollment in July - September",
    officialPortalUrl: "https://pudhumaipenn.tn.gov.in",
    portalName: "Pudhumai Penn TN Portal",
    fee: "₹0",
    gazetteClause: {
      section: "Section 2.1 — Government School Girl Students Higher Education Incentive",
      page: "Tamil Nadu Gazette Notification G.O. No. 37",
      rawText: "2.1. Girl students who studied from Classes 6 to 12 in Government schools of Tamil Nadu and enrol in undergraduate degree, diploma, or ITI programs shall receive INR 1,000 per month into their bank accounts to eliminate dropouts.",
      highlights: [
        { text: "Classes 6 to 12 in Government schools of Tamil Nadu", type: "domicile" },
        { text: "INR 1,000 per month into their bank accounts", type: "benefit" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-tn-school",
        name: "Tamil Nadu Govt Schooling Criteria",
        threshold: "Studied 6th to 12th standard in Tamil Nadu Govt schools",
        userValue: "State Scholar",
        status: "PASS",
        details: "Verified via EMIS database of School Education Department"
      }
    ],
    requiredDocuments: [
      {
        name: "TN EMIS Transfer Certificate / School Bonafide",
        mandatory: true,
        issuer: "School Education Department, Tamil Nadu",
        purpose: "Validates 6th to 12th Govt school attendance"
      },
      {
        name: "Aadhaar Linked Savings Bank Account Passbook",
        mandatory: true,
        issuer: "Nationalized Bank",
        purpose: "DBT monthly transfer of ₹1,000 stipend"
      }
    ]
  },
  {
    id: "up-kanya-sumangala",
    title: "Mukhyamantri Kanya Sumangala Yojana",
    kannadaTitle: "ಉತ್ತರ ಪ್ರದೇಶ ಮುಖ್ಯಮಂತ್ರಿ ಕನ್ಯಾ ಸುಮಂಗಲಾ ಯೋಜನೆ",
    hindiTitle: "उत्तर प्रदेश मुख्यमंत्री कन्या सुमंगला योजना",
    ministry: "Women and Child Development Department, Govt of Uttar Pradesh",
    level: "State (Uttar Pradesh)",
    state: "Uttar Pradesh",
    sector: "Social Security",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Student", "Unemployed"],
    incomeLimit: 300000,
    matchScore: 89,
    isTopPick: false,
    citation: "UP Gazette Notification No. 112/2019/60-1-2019",
    officialDocRef: "Uttar Pradesh Gazette Extraordinary Notification 112",
    docHash: "sha256:4a818b871c990234a1b029384758ac0192837465bb9102938475610293847999",
    benefitSummary: "Cumulative financial grant of ₹25,000 in 6 graded milestones from birth to higher education graduation",
    disbursalMethod: "Direct PFMS credit to beneficiary mother/student account",
    deadline: "Ongoing rolling applications on mksy portal",
    officialPortalUrl: "https://mksy.up.gov.in",
    portalName: "MKSY UP Portal",
    fee: "₹0",
    gazetteClause: {
      section: "Section 3.2 — Family Income & Milestone Disbursal",
      page: "UP Gazette Notification 112, Clause 3",
      rawText: "3.2. Permanent residents of Uttar Pradesh whose total family annual income does not exceed INR 3,00,000/- shall be extended cash grants across six developmental milestones, including ₹7,000 on taking admission into undergraduate degree/diploma courses.",
      highlights: [
        { text: "Permanent residents of Uttar Pradesh", type: "domicile" },
        { text: "family annual income does not exceed INR 3,00,000/-", type: "income" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-up-domicile",
        name: "Uttar Pradesh Domicile & Income",
        threshold: "Resident of Uttar Pradesh with annual income ≤ ₹3,00,000",
        userValue: "Resident Criteria",
        status: "PASS",
        details: "Requires UP Nivas Praman Patra & Revenue income certificate"
      }
    ],
    requiredDocuments: [
      {
        name: "UP Nivas Praman Patra (Domicile Certificate)",
        mandatory: true,
        issuer: "Revenue Department, Govt of UP",
        purpose: "Validates UP permanent residency"
      },
      {
        name: "Income Certificate ≤ ₹3 Lakhs",
        mandatory: true,
        issuer: "Tahsildar / Edistrict UP",
        purpose: "Proves household financial threshold compliance"
      }
    ]
  },
  {
    id: "pm-suraksha-bima",
    title: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    kannadaTitle: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಸುರಕ್ಷಾ ಬಿಮಾ ಯೋಜನೆ",
    hindiTitle: "प्रधानमंत्री सुरक्षा बीमा योजना (PMSBY)",
    ministry: "Department of Financial Services, Ministry of Finance, Govt of India",
    level: "Central",
    state: "All India",
    sector: "Social Security",
    categoryTarget: ["General", "OBC", "SC/ST", "EWS"],
    occupationTarget: ["Student", "Farmer", "Small Business", "Unemployed"],
    incomeLimit: 9999999,
    matchScore: 93,
    isTopPick: false,
    citation: "Ministry of Finance Gazette Notification F.No.14012/01/2015-Ins.II",
    officialDocRef: "Gazette of India Extraordinary Part I Sec 1, May 2015",
    docHash: "sha256:88918b871c990234a1b029384758ac0192837465bb9102938475610293847111",
    benefitSummary: "₹2,00,000 accidental death & permanent disability insurance cover for a nominal premium of ₹20/year",
    disbursalMethod: "Direct electronic claim settlement through participating insurance carriers",
    deadline: "Annual auto-debit on 31st May",
    officialPortalUrl: "https://jansuraksha.gov.in",
    portalName: "Jan Suraksha National Portal",
    fee: "₹20 / year auto-debited",
    gazetteClause: {
      section: "Section 2.1 — Universal Accidental Insurance Coverage",
      page: "Gazette Notification F.No.14012/01/2015, Clause 2",
      rawText: "2.1. All savings bank account holders aged between 18 and 70 years across India are entitled to enroll in the Pradhan Mantri Suraksha Bima Yojana with risk coverage of INR 2 Lakh for accidental death or full disability at an annual premium of INR 20.",
      highlights: [
        { text: "bank account holders aged between 18 and 70 years", type: "eligibility" },
        { text: "risk coverage of INR 2 Lakh for accidental death", type: "benefit" }
      ]
    },
    criteriaRules: [
      {
        id: "rule-pmsby-age",
        name: "Age & Bank Account Criterion",
        threshold: "Age between 18 and 70 years with an active savings bank account",
        userValue: "Adult Citizen",
        status: "PASS",
        details: "Satisfied via Aadhaar KYC and savings account auto-debit consent"
      }
    ],
    requiredDocuments: [
      {
        name: "Bank Passbook with Aadhaar Linking",
        mandatory: true,
        issuer: "Commercial / Regional Rural Bank",
        purpose: "Auto-debit mandate and nominee recording"
      }
    ]
  }
];

export const MOCK_SAMPLE_DOCUMENTS = {
  incomeCert: {
    fileName: "Karnataka_Revenue_Income_Certificate_RD00389281.pdf",
    fileSize: "1.42 MB",
    docType: "Income & Asset Certificate (Form-F)",
    issuingAuthority: "Tahsildar, Bangalore Urban South Taluk, Revenue Dept",
    certNumber: "RD003892819024/2024",
    holderName: "Rahul S. Kumar",
    fatherName: "Suresh M. Kumar",
    annualIncome: "₹1,80,000/- (Rupees One Lakh Eighty Thousand)",
    casteCategory: "Category 2A (OBC)",
    issueDate: "12-May-2024",
    validUntil: "31-Mar-2027",
    digitalSignature: {
      status: "VALID_CRYPTOGRAPHIC_SEAL",
      signer: "Tahsildar (Bangalore South) DSC e-Mudhra Class 3",
      timestamp: "12-05-2024 16:42:19 IST",
      algorithm: "SHA256withRSA 2048-bit"
    },
    aiScanSummary: {
      authenticity: {
        status: "SUCCESS",
        title: "Document Authenticity Verified",
        description: "Official Karnataka Nadakacheri QR cryptographic signature recognized and matched against Karnataka Revenue Public Key Directory."
      },
      expiry: {
        status: "WARNING",
        title: "Certificate Validity Active",
        description: "Valid until March 31, 2027 (Safe to apply — valid for 3 financial years as per Revenue Circular RD 158 ASD 2022)."
      },
      gapWarning: {
        status: "GAP_NOTICE",
        title: "Attention Required: Partial Field Occlusion",
        description: "Candidate name on certificate perfectly matches your profile ('Rahul S. Kumar'), but Father's name field is partially obscured by seal crease. Recommendation: Request clean digital copy from Nadakacheri portal before final submission to avoid desk rejection."
      }
    },
    extractedFields: [
      { label: "Certificate RD Number", value: "RD003892819024", status: "MATCH" },
      { label: "Beneficiary Name", value: "Rahul S. Kumar", status: "MATCH" },
      { label: "Certified Annual Income", value: "₹1,80,000", status: "PASS_THRESHOLD" },
      { label: "Caste Classification", value: "Category 2A (OBC)", status: "ELIGIBLE" },
      { label: "Digital Signature Seal", value: "e-Sign Karnataka Valid", status: "VERIFIED" },
      { label: "Valid Through", value: "31-03-2027 (Active)", status: "OK" }
    ]
  },
  aadhaarCard: {
    fileName: "Aadhaar_Offline_eKYC_XML_Signed.pdf",
    fileSize: "840 KB",
    docType: "UIDAI Masked Aadhaar (e-KYC)",
    issuingAuthority: "Unique Identification Authority of India (UIDAI)",
    certNumber: "XXXXXXXX4920",
    holderName: "Rahul S. Kumar",
    dob: "14-08-2005",
    gender: "Male",
    address: "#42, 3rd Cross, Jayanagar 4th Block, Bangalore 560011, Karnataka",
    digitalSignature: {
      status: "VALID_CRYPTOGRAPHIC_SEAL",
      signer: "UIDAI DSC Master Key 2024",
      timestamp: "04-01-2025 09:12:00 IST",
      algorithm: "SHA256withRSA 4096-bit"
    },
    aiScanSummary: {
      authenticity: {
        status: "SUCCESS",
        title: "UIDAI Tamper-Proof Signature Validated",
        description: "Cryptographic offline XML checksum intact. Photo biometrics match demographic records."
      },
      expiry: {
        status: "SUCCESS",
        title: "Lifetime Validity Active",
        description: "Aadhaar status active in UIDAI Master registry. NPCI mapper shows bank account seeding enabled for DBT."
      },
      gapWarning: {
        status: "OK",
        title: "No Data Mismatches Found",
        description: "Address is firmly within Karnataka domicile jurisdiction (Bangalore Urban). Ready for instant 1-click Seva Sindhu autofill."
      }
    },
    extractedFields: [
      { label: "Masked Aadhaar UID", value: "XXXXXXXX4920", status: "MATCH" },
      { label: "Citizen Name", value: "Rahul S. Kumar", status: "MATCH" },
      { label: "Date of Birth / Age", value: "14-08-2005 (Age 20)", status: "MATCH" },
      { label: "State of Residence", value: "Karnataka (PIN: 560011)", status: "MATCH" },
      { label: "NPCI DBT Seeding", value: "Active (State Bank of India)", status: "VERIFIED" }
    ]
  }
};

/**
 * Dynamically computes scheme eligibility, match score, and tailored criteria rules
 * based on the citizen's actual profile.
 */
export function evaluateSchemeMatch(scheme, profile) {
  if (!profile) return scheme;

  let score = 90;
  let statusDomicile = "PASS";
  let statusOcc = "PASS";
  let statusIncome = "PASS";
  let statusCat = "PASS";

  // 1. Domicile / State check
  const isStateSpecific = scheme.level.includes("State") || (scheme.state && scheme.state !== "All India");
  if (isStateSpecific) {
    const schemeState = scheme.state || (scheme.level.includes("Karnataka") ? "Karnataka" : scheme.level.includes("Maharashtra") ? "Maharashtra" : scheme.level.includes("Delhi") ? "Delhi" : scheme.level.includes("Tamil Nadu") ? "Tamil Nadu" : scheme.level.includes("Uttar Pradesh") ? "Uttar Pradesh" : "");
    if (profile.state === schemeState) {
      score += 8;
      statusDomicile = "PASS";
    } else {
      score -= 52;
      statusDomicile = "FAIL";
    }
  } else {
    // Central schemes match all states
    score += 4;
    statusDomicile = "PASS";
  }

  // 2. Occupation check
  const occMatches = scheme.occupationTarget && scheme.occupationTarget.includes(profile.occupation);
  if (occMatches) {
    score += 6;
    statusOcc = "PASS";
  } else {
    score -= 38;
    statusOcc = "FAIL";
  }

  // 3. Income check
  let userNumericIncome = 200000;
  if (profile.incomeBracket === "< ₹1.5 Lakh") userNumericIncome = 120000;
  else if (profile.incomeBracket === "₹1.5L - ₹2.5L") userNumericIncome = 200000;
  else if (profile.incomeBracket === "₹2.5L - ₹5L") userNumericIncome = 350000;
  else if (profile.incomeBracket === "> ₹5L") userNumericIncome = 650000;

  if (scheme.incomeLimit && userNumericIncome > scheme.incomeLimit) {
    score -= 28;
    statusIncome = "FAIL";
  } else {
    score += 2;
    statusIncome = "PASS";
  }

  // 4. Category check
  const catMatches = scheme.categoryTarget && scheme.categoryTarget.includes(profile.category);
  if (catMatches) {
    score += 2;
    statusCat = "PASS";
  } else {
    score -= 16;
    statusCat = "WARN";
  }

  const finalScore = Math.max(20, Math.min(99, score));

  // Dynamically update criteria rules to reflect user's current profile values
  const dynamicRules = (scheme.criteriaRules || []).map((rule) => {
    if (rule.id && (rule.id.includes("domicile") || rule.id.includes("yuva-domicile") || rule.id.includes("maha-domicile") || rule.id.includes("delhi-schooling") || rule.id.includes("tn-school") || rule.id.includes("up-domicile"))) {
      return {
        ...rule,
        userValue: `${profile.state} (${profile.domicile || 'Resident'})`,
        status: statusDomicile,
        details: statusDomicile === "PASS"
          ? `Verified against ${profile.state} gazette residency criteria`
          : `Requires ${scheme.level} residency. Citizen is registered in ${profile.state}.`
      };
    }
    if (rule.id && (rule.id.includes("income") || rule.id.includes("pmjay-income") || rule.id.includes("vidya-income") || rule.id.includes("svanidhi-income") || rule.id.includes("maha-income") || rule.id.includes("up-domicile"))) {
      return {
        ...rule,
        userValue: `${profile.incomeBracket} per annum`,
        status: statusIncome,
        details: statusIncome === "PASS"
          ? `Income satisfies statutory ceiling (Limit: ₹${(scheme.incomeLimit / 100000).toFixed(1)}L)`
          : `Exceeds the gazette ceiling limit of ₹${(scheme.incomeLimit / 100000).toFixed(1)}L`
      };
    }
    if (rule.id && (rule.id.includes("academic") || rule.id.includes("nats-work") || rule.id.includes("kisan-land") || rule.id.includes("svanidhi-occ") || rule.id.includes("yuva-age") || rule.id.includes("pmsby-age"))) {
      return {
        ...rule,
        userValue: `${profile.occupation} (Age ${profile.age})`,
        status: statusOcc,
        details: statusOcc === "PASS"
          ? `Matches target beneficiary group: ${profile.occupation}`
          : `Scheme prioritizes ${scheme.occupationTarget.join(" / ")}. Current: ${profile.occupation}.`
      };
    }
    if (rule.id && rule.id.includes("category")) {
      return {
        ...rule,
        userValue: `${profile.category} Category`,
        status: statusCat,
        details: statusCat === "PASS"
          ? `Category ${profile.category} covered under statutory reservation`
          : `Category ${profile.category} is not in target list for this specific reservation`
      };
    }
    return rule;
  });

  return {
    ...scheme,
    matchScore: finalScore,
    criteriaRules: dynamicRules
  };
}

export const UI_TRANSLATIONS = {
  en: {
    appName: "AdhikarAI",
    tagline: "Citizen Welfare & Rights Intelligence",
    heroHeadline: "Find and verify government schemes you actually qualify for in seconds",
    heroSubhead: "Powered by RAG policy extraction over 450+ official Central & State Gazettes. Upload your certificates to audit eligibility and eliminate desk rejections before applying.",
    btnFind: "Find Schemes I Qualify For",
    btnBrowse: "Browse All Schemes",
    trustSd16: "SDG 16 Aligned",
    trustSd16Sub: "Transparent Citizen Rights",
    trustPrivacy: "100% Zero-LLM PII Logging",
    trustPrivacySub: "Local Enclave Document Auditing",
    trustGazette: "100% Official Gazette Citations",
    trustGazetteSub: "Zero Hallucination Guarantee",
    step1Title: "Discover",
    step2Title: "Matched Schemes",
    step3Title: "Document Doctor",
    completeProfile: "Complete Profile",
    profileCompleted: "Profile Setup",
    editProfile: "Edit Profile",
    browseAllTab: "Browse All Schemes (All-India)",
    matchedTab: "Personalized for You",
    login: "Log In",
    signup: "Sign Up",
    logout: "Log Out",
    username: "Username",
    password: "Password",
    resetDemo: "Reset Demo",
    filterAll: "All Schemes",
    filterCentral: "Central Govt",
    filterState: "State Schemes",
    matchScore: "Match",
    verifyAction: "Verify Documents & Prepare Application",
    simulatingRAG: "Parsing official policy clauses...",
    simulatingRAGSub: "Vector search over Karnataka Gazette Extraordinaire & Central Gazette Repository"
  },
  kn: {
    appName: "ಅಧಿಕಾರ್AI",
    tagline: "ನಾಗರಿಕ ಕಲ್ಯಾಣ ಮತ್ತು ಹಕ್ಕುಗಳ ಗುಪ್ತಚರ ವೇದಿಕೆ",
    heroHeadline: "ನೀವು ನಿಜವಾಗಿಯೂ ಅರ್ಹತೆ ಹೊಂದಿರುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಕ್ಷಣಾರ್ಧದಲ್ಲಿ ಹುಡುಕಿ ಪರಿಶೀಲಿಸಿ",
    heroSubhead: "ಅಧಿಕೃತ ರಾಜ್ಯ ಮತ್ತು ಕೇಂದ್ರ ಗೆಜೆಟ್‌ಗಳಿಂದ RAG ಮೂಲಕ ನೇರ ನಿಯಮ ಹೊರತೆಗೆಯುವಿಕೆ. ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮುನ್ನ ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು AI ಮೂಲಕ ಪರಿಶೀಲಿಸಿ.",
    btnFind: "ನನ್ನ ಅರ್ಹತಾ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",
    btnBrowse: "ಎಲ್ಲಾ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    trustSd16: "SDG 16 ಕಲ್ಯಾಣ ಗುರಿ",
    trustSd16Sub: "ಪಾರದರ್ಶಕ ನಾಗರಿಕ ಹಕ್ಕುಗಳು",
    trustPrivacy: "100% ಡೇಟಾ ಗೌಪ್ಯತೆ",
    trustPrivacySub: "ಖಾಸಗಿ ದಾಖಲೆ ರಕ್ಷಣೆ",
    trustGazette: "100% ಅಧಿಕೃತ ಗೆಜೆಟ್ ಉಲ್ಲೇಖ",
    trustGazetteSub: "ನಿಖರವಾದ ನಿಯಮ ಆಧಾರಿತ",
    step1Title: "ಅನ್ವೇಷಣೆ",
    step2Title: "ಅರ್ಹ ಯೋಜನೆಗಳು",
    step3Title: "ಡಾಕ್ಯುಮೆಂಟ್ ಡಾಕ್ಟರ್",
    completeProfile: "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ",
    profileCompleted: "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಂಡಿದೆ",
    editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    browseAllTab: "ಎಲ್ಲಾ ಭಾರತೀಯ ಯೋಜನೆಗಳು",
    matchedTab: "ನಿಮ್ಮ ಅರ್ಹತಾ ಯೋಜನೆಗಳು",
    login: "ಲಾಗಿನ್",
    signup: "ಸೈನ್ ಅಪ್",
    logout: "ಲಾಗ್‌ಔಟ್",
    username: "ಬಳಕೆದಾರ ಹೆಸರು",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    resetDemo: "ಮರುಹೊಂದಿಸಿ (Reset)",
    filterAll: "ಎಲ್ಲಾ ಯೋಜನೆಗಳು",
    filterCentral: "ಕೇಂದ್ರ ಸರ್ಕಾರ",
    filterState: "ರಾಜ್ಯ ಯೋಜನೆಗಳು",
    matchScore: "ಹೊಂದಾಣಿಕೆ",
    verifyAction: "ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅರ್ಜಿ ಸಿದ್ಧಪಡಿಸಿ",
    simulatingRAG: "ಅಧಿಕೃತ ಗೆಜೆಟ್ ನಿಯಮಗಳನ್ನು ಪಾರ್ಸ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    simulatingRAGSub: "ಕರ್ನಾಟಕ ಗೆಜೆಟ್ ಮತ್ತು ಕೇಂದ್ರ ಅಧಿಸೂಚನೆಗಳ ವೆಕ್ಟರ್ ಹುಡುಕಾಟ"
  },
  hi: {
    appName: "अधिकारAI",
    tagline: "नागरिक कल्याण एवं अधिकार इंटेलिजेंस",
    heroHeadline: "उन सरकारी योजनाओं को सेकंडों में खोजें और सत्यापित करें जिनके आप वास्तव में पात्र हैं",
    heroSubhead: "450+ आधिकारिक केंद्र व राज्य राजपत्रों से RAG आधारित नीति निष्कर्षण। आवेदन करने से पहले अपने दस्तावेजों की जांच करें और अस्वीकृति से बचें।",
    btnFind: "मेरी पात्रता वाली योजनाएं खोजें",
    btnBrowse: "सभी योजनाएं देखें",
    trustSd16: "SDG 16 समर्थित",
    trustSd16Sub: "पारदर्शी नागरिक अधिकार",
    trustPrivacy: "100% डेटा गोपनीयता",
    trustPrivacySub: "शून्य PII लॉगिंग एन्क्लेव",
    trustGazette: "100% आधिकारिक राजपत्र संदर्भ",
    trustGazetteSub: "शून्य भ्रम गारंटी",
    step1Title: "अन्वेषण",
    step2Title: "पात्र योजनाएं",
    step3Title: "डॉक्यूमेंट डॉक्टर",
    completeProfile: "प्रोफ़ाइल पूरी करें",
    profileCompleted: "प्रोफ़ाइल पूर्ण",
    editProfile: "प्रोफ़ाइल संपादित करें",
    browseAllTab: "अखिल भारतीय योजना निर्देशिका",
    matchedTab: "आपके लिए व्यक्तिगत",
    login: "लॉग इन",
    signup: "साइन अप",
    logout: "लॉग आउट",
    username: "यूज़रनेम",
    password: "पासवर्ड",
    resetDemo: "डेमो रीसेट करें",
    filterAll: "सभी योजनाएं",
    filterCentral: "केंद्र सरकार",
    filterState: "राज्य योजनाएं",
    matchScore: "मैच",
    verifyAction: "दस्तावेज सत्यापित करें और आवेदन तैयार करें",
    simulatingRAG: "आधिकारिक राजपत्र खंडों का विश्लेषण हो रहा है...",
    simulatingRAGSub: "कर्नाटक असाधारण राजपत्र एवं केंद्रीय रिपोजिटरी में वेक्टर खोज"
  }
};
