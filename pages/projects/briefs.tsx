/* ═══════════════════════════════════════════════════════════════
   Product briefs + plain-English explainers, one per case study.

   Sourcing rule: every line comes from the project's own repo (README,
   PRODUCT.md, design docs, PM framework) or from facts already published
   on this site, confirmed with the owner on 2026-09-23. Unvalidated claims
   are tagged 'hypothesis' and unmeasured ones 'notyet' -- never stated as
   results. Add nothing here that cannot be sourced.
   ═══════════════════════════════════════════════════════════════ */
import type { Icon } from '@phosphor-icons/react';
import {
  Phone, Robot, ShieldCheck, Bank, CheckCircle, UsersThree, ChatCircleText, Brain, Sparkle,
  ArrowsClockwise, FileArrowUp, Calculator, MagnifyingGlass, PenNib, UserCheck, Clock, Globe,
  Gauge, Funnel, PaperPlaneTilt, BookOpen, ListBullets, ChartBar, ChatText, Quotes, Browser,
  Play, Trophy, Database, Code, Table,
} from '@phosphor-icons/react';

export interface ExplainerStep { icon: Icon; title: string; text: string }

export interface Brief {
  problem: string;
  users: string;
  job: { when: string; want: string; so: string };
  options: { option: string; chosen: boolean; why: string }[];
  northStar?: { metric: string; why?: string };
  guardrails?: string;
  alsoTracked?: string;
  results: { status: 'measured' | 'shipped' | 'target' | 'hypothesis' | 'notyet'; text: string }[];
}

