import { Experience, Project, SkillMetric, Education, Certification, TechItem } from './types';

export const RESUME_CONTEXT = `
Gaurav Mahale is an AI Product Manager with a strong background in Credit Risk & Lending.
Education: PGPM from IIM Sirmaur (2015-2017), B.E. from University of Pune (2010-2014).
Current Role: AI Trainer at Pareto.AI (Dec 2025 - Present), training LLMs on financial modeling.
Previous Roles:
- Relationship Manager at Yes Bank (Apr 2022 - Present): Managed corporate lending portfolios worth 500 Cr.
- Portfolio Manager at HDFC Bank (Jan 2020 - Apr 2022): Minimised delinquency risk using predictive analytics.
- Operations Manager at Suraksha ARC (Sep 2017 - Jan 2020): NPA account resolution.
- Consultant at Tata Trusts (May 2017 - Sep 2017).
Key Skills: AI Product/MVP Development, Credit Analysis, SQL, Google Analytics, Gemini API, Claude, Python.
Projects:
1. AI Persona interaction platform: 500 monthly users, used Gemini/Claude/Supabase.
2. Credit Memo and FS Generation using AI: Full-stack platform for generating credit memos from annual reports using Gemini/Groq.
Certifications: IBM AI Product Management, HelloPM, Figma Essentials.
Location: Pune, India.
Contact: mahalegauravk@gmail.com.
`;

export const EXPERIENCES: Experience[] = [
  {
    role: "AI Trainer",
    company: "Pareto.AI",
    period: "Dec 25 - Present",
    type: 'AI',
    description: [
      "Training LLMs on financial modeling, Doc and PPT generation.",
      "Evaluated and improved AI outputs for credit analysis and projections.",
      "Applied banking domain expertise to enhance AI model accuracy."
    ]
  },
  {
    role: "Relationship Manager",
    company: "Yes Bank Limited",
    period: "Apr 22 - Present",
    type: 'Finance',
    description: [
      "Managed corporate lending portfolios worth ₹500 Cr.",
      "Generated income of ~₹2.5 Cr/year from corporate clients.",
      "Prepared credit appraisal memos and term sheets for leadership decisions."
    ]
  },
  {
    role: "Portfolio Manager",
    company: "HDFC Bank Limited",
    period: "Jan 20 - Apr 22",
    type: 'Finance',
    description: [
      "Designed solutions to minimise delinquency risk using predictive analytics.",
      "Used PowerBI/Excel to track default probabilities.",
      "Co-created restructuring product flows for stressed assets."
    ]
  },
  {
    role: "Operations Manager",
    company: "Suraksha ARC",
    period: "Sep 17 - Jan 20",
    type: 'Operations',
    description: [
      "Analysed financial health of NPA accounts.",
      "Assisted in acquiring accounts with debt of ~₹9000 Cr under IBC.",
      "Conducted due diligence for cases > ₹50 Cr."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Credit Memo & FS Gen AI",
    date: "Dec 2025",
    description: "Full-stack AI platform generating comprehensive credit memos from annual reports. Includes financial data extraction and ratio calculations.",
    tech: ["Python", "Gemini API", "Groq", "Claude", "Financial Analysis"],
    metrics: "Automated Memo Gen"
  },
  {
    title: "AI Persona Platform",
    date: "Oct 2025",
    description: "Platform enabling users to interact with AI personas (real or imagined) with consistent tone and identity.",
    tech: ["Next.js", "Supabase", "Gemini API", "Vercel", "A/B Testing"],
    metrics: "500 MAU",
    link: "#"
  }
];

export const SKILL_DATA: SkillMetric[] = [
  { subject: 'AI/LLM Ops', A: 90, fullMark: 100 },
  { subject: 'Credit Risk', A: 95, fullMark: 100 },
  { subject: 'Product Mgmt', A: 85, fullMark: 100 },
  { subject: 'Python/SQL', A: 75, fullMark: 100 },
  { subject: 'Financial Modeling', A: 90, fullMark: 100 },
  { subject: 'UI/UX (Figma)', A: 70, fullMark: 100 },
];

export const STOCK_TICKER_ITEMS = [
  "GMHL: $1,240.50 (+12.4%)",
  "MKT CAP: HIGH VALUE",
  "RATING: STRONG BUY",
  "SECTOR: FINTECH + AI",
  "EXP: 8+ YEARS",
  "LOC: PUNE, IN"
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: "IIM Sirmaur",
    degree: "PGPM (Post Graduate Programme in Management)",
    year: "2015 - 2017",
    id: "EDU-01"
  },
  {
    institution: "University of Pune",
    degree: "Bachelor of Engineering (B.E.)",
    year: "2010 - 2014",
    id: "EDU-02"
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: "AI Product Management",
    issuer: "IBM",
    year: "2024",
    id: "CRT-01"
  },
  {
    name: "Product Management Cert.",
    issuer: "HelloPM",
    year: "2023",
    id: "CRT-02"
  },
  {
    name: "Figma Essentials",
    issuer: "Self-Paced",
    year: "2023",
    id: "CRT-03"
  }
];

export const TECH_STACK: TechItem[] = [
  { id: "PYTH", name: "Python", category: "Backend", price: "98.45", change: "+2.4%" },
  { id: "SQL", name: "SQL / DB", category: "Data", price: "88.20", change: "+1.1%" },
  { id: "GEM", name: "Gemini API", category: "AI Ops", price: "142.10", change: "+15.3%" },
  { id: "CLD", name: "Claude AI", category: "AI Ops", price: "135.50", change: "+12.1%" },
  { id: "FIG", name: "Figma", category: "Design", price: "76.30", change: "+0.5%" },
  { id: "GAN", name: "Google Analytics", category: "Growth", price: "92.10", change: "+3.2%" },
  { id: "PBI", name: "PowerBI", category: "Analytics", price: "101.00", change: "+4.5%" },
  { id: "EXCL", name: "Adv Excel", category: "Finance", price: "112.50", change: "+0.2%" }
];