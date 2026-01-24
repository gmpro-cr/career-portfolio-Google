import { Experience, Project, SkillMetric, Education, Certification, TechItem } from './types';

export const RESUME_CONTEXT = `
Gaurav Mahale is a finance professional transitioning to Product Management, with 8+ years in banking and credit risk.
Education: PGPM from Indian Institute of Management Sirmaur (2015-2017), B.E. from University of Pune (2010-2014).
Current Role: Relationship Manager at Yes Bank (Full Time, Apr 2022 - Present). Also working part-time as AI Trainer at Pareto.AI.
Previous Roles:
- Portfolio Manager at HDFC Bank (Jan 2020 - Apr 2022): Minimised delinquency risk using predictive analytics.
- Operations Manager at Suraksha ARC (Sep 2017 - Jan 2020): NPA account resolution.
- Consultant at Tata Trusts (May 2017 - Sep 2017).
Key Skills: Credit Analysis, Financial Modeling, SQL, Google Analytics, Python. Building AI/Product skills through side projects.
Projects (demonstrating product thinking):
1. AI Persona interaction platform: 500 monthly users, built with Gemini/Claude/Supabase.
2. Credit Memo and FS Generation using AI: Full-stack platform solving a real banking pain point.
Certifications: IBM AI Product Management, HelloPM, Figma Essentials.
Why Product: After 8 years solving customer problems in banking, I realized I'm most energized when building solutions. My side projects prove I can ship products that users love.
Location: Pune, India.
Contact: mahalegauravk@gmail.com.
`;