export const HOW_IT_WORKS: Record<string, ExplainerStep[]> = {
  'vaani-voice-banking-agent': [
    { icon: Phone, title: 'You speak', text: 'You talk to your bank instead of pressing buttons, for example "block my card" or "send ₹12,000 to Rohan".' },
    { icon: Robot, title: 'The assistant understands', text: 'An AI voice model listens, works out what you want, and asks a follow-up question if something is missing.' },
    { icon: ShieldCheck, title: 'A separate guard checks it', text: 'Before any money moves, a separate program checks it is really you, the amount is within your limits, and you confirmed with a one-time code. The AI cannot skip this.' },
    { icon: Bank, title: 'The bank records it', text: 'The money moves in a proper double-entry bank ledger, and every attempt is logged, whatever was said.' },
    { icon: CheckCircle, title: 'You hear the result', text: 'The assistant tells you it is done, and the balance on your screen updates by itself.' },
  ],
  'ai-persona-interaction-platform': [
    { icon: UsersThree, title: 'Pick someone', text: 'Choose from 350+ AI personas of public figures, like a business leader or a spiritual teacher. No sign-up needed to start.' },
    { icon: ChatCircleText, title: 'Ask your question', text: 'Type what is on your mind, such as a career decision you are stuck on.' },
    { icon: Brain, title: 'It remembers you', text: 'The app looks up what you talked about before, so the conversation carries on instead of starting from zero.' },
    { icon: Sparkle, title: 'It answers in character', text: 'An AI model replies in that person\'s style. A check scores each reply, and one that drifts out of character is regenerated before you see it.' },
    { icon: ArrowsClockwise, title: 'You come back', text: 'Next time, the persona can pick up where you left off.' },
  ],
  'ai-credit-intelligence-platform': [
    { icon: FileArrowUp, title: 'Upload the annual report', text: 'A bank analyst uploads a company\'s annual report, often more than 100 pages long.' },
    { icon: Calculator, title: 'The numbers are calculated', text: 'A normal program, not AI, reads the figures and works out 12 standard ratios, such as how comfortably the company can repay its loans. It also flags 10 known warning signs.' },
    { icon: MagnifyingGlass, title: 'AI researches the company', text: 'An AI agent searches the web for things like rating downgrades or court cases, and keeps searching until it rates its own research at least 85% complete.' },
    { icon: PenNib, title: 'AI drafts the memo', text: 'An AI model writes the 8-section credit memo using only the checked numbers and research. It never does the maths itself.' },
    { icon: UserCheck, title: 'The analyst decides', text: 'The analyst reviews the sections marked as uncertain, edits, and exports it in the bank\'s own Excel format. The lending decision stays with a person.' },
  ],
  'automated-job-discovery-agent': [
    { icon: Clock, title: 'It wakes up twice a day', text: 'On a schedule, with nobody needing to press anything.' },
    { icon: Globe, title: 'It checks six job sites', text: 'LinkedIn, Naukri, Indeed, HiringCafe, Wellfound and IIMJobs, collecting every new listing.' },
    { icon: Gauge, title: 'It scores every job', text: 'An AI model rates each listing from 0 to 100 against your CV and what you are looking for.' },
    { icon: Funnel, title: 'It keeps only the good ones', text: 'Only jobs scoring 65 or more make the list. Duplicates posted on several sites are removed.' },
    { icon: PaperPlaneTilt, title: 'You get a short list', text: 'The best matches arrive in one message: about 5 minutes of reading instead of 2 hours of searching.' },
  ],
  'ai-engineering-field-guide': [
    { icon: BookOpen, title: 'Start with a 535-page book', text: 'Chip Huyen\'s "AI Engineering", read cover to cover.' },
    { icon: ListBullets, title: 'Turn it into structured notes', text: 'Each of the 10 chapters is broken into sections, key terms, takeaways and links to related chapters.' },
    { icon: ChartBar, title: 'Explain it with diagrams', text: '29 diagrams make the hardest ideas visual.' },
    { icon: ChatText, title: 'You ask a question', text: 'Type any question into "Ask the book", in your own words.' },
    { icon: Quotes, title: 'It answers from the book', text: 'It finds the most relevant passages and answers from them, naming the chapter so you can check.' },
  ],
  'pyquest-learn-python-by-writing-it': [
    { icon: Browser, title: 'Open the site', text: 'No sign-up and nothing to install. The first lesson is ready straight away.' },
    { icon: BookOpen, title: 'Read one short idea', text: 'One concept at a time, in plain, simple English.' },
    { icon: Play, title: 'Write and run real Python', text: 'Real Python runs inside your browser tab, so your code behaves exactly as it would on your own computer.' },
    { icon: CheckCircle, title: 'It checks your answer', text: 'Your output is compared with the expected result. A wrong answer gets a hint, not a telling-off.' },
    { icon: Trophy, title: 'Level up', text: 'Earn XP and clear a checkpoint challenge to unlock the next stage. Your progress saves in the browser.' },
  ],
  'sqlquest-learn-sql-on-real-postgres': [
    { icon: Database, title: 'A real database starts in your tab', text: 'A full PostgreSQL 18 database loads inside the browser. No server, no sign-up.' },
    { icon: Code, title: 'Write a question in SQL', text: 'Ask the data something, like "which customers spent the most last month?"' },
    { icon: Table, title: 'See real results', text: 'Real rows come back, and real error messages when something is wrong, just like at work.' },
    { icon: CheckCircle, title: 'Any correct answer passes', text: 'Your result is compared with the expected rows, not with our query, so your own approach counts.' },
    { icon: Trophy, title: 'Move up', text: '34 stages take you from the basics to the advanced topics that come up on the job.' },
  ],
};

