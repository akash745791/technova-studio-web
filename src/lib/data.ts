import { Service, Project, SiteSettings, FAQItem } from "./types";

export const initialSiteSettings: SiteSettings = {
  id: "default",
  brand_name: "TECHNOVA STUDIO",
  tagline: "Your Ideas. Our Technology. Real Digital Experiences.",
  contact_email: "technovastudio.in@gmail.com",
  phone_1: "+91 92141 33787",
  phone_2: "+91 63755 47551",
  whatsapp_1: "+91 92141 33787",
  whatsapp_2: "+91 63755 47551",
  instagram_url: "https://www.instagram.com/technova_studio.in/",
  hero_headline: "Your Ideas. Our Technology. Real Digital Experiences.",
  hero_subheadline: "TECHNOVA STUDIO helps businesses turn ideas into professional websites, powerful digital solutions, and smarter online experiences.",
  about_headline: "About TECHNOVA STUDIO",
  about_body: "Technology should make ideas possible, businesses stronger, and digital experiences easier to use. TECHNOVA STUDIO was created around this belief. We focus on building professional websites and practical digital solutions that help individuals, startups, and businesses establish and improve their online presence.",
  seo_title: "TECHNOVA STUDIO — Web Development, AI Solutions & Security-Conscious Digital Engineering",
  seo_description: "TECHNOVA STUDIO builds professional websites, responsive frontend interfaces, reliable backends, practical AI integrations, and security-conscious digital solutions.",
};

