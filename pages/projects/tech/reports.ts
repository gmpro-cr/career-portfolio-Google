import type { TechReportData } from './types';

/* ═══════════════════════════════════════════════════════════════
   The seven technical reports. Sourced from each repository on
   2026-10-12 (code, config and READMEs, not memory). Where a number
   is a product claim rather than a code fact, it matches the case
   study and the owner's confirmed answers.
   ═══════════════════════════════════════════════════════════════ */

const vaani: TechReportData = {
  summary: [
    'Vaani is a voice assistant for a bank. You talk to it the way you would talk to someone on the phone, and it can check a balance, block a card, raise a dispute, pay a bill or send money.',
    'The AI model does the talking, but it does not hold the keys. Every action goes through a separate piece of server code, the gateway, which checks who you are, whether the amount is within limits, whether you agreed to exactly what was read back to you, and whether you entered a one-time code. If any check fails, nothing happens, however convincing the conversation was.',
    'The bank is fictional (ABC Bank, with one demo customer, Priya Sharma), but the ledger, limits and checks are real code with real tests.',
  ],
  glance: [
    { label: 'Voice model', value: 'Gemini 2.5 Flash native audio (Live API)' },
    { label: 'Text model', value: 'Gemini 2.5 Flash, with three fallbacks' },
    { label: 'Database', value: 'Neon Postgres, double-entry ledger' },
    { label: 'Hosting', value: 'Vercel Functions holding a WebSocket' },
  ],
  models: {
    intro: 'Google models do the talking. None of them can read or write the database; they can only ask the gateway to act.',
    uses: [
      { name: 'Gemini 2.5 Flash native audio', provider: 'Google, Gemini Live API', when: 'every request', job: 'Listens to the caller and speaks back in real time. While it talks, it asks the gateway for actions (tool calls), for example "verify this PIN" or "quote this transfer".', why: 'Speech in, speech out, with no separate transcription and voice steps, so the conversation stays fast and natural. That is harder to audit, which is why both sides are transcribed and every action is checked outside the model.' },
      { name: 'Gemini 2.5 Flash', provider: 'Google, Gemini API', when: 'on demand', job: 'Runs the typed version of the same agent, used for text chat and the scripted test calls. Same 23 tools, same gateway.', why: 'Quick at many short tool-calling turns.' },
      { name: 'Gemini 3.7 Flash, Gemini 3 Flash preview, Gemini 2.5 Flash-Lite', provider: 'Google, Gemini API', when: 'fallback', job: 'Take over for the typed agent when the main model runs out of free quota.', why: 'Quota is counted per model, so a list of models multiplies the free budget. Moving on beats a 55-second wait in the middle of a call.' },
      { name: 'Llama 3.2 3B', provider: 'Ollama, on my laptop', when: 'development only', job: 'Runs the eval suite locally: hundreds of calls at no cost.', why: 'The gateway trusts no model, so a smaller model makes the conversation clumsier but not less safe.' },
    ],
    chains: [{
      title: 'When the main model runs out of quota',
      intro: 'The free tier allows about five requests a minute per model, and one conversational turn can use three. So the typed agent keeps an ordered list of models and moves down it instead of waiting.',
      links: ['Gemini 2.5 Flash', 'Gemini 3.7 Flash', 'Gemini 3 Flash preview', 'Gemini 2.5 Flash-Lite'],
      answeredBy: 1,
      failReason: 'free quota used up, so it is rested for 60 seconds',
    }],
  },
  map: {
    intro: 'Six parts. Follow one transfer from the caller\'s voice to the ledger and back. The dot is the request; the highlighted box is where it is now.',
    nodes: [
      { id: 'caller', label: 'The caller', sub: 'speaks on the bank page', kind: 'person', at: [10, 50], m: [27, 8] },
      { id: 'page', label: 'ABC Bank page', sub: 'microphone off until switched on', kind: 'browser', at: [32, 50], m: [73, 8] },
      { id: 'relay', label: 'Relay server', sub: 'Node.js; holds the API key', kind: 'server', at: [56, 50], m: [27, 36] },
      { id: 'live', label: 'Gemini Live', sub: 'listens, speaks, asks for tools', kind: 'ai', at: [84, 17], m: [73, 36] },
      { id: 'gateway', label: 'Tool gateway', sub: 'four gates and a policy engine', kind: 'server', at: [84, 55], m: [27, 66] },
      { id: 'ledger', label: 'Ledger', sub: 'Neon Postgres, double-entry', kind: 'data', at: [84, 88], m: [73, 90] },
    ],
    hops: [
      { from: 'caller', to: 'page', caption: 'The caller switches the microphone on and speaks. Nothing is heard until they do.' },
      { from: 'page', to: 'relay', caption: 'The page streams the audio to Vaani\'s own server over a WebSocket. The Google API key never reaches the browser.' },
      { from: 'relay', to: 'live', caption: 'The server passes the audio to Gemini Live, which listens and answers in speech.' },
      { from: 'live', to: 'relay', caption: 'The caller asks to send ₹12,000. The model cannot move money. It asks for a tool instead: transfer ₹12,000 to Rohan.' },
      { from: 'relay', to: 'gateway', caption: 'The server hands that request to the gateway, the only code that can touch accounts.' },
      { from: 'gateway', to: 'ledger', caption: 'Only after identity, limits, a read-back and a one-time code all pass does the gateway write the transfer to the ledger.', ms: 4200 },
      { from: 'gateway', to: 'relay', caption: 'The result goes back as structured data. Every attempt, refusals included, is written to an audit log that cannot be edited.' },
      { from: 'relay', to: 'live', caption: 'The model is given the real result, not its own guess, and says it out loud.' },
      { from: 'relay', to: 'page', caption: 'The caller hears the reply, and the balances on the page refresh from the ledger.' },
    ],
  },
  request: {
    title: 'One transfer, step by step',
    intro: 'A caller asks to send ₹12,000 to a saved payee. This is the order the code enforces. A call that skips any step did not happen.',
    steps: [
      { title: 'The caller says who they are', plain: 'Name and date of birth make the session "identified". That alone cannot read a balance.', detail: 'Trust levels: anonymous → identified (identify_caller) → authenticated (verify_pin). Every read needs authenticated.' },
      { title: 'They give their PIN', plain: 'Three wrong attempts lock the line, and no amount of talking unlocks it.', detail: 'PINs and one-time codes are redacted before the audit log is written and before the relay sends anything to the browser panel. Both paths share one redact() function, with a test that fails if they drift apart.' },
      { title: 'The model asks for a transfer and gets a quote', plain: 'The first call to a money tool never moves money. It returns a quote and an exact sentence for the assistant to read back.', detail: 'Money tools are two-phase. Call 1 runs policy and returns a confirmation token bound to a hash of the exact arguments, plus a canonical read-back ("₹12,000 to Rohan Mehta, ICICI Bank, ending 4471").' },
      { title: 'Limits are checked', plain: 'At most ₹25,000 per transfer and ₹1,00,000 a day; payees added in the last 24 hours are capped at ₹5,000; the balance must cover it. Unusually fast activity is sent to a human rather than refused.', detail: 'Policy is a pure function: no database, no clock, no I/O, and no override parameter, so adding one would be a visible, deliberate change.' },
      { title: 'The amount is read back', plain: 'The assistant reads the exact amount and payee. If the caller talks over the read-back, the confirmation is cancelled and must be repeated.', detail: 'A barge-in during a read-back invalidates the pending confirmation inside LiveSession.' },
      { title: 'A one-time code is entered', plain: 'The code is valid for 120 seconds and covers one movement only. A second transfer needs a new code.', detail: 'The step-up grant is checked before the token is spent, so a failed code does not burn the caller\'s confirmation. In the public demo the code is shown on screen because there is no SMS service.' },
      { title: 'The ledger records it', plain: 'Two entries are written, one out and one in, and they must add up to zero. If they do not, the database itself refuses.', detail: 'Money is BIGINT paise. A deferred constraint trigger checks the sum at COMMIT, inside a SERIALIZABLE transaction; solvency is checked after the postings land. A unique idempotency key means a repeated "yes" returns the original transfer instead of debiting twice.' },
      { title: 'The caller hears the result', plain: 'The model is told what actually happened and says it. The page refreshes from the ledger, so the caller sees the balance change rather than being told it changed.' },
    ],
  },
  mechanisms: [
    {
      title: 'A prompt is a request; a gateway is a guarantee',
      body: [
        'The system prompt asks the model to verify identity and read back transfers. But a prompt can be talked around, so every rule that matters is also enforced in the gateway, where conversation cannot reach it.',
        'The model can say anything. It can only do what the gateway permits, and every attempt is logged as data, whatever was said.',
      ],
      diagram: { kind: 'lanes', handoff: 'tool call, routed only through dispatch()', lanes: [
        { label: 'Agent', sub: 'inside the model', rampIndex: 0, steps: ['Ask and listen', 'Propose a tool call', 'Read the quote back', 'Ask for the code', 'Speak the result'] },
        { label: 'Gateway', sub: 'server code the model cannot see', rampIndex: 2, steps: ['Session live?', 'Trust level enough?', 'Token matches the quote?', 'Code valid?', 'Within policy?', 'Write to ledger'] },
      ] },
    },
    {
      title: 'A ledger that cannot be unbalanced',
      body: [
        'Balances are never stored; they are worked out from the entries, so there is no balance figure to drift out of step. Entries can be added but never edited or deleted. A mistake is corrected with a new, reversing transfer.',
        'These rules live in the database itself, so even someone writing raw SQL around the application cannot commit an unbalanced transfer.',
      ],
      diagram: { kind: 'flow', nodes: [
        { id: 'begin', label: 'Open a SERIALIZABLE transaction', type: 'start', forwardLabel: 'one unit of work' },
        { id: 'post', label: 'Write a debit and a matching credit, in paise' },
        { id: 'solvent', label: 'Check the balance after the postings land' },
        { id: 'sum', label: 'Do the postings sum to zero at COMMIT?', type: 'decision', forwardLabel: 'yes' },
        { id: 'done', label: 'Committed. Balances are derived from postings', type: 'output' },
      ] },
    },
    {
      title: 'The confirmation token',
      body: [
        'The model cannot fake a confirmation, because it never sees how a token is made. The token is tied to the exact amount and payee that were read out, so it cannot be spent on ₹99,000 or on a different person.',
      ],
      diagram: { kind: 'sequence', actors: ['Caller', 'Model', 'Gateway', 'Ledger'], messages: [
        { from: 1, to: 2, label: 'transfer(₹12,000, Rohan)', note: 'first call' },
        { from: 2, to: 1, label: 'token + read-back text', note: 'nothing posted' },
        { from: 1, to: 0, label: '"₹12,000 to Rohan Mehta, ending 4471?"' },
        { from: 0, to: 1, label: '"Yes", then the one-time code' },
        { from: 1, to: 2, label: 'transfer(…, token, code)' },
        { from: 2, to: 3, label: 'post, with idempotency key' },
      ] },
    },
  ],
  failures: [
    { title: 'The caller pushes back', body: 'A sympathetic story, "override the limit, I take responsibility", "skip the code, I can\'t reach my phone". The limits live in the gateway, so the model has nothing to give.' },
    { title: 'The same "yes" arrives twice', body: 'The idempotency key returns the original transfer. One instruction, one debit.' },
    { title: 'Someone tampers with a token', body: 'Forged, replayed, cross-session or edited tokens are rejected: each is bound to one session and a hash of the quoted arguments.' },
    { title: 'The voice connection drops', body: 'The server reconnects using the Live API\'s resumption handle. The caller\'s verified status is held on the server, so it is never lost. If the model goes quiet after a tool result, it is nudged.' },
    { title: 'A model runs out of quota', body: 'The typed agent moves to the next model in its list and rests the exhausted one for 60 seconds.' },
    { title: 'A confused model loops', body: 'The agent loop stops after a fixed number of tool calls, so a caller is never left listening to silence.' },
  ],
  testing: [
    { title: 'Ledger rules', body: 'The four invariants, solvency, credit limits and reversals; ten simultaneous transfers against one balance; sequential and simultaneous replays.' },
    { title: 'Gateway contract', body: 'The adversarial set: forged, replayed, cross-session and tampered tokens, a missing code, made-up account ids, ownership checks and redaction.' },
    { title: 'Policy', body: 'Every limit and every boundary, as a pure function with no database.' },
    { title: 'Scripted calls against the real model', body: '131 scenarios: 28 core regression calls plus 103 persona calls across 10 caller types, including Hindi, Hinglish and Devanagari. They check which tools were called and what the ledger shows, never the wording.' },
    { title: 'A real database in every test run', body: 'Tests start a throwaway PostgreSQL 18 (embedded-postgres), which speaks the same protocol as Neon, so nothing changes at deploy time.' },
  ],
  hosting: [
    { label: 'Page and server', value: 'Vercel. One Function serves the API and holds each call\'s WebSocket open (Fluid Compute).' },
    { label: 'Database', value: 'Neon Postgres, added through the Vercel Marketplace.' },
    { label: 'AI', value: 'Gemini API, free tier.' },
    { label: 'Health check', value: '/healthz confirms the database is reachable, not just that the server is up.' },
    { label: 'Running cost', value: 'Free tiers throughout. The daily Gemini quota is the real limit on how many calls it can take.' },
  ],
  limits: [
    'Calls are cut off at 5 minutes, Vercel\'s limit on a held connection on the Hobby plan, with no resume. Demo calls finish in under 2. Render has no such limit; a render.yaml is in the repo but not set up.',
    'The public demo shows the one-time code on screen. That is fine for a fictional customer on an unlisted URL and must be off for real users.',
    'Background noise can count as the caller interrupting, which cancels a pending confirmation. The behaviour is right; it needs a noise threshold.',
    'Containment (calls fully handled without a human) has not been measured.',
    'Hindi and Hinglish are covered by scripted tests, not by real callers.',
  ],
  glossary: [
    { term: 'Speech-to-speech model', def: 'A model that takes audio in and produces audio out, without a separate transcription step.' },
    { term: 'Tool call', def: 'A structured request from the model, such as transfer(amount, payee). Code decides whether to run it.' },
    { term: 'Gateway', def: 'The server code that sits between the model and the bank\'s data and enforces every rule.' },
    { term: 'Two-phase confirmation', def: 'First call quotes, second call executes, and only with a token from the first.' },
    { term: 'Step-up authentication', def: 'An extra check, here a one-time code, required for risky actions even after login.' },
    { term: 'Double-entry ledger', def: 'Every movement is recorded twice, out of one account and into another, and the two must cancel out.' },
    { term: 'Idempotency key', def: 'A unique id on a request, so repeating it has no extra effect.' },
    { term: 'Barge-in', def: 'The caller speaking while the assistant is still talking.' },
    { term: 'WebSocket', def: 'A connection that stays open so audio can flow both ways continuously.' },
    { term: 'Paise', def: 'One hundredth of a rupee. Money is stored as whole paise to avoid rounding errors.' },
  ],
  sources: 'the Vaani repository (README, src/agent/provider.ts, src/voice/live-session.ts, src/gateway, src/policy, tests), read on 12 October 2026.',
};

