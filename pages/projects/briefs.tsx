/* ═══════════════════════════════════════════════════════════════
   Product briefs, one per case study.

   Sourcing rule: every line comes from the project's own repo (README,
   PRODUCT.md, design docs, PM framework) or from facts already published
   on this site, confirmed with the owner on 2026-09-23. Unvalidated claims
   are tagged 'hypothesis' and unmeasured ones 'notyet' -- never stated as
   results. Add nothing here that cannot be sourced.
   ═══════════════════════════════════════════════════════════════ */

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
