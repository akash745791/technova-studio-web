import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for TECHNOVA STUDIO. Learn how we handle and protect project enquiries and client communications.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 pb-28 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] tracking-wider font-bold">
          <span>LEGAL & PRIVACY DISCLOSURE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421]">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[#5B6358]">
          Last Updated: October 2026 • TECHNOVA STUDIO
        </p>
      </div>

      {/* Advisory Banner */}
      <div className="p-5 rounded-2xl bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] text-xs text-[#5B6358] flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#D4A373]" />
        <p className="font-sans">
          <strong>Notice:</strong> This policy describes the actual technical features and data flows implemented by TECHNOVA STUDIO. It is provided for transparency regarding data handling and does not constitute formal legal counsel.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-sm sm:text-base text-[#5B6358] leading-relaxed font-sans">
        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">1. Who We Are</h2>
          <p>
            TECHNOVA STUDIO operates as an independent digital technology studio providing website engineering, frontend interfaces, backend APIs, AI solutions, security reviews, and website maintenance.
          </p>
          <p>
            You can reach our designated data contact directly at:{" "}
            <a href="mailto:technovastudio.in@gmail.com" className="text-[#A06733] font-semibold underline">
              technovastudio.in@gmail.com
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">2. What Information We Collect</h2>
          <p>
            We collect personal information exclusively when you voluntarily submit it through our website contact forms, quotation requests, or direct WhatsApp/email communications:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Full Name:</strong> To address you personally in project correspondences.</li>
            <li><strong>Email Address:</strong> To send requirement clarifications, quotations, and project updates.</li>
            <li><strong>Phone / WhatsApp Number (Optional):</strong> To facilitate direct messaging and voice discussions at your preference.</li>
            <li><strong>Business Name (Optional):</strong> To contextualize your digital requirements.</li>
            <li><strong>Project Scope & Details:</strong> Technical specifications, budget range, and timeline estimates shared by you.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">3. How We Use Your Data</h2>
          <p>
            We use collected information strictly to review project requirements, provide formal quotations, correspond regarding specifications, and fulfill commissioned digital development engagements.
          </p>
          <p>
            We do not sell, rent, license, or share your contact information with third-party advertisers or data brokers under any circumstances.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">4. Data Storage & Security Measures</h2>
          <p>
            Submitted project enquiries are transmitted over encrypted TLS (Transport Layer Security) connections and stored in access-controlled databases guarded by modern cryptographic authentication and Row Level Security policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">5. Your Data Rights</h2>
          <p>
            You may request an export of your enquiry record or petition for the complete deletion of your records from our systems at any time by emailing us at{" "}
            <a href="mailto:technovastudio.in@gmail.com" className="text-[#A06733] font-semibold underline">
              technovastudio.in@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
