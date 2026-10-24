import { z } from "zod";

export const enquirySchema = z.object({
  client_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  phone: z
    .string()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  business_name: z
    .string()
    .max(120, "Business name cannot exceed 120 characters")
    .optional()
    .or(z.literal("")),
  service_slug: z
    .string()
    .min(1, "Please select a service or choose 'General Project Discussion'"),
  project_title: z
    .string()
    .min(3, "Project title must be at least 3 characters")
    .max(150, "Project title cannot exceed 150 characters"),
  project_description: z
    .string()
    .min(15, "Please share at least a short description of what you want to build (min 15 characters)")
    .max(4000, "Description cannot exceed 4000 characters"),
  budget_range: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),
  timeline: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),
  preferred_contact_method: z.enum(["email", "whatsapp", "phone"], {
    errorMap: () => ({ message: "Please select your preferred contact method" }),
  }),
  privacy_consent: z
    .boolean()
    .refine((val) => val === true, "You must agree to the privacy policy to submit your enquiry"),
  // Spam honeypot: should remain empty
  honeypot: z.string().max(0, "Bot submission rejected").optional().or(z.literal("")),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export const adminLoginSchema = z.object({
  email: z.string().min(3, "Please enter your admin username or email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const serviceFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  short_description: z.string().min(10, "Short description is required"),
  full_description: z.string().min(20, "Full description is required"),
  deliverables: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
  faqs: z.array(
    z.object({
      q: z.string(),
      a: z.string(),
    })
  ),
  starting_price: z.string().optional(),
  published: z.boolean(),
  display_order: z.number().int(),
  icon_name: z.string(),
});

export const projectFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  summary: z.string().min(10, "Summary is required"),
  description: z.string().min(20, "Description is required"),
  category: z.string().min(2, "Category is required"),
  technologies: z.array(z.string()),
  deliverables: z.array(z.string()),
  cover_image: z.string().url("Valid image URL is required"),
  gallery: z.array(z.string().url()),
  project_url: z.string().url().optional().or(z.literal("")),
  featured: z.boolean(),
  published: z.boolean(),
  display_order: z.number().int(),
  client_note: z.string().optional(),
});
