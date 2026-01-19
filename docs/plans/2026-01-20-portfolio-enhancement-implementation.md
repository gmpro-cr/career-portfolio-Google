# Portfolio Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enrich portfolio with detailed work experience from CV and add case study modal with structured analysis tables.

**Architecture:** Update data constants with expanded content, add new TypeScript types for case study analysis, create a new CaseStudyModal component that displays tabbed analysis, and wire it to the existing ProjectDetailModal.

**Tech Stack:** React, TypeScript, Tailwind CSS, Lucide Icons

---

## Task 1: Add Case Study Analysis Types

**Files:**
- Modify: `types.ts`

**Step 1: Add new interfaces for case study analysis**

Add these types after the existing `Project` interface (around line 28):

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

**Step 2: Add optional caseStudyAnalysis field to Project interface**

Update the `Project` interface to add after `frameworks?: string[];`:

```typescript
  caseStudyAnalysis?: CaseStudyAnalysis;
```

**Step 3: Verify TypeScript compiles**

Run: `cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && npx tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add types.ts
git commit -m "feat: add CaseStudyAnalysis types for structured case study data"
```

---

## Task 2: Update Work Experience Data

**Files:**
- Modify: `constants.ts:21-66` (EXPERIENCES array)

**Step 1: Replace the EXPERIENCES array with expanded data**

Replace the entire `EXPERIENCES` array with:

```typescript
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
```

**Step 2: Verify dev server shows updated experience**

Run: `cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && npm run dev`
Open browser, navigate to WORK section, verify:
- 5 roles now displayed (including Tata Trusts)
- Yes Bank shows 7 bullets
- HDFC shows 5 bullets
- Suraksha shows 6 bullets

**Step 3: Commit**

```bash
git add constants.ts
git commit -m "feat: expand work experience with full CV details and add Tata Trusts role"
```

---

## Task 3: Add Case Study Analysis Data for Naukri

**Files:**
- Modify: `constants.ts` (Naukri project in PROJECTS array, around line 130-159)

**Step 1: Add caseStudyAnalysis to Naukri project**

Add after `frameworks: ["Jobs-to-be-Done", "Value Proposition Canvas", "Pricing Strategy Matrix", "RICE Prioritization"]` in the Naukri project:

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

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add constants.ts
git commit -m "feat: add structured case study analysis data for Naukri project"
```

---

## Task 4: Add Case Study Analysis Data for BookMyShow

**Files:**
- Modify: `constants.ts` (BMS project in PROJECTS array, around line 160-190)

**Step 1: Add caseStudyAnalysis to BookMyShow project**

Add after `frameworks: ["AARRR Funnel", "Feature Prioritization Matrix", "Kano Model", "Double Diamond Design"]` in the BMS project:

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

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add constants.ts
git commit -m "feat: add structured case study analysis data for BookMyShow project"
```

---

## Task 5: Create CaseStudyModal Component

**Files:**
- Create: `components/CaseStudyModal.tsx`

**Step 1: Create the CaseStudyModal component**

```tsx
import React, { useState } from 'react';
import { X, Users, Layers, Swords, Lightbulb } from 'lucide-react';
import { CaseStudyAnalysis } from '../types';

interface CaseStudyModalProps {
  analysis: CaseStudyAnalysis;
  title: string;
  onClose: () => void;
}

type TabType = 'users' | 'features' | 'competition' | 'takeaways';

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ analysis, title, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <Layers className="w-4 h-4" /> },
    { id: 'competition', label: 'Competition', icon: <Swords className="w-4 h-4" /> },
    { id: 'takeaways', label: 'Takeaways', icon: <Lightbulb className="w-4 h-4" /> },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 md:px-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          <p className="text-indigo-100 text-sm mt-1">Full Product Analysis</p>
        </div>

        {/* Tabs */}
        <div className="sticky top-[88px] z-10 bg-white border-b border-gray-200 px-6 md:px-8">
          <div className="flex gap-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 md:px-8 py-6">
          {/* User Segments Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                User Segmentation
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-1/4">Segment</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Needs / Use Cases</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">How Product Addresses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.userSegments.map((segment, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 border border-gray-200 font-medium text-gray-900 align-top">
                          {segment.segment}
                        </td>
                        <td className="p-4 border border-gray-200 align-top">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                            {segment.needs.map((need, j) => (
                              <li key={j}>{need}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-4 border border-gray-200 align-top">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                            {segment.addressed.map((addr, j) => (
                              <li key={j}>{addr}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-500" />
                Key Feature Breakdown
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-1/4">Feature</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Problem It Solves</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Why It Works</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.featureBreakdown.map((feature, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 border border-gray-200 font-medium text-gray-900 align-top">
                          {feature.feature}
                        </td>
                        <td className="p-4 border border-gray-200 text-gray-600 text-sm align-top">
                          {feature.problem}
                        </td>
                        <td className="p-4 border border-gray-200 text-gray-600 text-sm align-top">
                          {feature.whyItWorks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Competition Tab */}
          {activeTab === 'competition' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Swords className="w-5 h-5 text-red-500" />
                Competitive Analysis
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-1/4">Platform</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Strengths</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Weaknesses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.competitiveAnalysis.map((competitor, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 border border-gray-200 font-medium text-gray-900 align-top">
                          {competitor.platform}
                        </td>
                        <td className="p-4 border border-gray-200 align-top">
                          <ul className="space-y-1 text-sm">
                            {competitor.strengths.map((s, j) => (
                              <li key={j} className="flex items-start gap-2 text-green-700">
                                <span className="text-green-500">✓</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-4 border border-gray-200 align-top">
                          <ul className="space-y-1 text-sm">
                            {competitor.weaknesses.map((w, j) => (
                              <li key={j} className="flex items-start gap-2 text-red-700">
                                <span className="text-red-500">✗</span>
                                {w}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Takeaways Tab */}
          {activeTab === 'takeaways' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Key Takeaways
              </h3>
              <div className="space-y-4">
                {analysis.keyTakeaways.map((takeaway, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add components/CaseStudyModal.tsx
git commit -m "feat: create CaseStudyModal component with tabbed analysis view"
```

