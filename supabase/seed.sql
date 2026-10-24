-- =========================================================================
-- TECHNOVA STUDIO — INITIAL SEED DATA
-- Note: Sample showcase projects are clearly labeled as demo architectures
-- =========================================================================

-- Site Settings
INSERT INTO public.site_settings (id, brand_name, tagline, contact_email, phone_1, phone_2, whatsapp_1, whatsapp_2, instagram_url, hero_headline, hero_subheadline)
VALUES (
  'default',
  'TECHNOVA STUDIO',
  'Your Ideas. Our Technology. Real Digital Experiences.',
  'technovastudio.in@gmail.com',
  '+91 74579 12227',
  '+91 63755 47551',
  '+91 74579 12227',
  '+91 63755 47551',
  'https://www.instagram.com/technova_studio.in/',
  'Your Ideas. Our Technology. Real Digital Experiences.',
  'TECHNOVA STUDIO helps businesses turn ideas into professional websites, powerful digital solutions, and smarter online experiences.'
) ON CONFLICT (id) DO UPDATE SET
  brand_name = EXCLUDED.brand_name,
  tagline = EXCLUDED.tagline,
  contact_email = EXCLUDED.contact_email,
  phone_1 = EXCLUDED.phone_1,
  phone_2 = EXCLUDED.phone_2;

