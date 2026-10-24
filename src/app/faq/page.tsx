import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import { generalFAQs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about TECHNOVA STUDIO's website development, AI workflows, security practices, and project timelines.",
};

export default function FAQPage() {
  return (
    <div className="pt-20 pb-28 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] tracking-wider font-bold">
            <span>KNOWLEDGE & CLARIFICATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421] leading-tight">
            Frequently Asked Questions.
          </h1>

          <p className="text-base sm:text-lg text-[#5B6358] leading-relaxed font-sans">
            Everything you need to know about our collaboration model, engineering principles, pricing approach, and support policies.
          </p>
        </div>
      </section>

      {/* Accordion Component */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion items={generalFAQs} />
      </section>

      {/* Direct Contact Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-display font-normal text-[#1F2421]">Have a specific inquiry not listed here?</h3>
            <p className="text-xs sm:text-sm text-[#5B6358] font-sans">
              Message us directly and a developer will clarify any technical or project question.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#041214] bg-[#D4A373] hover:bg-[#FDBB4F] shadow-sm text-sm font-archia tracking-wide transition-colors flex-shrink-0"
          >
            <span>Ask Us Directly</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