const spirit: TechReportData = {
  summary: [
    'AI Spirit lets you chat with AI versions of 350+ public figures and character types. You pick a persona, ask anything, and it replies in that persona\'s style, in English or Hindi, by text or voice.',
    'Two things make it more than a plain chatbot. Each persona remembers facts you have shared and a short summary of past conversations, and reads them before answering. And it never depends on a single AI model: it uses free models through OpenRouter, moves down a list when one is busy, and falls back to a different provider, Groq, if all of them are.',
    'Replies appear word by word. If the opening words show the model thinking out loud instead of answering, that reply is dropped before you see it and the next model answers.',
  ],
  glance: [
    { label: 'Chat models', value: 'Five free OpenRouter models, then Groq' },
    { label: 'Memory', value: 'Saved facts + rolling summaries in Supabase' },
    { label: 'Voice', value: 'Sarvam Bulbul v3' },
    { label: 'Hosting', value: 'Vercel (Mumbai region) + Supabase' },
  ],
  models: {
    intro: 'Every model here is on a free tier. Free tiers get withdrawn without notice, so no single model is load-bearing.',
    uses: [
      { name: 'Nemotron 3 Ultra 550B', provider: 'NVIDIA, via OpenRouter (free)', when: 'every request', job: 'First choice for writing the persona\'s reply.', why: 'Large, free, and good at holding a voice. One of five, not the only one.' },
      { name: 'Nemotron 3 Super 120B, dots-3 note, Gemma 4 31B, Gemma 4 26B', provider: 'OpenRouter (free)', when: 'fallback', job: 'Next in line when a model is rate-limited or leaks its reasoning.', why: 'Limits are counted per model, so a list multiplies the free budget.' },
      { name: 'gpt-oss-120b', provider: 'Groq (free tier)', when: 'fallback', job: 'Answers if every OpenRouter model is busy.', why: 'A different provider, so an OpenRouter-wide problem does not take chat down. Run at low reasoning effort because replies are one to three sentences. The model name is an environment setting, so the next retirement needs no code change.' },
      { name: 'The same free OpenRouter models (Nemotron 3 Super first)', provider: 'OpenRouter (free)', when: 'background', job: 'After your reply is sent: pull out lasting facts about you (name, city, job, interests) as JSON, and refresh a short summary of the conversation.', why: 'It runs after you have your answer, so you never wait for it. It replaced an older pattern-matching extractor that saved wrong facts.' },
      { name: 'Bulbul v3', provider: 'Sarvam AI', when: 'on demand', job: 'Reads replies aloud, with a voice chosen for each persona.', why: 'Built for Indian languages and accents.' },
    ],
    chains: [{
      title: 'When a free model is busy',
      intro: 'OpenRouter keeps retiring free models; in 2026 a run of retirements took chat down for weeks. Now five free models sit in order, Groq waits behind them, and a daily check emails me when a model in the list stops answering.',
      links: ['Nemotron 3 Ultra', 'Nemotron 3 Super', 'dots-3 note', 'Gemma 4 31B', 'Gemma 4 26B', 'Groq gpt-oss-120b'],
      answeredBy: 2,
      failReason: 'rate-limited, or it started thinking out loud',
    }],
  },
  map: {
    intro: 'Follow one message from your keyboard to the reply, and then the memory work that happens after you have your answer.',
    nodes: [
      { id: 'you', label: 'You', sub: 'type or speak', kind: 'person', at: [9, 50], m: [27, 8] },
      { id: 'app', label: 'AI Spirit page', sub: 'Next.js; shows the reply as it streams', kind: 'browser', at: [31, 50], m: [73, 8] },
      { id: 'api', label: 'Chat function', sub: 'Vercel serverless, Mumbai', kind: 'server', at: [55, 50], m: [27, 36] },
      { id: 'context', label: 'Date, time and news', sub: 'India time + top headlines', kind: 'external', at: [31, 14], m: [73, 36] },
      { id: 'db', label: 'Supabase', sub: 'accounts, chats, facts, summaries', kind: 'data', at: [55, 88], m: [27, 66] },
      { id: 'llm', label: 'Free models', sub: 'five on OpenRouter, then Groq', kind: 'ai', at: [84, 50], m: [73, 66] },
    ],
    hops: [
      { from: 'you', to: 'app', caption: 'You ask a persona something, by typing or speaking.' },
      { from: 'app', to: 'api', caption: 'The page sends it to the chat function, which first runs a word filter. Guests get a set number of messages before being asked to sign in.' },
      { from: 'api', to: 'db', caption: 'It loads the persona, the facts saved about you, and summaries of your past chats with this persona only.' },
      { from: 'api', to: 'context', caption: 'It adds today\'s date and time in India and, when set up, the day\'s top Indian headlines, so the persona is not stuck in the past.' },
      { from: 'api', to: 'llm', caption: 'The full prompt goes to the first free model, and the reply starts streaming back.' },
      { from: 'llm', to: 'api', caption: 'The opening words are checked. If the model is thinking out loud instead of answering, the next model is tried.', ms: 4000 },
      { from: 'api', to: 'app', caption: 'The reply appears on your screen as it is written.' },
      { from: 'api', to: 'db', caption: 'After you have your reply, the messages are saved, new facts about you are pulled out, and the conversation summary is refreshed.', ms: 4200 },
    ],
  },
  request: {
    title: 'One message, step by step',
    intro: 'What happens between pressing Send and reading the reply, and what happens after.',
    steps: [
      { title: 'A quick filter', plain: 'A word filter blocks abusive messages before anything else is spent on them.', detail: 'bad-words filter with an allow-list for words that are legitimate in philosophical or spiritual discussion. Runs synchronously, before any network call.' },
      { title: 'The persona and your history are loaded', plain: 'The persona\'s written definition, the facts saved about you, and short summaries of your earlier chats with this persona.', detail: 'Memories are fetched only with a persona slug; without one the code refuses, which stops one persona\'s memories leaking into another\'s chat.' },
      { title: 'Today is added', plain: 'The current date and time in India, and the day\'s top headlines when a news key is set, in English or Hindi to match the chat.', detail: 'NewsAPI top-headlines (country=in, 5 items), cached; skipped silently when NEWS_API_KEY is absent.' },
      { title: 'The prompt is assembled', plain: 'Persona definition, how well you know each other so far, what it remembers about you, and the past summaries go together into one instruction for the model.' },
      { title: 'A model writes the reply', plain: 'The first free model on the list starts writing. The reply is sent to you word by word as it arrives.', detail: 'Server-Sent Events. If every OpenRouter model is rate-limited, the error is caught and Groq streaming takes over, unless words already reached you, in which case the partial reply is kept rather than splicing two different replies together.' },
      { title: 'Leaked thinking is caught', plain: 'Some free models write out their internal reasoning. Tagged reasoning is stripped; untagged monologue is detected from its opening words, and that model is skipped.', detail: 'stripReasoning() removes <think> and channel-tagged blocks; looksLikeLeakedReasoning() flags untagged chain-of-thought phrasing. The opening of each stream is held back until that check runs.' },
      { title: 'Memory work, after you have your answer', plain: 'New facts about you are pulled out and saved, and a summary of the conversation is written or refreshed.', detail: 'Facts are extracted as JSON in eight categories (name, age, birth details, location, profession, interest, family, other); extraction never throws and simply retries on the next message. Summaries start after 4 messages, refresh every 6, and run about 80 words.' },
    ],
  },
  mechanisms: [
    {
      title: 'Memory in two layers',
      body: [
        'Layer one is facts: short, lasting things you have said about yourself, saved per persona. Layer two is a rolling summary of each conversation, so a persona can recall what you discussed last week, not just who you are.',
        'Both are written after the reply is sent, so remembering never slows down answering.',
      ],
      diagram: { kind: 'flow', nodes: [
        { id: 'msg', label: 'You send a message', type: 'start', forwardLabel: 'in' },
        { id: 'recall', label: 'Load this persona\'s facts and past summaries' },
        { id: 'assemble', label: 'Assemble: persona + memory + today + your message' },
        { id: 'gen', label: 'Next free model writes the reply' },
        { id: 'check', label: 'Is it an answer, not leaked reasoning?', type: 'decision', forwardLabel: 'clean', loopBackTo: 'gen', loopLabel: 'leak → next model' },
        { id: 'out', label: 'Stream it; then save facts and refresh the summary', type: 'output' },
      ] },
    },
    {
      title: 'Never one model away from an outage',
      body: [
        'A scheduled job runs every morning at 9:00 IST, sends a test prompt to every model on the list, and emails me if one has stopped working. Updating the list is then a one-line change.',
        'This exists because it went wrong: when OpenRouter withdrew several free models in 2026, chat was down for seven weeks.',
      ],
    },
    {
      title: 'Personas',
      body: [
        'Each persona has a written definition: background, voice, and what it should and should not talk about. A chef persona, for example, is told not to give business strategy.',
        'A relationship level, which grows as you keep talking to the same persona, is added to the prompt so the tone can warm up over time.',
      ],
    },
  ],
  failures: [
    { title: 'A free model is busy', body: 'The next model on the list answers. You do not see the skip.' },
    { title: 'Every OpenRouter model is busy', body: 'Groq\'s gpt-oss-120b answers instead.' },
    { title: 'A provider retires a model', body: 'The daily 9:00 IST check emails me, and the list is updated.' },
    { title: 'A stream fails part-way', body: 'Whatever already reached you is kept, rather than starting a second reply and splicing the two.' },
    { title: 'Fact extraction fails', body: 'It is skipped quietly and tried again on your next message. Your chat is unaffected.' },
    { title: 'No news key is set', body: 'The headlines are left out and everything else still works.' },
  ],
  testing: [
    { title: 'Unit tests', body: 'Reasoning stripping and leak detection, the date-and-news context, the conversation store, plain-text cleanup and the news service.' },
    { title: 'Persona evals', body: 'A regression check on what personas actually say, run against the live chat endpoint. Deterministic assertions only, no judge model, with a call budget and a dry-run mode that sends nothing.' },
    { title: 'Daily production probe', body: 'The 9:00 IST job tests every model in the list against the real providers.' },
  ],
  hosting: [
    { label: 'App and API', value: 'Vercel, Mumbai region (bom1).' },
    { label: 'Database and sign-in', value: 'Supabase: Postgres plus Google sign-in.' },
    { label: 'Payments', value: 'Razorpay subscriptions for the premium plan.' },
    { label: 'Analytics', value: 'Mixpanel.' },
    { label: 'AI cost', value: 'Free tiers on OpenRouter and Groq. One message can use up to three model calls (reply, fact extraction, summary), so the free daily cap is the real limit.' },
  ],
  limits: [
    'The free OpenRouter tier caps requests per day. Paid credit would raise it; for now it is the main constraint on growth.',
    'Different free models write slightly differently, so a persona\'s voice can shift a little depending on which model answered.',
    'Two retention ideas, that people who try several personas stay longer and that a persona messaging you first on your second visit lifts week-one retention, are hypotheses. They have not been confirmed in the analytics.',
    'Headlines are only included when a news key is configured.',
  ],
  glossary: [
    { term: 'Persona', def: 'A written character definition the model is asked to speak as.' },
    { term: 'System prompt', def: 'The instructions sent to the model before your message, setting who it is and what it knows.' },
    { term: 'OpenRouter', def: 'A service that gives one API to many AI models, including free ones.' },
    { term: 'Fallback chain', def: 'An ordered list of models; if one cannot answer, the next is tried.' },
    { term: 'Streaming', def: 'Sending the reply in small pieces as it is written, instead of all at once at the end.' },
    { term: 'Leaked reasoning', def: 'When a model writes out its private working instead of only the answer.' },
    { term: 'Fact extraction', def: 'Asking a model to list lasting facts from your message, as structured data.' },
    { term: 'Rolling summary', def: 'A short summary of a conversation, rewritten as it grows.' },
    { term: 'Text-to-speech', def: 'Turning written text into spoken audio.' },
    { term: 'Rate limit', def: 'A cap on how many requests a service accepts in a time window.' },
  ],
  sources: 'the AI Spirit repository (pages/api/chat.js, lib/gemini.js, lib/groq.js, lib/memorySystem.js, lib/realtimeContext.js, pages/api/tts.js, vercel.json, evals/), read on 12 October 2026.',
};

