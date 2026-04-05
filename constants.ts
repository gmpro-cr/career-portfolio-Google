import { Experience, Project, SkillMetric, Education, Certification, TechItem } from './types';

export const RESUME_CONTEXT = `
Gaurav Mahale is an AI Builder & Credit Domain Expert, operating at the intersection of Fintech Products, LLM Evals, and Corporate Lending.
Location: Pune, India. Open to hybrid/remote roles. Contact: mahalegauravk@gmail.com
Headline: AI Builder & Credit Domain Expert | Fintech Products · LLM Evals · Corporate Lending | Open to AI PM Roles

About:
Building AI products. Understanding credit the way most AI builders never will.
8+ years across Yes Bank, HDFC Bank, and Suraksha ARC — managing ₹500 Cr+ lending portfolios, resolving distressed assets worth ₹9,000 Cr under IBC, sitting across the table from CFOs and credit committees. That domain depth now powers a different kind of work: building the tools that the industry still lacks.

The edge here is not just technical. Credit analysts at 11pm before a credit committee meeting have a very specific set of needs. Relationship managers managing covenant-breaching borrowers face a very specific kind of pressure. That domain knowledge — combined with the ability to build and ship working products — is the combination brought to an AI PM role in fintech.

Currently exploring AI Product Manager opportunities in fintech, credit-tech, lending automation, and RegTech.
`;

