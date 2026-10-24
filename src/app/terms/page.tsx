import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions governing digital services and website usage for TECHNOVA STUDIO.",
};

export default function TermsPage() {
  return (
    <div className="pt-20 pb-28 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] tracking-wider font-bold">
          <span>OPERATIONAL TERMS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421]">
          Terms and Conditions
        </h1>
        <p className="text-xs font-mono text-[#5B6358]">
          Last Updated: October 2026 • TECHNOVA STUDIO
        </p>
      </div>

      {/* Advisory Banner */}
      <div className="p-5 rounded-2xl bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] text-xs text-[#5B6358] flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#D4A373]" />
        <p className="font-sans">
          <strong>Notice:</strong> These terms govern the general use of this website and outline our project engagement framework. Specific software deliverables, milestone payments, and copyright assignments are formalized in individual project contracts.
        </p>
      </div>

      {/* Body */}
      <div className="space-y-8 text-sm sm:text-base text-[#5B6358] leading-relaxed font-sans">
        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">1. Acceptance of Terms</h2>
          <p>
            By accessing this website or submitting an enquiry to TECHNOVA STUDIO, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please discontinue using this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">2. Scope of Services</h2>
          <p>
            TECHNOVA STUDIO provides professional website engineering, frontend interfaces, backend APIs, AI application integration, security-conscious reviews, and website maintenance.
          </p>
          <p>
            Informational descriptions on this website represent capabilities and do not constitute an automatic binding service agreement. All projects require explicit mutual confirmation of scope, milestones, pricing, and timelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">3. Client Responsibilities</h2>
          <p>Clients engaging our studio agree to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Provide timely feedback, required brand assets, and approved content.</li>
            <li>Maintain active ownership of third-party domains, DNS accounts, and cloud hosting accounts.</li>
            <li>Ensure they have full legal rights to any copy, imagery, trademarks, or proprietary data provided to us.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">4. Quotations, Pricing & Payments</h2>
          <p>
            Project quotes are customized based on technical scope and delivery deadlines. Work commences only upon mutual agreement on milestones and agreed deposit schedules.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">5. Intellectual Property</h2>
          <p>
            Upon settlement of final project invoices, clients receive full assigned ownership rights to their unique custom codebase and bespoke assets, excluding reusable open-source dependencies and studio utility patterns.
          </p>
        </section>
      </div>
    </div>
  );
}
