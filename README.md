# TECHNOVA STUDIO — Complete Production Web Application

> **“Your Ideas. Our Technology. Real Digital Experiences.”**  
> *Official Web Platform for TECHNOVA STUDIO*

---

## 1. Overview & Positioning

TECHNOVA STUDIO is a modern digital technology studio specializing in:
- **Website Development:** Modern responsive business websites, landing pages, and web experiences.
- **Frontend Development:** Accessible, high-performance interfaces with reusable modern components.
- **Backend Development & APIs:** Secure server-side functionality, database-backed applications, and APIs.
- **AI Solutions & Automation:** Practical AI workflows, LLM integrations, and custom digital assistants.
- **Cybersecurity-Focused Development:** Security-conscious development, defensive headers, and vulnerability mitigation.
- **Website Maintenance & Bug Fixing:** Rapid troubleshooting, UI glitch fixes, and performance optimization.

### Official Studio Contact Channels
- **Email:** `technovastudio.in@gmail.com`
- **Phone / WhatsApp 1:** `+91 74579 12227` (`https://wa.me/917457912227`)
- **Phone / WhatsApp 2:** `+91 63755 47551` (`https://wa.me/916375547551`)
- **Instagram:** `https://www.instagram.com/technova_studio.in/`

---

## 2. Technical Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS with custom dark tech palette
- **3D Tech Visual:** Three.js with WebGL capability detection, mouse parallax, and accessible static fallback
- **Backend & Database:** Supabase (PostgreSQL with Row Level Security) + Server-side fallback persistence adapter
- **Validation:** Zod schemas for all client and server payloads
- **Spam Defense:** Honeypot field and server-side rate limits
- **Email Notifications:** Resend API integration with admin retry mechanisms
- **Admin Dashboard:** Private `/admin` console with JWT session cookies, enquiry status tracking, private notes, and content CRUD

---

## 3. Directory Structure

