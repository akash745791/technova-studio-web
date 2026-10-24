"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, MessageSquare, RefreshCw, Mail, Phone } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    client_name: "",
    email: "",
    phone: "",
    business_name: "",
    service_slug: "other-custom-solution",
    project_title: "General Contact Enquiry",
    project_description: "",
    preferred_contact_method: "whatsapp" as "email" | "whatsapp" | "phone",
    privacy_consent: true,
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getPreFilledMessage = (refId: string) => {
    return `Hello TECHNOVA STUDIO! 🚀\nI have sent a message via your website contact form.\n\n📋 Reference ID: ${refId}\n👤 Name: ${formData.client_name}\n📱 Phone/WhatsApp: ${formData.phone || "N/A"}\n✉️ Email: ${formData.email}\n📝 Message: ${formData.project_description}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.privacy_consent) {
      setErrorMessage("Please accept the privacy terms to submit your message.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        setErrorMessage(result.error || "Failed to deliver message. Please contact us via WhatsApp directly.");
        return;
      }

      const refId = result.reference_id;
      setSubmittedRef(refId);

      // Auto-trigger user's selected contact method
      const messageBody = getPreFilledMessage(refId);

      if (formData.preferred_contact_method === "whatsapp") {
        const waUrl = `https://wa.me/919214133787?text=${encodeURIComponent(messageBody)}`;
        window.open(waUrl, "_blank");
      } else if (formData.preferred_contact_method === "email") {
        const mailUrl = `mailto:technovastudio.in@gmail.com?subject=${encodeURIComponent(
          `Contact Enquiry [${refId}]: ${formData.client_name}`
        )}&body=${encodeURIComponent(messageBody)}`;
        window.location.href = mailUrl;
      } else if (formData.preferred_contact_method === "phone") {
        window.location.href = "tel:+919214133787";
      }
    } catch {
      setErrorMessage("A network connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 text-center shadow-md animate-in fade-in duration-300">
        <div className="w-14 h-14 bg-[#E9EDC9] border border-[#CCD5AE] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#D4A373]">
          <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#1F2421] mb-2">Message Received</h3>
        <p className="text-xs sm:text-sm text-[#5B6358] mb-4 font-sans">
          Thank you for contacting TECHNOVA STUDIO. We have logged your enquiry and initiated your preferred channel ({formData.preferred_contact_method === "whatsapp" ? "WhatsApp" : formData.preferred_contact_method === "email" ? "Email" : "Phone Call"}).
        </p>
        <div className="bg-[#FEFAE0] py-2 px-4 rounded-xl inline-block border border-[#CCD5AE] mb-6 font-mono text-xs text-[#A06733] font-bold">
          Ref: {submittedRef}
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          {formData.preferred_contact_method === "whatsapp" && (
            <a
              href={`https://wa.me/919214133787?text=${encodeURIComponent(getPreFilledMessage(submittedRef))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-xs font-archia tracking-wide shadow-sm hover:brightness-105 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </a>
          )}

          {formData.preferred_contact_method === "email" && (
            <a
              href={`mailto:technovastudio.in@gmail.com?subject=${encodeURIComponent(
                `Contact Enquiry [${submittedRef}]: ${formData.client_name}`
              )}&body=${encodeURIComponent(getPreFilledMessage(submittedRef))}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#041214] text-[#FEFAE0] font-semibold text-xs font-archia tracking-wide shadow-sm hover:bg-[#D4A373] hover:text-[#1F2421] transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Send Direct Email</span>
            </a>
          )}

          {formData.preferred_contact_method === "phone" && (
            <a
              href="tel:+919214133787"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4A373] text-[#041214] font-semibold text-xs font-archia tracking-wide shadow-sm hover:bg-[#FDBB4F] transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Studio Direct (+91 92141 33787)</span>
            </a>
          )}

          {formData.preferred_contact_method !== "whatsapp" && (
            <a
              href={`https://wa.me/919214133787?text=${encodeURIComponent(getPreFilledMessage(submittedRef))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#1F2421] font-semibold text-xs font-archia tracking-wide hover:bg-[#25D366]/25 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          )}

          <button
            onClick={() => {
              setSubmittedRef(null);
              setFormData({
                client_name: "",
                email: "",
                phone: "",
                business_name: "",
                service_slug: "other-custom-solution",
                project_title: "General Contact Enquiry",
                project_description: "",
                preferred_contact_method: "whatsapp",
                privacy_consent: true,
                honeypot: "",
              });
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-[#1F2421] text-xs font-archia font-medium tracking-wide hover:bg-[#E9EDC9]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Send Another Message</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-red-600 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
          Your Name <span className="text-[#A06733]">*</span>
        </label>
        <input
          type="text"
          required
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
          placeholder="e.g. Vikram Mehta"
          className="w-full px-4 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs font-mono text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
            Email Address <span className="text-[#A06733]">*</span>
          </label>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. vikram@example.com"
            className="w-full px-4 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs font-mono text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
            Phone / WhatsApp Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="w-full px-4 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs font-mono text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
          Preferred Contact Method
        </label>
        <select
          name="preferred_contact_method"
          value={formData.preferred_contact_method}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs font-mono text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
        >
          <option value="whatsapp">WhatsApp (Direct Chat)</option>
          <option value="email">Email (Direct Mail)</option>
          <option value="phone">Direct Phone Call</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
          Your Message or Inquiries <span className="text-[#A06733]">*</span>
        </label>
        <textarea
          required
          rows={4}
          name="project_description"
          value={formData.project_description}
          onChange={handleChange}
          placeholder="How can TECHNOVA STUDIO help with your website, engineering, or security requirements?"
          className="w-full px-4 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs font-mono text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
        />
      </div>

      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="privacy_consent"
            checked={formData.privacy_consent}
            onChange={handleChange}
            className="mt-0.5 rounded border-[#CCD5AE] bg-[#FEFAE0] text-[#D4A373] focus:ring-[#D4A373]"
          />
          <span className="text-xs text-[#5B6358] leading-tight font-sans">
            I consent to TECHNOVA STUDIO responding to my message in accordance with the{" "}
            <a href="/privacy-policy" className="text-[#1F2421] font-semibold underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] font-archia text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Transmit Message</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