-- 6 Core Services
INSERT INTO public.services (title, slug, short_description, full_description, deliverables, faqs, starting_price, published, display_order, icon_name)
VALUES
(
  'Website Development',
  'website-development',
  'Modern, responsive business websites, landing pages, service websites, portfolio sites, and custom web experiences built for high conversion.',
  'At TECHNOVA STUDIO, our website development service transforms your business concepts into fully custom, fast-loading, and mobile-first web platforms. We do not rely on bloated generic templates; every website is architected with clean semantic markup, modular styling, and search engine optimization fundamentals.',
  '[
    {"title": "Custom Responsive Design", "description": "Flawless rendering on smartphones, tablets, laptops, and ultra-wide desktop monitors."},
    {"title": "Clean Navigation & Architecture", "description": "Intuitive hierarchy, sticky navigations, accessible focus states, and frictionless user flows."},
    {"title": "Conversion-Optimized Contact Systems", "description": "Custom enquiry forms with real-time validation, spam prevention, and email notifications."},
    {"title": "Technical SEO Foundations", "description": "Structured data, Open Graph tags, XML sitemaps, robots.txt, and fast initial page render."},
    {"title": "CMS / Admin Integration", "description": "Manage announcements, content, portfolio items, and services without writing code."},
    {"title": "Deployment & Domain Setup Assistance", "description": "HTTPS SSL setup, DNS configuration, and automated CI/CD pipeline deployment."}
  ]'::jsonb,
  '[
    {"q": "How long does a website take to build?", "a": "A focused business website typically takes 2 to 4 weeks depending on scope, content readiness, and custom integrations."},
    {"q": "Will my website work smoothly on all mobile devices?", "a": "Yes. Every website is engineered mobile-first and tested across iOS, Android, and diverse screen widths down to 320px."},
    {"q": "Can I edit text and images after launch?", "a": "Yes. We integrate an admin content panel so you can update text, services, and projects directly."}
  ]'::jsonb,
  'Request a Quote',
  true,
  1,
  'Globe'
),
(
  'Frontend Development',
  'frontend-development',
  'Accessible, high-performance user interfaces with reusable modern components, fluid micro-interactions, and cross-browser consistency.',
  'Our frontend engineering focuses on translating UI/UX wireframes into pixel-perfect, accessible, and performant digital interfaces. Built with Next.js, React, TypeScript, and Tailwind CSS, our applications deliver snappy transitions, zero layout shifts, and WCAG-compliant keyboard accessibility.',
  '[
    {"title": "Component-Driven Architecture", "description": "Reusable, modular components organized cleanly for maintainability and scalability."},
    {"title": "Fluid Motion & Micro-Interactions", "description": "Subtle Framer Motion animations that reinforce feedback without hurting performance."},
    {"title": "Accessible Forms & Validation", "description": "Zod-validated schemas, informative field error messages, and seamless tab navigation."},
    {"title": "Cross-Browser Compatibility", "description": "Rigorous testing across modern Chrome, Safari, Edge, Firefox, and mobile viewports."},
    {"title": "Core Web Vitals Optimization", "description": "Sub-second Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS)."}
  ]'::jsonb,
  '[
    {"q": "Can you build the frontend for our existing backend API?", "a": "Yes. We specialize in connecting modern frontend interfaces to existing REST or GraphQL backends with typed contracts."},
    {"q": "Do you support dark mode and custom themes?", "a": "Yes, we implement CSS variable-based theming with smooth transitions and system preference detection."}
  ]'::jsonb,
  'Request a Quote',
  true,
  2,
  'Layout'
),
(
  'Backend Development & APIs',
  'backend-apis',
  'Robust server-side functionality, relational databases, RESTful endpoints, secure auth, and third-party integrations suited to each project.',
  'We architect secure, scalable, and maintainable backend systems. From database schemas and relational data modeling with PostgreSQL and Supabase to serverless route handlers, rate limiting, and webhook processing, we ensure your data layer is ironclad and performant.',
  '[
    {"title": "Secure Database Modeling", "description": "PostgreSQL schema design with UUIDs, foreign keys, indexes, and Row Level Security."},
    {"title": "REST & Serverless APIs", "description": "Type-safe Next.js route handlers with strict payload validation and clean status codes."},
    {"title": "Authentication & Role-Based Access", "description": "Session security, encrypted tokens, and server-side authorization checks."},
    {"title": "Rate Limiting & Abuse Prevention", "description": "IP-based rate limits and honeypots to defend against automated spam and DDoS."},
    {"title": "Safe Logging & Auditing", "description": "Operational diagnostics that redact passwords, tokens, and personally identifiable data."}
  ]'::jsonb,
  '[
    {"q": "Which database technologies do you recommend?", "a": "We primarily work with PostgreSQL, Supabase, and Redis for serverless and relational workloads, tailoring choices to your needs."},
    {"q": "How do you protect private customer data?", "a": "We enforce Row Level Security, encrypt environment secrets, and perform validation strictly on the server."}
  ]'::jsonb,
  'Request a Quote',
  true,
  3,
  'Server'
),
(
  'AI Solutions & Automation',
  'ai-solutions',
  'Practical AI-powered features, workflow automation, LLM integrations, and custom digital assistants designed for business utility.',
  'AI is most valuable when solving real operational problems. We help businesses integrate practical artificial intelligence—such as intelligent document search, automated enquiry routing, LLM-driven summaries, and customer support flows—without unnecessary complexity.',
  '[
    {"title": "Practical LLM Integration", "description": "Connecting Gemini and OpenAI models to your workflows with precise structured outputs."},
    {"title": "Business Workflow Automation", "description": "Automating manual data entry, lead categorization, and notification pipelines."},
    {"title": "Custom Knowledge Retrieval", "description": "Semantic search and retrieval for FAQs, documentation, and internal team resources."},
    {"title": "Transparent Cost & Token Controls", "description": "Architecture designed with caching and rate limits to keep AI API usage predictable."}
  ]'::jsonb,
  '[
    {"q": "Do AI integrations require recurring monthly costs?", "a": "Yes, third-party model providers (e.g. Google Gemini, OpenAI) charge for API tokens based on usage. We optimize prompts to minimize spend."},
    {"q": "Can AI be integrated into our current website?", "a": "Yes, we can add conversational widgets, document processors, or automated quote estimators to existing systems."}
  ]'::jsonb,
  'Request a Quote',
  true,
  4,
  'Cpu'
),
(
  'Cybersecurity-Focused Development',
  'cybersecurity-development',
  'Security-conscious web engineering, vulnerability mitigation, secure auth flows, dependency audits, and defensive headers.',
  'Security is not an afterthought at TECHNOVA STUDIO. We engineer every digital asset following defensive security principles: strict Content Security Policies, input sanitation, CSRF mitigation, safe dependency scanning, and zero plain-text secret exposure.',
  '[
    {"title": "Defensive Architecture Review", "description": "Auditing authentication, session lifecycles, and database permissions against common risks."},
    {"title": "HTTP Security Headers", "description": "Configuration of HSTS, CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy."},
    {"title": "Dependency Vulnerability Auditing", "description": "Automated scanning and patching of vulnerable npm packages and outdated runtime libraries."},
    {"title": "Row Level Security (RLS) Hardening", "description": "Ensuring database tables cannot be leaked or written to by malicious anonymous callers."},
    {"title": "Input Escaping & Injection Defense", "description": "Defending against SQL injection, cross-site scripting (XSS), and prototype pollution."}
  ]'::jsonb,
  '[
    {"q": "Do you provide certified penetration testing?", "a": "We offer security-conscious development, dependency reviews, and defensive configuration. For accredited pentests, we clearly define scope within our engineering boundaries."},
    {"q": "How do you handle security updates?", "a": "We configure routine dependency checks and provide maintenance retainers for continuous vulnerability remediation."}
  ]'::jsonb,
  'Request a Quote',
  true,
  5,
  'ShieldCheck'
),
(
  'Website Maintenance & Bug Fixing',
  'maintenance-bug-fixing',
  'Rapid troubleshooting, UI glitch repairs, performance tuning, dependency upgrades, and ongoing peace-of-mind support.',
  'Broken contact forms, layout glitches on mobile screens, slow load times, or unexpected 500 errors hurt conversions. TECHNOVA STUDIO provides systematic troubleshooting, code refactoring, and routine maintenance to keep your digital platform healthy and fast.',
  '[
    {"title": "Bug Diagnosis & Remediation", "description": "Isolating and resolving JavaScript errors, styling anomalies, and backend failures."},
    {"title": "Performance Tuning & Core Web Vitals", "description": "Asset compression, bundle splitting, image optimization, and script deferral."},
    {"title": "Mobile Viewport Fixes", "description": "Correcting horizontal scrollbars, tap target sizes, and responsive breakage on small phones."},
    {"title": "Regular Backups & Health Checks", "description": "Database snapshot verification, uptime monitoring, and error log reviews."}
  ]'::jsonb,
  '[
    {"q": "Can you fix a website built by someone else?", "a": "Yes. We inspect the existing codebase, identify the root causes of issues, and provide an honest assessment before making changes."},
    {"q": "Do you offer emergency bug fixing?", "a": "Yes, we prioritize critical outages such as broken checkout or contact forms to minimize business downtime."}
  ]'::jsonb,
  'Request a Quote',
  true,
  6,
  'Wrench'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  deliverables = EXCLUDED.deliverables,
  faqs = EXCLUDED.faqs,
  display_order = EXCLUDED.display_order;