export const EXPERIENCES: Experience[] = [
  {
    role: "Assistant Vice President, Corporate Relationship Management",
    company: "Yes Bank Limited",
    period: "Apr 2022 - Present",
    type: 'Finance',
    description: [
      "Managed end-to-end corporate lending relationships across a ₹500 Cr+ book — from client discovery and credit structuring through disbursement, monitoring, and renewal",
      "Conducted structured discovery conversations with CFOs, MDs, and Finance Controllers to understand working capital gaps and banking pain points",
      "Proposed customised product bundles combining term loans, cash credit, and trade finance (solution design across multiple product lines)",
      "Ran a full client acquisition funnel annually mapping to ~4 new corporate accounts per year",
      "Prepared detailed credit appraisal memos and term sheets synthesising financial statements, industry analysis, and management assessment",
      "Owned the narrative layer of every credit decision, translating raw financials into a clear risk-reward story for credit committees",
      "Coordinated multi-stakeholder delivery using RACI frameworks across credit approvers, legal, operations, and compliance",
      "Generated ~₹2.5 Cr/year in fee and interest income through new client acquisition and portfolio deepening"
    ]
  },
  {
    role: "Portfolio Manager, Corporate Credit",
    company: "HDFC Bank Limited",
    period: "Jan 2020 - Apr 2022",
    type: 'Finance',
    description: [
      "Built and maintained PowerBI and Excel dashboards to track default probabilities, covenant compliance, and portfolio health metrics",
      "Designed early warning system (EWS) frameworks to proactively flag delinquency risk — defining the trigger logic, data inputs, and escalation",
      "Co-created restructuring product flows for stressed borrowers by analysing actual repayment behaviour and cash conversion cycles",
      "Identified gaps in the existing monitoring process and proposed improvements to the review cadence and reporting format",
      "Reduced NPA formation in managed accounts through proactive restructuring interventions triggered by early warning signals",
      "Improved portfolio visibility for the Maharashtra & Goa region through standardised dashboards adopted across the team"
    ]
  },
  {
    role: "Operations Manager, NPA Resolution & Acquisitions",
    company: "Suraksha Asset Reconstruction Ltd.",
    period: "Sep 2017 - Jan 2020",
    type: 'Operations',
    description: [
      "Evaluated financial health, recovery potential, and asset quality of NPA accounts offered for sale by banks including SBI, HDFC, and ICICI",
      "Conducted end-to-end due diligence on cases with ticket sizes exceeding ₹50 Cr — covering financial analysis, legal, and operational assessment",
      "Supported full acquisition of a distressed account with ~₹9,000 Cr total debt under the IBC framework",
      "Monitored day-to-day operations of real estate cases under ARC structure tracking labour counts, construction costs, and sales data",
      "Identified inefficiencies in the MIS entry system and redesigned the workflow, accelerating turnaround time significantly",
      "Led the Maharashtra region from last position to top 9 in IHHL targets within 2 months through process redesign"
    ]
  },
  {
    role: "AI Trainer (Part-Time)",
    company: "Pareto.AI",
    period: "Dec 2025 - Present",
    type: 'AI',
    description: [
      "Evaluating and training large language models on complex financial tasks — applying 8+ years of banking domain expertise",
      "Designing and evaluating prompts for LLMs on high-complexity financial tasks: credit memos, 3-statement financial models, and structured lending docs",
      "Building evaluation frameworks (evals) that stress-test model outputs against real banking workflows to surface failure modes",
      "Applying RLHF principles to improve model performance on corporate finance tasks, bridging the gap between generic output and domain precision",
      "Developing progressively harder prompt scenarios with forward dependencies and compressed multi-step logic"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "AI-Spirit Platform",
    date: "Oct 2025",
    description: "Designed, built, and deployed an AI platform enabling users to interact with consistent, memory-aware AI personas. Structured prompt engineering used to maintain persona tone and memory context.",
    tech: ["Next.js", "Supabase", "Gemini API", "Vercel", "Claude"],
    metrics: "500 MAU",
    link: "https://ai-spirit.in",
    image: "/ai-spirit.png",
    category: 'build',
    problem: "Generic chatbots lack personality consistency. Users want meaningful interactions that feel authentic, but existing solutions struggle with maintaining consistent character and memory across sessions.",
    approach: [
      "Structured prompt engineering used to maintain consistent persona tone, identity, and memory context across sessions",
      "Iterative A/B testing on onboarding flows and persona engagement mechanics to drive user retention",
      "Full product lifecycle owned end-to-end: idea → PRD → build → deploy → user feedback → iteration"
    ],
    keyInsights: [
      "Persona consistency is the core driver of engagement - users return when characters stay 'in character'",
      "Structured prompt engineering solved a non-trivial LLM reliability challenge for memory",
      "A/B testing flows increased retention noticeably"
    ],
    outcomes: [
      "Grown to 500 Monthly Active Users (MAU)",
      "Maintained consistent persona tone for complex and nuanced AI characters"
    ]
  },
  {
    title: "Credit Memo & FS Gen Tool",
    date: "Dec 2025",
    description: "Full-stack AI platform built to automate comprehensive credit memo generation from annual reports — reducing a 4–6 hour manual analysis process to under 15 minutes.",
    tech: ["Python", "Gemini API", "Groq", "Claude", "React", "PDF Parsing"],
    metrics: "80% Time Save",
    category: 'build',
    githubUrl: "https://github.com/gmpro-cr",
    problem: "Credit analysts spend 4-6 hours manually extracting data and writing memos. The manual process is painful and slow.",
    approach: [
      "Extracts financial data, computes key credit ratios, and generates a structured narrative credit assessment",
      "PRD and user flows defined before building: scoped problem statement, user journey, and success metric upfront",
      "Exports to both Excel and PDF formats — strictly aligned to actual workflow requirements of credit teams"
    ],
    keyInsights: [
      "Matching the output a senior credit analyst would produce manually built immense enterprise trust",
      "Scoping the success metric (time-to-memo) upfront ensured the product remained lean and focused"
    ],
    outcomes: [
      "Reduced a 4–6 hour manual analysis process to under 15 minutes",
      "Automated complex ratio calculations alongside narrative generation"
    ]
  },
  {
    title: "Job Intelligence Scraper",
    date: "Jan 2026",
    description: "Personal job search automated by building a scraper that pulls relevant listings twice daily, matches them against a target CV using semantic logic, and delivers a curated shortlist via email.",
    tech: ["Python", "Web Scraping", "Email Automation", "AI Setups"],
    metrics: "2x Daily Automated",
    category: 'build',
    problem: "Manual job board browsing is a real pain point, consuming hours daily with massive signal-to-noise ratio issues.",
    approach: [
      "Built a technical pipeline that scrapes relevant listings twice daily",
      "Matches listings against a target CV using semantic logic",
      "Delivers a curated shortlist via email automatically"
    ],
    keyInsights: [
      "Eliminating the manual step directly translated to higher quality of applications submitted",
      "Demonstrates end-to-end product thinking: problem defined, solution built, validated in production"
    ],
    outcomes: [
      "Fully automated the job search pipeline",
      "Zero time spent on manual job board browsing post-deployment"
    ]
  },
  {
    title: "Naukri.com: Product Sense",
    date: "Aug 2025",
    description: "Structured product analysis of India's largest job portal — identifying SKU complexity as a core conversion barrier for paid plans.",
    tech: ["Product Strategy", "User Segmentation", "Monetisation", "Go-to-Market"],
    metrics: "Strategic Case Study",
    image: "/naukri-logo.png",
    category: 'case-study',
    problem: "Too many services and SKUs create decision paralysis for job seekers, hindering paid subscriptions.",
    approach: [
      "Structured product analysis of SKU complexity acting as a conversion barrier",
      "Proposed a bundled plan architecture (Naukri Plus vs Pro) to reduce decision paralysis",
      "Covered user segmentation, competitive landscape, monetisation strategy, and GTM framing"
    ],
    keyInsights: [
      "Service proliferation creates paralysis, not choice",
      "Bundling (Plus vs Pro) clarifies the value proposition and increases paid subscription adoption"
    ],
    outcomes: [
      "Developed a robust bundled plan architecture for increased paid adoption",
      "Detailed segmentation strategies aligned to real-world monetisation goals"
    ],
    caseStudyAnalysis: {
      companyMission: "To reposition naukri.com as a complete recruitment partner",
      primaryRevenue: "Employer subscriptions & job postings",
      secondaryRevenue: "Advertising, premium services to job seekers",
      userSegments: [
        {
          segment: "Free Users (Freshers & Experienced)",
          needs: ["Search jobs easily", "Hassle-free application"],
          addressed: ["Provides large job pool", "Easy-apply features"]
        }
      ],
      featureBreakdown: [
        {
          feature: "Bundled Service (Proposed)",
          problem: "SKU complexity leads to decision paralysis",
          whyItWorks: "Groups services into logical Plus and Pro tiers to streamline checkout."
        }
      ],
      competitiveAnalysis: [
        {
          platform: "LinkedIn",
          strengths: ["Social graphs", "B2B strength"],
          weaknesses: ["Costly for freshers"]
        }
      ],
      improvement: {
        problem: "Multiple paid offerings confuse the user.",
        impact: "Drop-offs at payment gateway.",
        solution: "Naukri Plus and Naukri Pro.",
        whyItWorks: "Reduces cognitive load."
      },
      keyTakeaways: ["Keep pricing architecture simple", "Consolidated choices improve conversion patterns"]
    }
  },
  {
    title: "Discord Web Scraper Bot",
    date: "Jan 2026",
    description: "AI-powered Discord bot that scrapes any webpage and enables natural conversation about its content. Users can ask questions, get summaries, or extract specific information from URLs.",
    tech: ["Python", "Discord.py", "Groq API", "Llama 3.3 70B", "BeautifulSoup"],
    metrics: "Live Bot",
    category: 'build',
    githubUrl: "https://github.com/gmpro-cr",
    problem: "Fragmented context switching between browser and chat when researching.",
    approach: [
      "Built a Discord bot using discord.py that listens to auto-detects URLs",
      "Integrated Groq's Llama 3.3 70B model for fast inference",
      "Designed conversation memory system"
    ],
    keyInsights: ["Conversation memory transforms utility into engagement", "Auto-URL detection removes friction"],
    outcomes: ["Built fully functional bot running 24/7", "Supports natural conversation with context memory"]
  }
];

export const SKILL_DATA: SkillMetric[] = [
  { subject: 'Product & PM', A: 90, fullMark: 100 },
  { subject: 'Credit & Banking', A: 95, fullMark: 100 },
  { subject: 'AI & Technical', A: 90, fullMark: 100 },
  { subject: 'Prompt Engineering', A: 95, fullMark: 100 },
  { subject: 'Corporate Lending', A: 95, fullMark: 100 },
];

export const STOCK_TICKER_ITEMS = [
  "GMHL: AI+CREDIT",
  "DOMAIN: BANKING & FINTECH",
  "EXP: 8+ YEARS LENDING",
  "RATING: STRONG BUY",
  "SKILLS: PM · LLM EVALS · CREDIT",
  "LOC: PUNE, IN"
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: "Indian Institute of Management Sirmaur",
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
    name: "IBM AI Product Management",
    issuer: "Coursera",
    year: "2024",
    id: "CRT-01"
  },
  {
    name: "Top 5% Professional Product Management",
    issuer: "HelloPM",
    year: "2023",
    id: "CRT-02"
  },
  {
    name: "Figma Essentials",
    issuer: "LinkedIn Learning",
    year: "2023",
    id: "CRT-03"
  },
  {
    name: "Technical Product Management",
    issuer: "LinkedIn Learning",
    year: "2023",
    id: "CRT-04"
  }
];

export const TECH_STACK: TechItem[] = [
  { id: "LLM", name: "LLM Evaluation", category: "AI Skills", price: "150.00", change: "+15.2%" },
  { id: "RLHF", name: "RLHF", category: "AI Skills", price: "148.50", change: "+12.1%" },
  { id: "PRMPT", name: "Prompt Engineering", category: "AI Skills", price: "140.20", change: "+10.5%" },
  { id: "PRD", name: "PRD Writing", category: "PM Skills", price: "120.40", change: "+5.4%" },
  { id: "NPA", name: "NPA Management", category: "Credit", price: "115.10", change: "+3.2%" },
  { id: "FIN", name: "Financial Modelling", category: "Credit", price: "118.50", change: "+4.1%" },
  { id: "PYTH", name: "Python", category: "Tech", price: "98.45", change: "+2.4%" },
  { id: "NXT", name: "Next.js", category: "Tech", price: "105.10", change: "+5.1%" },
];