# Portfolio Enhancement Design

## Overview

Enhance the portfolio website with detailed work experience from CV and structured case study analysis with a modal deep-dive feature.

## Changes

### 1. Work Experience Enhancement

Update `EXPERIENCES` array in `constants.ts`:

#### Add Tata Trusts Role (Currently Missing)

```typescript
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
```

#### Expand Yes Bank (3 → 7 bullets)

```typescript
description: [
  "Led end-to-end lifecycle of corporate lending products, aligning solutions to customer pain points",
  "Managed portfolio of new and existing corporate clients, generating income of ~₹2.5 Cr/year",
  "Prepared credit appraisal memos and term sheets for portfolios worth ₹500 Cr",
  "Partnered with cross-functional stakeholders using RACI to deliver lending products",
  "Drove customer-centric discovery and onboarding, acquiring ~4 new corporate clients annually",
  "Monitored product adoption post-onboarding and iterated based on feedback loops",
  "Managed corporate customers across education, steel, textile, safety equipment, and G&J sectors"
]
```

#### Expand HDFC Bank (3 → 5 bullets)

```typescript
description: [
  "Designed solutions to minimise delinquency risk using predictive analytics and early warning systems",
  "Used PowerBI and Excel dashboards to track default probabilities and portfolio health metrics",
  "Co-created restructuring product flows tailored to stressed assets by analyzing user financial behavior",
  "Created sector-specific business models (real estate, energy, hospitality) based on customer segments",
  "Interacted with business, credit and recovery teams for Maharashtra and Goa region"
]
```

#### Expand Suraksha ARC (3 → 6 bullets)

```typescript
description: [
  "Analysed financial health and recovery potential of NPA accounts offered for sale by banks",
  "Liaised with bank officials and legal team for acquisition and resolution of accounts",
  "Assisted on end-to-end process of acquiring account with debt of ~₹9000 Cr under IBC framework",
  "Conducted due diligence and loan documentation for cases with ticket size >₹50 Cr",
  "Monitored operations involving labour count, construction cost, and sales data of Real Estate cases",
  "Responsible for catalysing existing processes to complete work within set deadlines"
]
```

### 2. Case Study Modal Structure

#### New Type Definition (types.ts)

```typescript
export interface UserSegment {
  segment: string;
  needs: string[];
  addressed: string[];
}

export interface FeatureBreakdown {
  feature: string;
  problem: string;
  whyItWorks: string;
}

export interface CompetitiveEntry {
  platform: string;
  strengths: string[];
  weaknesses: string[];
}

export interface CaseStudyAnalysis {
  userSegments: UserSegment[];
  featureBreakdown: FeatureBreakdown[];
  competitiveAnalysis: CompetitiveEntry[];
  keyTakeaways: string[];
}
```

Add optional field to `Project`:
```typescript
export interface Project {
  // ... existing fields
  caseStudyAnalysis?: CaseStudyAnalysis;
}
```

#### Case Study Data (constants.ts)

**Naukri.com Analysis:**

```typescript
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
```

**BookMyShow Analysis:**

```typescript
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
```

### 3. Component Changes

#### ProjectDetailModal.tsx

Add conditional "View Full Analysis" button for case study projects:

```tsx
{project.caseStudyAnalysis && (
  <button
    onClick={() => setShowCaseStudyModal(true)}
    className="..."
  >
    View Full Analysis →
  </button>
)}
```

#### New: CaseStudyModal.tsx

New modal component with tabbed sections:
- **Summary** - Problem, approach, outcomes (existing content)
- **Users** - User segmentation table
- **Features** - Feature breakdown table
- **Competition** - Competitive analysis table

Styling matches existing finance/terminal theme.

## Files Changed

| File | Action |
|------|--------|
| `types.ts` | Add CaseStudyAnalysis types |
| `constants.ts` | Update EXPERIENCES, add caseStudyAnalysis to projects |
| `components/ProjectDetailModal.tsx` | Add "View Full Analysis" button |
| `components/CaseStudyModal.tsx` | Create new modal component |

## Files Unchanged

- `App.tsx`
- `TimelineCard.tsx`
- Other section components