```
technova-web/
├── public/
│   ├── brand/
│   │   └── technova-logo.jpg      # Official brand asset
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (public pages)
│   │   │   ├── page.tsx           # Homepage (Hero, 3D Canvas, Services, Why Us, Process, Featured Work)
│   │   │   ├── about/page.tsx     # Complete About Us page copy
│   │   │   ├── services/          # Services hub & dynamic [slug] detail pages
│   │   │   ├── portfolio/         # Filterable portfolio & dynamic [slug] case studies
│   │   │   ├── contact/page.tsx   # Contact page with real form & WhatsApp actions
│   │   │   ├── get-a-quote/       # Custom quotation request form with prefilled services
│   │   │   ├── faq/page.tsx       # Accessible FAQ accordion
│   │   │   ├── privacy-policy/    # Detailed privacy disclosure
│   │   │   ├── terms/page.tsx     # Terms and conditions
│   │   │   ├── cookie-policy/     # Cookie transparency disclosure
│   │   │   └── not-found.tsx      # Custom 404 error page
│   │   ├── admin/
│   │   │   ├── login/page.tsx     # Secure admin login
│   │   │   └── page.tsx           # Protected admin dashboard
│   │   ├── api/
│   │   │   ├── enquiries/         # Public submission & Admin read endpoints
│   │   │   └── admin/             # Auth, Services CRUD, Projects CRUD, Settings
│   │   ├── sitemap.ts             # Dynamic XML sitemap generator
│   │   ├── robots.ts              # Robots.txt configuration
│   │   ├── globals.css            # Custom CSS & accessibility tokens
│   │   └── layout.tsx             # Root layout with SEO and metadata
│   ├── components/
│   │   ├── Logo.tsx               # Typographic wordmark & official emblem
│   │   ├── Navbar.tsx             # Responsive sticky navigation & mobile drawer
│   │   ├── Footer.tsx             # Complete footer with contact & legal links
│   │   ├── Hero3D.tsx             # Interactive Three.js geometric scene + fallback
│   │   ├── ServiceCard.tsx        # Service card with direct quote triggers
│   │   ├── ProjectCard.tsx        # Project card with technology badges
│   │   ├── QuoteForm.tsx          # Real-time validated enquiry form
│   │   ├── ContactForm.tsx        # Direct contact form
│   │   ├── FAQAccordion.tsx       # Expandable accessible accordion
│   │   └── admin/                 # Admin console tab managers
│   └── lib/
│       ├── types.ts               # Core TypeScript definitions
│       ├── data.ts                # Initial verified seed data
│       ├── store.ts               # Dual-mode repository (Supabase + Local fallback)
│       ├── auth.ts                # Session tokens & credential checks
│       ├── validations.ts         # Zod schemas
│       ├── email.ts               # Resend notification handler
│       └── supabase.ts            # Supabase client & server instances
├── supabase/
│   ├── migrations/
│   │   └── 20261024000000_init_technova_schema.sql  # Production PostgreSQL schema & RLS
│   └── seed.sql                   # Verified initial seed data
├── .env.example                   # Environment variable template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 4. Getting Started Locally

### Prerequisites
- Node.js 18.17+ or 20+ (tested on Node.js v24)
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Admin Console Access

1. Navigate to `/admin/login`.
2. Enter the administrator credentials configured in `.env.local`:
   - **Email:** `technovastudio.in@gmail.com`
   - **Password:** `TechnovaStudio@Admin2026!` *(Change this in `.env.local` for production)*
3. You will be redirected to the protected dashboard at `/admin` where you can:
   - Monitor enquiries and review submission timestamps.
   - Change enquiry status (`new`, `reviewing`, `contacted`, `in_progress`, `completed`, `closed`).
   - Add private internal notes.
   - Retry failed email notifications.
   - Edit, publish, or delete services and portfolio showcases.
   - Update homepage text, contact numbers, and SEO defaults in real-time.

---

## 6. Supabase Database & Production Setup

When you are ready to connect a live Supabase PostgreSQL database:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in Supabase and run:
   - `supabase/migrations/20261024000000_init_technova_schema.sql`
   - `supabase/seed.sql`
3. Retrieve your project credentials from **Project Settings > API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Add these keys to your `.env.local` or Vercel Environment Variables. The app automatically switches from local storage to live Supabase PostgreSQL with zero downtime!

---

## 7. Email Notifications Setup (Optional)

1. Sign up at [resend.com](https://resend.com) and verify your sending domain (e.g., `technovastudio.in`).
2. Add your API key to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   NOTIFICATION_EMAIL_TO=technovastudio.in@gmail.com
   ```
3. Whenever a client submits an enquiry on `/get-a-quote` or `/contact`, a formatted HTML notification is automatically delivered to the studio team. If email delivery is skipped or encounters a network error, the enquiry is safely preserved in the database and can be retried directly from the admin dashboard.

---

## 8. Deployment to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the project into [Vercel](https://vercel.com).
3. Set the environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
   - `ADMIN_EMAIL` = `technovastudio.in@gmail.com`
   - `ADMIN_PASSWORD` = `<strong-random-password>`
   - `ADMIN_JWT_SECRET` = `<random-32-character-secret>`
   - `NEXT_PUBLIC_SUPABASE_URL` = `<supabase-project-url>`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<supabase-anon-key>`
   - `SUPABASE_SERVICE_ROLE_KEY` = `<supabase-service-role-key>`
4. Deploy! Vercel will build and host the Next.js App Router application with edge optimizations and automatic SSL.

---

## 9. Testing & Acceptance Criteria Verification

- [x] **Navigation:** All links (`/`, `/about`, `/services`, `/portfolio`, `/contact`, `/get-a-quote`, `/faq`) route correctly.
- [x] **Direct Contacts:** Mailto, Phone 1, Phone 2, WhatsApp 1, WhatsApp 2, and Instagram open official destinations.
- [x] **Validation:** Zod client & server validation rejects empty or invalid forms and traps bot honeypots.
- [x] **Backend Persistence:** Submissions generate reference IDs (`TNS-2026-XXXXX`) and persist to the database store.
- [x] **Admin Security:** Protected routes enforce JWT verification; unauthorized requests are rejected.
- [x] **Responsive & Accessible:** Tested across viewports from 320px mobile to desktop with keyboard focus and prefers-reduced-motion support.