-- Sample Projects (Clearly labeled as Studio Demo Architectures to maintain complete honesty)
INSERT INTO public.projects (title, slug, summary, description, category, technologies, deliverables, cover_image, gallery, project_url, featured, published, display_order, client_note)
VALUES
(
  'Apex Commerce Platform (Studio Demo)',
  'apex-commerce-demo',
  'A high-performance modern e-commerce storefront engineered with Next.js, Stripe integration, and sub-second catalog filtering.',
  'Built by TECHNOVA STUDIO to demonstrate modern web performance standards. Features dynamic server rendering, instant faceted search, responsive product grids, and a streamlined checkout flow designed for high conversion.',
  'Website Development',
  ARRAY['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe API'],
  ARRAY['Interactive Product Catalog', 'Real-time Stock Filtering', 'Responsive Mobile Cart', 'Stripe Checkout Sandbox'],
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'],
  'https://github.com/technova-studio',
  true,
  true,
  1,
  'Architectural showcase built by TECHNOVA STUDIO to illustrate modern server-side rendering and conversion flows.'
),
(
  'Nexus AI Knowledge Assistant (Studio Demo)',
  'nexus-ai-demo',
  'An intelligent document search and customer support automation engine utilizing Gemini LLM embeddings and vector search.',
  'Engineered to showcase practical business AI. Allows users to upload support manuals or FAQs and retrieve accurate, grounded answers in real-time with zero hallucinations and strict token cost controls.',
  'AI Solutions & Automation',
  ARRAY['Google Gemini API', 'Next.js App Router', 'Vector Database', 'Tailwind CSS'],
  ARRAY['Document Parsing Engine', 'Semantic Search', 'Streaming Chat UI', 'Token Usage Telemetry'],
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80'],
  'https://github.com/technova-studio',
  true,
  true,
  2,
  'Concept prototype demonstrating structured prompt engineering and zero-latency streaming responses.'
),
(
  'Fortress Web Shield (Studio Demo)',
  'fortress-security-demo',
  'A defense-in-depth security demonstration showing automated header auditing, CSRF prevention, and Row Level Security.',
  'An interactive security testbed illustrating common vulnerabilities (XSS, SQL injection, insecure direct object references) alongside TECHNOVA STUDIO defensive mitigations and audit reports.',
  'Cybersecurity-Focused Development',
  ARRAY['PostgreSQL RLS', 'TypeScript', 'Next.js Security Headers', 'Zod'],
  ARRAY['Defensive RLS Configuration', 'Content Security Policy (CSP)', 'Input Sanitation Testbed'],
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'],
  'https://github.com/technova-studio',
  true,
  true,
  3,
  'Reference implementation for zero-trust database policies and cryptographic token validation.'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  cover_image = EXCLUDED.cover_image,
  technologies = EXCLUDED.technologies,
  featured = EXCLUDED.featured;
