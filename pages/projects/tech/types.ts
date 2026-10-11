import type { FlowNode } from '../diagrams';

/* ═══════════════════════════════════════════════════════════════
   Technical report data. Every field is sourced from the project's own
   repository (README, code, config) as of 2026-10-12. Nothing here is
   illustrative unless a field says so.
   ═══════════════════════════════════════════════════════════════ */

/** One AI model and the single job it does in the product. */
export interface ModelUse {
  name: string;          // e.g. "Gemini 2.5 Flash"
  provider: string;      // e.g. "Google AI Studio"
  job: string;           // plain English: what it is asked to do
  why: string;           // why this model for this job
  when: 'every request' | 'fallback' | 'background' | 'development only' | 'on demand';
}

/** A fallback chain, animated: a request tries each link in turn. */
export interface ModelChain {
  title: string;
  intro: string;
  links: string[];
  /** Index of the link that answers in the animated example. */
  answeredBy: number;
  /** What makes a link "fail" in this product (rate limit, timeout...). */
  failReason: string;
}

/** A box on the system map. x/y are percentages of the stage. */
export interface SysNode {
  id: string;
  label: string;
  sub?: string;
  kind: 'person' | 'browser' | 'server' | 'data' | 'ai' | 'external';
  at: [number, number];
  /** Position on phones, where the stage is tall instead of wide. */
  m: [number, number];
}

/** One hop of the animated walk-through across the map. */
export interface SysHop { from: string; to: string; caption: string; ms?: number }

export interface RequestStep { title: string; plain: string; detail?: string }

export type Diagram =
  | { kind: 'flow'; nodes: FlowNode[] }
  | { kind: 'sequence'; actors: string[]; messages: { from: number; to: number; label: string; note?: string }[] }
  | { kind: 'lanes'; handoff: string; lanes: { label: string; sub: string; rampIndex: number; steps: string[] }[] };

export interface Mechanism { title: string; body: string[]; diagram?: Diagram }

export interface TechReportData {
  /** A few short paragraphs a non-engineer can read in under a minute. */
  summary: string[];
  glance: { label: string; value: string }[];
  models: {
    intro: string;
    uses: ModelUse[];
    chains?: ModelChain[];
    /** For products with no model at run time: what does the work instead. */
    none?: string;
  };
  map: { intro: string; nodes: SysNode[]; hops: SysHop[] };
  request: { title: string; intro: string; steps: RequestStep[] };
  mechanisms: Mechanism[];
  failures: { title: string; body: string }[];
  testing: { title: string; body: string }[];
  hosting: { label: string; value: string }[];
  limits: string[];
  glossary: { term: string; def: string }[];
  /** Where the facts on this page come from. */
  sources: string;
}