const credit: TechReportData = {
  summary: [
    'A credit appraisal memo (CAM) is the document a bank\'s credit committee reads before lending to a company. Writing one means pulling several years of figures out of annual reports, computing ratios, researching the company, and writing it all up. That took me 4 to 6 hours per proposal.',
    'CreditGuard splits the work by what each tool is good at. Python code gathers the financials and does every calculation, so no number is made up. A research agent searches the web for warning signs. Only then is an AI model asked to write, and it is told to use only the figures it was given.',
    'The analyst stays in charge. Each section shows how confident the system is and what to check, can be edited on its own, and exports to the Excel and PDF formats credit teams already use.',
  ],
  glance: [
    { label: 'Writing model', value: 'Gemini Flash-Lite, then Gemini Flash' },
    { label: 'Free fallbacks', value: 'NVIDIA NIM, OpenRouter, Groq' },
    { label: 'Data sources', value: 'Screener.in, Yahoo Finance, BSE, web search' },
    { label: 'Hosting', value: 'Vercel + Render + Supabase' },
  ],
  models: {
    intro: 'The models write and research. They never calculate: every ratio is computed in Python before a model sees it.',
    uses: [
      { name: 'Gemini Flash-Lite (latest)', provider: 'Google, Gemini API', when: 'every request', job: 'Writes the memo sections, runs the research loop (writes search queries and scores how complete the research is), and pulls figures out of uploaded documents.', why: 'Fast and inexpensive for many short, structured calls. The numbers are already computed, so the model only has to write well.' },
      { name: 'Gemini Flash (latest)', provider: 'Google, Gemini API', when: 'fallback', job: 'Second Gemini model, if Flash-Lite fails.', why: 'Same API, stronger model.' },
      { name: 'DeepSeek V4.1 Flash, Kimi K2.6, Nemotron 3 Super', provider: 'NVIDIA NIM (free)', when: 'fallback', job: 'Write sections when Gemini is unavailable.', why: 'Free, and the same OpenAI-style API as the other fallbacks, so one piece of code calls them all.' },
      { name: 'Nemotron 3 Super and Ultra', provider: 'OpenRouter (free)', when: 'fallback', job: 'Next in line after NVIDIA.', why: 'Another free provider, so one outage does not stop a memo.' },
      { name: 'Llama 3.3 70B', provider: 'Groq', when: 'fallback', job: 'Last resort.', why: 'Very fast, and on separate infrastructure from the rest.' },
      { name: 'Claude', provider: 'Anthropic, via the Claude Code command line', when: 'development only', job: 'Optional document extractor when the engine runs on my laptop.', why: 'Useful for comparing extraction quality. Not used by the hosted app.' },
    ],
    chains: [{
      title: 'When Gemini is unavailable',
      intro: 'Memo sections are written in parallel, so they can all hit a rate limit at once. A model that rate-limits is rested for 60 seconds so the other sections do not queue behind it, and the work moves to the next free provider.',
      links: ['Gemini Flash-Lite', 'Gemini Flash', 'NVIDIA NIM', 'OpenRouter', 'Groq'],
      answeredBy: 2,
      failReason: 'rate-limited or timed out, so it is rested for 60 seconds',
    }],
  },
  map: {
    intro: 'Three services and a database, all on free tiers. Follow one memo from the analyst\'s request to the export.',
    nodes: [
      { id: 'analyst', label: 'Credit analyst', sub: 'opens a case', kind: 'person', at: [9, 50], m: [27, 7] },
      { id: 'spa', label: 'CreditGuard app', sub: 'React + Vite, on Vercel', kind: 'browser', at: [29, 50], m: [73, 7] },
      { id: 'api', label: 'API server', sub: 'Express, on Render', kind: 'server', at: [49, 50], m: [27, 29] },
      { id: 'db', label: 'Supabase', sub: 'cases, sections, risk flags', kind: 'data', at: [49, 88], m: [73, 29] },
      { id: 'engine', label: 'Analysis engine', sub: 'Python FastAPI, on Render', kind: 'server', at: [70, 50], m: [27, 52] },
      { id: 'data', label: 'Financial data', sub: 'Screener.in, Yahoo Finance, BSE', kind: 'external', at: [70, 13], m: [73, 52] },
      { id: 'web', label: 'Web research', sub: 'DuckDuckGo + page fetch', kind: 'external', at: [91, 32], m: [27, 75] },
      { id: 'llm', label: 'Gemini + fallbacks', sub: 'writes from fixed numbers', kind: 'ai', at: [91, 75], m: [73, 75] },
    ],
    hops: [
      { from: 'analyst', to: 'spa', caption: 'The analyst opens a case and names the company. Listed companies can be fetched by name.' },
      { from: 'spa', to: 'api', caption: 'The app talks to the API server, which keeps cases, memo sections and risk flags.' },
      { from: 'api', to: 'engine', caption: 'Heavy work goes to the Python engine, which only accepts calls carrying an internal token.' },
      { from: 'engine', to: 'data', caption: 'It pulls three years of profit and loss, balance sheet, cash flow and shareholding, the share price, and annual reports.' },
      { from: 'engine', to: 'web', caption: 'The research agent searches the web in rounds for share pledging, rating actions, court cases and sector trouble, and stops once it judges its picture at least 85% complete.', ms: 4400 },
      { from: 'engine', to: 'llm', caption: 'Ratios and risk flags are already computed. The model writes each section from those fixed numbers.' },
      { from: 'engine', to: 'api', caption: 'Each section comes back with a confidence label and a note of what to verify.' },
      { from: 'api', to: 'db', caption: 'Sections are saved one by one, so the analyst can redo one without regenerating the rest.' },
      { from: 'api', to: 'spa', caption: 'The analyst reviews, edits and exports to Excel or PDF.' },
    ],
  },
  request: {
    title: 'One memo, step by step',
    intro: 'From a company name to an exported memo. Steps 1 to 3 involve no AI at all.',
    steps: [
      { title: 'Gather the figures', plain: 'Three years of financial statements and shareholding from Screener.in, the share price from Yahoo Finance, annual reports from BSE, and any PDFs the analyst uploads. Fewer than three years of history is flagged as not enough.', detail: 'Screener.in scrape (P&L, balance sheet, cash flow, ratios, shareholding), yfinance quote, BSE annual-report fetch; uploaded PDFs parsed with PDFMiner; validators enforce data sufficiency.' },
      { title: 'Compute the ratios', plain: 'Debt service coverage, debt to equity, interest coverage, working-capital days and more, all in Python.', detail: 'Deterministic ratio engine plus a credit-score module; the LLM receives the results as JSON and never recomputes them.' },
      { title: 'Flag the risks', plain: 'Rules raise flags with a severity and the evidence behind them, for example profit not backed by cash from operations, very high inventory days, or debt rising fast.', detail: 'risk_flags.generate_risk_flags(ratios, financials) returns high/medium/low flags with evidence strings.' },
      { title: 'Research the company', plain: 'The agent writes its own search queries, reads what it finds, notes what it still does not know, and searches again, until it is at least 85% sure it has the picture.', detail: 'At least 2 rounds, 4 by default, up to 5 if completeness is below 50%; 3 model-written queries per round, 3 DuckDuckGo results each, 2 full pages fetched per round at up to 2,500 characters; social sites skipped.' },
      { title: 'Treat web text as untrusted', plain: 'A web page could contain text written to manipulate an AI. Fetched pages are marked as untrusted, and instruction-like phrases are removed before the model reads them.', detail: 'guardrails.sanitize_web_content() neutralises patterns such as "ignore previous instructions" or fake system/assistant tags; wrap_untrusted() delimits the text and the prompt tells the model to treat it as data.' },
      { title: 'Write the memo', plain: 'Two modes: a quick 8-section memo, or a detailed CAM of 21 sections (18 written sections plus an early-warning checklist, a reference check, and a list of information still needed from the relationship manager).', detail: 'memo.generate_cam_memo() for the quick memo; cam_v2.generate() for the detailed one, drafted section by section in parallel.' },
      { title: 'Check the numbers in the prose', plain: 'A figure audit checks that numbers quoted in the text match the computed ratios, and unsupported claims about the company\'s conduct are removed.', detail: 'The audit attributes a number only to its own ratio label and excludes peer and industry figures from the borrower check.' },
      { title: 'Review and export', plain: 'The analyst edits any section and exports to Excel or PDF.', detail: 'OpenPyXL for Excel; PDF export with fixed column widths for wide financial spreads.' },
    ],
  },
  mechanisms: [
    {
      title: 'Python does the maths, the model writes',
      body: [
        'Language models are unreliable at arithmetic, and every number in a credit memo has to be exact. So the split is strict: the engine owns every figure, and the model only writes the narrative from verified data.',
        'That one decision fixed most of the accuracy problems in early versions.',
      ],
      diagram: { kind: 'lanes', handoff: 'hand-off: verified figures as JSON', lanes: [
        { label: 'Python engine', sub: 'no AI, no guessing', rampIndex: 1, steps: ['Fetch financials', 'Validate 3+ years', 'Compute ratios', 'Raise risk flags'] },
        { label: 'AI layer', sub: 'writing only', rampIndex: 3, steps: ['Research the web', 'Draft each section', 'Confidence + what to verify', 'Figure audit', 'Analyst edits, exports'] },
      ] },
    },
    {
      title: 'A research loop with a stopping rule',
      body: [
        'One search is rarely enough, and endless searching is slow. The agent scores its own knowledge after each round and stops at 85%. Setting that threshold was a product decision: low enough to finish, high enough not to hand over a shallow summary when more was findable.',
      ],
      diagram: { kind: 'flow', nodes: [
        { id: 'seed', label: 'Start: company name and sector', type: 'start', forwardLabel: 'begin' },
        { id: 'search', label: 'Model writes 3 queries; search and read pages' },
        { id: 'gather', label: 'Note what was found and what is still missing' },
        { id: 'score', label: 'Completeness of 85% or more?', type: 'decision', forwardLabel: 'yes', loopBackTo: 'search', loopLabel: 'no, search again' },
        { id: 'brief', label: 'Research brief passed to the memo writer', type: 'output' },
      ] },
    },
  ],
  failures: [
    { title: 'Gemini is down or rate-limited', body: 'The section moves to NVIDIA NIM, then OpenRouter, then Groq. A model that rate-limits is rested for 60 seconds.' },
    { title: 'The servers are asleep', body: 'Free Render services sleep after about 15 minutes idle. The first request after that takes 30 to 50 seconds to wake them.' },
    { title: 'Not enough history', body: 'With fewer than three years of financials, the data is flagged as insufficient instead of being stretched.' },
    { title: 'A web page tries to instruct the model', body: 'Instruction-like text is neutralised and the page is marked as untrusted data.' },
    { title: 'A search fails', body: 'It is logged and the research continues with what it already has.' },
    { title: 'Prose and numbers disagree', body: 'The figure audit catches numbers in the text that do not match the computed ratios.' },
  ],
  testing: [
    { title: 'Unit tests', body: 'Ratios, the credit risk engine, credit score, memo sections and tables, consistency across the CAM, guardrails, the fallback chain, the figure audit and the PDF format.' },
    { title: 'Golden memos', body: 'Reference memos checked with free, rule-based assertions on every run.' },
    { title: 'Model-as-judge (opt-in)', body: 'A model scores sections from 1 to 5 on coherence, actionability and grounding. It costs quota, so it only runs when asked.' },
  ],
  hosting: [
    { label: 'Web app', value: 'Vercel.' },
    { label: 'API server and engine', value: 'Render, free tier (two services).' },
    { label: 'Database and files', value: 'Supabase Postgres, with a storage bucket for uploaded documents.' },
    { label: 'AI', value: 'Gemini API, with free NVIDIA NIM, OpenRouter and Groq fallbacks.' },
    { label: 'Running cost', value: 'Free tiers throughout; the cost is the cold start after the services sleep.' },
  ],
  limits: [
    'The time saving (4 to 6 hours down to under 1) was measured on my own proposals, not across a team.',
    'It has been built and tested on public company data. It has not been used inside a bank\'s systems.',
    'Sign-in is switched off in the current version and is due to be added back.',
    'Free hosting sleeps when idle, so the first request of a session is slow.',
  ],
  glossary: [
    { term: 'CAM', def: 'Credit Appraisal Memorandum: the memo a credit committee reads before approving a loan.' },
    { term: 'DSCR', def: 'Debt service coverage ratio: operating profit divided by the interest and principal due. Below 1 means the company cannot cover its repayments from earnings.' },
    { term: 'Debt to equity', def: 'How much the company has borrowed for every rupee its owners have put in.' },
    { term: 'Interest coverage', def: 'How many times operating profit covers the interest bill.' },
    { term: 'Risk flag', def: 'A rule-based warning, such as profit not turning into cash.' },
    { term: 'Prompt injection', def: 'Text written to trick an AI model into following instructions it should ignore.' },
    { term: 'Confidence label', def: 'High, medium or low, shown on each section, with what the analyst should check.' },
    { term: 'EWS', def: 'Early-warning signals: the triggers a bank watches after lending.' },
    { term: 'Cold start', def: 'The delay when a sleeping free server has to start up again.' },
  ],
  sources: 'the CreditGuard repository (README, DEPLOY.md, python-service: llm_providers.py, researcher.py, guardrails.py, cam_v2.py, memo.py, main.py, tests, evals), read on 12 October 2026.',
};

