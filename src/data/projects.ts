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
    slug: "automated-lead-enrichment",
    title: "Automated Lead Enrichment & Scoring Pipeline",
    platform: "Zapier",
    tag: "Sales Automation",
    cardDescription:
      "A Zapier system that takes a lead straight from a webform, enriches it with real company data via Apollo, scores and routes it by priority, logs it, alerts the sales team, and — as the bonus requirement — has AI draft and send a personalized outreach email for high-priority leads, with zero manual steps anywhere in the chain.",
    briefDescription:
      "A Zapier system that takes a lead straight from a webform, enriches it with real company data via Apollo, scores and routes it by priority, logs it, alerts the sales team, and — as the bonus requirement — has AI draft and send a personalized outreach email for high-priority leads, with zero manual steps anywhere in the chain.",
    businessProblem:
      "Sales teams working leads straight off a form submission are working blind — a name, an email, and a company name tell you almost nothing about whether that lead is actually worth chasing first. Someone has to manually look up the company, judge its size and legitimacy, decide how urgent it is relative to everything else that came in that day, log it somewhere, and only then loop in the right person. If it's a genuinely hot lead, every minute lost to that manual triage is a minute a faster-moving competitor could use to get there first. This was the exact scenario a consulting firm handed me as a technical assessment: take a real-time webhook lead and get the entire enrichment-to-outreach chain running automatically, with no human touching it in between.",
    solution:
      "I built a Zapier system triggered the moment a new lead comes in through a form (Youform), carrying the standard lead fields — name, email, company, company size, website, and how they found us. Before enrichment can run, a Formatter step cleans the raw company website field into the plain domain format Apollo's API actually expects, since a messy or inconsistently formatted URL would silently break the lookup. That clean domain feeds into the enrichment step itself, built as a direct API call to Apollo (via Zapier's generic Webhooks action, since a raw HTTP call gave more control over exactly which company fields came back than a pre-built connector would have). With enriched company data in hand, Zapier's Paths feature splits the lead into two branches based on company size and the other prioritization signals Apollo returned. High-priority leads get the full treatment: logged permanently to a Google Sheet, an immediate Slack ping to the sales team, and — this is the bonus requirement from the brief — AI drafts a personalized outreach email using the lead's actual details and enrichment context, which then gets sent straight to the client via Gmail, closing the loop instead of just leaving a draft sitting unsent. Lower-priority leads skip all of that heavier automation and instead trigger a simpler email notification to the sales team, so the AI drafting, Slack alerts, and permanent logging stay reserved for the leads that are actually worth that level of attention.",
    workflowSteps: [
      { title: "Form Trigger (Lead Comes In)", description: "Fires in real time the moment a new lead submits the form, carrying name, email, company, company size, website, and lead source." },
      { title: "Company URL Formatting", description: "Cleans the raw website field into the plain domain format the enrichment API expects, so inconsistent URLs don't silently break the next step." },
      { title: "Lead Enrichment (Apollo)", description: "Calls Apollo's API directly to pull real company data — size, industry, and other firmographic details — well beyond what the lead submitted on the form." },
      { title: "Priority Split", description: "Routes the enriched lead down a High Priority or Low Priority path based on company size and the other signals Apollo returned." },
      { title: "High Priority — Log the Lead", description: "Saves the lead permanently to a Google Sheet, creating a durable record for the sales team to reference." },
      { title: "High Priority — Slack Alert", description: "Notifies the sales team immediately in Slack so a hot lead gets human eyes on it right away." },
      { title: "High Priority — AI Email Draft", description: "AI writes a personalized outreach email using the lead's actual details and enrichment context — not a generic template." },
      { title: "High Priority — Send to Client", description: "The AI-drafted email sends automatically via Gmail, so outreach goes out the moment the lead is qualified rather than waiting on someone to review a draft first." },
      { title: "Low Priority — Sales Team Notification", description: "Sends a lighter-weight email notification to the sales team instead of the full high-priority sequence, so lower-value leads still get seen without burning the same automation budget as a hot one." },
    ],
    image: "/images/projects/automated-lead-enrichment.png",
  },
  {
    slug: "facebook-messenger-ai-agent",
    title: "AI Customer Support Agent for Facebook Messenger",
    platform: "n8n",
    tag: "Support AI",
    cardDescription:
      "Customers message a Facebook Page and get instant, accurate answers pulled from a live knowledge base — no invented prices, no missed messages.",
    briefDescription:
      "An n8n agent connected directly to a Facebook Page's Messenger inbox. When a customer sends a message, it pulls the business's live knowledge base from a Google Doc, has an AI agent answer strictly from that content — no guessing, no invented prices or policies — and sends the reply back to the customer on Messenger automatically, in real time.",
    businessProblem:
      "Every Facebook Page gets the same handful of questions over and over — hours, pricing, shipping, refund steps, \"do you carry X.\" Someone has to answer them, and Messenger response speed directly affects whether a lead converts or moves on to a competitor. Hiring someone to sit on the inbox all day is expensive for what's mostly repetitive work, and a generic button-based chatbot can't handle a real question typed in plain language. The bigger risk with an AI chatbot specifically is confident wrong answers — a bot that invents a price or a policy it was never told about can do more damage to a business than no bot at all.",
    solution:
      "I built an n8n workflow that hooks directly into a Facebook Page's Messenger webhook, handling Facebook's required verification handshake so the page can be connected in the first place. Once live, it filters out everything that isn't an actual customer message — read receipts, delivery confirmations, and other webhook noise never reach the AI. For every genuine message, the workflow pulls the current content of a Google Doc that acts as the business's knowledge base, so the owner can update hours, pricing, or policies at any time without touching the automation itself. An AI agent then answers the customer's exact question using only what's written in that document, under a strict rule set: never fabricate a price, policy, or promise, preserve names/links/numbers exactly as written, present instructions as numbered steps, ask a clarifying question if the inquiry is vague, and fall back to a polite \"please contact support\" message rather than guess when the answer isn't in the knowledge base. The agent also holds short-term conversation memory so it can follow a natural back-and-forth instead of treating every message as a cold start. The finished reply is posted straight back into the same Messenger thread via the Facebook Graph API.",
    workflowSteps: [
      { title: "Facebook Messenger Webhook", description: "Single endpoint that receives every event Facebook sends for the connected Page — both the one-time verification request and every live customer message going forward." },
      { title: "Webhook Verification Handshake", description: "Checks incoming requests against Facebook's required verify token and echoes back the challenge value, which is how Facebook authorizes the endpoint before sending real traffic." },
      { title: "Message Filter", description: "Drops any event that isn't an actual text message — read receipts, delivery confirmations, etc. — so the AI only ever fires on genuine customer inquiries." },
      { title: "Live Knowledge Base Fetch", description: "Pulls the current content of a Google Doc acting as the single source of truth for business info — edit the doc and answers update instantly, no redeploy needed." },
      { title: "AI Support Agent", description: "Answers strictly from the knowledge base under a detailed rule set: no fabrication, exact preservation of prices/names/links, numbered steps for instructions, a clarifying question when unclear, and a safe fallback when the answer isn't found." },
      { title: "Conversation Memory", description: "Keeps short-term context of the exchange so the agent can handle natural follow-up questions instead of treating each message in isolation." },
      { title: "Send Reply to Messenger", description: "Posts the AI's finished answer back to the customer through the Facebook Graph API, landing in the same Messenger thread they messaged from." },
    ],
    image: "/images/projects/facebook-messenger-ai-agent.png",
  },
  {
    slug: "voice-ai-appointment-setter",
    title: "AI Appointment Setter (Voice AI Receptionist)",
    platform: "n8n",
    tag: "Voice AI",
    cardDescription:
      "Callers talk to an AI voice receptionist that checks real calendar availability live and books, reschedules, or cancels the appointment mid-call.",
    briefDescription:
      "A voice AI receptionist, built on Vapi and orchestrated through n8n, that answers real phone calls for a business and handles the entire appointment lifecycle live, mid-conversation — checking calendar availability, booking, rescheduling, and canceling — then automatically logs the call recording, transcript, and AI-generated summary once the call ends.",
    businessProblem:
      "For service businesses, the phone is where revenue starts, and every call that goes to voicemail is a coin-flip on whether that customer calls back or just calls the next business on the list. But answering live isn't the hard part — actually doing something with the call is: checking real calendar availability, finding an alternative if the requested time is taken, creating the booking correctly, handling the inevitable \"actually, can we move it\" or \"I need to cancel\" calls, and keeping a record of all of it. That's a full receptionist's job, and it needs to be available whenever the phone rings, including evenings and weekends. Staffing that live is expensive — and a basic voicemail or phone tree doesn't solve the actual problem, since nothing gets booked without a human closing the loop afterward.",
    solution:
      "I built a voice AI receptionist where Vapi handles the live phone conversation itself — speech-to-text, conversational reasoning, text-to-speech — and calls out to n8n mid-call, through five dedicated webhook \"tools,\" whenever it needs to take a real action. Each tool validates that the caller actually provided the required information before doing anything, and returns a structured response that Vapi speaks straight back to the caller, so an incomplete request gets a clarifying follow-up instead of a broken booking. Checking availability queries Google Calendar for the requested slot, and if it's taken, computes the real open 30-minute slots for the business day so the assistant can offer real alternatives on the spot. Booking converts the requested time to the business's timezone, creates the Google Calendar event with a Google Meet link and the caller auto-added as an attendee, and logs the confirmed appointment to Airtable. Rescheduling and canceling both look up the caller's existing appointment by phone number and update or delete the corresponding calendar event accordingly. A separate post-call webhook fires after every call, capturing the full transcript, recording URL, AI-generated summary, and cost, and logs it to Airtable — so every conversation is reviewable afterward even if no booking happened.",
    workflowSteps: [
      { title: "Vapi Tool-Call Webhooks", description: "Four dedicated webhooks (Get Slots, Book Slots, Update Slots, Cancel Slots) each receive a live \"tool call\" from the Vapi voice assistant mid-conversation." },
      { title: "Argument Extraction & Validation", description: "Unpacks Vapi's tool-call payload into usable fields and confirms all required fields are present — an incomplete request gets a spoken clarifying error instead of proceeding." },
      { title: "Availability Check", description: "Queries Google Calendar for the requested window; if unavailable, calculates real open 30-minute slots for the business day, formatted for the assistant to read aloud." },
      { title: "Booking", description: "Converts the requested time to the business's timezone, creates the Google Calendar event with an auto-generated Meet link, and logs the confirmed booking to Airtable." },
      { title: "Rescheduling", description: "Looks up the caller's existing appointment by phone number, updates the matching calendar event, and syncs the change back to Airtable." },
      { title: "Cancellation", description: "Same phone-number lookup, deletes the calendar event with attendee notifications sent, and marks the Airtable record \"Canceled\" — preserving history instead of erasing it." },
      { title: "Structured Tool Response", description: "Every branch replies in the exact JSON shape Vapi expects, which is what the voice AI actually speaks to the caller in real time." },
      { title: "Post-Call Logging", description: "A separate webhook fires once the call ends, capturing the full transcript, recording URL, AI-generated summary, and cost, and logs it to Airtable, keyed by call ID." },
    ],
    image: "/images/projects/voice-ai-appointment-setter.png",
  },
  {
    slug: "asmr-video-creator",
    title: "Automated YouTube Shorts & Facebook Reels Creator",
    platform: "n8n",
    tag: "Video AI",
    cardDescription:
      "One schedule trigger writes, renders, and publishes a brand-new AI-generated ASMR video to YouTube and Facebook — fully unattended.",
    briefDescription:
      "A fully autonomous n8n pipeline that generates, renders, and publishes a brand-new hyper-realistic \"glass fruit slicing\" ASMR video on a schedule — from AI-written concept to a finished video live on both YouTube and Facebook — with zero manual steps in between.",
    businessProblem:
      "Short-form ASMR and satisfying-content channels are a proven, high-engagement niche on YouTube Shorts and Facebook Reels, but growing one demands relentless, consistent posting with fresh, on-brand variety every time. Manually dreaming up a new concept, writing a prompt for an AI video generator, waiting for the render, downloading the result, writing a title and caption, then uploading separately to each platform turns into a full production job on its own for a solo creator. Compounding that, AI video generation APIs are asynchronous and unpredictable: jobs run long, content can get flagged by safety filters, and requests occasionally just fail. A pipeline meant to run unattended has to handle all of that gracefully instead of silently stalling or producing nothing.",
    solution:
      "I built an n8n workflow that runs on a schedule and produces a complete, published video with no manual intervention at any step. An AI prompt-writer chain kicks things off by picking a random fruit — never repeating the last one — and generating a full content package in a single structured output: a click-worthy title, a caption with hashtags, and a tightly-specified cinematic video prompt that locks in a consistent style. Since n8n has no built-in credential type for Vertex AI's video model, I built a custom Google service-account OAuth flow from scratch — constructing the JWT claims, signing them, and exchanging the signed JWT for a short-lived access token — purely to authenticate against this one endpoint. That token drives a request to Vertex AI's Veo video model, which kicks off a long-running render job the workflow polls every 30 seconds until it's done. Rather than just failing on the two realistic failure modes of a generative video API, the workflow self-heals: if Google's content-safety filter flags the output, it loops back to generate an entirely new fruit and prompt and tries again; if the API throws a generic error, it retries the same generation request. Once a clean video comes back, it's converted into an actual video file and published simultaneously to YouTube and Facebook.",
    workflowSteps: [
      { title: "Schedule Trigger", description: "Fires on a recurring interval to start a fresh generation cycle with no manual kickoff needed." },
      { title: "AI Concept Generation", description: "An AI chain picks a random, non-repeating fruit and returns a structured package: a click-worthy title, a caption with hashtags, and a precise cinematic video prompt." },
      { title: "Custom Service-Account Authentication", description: "Builds the service-account claims, signs a JWT, and exchanges it for a short-lived Google OAuth access token — a from-scratch auth flow built to reach Vertex AI's video endpoint." },
      { title: "Video Generation Request", description: "Sends the AI-written prompt to Vertex AI's Veo model, requesting a vertical, audio-enabled clip with UI and captions explicitly excluded from the frame." },
      { title: "Async Polling Loop", description: "Waits and checks the render job's status repeatedly, since video generation runs as a long asynchronous job rather than an instant response." },
      { title: "Content-Safety Self-Healing", description: "If Google's content filter flags the result, the workflow loops back to the AI concept step, generates a fresh fruit and prompt, and attempts the render again automatically." },
      { title: "Error Retry", description: "If the API returns a generic error, the workflow retries the same generation request rather than failing the entire run." },
      { title: "Convert to File", description: "Once a clean video comes back, its base64-encoded bytes are converted into an actual binary video file n8n can upload." },
      { title: "Dual-Platform Publishing", description: "The finished video uploads simultaneously to YouTube and Facebook, each with the AI-generated title, description, and caption." },
    ],
    image: "/images/projects/asmr-video-creator.png",
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