import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PortfolioClient from "./PortfolioClient";
import { getProjects } from "@/lib/store";

export const metadata: Metadata = {
  title: "Portfolio & Technical Showcase",
  description:
    "Explore verified work and studio architectural showcases built by TECHNOVA STUDIO across web development, AI automation, and defensive cybersecurity.",
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const projects = await getProjects(false);

  return (
    <div className="pt-20 pb-28 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] tracking-wider font-bold">
            <span>SHOWCASE ARCHIVE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421] leading-tight">
            Our Work & Architectural Demonstrations.
          </h1>

          <p className="text-base sm:text-lg text-[#5B6358] leading-relaxed font-sans">
            We build digital experiences grounded in solid engineering. Below is our showcase of verified architectures, illustrating modern Next.js rendering, AI automation pipelines, and zero-trust security.
          </p>
        </div>
      </section>

      {/* Interactive Portfolio Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioClient initialProjects={projects} />
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#041214] border border-[#CCD5AE]/30 rounded-3xl p-10 sm:p-14 text-center space-y-4 shadow-xl">
          <h2 className="text-3xl sm:text-5xl font-display font-normal text-[#FEFAE0]">
            Ready to Build Your Project?
          </h2>
          <p className="text-xs sm:text-sm text-[#E9EDC9]/80 max-w-lg mx-auto font-sans">
            Discuss your requirements with TECHNOVA STUDIO today for a tailored architectural roadmap.
          </p>
          <div className="pt-2">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[#041214] bg-[#D4A373] hover:bg-[#FDBB4F] shadow-sm text-xs font-mono transition-colors"
            >
              <span>Start an Engineering Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