export const initialServices: Service[] = [
  {
    id: "srv-1",
    title: "Website Development",
    slug: "website-development",
    short_description: "Modern, responsive business websites, landing pages, service websites, portfolio sites, and custom web experiences built for high conversion.",
    full_description: "At TECHNOVA STUDIO, our website development service transforms your business concepts into fully custom, fast-loading, and mobile-first web platforms. We do not rely on bloated generic templates; every website is architected with clean semantic markup, modular styling, and search engine optimization fundamentals.",
    deliverables: [
      { title: "Custom Responsive Design", description: "Flawless rendering on smartphones, tablets, laptops, and ultra-wide desktop monitors." },
      { title: "Clean Navigation & Architecture", description: "Intuitive hierarchy, sticky navigations, accessible focus states, and frictionless user flows." },
      { title: "Conversion-Optimized Contact Systems", description: "Custom enquiry forms with real-time validation, spam prevention, and email notifications." },
      { title: "Technical SEO Fundamentals", description: "Structured metadata, Open Graph tags, XML sitemaps, robots.txt, and fast initial page render." },
      { title: "CMS / Admin Integration", description: "Manage announcements, content, portfolio items, and services without writing code." },
      { title: "Deployment & Domain Setup Assistance", description: "HTTPS SSL setup, DNS configuration, and automated CI/CD pipeline deployment." }
    ],
    faqs: [
      { q: "How long does a website take to build?", a: "A focused business website typically takes 2 to 4 weeks depending on scope, content readiness, and custom integrations." },
      { q: "Will my website work smoothly on all mobile devices?", a: "Yes. Every website is engineered mobile-first and tested across iOS, Android, and diverse screen widths down to 320px." },
      { q: "Can I edit text and images after launch?", a: "Yes. We integrate an admin content panel so you can update text, services, and projects directly." }
    ],
    starting_price: "Starting from ₹5,000",
    published: true,
    display_order: 1,
    icon_name: "Globe"
  },
  {
    id: "srv-2",
    title: "Frontend Development",
    slug: "frontend-development",
    short_description: "Accessible, high-performance user interfaces with reusable modern components, fluid micro-interactions, and cross-browser consistency.",
    full_description: "Our frontend engineering focuses on translating UI/UX wireframes into pixel-perfect, accessible, and performant digital interfaces. Built with Next.js, React, TypeScript, and Tailwind CSS, our applications deliver snappy transitions, zero layout shifts, and WCAG-compliant keyboard accessibility.",
    deliverables: [
      { title: "Component-Driven Architecture", description: "Reusable, modular components organized cleanly for maintainability and scalability." },
      { title: "Fluid Motion & Micro-Interactions", description: "Subtle Framer Motion animations that reinforce feedback without hurting performance." },
      { title: "Accessible Forms & Validation", description: "Zod-validated schemas, informative field error messages, and seamless tab navigation." },
      { title: "Cross-Browser Compatibility", description: "Rigorous testing across modern Chrome, Safari, Edge, Firefox, and mobile viewports." },
      { title: "Core Web Vitals Optimization", description: "Sub-second Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS)." }
    ],
    faqs: [
      { q: "Can you build the frontend for our existing backend API?", a: "Yes. We specialize in connecting modern frontend interfaces to existing REST or GraphQL backends with typed contracts." },
      { q: "Do you support dark mode and custom themes?", a: "Yes, we implement CSS variable-based theming with smooth transitions and system preference detection." }
    ],
    starting_price: "Starting from ₹5,000",
    published: true,
    display_order: 2,
    icon_name: "Layout"
  },
  {
    id: "srv-3",
    title: "Backend Development & APIs",
    slug: "backend-apis",
    short_description: "Robust server-side functionality, relational databases, RESTful endpoints, secure auth, and third-party integrations suited to each project.",
    full_description: "We architect secure, scalable, and maintainable backend systems. From database schemas and relational data modeling with PostgreSQL and Supabase to serverless route handlers, rate limiting, and webhook processing, we ensure your data layer is ironclad and performant.",
    deliverables: [
      { title: "Secure Database Modeling", description: "PostgreSQL schema design with UUIDs, foreign keys, indexes, and Row Level Security." },
      { title: "REST & Serverless APIs", description: "Type-safe Next.js route handlers with strict payload validation and clean status codes." },
      { title: "Authentication & Role-Based Access", description: "Session security, encrypted tokens, and server-side authorization checks." },
      { title: "Rate Limiting & Abuse Prevention", description: "IP-based rate limits and honeypots to defend against automated spam and DDoS." },
      { title: "Safe Logging & Auditing", description: "Operational diagnostics that redact passwords, tokens, and personally identifiable data." }
    ],
    faqs: [
      { q: "Which database technologies do you recommend?", a: "We primarily work with PostgreSQL, Supabase, and Redis for serverless and relational workloads, tailoring choices to your needs." },
      { q: "How do you protect private customer data?", a: "We enforce Row Level Security, encrypt environment secrets, and perform validation strictly on the server." }
    ],
    starting_price: "Starting from ₹8,000",
    published: true,
    display_order: 3,
    icon_name: "Server"
  },
  {
    id: "srv-4",
    title: "AI Solutions & Automation",
    slug: "ai-solutions",
    short_description: "Practical AI-powered features, workflow automation, LLM integrations, and custom digital assistants designed for business utility.",
    full_description: "AI is most valuable when solving real operational problems. We help businesses integrate practical artificial intelligence—such as intelligent document search, automated enquiry routing, LLM-driven summaries, and customer support flows—without unnecessary complexity.",
    deliverables: [
      { title: "Practical LLM Integration", description: "Connecting Gemini and OpenAI models to your workflows with precise structured outputs." },
      { title: "Business Workflow Automation", description: "Automating manual data entry, lead categorization, and notification pipelines." },
      { title: "Custom Knowledge Retrieval", description: "Semantic search and retrieval for FAQs, documentation, and internal team resources." },
      { title: "Transparent Cost & Token Controls", description: "Architecture designed with caching and rate limits to keep AI API usage predictable." }
    ],
    faqs: [
      { q: "Do AI integrations require recurring monthly costs?", a: "Yes, third-party model providers (e.g. Google Gemini, OpenAI) charge for API tokens based on usage. We optimize prompts to minimize spend." },
      { q: "Can AI be integrated into our current website?", a: "Yes, we can add conversational widgets, document processors, or automated quote estimators to existing systems." }
    ],
    starting_price: "Starting from ₹10,000",
    published: true,
    display_order: 4,
    icon_name: "Cpu"
  },
  {
    id: "srv-5",
    title: "Cybersecurity-Focused Development",
    slug: "cybersecurity-development",
    short_description: "Security-conscious web engineering, vulnerability mitigation, secure auth flows, dependency audits, and defensive headers.",
    full_description: "Security is not an afterthought at TECHNOVA STUDIO. We engineer every digital asset following defensive security principles: strict Content Security Policies, input sanitation, CSRF mitigation, safe dependency scanning, and zero plain-text secret exposure.",
    deliverables: [
      { title: "Defensive Architecture Review", description: "Auditing authentication, session lifecycles, and database permissions against common risks." },
      { title: "HTTP Security Headers", description: "Configuration of HSTS, CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy." },
      { title: "Dependency Vulnerability Auditing", description: "Automated scanning and patching of vulnerable npm packages and outdated runtime libraries." },
      { title: "Row Level Security (RLS) Hardening", description: "Ensuring database tables cannot be leaked or written to by malicious anonymous callers." },
      { title: "Input Escaping & Injection Defense", description: "Defending against SQL injection, cross-site scripting (XSS), and prototype pollution." }
    ],
    faqs: [
      { q: "Do you provide certified penetration testing?", a: "We offer security-conscious development, dependency reviews, and defensive configuration. For accredited pentests, we clearly define scope within our engineering boundaries." },
      { q: "How do you handle security updates?", a: "We configure routine dependency checks and provide maintenance retainers for continuous vulnerability remediation." }
    ],
    starting_price: "Starting from ₹6,000",
    published: true,
    display_order: 5,
    icon_name: "ShieldCheck"
  },
  {
    id: "srv-6",
    title: "Website Maintenance & Bug Fixing",
    slug: "maintenance-bug-fixing",
    short_description: "Rapid troubleshooting, UI glitch repairs, performance tuning, dependency upgrades, and ongoing peace-of-mind support.",
    full_description: "Broken contact forms, layout glitches on mobile screens, slow load times, or unexpected 500 errors hurt conversions. TECHNOVA STUDIO provides systematic troubleshooting, code refactoring, and routine maintenance to keep your digital platform healthy and fast.",
    deliverables: [
      { title: "Bug Diagnosis & Remediation", description: "Isolating and resolving JavaScript errors, styling anomalies, and backend failures." },
      { title: "Performance Tuning & Core Web Vitals", description: "Asset compression, bundle splitting, image optimization, and script deferral." },
      { title: "Mobile Viewport Fixes", description: "Correcting horizontal scrollbars, tap target sizes, and responsive breakage on small phones." },
      { title: "Regular Backups & Health Checks", description: "Database snapshot verification, uptime monitoring, and error log reviews." }
    ],
    faqs: [
      { q: "Can you fix a website built by someone else?", a: "Yes. We inspect the existing codebase, identify the root causes of issues, and provide an honest assessment before making changes." },
      { q: "Do you offer emergency bug fixing?", a: "Yes, we prioritize critical outages such as broken checkout or contact forms to minimize business downtime." }
    ],
    starting_price: "Starting from ₹3,000",
    published: true,
    display_order: 6,
    icon_name: "Wrench"
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Apex Commerce Platform (Studio Demo)",
    slug: "apex-commerce-demo",
    summary: "A high-performance modern e-commerce storefront engineered with Next.js, Stripe integration, and sub-second catalog filtering.",
    description: "Built by TECHNOVA STUDIO to demonstrate modern web performance standards. Features dynamic server rendering, instant faceted search, responsive product grids, and a streamlined checkout flow designed for high conversion.",
    category: "Website Development",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe API"],
    deliverables: ["Interactive Product Catalog", "Real-time Stock Filtering", "Responsive Mobile Cart", "Stripe Checkout Sandbox"],
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    ],
    project_url: "https://github.com/technova-studio",
    featured: true,
    published: true,
    display_order: 1,
    client_note: "Architectural showcase built by TECHNOVA STUDIO to illustrate modern server-side rendering and conversion flows."
  },
  {
    id: "proj-2",
    title: "Nexus AI Knowledge Assistant (Studio Demo)",
    slug: "nexus-ai-demo",
    summary: "An intelligent document search and customer support automation engine utilizing Gemini LLM embeddings and vector search.",
    description: "Engineered to showcase practical business AI. Allows users to upload support manuals or FAQs and retrieve accurate, grounded answers in real-time with zero hallucinations and strict token cost controls.",
    category: "AI Solutions & Automation",
    technologies: ["Google Gemini API", "Next.js App Router", "Vector Database", "Tailwind CSS"],
    deliverables: ["Document Parsing Engine", "Semantic Search", "Streaming Chat UI", "Token Usage Telemetry"],
    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80"
    ],
    project_url: "https://github.com/technova-studio",
    featured: true,
    published: true,
    display_order: 2,
    client_note: "Concept prototype demonstrating structured prompt engineering and zero-latency streaming responses."
  },
  {
    id: "proj-3",
    title: "Fortress Web Shield (Studio Demo)",
    slug: "fortress-security-demo",
    summary: "A defense-in-depth security demonstration showing automated header auditing, CSRF prevention, and Row Level Security.",
    description: "An interactive security testbed illustrating common vulnerabilities (XSS, SQL injection, insecure direct object references) alongside TECHNOVA STUDIO defensive mitigations and audit reports.",
    category: "Cybersecurity-Focused Development",
    technologies: ["PostgreSQL RLS", "TypeScript", "Next.js Security Headers", "Zod"],
    deliverables: ["Defensive RLS Configuration", "Content Security Policy (CSP)", "Input Sanitation Testbed"],
    cover_image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
    ],
    project_url: "https://github.com/technova-studio",
    featured: true,
    published: true,
    display_order: 3,
    client_note: "Reference implementation for zero-trust database policies and cryptographic token validation."
  }
];