export const EXPERIENCES: Experience[] = [
  {
    role: "Relationship Manager",
    company: "Yes Bank Limited",
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
  },
  {
    role: "AI Trainer",
    company: "Pareto.AI (Part-Time)",
    period: "Dec 25 - Present",
    type: 'AI',
    description: [
      "Training LLMs on financial modeling, Doc and PPT generation through evals and prompt engineering",
      "Evaluated and improved AI outputs for credit analysis, financial projections, and business documentation",
      "Applied banking domain expertise to enhance AI model accuracy in corporate finance applications"
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
    image: "/ai-spirit.png",
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
    image: "/naukri-logo.png",
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
      companyMission: "To reposition Naukri.com as a complete recruitment partner by consolidating all products into a Naukri Hiring Suite that caters to almost all the recruitment needs of customers",
      primaryRevenue: "Revenue generation from employers who pay for job postings, resume database access, and premium recruitment solutions",
      secondaryRevenue: "Advertising, premium services to job seekers",
      userSegments: [
        {
          segment: "Free Users (Freshers & Experienced)",
          needs: [
            "Search jobs by education/experience",
            "Hassle-free application process without checking each job posting on employer website",
            "Get suggestions according to the candidate's profile",
            "Find details on profile compatibility to available jobs"
          ],
          addressed: [
            "Search by location, industry, company, or job role",
            "One-click apply without filling details for each separate job posting",
            "AI suggestions based on background, applies, and preferences",
            "Brief analytics on profile performance including visits, activity, and skills match"
          ]
        },
        {
          segment: "Paid Users (Immediate Job Seekers)",
          needs: [
            "Resume building services",
            "Faster application process",
            "Greater visibility to job posters"
          ],
          addressed: [
            "Resume display and resume writing services",
            "Recruiter connection features",
            "AI-driven mock interviews, Naukri 360, profile display, and career booster plan"
          ]
        },
        {
          segment: "Employers/HR",
          needs: [
            "Platform with large pool of candidates",
            "Ability to filter candidates according to JD",
            "Faster way to check background and expectations",
            "Ability to connect with candidates while keeping identity hidden"
          ],
          addressed: [
            "Access to ~3 Cr candidate CVs on the portal",
            "Filter search by candidate background, salary expectations, notice period, location preferences",
            "Detailed candidate profiles for quick evaluation",
            "Anonymity for hassle-free outreach"
          ]
        }
      ],
      featureBreakdown: [
        {
          feature: "Jobs You May Like",
          problem: "Candidates need relevant job suggestions based on: 1) Recent activity, 2) Preferences, 3) Additional AI suggestions",
          whyItWorks: "Gives candidates a bigger list of suggested job postings, engages them on the app, and provides ease to apply for multiple relevant postings"
        },
        {
          feature: "Applies (Application Tracker)",
          problem: "Candidates lack visibility into the status and flow of their job applications",
          whyItWorks: "Shows how many other candidates applied, how many profiles were viewed by employer, whether shortlisted - helps candidates calibrate expectations of getting shortlisted"
        },
        {
          feature: "Paid Services",
          problem: "Candidates with little guidance on resume building and career need support",
          whyItWorks: "Freshers or candidates in dire need of a new job get attracted to resume building, recruiter access, and career guidance services"
        }
      ],
      competitiveAnalysis: [
        {
          platform: "LinkedIn",
          strengths: ["Social platform with ability to connect to professionals", "Details on background of professionals", "Consolidated paid service offering"],
          weaknesses: ["Platform more likely to be used by experienced professionals", "Freshers prefer platforms like Naukri.com"]
        },
        {
          platform: "Indeed.com",
          strengths: ["Global reach", "Cleaner interface"],
          weaknesses: ["Lesser listings of clients", "Not as popular as LinkedIn or Naukri.com in India"]
        },
        {
          platform: "IIMJobs",
          strengths: ["Provides platform for a designated premium segment"],
          weaknesses: ["Limited job postings", "Can be replaced by LinkedIn"]
        }
      ],
      improvement: {
        problem: "Multiple paid offerings (Resume building, Job posting on SMS, Recruiter connection, Naukri 360, Profile display, AI mock interview, Career booster plan) confuse candidates. The wide variety makes users distrust effectiveness and creates decision paralysis.",
        impact: "Job seekers often do not trust the effectiveness of these offerings. Candidates requiring multiple paid services get confused by the wide variety.",
        solution: "Bundle services into two categories: 1) Naukri Plus - basic services like resume display, profile booster, and job posting on SMS. 2) Naukri Pro - full bundle of all paid services with higher fees for higher margins.",
        whyItWorks: "Reduces clutter in paid offerings, attracts more candidates to paid services. Naukri Plus offers automated services at accessible price. Naukri Pro allows premium pricing for comprehensive features."
      },
      keyTakeaways: [
        "Naukri's longevity (since 1997) comes from consistent UX upgrades and staying relevant",
        "Users prefer uncluttered experience and want focused offerings",
        "Engagement driven by providing accurate suggestions given the large pool of job postings"
      ]
    }
  },
  {
    title: "BookMyShow: Deep Dive",
    date: "Aug 2025",
    description: "Product deconstruction of BookMyShow's non-movie entertainment vertical, identifying a critical gap in discovery for plays, comedy shows, and live events. Proposed a 'Reviews & Social' layer to drive engagement and reduce dependency on movie releases.",
    tech: ["Product Deconstruction", "UX Analysis", "Feature Prioritization", "Competitive Audit", "User Research"],
    metrics: "Feature Concept",
    image: "/bookmyshow-logo.png",
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
      companyMission: "To capture the online booking platform for entertainment shows",
      primaryRevenue: "Movie Tickets",
      secondaryRevenue: "Live Shows (Music concerts, Match Tickets, Plays, Local Events)",
      userSegments: [
        {
          segment: "Movie Goers",
          needs: [
            "Multiple movie options at one place",
            "Booking the movie ticket effortlessly",
            "Advance booking of the shows",
            "Discounts on the movie tickets",
            "Availability of movie reviews"
          ],
          addressed: [
            "Offers list of all the movie shows",
            "Platform to book the movie tickets seamlessly",
            "Option to book advance tickets",
            "Discounts on specific cards on the movie tickets",
            "Users are able to see the reviews of the movies"
          ]
        },
        {
          segment: "Entertainment Seekers",
          needs: [
            "Listing of all the entertainment shows in the city at one platform",
            "Booking of the shows at own comfort",
            "Option to select seats of the show",
            "Discounts or early access of tickets"
          ],
          addressed: [
            "App provides list of all the shows in the city",
            "App and website provides ability to book regular live shows easily",
            "Seat selection feature available",
            "BMS offers discounts on multiple shows - an 'aha moment' that traditional booking cannot provide"
          ]
        },
        {
          segment: "Performers/Artists",
          needs: [
            "Online platform for selling the tickets",
            "Hassle-free booking and real-time update on ticket booking"
          ],
          addressed: [
            "BMS provides a unique online platform for new-age comedians and play artists",
            "App provides real-time update on booking which helps performers create marketing content for additional bookings"
          ]
        }
      ],
      featureBreakdown: [
        {
          feature: "Latest Movie Advertisement",
          problem: "Reduces the effort to search for the latest movie the user is looking for",
          whyItWorks: "More often the user is using the app for booking the latest movie being released. This feature helps the user skip other steps and surfaces intent immediately"
        },
        {
          feature: "Category Section",
          problem: "Offers the users to navigate through multiple entertainment categories",
          whyItWorks: "Users on leisure time looking for various options are able to look for multiple events nearby their location"
        },
        {
          feature: "Seat Booking Option",
          problem: "Offers choice in selecting the seat of user's own choice",
          whyItWorks: "Provides a feel-good factor since users can choose seats of their own choice, adding to personal satisfaction"
        }
      ],
      competitiveAnalysis: [
        {
          platform: "Paytm Insider",
          strengths: ["Wide user base and 2nd highest market share", "Familiar interface to users", "Payment integration already available"],
          weaknesses: ["Product is not focused and users are not loyal", "Multiple players in segment offering same user experience"]
        },
        {
          platform: "PVR App",
          strengths: ["Loyal customers", "Focused user experience"],
          weaknesses: ["Limited to movies only"]
        },
        {
          platform: "District (Zomato)",
          strengths: ["Interactive user interface", "Availability of Zomato's user base"],
          weaknesses: ["Late entry into the segment", "Difficult to gain user's attention"]
        }
      ],
      improvement: {
        problem: "Review section for plays and comedy shows is not included in the app",
        impact: "Users looking for booking play and comedy shows cannot gauge through the app which shows they can book if they don't have previous knowledge. Users often look for shows on weekends and need to book on an immediate basis.",
        solution: "Review section for play and comedy shows can be included in the app. Alternatively, a general chat box can provide reviews on the shows.",
        whyItWorks: "The review section helps users book the right shows, especially for immediate weekend bookings. It provides social proof for unfamiliar experiences."
      },
      keyTakeaways: [
        "Simplicity in UI and focused area of business helps in long run - BMS has captured ~70% of the market",
        "Users prefer uncluttered experience and form habits around focused solutions",
        "BMS has innovated on multiple fronts (adding shows, organizing big events like Coldplay) while staying focused in the entertainment realm for last 20 years"
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