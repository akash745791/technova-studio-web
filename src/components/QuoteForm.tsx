"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, Shield, MessageSquare, RefreshCw } from "lucide-react";

interface QuoteFormProps {
  initialServiceSlug?: string;
}

const serviceOptions = [
  { slug: "website-development", label: "Website Development" },
  { slug: "frontend-development", label: "Frontend Development" },
  { slug: "backend-apis", label: "Backend Development & APIs" },
  { slug: "ai-solutions", label: "AI Solutions & Automation" },
  { slug: "cybersecurity-development", label: "Cybersecurity-Focused Development" },
  { slug: "maintenance-bug-fixing", label: "Website Maintenance & Bug Fixing" },
  { slug: "other-custom-solution", label: "Custom Digital Solution / Consultation" },
];

const budgetOptions = [
  "Under ₹25,000 / $300",
  "₹25,000 – ₹60,000 / $300 – $750",
  "₹60,000 – ₹1,50,000 / $750 – $1,800",
  "₹1,50,000+ / $1,800+",
  "Flexible / To Be Discussed",
];

const timelineOptions = [
  "Urgent (Within 1-2 weeks)",
  "Standard (3-4 weeks)",
  "Flexible (1-2 months)",
  "Ongoing maintenance / Retainer",
];

export default function QuoteForm({ initialServiceSlug }: QuoteFormProps) {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || initialServiceSlug || "website-development";
  const passedScope = searchParams.get("scope");

  const [formData, setFormData] = useState({
    client_name: "",
    email: "",
    phone: "",
    business_name: "",
    service_slug: preselectedService,
    project_title: passedScope ? "Custom Architecture Specification" : "",
    project_description: passedScope ? `Selected Scope Modules: ${passedScope.replace(/,/g, ", ")}` : "",
    budget_range: "Flexible / To Be Discussed",
    timeline: "Standard (3-4 weeks)",
    preferred_contact_method: "whatsapp" as "email" | "whatsapp" | "phone",
    privacy_consent: false,
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
          setErrorMessage(data.error || "Please correct the highlighted form errors.");
        } else {
          setErrorMessage(data.error || "An error occurred while submitting your enquiry.");
        }
        return;
      }

      setSubmittedRef(data.reference_id);
    } catch {
      setErrorMessage("Network error occurred. Please check your connection or contact us via WhatsApp directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFormData({
      client_name: "",
      email: "",
      phone: "",
      business_name: "",
      service_slug: "website-development",
      project_title: "",
      project_description: "",
      budget_range: "Flexible / To Be Discussed",
      timeline: "Standard (3-4 weeks)",
      preferred_contact_method: "whatsapp",
      privacy_consent: false,
      honeypot: "",
    });
  };

  if (submittedRef) {
    return (
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-12 text-center shadow-md animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
        </div>

        <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421] mb-2">
          Project Enquiry Received
        </h3>

        <p className="text-sm text-[#5B6358] max-w-lg mx-auto mb-6 font-sans">
          Your project specification has been logged in our internal system. An engineer will review your blueprint and contact you via {formData.preferred_contact_method}.
        </p>

        <div className="inline-block bg-[#FEFAE0] border border-[#CCD5AE] rounded-2xl px-6 py-4 mb-8">
          <span className="text-xs font-mono text-[#5B6358] block mb-1">Your Tracking Reference ID</span>
          <span className="text-2xl font-mono font-bold text-[#A06733] tracking-wider">{submittedRef}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href={`https://wa.me/917457912227?text=Hello%20TECHNOVA%20STUDIO%2C%20I%20just%20submitted%20an%20enquiry%20(Reference%20ID%3A%20${submittedRef})%20regarding%20${encodeURIComponent(formData.project_title)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-xs font-archia tracking-wide hover:brightness-105 transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-[#1F2421] font-medium text-xs font-archia tracking-wide hover:bg-[#E9EDC9] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Submit Another Enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-600 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-xs font-mono">Submission Notice</p>
            <p className="text-xs text-red-600/90 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Hidden honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_field">Leave blank</label>
        <input
          id="hp_field"
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
            Your Full Name <span className="text-[#A06733]">*</span>
          </label>
          <input
            type="text"
            name="client_name"
            required
            value={formData.client_name}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] transition-colors text-xs font-mono"
          />
          {fieldErrors.client_name && (
            <p className="text-xs text-red-600 mt-1 font-mono">{fieldErrors.client_name[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
            Email Address <span className="text-[#A06733]">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. rahul@example.com"
            className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] transition-colors text-xs font-mono"
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-600 mt-1 font-mono">{fieldErrors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
            Phone / WhatsApp Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] transition-colors text-xs font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
            Business or Brand Name
          </label>
          <input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            placeholder="e.g. Acme Tech Studio"
            className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] transition-colors text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
            Select Primary Service <span className="text-[#A06733]">*</span>
          </label>
          <select
            name="service_slug"
            value={formData.service_slug}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-xs font-mono"
          >
            {serviceOptions.map((opt) => (
              <option key={opt.slug} value={opt.slug}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
            Project Title / Objective <span className="text-[#A06733]">*</span>
          </label>
          <input
            type="text"
            name="project_title"
            required
            value={formData.project_title}
            onChange={handleChange}
            placeholder="e.g. Corporate Web Application & API"
            className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-xs font-mono"
          />
          {fieldErrors.project_title && (
            <p className="text-xs text-red-600 mt-1 font-mono">{fieldErrors.project_title[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
          Project Requirements & Scope <span className="text-[#A06733]">*</span>
        </label>
        <textarea
          name="project_description"
          rows={5}
          required
          value={formData.project_description}
          onChange={handleChange}
          placeholder="Please describe your idea, target features, current website limitations, or reference sites..."
          className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-xs font-mono resize-y"
        />
        {fieldErrors.project_description && (
          <p className="text-xs text-red-600 mt-1 font-mono">{fieldErrors.project_description[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
            Budget Range
          </label>
          <select
            name="budget_range"
            value={formData.budget_range}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          >
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
            Desired Timeline
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          >
            {timelineOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] mb-2 font-bold">
            Preferred Contact
          </label>
          <select
            name="preferred_contact_method"
            value={formData.preferred_contact_method}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          >
            <option value="whatsapp">WhatsApp Message</option>
            <option value="email">Email</option>
            <option value="phone">Phone Call</option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="privacy_consent"
            checked={formData.privacy_consent}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-[#CCD5AE] bg-[#FEFAE0] text-[#D4A373] focus:ring-[#D4A373]"
          />
          <span className="text-xs text-[#5B6358] leading-relaxed font-sans">
            I agree that TECHNOVA STUDIO may contact me regarding this project enquiry in accordance with the{" "}
            <a href="/privacy-policy" target="_blank" className="text-[#1F2421] font-semibold underline">
              Privacy Policy
            </a>
            . Your contact details are kept strictly confidential.
          </span>
        </label>
        {fieldErrors.privacy_consent && (
          <p className="text-xs text-red-600 mt-1 font-mono">{fieldErrors.privacy_consent[0]}</p>
        )}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#5B6358]">
          <Shield className="w-4 h-4 text-[#A06733]" />
          <span>Encrypted transmission & spam protection</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-[#FEFAE0] bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] shadow-md active:scale-[0.98] transition-all disabled:opacity-50 text-sm font-archia tracking-wide"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying & Sending...</span>
            </>
          ) : (
            <>
              <span>Submit Project Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