export const generalFAQs: FAQItem[] = [
  {
    q: "What is the minimum budget to get a website built?",
    a: "At TECHNOVA STUDIO, our custom website development starts from ₹5,000 for responsive single-page and starter business sites (including mobile-first design, SEO fundamentals, and direct WhatsApp integration). All pricing is in Indian Rupees (INR / ₹) with zero hidden fees."
  },
  {
    q: "What types of clients does TECHNOVA STUDIO work with?",
    a: "We work with small and medium-sized businesses, local shops, startups, entrepreneurs, and personal brands seeking modern websites, custom frontend/backend development, practical AI automations, and website maintenance."
  },
  {
    q: "How do we get started on a project?",
    a: "You can submit an enquiry via our 'Request a Quote' page or message us directly on WhatsApp or email. We will review your requirements, confirm what is feasible, and provide a clear scope, timeline, and estimate."
  },
  {
    q: "Do you provide fixed pricing or custom estimates?",
    a: "Website packages start from ₹5,000. Because every project has distinct architectural and feature requirements, we evaluate your exact scope and offer clear, itemized estimates in INR (₹) without surprise charges."
  },
  {
    q: "Can you assist with website deployment and domain setup?",
    a: "Yes. We configure DNS records, SSL certificates, production hosting (e.g. Vercel, Supabase, Cloudflare), and automated deployment pipelines."
  },
  {
    q: "What is your approach to security and privacy?",
    a: "We implement defense-in-depth from day one: secure HTTP response headers, Row Level Security on databases, server-side input validation, encrypted credentials, and strict data privacy compliance."
  },
  {
    q: "How can I contact the studio directly?",
    a: "You can email us at technovastudio.in@gmail.com, reach us on WhatsApp at +91 92141 33787 or +91 63755 47551, or visit our Instagram profile @technova_studio.in."
  }
];