export const BRIEFS: Record<string, Brief> = {
  // Source: vaani/docs/plans/2026-08-14-vaani-voice-banking-agent-design.md (§1, §8, §9)
  'vaani-voice-banking-agent': {
    problem: 'Bank phone menus handle only simple requests. The moment a caller needs to move money, the menu gives up and sends them to a queue. An AI agent could finish the job, but only if the bank can trust it with money without trusting the AI with the database.',
    users: 'Retail banking customers who would otherwise wait on hold. The buyer is a bank operations head, who judges it on containment rate, handling time and cost per call.',
    job: { when: 'I need to block a card, dispute a charge or send money', want: 'just say it and have it actually happen, verified and confirmed', so: 'skip waiting on hold for a person' },
    options: [
      { option: 'Speech-to-speech model (Gemini Live)', chosen: true, why: 'Lower latency and a more natural conversation. Its weaker control is covered by checking every action on the server.' },
      { option: 'Speech-to-text, then an LLM, then text-to-speech', chosen: false, why: 'Easier to control, but slower and less natural to talk to.' },
      { option: 'A real double-entry ledger', chosen: true, why: 'A demo that holds up to technical questioning.' },
      { option: 'Mock account data in a JSON file', chosen: false, why: 'Would not survive a serious technical review.' },
      { option: 'Two-step confirmation token issued by the server', chosen: true, why: 'The model cannot forge a token, so it cannot fake a confirmation.' },
      { option: 'Let the model report that the customer confirmed', chosen: false, why: 'A persuasive caller could talk the model into it.' },
    ],
    northStar: { metric: 'Containment rate: the share of calls finished without handing over to a person', why: 'It is the number a bank COO can put a price on.' },
    alsoTracked: 'blocked attempts at each security check, and response time at the median and 95th percentile.',
    results: [
      { status: 'measured', text: '131 live scripted scenarios and 189 unit and contract tests run against it.' },
      { status: 'shipped', text: 'The AI holds no database credentials. Every money movement passes four checks on the server.' },
      { status: 'notyet', text: 'Containment rate has not been measured yet.' },
    ],
  },

  // Source: AI-Spirit/PM-FRAMEWORK.md (North Star, DAU/MAU, PMF, moat, strategic bets), AI-Spirit/JOBS-TO-BE-DONE.md
  'ai-persona-interaction-platform': {
    problem: 'Generic AI chatbots have no personality, and following a public figure is one-way: you can read and watch them, but never ask them your own question. Coaching that fills the gap costs ₹2,000 to ₹15,000 a session.',
    users: 'Five segments from the jobs-to-be-done map: career-driven professionals, self-improvement seekers, spiritual explorers, pop-culture fans and people looking for companionship. India is the primary market.',
    job: { when: 'I am facing a difficult life or career decision', want: 'talk it through with someone whose thinking I admire', so: 'get a perspective shaped by their worldview, not a generic AI answer' },
    options: [
      { option: 'Guest mode: chat before signing up', chosen: true, why: 'Trying before committing drives growth. The aim is an "aha" moment within the first three messages.' },
      { option: 'Sign-up first', chosen: false, why: 'Puts a wall in front of the moment that proves the value.' },
      { option: 'India-first personas and Hinglish', chosen: true, why: 'Western-first competitors leave Indian users underserved, and cultural relevance is the hardest thing for them to copy.' },
      { option: 'A global, Western-style catalogue', chosen: false, why: 'Head-on competition with Character.AI on its home ground.' },
      { option: 'A generous free tier (20 messages a day)', chosen: true, why: 'Builds the habit before asking for money. The accepted risk is that some users never pay.' },
    ],
    northStar: { metric: 'Messages sent per day', why: 'One number that shows the product works, users find value and personas keep them coming back.' },
    alsoTracked: 'messages per session (target: more than 5) and sessions per user per week (target: more than 2).',
    results: [
      { status: 'measured', text: 'About 500 monthly active users, with daily/monthly active ratio around 10%, and no paid acquisition.' },
      { status: 'hypothesis', text: 'Users who try 2+ personas in their first week retain 3× better. Not yet validated; next step is cohort tracking in Mixpanel.' },
      { status: 'target', text: '₹10,000 monthly recurring revenue from the ₹249/month premium plan.' },
    ],
  },

  // Source: creditguardai/README.md, plus facts already published on this site
  'ai-credit-intelligence-platform': {
    problem: 'Credit analysts spend 4 to 6 hours per loan proposal pulling numbers out of 100+ page annual reports before they can start judging the risk. The judgment takes minutes; the extraction takes hours.',
    users: 'Relationship managers and credit underwriters in commercial banks, who write credit appraisal memos for a credit committee.',
    job: { when: 'a new loan proposal lands on my desk', want: 'have the figures, ratios and background research ready in the format my committee expects', so: 'spend my time on the lending judgment itself' },
    options: [
      { option: 'Python does all the maths; the LLM only writes', chosen: true, why: 'Language models are unreliable at arithmetic, and every number in a credit memo has to be exact.' },
      { option: 'Let the LLM read the report and calculate', chosen: false, why: 'Risk of confident but wrong numbers in a lending decision.' },
      { option: 'A research loop that keeps searching until 85% complete', chosen: true, why: 'Catches things one search misses, like court cases or promoter share pledging.' },
      { option: 'A single web search', chosen: false, why: 'Too shallow for a lending decision.' },
      { option: 'Output in the bank\'s own Excel template', chosen: true, why: 'Analysts adopted it once the output matched what their credit committee already accepts.' },
    ],
    northStar: { metric: 'Hours to prepare one credit memo' },
    guardrails: 'every figure traceable to the source report, and each section marked with a confidence level so reviewers check the uncertain parts.',
    results: [
      { status: 'measured', text: '4–6 hours down to under 1 hour per memo, on my own proposals.' },
      { status: 'shipped', text: '12 ratios calculated and 10 risk patterns flagged automatically; 8-section memo with Excel and PDF export.' },
    ],
  },

  // Source: job-search-agent/PRODUCT.md, job-search-agent/SaaSidea.md, HOW_IT_WORKS.md
  'automated-job-discovery-agent': {
    problem: 'Job portals are flooded with listings that are not really a match. Filtering them by hand took 2 hours every morning, spread across six different sites.',
    users: 'Active job seekers, especially professionals in India, who want to stop scanning low-fit roles. I built it for my own search, and I still run it only for myself.',
    job: { when: 'I start my job search each morning', want: 'see only the roles that genuinely fit my CV, from every portal, in one place', so: 'spend my time applying instead of searching' },
    options: [
      { option: 'Run it as a personal tool', chosen: true, why: 'It solves my problem today without hosting costs or anyone else\'s data to look after.' },
      { option: 'Open it up to other users (hosted app or one-click self-deploy)', chosen: false, why: 'Weighed both. The complexity and costs weren\'t justified, and the scoring was tuned to one profile.' },
      { option: 'Downloadable desktop app', chosen: false, why: '3 to 5 days of packaging per platform, and scheduled background jobs are hard inside a packaged app.' },
      { option: 'Score listings with a local AI model', chosen: true, why: 'No API cost per listing.' },
      { option: 'A hard cut-off at a score of 65', chosen: true, why: 'Keeps the digest short. Too low floods it with noise; too high misses real roles.' },
    ],
    northStar: { metric: 'Time spent finding relevant jobs each day' },
    results: [
      { status: 'measured', text: 'About 2 hours a day down to a 5-minute read, on my own search.' },
      { status: 'measured', text: '7,413 listings collected with duplicates removed.' },

    ],
  },

  // Source: facts already published on this site (the repo README is the Vite template)
  'ai-engineering-field-guide': {
    problem: 'Dense technical books are read once and forgotten. A 535-page PDF cannot answer "where does the book cover this?", so finding one paragraph means re-skimming dozens of pages.',
    users: 'Engineers, AI product managers and founders who use the book as a reference while building, not as a one-time read.',
    job: { when: 'I am building something and half-remember the book covering it', want: 'ask the book directly and see which chapter the answer came from', so: 'apply it without re-reading 80 pages' },
    options: [
      { option: 'A reference tool you come back to', chosen: true, why: 'A summary is read once; a reference is returned to. So it is built for finding, not for reading straight through.' },
      { option: 'A written summary of the book', chosen: false, why: 'Does not help at the moment you need one specific answer.' },
      { option: 'Keyword search (TF-IDF) for "Ask the book"', chosen: true, why: 'Fast and private. The trade-off is that it misses questions worded differently from the book.' },
      { option: 'Meaning-based search (embeddings)', chosen: false, why: 'Better recall; planned as a hybrid with keyword search.' },
    ],
    results: [
      { status: 'shipped', text: 'All 10 chapters as structured data, 29 diagrams from one reusable component, and answers with chapter citations.' },
      { status: 'notyet', text: 'Not in use by other people yet, so there are no usage numbers.' },
    ],
  },

  // Source: pyquest/PRODUCT.md, plus facts already published on this site
  'pyquest-learn-python-by-writing-it': {
    problem: 'Most ways to learn Python are passive videos, and the hands-on ones start with installing Python and an editor. Many beginners give up at setup, before writing a single line.',
    users: 'Absolute beginners learning Python from zero, many of them Indian English speakers, in 10 to 40 minute sessions.',
    job: { when: 'I have a few minutes to learn', want: 'understand one idea and prove it by writing real code that runs on the page', so: 'see my progress and come back tomorrow' },
    options: [
      { option: 'Real Python running in the browser (Pyodide)', chosen: true, why: 'Learners get genuine Python, with the same errors and behaviour they will see later on their own computer.' },
      { option: 'A lookalike Python interpreter', chosen: false, why: 'Teaches habits that break on real Python.' },
      { option: 'Static site; signing in is optional', chosen: true, why: 'No sign-up wall and no cost per learner. Sign-in only adds syncing across devices.' },
      { option: 'Accounts and a backend from day one', chosen: false, why: 'A sign-up wall before the first line of code.' },
    ],
    northStar: { metric: 'Time from landing on the site to running your first code', why: 'Every second between arriving and seeing code run is where beginners drop off.' },
    results: [
      { status: 'shipped', text: '20 stages and 56 exercises across 3 tracks, all runnable in the browser.' },
      { status: 'notyet', text: 'No usage numbers yet. Progress is saved in each learner\'s browser, not on a server.' },
    ],
  },

  // Source: sqlquest/PRODUCT.md, plus facts already published on this site
  'sqlquest-learn-sql-on-real-postgres': {
    problem: 'Most SQL tutorials fake the database: canned result tables, or toy tools that accept only one "correct" answer. Learners never see a real query plan or a real error message, so the skill does not carry over to work.',
    users: 'People who need SQL for real work and start from zero: analysts, product managers, operations staff, junior engineers and career switchers.',
    job: { when: 'I need SQL for my job', want: 'learn each concept by running real queries against a real database', so: 'avoid being caught out the first time I query production data' },
    options: [
      { option: 'Real PostgreSQL 18 in the browser (PGlite)', chosen: true, why: 'Every lesson runs on the same engine learners will use at work.' },
      { option: 'Canned results, toy interpreters or hosted sandboxes', chosen: false, why: 'Fake behaviour, or a sign-up and time-outs before the first query.' },
      { option: 'Check the rows your query returns', chosen: true, why: 'Any correct query passes, including one better than ours.' },
      { option: 'Check the query text', chosen: false, why: 'Fails correct answers written differently.' },
      { option: 'Show real Postgres error messages', chosen: true, why: 'Reading real errors is a skill people need at work.' },
    ],
    results: [
      { status: 'shipped', text: '34 stages and 148 exercises, from the first SELECT to window functions, query plans and row-level security.' },
      { status: 'measured', text: 'A 204-test suite runs every exercise against the live database engine.' },
      { status: 'notyet', text: 'Not in use by other people yet, so there are no usage numbers.' },
    ],
  },
};
