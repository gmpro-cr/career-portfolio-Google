/* ═══════════════════════════════════════════════════════════════
   Shared case-study data + types for the bespoke project pages.
   ═══════════════════════════════════════════════════════════════ */
import type { Project, ProjectTheme } from '../../types';

export interface MetricCard { value: string; label: string; sub: string }


export interface ProjectExtra {
  metrics: MetricCard[];
  problemStatement: string;
  discovery: string;
  /** One plain sentence on who the product is for. */
  audience: string;
  pmInsight: string;
}

export interface CaseProps {
  project: Project;
  extras: ProjectExtra;
  theme: ProjectTheme;
}

export const PROJECT_EXTRAS: Record<string, ProjectExtra> = {

  'ai-persona-interaction-platform': {
    problemStatement: 'Generic AI chatbots fail at long-term engagement because they lack character consistency and memory. Users crave authentic, persistent relationships with figures they admire, but foundational models drift from their system prompts during extended conversations, destroying immersion and user trust.',

    discovery: "While building side projects I kept watching people switch between ChatGPT and YouTube, trying to \"talk to\" Elon, Naval, or Sadhguru. ChatGPT answered as itself. YouTube was one-way. The parasocial relationship, feeling close to someone you'll never actually meet, was real. But there was no product that closed the loop from admiration to actual dialogue. That gap was the product.",
    audience: "People who follow a public figure closely and want to ask that person about their own situation.",



    pmInsight: "North Star Metric: Messages Sent Per Day, chosen because it captures functional value delivery, engagement depth, and retention in a single number. PMF signal identified through Mixpanel cohort data: users who have 5+ conversations with 2+ different personas in their first week are retained at 3x the D30 rate of single-persona users. That insight drove a full onboarding redesign to expose users to 3+ personas before the end of session 1. The second unlock: when the AI initiates the conversation on session 2 rather than waiting for the user, D7 retention lifted significantly. Both discoveries came from data, mid-build, when I should have designed for them from day one.",




    metrics: [
      { value: '500+', label: 'Monthly Active Users',      sub: 'Organic, no paid acquisition; DAU/MAU ~10%' },
      { value: '3×',   label: 'D7 retention lift',         sub: 'When AI initiates message on session 2 vs waiting' },
      { value: '350+', label: 'Curated AI personas',       sub: '40 categories: Business · Spiritual · Entertainment · Companion · Anime' },
      { value: '5',    label: 'User segments mapped',      sub: 'Career, self-improvement, spiritual, entertainment, companionship' },
    ],
  },

  'ai-credit-intelligence-platform': {
    problemStatement: 'Senior credit analysts spend 4–6 hours manually scrubbing 100+ page annual reports for data extraction and subjective risk synthesis. This low-leverage bottleneck is prone to human error and restricts the volume of transactions that can be evaluated per analyst per day. Every hour spent extracting is an hour not spent thinking.',

    discovery: "After 9 years writing Credit Appraisal Memorandums at Yes Bank and HDFC, I knew exactly where the 4–6 hours went: not in judgment, but in extraction. Forty pages of ratio calculations that Python could do in 4 seconds. Thirty tabs of company research that an AI agent could synthesise in a minute. The bottleneck was mechanical labour. That was the product.",
    audience: "Relationship managers and credit underwriters in commercial banks.",



    pmInsight: "Trust architecture precedes feature architecture in regulated environments. My first assumption was that accuracy would be the adoption bottleneck. It was format familiarity. The moment we mirrored the exact Excel template analysts already submitted to credit committees, resistance dropped overnight. Second: the Karpathy-style research loop with self-scoring (stops at 85% knowledge completeness) was a PM decision as much as a technical one. It meant the AI never delivered a shallow summary when more data was findable, without running forever. Third: per-section confidence scoring (High/Medium/Low) transformed the HITL editor from a 'check everything' workflow to a 'review the uncertain sections' workflow, which cut review time sharply.",




    metrics: [
      { value: '–80%', label: 'CAM prep time',          sub: '4–6 hours reduced to under 1 hour per analyst per proposal' },
      { value: '10',   label: 'Auto-detected risk flags', sub: 'e.g. profits not backed by operating cash flow, surging leverage' },
      { value: '85%',  label: 'Research completeness threshold', sub: 'AI self-scores and keeps searching until it hits this bar' },
      { value: '3',    label: 'Confidence levels per section', sub: 'High / Medium / Low; analysts review uncertain sections only' },
    ],
  },

  'automated-job-discovery-agent': {
    problemStatement: 'Job hunting is a high-noise, low-signal data problem. Portals are flooded with irrelevant listings: "Senior Product Manager" roles that are actually customer support, or Bangalore jobs that are listed in Mumbai. Manual filtering consumes 2+ hours every morning with no compounding value.',

    discovery: "I was spending 2 hours every morning clicking through Naukri and LinkedIn. Same irrelevant listings, same filters, same frustration. I built a Python script to automate the scraping. Then added scoring via Ollama. Then a Telegram notification so I wouldn't even need to check a dashboard. Three weeks later I had a product. The pivot to multi-user came when 5 friends asked for the same thing. That's when I knew it was more than a personal script.",
    audience: "Me first, then five peers. It's for people moving from finance or operations into AI product roles.",



    pmInsight: "The 65-point relevance threshold is the product's most important parameter, and setting it is a product decision. Too low and the digest is noise. Too high and real opportunities are missed. I calibrated it empirically over 3 months of self-use with 7,413 catalogued jobs as ground truth. The second insight: self-use is the fastest path to a first version but the slowest path to a second. My scoring model was perfectly calibrated to my profile and broke for others. The multi-user rewrite taught me: conversational onboarding (ask questions, build the profile) beats a JSON config file that most people won't fill out correctly. The feedback loop, where the relevance model updates its weights when a user applies to or dismisses a role, is what separates a personal script from a product with compounding accuracy. Both are now designed into the current rebuild.",




    metrics: [
      { value: '7,413', label: 'Jobs catalogued',       sub: 'Deduplicated via portal + company + role + location fingerprint' },
      { value: '65',    label: 'Relevance threshold',   sub: 'Jobs scoring ≥65 reach the digest; below threshold stored but excluded' },
      { value: '~10',   label: 'Matched roles per day', sub: 'From 200–500 raw listings per run; with hiring manager details' },
      { value: '–2h',   label: 'Daily time saved',      sub: 'From 2-hour manual browse to 5-minute digest review' },
    ],
  },

  'ai-engineering-field-guide': {
    problemStatement: 'Dense technical books are read once and forgotten. "AI Engineering" is the canonical text for building on foundation models, but 535 pages of linear PDF is impossible to search semantically and gives you no way to ask "where does the book cover X?". The knowledge is locked in a format that does not match how people actually reference it.',

    discovery: "I read \"AI Engineering\" cover-to-cover while building my own LLM products and kept flipping back to find the one paragraph on evals, or RAG chunking, or inference optimisation. The PDF couldn't help: no search that understood meaning, no deep links, no way to ask it a question. I realised the most useful thing wasn't a summary; it was making the book itself queryable and navigable. The gap between owning the knowledge and reaching it on demand was the product.",
    audience: "Engineers, AI PMs and founders who use the book as a reference, not a one-time read.",



    pmInsight: "The defining product decision was treating this as a reference tool, not a summary. A summary is read once; a reference is returned to, so I optimised for retrieval over prose. That drove three choices: (1) content as pure data so any chapter is a one-line edit and the whole site re-targets to another book for free; (2) RAG answers grounded strictly in retrieved chunks with forced chapter citations, because verifiability is what makes a reader trust an AI answer over re-reading the source; (3) full book text kept server-side only, so the client stays tiny and the source stays private. Trust is won or lost on retrieval quality more than on generation.",




    metrics: [
      { value: '10',     label: 'Chapters distilled',     sub: 'Full 535-page book read cover-to-cover, then structured into data' },
      { value: '29',     label: 'Interactive diagrams',   sub: 'From one reusable component with 9 visual types' },
      { value: '1,325',  label: 'RAG book chunks',        sub: 'Server-side only; never shipped in the client bundle' },
      { value: '100%',   label: 'Answers cited',          sub: 'Every "Ask the book" response grounded with its source chapter' },
    ],
  },

  'pyquest-learn-python-by-writing-it': {
    problemStatement: 'Most "learn Python" resources are passive (videos where the learner watches someone else code), and the active alternatives demand an install-and-configure gauntlet that kills beginners before their first print(). The missing product: an environment where writing and running real code is the very first interaction, not the reward after an hour of setup.',

    discovery: "Watching friends try to start Python, the pattern was identical: enthusiasm, then a wall of installers, PATH errors, and editor choices, and most never wrote a line. The insight wasn't that people need better lessons; it's that the first ten minutes decide everything. When I found Pyodide could run genuine CPython inside a browser tab, the product became obvious: collapse time-to-first-run to a single click, then keep people typing with game mechanics.",
    audience: "Complete beginners, and people coming back to Python after stalling at setup.",



    pmInsight: "Time-to-first-run is the whole funnel for a learning tool. Every second between landing and successfully executing code is leakage. That single metric drove the three defining decisions: Pyodide over a fake interpreter (real errors teach real Python), static-site-only over accounts-and-backend (zero signup friction, zero marginal cost per learner), and background runtime loading with an honest status line so a heavyweight WASM download never blocks the first lesson. The game layer (XP, levels, Firewall bosses) works as spaced retrieval, and it's what turns a first run into a second session.",




    metrics: [
      { value: '56',  label: 'Exercises live',        sub: '20 stages across 3 tracks, from first print() to classes, generators, decorators' },
      { value: '0',   label: 'Installs or accounts',  sub: 'Real CPython via Pyodide/WASM runs in the tab itself' },
      { value: '~1s', label: 'To first code run',     sub: 'Runtime lazy-loads in the background while the learner reads stage one' },
      { value: '₹0',  label: 'Cost per learner',      sub: 'Fully static; each additional learner costs nothing to serve' },
    ],
  },

  'sqlquest-learn-sql-on-real-postgres': {
    problemStatement: 'SQL tutorials mostly fake it: canned result tables, toy interpreters that accept only the blessed answer, or hosted sandboxes gated behind signup. Learners never touch a real engine or see a genuine query plan, a NULL surprise, or an honest error message, so the skill fails to transfer to the first day of a real job.',

    discovery: "After shipping PyQuest I kept asking: which other skill is taught almost entirely through fakes? SQL was the standout. I'd spent nine years in banking watching analysts learn it badly from canned-table tutorials, then flounder against a production database. PGlite had just made full PostgreSQL 18 bootable inside a browser tab. The product wrote itself: the first SQL course where the database is not simulated, one URL, no account, and the deepest curriculum I could test-gate.",
    audience: "Analysts and career-switchers who need SQL that holds up on a real database at work.",



    pmInsight: "Two decisions defined the product. First, authenticity as differentiation: 'real Postgres in your tab' is a one-line pitch no canned-results competitor can match without rebuilding on WASM. The engine choice is the moat. Second, curriculum-as-code: a 204-test suite replays every exercise (seed, solution, checker) against the actual engine before any deploy, which turned content editing from an editorial hope into a build gate. The subtler call was the checker contract: it compares result rows rather than query text, so any semantically correct SQL passes. That freedom to find your own path to the answer is where learner confidence actually comes from, and it's invisible in a feature list.",




    metrics: [
      { value: '148', label: 'Exercises live',        sub: '34 stages, from first SELECT to window frames, recursion, and row-level security' },
      { value: '204', label: 'Tests green',           sub: 'Every exercise replayed against the real engine before each deploy' },
      { value: '18',  label: 'Postgres major version', sub: 'Genuine PostgreSQL via PGlite/WASM' },
      { value: '0',   label: 'Accounts required',     sub: 'One URL on any device; progress persists locally' },
    ],
  },

  'vaani-voice-banking-agent': {
    problemStatement: 'Bank IVR trees force a caller through a menu maze for something a conversation would settle in one turn. When it needs to actually move money, the IVR gives up and routes to a queue. A voice agent that can complete the transaction itself needs to be trusted with money without trusting the model with the database.',

    discovery: "Nine years watching bank contact centres route every real request to a queue, while the IVR only ever handled the trivial ones, made the shape of the opportunity obvious: the parts of a call that need a human are exactly the parts that need trust, not intelligence. Gemini Live made speech-to-speech agents good enough to hold a real conversation. The open question was whether one could actually be trusted with money. So I built the control plane first: the ledger, the gateway, the policy engine, all fully tested before a single line of agent code existed, specifically to find out whether 'the model has no database credentials' holds up when a real caller is trying to move real money.",
    audience: "Retail netbanking customers who would otherwise wait on hold. The demo runs as a seeded customer with a savings account and a credit card.",



    pmInsight: "A prompt is a request; a gateway is a guarantee. The system prompt asks the model to verify identity and read back a transfer before confirming it, but nothing in that prompt is trusted to hold, because a sympathetic story ('I'm her husband, she asked me to call') is exactly the kind of pressure a prompt cannot be relied on to resist. Every rule that actually matters (identity, the four money gates, an ownership re-check on every account and payee, audit redaction) is enforced again in code the model cannot see or persuade. The eval suite is built around proving that boundary, not proving the model is polite: assertions check the tool-call sequence and the ledger, never the wording, so a refusal phrased differently every run still passes and a stated balance that was never actually fetched always fails.",




    metrics: [
      { value: '131', label: 'Live scripted scenarios', sub: '28 core regression + 103 persona-batch, run against the real model' },
      { value: '189', label: 'Unit + contract tests',   sub: 'Deterministic; every tool and ledger invariant checked on every change' },
      { value: '0',   label: 'DB credentials held by the model', sub: 'Every call routes through one server-side gateway' },
      { value: '4',   label: 'Gates before money moves', sub: 'Session, trust level, confirmation token, step-up OTP, in order' },
    ],
  },
};