const job: TechReportData = {
  summary: [
    'Every morning I used to open six job sites, run the same searches and wade through the same irrelevant listings. That was about two hours a day.',
    'The agent does it twice a day on a schedule, at 7 am and 7 pm IST. It collects new listings, drops repeats, throws out listings that are clearly wrong (wrong level, or almost no description), and scores the rest from 0 to 100 against my CV. Only listings at 65 or above reach my inbox.',
    'Scoring does not use a chatbot-style model. It uses fixed rules plus a small embedding model that measures how similar a job reads to my profile. That keeps it free, fast and consistent: the same listing always gets the same score. Larger models are only used for optional extras, such as drafting an outreach message.',
  ],
  glance: [
    { label: 'Scoring', value: 'Rules + MiniLM embeddings, no chatbot model' },
    { label: 'Schedule', value: 'GitHub Actions, 7 am and 7 pm IST' },
    { label: 'Data', value: 'Neon Postgres + Vercel Blob' },
    { label: 'Who uses it', value: 'Me, for my own job search' },
  ],
  models: {
    intro: 'One small model does the everyday work. Larger models are called only by optional features. The first version scored every listing with Mistral 7B running on my laptop; scoring has since moved to rules plus embeddings, which run on a free cloud machine and give the same score every time.',
    uses: [
      { name: 'all-MiniLM-L6-v2', provider: 'sentence-transformers, runs inside the scraper', when: 'every request', job: 'Turns each job description and my profile into lists of numbers (embeddings) and measures how close they are. Adds up to 20 points to a job\'s score.', why: 'Small enough for a free GitHub Actions machine, no API cost, and deterministic.' },
      { name: 'Llama 3.1 8B', provider: 'OpenRouter (free)', when: 'on demand', job: 'Turns a search typed in plain English on the dashboard into filters.', why: 'A small, free model is enough to pull fields out of one sentence.' },
      { name: 'Gemini 2.0 Flash', provider: 'Google, Gemini API', when: 'on demand', job: 'In optional agent mode: re-scores a shortlist with written reasons and drafts outreach messages to hiring managers, for my approval.', why: 'Free tier. Calls are spaced 4.1 seconds apart to stay under 15 a minute.' },
      { name: 'Claude Haiku 4.5', provider: 'Anthropic, via OpenRouter', when: 'fallback', job: 'Takes over agent-mode tasks if Gemini fails.', why: 'Reliable structured output when the free model is unavailable.' },
      { name: 'Llama 3.2 3B', provider: 'Ollama, on my laptop', when: 'development only', job: 'First choice for agent mode when run locally.', why: 'Free and private.' },
    ],
    chains: [{
      title: 'Agent mode: which model writes',
      intro: 'The optional agent mode tries a model on the machine first, then the cloud.',
      links: ['Llama 3.2 3B (local)', 'Gemini 2.0 Flash', 'Claude Haiku 4.5'],
      answeredBy: 1,
      failReason: 'not running on this machine',
    }],
  },
  map: {
    intro: 'A scheduled job does the searching; a small dashboard shows the results. Follow one run.',
    nodes: [
      { id: 'cron', label: 'Scheduled run', sub: 'GitHub Actions, twice a day', kind: 'server', at: [10, 30], m: [27, 7] },
      { id: 'sites', label: 'Six job sites', sub: 'LinkedIn, Naukri, Indeed, HiringCafe, Wellfound, IIMJobs', kind: 'external', at: [37, 14], m: [73, 7] },
      { id: 'score', label: 'Filter and score', sub: 'rules + MiniLM embeddings', kind: 'ai', at: [37, 66], m: [27, 32] },
      { id: 'db', label: 'Neon Postgres', sub: 'jobs, my CV, scores, status', kind: 'data', at: [63, 66], m: [73, 32] },
      { id: 'mail', label: 'Email digest', sub: 'Gmail SMTP', kind: 'external', at: [63, 14], m: [27, 57] },
      { id: 'me', label: 'Me', sub: 'a short read', kind: 'person', at: [89, 32], m: [73, 57] },
      { id: 'dash', label: 'Dashboard', sub: 'Flask, on Vercel', kind: 'browser', at: [89, 84], m: [27, 84] },
    ],
    hops: [
      { from: 'cron', to: 'sites', caption: 'At 7 am and 7 pm IST a free GitHub Actions machine starts and collects new listings from six sites.' },
      { from: 'sites', to: 'score', caption: 'Each listing gets a fingerprint (site, company, role, location) and repeats are dropped. Listings at the wrong level or with almost no description are thrown out.', ms: 4200 },
      { from: 'score', to: 'db', caption: 'The rest are scored from 0 to 100 against my CV and saved with their score breakdown.' },
      { from: 'db', to: 'mail', caption: 'The best matches at 65 or above that I have not been sent in the last 7 days go out as one email.' },
      { from: 'mail', to: 'me', caption: 'I read a short digest instead of searching for two hours.' },
      { from: 'me', to: 'dash', caption: 'When I want more, the dashboard shows every job, why it scored what it did, and where each application stands.' },
      { from: 'dash', to: 'db', caption: 'The dashboard reads and writes the same database the scheduled run fills.' },
    ],
  },
  request: {
    title: 'One scheduled run, step by step',
    intro: 'What happens twice a day without me pressing anything.',
    steps: [
      { title: 'Collect', plain: 'Searches for my target roles in my locations on six sites. Pages are cached for 12 hours so a site is not hit twice for the same thing.', detail: 'scrapers.scrape_all_portals(); Selenium (headless Chrome) where a site needs a browser, plain HTTP where it does not. Runs in GitHub Actions with a 150-minute budget.' },
      { title: 'Remove repeats', plain: 'The same job is often on several sites. Each gets a fingerprint and duplicates are dropped.', detail: 'Job id = hash of portal + company + role + location; insert skips existing ids.' },
      { title: 'Quality gate', plain: 'Listings that are clearly wrong are thrown out before scoring: the wrong level, too senior, or a description too thin to judge.', detail: 'analyzer.quality_gate() returns (passed, reason), e.g. wrong_level, overqualified_level, thin_description.' },
      { title: 'Score with rules', plain: 'Points for a matching title, location, my skills, a banking or financial-services background, an AI background, and preferred industries. A clearly irrelevant field scores zero.', detail: 'Title 0–30 (synonym-expanded, fuzzy), location 0–10, CV-skill overlap 0–20 (5 per strong hit), BFSI 0–20, AI 0–20, other preferred industry 0–5. An irrelevant-domain title is a hard zero.' },
      { title: 'Add meaning', plain: 'The embedding model adds up to 20 points when the job reads close to my profile, even if the words differ. It can only lift a score, never lower it.', detail: 'blended = deterministic + 20 × semantic/100, clamped to 0–100. The deterministic score is the floor.' },
      { title: 'Cut at 65', plain: 'Listings at 65 or above qualify. Everything is saved, but only those reach the digest.', detail: 'min_relevance_score in config.json; the threshold is the product\'s most important setting.' },
      { title: 'Send the digest', plain: 'The top matches I have not been sent in the last week go out in one email, and are marked as sent.', detail: 'select_digest_jobs(top_n=10, days=7) prefers unsent jobs and backfills so the digest is never empty; Gmail SMTP.' },
    ],
  },
  mechanisms: [
    {
      title: 'How a listing is scored',
      body: [
        'Rules do most of the work because they are explainable: the dashboard shows exactly which parts of a job earned its points. The embedding model handles what rules miss, such as a "Credit Product Lead" role that never uses my exact title.',
        'Scores tend to cluster when meaning alone is used, so meaning is a bonus on top of the rules, not a replacement for them.',
      ],
      diagram: { kind: 'flow', nodes: [
        { id: 'in', label: 'New listing', type: 'start', forwardLabel: 'check' },
        { id: 'gate', label: 'Quality gate: level and description length' },
        { id: 'rules', label: 'Rules: title, location, skills, BFSI, AI, industry' },
        { id: 'sem', label: 'Embeddings: up to +20 for similar meaning' },
        { id: 'cut', label: 'Score of 65 or more?', type: 'decision', forwardLabel: 'yes' },
        { id: 'out', label: 'Into the digest if not sent in the last 7 days', type: 'output' },
      ] },
    },
    {
      title: 'Optional agent mode',
      body: [
        'Triggered from the dashboard, never on its own. It takes fresh jobs, has a model score and explain a shortlist, finds hiring managers where a contact-data key is set, drafts outreach messages, and queues everything for my approval. Nothing is sent without me.',
      ],
      diagram: { kind: 'flow', nodes: [
        { id: 'fetch', label: 'Fetch fresh jobs', type: 'start', forwardLabel: 'then' },
        { id: 'llm', label: 'Model scores and explains (shortlist at 50+)' },
        { id: 'dedup', label: 'Remove duplicates' },
        { id: 'hm', label: 'Find hiring managers (if a contact key is set)' },
        { id: 'draft', label: 'Draft outreach messages' },
        { id: 'queue', label: 'Queue for my approval; email me the queue', type: 'output' },
      ] },
    },
  ],
  failures: [
    { title: 'A site blocks or changes its layout', body: 'That site returns nothing for the run; the other five carry on, and the run reports per-site results.' },
    { title: 'Two runs overlap', body: 'Runs are queued, never run side by side, so they cannot race the same database and send an email twice.' },
    { title: 'A run is cut off part-way', body: 'The time budget was raised to 150 minutes after a cut-off run left jobs unmarked and caused repeat emails.' },
    { title: 'The embedding model is unavailable', body: 'Scoring falls back to rules only.' },
    { title: 'No CV on file', body: 'It scores on title, location and domain only, and says so.' },
  ],
  testing: [
    { title: 'Scorer', body: 'Each scoring band, the irrelevant-domain gate and the blend with embeddings.' },
    { title: 'Embeddings', body: 'Vector creation, similarity, and embedding jobs during a scrape.' },
    { title: 'Database and pipeline', body: 'Storage, de-duplication, the routine runner and the scrapers that feed it.' },
  ],
  hosting: [
    { label: 'Scheduled runs', value: 'GitHub Actions, free minutes on a public repository.' },
    { label: 'Database', value: 'Neon Postgres (Singapore region).' },
    { label: 'Files', value: 'Vercel Blob for digests and generated documents.' },
    { label: 'Dashboard', value: 'Flask on Vercel, with Google sign-in.' },
    { label: 'Running cost', value: 'Free. The embedding model runs on the Actions machine, so scoring has no API cost.' },
  ],
  limits: [
    'The scoring is tuned to my own profile (the banking and AI bands are mine). For anyone else it would need retuning.',
    'It is a personal tool. Opening it to other users was considered and shelved: the hosting cost and complexity were not justified.',
    'Scrapers break when a site changes its pages, and need fixing by hand.',
  ],
  glossary: [
    { term: 'Embedding', def: 'A list of numbers that captures what a piece of text means, so two texts can be compared.' },
    { term: 'Cosine similarity', def: 'A measure of how close two embeddings point: 1 is identical meaning, 0 is unrelated.' },
    { term: 'Deterministic', def: 'Gives the same answer every time for the same input.' },
    { term: 'Quality gate', def: 'A filter that removes obviously wrong listings before scoring.' },
    { term: 'Fingerprint', def: 'A short id built from site, company, role and location, used to spot repeats.' },
    { term: 'Cron', def: 'A schedule that starts a job at fixed times.' },
    { term: 'Headless browser', def: 'A real browser running without a window, for sites that need one.' },
    { term: 'LangGraph', def: 'A library for wiring AI steps into a fixed sequence, used for agent mode.' },
  ],
  sources: 'the job-search-agent repository (scorer.py, analyzer.py, embeddings.py, scrape_and_push.py, agent/, .github/workflows/scrape.yml, CLAUDE.md, tests), read on 12 October 2026.',
};

