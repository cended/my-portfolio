// src/data/projects.ts
// Static automation project case studies. Not database-driven —
// per your call to drop the admin/DB approach for these.
//
// IMAGES NEEDED: each project references /images/projects/<slug>.png
// Drop your 8 workflow screenshots into public/images/projects/ using
// the exact filenames below. Until then, cards show a placeholder.

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface AutomationProject {
  slug: string;
  title: string;
  platform: "n8n" | "Make" | "Zapier";
  tag: string;
  cardDescription: string;
  briefDescription: string;
  businessProblem: string;
  solution: string;
  workflowSteps: WorkflowStep[];
  image: string;
}

export const PROJECTS: AutomationProject[] = [
  {
    slug: "xero-asana-csv",
    title: "Xero Account Transactions → Asana CSV Automation",
    platform: "Make",
    tag: "Finance Ops",
    cardDescription:
      "Every time an Asana task closes, a year of Xero transaction data is pulled, rebuilt into a real CSV, and attached automatically — even though Xero's API doesn't support that report natively.",
    briefDescription:
      "A Make.com scenario that solves a real API gap: Xero doesn't expose its Account Transactions report through its API, so this automation pulls the underlying transaction data directly, reconstructs it into the exact CSV format a person would get from a manual export, and attaches it automatically to the relevant Asana task the moment it's marked complete.",
    businessProblem:
      "A client needed a standard financial record attached to Asana every time a bookkeeping task closed out: a full Account Transactions report from Xero, in the same CSV format someone would get downloading it by hand from Reports. The obvious blocker was that Xero's API simply doesn't expose that report — it's not in the endpoint list. Most people would take that as the end of the conversation and go back to logging into Xero, running the report, downloading it, and attaching it to Asana manually, every single time a task closed.",
    solution:
      "Instead of treating the missing endpoint as a dead end, I found the nearest API-accessible equivalent — transaction-level data that maps to the same report — and rebuilt the formatting layer that Xero's UI normally handles for you. The scenario triggers the moment a task is marked complete in Asana, pulls a full calendar year of transaction data from Xero, and then uses Google Sheets as a lightweight, disposable formatting layer: each transaction is written in as a row, the finished range is read back as a block, and a text aggregator stitches it into a single clean CSV — the same output a person would get clicking \"download\" manually. That CSV gets attached straight to the completed Asana task, and the staging sheet wipes itself clean afterward so the next run starts fresh.",
    workflowSteps: [
      { title: "Asana Trigger", description: "Watches for any task being marked complete." },
      { title: "Xero Data Pull", description: "Makes a direct API call to Xero, retrieving transaction-level data for the full prior calendar year (Jan 1–Dec 31)." },
      { title: "Router Split", description: "Splits into two coordinated routes that handle building and packaging the report separately." },
      { title: "Route 1 — Build the Report", description: "An iterator loops through each transaction record and writes it into Google Sheets as a new row, assembling the report line by line." },
      { title: "Route 2 — Package the CSV", description: "Waits for the sheet to finish populating, reads the completed range back, and aggregates it into a single properly formatted CSV text block." },
      { title: "Upload to Asana", description: "Attaches the finished CSV directly to the completed task — no manual download, no manual attach." },
      { title: "Self-Cleaning", description: "Clears the staging sheet's values at the end of the run, so the next completed task starts from a clean slate." },
    ],
    image: "/images/projects/xero-asana-csv.png",
  },
  {
    slug: "gmail-attachment-sorter",
    title: "AI-Powered Gmail Attachment Sorter",
    platform: "Make",
    tag: "Document AI",
    cardDescription:
      "Every Gmail attachment gets read by AI, renamed based on what's actually inside it, and filed into Drive automatically.",
    briefDescription:
      "A Make.com scenario that watches Gmail for incoming attachments, has AI actually read each file's content — PDFs, Word docs, spreadsheets, CSVs — and generate a clear, descriptive filename based on what's inside it, then uploads it straight to the right Google Drive folder with a full activity log and notification, no manual sorting required.",
    businessProblem:
      "Businesses that handle a steady stream of email attachments — invoices, contracts, reports, scanned forms — end up with Drive folders full of files named things like \"Scan_047.pdf\" or \"IMG_2291.docx\" that tell you nothing about what's actually in them. Someone has to open each one, figure out what it is, rename it sensibly, and file it in the right place. It's a small task individually, but multiplied across every email that lands, it's exactly the kind of busywork that gets skipped during a busy week — and the moment it gets skipped, important documents disappear into an unsearchable pile.",
    solution:
      "I built a Make.com scenario that takes this over completely. It watches the inbox and pulls out every attachment across incoming emails, then — instead of relying on whatever name Gmail handed it — has AI actually open and read the file's content, whether it's a PDF, Word document, spreadsheet, or CSV. Based on what's actually inside, the AI generates a short, descriptive filename, and the renamed file is uploaded straight to the right Google Drive folder. Every attachment processed gets logged — timestamp, original filename, new filename, file type — into a Google Sheet, so there's a full audit trail, and a summary notification goes out once it's done.",
    workflowSteps: [
      { title: "Gmail Trigger", description: "Watches the inbox for new emails containing attachments." },
      { title: "Attachment Discovery", description: "Lists every attachment and media file across matching emails so nothing gets missed." },
      { title: "AI Content Analysis", description: "Uploads each attachment to the AI so it can read the actual content, not just guess from the original filename." },
      { title: "AI Filename Generation", description: "The AI analyzes what it read and generates a short, descriptive filename that reflects what the document actually is." },
      { title: "Organized Upload", description: "The renamed file is uploaded automatically to the designated Google Drive folder." },
      { title: "Activity Log", description: "Timestamp, original filename, new filename, and file type are recorded as a row in Google Sheets for a complete audit trail." },
      { title: "Notification", description: "A summary email goes out once the file's processed, so the team knows it's handled without checking Drive manually." },
    ],
    image: "/images/projects/gmail-attachment-sorter.png",
  },
  {
    slug: "lead-engagement-automation",
    title: "AI-Personalized Lead Engagement Automation",
    platform: "Zapier",
    tag: "Sales CRM",
    cardDescription:
      "Every stage of the Asana pipeline triggers its own automated folder, follow-up, or AI-personalized email — so no lead goes cold from neglect.",
    briefDescription:
      "A 30-step Zapier system that turns Asana's sales pipeline into a self-running engagement engine. The moment a lead's status changes, it branches into the right automated response — creating delivery folders, chasing unresponsive leads until they reply, following up weekly on open quotes, and sending AI-personalized welcome and service-recommendation emails as deals close.",
    businessProblem:
      "Most sales teams running their pipeline in Asana hit the same wall: the board tells you what stage a lead is in, but nothing happens automatically because of it. A rep has to notice the status change, then manually create the client's folder, remember to chase a lead that's gone quiet, remember to circle back on a quote a week later, write a welcome email when someone's approved, and — months later — remember to reach out about service maintenance. Every one of those steps depends on someone remembering to do it, and every missed one is either a lead lost to silence or a client who never gets the upsell touchpoint they should have.",
    solution:
      "I built a single Zap, triggered off Asana task updates, that uses Zapier's Paths to split into five independent automations — one per pipeline stage — so each column in the CRM has a dedicated, always-on action behind it. It's not a blind drip campaign, either: before sending an escalating follow-up, the workflow checks the inbox for a reply and stops the moment the lead responds, so no one gets spammed after they've already answered. And instead of generic templates, AI composes the welcome and service-recommendation emails on the fly — pulling in the right tone and, for recommendations, the right one of three variations depending on which service the client had installed.",
    workflowSteps: [
      { title: "Pipeline Trigger", description: "Fires the instant a lead's status changes on the Asana board." },
      { title: "Path Routing", description: "Zapier Paths reads the new column and routes the update to that stage's dedicated automation branch." },
      { title: "Ready to Start → Folder + Subtask", description: "Auto-creates a Google Drive folder named after the lead, then adds a \"Social Media Content\" subtask in Asana with the folder link already in the description." },
      { title: "No Response / Quoted → Smart Follow-Ups", description: "Sends a follow-up email, waits, then checks the inbox for a reply before deciding whether to escalate — weekly for open quotes, more urgently for cold leads — and stops automatically the moment the lead responds." },
      { title: "Approved → Personalized Welcome", description: "Pulls the onboarding PDF from Drive, has AI draft a personalized welcome message, and sends both out together." },
      { title: "Paid and Closed → AI Recommendation Email", description: "AI composes one of three service-specific maintenance recommendations based on what was installed, then sends it automatically — turning a closed deal into a future upsell touchpoint instead of a dead end." },
    ],
    image: "/images/projects/lead-engagement-automation.png",
  },
  {
    slug: "ai-content-repurposing",
    title: "AI Content Repurposing Engine",
    platform: "Zapier",
    tag: "Content AI",
    cardDescription:
      "Upload one video, get a week of content back — transcribed, rewritten, and auto-published, with an AI checkpoint before anything goes live.",
    briefDescription:
      "An n8n-style Zapier pipeline that turns a single uploaded video or audio file into a full content batch automatically — transcript, multiple blog post variations, and platform-ready social posts — with an AI-driven approval gate before anything goes live and multi-platform publishing to Facebook and Instagram.",
    businessProblem:
      "Content creators and marketing teams sit on a goldmine they rarely use: every video they record could become a blog post, a Facebook update, and an Instagram post. In practice it almost never happens, because repurposing means transcribing the recording, writing it up as an article, then rewriting that article again for every platform's format and tone — and doing it fast enough that the content is still relevant. That's hours of manual work per video, so most raw footage just sits in a folder and never gets reused.",
    solution:
      "I built a Zapier pipeline that watches a Google Drive folder and takes over the moment a new video or audio file lands. A filter step screens out anything that isn't valid source content before it burns an AI call. From there, AI transcribes the file and generates multiple blog post variations from that transcript in one pass. Each generated post is looped through individually and run through a conditional check — content that doesn't meet the approval criteria gets held back instead of auto-publishing, so nothing off-brand or incomplete goes out unsupervised. Everything that passes gets published straight to Facebook and Instagram, with no manual copy-pasting between platforms.",
    workflowSteps: [
      { title: "Google Drive Trigger", description: "Fires the instant a new video or audio file is added to the watched folder." },
      { title: "Filter Check", description: "Screens the incoming file so only valid source content moves forward — junk or wrong-format files get dropped before they reach the AI." },
      { title: "AI Transcription", description: "Generates a full transcript directly from the uploaded file." },
      { title: "AI Blog Generation", description: "Produces multiple blog post variations from that single transcript in one AI pass." },
      { title: "Loop Through Generated Posts", description: "Each blog post variation is processed individually rather than as a batch, so routing decisions are made per-post." },
      { title: "Conditional Approval Gate", description: "Every post passes through a path check before publishing — content that doesn't meet the criteria is held back rather than pushed live automatically." },
      { title: "Multi-Platform Publishing", description: "Approved posts are published automatically to Facebook Pages and Instagram, formatted for each platform." },
    ],
    image: "/images/projects/ai-content-repurposing.png",
  },
  {
    slug: "job-scraper-resume-optimizer",
    title: "AI Job Scraper + Resume Optimizer",
    platform: "n8n",
    tag: "AI Agent",
    cardDescription:
      "Mention a job you're hunting for in Slack — get back live listings, each with an ATS-tailored resume, and a drafted proposal or outreach email, ready to send.",
    briefDescription:
      "An n8n agent you trigger by @-mentioning it in Slack with what you're job hunting for. It validates the request, pulls live matching job postings, and for every job it finds, rewrites your resume to match that specific posting using AI — without inventing a single qualification — then automatically drafts an outreach email or Upwork proposal where relevant, and reports everything back to Slack ready to send.",
    businessProblem:
      "Tailoring a resume to a specific job posting works — recruiters and ATS software both respond to it — but doing it properly takes real time: reading the posting, reworking your summary and skills section to match its language, then writing a personalized proposal or outreach note on top of that. Multiply that by every promising listing you find in a day, and \"apply to jobs\" quietly becomes a part-time job of its own. Most people cope by sending the same generic resume everywhere, which is exactly what gets filtered out before a human ever reads it.",
    solution:
      "I built an n8n agent that lives in Slack. You @-mention it with what you're looking for, and it first checks — using AI — that you actually asked for a job search, so it doesn't fire on unrelated chatter in the channel. From there it pulls live postings matching your request and processes each one individually: it fetches your real resume, then an AI agent rewrites the summary, skills, projects, and experience sections to align with that specific posting's language, under a strict instruction never to invent companies, titles, or achievements — only rewrite what's already true. Before creating anything, it checks Google Drive for a resume it's already generated for that exact job, so re-running the search never creates duplicates. For jobs with a contact email in the posting, it drafts a personalized outreach email in Gmail; for Upwork listings, it writes a tailored proposal. Everything lands back in the Slack channel as one clean summary per job — title, apply link, optimized resume, and whatever outreach was generated — ready to review and send.",
    workflowSteps: [
      { title: "Slack Trigger", description: "Fires when the bot is @-mentioned with a job search request." },
      { title: "AI Query Validation", description: "Confirms the message is actually a job search before spending API calls on it — anything unrelated gets a quick \"invalid query\" reply instead." },
      { title: "Live Job Search", description: "Queries a job search API for postings matching the request, filtered to recent, remote-friendly listings across full-time, contract, and part-time roles." },
      { title: "Per-Job Loop", description: "Every job returned is processed individually, so each one gets its own tailored resume and outreach — not a one-size-fits-all batch output." },
      { title: "AI Resume Tailoring", description: "An AI agent rewrites the resume against that specific job description, strictly forbidden from fabricating experience, skills, or credentials." },
      { title: "Duplicate Protection", description: "Checks Google Drive for an existing resume for that exact job before generating a new one, so reruns don't flood the folder with copies." },
      { title: "Document Generation", description: "Copies a master resume template and fills in the AI-written sections directly inside Google Docs." },
      { title: "Conditional Outreach", description: "Drafts a personalized Gmail message when the listing includes a contact email, and writes an Upwork proposal when the job was sourced from Upwork." },
      { title: "Slack Summary", description: "Reports the job title, apply link, optimized resume, and any generated proposal or email draft back to the channel — ready to send." },
    ],
    image: "/images/projects/job-scraper-resume-optimizer.png",
  },
  {
    slug: "email-lead-qualification",
    title: "AI Email & Lead Qualification Assistant",
    platform: "n8n",
    tag: "Sales AI",
    cardDescription:
      "Turns inbound emails into scored, CRM-ready leads automatically — one AI call, instant team alerts, zero missed inquiries.",
    briefDescription:
      "An AI-powered n8n system that reads every inbound sales email, scores and qualifies the lead, updates the CRM, and alerts the sales team — all within seconds of it landing in the inbox. Built with production-grade error handling and duplicate protection, not just a demo.",
    businessProblem:
      "Most businesses still process inbound leads by hand. Someone has to open every email, figure out what it's about, decide who should handle it, copy the customer's details into a CRM, notify the right person, and eventually reply — and do all of that again for the next email, and the one after that. That manual chain is where deals go to die: response times stretch to hours, leads get prioritized inconsistently depending on who's reading the inbox that day, and during busy periods, emails just get missed. None of it scales, and every hour of delay is an hour a competitor could respond first.",
    solution:
      "I built an n8n system where a single AI call reads each email once and returns everything a sales rep would normally have to figure out by hand: what kind of inquiry it is, who the customer is, how qualified the lead is, how urgent it is, and a draft reply — all in one structured response, to keep it fast and cheap to run. From there, the workflow takes over automatically: the CRM gets updated, the team gets a Slack alert (with an @mention for anything high-priority), and a reply gets drafted — sent immediately for low-stakes inquiries, held for human review on anything higher-stakes like a refund request or an upset customer. A follow-up reminder gets scheduled based on urgency, so nothing falls through the cracks. It's built like a real client deliverable, not a proof of concept: duplicate emails are caught before they ever reach the AI, every external call has retry logic, and a dedicated error-handling workflow catches anything that slips through — logged and flagged to an admin channel, never silently dropped.",
    workflowSteps: [
      { title: "Gmail Trigger", description: "Fires the moment a new email lands in the inbox." },
      { title: "AI Analysis", description: "A single AI call classifies the email, extracts the lead's details, scores it, and drafts a reply — all in one pass." },
      { title: "Smart Routing", description: "Spam gets archived automatically; everything else continues based on priority and AI confidence." },
      { title: "CRM + Team Alert", description: "The lead is logged to the CRM and the sales team gets pinged on Slack, with an @mention for anything urgent." },
      { title: "Reply, Drafted or Sent", description: "Low-risk replies send automatically; anything higher-stakes waits in Gmail Drafts for a human to approve first." },
      { title: "Follow-Up Scheduled", description: "A due date is set based on urgency, and a separate workflow checks in automatically so nothing slips through." },
    ],
    image: "/images/projects/email-lead-qualification.png",
  },
  {
    slug: "ai-sales-pipeline",
    title: "AI Sales Pipeline Automation",
    platform: "n8n",
    tag: "Pipeline AI",
    cardDescription:
      "Turns inbound form leads into scored, enriched, CRM-ready records automatically — one AI call, instant team alerts, zero cold follow-ups.",
    briefDescription:
      "An AI-powered n8n system that turns every inbound sales lead into a scored, researched, CRM-ready record with a drafted outreach email — enriched, analyzed, and routed to the right next action within minutes of the form being submitted. Built with production-grade error handling, enrichment caching, and duplicate protection, not just a demo.",
    businessProblem:
      "Most businesses still treat inbound sales leads as a queue for a human to work through one at a time. A rep has to notice the new form submission, dig around to figure out if the company and contact are even worth pursuing, guess how urgent it is, write a first-touch email from scratch, and remember to follow up — then do it all again for the next lead. That manual chain is exactly where deals go cold. Response times stretch from minutes to hours, lead qualification depends entirely on which rep is looking and how much coffee they've had, outreach is generic because nobody has time to personalize it at volume, and follow-ups get tracked in someone's memory instead of a system — which means they get forgotten. None of it scales past a handful of leads a day, and every hour of delay is an hour a faster competitor can use to get there first.",
    solution:
      "I built an n8n system where a single AI call does what a rep would normally spend 10-15 minutes doing per lead: score it, research the company and contact, classify how close they are to buying, flag the objections they're likely to raise, recommend a strategy, and draft a personalized first-touch email — all in one structured response, so the whole analysis stays fast and cheap to run at volume. From there, the workflow takes over automatically: the CRM gets created or updated, the sales team gets a Slack alert with the score, strategy, and an @mention for anything Critical or High priority, and the outreach email either sends itself — for high-confidence, high-priority leads — or waits in Gmail Drafts for a rep to approve. A follow-up sequence gets scheduled based on priority, checking in on its own and stopping automatically the moment the lead replies, so nothing sits untouched waiting on someone's memory. It's built like a real client deliverable, not a proof of concept: leads are deduplicated against the CRM before any enrichment or AI spend happens, company enrichment is cached by domain to avoid burning API credits on repeat lookups, every external call has retry logic, and a dedicated error-handling workflow catches anything that slips through — the lead is preserved, logged, and flagged to an ops channel, never silently dropped.",
    workflowSteps: [
      { title: "Lead Capture (Webhook)", description: "Fires the moment a new lead submits the form; spam-like and invalid submissions are filtered out immediately." },
      { title: "Dedup + Enrichment", description: "Checks the CRM for duplicates before anything else runs, then enriches the lead via Apollo — cached by company domain to avoid burning API credits on repeat lookups." },
      { title: "AI Analysis (Single Call)", description: "One AI call scores the lead, synthesizes company research, classifies buying stage and intent, predicts objections, and drafts a personalized outreach email — all in one pass." },
      { title: "CRM + Team Alert", description: "The lead is logged to the CRM and the sales team gets pinged on Slack, with an @mention for anything Critical or High priority." },
      { title: "Outreach, Sent or Drafted", description: "High-confidence, high-priority leads get their outreach email sent automatically; everything else waits in Gmail Drafts for a rep to review first." },
      { title: "Follow-Up Sequenced", description: "A cadence-based follow-up sequence is scheduled based on priority, and checks in automatically — stopping the instant the lead replies." },
    ],
    image: "/images/projects/ai-sales-pipeline.png",
  },
  {
    slug: "business-knowledge-assistant",
    title: "AI Business Knowledge Assistant",
    platform: "n8n",
    tag: "RAG / Support AI",
    cardDescription:
      "Turns company documents into a RAG-powered assistant that answers with real citations, respects who's allowed to see what, and auto-files tickets — no hallucinated answers, no manual triage.",
    briefDescription:
      "An AI-powered n8n system that turns scattered company documents (Drive, Notion, SOPs, contracts) into instant, cited answers — enforcing role-based access at the retrieval layer so sensitive files never leak to the wrong employee, and automatically filing tickets or escalations instead of just answering and stopping. Built with production-grade error handling and duplicate protection, not just a demo.",
    businessProblem:
      "Most companies bury their institutional knowledge across a dozen half-organized places — Drive, Notion, PDFs, old email threads — and employees pay for it every day. They dig through folders looking for the current version of a policy, can't tell if what they found is even still accurate, and end up asking HR, IT, or Ops the same questions over and over because there's no reliable way to self-serve an answer. That has real cost: inconsistent answers depending on who you happened to ask, slower onboarding, IT/HR/Ops teams buried in repeat questions instead of higher-value work, and a genuine compliance risk any time an HR file, contract, or financial document is one careless share away from reaching someone who shouldn't see it.",
    solution:
      "I built an n8n system where a single AI call reads an employee's question alongside the retrieved document chunks and returns everything a human would otherwise have to piece together: a grounded answer with citations, a confidence score, what kind of question it is, and whether it implies a follow-up action — all in one structured response, so it stays fast and cheap to run. The access control isn't a filter bolted on after the fact — it happens at retrieval. Every document chunk is tagged with who's allowed to see it, and the vector search itself only pulls chunks the requestor's role is cleared for, so a sensitive HR or Legal document is never even shown to the AI for an unauthorized question, let alone the employee. If nothing relevant is found, or confidence is low, the system says \"I don't know\" and escalates to a human — it never guesses. From there it's fully automated: a support ticket gets filed, a CRM record gets updated, or a human gets pinged in Slack, depending on what the question actually needed. The knowledge base stays current on its own — a hash check means only documents that actually changed get re-indexed, and a nightly sync catches anything a polling trigger missed and cleans up vectors for anything deleted.",
    workflowSteps: [
      { title: "Document Watch", description: "Drive and Notion triggers fire the moment a file is added or changed." },
      { title: "Smart Indexing", description: "The document is hash-checked against what's already indexed — unchanged files are skipped automatically. Changed or new ones get extracted, chunked, embedded, and stored with an access-level tag." },
      { title: "Employee Question", description: "A question comes in through Slack or email, and the requestor's role is looked up." },
      { title: "RBAC-Filtered Retrieval", description: "The vector search only returns chunks that requestor's role is actually cleared to see — access control enforced before the AI ever reads anything, not after." },
      { title: "Single AI Call", description: "One AI call generates the grounded, cited answer, a confidence score, the type of request, and whether it needs a follow-up action — all in one pass." },
      { title: "Answer + Action", description: "The reply goes out with its citations; a ticket, CRM update, or human escalation fires automatically if the question needed one. Low-confidence or \"not found\" answers always escalate instead of guessing." },
    ],
    image: "/images/projects/business-knowledge-assistant.png",
  },
];