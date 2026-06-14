export type ViewState = 'HOME' | 'WORK' | 'SKILLS' | 'PROJECTS' | 'CONNECT';

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  type: string;
}

export interface Project {
  title: string;
  slug: string;
  date: string;
  description: string;
  tech: string[];
  link?: string;
  githubUrl?: string;
  metrics?: string;
  image?: string;
  cardFlow?: string[];

  // Enhanced case study fields
  category: 'build' | 'case-study';
  flowType?: 'persona' | 'credit' | 'job' | 'book';
  problem?: string;
  approach?: string[];
  keyInsights?: string[];
  outcomes?: string[];
  userResearch?: string;
  competitiveAnalysis?: string;
  frameworks?: string[];
  caseStudyAnalysis?: CaseStudyAnalysis;
  technicalDetails?: {
    architecture: string;
    dataFlow: { step: string }[];
  };
  reflection?: string;
}

export interface RampColor {
  bg: string;
  border: string;
  text: string;
  dot: string;
}

export interface ProjectTheme {
  accent: string;        // primary solid color
  accentDark: string;    // readable text on light surfaces
  accentBg: string;      // light tinted surface
  accentBorder: string;  // border color (solid)
  ramp: RampColor[];     // coordinated palette for multi-step diagrams
}

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

export interface ImprovementSection {
  problem: string;
  impact: string;
  solution: string;
  whyItWorks: string;
}

export interface CaseStudyAnalysis {
  companyMission: string;
  primaryRevenue: string;
  secondaryRevenue: string;
  userSegments: UserSegment[];
  featureBreakdown: FeatureBreakdown[];
  competitiveAnalysis: CompetitiveEntry[];
  improvement: ImprovementSection;
  keyTakeaways: string[];
}

export interface SkillMetric {
  subject: string;
  A: number;
  fullMark: number;
}

export interface TechItem {
  id: string;
  name: string;
  category: string;
  level?: number; // 0-100
  price: string;
  change: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  id: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  id: string;
}

export enum Section {
  ANALYST = 'ANALYST',
}

export type NavSection = 'PROFILE' | 'MISSIONS' | 'ARMORY' | 'COMMS';