const book: TechReportData = {
  summary: [
    'AI Engineering by Chip Huyen is a 535-page book on building products with foundation models. I read it end to end and turned it into a site you can navigate: 10 chapters, each broken into sections, key ideas, terms and takeaways, with 29 diagrams.',
    'You can also ask the book a question. The site does not ask an AI model what it happens to know. It first finds the six passages of the book most related to your question, and the model answers from those passages only, naming the chapter each point came from. If nothing relevant is found, it says so instead of guessing.',
  ],
  glance: [
    { label: 'Answer model', value: 'Gemini 2.5 Flash' },
    { label: 'Search', value: 'TF-IDF over 1,325 passages of the book' },
    { label: 'Pages', value: 'React 19 + Vite; chapters load on demand' },
    { label: 'Hosting', value: 'Vercel, one serverless function' },
  ],
  models: {
    intro: 'One model, called only when you ask a question. The chapter notes and diagrams are written content, not generated on the fly.',
    uses: [
      { name: 'Gemini 2.5 Flash', provider: 'Google, Gemini API', when: 'on demand', job: 'Writes the answer from six retrieved passages, in its own words, citing chapters like "(Ch. 6)".', why: 'Fast, and the passages already hold the facts. Temperature 0.3 keeps it close to the text. The model is an environment setting, so it can change without a code change.' },
    ],
  },
  map: {
    intro: 'Reading a chapter needs no server at all. Asking a question uses one function and one model call.',
    nodes: [
      { id: 'reader', label: 'Reader', sub: 'reads or asks', kind: 'person', at: [9, 50], m: [27, 8] },
      { id: 'site', label: 'Guide site', sub: 'React; chapters load on demand', kind: 'browser', at: [33, 50], m: [73, 8] },
      { id: 'notes', label: 'Chapter notes', sub: '10 structured data files', kind: 'data', at: [33, 13], m: [27, 36] },
      { id: 'fn', label: 'Ask function', sub: 'Vercel serverless', kind: 'server', at: [60, 50], m: [73, 36] },
      { id: 'index', label: 'Book passages', sub: '1,325 chunks, kept on the server', kind: 'data', at: [60, 88], m: [27, 66] },
      { id: 'gemini', label: 'Gemini 2.5 Flash', sub: 'answers from passages only', kind: 'ai', at: [87, 50], m: [73, 66] },
    ],
    hops: [
      { from: 'reader', to: 'site', caption: 'You open a chapter. Only that chapter is downloaded.' },
      { from: 'site', to: 'notes', caption: 'Its sections, terms and diagrams come from structured notes written from the book. Nothing here is generated live.' },
      { from: 'reader', to: 'site', caption: 'You press Cmd or Ctrl + K and ask a question.' },
      { from: 'site', to: 'fn', caption: 'The question, up to 600 characters, goes to one serverless function.' },
      { from: 'fn', to: 'index', caption: 'It scores every passage for overlap with the important words in your question and keeps the top six.', ms: 4000 },
      { from: 'fn', to: 'gemini', caption: 'Gemini gets those six passages and strict rules: answer only from them, in your own words, and cite the chapter.' },
      { from: 'gemini', to: 'fn', caption: 'The answer comes back.' },
      { from: 'fn', to: 'site', caption: 'You read it with the chapters it drew on, and can jump straight to them.' },
    ],
  },
  request: {
    title: 'One question, step by step',
    intro: 'This pattern is called retrieval-augmented generation (RAG): find the relevant text first, then let the model write from it.',
    steps: [
      { title: 'Clean up the question', plain: 'Common words like "the", "how" and "what" are dropped. What is left are the words that carry meaning.', detail: 'Lower-cased, split on non-alphanumerics, tokens of one character and a fixed stop-word list removed.' },
      { title: 'Score every passage', plain: 'A passage scores higher when it contains your important words, especially rare ones. "Chunking" counts for more than "model", which appears everywhere.', detail: 'Index built lazily on the first request. idf = ln((N + 1) / (df + 0.5)); score = Σ idf × (1 + ln tf) over query terms.' },
      { title: 'Keep the best six', plain: 'The six highest-scoring passages, about a thousand characters each, are kept. If none match at all, you are told so and no model is called.' },
      { title: 'Ask the model, with rules', plain: 'Answer only from these passages. Paraphrase; quote at most a short phrase. Cite chapters. If the answer is not there, say so and suggest a chapter. Stay on the book\'s topics.', detail: 'Gemini generateContent with temperature 0.3 and up to 1,200 output tokens.' },
      { title: 'Return answer and sources', plain: 'You get the answer plus the list of chapters used, so you can check it against the source.' },
    ],
  },
  mechanisms: [
    {
      title: 'Finding the right passages',
      body: [
        'The whole book is split into 1,325 passages, which stay on the server; your browser never downloads the book.',
        'Search is lexical: it matches words, not meaning. That makes it fast, free and private, but it can miss a question phrased very differently from the book.',
      ],
      diagram: { kind: 'sequence', actors: ['Reader', 'Site', 'Function', 'Passages', 'Gemini'], messages: [
        { from: 0, to: 1, label: 'question' },
        { from: 1, to: 2, label: 'POST /api/chat' },
        { from: 2, to: 3, label: 'score 1,325 passages', note: 'TF-IDF' },
        { from: 3, to: 2, label: 'top 6' },
        { from: 2, to: 4, label: 'passages + rules + question' },
        { from: 4, to: 2, label: 'answer with (Ch. N)' },
        { from: 2, to: 1, label: 'answer + chapter list' },
      ] },
    },
    {
      title: 'Chapters as data',
      body: [
        'Each chapter is a typed data file: sections, key concepts, terms, takeaways and links to other chapters. One template renders all ten, and one reusable diagram component draws all 29 diagrams.',
        'Chapters are split into separate downloads, so opening Chapter 6 does not load the other nine. What you have read is remembered in your browser.',
      ],
    },
  ],
  failures: [
    { title: 'Nothing relevant is found', body: 'You are told plainly and given the book\'s topics to try, and no model is called.' },
    { title: 'The question is off-topic', body: 'The model is instructed to steer back to the book rather than answer.' },
    { title: 'The model is unreachable', body: 'You get a clear error; the chapter notes keep working, since they need no server.' },
    { title: 'No API key is set', body: 'The chat explains it is not configured and points you to the chapters.' },
  ],
  testing: [
    { title: 'Content', body: 'Written from a full read of the book and checked against it by hand.' },
    { title: 'Automated tests', body: 'None yet. This is the weakest of the seven on testing, and the next thing to add is a set of questions with known answers.' },
  ],
  hosting: [
    { label: 'Site', value: 'Vercel, static files.' },
    { label: 'Question answering', value: 'One Vercel serverless function, with the book passages bundled server-side.' },
    { label: 'AI', value: 'Gemini API.' },
    { label: 'Running cost', value: 'Close to nothing: one model call per question, nothing for reading.' },
  ],
  limits: [
    'Word-matching search misses questions worded very differently from the book. Adding meaning-based search alongside it is the planned fix.',
    'Each question stands alone; it does not remember your previous question.',
    'No usage numbers yet, and no North Star metric set.',
    'No automated tests.',
  ],
  glossary: [
    { term: 'RAG', def: 'Retrieval-augmented generation: find relevant text first, then have a model write from it.' },
    { term: 'TF-IDF', def: 'A way to score text: words that appear often in a passage but rarely in the book count the most.' },
    { term: 'Passage (chunk)', def: 'A short slice of the book, about a thousand characters, that search can return.' },
    { term: 'Stop words', def: 'Very common words ignored by search because they carry little meaning.' },
    { term: 'Citation', def: 'Naming the chapter an answer came from, so it can be checked.' },
    { term: 'Serverless function', def: 'Code that runs on demand in the cloud, without a server to manage.' },
    { term: 'Temperature', def: 'How adventurous a model\'s wording is. Low keeps it close to the source.' },
  ],
  sources: 'the ai-engineering-guide repository (api/chat.ts, api/_book-data.js, src/lib, src/data/chapters, src/App.tsx), read on 12 October 2026.',
};

