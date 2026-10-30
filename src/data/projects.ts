export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: string[];
  year: number;
  featured: boolean;
  priority: 1 | 2 | 3; // 1 = Tier A, 2 = Tier B, 3 = Tier C
  projectType?: "personal" | "academic";
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  demoUrl: string;
  videoUrl: string;
  screenshots: string[];
  architectureImage: string;
  role: string;
  problem: string;
  solution: string;
  architecture: string;
  implementation: string;
  challenges: string[];
  decisions: { title: string; reason: string }[];
  outcomes: string[];
  learnings: string[];
  status: "active" | "deployed" | "in-progress" | "completed" | "archived";
  color: string; // accent color for project card
}

export const projects: Project[] = [
  // ─── TIER A ───────────────────────────────────────────────────────────────

  {
    slug: "buspay",
    title: "BusPay",
    subtitle: "Location-aware QR-based self-ticketing & real-time transit management system",
    description:
      "A location-aware QR-based self-ticketing and real-time bus transit management system developed for Smart Public Transit Research under the Karnataka State Council for Science and Technology (KSCST) Innovation Framework.",
    longDescription:
      "BusPay revolutionizes urban bus commuting through frictionless self-ticketing and real-time fleet intelligence. Developed under the KSCST Innovation Framework for smart public transit research, it pairs geo-fenced location verification with dynamic QR generation to enable seamless tap-and-ride ticketing while preventing fare evasion. The distributed backend aggregates real-time bus occupancy, GPS telemetry, and ticketing transactions for transit authorities.",
    category: ["Full Stack", "IoT / Smart Transit", "Mobile", "Systems"],
    year: 2026,
    featured: true,
    priority: 1,
    projectType: "personal",
    technologies: ["Python", "FastAPI", "TypeScript", "React", "Docker", "PostgreSQL", "Redis", "Geo-Fencing", "QR Codes"],
    githubUrl: "https://github.com/nowitsarpit/BusPay",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Lead Full-Stack & Systems Engineer (In Progress...)",
    problem:
      "Traditional manual paper-ticketing on city buses leads to heavy queueing at choke points, high operational overhead, revenue leakage, and a complete absence of real-time passenger density telemetry for depot scheduling.",
    solution:
      "A location-aware transit framework where commuters generate cryptographically verified, geo-tagged QR tickets on their smartphones. System cross-references live vehicle GPS and stop coordinates, automating fare calculation and ticketing audits.",
    architecture:
      "FastAPI (Python) backend handling geo-spatial verification and ticketing engines → TypeScript/React web & commuter client → Redis cache for rapid real-time vehicle telemetry → PostgreSQL for audit-grade ticketing ledgers → Containerized with Docker.",
    implementation:
      "Engineered real-time GPS boundary validation using geospatial queries. Integrated tamper-evident dynamic QR encoding with timed expiry to eliminate ticket sharing. Built administrative analytics dashboard for fleet controllers.",
    challenges: [
      "Reliable GPS location validation in dense urban corridors with signal drift",
      "Sub-second verification of high-throughput QR scans during peak boarding rushes",
      "Offline-resilient transaction synchronization for transit routes with intermittent cellular connectivity",
    ],
    decisions: [
      {
        title: "FastAPI + Python Core for Geospatial Services",
        reason:
          "FastAPI provides high-performance async processing for telemetry feeds alongside powerful Python numerical and spatial computing libraries.",
      },
      {
        title: "Dynamic Expiring QR with Geo-Hash Binding",
        reason:
          "Prevents screenshot sharing and ticket reuse by binding the QR code to the commuter's immediate GPS proximity and vehicle identifier.",
      },
    ],
    outcomes: [
      "Selected and developed under the Karnataka State Council for Science and Technology (KSCST) Innovation Framework",
      "Functional end-to-end QR issuance, geo-verification, and transit audit pipeline",
      "High-performance containerized microservices ready for municipal transit scaling",
    ],
    learnings: [
      "Public infrastructure tech demands fail-safe fallback modes for low-connectivity rural/urban transit fringes",
      "Geospatial query optimization in Redis/PostGIS significantly cuts latency under concurrent commuter requests",
    ],
    status: "in-progress",
    color: "#06B6D4",
  },

  {
    slug: "gomail",
    title: "GoMail",
    subtitle: "Plan. Deliver. Observe. Production-grade distributed email orchestration platform",
    description:
      "Production-grade distributed email orchestration platform built from scratch. Plan campaigns with transactional outbox guarantees, deliver with queue concurrency and rate limits, and observe every event with real PostgreSQL timestamps and metrics.",
    longDescription:
      "GoMail is a production-grade, distributed email orchestration platform built from the ground up to guarantee reliable message scheduling and dispatch. By leveraging transactional outbox patterns, Redis/BullMQ queue concurrency with strict per-domain rate limiting, and comprehensive PostgreSQL event tracking, it ensures high-throughput delivery without message loss, duplicates, or third-party black-box dependencies.",
    category: ["Backend", "Systems", "Infrastructure"],
    year: 2026,
    featured: true,
    priority: 1,
    projectType: "personal",
    technologies: ["Go", "Node.js", "TypeScript", "BullMQ", "Redis", "PostgreSQL", "SMTP", "Docker", "REST API"],
    githubUrl: "https://github.com/nowitsarpit/gomail",
    liveUrl: "https://reach-inbox-email-scheduler-eight.vercel.app/",
    demoUrl: "https://reach-inbox-email-scheduler-eight.vercel.app/",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Backend & Systems Engineer",
    problem:
      "Sending scheduled and transactional emails at scale demands guaranteed delivery, strict rate-limiting compliance, and end-to-end observability. Naive implementations suffer from dropped jobs, provider rate-limit bans, and zero failure transparency.",
    solution:
      "A distributed email orchestration architecture implementing transactional outbox persistence, BullMQ/Redis worker queues with configurable concurrency and rate limiting, and precise event audit logging.",
    architecture:
      "Client UI / API Layer → Transactional Outbox (PostgreSQL) → Distributed Queue Engine (Redis & BullMQ) → Concurrent Dispatch Workers with Rate Limiters → SMTP Relay → Telemetry & Event Logging.",
    implementation:
      "Implemented resilient queue workers with exponential backoff and dead-letter handling. Built campaign planning workflows with transactional guarantees, dynamic concurrency control, and granular event tracking for opens, deliveries, and failures.",
    challenges: [
      "Guaranteeing transactional delivery without race conditions during sudden worker restarts",
      "Dynamic rate limiting across diverse email provider thresholds",
      "Accurate lifecycle tracking from scheduling to relay dispatch",
    ],
    decisions: [
      {
        title: "Transactional Outbox Pattern",
        reason:
          "Ensures scheduled campaigns and message dispatches are persisted atomically with application state before queueing, avoiding lost messages.",
      },
      {
        title: "BullMQ & Redis for Concurrency & Rate Limiting",
        reason:
          "Provides robust worker pools, delayed job scheduling, dead-letter recovery, and token-bucket rate limiting out of the box.",
      },
    ],
    outcomes: [
      "Deployed live web orchestrator and scheduler on Vercel",
      "Fault-tolerant delivery pipeline with rate limiting and exponential retry",
      "Complete event observability with millisecond-precision timestamps in PostgreSQL",
    ],
    learnings: [
      "Decoupling job orchestration from raw SMTP transmission prevents cascading worker failures",
      "Granular rate limiting per provider domain is essential to preserve sender IP reputation",
    ],
    status: "deployed",
    color: "#00ADD8",
  },

  {
    slug: "cine-ai",
    title: "Cine AI",
    subtitle: "Premium Cinematic AI Assistant & Personal Movie Critic",
    description:
      "Cinema Intelligence, Reimagined — Cine AI is a luxury-class, mobile-first application designed for film enthusiasts. Modeled after high-fidelity streaming experiences, it features a conversational AI Film Critic, haptic interactions, trending analytics, voice interfaces, and async PostgreSQL persistence.",
    longDescription:
      "Cine AI elevates movie discovery into an interactive, luxury cinematic experience. Built with React Native and Expo, paired with an asynchronous FastAPI and SQLAlchemy 2.0 backend backed by Supabase and Google Gemini 1.5, it acts as a personal film companion. Users can converse naturally with an AI film critic for deep thematic breakdowns, explore real-time TMDB trending charts, log curated watchlists, and enjoy fluid 60fps animations with bespoke haptics.",
    category: ["Mobile", "AI / ML", "Full Stack", "Entertainment"],
    year: 2026,
    featured: true,
    priority: 1,
    projectType: "personal",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "FastAPI",
      "Python",
      "SQLAlchemy 2.0",
      "Supabase",
      "PostgreSQL",
      "Google Gemini 1.5",
      "TMDB API",
      "EAS Build",
    ],
    githubUrl: "https://github.com/nowitsarpit/Cine-AI",
    liveUrl: "https://expo.dev/artifacts/eas/IQstVmwR6Xm71OOQ03fKOj3fwlgMjbokw4eKkRge7aA.apk",
    demoUrl: "https://expo.dev/artifacts/eas/IQstVmwR6Xm71OOQ03fKOj3fwlgMjbokw4eKkRge7aA.apk",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Full-Stack Mobile & AI Engineer",
    problem:
      "Traditional movie platforms deliver flat, static recommendation lists driven strictly by simple genre tags or commercial algorithms, lacking interactive depth, taste nuance, and engaging conversational discovery.",
    solution:
      "An intelligent, conversational mobile companion integrating Google Gemini 1.5 with live TMDB data streams, providing deep aesthetic analysis, thematic comparisons, and customized recommendations.",
    architecture:
      "Cross-platform React Native frontend (Expo SDK) with native gesture handlers & haptics → FastAPI asynchronous REST backend → Google Gemini 1.5 LLM with context caching → Supabase PostgreSQL (SQLAlchemy 2.0 async sessions) → TMDB API service layer.",
    implementation:
      "Engineered prompt-engineered persona layers for nuanced cinematic critique. Architected asynchronous database models with SQLAlchemy 2.0 to handle concurrent user state. Integrated voice-input capabilities and deployed production Android binaries via Expo Application Services (EAS).",
    challenges: [
      "Minimizing LLM response latency to maintain seamless real-time mobile dialogue",
      "Hydrating dynamic TMDB metadata caches without exceeding API rate thresholds",
      "Delivering smooth 60fps mobile transitions with gesture-based navigation across low-end devices",
    ],
    decisions: [
      {
        title: "FastAPI + Async SQLAlchemy 2.0 over Synchronous ORMs",
        reason:
          "Enables high-concurrency non-blocking database I/O essential for serving fast-moving mobile sessions and LLM conversational streams.",
      },
      {
        title: "Google Gemini 1.5 with Grounded Prompting",
        reason:
          "Offers large context windows and strong creative reasoning for film analysis while TMDB handles factual release and cast verification.",
      },
    ],
    outcomes: [
      "Deployed installable Android production APK build via Expo EAS",
      "Startup-grade luxury dark UI with fluid animations, haptics, and voice discovery",
      "Complete backend integrating AI conversational critique and async Supabase persistence",
    ],
    learnings: [
      "AI critique models require strong factual grounding to prevent hallucinating movie plot twists",
      "Mobile haptic feedback and micro-interactions drastically elevate perceived application quality",
    ],
    status: "deployed",
    color: "#F97316",
  },

  {
    slug: "my-cafe",
    title: "MY Cafe",
    subtitle: "Premium AI-Powered Culinary Experience & Real-Time SaaS Operations",
    description:
      "Where Tradition Meets Intelligence — A state-of-the-art cafe and restaurant platform featuring conversational Gemini AI assistance, voice interactions with waveform visualization, dual-mode resiliency fallbacks, and a real-time SaaS admin command center with live Kanban order monitoring.",
    longDescription:
      "MY Cafe is a full-featured, luxury hospitality platform that pairs modern customer ordering with enterprise-grade cafe operations. It features a conversational Google Gemini AI assistant with voice recognition (Web Speech API) and automatic fallback routing (Vercel proxy → Direct REST → Local pattern engine). For staff and managers, an isolated glassmorphic admin command center provides real-time Kanban order tracking synced to Supabase PostgreSQL, occupancy heatmaps, AI token usage diagnostics, and interactive Leaflet geospatial mapping with dispatch boundary radius overlays.",
    category: ["Full Stack", "AI / ML", "SaaS", "Web"],
    year: 2026,
    featured: true,
    priority: 1,
    projectType: "personal",
    technologies: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Google Gemini AI",
      "Supabase",
      "PostgreSQL",
      "Web Speech API",
      "Leaflet",
      "Recharts",
      "Vercel",
    ],
    githubUrl: "https://github.com/nowitsarpit/MyCafe",
    liveUrl: "https://my-cafe-delta.vercel.app/",
    demoUrl: "https://my-cafe-delta.vercel.app/",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Lead Full-Stack & AI Engineer",
    problem:
      "Traditional restaurant websites are static menus without intelligent assistance. Operations rely on disconnected point-of-sale tools, lacking real-time order visibility, contextual conversational search, and live delivery dispatch analytics.",
    solution:
      "A unified culinary ecosystem offering conversational and voice-activated AI ordering for guests, backed by a real-time reactive Supabase PostgreSQL database and an administrative Kanban control cockpit.",
    architecture:
      "Client SPA in React + Vite with Tailwind styling → Dual-mode AI Router (Vercel serverless proxy with client-side fallback & offline pattern matching) → Supabase PostgreSQL real-time subscriptions → Leaflet GIS mapping with custom CartoDB Dark/Voyager layers.",
    implementation:
      "Built resilient voice-to-text with microphone diagnostic guardrails. Implemented live order status pipelines in Supabase with instant Kanban column transitions. Designed analytics dashboards with Recharts for occupancy forecasting and prompt token tracking.",
    challenges: [
      "Preventing user interaction disruptions during Gemini API rate limits or quota drops (engineered dual-mode automated fallback engine)",
      "Cross-browser speech recognition support across chromium, Firefox, and privacy-shielded browsers like Brave",
      "Syncing multi-role administrative state with sub-second latency across distributed sessions",
    ],
    decisions: [
      {
        title: "Dual-Mode Resilient AI Routing",
        reason:
          "Protects user experience by cascading through production proxy, direct API, and high-fidelity local pattern matching whenever quotas or network interruptions occur.",
      },
      {
        title: "Supabase Real-Time Engine over Polling",
        reason:
          "Enables instant zero-latency status transitions across kitchen prep, packaging, and dispatch columns on the live Kanban board.",
      },
    ],
    outcomes: [
      "Production-ready deployment on Vercel with integrated serverless proxy",
      "Interactive voice and chat assistant with context-aware dining suggestions",
      "Complete SaaS administrative center with live GIS delivery dispatch zones and telemetry",
    ],
    learnings: [
      "Voice interfaces require explicit fallback indicators for unsupported privacy-oriented mobile and desktop browsers",
      "Glassmorphic administrative shells provide great visual separation between public and privileged operational flows",
    ],
    status: "deployed",
    color: "#84CC16",
  },

  {
    slug: "intelliqueue",
    title: "IntelliQueue",
    subtitle: "Real-Time Queue & Appointment Optimizer with Live WebSockets & SaaS Analytics",
    description:
      "A complete, production-ready SaaS application designed to help businesses seamlessly manage appointments and virtual queues. Empowers users to book slots, join live queues, and track wait times in real-time while giving administrators powerful analytics and prioritization controls.",
    longDescription:
      "IntelliQueue is a modern SaaS platform designed to eliminate waiting-room congestion and streamline customer service flow. It features live WebSocket-driven virtual queue tracking with real-time wait estimation, multi-tier dynamic appointment scheduling (Normal, VIP, Emergency), secure JWT/OTP authentication, and an executive administration cockpit built with Recharts to monitor throughput trends, peak demand hours, and bottleneck diagnostics. Encapsulated in a glassmorphic dark-theme UI with fluid Framer Motion micro-interactions.",
    category: ["SaaS", "Real-Time Systems", "Full Stack", "Optimization"],
    year: 2026,
    featured: true,
    priority: 1,
    projectType: "personal",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "FastAPI",
      "Python",
      "WebSockets",
      "PostgreSQL",
      "Redis",
      "Recharts",
      "JWT & OTP",
    ],
    githubUrl: "https://github.com/nowitsarpit/Intelliqueue",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Full-Stack & Systems Engineer",
    problem:
      "Manual and opaque queue management causes severe customer frustration, prolonged physical wait times, chaotic lobby crowds, and provides zero operational foresight for managers handling unpredictable footfall spikes.",
    solution:
      "A distributed real-time virtual queueing engine featuring WebSocket state synchronization, tiered priority queuing heuristics, and rich administrative analytics dashboards.",
    architecture:
      "React SPA with Tailwind CSS & Framer Motion → Persistent WebSocket subscription channels → FastAPI asynchronous backend → Redis in-memory queue cache for instant priority-slot manipulation → PostgreSQL for audit-grade appointment records.",
    implementation:
      "Built multi-level priority scheduling algorithms balancing Normal, VIP, and Emergency tickets. Implemented secure JWT authentication with OTP verification hooks. Designed Recharts analytics modules for tracking service load curves and peak hour metrics.",
    challenges: [
      "Maintaining WebSocket heartbeat resiliency and immediate client reconnection without queue position loss",
      "Designing priority scoring algorithms that prevent starvation of standard-priority tickets during high VIP bursts",
      "Real-time event broadcasting to multiple concurrent administrative dashboards without database contention",
    ],
    decisions: [
      {
        title: "FastAPI WebSockets with Redis Pub/Sub",
        reason:
          "Enables sub-millisecond broadcast of queue position changes to hundreds of connected user screens without querying disk databases.",
      },
      {
        title: "Dynamic Priority Scheduling Engine",
        reason:
          "Allows healthcare and service clinics to inject emergency and VIP priority workflows while automatically re-calibrating remaining estimated wait times.",
      },
    ],
    outcomes: [
      "Full open-source SaaS implementation with complete frontend and backend services",
      "Real-time queue tracking with live countdowns and position indicators",
      "Executive analytics console tracking service duration, peak hours, and appointment density",
    ],
    learnings: [
      "WebSocket state consistency requires a single authoritative cache layer (Redis) to avoid split-brain counters",
      "Micro-animations during queue state transitions reduce perceived waiting time for end users",
    ],
    status: "in-progress",
    color: "#3B82F6",
  },

  {
    slug: "edumetrics",
    title: "Edumetrics",
    subtitle: "Student Analytics & Role-Based Academic Performance Management System",
    description:
      "A production-ready, role-based web application built using React and Tailwind CSS that provides real-time academic analytics, performance tracking, grade audits, and administrative insights for students, instructors, and faculty.",
    longDescription:
      "Edumetrics transforms institutional academic reporting by turning static grade spreadsheets into real-time, actionable learning intelligence. Built with React and Tailwind CSS, it implements role-based access control (RBAC) separating student portals from educator dashboards. Students can analyze longitudinal GPA trends, review coursework diagnostics, and visualize subject-wise mastery curves, while administrators and faculty gain cohort-level intervention forecasting, attendance telemetry, and aggregate curriculum performance heatmaps.",
    category: ["Full Stack", "SaaS", "EdTech", "Analytics"],
    year: 2026,
    featured: true,
    priority: 1,
    projectType: "personal",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Netlify",
      "Role-Based Access Control (RBAC)",
      "Recharts",
      "REST API",
    ],
    githubUrl: "https://github.com/nowitsarpit/Edumetrics",
    liveUrl: "https://uni-insights.netlify.app",
    demoUrl: "https://uni-insights.netlify.app",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Lead Full-Stack Engineer & UI Architect",
    problem:
      "Colleges and schools rely on disjointed grading software where students only see scores at the term end without feedback loops, and faculty lack automated early-warning indicators for struggling cohorts.",
    solution:
      "A centralized, role-gated academic intelligence platform delivering real-time student grade telemetry, longitudinal progress tracking, and cohort health analytics.",
    architecture:
      "Client SPA in React with Vite and Tailwind styling → Role-based authentication router (Student, Educator, Administrator) → Dynamic analytics and scoring calculations → Deployed continuously on Netlify.",
    implementation:
      "Engineered secure role-based navigation guards for personalized student vs faculty interfaces. Integrated data visualization modules for multi-semester trend comparison and subject-level percentiles. Optimized responsive layouts for both mobile student access and wide-screen administrative monitors.",
    challenges: [
      "Designing clean, non-intimidating data visualizations that motivate students rather than causing academic anxiety",
      "Strict client-side role isolation to ensure complete student record privacy across shared endpoints",
      "Responsive data table virtualization for faculty cohorts managing hundreds of student records",
    ],
    decisions: [
      {
        title: "Client-Side RBAC Architecture",
        reason:
          "Ensures immediate UI context switching between student self-audits and educator administrative panels with strict route-guarding.",
      },
      {
        title: "Netlify Continuous Deployment with Custom Headers",
        reason:
          "Guarantees fast global CDN delivery, automated branch previews, and clean client-side routing resolution for SPA paths.",
      },
    ],
    outcomes: [
      "Production-deployed application live at uni-insights.netlify.app",
      "Complete role-based authentication and navigation lifecycle",
      "Comprehensive performance analytics dashboards with multi-metric breakdown",
    ],
    learnings: [
      "Educational analytics dashboards require high visual clarity and intuitive color-coded benchmarks",
      "Role-based routing should be enforced both at the route perimeter and down to atomic UI widget levels",
    ],
    status: "deployed",
    color: "#8B5CF6",
  },

  // ─── TIER B ───────────────────────────────────────────────────────────────

  {
    slug: "leadscout",
    title: "LeadScout",
    subtitle: "Autonomous Lead Enrichment & Intelligence Pipeline",
    description:
      "A production-grade, modular Python pipeline that autonomously crawls company websites, extracts structured business intelligence using an LLM, validates data with strict Pydantic schemas, and outputs clean lead intelligence with zero hardcoded company rules.",
    longDescription:
      "LeadScout is an automated lead enrichment platform built for scale and accuracy. By orchestrating modern web crawlers with LLM-powered semantic extraction, it converts raw company homepages and product documentation into verified, schema-compliant business profiles. The pipeline enforces rigorous data contracts via Pydantic, filters noise, extracts leadership rosters, technology stacks, and value propositions, and delivers structured JSON/CSV intelligence without requiring rigid site-specific scraping rules.",
    category: ["AI / ML", "Python", "Systems", "Automation"],
    year: 2026,
    featured: false,
    priority: 2,
    projectType: "personal",
    technologies: ["Python", "LLMs", "Pydantic", "Web Crawling", "BeautifulSoup", "AsyncIO", "REST API"],
    githubUrl: "https://github.com/nowitsarpit/LeadScout",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Backend & AI Engineer",
    problem:
      "Manual B2B lead qualification is slow and error-prone. Traditional regex or selector-based scrapers break constantly whenever corporate landing page layouts change.",
    solution:
      "An autonomous crawler coupled with LLM reasoning and Pydantic validation that extracts verified business facts from unstructured DOM content dynamically.",
    architecture:
      "Target URL Ingestion → Async Web Spider & Content Normalizer → LLM Structured Extraction Layer → Pydantic Schema Validation & Sanitization → Enriched Lead Store.",
    implementation:
      "Built asynchronous web scrapers capable of respecting robots.txt and handling rate limits. Designed structured prompting protocols with Pydantic JSON schema constraints to guarantee uniform output records.",
    challenges: [
      "Reliably extracting structured schema data from dynamic Single-Page Application (SPA) websites",
      "Handling token constraints when analyzing deep corporate documentation trees",
    ],
    decisions: [
      {
        title: "Pydantic Schemas for Strict Data Validation",
        reason:
          "Ensures all LLM extractions match typed schemas, automatically failing and retrying malformed records before storage.",
      },
      {
        title: "Rule-Free LLM Parsing over DOM Selectors",
        reason:
          "Provides resilient extraction across thousands of diverse website designs without maintaining brittle XPath or CSS selectors.",
      },
    ],
    outcomes: [
      "Production-ready modular pipeline with zero hardcoded company rules",
      "100% schema-validated structured output for lead generation workflows",
    ],
    learnings: [
      "Schema-first extraction dramatically cuts downstream pipeline validation overhead",
      "HTML pre-processing and DOM pruning save significant LLM token costs",
    ],
    status: "completed",
    color: "#6366F1",
  },

  {
    slug: "aura-streaming",
    title: "AURA Streaming",
    subtitle: "Modern streaming platform with content discovery and cinematic UI",
    description:
      "A modern frontend-focused streaming platform designed with cinematic visual hierarchy, fluid micro-interactions, responsive editorial layouts, and dark-mode elegance for movie discovery.",
    longDescription:
      "AURA Streaming demonstrates sophisticated UI/UX engineering for media consumption. Built with React, Vite, Tailwind CSS, and Framer Motion, it features smooth modal transitions, category-based content filters, responsive hero banners, and lazy-loaded media carousels to replicate a luxury streaming experience.",
    category: ["Full Stack", "Streaming", "Frontend"],
    year: 2025,
    featured: false,
    priority: 2,
    projectType: "personal",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/nowitsarpit/Aura-Streaming",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Frontend Engineer & UI Designer",
    problem:
      "Most streaming platform interfaces are cluttered and heavy. Crafting a responsive, high-performance cinematic browsing experience requires delicate animation timing and layout balance.",
    solution:
      "A clean, editorial-first web streaming interface with fluid Framer Motion transitions, responsive media grids, and optimized asset delivery.",
    architecture:
      "React SPA architecture with Vite → Tailwind CSS design tokens → Declarative Framer Motion animations → Modular media carousel components.",
    implementation:
      "Engineered responsive content rows with smooth hover zooming and backdrop overlays. Integrated interactive modal previews and tag-based genre filters.",
    challenges: [
      "Maintaining smooth 60fps animations across complex media grids on mobile viewports",
    ],
    decisions: [
      {
        title: "Framer Motion for Declarative Transitions",
        reason:
          "Ensures reliable physics-based transitions for expanding modal overlays and carousel navigation.",
      },
    ],
    outcomes: [
      "Clean, modern streaming web interface with responsive layouts",
      "Modular design system ready for API streaming backend integration",
    ],
    learnings: [
      "Media card aspect ratio consistency is critical for visual rhythm",
    ],
    status: "completed",
    color: "#EC4899",
  },

  {
    slug: "bank-simulator",
    title: "Bank Simulator",
    subtitle: "Object-oriented banking transaction simulation in C++",
    description:
      "A comprehensive C++ banking engine demonstrating core object-oriented programming (OOP) principles, inheritance hierarchies, balance ledgers, and transaction simulation logic.",
    longDescription:
      "Bank Simulator is an advanced C++ console application engineered to model real-world banking operations. It showcases deep computer science foundations including encapsulation, polymorphism, inheritance hierarchies (Checking vs Savings accounts), memory management, and robust transaction audit logging with precision error handling.",
    category: ["Systems", "C++", "Software Engineering"],
    year: 2024,
    featured: false,
    priority: 2,
    projectType: "personal",
    technologies: ["C++", "OOP", "Data Structures", "Algorithms", "File I/O"],
    githubUrl: "https://github.com/nowitsarpit/Bank-Simulator",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Systems Developer",
    problem:
      "Modeling financial ledgers requires strict domain encapsulation, floating-point precision safety, and strict state transitions to avoid invalid account states.",
    solution:
      "A structured C++ application with polymorphic account classes, verified withdrawal/deposit state machines, and file-backed persistence for transaction auditing.",
    architecture:
      "Account Base Class → Polymorphic Derived Classes (Savings, Checking) → Transaction Registry & Ledger Management → Terminal I/O Interface.",
    implementation:
      "Implemented virtual methods for custom interest calculations, overdraft limits, transaction rollbacks, and persistent file logging.",
    challenges: [
      "Accurate monetary calculations and preventing precision errors in C++ floating-point operations",
    ],
    decisions: [
      {
        title: "Pure C++ OOP Implementation",
        reason:
          "Enforces direct control over memory, class lifetimes, and low-level data structures.",
      },
    ],
    outcomes: [
      "Robust banking engine handling accounts, transactions, and statements",
      "Clean adherence to SOLID principles and OOP paradigms",
    ],
    learnings: [
      "Domain modeling in C++ reinforces encapsulation boundaries and edge-case validation",
    ],
    status: "completed",
    color: "#78716C",
  },

  {
    slug: "netflix-clone",
    title: "Netflix Clone",
    subtitle: "High-fidelity video streaming frontend with dynamic movie catalog",
    description:
      "A modern, responsive web application replicating the core user experience of Netflix, featuring dynamic movie previews, responsive rows, trailer playback, and real-time catalog fetching.",
    longDescription:
      "Netflix Clone is a high-fidelity frontend application built to deliver a seamless movie browsing and streaming experience. Featuring a responsive hero banner with auto-generated featured content, horizontally scrollable genre carousels, video trailer modal embeds, and TMDB API integration, it replicates the signature dark aesthetic and smooth interactive patterns of modern streaming leaders.",
    category: ["Full Stack", "Frontend", "Web"],
    year: 2025,
    featured: false,
    priority: 2,
    projectType: "personal",
    technologies: ["React", "JavaScript", "CSS3 / Tailwind CSS", "TMDB API", "REST API", "Vite"],
    githubUrl: "https://github.com/nowitsarpit/Netflix-Clone",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Frontend Developer",
    problem:
      "Replicating enterprise streaming interfaces requires fluid carousels, responsive video overlays, and asynchronous catalog pagination without layout shift.",
    solution:
      "A performant React frontend integrating TMDB REST endpoints with responsive video embed components and modular UI sections.",
    architecture:
      "React Component Tree → Asynchronous TMDB Client → Dynamic Genre Category Rows → Video Modal Player.",
    implementation:
      "Constructed reusable media card components with hover previews, integrated dynamic backdrop banners, and handled responsive navigation across mobile and desktop displays.",
    challenges: [
      "Eliminating layout jank during high-resolution movie poster hydration",
    ],
    decisions: [
      {
        title: "TMDB REST Integration",
        reason:
          "Supplies rich real-world metadata, high-res posters, and ratings to replicate authentic production browsing.",
      },
    ],
    outcomes: [
      "Pixel-perfect Netflix UI recreation with functional trailer previews and catalog browsing",
    ],
    learnings: [
      "Image skeleton loaders prevent Cumulative Layout Shift (CLS) on media-heavy interfaces",
    ],
    status: "completed",
    color: "#E50914",
  },

  // ─── ACADEMIC PROJECTS ───────────────────────────────────────────────────

  {
    slug: "quantum-safe-crypto-migration",
    title: "AI-Driven Quantum-Safe Cryptography Assessment & Migration Assistant",
    subtitle: "Automated Post-Quantum Cryptography (PQC) vulnerability audit and NIST-standardized migration pipeline",
    description:
      "A Post-Quantum Cryptography (PQC) migration assistant that analyses software codebases, identifies vulnerable cryptographic primitives, evaluates quantum exposure risks, and recommends NIST-standardized replacements.",
    longDescription:
      "This system addresses the existential threat posed by quantum computers to classical public-key cryptography (RSA, ECC, Diffie-Hellman). By combining static code analysis (AST parsing), cryptographic API signature detection, and LLM-guided risk scoring, the assistant scans repositories for quantum-vulnerable algorithms and unpinned cipher suites. It maps architectural exposure, scores migration urgency based on data longevity (Shor's algorithm threat modeling), and automatically suggests drop-in replacements using NIST-standardized post-quantum algorithms (ML-KEM / Kyber, ML-DSA / Dilithium, SLH-DSA / SPHINCS+).",
    category: ["Cybersecurity", "AI / ML", "Research", "Quantum Security"],
    year: 2026,
    featured: true,
    priority: 1,
    projectType: "academic",
    technologies: [
      "Python",
      "Post-Quantum Cryptography",
      "NIST PQC Standards",
      "AST Code Analysis",
      "LLMs",
      "Security Risk Assessment",
      "Dependency Parsing",
    ],
    githubUrl: "",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Lead Security Researcher & Developer",
    problem:
      "Future quantum computers running Shor's algorithm will compromise current asymmetric cryptographic protocols. Modern codebases possess deeply nested, undocumented legacy cryptographic dependencies with zero quantum readiness visibility.",
    solution:
      "An automated assessment pipeline that statically scans source files for vulnerable cryptographic primitives, quantifies harvest-now-decrypt-later vulnerability vectors, and generates concrete code migration patches to NIST PQC standards.",
    architecture:
      "Codebase Parser (AST & Call Graph) → Crypto API Pattern Matcher & Dependency Analyzer → Quantum Threat Scoring Engine → LLM Migration Recommender → NIST Compliant Patch Generator.",
    implementation:
      "Developed AST tree walkers to identify insecure cryptographic library calls (RSA, ECDSA). Designed heuristic scoring models measuring data sensitivity retention vs quantum arrival timelines. Integrated automated code diff generation recommending liboqs and post-quantum wrappers.",
    challenges: [
      "Accurately tracing dynamically resolved or aliased cryptographic imports across large codebases",
      "Balancing key-size overhead and performance penalties inherent in post-quantum lattice-based algorithms",
    ],
    decisions: [
      {
        title: "AST-Guided Static Analysis over String Grepping",
        reason:
          "Syntactic Abstract Syntax Tree analysis eliminates false positives and verifies actual execution call chains rather than naive keyword matches.",
      },
      {
        title: "NIST FIPS 203/204/205 Mapping",
        reason:
          "Ensures all generated remediation patches adhere directly to finalized federal and global post-quantum security specifications.",
      },
    ],
    outcomes: [
      "End-to-end PQC audit engine analyzing software repositories for quantum vulnerability",
      "Automated migration reports with prioritized remediation plans and code refactoring patches",
    ],
    learnings: [
      "Transitioning to PQC involves significant memory and ciphertext size trade-offs that developers must actively plan for",
      "Cryptographic inventory discovery is the fundamental initial barrier in enterprise security modernization",
    ],
    status: "in-progress",
    color: "#8B5CF6",
  },

  {
    slug: "meditwin",
    title: "MediTwin",
    subtitle: "Digital Twin & Leakage-Free Explainable ML Framework for Personalized Healthcare",
    description:
      "A Digital Twin framework combining structured patient health-state representation with leakage-free explainable machine learning for diabetes-risk prediction, integrating Generative AI and RAG for evidence-grounded health insights.",
    longDescription:
      "MediTwin introduces a personalized healthcare architecture that builds digital twins of patient physiological and clinical states. Evaluated on a research-ready NHANES cohort of 7,809 participants, the system incorporates rigorous leakage-free preprocessing, class-imbalance resolution, and threshold-optimized ensemble models (achieving up to 82.55% balanced accuracy). Integrated with Explainable AI (SHAP / feature attributions) and evidence-grounded Retrieval-Augmented Generation (RAG), it translates statistical risk coefficients into clinical narrative summaries with transparent medical rationale.",
    category: ["AI / ML", "Healthcare AI", "Research", "Digital Twin"],
    year: 2026,
    featured: true,
    priority: 1,
    projectType: "academic",
    technologies: [
      "Python",
      "Machine Learning",
      "Explainable AI (SHAP)",
      "Digital Twin Architecture",
      "Generative AI",
      "RAG",
      "NHANES Cohort Analysis",
      "FastAPI",
    ],
    githubUrl: "https://github.com/nowitsarpit/MediTwin",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Lead ML & Healthcare AI Researcher",
    problem:
      "Heterogeneous clinical, demographic, and laboratory data makes individual diabetes-risk forecasting noisy. Standard models suffer from data leakage, uncalibrated classification thresholds, and black-box opacity that physicians cannot trust.",
    solution:
      "A patient digital twin representation paired with leakage-free cross-validation pipelines, threshold-aware probability tuning, SHAP explainability, and RAG medical literature grounding.",
    architecture:
      "NHANES Cohort Ingestion & Cleaning → Leakage-Free Preprocessing & Class-Imbalance Balancing → Threshold-Optimized Ensemble Predictor → SHAP Explainability Engine → RAG Evidence Retrieval & Clinical Summary Synthesis.",
    implementation:
      "Engineered strict split-first feature pipelines preventing cross-fold contamination. Benchmarked standard (0.50) vs clinical operating thresholds (0.35 and 0.25) to prioritize diagnostic sensitivity. Built RAG layer linking patient risk attributions with peer-reviewed medical guidance.",
    challenges: [
      "Eliminating subtle target and temporal data leakage across high-dimensional survey datasets",
      "Harmonizing probabilistic machine learning outputs with clinical evidence retrieval safely",
    ],
    decisions: [
      {
        title: "Threshold-Aware Optimization over Fixed 0.5 Cutoff",
        reason:
          "In preventive healthcare, false negatives carry far higher danger than false positives; tuning thresholds boosted diagnostic sensitivity from 55.14% to 81.78%.",
      },
      {
        title: "SHAP-Grounded Retrieval-Augmented Generation",
        reason:
          "Prevents LLM hallucinations by forcing clinical narrative generation to cite computed SHAP feature importance values and verified medical literature.",
      },
    ],
    outcomes: [
      "Validated framework achieving 91.61% accuracy and 0.9191 ROC-AUC on the 7,809-patient NHANES cohort",
      "Explainable digital twin architecture bridging statistical risk scores and physician-interpretable insights",
    ],
    learnings: [
      "Threshold calibration is as critical as model architecture choice in diagnostic machine learning",
      "Healthcare AI adoption requires transparent feature attribution rather than raw probability scores",
    ],
    status: "in-progress",
    color: "#06B6D4",
  },

  {
    slug: "vajra",
    title: "Project Vajra",
    subtitle: "Automated Intelligent Defence Agent of Cybersecurity with DevSecOps CI/CD Autoloop",
    description:
      "An autonomous cyber defence platform engineered to bridge the gap between attack sophistication and defensive capability through hybrid AI real-time telemetry analysis and continuous CI/CD model retraining with zero downtime.",
    longDescription:
      "Project Vajra introduces a self-evolving 'digital immune system' countering Distributed Denial of Service (DDoS) multi-vector assaults. By synergizing unsupervised deep learning Autoencoders (for zero-day anomaly detection) with supervised Random Forest classifiers (for known signature classification), the engine inspects high-velocity network flow telemetry (IP entropy, SYN/FIN flag ratios, packet velocity) at line speed. Natively integrated with DevSecOps CI/CD pipelines, high-confidence novel threats trigger automated retraining, validation against golden test suites, and Kubernetes hot-swapping in under 60 seconds without service downtime.",
    category: ["Cybersecurity", "AI / ML", "DevSecOps", "Research"],
    year: 2025,
    featured: true,
    priority: 1,
    projectType: "academic",
    technologies: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Autoencoders",
      "Random Forest",
      "Docker",
      "Kubernetes",
      "Kafka",
      "DevSecOps CI/CD",
      "BGP Flowspec",
    ],
    githubUrl: "https://github.com/nowitsarpit/Vajra",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Co-Author & Lead Systems / ML Engineer",
    problem:
      "Traditional static firewalls and signature-based IDSs are fundamentally reactive against polymorphic high-volume botnets. Static AI defenses rapidly suffer from 'model atrophy' as attacker behaviors shift over time.",
    solution:
      "A hybrid AI defense platform that combines deep reconstruction error anomaly detection with supervised classification, tied to an automated closed-loop CI/CD pipeline that retrains and deploys models autonomously.",
    architecture:
      "Telemetry Tap & SPAN Capture → Kafka Traffic Stream Buffer → Real-Time Feature Extraction (IP Entropy, Packet Rates) → Hybrid AI Core (Autoencoder + Random Forest) → Automated BGP Flowspec Mitigation & Kubernetes Zero-Downtime Hot-Swapping.",
    implementation:
      "Engineered feature extraction calculating source/destination entropy and packet velocity over dynamic time windows. Validated on benchmark datasets (CIC-DDoS2019, UNSW-NB15, NSL-KDD) achieving >98% detection accuracy. Implemented CI/CD retraining triggering when anomaly thresholds are exceeded.",
    challenges: [
      "Mitigating volumetric attacks in simulated real-time in under 5 seconds without dropping benign traffic",
      "Maintaining high model accuracy while completely eliminating manual intervention during zero-day signature retraining",
    ],
    decisions: [
      {
        title: "Hybrid AI: Autoencoder + Random Forest Ensemble",
        reason:
          "Unsupervised Autoencoders excel at spotting novel zero-day reconstruction discrepancies while Random Forests provide rapid, explainable classification of known attack vectors.",
      },
      {
        title: "CI/CD Autoloop for Model Atrophy Prevention",
        reason:
          "Shifts security operations from delayed human triage to autonomous, continuous retraining that restores degraded model accuracy in under 30 minutes.",
      },
    ],
    outcomes: [
      "Published research paper under CISIT Easychair",
      "Demonstrated 98.8% accuracy and 98.5% F1-score with 0.22% False Positive Rate on CIC-DDoS2019",
      "Sub-second detection with automated mitigation rule generation under 4.3 seconds",
    ],
    learnings: [
      "Continuous retraining loops must include strict golden-set regression testing to prevent poisoning attacks",
      "Network flow feature engineering (entropy, flag ratios) outperforms raw payload inspection at terabit scale",
    ],
    status: "completed",
    color: "#EF4444",
  },

  {
    slug: "honeypot",
    title: "HoneyPot",
    subtitle: "Instrumented Decoy Intrusion Detection & Threat Intelligence System",
    description:
      "A cybersecurity honeypot system designed to attract, observe, and analyze unauthorized access attempts, capturing attacker behavior patterns and generating structured threat intelligence.",
    longDescription:
      "HoneyPot creates deceptive, instrumented network services designed to detect reconnaissance activities, brute-force intrusions, and exploit payloads in real-time. By simulating authentic service endpoints (SSH, HTTP, FTP) in an isolated sandbox, the system logs attacker keystrokes, connection provenance, payload hashes, and automated scanning heuristics to generate actionable threat intelligence feeds.",
    category: ["Cybersecurity", "Systems", "Networking"],
    year: 2024,
    featured: false,
    priority: 2,
    projectType: "academic",
    technologies: ["Python", "Socket Programming", "Kali Linux", "Threat Intelligence", "Log Analysis", "Docker"],
    githubUrl: "https://github.com/nowitsarpit/HoneyPot",
    liveUrl: "",
    demoUrl: "",
    videoUrl: "",
    screenshots: [],
    architectureImage: "",
    role: "Cybersecurity Developer",
    problem:
      "Security teams lack visibility into early-stage reconnaissance and active adversary exploitation tactics before production boundaries are breached.",
    solution:
      "A deployable decoy sensor grid that traps unauthorized connection attempts, records attacker payloads, and alerts security operations without risking production assets.",
    architecture:
      "Low-Interaction Emulated Services → Socket Listener & Protocol Handler → Session Capture & Payload Hasher → Structured Security Audit Database → Threat Report Dashboard.",
    implementation:
      "Implemented socket-level protocol handlers that emulate standard service banners. Logged remote IP telemetry, authentication attempts, and command payloads into structured forensic records.",
    challenges: [
      "Ensuring decoy sandbox isolation so the honeypot cannot be pivoted into an external attack launchpad",
      "Filtering high-frequency automated bot scanners from deliberate manual adversary probes",
    ],
    decisions: [
      {
        title: "Low-Interaction Socket Emulation",
        reason:
          "Simulates necessary protocol responses to capture adversary intent while preventing arbitrary code execution on host systems.",
      },
    ],
    outcomes: [
      "Operational decoy intrusion detection system capturing live scan and payload patterns",
      "Automated logging and forensic categorization of attacker IP behavior",
    ],
    learnings: [
      "Strict network containment and firewall segmentation are non-negotiable prerequisites when running honeypots",
    ],
    status: "completed",
    color: "#DC2626",
  },
];
