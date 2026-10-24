-- =========================================================================
-- TECHNOVA STUDIO — PRODUCTION DATABASE SCHEMA & ROW LEVEL SECURITY
-- =========================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  starting_price TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  icon_name TEXT NOT NULL DEFAULT 'Code2',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. PROJECTS TABLE (Case Studies & Portfolio)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  deliverables TEXT[] NOT NULL DEFAULT '{}',
  cover_image TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  project_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  client_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_id TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_slug TEXT,
  project_title TEXT NOT NULL,
  project_description TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  preferred_contact_method TEXT NOT NULL DEFAULT 'email' CHECK (preferred_contact_method IN ('email', 'whatsapp', 'phone')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'contacted', 'in_progress', 'completed', 'closed')),
  internal_notes TEXT,
  privacy_consent BOOLEAN NOT NULL DEFAULT false,
  notification_status TEXT NOT NULL DEFAULT 'pending' CHECK (notification_status IN ('pending', 'sent', 'failed', 'skipped')),
  notification_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  brand_name TEXT NOT NULL DEFAULT 'TECHNOVA STUDIO',
  tagline TEXT NOT NULL DEFAULT 'Your Ideas. Our Technology. Real Digital Experiences.',
  contact_email TEXT NOT NULL DEFAULT 'technovastudio.in@gmail.com',
  phone_1 TEXT NOT NULL DEFAULT '+91 74579 12227',
  phone_2 TEXT NOT NULL DEFAULT '+91 63755 47551',
  whatsapp_1 TEXT NOT NULL DEFAULT '+91 74579 12227',
  whatsapp_2 TEXT NOT NULL DEFAULT '+91 63755 47551',
  instagram_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/technova_studio.in/',
  hero_headline TEXT NOT NULL DEFAULT 'Your Ideas. Our Technology. Real Digital Experiences.',
  hero_subheadline TEXT NOT NULL DEFAULT 'TECHNOVA STUDIO helps businesses turn ideas into professional websites, powerful digital solutions, and smarter online experiences.',
  about_headline TEXT NOT NULL DEFAULT 'About TECHNOVA STUDIO',
  about_body TEXT NOT NULL DEFAULT 'Technology should make ideas possible, businesses stronger, and digital experiences easier to use. TECHNOVA STUDIO was created around this belief.',
  seo_title TEXT NOT NULL DEFAULT 'TECHNOVA STUDIO — Web Development, AI Solutions & Security-Conscious Digital Engineering',
  seo_description TEXT NOT NULL DEFAULT 'TECHNOVA STUDIO builds professional websites, responsive frontend interfaces, reliable backends, practical AI integrations, and security-conscious digital solutions.',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published_order ON public.services(published, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published_featured ON public.projects(published, featured);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_ref ON public.enquiries(reference_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles Policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins have full access to profiles" ON public.profiles;
CREATE POLICY "Admins have full access to profiles" ON public.profiles
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 2. Services Policies
DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Public can view published services" ON public.services
  FOR SELECT TO public
  USING (published = true);

DROP POLICY IF EXISTS "Admins have full access to services" ON public.services;
CREATE POLICY "Admins have full access to services" ON public.services
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 3. Projects Policies
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects" ON public.projects
  FOR SELECT TO public
  USING (published = true);

DROP POLICY IF EXISTS "Admins have full access to projects" ON public.projects;
CREATE POLICY "Admins have full access to projects" ON public.projects
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 4. Enquiries Policies
-- Anonymous visitors cannot SELECT or read any enquiries directly
DROP POLICY IF EXISTS "Public insert validated enquiries" ON public.enquiries;
CREATE POLICY "Public insert validated enquiries" ON public.enquiries
  FOR INSERT TO public
  WITH CHECK (privacy_consent = true);

DROP POLICY IF EXISTS "Admins have full access to enquiries" ON public.enquiries;
CREATE POLICY "Admins have full access to enquiries" ON public.enquiries
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 5. Site Settings Policies
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
CREATE POLICY "Public can read site settings" ON public.site_settings
  FOR SELECT TO public
  USING (true);

DROP POLICY IF EXISTS "Admins have full access to site settings" ON public.site_settings;
CREATE POLICY "Admins have full access to site settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.is_admin());