const pyquest: TechReportData = {
  summary: [
    'PyQuest teaches Python by having you write it from the first minute. There is nothing to install and no account needed.',
    'Real Python runs inside your browser tab. When you press Run, your code executes on your own computer, a hidden check decides whether it does what the exercise asked, and you get a hint if it does not. No server is involved, so it costs nothing per learner.',
    'Between stages there is a small tower-defence game, the Firewall, and the towers you can build are the ones the course has taught you.',
  ],
  glance: [
    { label: 'AI at run time', value: 'None' },
    { label: 'Python engine', value: 'Pyodide 0.26.4 (CPython in WebAssembly)' },
    { label: 'Backend', value: 'None: static files only' },
    { label: 'Sync', value: 'Optional Google sign-in, Firebase' },
  ],
  models: {
    intro: 'No model generates lessons or marks answers.',
    uses: [],
    none: 'Lessons, hints and answer checks are written by hand. Each exercise carries a small hidden Python check that decides whether your code is right. That makes marking instant, free and identical for every learner, and it can be tested: every one of the 56 exercises has a reference solution and known wrong answers that the test suite runs. The course was built with Claude Code; no model is called while you learn.',
  },
  map: {
    intro: 'Everything except the optional sync happens inside your browser.',
    nodes: [
      { id: 'you', label: 'Learner', sub: 'types code', kind: 'person', at: [9, 50], m: [27, 8] },
      { id: 'page', label: 'Lesson page', sub: 'plain JavaScript, no build step', kind: 'browser', at: [35, 50], m: [73, 8] },
      { id: 'cdn', label: 'jsDelivr CDN', sub: 'serves Pyodide once', kind: 'external', at: [63, 13], m: [27, 36] },
      { id: 'worker', label: 'Python worker', sub: 'Pyodide in a Web Worker', kind: 'browser', at: [63, 50], m: [73, 36] },
      { id: 'check', label: 'Hidden check', sub: 'Python assertions per exercise', kind: 'browser', at: [89, 50], m: [73, 64] },
      { id: 'store', label: 'Your browser storage', sub: 'XP and progress', kind: 'data', at: [35, 88], m: [27, 64] },
      { id: 'fb', label: 'Firebase (optional)', sub: 'Google sign-in + Firestore', kind: 'external', at: [63, 88], m: [50, 90] },
    ],
    hops: [
      { from: 'you', to: 'page', caption: 'You read one short idea and type code into the editor.' },
      { from: 'page', to: 'worker', caption: 'Pressing Run (or Ctrl/Cmd + Enter) sends your code to a background worker, so a slow or endless program can never freeze the page.' },
      { from: 'worker', to: 'cdn', caption: 'The first time, the worker downloads real Python, compiled to run in a browser. After that it is ready instantly.' },
      { from: 'worker', to: 'check', caption: 'Your code runs with its printed output captured. Then the exercise\'s hidden check runs against your code and its output.' },
      { from: 'check', to: 'worker', caption: 'The check passes, or fails with a specific hint.' },
      { from: 'worker', to: 'page', caption: 'You see the output, any error (the last lines of the real Python error), and whether you passed.' },
      { from: 'page', to: 'store', caption: 'XP and progress are saved in your browser. No account needed.' },
      { from: 'store', to: 'fb', caption: 'If you chose to sign in, progress also syncs so it follows you to another device. If that service is down, nothing is lost.' },
    ],
  },
  request: {
    title: 'One exercise, step by step',
    intro: 'From pressing Run to "Correct".',
    steps: [
      { title: 'Code goes to the worker', plain: 'Your code and the exercise\'s hidden check are posted to a background worker that runs Python.', detail: 'worker.postMessage({ type: "run", id, code, check }).' },
      { title: 'A safety timer starts', plain: 'If your program has not finished within 10 seconds (an endless loop, say), the worker is shut down and a fresh one starts.', detail: 'RUN_TIMEOUT_MS = 10000; worker.terminate() then re-boot.' },
      { title: 'Your code runs', plain: 'Everything you print is captured. If Python raises an error, the last two lines of the real error message are kept, because reading them is part of learning.', detail: 'exec(compile(code, "<your code>", "exec")) with stdout redirected to a StringIO.' },
      { title: 'The check runs', plain: 'The check sees your code and what it printed, and asserts what should be true, for example that a variable called city exists and the greeting uses it. A failed assertion carries the hint you see.', detail: 'Check and solution share one namespace; the check also gets _stdout and _code. AssertionError text becomes the feedback.' },
      { title: 'Result', plain: 'Output (trimmed if over 20,000 characters), any error, pass or fail, and the hint. XP and progress update in your browser.' },
    ],
  },
  mechanisms: [
    {
      title: 'How an answer is checked',
      body: [
        'Every exercise has a hidden check written in Python. It can fail in two ways that clicking around would never reveal: accepting wrong code, or rejecting right code. Both are tested on every exercise.',
      ],
      diagram: { kind: 'sequence', actors: ['Learner', 'Page', 'Worker', 'Check'], messages: [
        { from: 0, to: 1, label: 'Run' },
        { from: 1, to: 2, label: 'code + hidden check', note: '10 s timer starts' },
        { from: 2, to: 3, label: 'your code and its output' },
        { from: 3, to: 2, label: 'pass, or the hint' },
        { from: 2, to: 1, label: 'output, error, result' },
      ] },
    },
    {
      title: 'Progress without an account',
      body: [
        'Progress lives in your browser first. Signing in with Google is optional and only adds sync. The tricky part is the first sign-in on a device that already has progress: the two are merged, never overwritten, so finished stages are never lost.',
      ],
    },
    {
      title: 'The Firewall',
      body: [
        'A tower-defence game between stages, 19 sectors in all. The towers are tied to the stages that earned them, which is what makes the game part of the course rather than a break from it.',
      ],
    },
  ],
  failures: [
    { title: 'An endless loop', body: 'The 10-second timer shuts the worker down and starts a fresh one. The page never freezes.' },
    { title: 'Huge output', body: 'Output over 20,000 characters is trimmed, with a note of the full length.' },
    { title: 'The check cannot run', body: 'You are asked whether you renamed or removed something the task needs.' },
    { title: 'Python fails to load', body: 'A clear message instead of a dead button.' },
    { title: 'Sync is unreachable', body: 'Progress is already saved in the browser. The course must always open, run and save without an account.' },
  ],
  testing: [
    { title: 'Every exercise, both ways', body: 'For each of the 56 exercises: the reference solution must pass, an empty program must fail, and plausible wrong answers must fail too.' },
    { title: 'Course structure', body: 'Unique ids, complete fields, every check compiles and contains an assertion, every stage has a badge, and the top rank is reachable with the XP on offer.' },
    { title: 'Game balance', body: 'All 19 Firewall sectors replayed through the real game loop: a competent defence clears every sector, an empty board loses every one.' },
    { title: 'Sync merge', body: 'Signing in on a new device, both sides holding different work, malformed rows: finished work is never lost.' },
    { title: 'In the real engine', body: 'An in-browser page runs every solution through the site\'s own worker and real Pyodide.' },
  ],
  hosting: [
    { label: 'Site', value: 'Vercel, static files, no build step.' },
    { label: 'Python', value: 'Pyodide from the jsDelivr CDN.' },
    { label: 'Sync', value: 'Firebase Authentication and Firestore, free tier.' },
    { label: 'Running cost', value: 'Effectively zero per learner: the code runs on their machine.' },
  ],
  limits: [
    'The first run downloads the Python runtime, which takes a few seconds on a slow connection.',
    'Things that need a real operating system, such as network sockets or files on your computer, are not available in the browser.',
    'Hints are fixed text written per exercise, not tailored to your exact mistake.',
    'No usage numbers yet.',
  ],
  glossary: [
    { term: 'WebAssembly', def: 'A format that lets programs written for computers, such as the Python interpreter, run inside a browser at near-native speed.' },
    { term: 'Pyodide', def: 'The standard Python interpreter (CPython), compiled to WebAssembly.' },
    { term: 'Web Worker', def: 'A background thread in the browser, so heavy work does not freeze the page.' },
    { term: 'Traceback', def: 'Python\'s error report, showing what went wrong and where.' },
    { term: 'Assertion', def: 'A statement that must be true. If it is not, the check fails with a message.' },
    { term: 'localStorage', def: 'Small storage inside your browser that survives closing the tab.' },
    { term: 'Firestore', def: 'Google\'s cloud database, used here only for optional sync.' },
  ],
  sources: 'the pyquest repository (worker.js, app.js, sync.js, firewall.js, evals/README.md, PRODUCT.md), read on 12 October 2026.',
};

