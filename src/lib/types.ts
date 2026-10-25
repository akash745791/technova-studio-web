export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  deliverables: ServiceDeliverable[];
  faqs: FAQItem[];
  starting_price?: string;
  published: boolean;
  display_order: number;
  icon_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  technologies: string[];
  deliverables: string[];
  cover_image: string;
  gallery: string[];
  project_url?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  client_note?: string;
  created_at?: string;
  updated_at?: string;
}

export type EnquiryStatus = 'new' | 'reviewing' | 'contacted' | 'in_progress' | 'completed' | 'closed';
export type PreferredContactMethod = 'email' | 'whatsapp' | 'phone';
export type NotificationStatus = 'pending' | 'sent' | 'failed' | 'skipped';

export interface Enquiry {
  id: string;
  reference_id: string;
  client_name: string;
  email: string;
  phone?: string;
  business_name?: string;
  service_id?: string;
  service_slug?: string;
  project_title: string;
  project_description: string;
  budget_range?: string;
  timeline?: string;
  preferred_contact_method: PreferredContactMethod;
  status: EnquiryStatus;
  internal_notes?: string;
  assigned_to?: string; // Employee ID
  assigned_employee_name?: string; // Employee Name
  privacy_consent: boolean;
  notification_status: NotificationStatus;
  notification_error?: string;
  created_at: string;
  updated_at?: string;
}

export type EmployeeStatus = 'active' | 'busy' | 'away' | 'offline';

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: EmployeeStatus;
  avatar_color?: string;
  current_project?: string;
  joined_date: string;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in_progress' | 'in_review' | 'completed';

export interface EmployeeTask {
  id: string;
  title: string;
  description: string;
  employee_id: string;
  employee_name: string;
  related_enquiry_ref?: string;
  client_or_project: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date?: string;
  created_at: string;
  updated_at: string;
  notes?: string;
}

export interface SiteSettings {
  id: string;
  brand_name: string;
  tagline: string;
  contact_email: string;
  phone_1: string;
  phone_2: string;
  whatsapp_1: string;
  whatsapp_2: string;
  instagram_url: string;
  hero_headline: string;
  hero_subheadline: string;
  about_headline: string;
  about_body: string;
  seo_title: string;
  seo_description: string;
  updated_at?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  reference_id?: string;
}
