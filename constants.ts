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
      companyMission: "To reposition naukri.com as a complete recruitment partner by consolidating all products into a Naukri Hiring Suite that caters to almost all the recruitment needs of customers",
      primaryRevenue: "Revenue generation from employers who pay for job postings, resume database access, and premium recruitment solutions",
      secondaryRevenue: "Advertising, premium services to the job seekers",
      userSegments: [
        {
          segment: "A. Free Users\n1. Freshers - Immediate Job Seekers\n2. Experienced professionals - Casual Job Hunters, Immediate Job Seekers",
          needs: [
            "Search jobs basis their education background and professional experience",
            "Hassle free application process without checking each job posting on employer website",
            "Get suggestions according to the candidate's profile",
            "Find details on profile compatibility to the available jobs"
          ],
          addressed: [
            "The product offers the ability to search the jobs basis the location, industry, company or job role to the candidates",
            "It provides hassle free approach to apply to the jobs without requirement of filling the details for each separate job posting",
            "The product offers suggestions to the candidate based on their background, their applies and the preference they have set",
            "The product also offers brief analytics on the performance of their profile which includes profile visits, profile activity and the skills match details"
          ]
        },
        {
          segment: "B. Paid Users\n1. Immediate Job Seekers\na. Freshers\nb. Experienced professionals",
          needs: [
            "In addition to above mentioned uses cases the paid users seek following use case",
            "Jobseekers immediately looking for jobs look for services like resume building, faster application process and greater visibility to the job poster"
          ],
          addressed: [
            "The job seekers who are looking for job search on an immediate basis largely get attracted towards the paid facilities like resume display, resume writing services, recruiter connection, AI driven mock interview, Naukri 360 etc."
          ]
        },
        {
          segment: "C. Employers/HR",
          needs: [
            "Looking for a platform with pool of candidates",
            "Ability to filter the candidates according to the JD",
            "Faster way to check the background of the candidates and their expectations",
            "Ability to connect with the candidate by keeping their identity hidden"
          ],
          addressed: [
            "The product provides CVs of ~ 3 Cr candidates on its portal",
            "Naukri provides the ability to filter the search according to the candidate background, salary expectations, notice period and location preferences etc",
            "The platform provides anonymity to the employers/HRs to provide hassle free experience"
          ]
        }
      ],
      featureBreakdown: [
        {
          feature: "Jobs you may like",
          problem: "Offers the job postings based on three categories 1) Jobs based on recent activity 2) Jobs based on preference and 3) Additional jobs suggestions that the candidate may like",
          whyItWorks: "The feature works as it gives the candidate a bigger list of suggested job postings and engages the candidate on the app. The feature provides ease to the candidate to apply for multiple job postings which are largely relevant to his preferences."
        },
        {
          feature: "Applies",
          problem: "The feature provides the status of the job application and various stages it has passed through.",
          whyItWorks: "The feature provides details on the flow of the application made by the candidate and provides details such as how many other candidates have applied to the same role, how many profiles have been visited by the employer and whether the candidate's profile has been shortlisted or not. These insights are valuable and candidates can calibrate their expectations of getting shortlisted"
        },
        {
          feature: "Paid Services",
          problem: "Candidates with little guidance on resume building, career guidance can get the same from paid services.",
          whyItWorks: "Freshers or candidates who are looking for guidance on resume building, recruiter access or the candidate who are in dire need of a new job gets attracted to the paid services."
        }
      ],
      competitiveAnalysis: [
        {
          platform: "LinkedIn",
          strengths: ["Social platform with ability to connect to professionals", "Details on background of professionals", "Consolidated paid service offering"],
          weaknesses: ["The platform is more likely to be used by experienced professionals while freshers prefer platform like Naukri.com"]
        },
        {
          platform: "Indeed.com",
          strengths: ["Global reach", "Cleaner Interface"],
          weaknesses: ["Lesser listings of the client", "Not as popular as Linkedin or Naukri.com"]
        },
        {
          platform: "IIMJobs",
          strengths: ["Provides platform for a designated segment"],
          weaknesses: ["Limited job postings and can be replaced by Linkedin"]
        }
      ],
      improvement: {
        problem: "Multiple paid offerings are provided by the app which include\n1. Resume building\n2. Job posting on sms\n3. Recruiter connection\n4. Naukri 360\n5. Profile display\n6. AI mock interview\n7. Career booster plan",
        impact: "Since the product provides such wide paid offerings, the job seekers often do not trust the effectiveness of these offerings.\n\nAlso, the candidates may require multiple paid services and the wide variety of these offerings confuses the candidate.",
        solution: "Naukri.com can bundle the services in two categories with following offerings\n\n1. Naukri Plus - offering basic services like resume display, profile booster and job posting on sms\n\n2. Naukri Pro - offering full bundle of paid services where the candidates can use all the facilities",
        whyItWorks: "This solution can reduce the clutter in paid offerings and the product will be able to attract more candidates towards the paid offerings.\n\nNaukri plus wherein automated services can be provided to the candidate can become impactful offering\n\nIn Naukri pro, the Co. can charge higher fees to get higher margins."
      },
      keyTakeaways: [
        "Naukri being launched in 1997 has performed on the user's experience with consistent upgradation and by staying relevant",
        "Users prefer uncluttered experience and want focused offerings",
        "How to keep the user engaged by providing accurate suggestions given the product has large pool of job postings"
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
            "Offers platform to book the movie tickets",
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
            "App and the website provides ability to book the regular live shows very easily",
            "BMS offers discounts on multiple shows which offers users aha moment which traditional booking can not provide"
          ]
        },
        {
          segment: "Performers/Artists",
          needs: [
            "Online platform for selling the tickets",
            "Hassle free booking and real time update on ticket booking"
          ],
          addressed: [
            "BMS provides a unique online platform for new age comedians and play artist which",
            "The app provides real time update on booking of the shows which helps the performers create marketing content for additional bookings"
          ]
        }
      ],
      featureBreakdown: [
        {
          feature: "Advertisement of latest movie being released after opening of the app",
          problem: "Reduces the effort to search for the latest movie the user is looking for",
          whyItWorks: "More often the user is using the app for booking the latest movie being released or will be released. This feature helps the user skip other steps"
        },
        {
          feature: "Category Section",
          problem: "Offers the users to navigate through multiple entertainment categories",
          whyItWorks: "User who on leisure time are looking for various options are able to look for multiple events nearby their location"
        },
        {
          feature: "Seat Booking Option",
          problem: "Offers choice in selecting the seat of users own choice",
          whyItWorks: "The activity provides user a feel good factor since they can choose seats of their own choice. Also"
        }
      ],
      competitiveAnalysis: [
        {
          platform: "Paytm",
          strengths: ["Wide user base and 2nd highest markt share", "Familier interface to the user", "Payment integration already available"],
          weaknesses: ["The product is not focused and users are not loyal", "Multiple players in the segment are offering the same user experience"]
        },
        {
          platform: "PVR",
          strengths: ["Loyal Customers and a focused user experience"],
          weaknesses: ["Limited to movies"]
        },
        {
          platform: "District",
          strengths: ["Interactive user interface and availability of zomatos user base"],
          weaknesses: ["Late entry into the segment, difficult to gain user's attention"]
        }
      ],
      improvement: {
        problem: "Review section for plays and comedy shows is not included in the app.",
        impact: "The users looking for booking play and comedy shows can not gauge through the app which shows they can book if they dont have previous knowledge of the shows. The reviews section in this case helps the user to book the show",
        solution: "Review section for the play and comedy shows can be included in the app. Alternatively, a general chat box can be included which can provide reviews on the shows",
        whyItWorks: "Some users often look for shows on weekends and are in need of booking shows on an immediate basis. The review section can help them book the show.\n\nThe review section can also provide more to all the users on booking the right shows."
      },
      keyTakeaways: [
        "Simplicity in the UI and focused area of business helps in long run - BMS has captured ~70% of the market",
        "Users prefer uncluttered experience and form habits to the experience where they find focused solutions",
        "BMS has innovated on multiple fronts like adding shows, organizing big events (Coldplay) and others to keep the engagement flowing. However, the vision of keeping themselves focused in the entertainment realm from last 20 years has helped to be a consistent market leader"
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