const sqlquest: TechReportData = {
  summary: [
    'SQLQuest teaches SQL on a real database. When the page loads, a complete PostgreSQL 18 database starts inside your browser tab, filled with sample tables. Every query you write runs against it for real, and you see real rows and real Postgres error messages.',
    'Answers are not marked by comparing your text with a model answer. The site runs the reference answer and your query against the same fresh data and compares the results. If your rows match, you pass, however you wrote it.',
  ],
  glance: [
    { label: 'AI at run time', value: 'None' },
    { label: 'Database', value: 'PostgreSQL 18 via PGlite (WebAssembly)' },
    { label: 'Marking', value: 'Compares result sets, not query text' },
    { label: 'Tests', value: '204, run against the real engine' },
  ],
  models: {
    intro: 'No model generates lessons or marks answers.',
    uses: [],
    none: 'Lessons and reference answers are written by hand. Marking compares real query results, which is exact, instant and free, and lets any correct query pass, not just the one I happened to write. The course was built with Claude Code; no model is called while you learn.',
  },
  map: {
    intro: 'The database, the checker and the lesson all live in your browser tab.',
    nodes: [
      { id: 'you', label: 'Learner', sub: 'writes a query', kind: 'person', at: [9, 50], m: [27, 8] },
      { id: 'page', label: 'Course page', sub: 'plain JavaScript', kind: 'browser', at: [33, 50], m: [73, 8] },
      { id: 'cdn', label: 'jsDelivr CDN', sub: 'serves PGlite once', kind: 'external', at: [62, 13], m: [27, 36] },
      { id: 'pg', label: 'PostgreSQL 18', sub: 'PGlite, inside the tab', kind: 'data', at: [62, 50], m: [73, 36] },
      { id: 'checker', label: 'Answer checker', sub: 'compares result sets', kind: 'browser', at: [33, 88], m: [27, 66] },
      { id: 'seed', label: 'Sample data', sub: 'reset to a clean state', kind: 'data', at: [88, 50], m: [73, 66] },
    ],
    hops: [
      { from: 'you', to: 'page', caption: 'You read one idea and type a query.' },
      { from: 'page', to: 'pg', caption: 'The page starts a real PostgreSQL 18 inside the tab.' },
      { from: 'pg', to: 'cdn', caption: 'The first time, the database engine (Postgres compiled to WebAssembly) downloads from a CDN.' },
      { from: 'pg', to: 'seed', caption: 'The stage\'s sample tables are loaded. Every stage starts from a clean, known database.' },
      { from: 'page', to: 'checker', caption: 'You press Run. The checker takes over.' },
      { from: 'checker', to: 'pg', caption: 'It resets the data, runs your query, then runs the reference answer on the same data.', ms: 4000 },
      { from: 'checker', to: 'page', caption: 'Same rows and columns: pass. Otherwise you get a specific reason, such as a missing column or three rows instead of five.' },
    ],
  },
  request: {
    title: 'One query, step by step',
    intro: 'What happens when you press Run.',
    steps: [
      { title: 'Start clean', plain: 'The sample data is reset first, so a second attempt behaves exactly like the first even if your last query changed the data.', detail: 'reseed(stage.id, stage.seed): drop schema public cascade, recreate it, drop any roles you created, replay the stage seed. All database work goes through one queue so two operations never interleave.' },
      { title: 'Run your query', plain: 'Your SQL runs for real. If Postgres reports an error, you see its exact message: reading real errors is a skill the course teaches.' },
      { title: 'Run the reference answer', plain: 'The reference answer runs on the same data. For exercises that change data, the data is reset first so both start from the same point.' },
      { title: 'Compare columns', plain: 'Same columns? If not, you are told which are missing or extra.' },
      { title: 'Compare rows', plain: 'Same rows? Order only matters when the exercise is about ordering.', detail: 'Values are normalised (stable key order for JSON). If the reference has ORDER BY outside a window function, rows are compared in order; otherwise as a multiset, so duplicates must still match.' },
      { title: 'Exercises that change data', plain: 'For INSERT, UPDATE, DELETE, new tables, triggers or roles, the query itself returns nothing useful, so the checker looks at the database afterwards instead.', detail: 'If exercise.check exists, it runs after your statement and after the reference solution, and the two resulting states are compared.' },
    ],
  },
  mechanisms: [
    {
      title: 'Marking by results, not text',
      body: [
        'There are many correct ways to write most queries. Comparing text would fail correct answers that happen to be written differently. Comparing results passes every correct answer and nothing else.',
      ],
      diagram: { kind: 'flow', nodes: [
        { id: 'reset1', label: 'Reset sample data', type: 'start', forwardLabel: 'then' },
        { id: 'mine', label: 'Run your query on the real database' },
        { id: 'reset2', label: 'Run the reference answer on the same data' },
        { id: 'cols', label: 'Compare columns, then rows' },
        { id: 'same', label: 'Same result?', type: 'decision', forwardLabel: 'yes' },
        { id: 'pass', label: 'Pass, however you wrote it', type: 'output' },
      ] },
    },
    {
      title: 'Why a real database',
      body: [
        'Most SQL tutorials fake the database with canned result tables. Here, every claim the course makes about SQL can be run on the page against PostgreSQL 18: window frames, query plans, recursive queries, row-level security. If a concept cannot be run, it does not go in a stage.',
        'The same engine that serves learners also gates releases: the test suite replays every exercise\'s seed data, reference answer and checker before each deploy, so a curriculum edit cannot silently break a lesson.',
      ],
      diagram: { kind: 'lanes', handoff: 'same engine, same exercises', lanes: [
        { label: 'Learner path', sub: 'in the browser tab', rampIndex: 0, steps: ['Stage seed SQL', 'Learner query', 'PGlite executes', 'Rows compared', 'Progress saved'] },
        { label: 'CI quality gate', sub: 'before every deploy', rampIndex: 3, steps: ['Every exercise replayed', 'Seed + solution + checker', '204 tests', 'All green → deploy'] },
      ] },
    },
  ],
  failures: [
    { title: 'A syntax error', body: 'You see Postgres\'s own error message, unedited.' },
    { title: 'You drop a table', body: 'The next run resets the stage\'s data, and a Reset button does the same on demand.' },
    { title: 'You create roles', body: 'Roles live outside the schema, so they are dropped separately on reset.' },
    { title: 'Two actions overlap', body: 'All database work runs through one queue, so two resets cannot collide.' },
  ],
  testing: [
    { title: 'Every exercise against the real engine', body: '204 tests run every reference answer against PostgreSQL 18 before each deploy, so a broken exercise never ships.' },
    { title: 'The checker itself', body: 'Ordering rules, column comparison, duplicates and data-changing exercises.' },
  ],
  hosting: [
    { label: 'Site', value: 'Vercel, static files.' },
    { label: 'Database engine', value: 'PGlite 0.5.4 from the jsDelivr CDN.' },
    { label: 'Analytics', value: 'Vercel Web Analytics.' },
    { label: 'Running cost', value: 'Effectively zero: the database runs on the learner\'s machine.' },
  ],
  limits: [
    'The first load downloads the database engine, which takes a few seconds on a slow connection.',
    'The database is single-user and lives only in your tab; your data is not kept between visits, only your progress.',
    'No users or North Star metric yet.',
  ],
  glossary: [
    { term: 'PostgreSQL', def: 'A widely used open-source database.' },
    { term: 'PGlite', def: 'PostgreSQL compiled to WebAssembly so it runs in a browser.' },
    { term: 'Result set', def: 'The rows and columns a query returns.' },
    { term: 'Multiset', def: 'A collection where order does not matter but duplicates do.' },
    { term: 'Window function', def: 'A calculation across related rows, such as a running total, without collapsing them.' },
    { term: 'Seed data', def: 'The sample rows loaded before an exercise.' },
    { term: 'Row-level security', def: 'Database rules that decide which rows each user may see.' },
  ],
  sources: 'the sqlquest repository (db.js, verify.js, test/, PRODUCT.md), read on 12 October 2026.',
};

export const REPORTS: Record<string, TechReportData> = {
  'vaani-voice-banking-agent': vaani,
  'ai-persona-interaction-platform': spirit,
  'ai-credit-intelligence-platform': credit,
  'automated-job-discovery-agent': job,
  'ai-engineering-field-guide': book,
  'pyquest-learn-python-by-writing-it': pyquest,
  'sqlquest-learn-sql-on-real-postgres': sqlquest,
};