---

## Task 6: Integrate CaseStudyModal into ProjectDetailModal

**Files:**
- Modify: `components/ProjectDetailModal.tsx`

**Step 1: Add import and state**

At the top of the file, add import:

```tsx
import CaseStudyModal from './CaseStudyModal';
```

Inside the component, after `if (!project) return null;`, add state:

```tsx
const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);
```

Also add `useState` to the React import:

```tsx
import React, { useState } from 'react';
```

**Step 2: Add "View Full Analysis" button**

After the `{/* Frameworks */}` section (around line 178), before `{/* Link */}`, add:

```tsx
                    {/* Full Analysis Button for Case Studies */}
                    {project.caseStudyAnalysis && (
                        <div className="pt-4">
                            <button
                                onClick={() => setShowCaseStudyModal(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                View Full Analysis →
                            </button>
                        </div>
                    )}
```

**Step 3: Render CaseStudyModal**

At the end, just before the final closing `</div>` and after the main modal div, add:

```tsx
            {/* Case Study Analysis Modal */}
            {showCaseStudyModal && project.caseStudyAnalysis && (
                <CaseStudyModal
                    analysis={project.caseStudyAnalysis}
                    title={project.title}
                    onClose={() => setShowCaseStudyModal(false)}
                />
            )}
```

**Step 4: Verify in browser**

Run: `npm run dev`
- Navigate to Projects section
- Click on "Naukri.com: Product Sense" case study
- Verify "View Full Analysis" button appears
- Click button, verify modal opens with tabs
- Test all 4 tabs (Users, Features, Competition, Takeaways)
- Test close button
- Repeat for BookMyShow case study

**Step 5: Commit**

```bash
git add components/ProjectDetailModal.tsx
git commit -m "feat: integrate CaseStudyModal with View Full Analysis button"
```

---

## Task 7: Final Verification and Cleanup

**Step 1: Full application test**

Run: `npm run dev`

Verify all sections:
1. **HOME** - Profile displays correctly
2. **WORK** - 5 roles displayed with expanded bullets
   - Pareto.AI: 3 bullets
   - Yes Bank: 7 bullets
   - HDFC Bank: 5 bullets
   - Suraksha ARC: 6 bullets
   - Tata Trusts: 4 bullets
3. **PROJECTS** - Both case studies have "View Full Analysis" button
   - Naukri modal works with all tabs
   - BookMyShow modal works with all tabs
4. **SKILLS** - Unchanged, works
5. **CONNECT** - Unchanged, works

**Step 2: Build verification**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 3: Final commit**

```bash
git add -A
git commit -m "chore: portfolio enhancement complete - verified all sections"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Add CaseStudyAnalysis types | types.ts |
| 2 | Update work experience data | constants.ts |
| 3 | Add Naukri case study data | constants.ts |
| 4 | Add BookMyShow case study data | constants.ts |
| 5 | Create CaseStudyModal component | components/CaseStudyModal.tsx |
| 6 | Integrate modal into ProjectDetailModal | components/ProjectDetailModal.tsx |
| 7 | Final verification | - |
