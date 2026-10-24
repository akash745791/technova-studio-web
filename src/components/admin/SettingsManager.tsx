"use client";

import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { SiteSettings } from "@/lib/types";

interface SettingsManagerProps {
  settings: SiteSettings;
  onUpdate: () => void;
}

export default function SettingsManager({ settings, onUpdate }: SettingsManagerProps) {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSavedSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSavedSuccess(true);
        onUpdate();
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        alert("Failed to update site settings");
      }
    } catch {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-display font-normal text-[#1F2421]">Studio Brand & Content Settings</h3>
          <p className="text-xs text-[#5B6358] font-sans">Manage official contact channels, hero headline copy, and SEO defaults.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] font-bold text-xs font-mono shadow-xs transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save All Settings"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-600/10 border border-emerald-600/30 text-emerald-800 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-700" />
          <span>Site settings updated successfully across TECHNOVA STUDIO.</span>
        </div>
      )}

      {/* Brand & Direct Contact Channels */}
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold block">
          Official Identity & Direct Contact
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Brand Name</label>
            <input
              type="text"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Contact Email</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Phone / WhatsApp 1</label>
            <input
              type="text"
              name="phone_1"
              value={formData.phone_1}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Phone / WhatsApp 2</label>
            <input
              type="text"
              name="phone_2"
              value={formData.phone_2}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Official Instagram URL</label>
            <input
              type="url"
              name="instagram_url"
              value={formData.instagram_url}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
            />
          </div>
        </div>
      </div>

      {/* Homepage Copy */}
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold block">
          Homepage Hero & Messaging
        </span>

        <div>
          <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Hero Main Headline</label>
          <input
            type="text"
            name="hero_headline"
            value={formData.hero_headline}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Hero Sub-Headline</label>
          <textarea
            rows={2}
            name="hero_subheadline"
            value={formData.hero_subheadline}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-sans"
          />
        </div>
      </div>

      {/* About Us Copy */}
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold block">
          About Us Section Copy
        </span>

        <div>
          <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">About Headline</label>
          <input
            type="text"
            name="about_headline"
            value={formData.about_headline}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">About Body Copy</label>
          <textarea
            rows={4}
            name="about_body"
            value={formData.about_body}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-sans"
          />
        </div>
      </div>

      {/* SEO Metadata Defaults */}
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold block">
          Search Engine Optimization (SEO) Defaults
        </span>

        <div>
          <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Default Meta Title</label>
          <input
            type="text"
            name="seo_title"
            value={formData.seo_title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Default Meta Description</label>
          <textarea
            rows={2}
            name="seo_description"
            value={formData.seo_description}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-sans"
          />
        </div>
      </div>
    </form>
  );
}
