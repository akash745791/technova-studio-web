import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a detailed project quotation from TECHNOVA STUDIO. Submit your requirements for website development, frontend, backend, AI, or maintenance.",
};

export default function GetAQuotePage() {
  return (
    <div className="pt-20 pb-28 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] tracking-wider font-bold">
            <span>PROJECT COMMISSION • WEBSITES FROM ₹5,000</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421] leading-tight">
            Request a Custom Project Quotation.
          </h1>

          <p className="text-base sm:text-lg text-[#5B6358] leading-relaxed font-sans">
            Website packages start from ₹5,000 for standard business and portfolio websites. Fill in your project details below to receive a transparent proposal and cost breakdown in INR (₹) within 24 to 48 hours.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4A373]" />
              <p className="text-xs font-mono text-[#5B6358]">Loading proposal builder...</p>
            </div>
          }
        >
          <QuoteForm />
        </Suspense>
      </section>

      {/* Review Workflow Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-12 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] block mb-2 font-bold">
            Our Review Workflow
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421] mb-6">What Happens After You Submit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5 p-5 rounded-2xl bg-[#FEFAE0] border border-[#CCD5AE]">
              <div className="text-xs font-mono text-[#A06733] font-bold">01. Technical Review</div>
              <p className="text-xs text-[#5B6358] leading-relaxed font-sans">
                We analyze your feature requirements, technical scope, and identify potential architectural bottlenecks early.
              </p>
            </div>
            <div className="space-y-1.5 p-5 rounded-2xl bg-[#FEFAE0] border border-[#CCD5AE]">
              <div className="text-xs font-mono text-[#A06733] font-bold">02. Direct Consultation</div>
              <p className="text-xs text-[#5B6358] leading-relaxed font-sans">
                We connect on WhatsApp or Email to clarify any ambiguities and align on milestone deadlines.
              </p>
            </div>
            <div className="space-y-1.5 p-5 rounded-2xl bg-[#FEFAE0] border border-[#CCD5AE]">
              <div className="text-xs font-mono text-[#A06733] font-bold">03. Formal Proposal</div>
              <p className="text-xs text-[#5B6358] leading-relaxed font-sans">
                You receive a transparent, itemized proposal detailing deliverables, timeline stages, and cost breakdown.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
