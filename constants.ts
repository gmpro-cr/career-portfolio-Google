import { Experience, Project, SkillMetric, Education, Certification, TechItem } from './types';

export const RESUME_CONTEXT = `
Gaurav Mahale is an AI Product Manager with a strong background in Credit Risk & Lending.
Education: PGPM from IIM Sirmaur (2015-2017), B.E. from University of Pune (2010-2014).
Current Role: AI Trainer at Pareto.AI (Dec 2025 - Present, Part Time) and Relationship Manager at Yes Bank (Full Time).
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
    company: "Pareto.AI (Part Time)",
    period: "Dec 25 - Present",
    type: 'AI',
    description: [
      "Training LLMs on financial modeling, Doc and PPT generation through evals and prompt engineering",
      "Evaluated and improved AI outputs for credit analysis, financial projections, and business documentation",
      "Applied banking domain expertise to enhance AI model accuracy in corporate finance applications"
    ]
  },
  {
    role: "Relationship Manager",
    company: "Yes Bank Limited (Full Time)",
    period: "Apr 22 - Present",
    type: 'Finance',
    description: [
      "Led end-to-end lifecycle of corporate lending products, aligning solutions to customer pain points",
      "Managed portfolio of new and existing corporate clients, generating income of ~₹2.5 Cr/year",
      "Prepared credit appraisal memos and term sheets for portfolios worth ₹500 Cr",
      "Partnered with cross-functional stakeholders using RACI to deliver lending products",
      "Drove customer-centric discovery and onboarding, acquiring ~4 new corporate clients annually",
      "Monitored product adoption post-onboarding and iterated based on feedback loops",
      "Managed corporate customers across education, steel, textile, safety equipment, and G&J sectors"
    ]
  },
  {
    role: "Portfolio Manager",
    company: "HDFC Bank Limited",
    period: "Jan 20 - Apr 22",
    type: 'Finance',
    description: [
      "Designed solutions to minimise delinquency risk using predictive analytics and early warning systems",
      "Used PowerBI and Excel dashboards to track default probabilities and portfolio health metrics",
      "Co-created restructuring product flows tailored to stressed assets by analyzing user financial behavior",
      "Created sector-specific business models (real estate, energy, hospitality) based on customer segments",
      "Interacted with business, credit and recovery teams for Maharashtra and Goa region"
    ]
  },
  {
    role: "Operations Manager",
    company: "Suraksha ARC",
    period: "Sep 17 - Jan 20",
    type: 'Operations',
    description: [
      "Analysed financial health and recovery potential of NPA accounts offered for sale by banks",
      "Liaised with bank officials and legal team for acquisition and resolution of accounts",
      "Assisted on end-to-end process of acquiring account with debt of ~₹9000 Cr under IBC framework",
      "Conducted due diligence and loan documentation for cases with ticket size >₹50 Cr",
      "Monitored operations involving labour count, construction cost, and sales data of Real Estate cases",
      "Responsible for catalysing existing processes to complete work within set deadlines"
    ]
  },
  {
    role: "Consultant",
    company: "Tata Trusts & Ministry of Water and Sanitation",
    period: "May 17 - Sep 17",
    type: 'Operations',
    description: [
      "Set up system of extension officers, BRCs & CRCs to speed up MIS entries",
      "Within 2 months, region crossed 8 others shifting from last position in IHHLs",
      "Initiated process to build handwash stations in 1,200 schools with Rotary Club",
      "Responsible for catalysing processes to complete work within deadlines"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Credit Memo & FS Gen AI",
    date: "Dec 2025",
    description: "Full-stack AI platform that automates the generation of comprehensive credit memos from annual reports. Transforms 4-6 hour manual analysis into 15-minute automated workflows with financial data extraction, ratio calculations, and narrative generation.",
    tech: ["Python", "Gemini API", "Groq", "Claude", "Financial Analysis", "PDF Parsing", "React"],
    metrics: "80% Time Reduction",
    category: 'build',
    problem: "Credit analysts spend 4-6 hours manually analyzing annual reports to create credit memos. This involves extracting financial data from PDFs, calculating 20+ financial ratios, comparing year-over-year trends, and writing narrative assessments. The process is error-prone, inconsistent across analysts, and creates bottlenecks in loan processing pipelines.",
    approach: [
      "Built intelligent PDF parser using Gemini Vision to extract financial tables from annual reports with 95%+ accuracy",
      "Designed automated ratio calculation engine covering liquidity, solvency, profitability, and efficiency metrics",
      "Created templated narrative generation using Claude for consistent, audit-ready credit assessments",
      "Implemented multi-year trend analysis with automated YoY comparison and variance highlighting",
      "Added export functionality for Excel and formatted PDF reports matching bank templates"
    ],
    keyInsights: [
      "Domain expertise + LLM = 10x productivity gain - the combination of banking knowledge in prompts and AI capabilities created exponential value",
      "Structured output formats are critical - banks need specific formats; flexibility in AI output had to be constrained for adoption",
      "Error handling for edge cases (missing data, non-standard formats) required 40% of development effort",
      "User trust builds through transparency - showing source citations and calculation breakdowns increased adoption"
    ],
    outcomes: [
      "Reduced credit memo generation time from 4-6 hours to 45 minutes (80% improvement)",
      "Achieved consistent formatting across all generated memos, eliminating reviewer rework",
      "Built audit trail with source document citations for regulatory compliance",
      "Successfully processed 50+ annual reports across manufacturing, services, and infrastructure sectors"
    ],
    frameworks: ["Jobs-to-be-Done", "Build-Measure-Learn", "Technical Debt Quadrant"]
  },
  {
    title: "AI Persona Platform",
    date: "Oct 2025",
    description: "Interactive platform enabling users to engage with AI personas - from historical figures to fictional characters - with consistent personality, memory, and contextual awareness. Built with focus on engagement metrics and retention optimization.",
    tech: ["Next.js", "Supabase", "Gemini API", "Vercel", "A/B Testing", "Analytics", "PostgreSQL"],
    metrics: "500 MAU",
    link: "https://ai-spirit.vercel.app",
    category: 'build',
    problem: "Generic chatbots lack personality and emotional connection, leading to short sessions and low return rates. Users want meaningful interactions that feel authentic, whether with historical figures for learning or fictional characters for entertainment. Existing solutions either lack depth or require expensive fine-tuning.",
    approach: [
      "Developed sophisticated system prompt architecture with personality traits, speech patterns, and knowledge boundaries",
      "Implemented conversation memory using Supabase to maintain context across sessions",
      "Created A/B testing framework to optimize persona introductions and conversation starters",
      "Built analytics dashboard tracking session duration, message count, and return visits",
      "Designed persona selection UI with categorization (Historical, Fictional, Celebrities) for discovery"
    ],
    keyInsights: [
      "Persona consistency is the #1 driver of engagement - users return when characters stay 'in character' across conversations",
      "Conversation starters matter immensely - well-crafted opening prompts increased session length by 40%",
      "Memory creates emotional connection - users spent 3x longer with personas that 'remembered' them",
      "Category-based discovery outperformed search - users browse personas like Netflix, not Google"
    ],
    outcomes: [
      "Achieved 500 monthly active users through organic growth and SEO",
      "Average session duration of 8 minutes (vs 2-minute industry average for chatbots)",
      "40% return user rate within 7 days",
      "100+ personas across historical figures, anime characters, and celebrities"
    ],
    userResearch: "Conducted user interviews with 15 early adopters. Key finding: users value 'authenticity' over 'accuracy' - they want personas that feel right emotionally, even if historically imprecise. This shifted development focus from factual accuracy to personality consistency.",
    frameworks: ["AARRR Pirate Metrics", "Hook Model", "North Star Metric Framework"]
  },
  {
    title: "Naukri.com: Product Sense",
    date: "Aug 2025",
    description: "Strategic product analysis of India's largest job portal, identifying service clutter issues and proposing a bundling strategy to reduce decision paralysis and increase paid adoption. Recommended 'Naukri Plus' (mass market) vs 'Naukri Pro' (premium) tiering.",
    tech: ["Product Strategy", "User Segmentation", "Monetization", "Market Analysis", "Pricing Strategy"],
    metrics: "Strategic Proposal",
    category: 'case-study',
    problem: "Naukri.com offers 10+ individual services (Resume Display, Resume Critique, Job Search Booster, etc.) creating decision paralysis for job seekers. This leads to low conversion rates on paid services, high cart abandonment, and users defaulting to the free tier. The fragmented offering also makes it difficult to communicate value proposition clearly.",
    approach: [
      "Mapped all 10+ services and their target use cases to identify natural groupings",
      "Analyzed user journey from registration to job application to identify high-intent conversion points",
      "Proposed two-tier bundling: 'Naukri Plus' (₹999/3mo) for active job seekers with visibility tools, 'Naukri Pro' (₹2999/3mo) for career changers with coaching and priority support",
      "Designed A/B test framework to validate bundling hypothesis with 5% traffic allocation",
      "Created pricing sensitivity analysis based on competitive offerings and user willingness-to-pay surveys"
    ],
    keyInsights: [
      "Service proliferation creates paralysis, not choice - users with 10+ options chose none",
      "Job seekers fall into 3 distinct segments with different willingness-to-pay: Desperate (high), Exploratory (medium), Passive (low)",
      "Bundling reduces cognitive load and increases perceived value - even if individual services are unused",
      "Timing matters: conversion rates 5x higher in first week of unemployment vs 3 months later"
    ],
    outcomes: [
      "Proposed framework adopted for internal discussion with product team",
      "Estimated 25-40% increase in paid conversion through simplified choice architecture",
      "Identified ₹50Cr+ revenue opportunity through premium tier targeting career changers",
      "Framework applicable to other Info Edge properties (99acres, Jeevansathi)"
    ],
    userResearch: "Analyzed 500+ user reviews on app stores and social media to understand pain points. Key themes: 'too many options', 'unclear what I need', 'expensive for what you get'. Also reviewed Glassdoor and LinkedIn job posting patterns to understand recruiter-side dynamics.",
    competitiveAnalysis: "Benchmarked against LinkedIn Premium (₹1500/mo), Indeed Resume (free with limits), and Shine.com. LinkedIn's single premium tier is both strength (simplicity) and weakness (no mid-market option). Naukri's opportunity lies in India-specific pricing and vernacular support.",
    frameworks: ["Jobs-to-be-Done", "Value Proposition Canvas", "Pricing Strategy Matrix", "RICE Prioritization"],
    caseStudyAnalysis: {
      userSegments: [
        {
          segment: "Free Users (Freshers & Experienced)",
          needs: [
            "Search jobs by education/experience",
            "Hassle-free application process",
            "Profile-based suggestions",
            "Profile compatibility analytics"
          ],
          addressed: [
            "Search by location, industry, company, role",
            "One-click apply without re-entering details",
            "AI suggestions based on background and preferences",
            "Profile visits, activity, and skills match analytics"
          ]
        },
        {
          segment: "Paid Users (Immediate Job Seekers)",
          needs: [
            "Resume building services",
            "Faster application process",
            "Greater visibility to recruiters"
          ],
          addressed: [
            "Resume display and writing services",
            "Recruiter connection features",
            "AI mock interviews and Naukri 360"
          ]
        },
        {
          segment: "Employers/HR",
          needs: [
            "Large candidate pool",
            "Filter by JD requirements",
            "Quick background checks",
            "Anonymous outreach"
          ],
          addressed: [
            "Access to ~3 Cr candidate CVs",
            "Filter by salary, notice period, location",
            "Detailed candidate profiles",
            "Hidden identity recruitment"
          ]
        }
      ],
      featureBreakdown: [
        {
          feature: "Jobs You May Like",
          problem: "Candidates need relevant job suggestions without manual searching",
          whyItWorks: "Provides larger list of relevant postings based on activity, preferences, and AI suggestions - increases engagement and applications"
        },
        {
          feature: "Application Tracker",
          problem: "Candidates lack visibility into application status",
          whyItWorks: "Shows competing applicants, profile views, shortlist status - helps candidates calibrate expectations"
        },
        {
          feature: "Paid Services",
          problem: "Freshers and urgent job seekers need guidance and visibility",
          whyItWorks: "Resume building, recruiter access, and career boost attract desperate and guidance-seeking candidates"
        }
      ],
      competitiveAnalysis: [
        {
          platform: "LinkedIn",
          strengths: ["Social platform with professional connections", "Detailed professional backgrounds", "Consolidated premium offering"],
          weaknesses: ["Skews toward experienced professionals", "Freshers prefer Naukri"]
        },
        {
          platform: "Indeed",
          strengths: ["Global reach", "Cleaner interface"],
          weaknesses: ["Fewer Indian listings", "Less popular than LinkedIn/Naukri in India"]
        },
        {
          platform: "IIMJobs",
          strengths: ["Focused premium segment platform"],
          weaknesses: ["Limited postings", "Can be replaced by LinkedIn"]
        }
      ],
      keyTakeaways: [
        "Naukri's longevity (since 1997) comes from consistent UX upgrades and staying relevant",
        "Users prefer uncluttered experience with focused offerings",
        "Engagement driven by accurate suggestions from large job posting pool"
      ]
    }
  },
  {
    title: "BookMyShow: Deep Dive",
    date: "Aug 2025",
    description: "Product deconstruction of BookMyShow's non-movie entertainment vertical, identifying a critical gap in discovery for plays, comedy shows, and live events. Proposed a 'Reviews & Social' layer to drive engagement and reduce dependency on movie releases.",
    tech: ["Product Deconstruction", "UX Analysis", "Feature Prioritization", "Competitive Audit", "User Research"],
    metrics: "Feature Concept",
    category: 'case-study',
    problem: "While BookMyShow dominates movie ticketing (90%+ market share), its non-movie entertainment vertical (plays, comedy, concerts) has poor discovery and low engagement. Users don't know what events exist, can't gauge quality, and lack social proof for unfamiliar experiences. This leads to last-minute bookings (revenue volatility) and high marketing costs for event organizers.",
    approach: [
      "Deconstructed BMS user journey for movies vs events - identified 5 key friction points in event discovery",
      "Proposed 'Reviews & Social' layer with verified attendee reviews, friend activity feed, and 'Interested' public wishlists",
      "Designed 'Event Collections' curated by taste-makers (comedians recommending plays, food bloggers recommending experiences)",
      "Created wireframes for social proof integration in event listing pages",
      "Prioritized features using RICE framework, recommending phased rollout starting with comedy vertical"
    ],
    keyInsights: [
      "Social proof drives 60% of non-movie bookings - users need assurance for unfamiliar experiences",
      "Movie-goers ≠ Event explorers - different user segments with distinct discovery behaviors",
      "Urgency tactics backfire for events - 'Only 5 seats left' reduces trust for plays, unlike movies",
      "Curation beats algorithm for cultural events - human recommendations outperform personalization"
    ],
    outcomes: [
      "Identified $100M+ market opportunity in India's live entertainment discovery",
      "Proposed phased rollout starting with comedy (highest review velocity, youngest audience)",
      "Framework validated through user interviews with 10 regular BMS event-goers",
      "Analysis highlighted path for BMS to become 'Yelp for Experiences' beyond ticketing"
    ],
    userResearch: "Interviewed 10 users who attend 3+ non-movie events per month. Key finding: discovery happens off-platform (Instagram, WhatsApp groups, comedian social media) but booking happens on BMS. Opportunity to capture discovery within the platform.",
    competitiveAnalysis: "Analyzed Paytm Insider (strong curation), Skillbox (niche workshops), and international players like Eventbrite and Dice. BMS's advantage is transaction trust and venue partnerships; weakness is content/social layer. Insider leads in editorial curation but lacks transaction volume.",
    frameworks: ["AARRR Funnel", "Feature Prioritization Matrix", "Kano Model", "Double Diamond Design"],
    caseStudyAnalysis: {
      userSegments: [
        {
          segment: "Movie Goers",
          needs: [
            "Multiple movie options in one place",
            "Effortless ticket booking",
            "Advance booking capability",
            "Discounts on tickets",
            "Access to reviews"
          ],
          addressed: [
            "Complete movie listings",
            "Seamless booking platform",
            "Advance ticket booking",
            "Card-specific discounts",
            "User reviews visible"
          ]
        },
        {
          segment: "Entertainment Seekers",
          needs: [
            "All entertainment shows in city",
            "Book from home comfort",
            "Seat selection",
            "Early access and discounts"
          ],
          addressed: [
            "Comprehensive show listings",
            "App and web booking",
            "Seat selection feature",
            "Platform discounts unavailable in traditional booking"
          ]
        },
        {
          segment: "Performers/Artists",
          needs: [
            "Online ticket selling platform",
            "Hassle-free booking management",
            "Real-time booking updates"
          ],
          addressed: [
            "Platform for new-age comedians and artists",
            "Real-time booking data for marketing content"
          ]
        }
      ],
      featureBreakdown: [
        {
          feature: "Latest Movie Advertisement",
          problem: "Users must search for new releases manually",
          whyItWorks: "Most users open app for latest releases - this reduces steps and surfaces intent immediately"
        },
        {
          feature: "Category Section",
          problem: "Users browsing for entertainment options need navigation",
          whyItWorks: "Leisure users can explore multiple event types by location"
        },
        {
          feature: "Seat Booking",
          problem: "Users want control over their experience",
          whyItWorks: "Provides feel-good factor and personal choice satisfaction"
        }
      ],
      competitiveAnalysis: [
        {
          platform: "Paytm Insider",
          strengths: ["Wide user base", "2nd highest market share", "Familiar interface", "Payment integration"],
          weaknesses: ["Unfocused product", "Users not loyal", "Commoditized experience"]
        },
        {
          platform: "PVR App",
          strengths: ["Loyal customers", "Focused experience"],
          weaknesses: ["Limited to movies only"]
        },
        {
          platform: "District (Zomato)",
          strengths: ["Interactive UI", "Zomato's user base"],
          weaknesses: ["Late market entry", "Difficult to capture attention"]
        }
      ],
      keyTakeaways: [
        "Simplicity and focus helped BMS capture ~70% market share",
        "Users prefer uncluttered experience and form habits around focused solutions",
        "Innovation (big events like Coldplay) keeps engagement while staying in entertainment realm"
      ]
    }
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