import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Shield, HeartHandshake } from "lucide-react";
import { getSiteSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about TECHNOVA STUDIO: our mission, values, engineering philosophy, and commitment to building practical, security-conscious digital solutions.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const values = [
    { title: "Quality over unnecessary complexity", desc: "We prioritize clean, readable code and robust architectures over bloated dependencies." },
    { title: "Transparency over unrealistic promises", desc: "Honest timeline assessments and realistic feasibility discussions from the very first meeting." },
    { title: "Usability alongside visual design", desc: "A website must be effortless to navigate and read, not just visually intriguing." },
    { title: "Security and privacy from the beginning", desc: "Data protection, input validation, and defensive principles are baked into every release." },
    { title: "Continuous learning and improvement", desc: "We stay current with evolving web standards, security practices, and practical AI tooling." },
    { title: "Collaboration and clear communication", desc: "Keeping clients informed at every stage with zero technical jargon confusion." },
  ];

  return (
    <div className="pt-20 pb-28 space-y-24">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] tracking-wider font-bold">
            <span>ABOUT TECHNOVA STUDIO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421] leading-tight">
            Crafting Purposeful, Professional Digital Experiences.
          </h1>

          <p className="text-base sm:text-lg text-[#5B6358] leading-relaxed font-sans">
            Technology should make ideas possible, businesses stronger, and digital experiences easier to use. TECHNOVA STUDIO was created around this belief.
          </p>
        </div>
      </section>

      {/* Main Philosophy & Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-14 space-y-6 shadow-xs">
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">
            {settings.about_headline || "About TECHNOVA STUDIO"}
          </h2>

          <div className="text-[#5B6358] leading-relaxed space-y-4 text-sm sm:text-base font-sans">
            <p>
              Technology should make ideas possible, businesses stronger, and digital experiences easier to use. TECHNOVA STUDIO was created around this belief.
            </p>
            <p>
              We focus on building professional websites and practical digital solutions that help individuals, startups, and businesses establish and improve their online presence.
            </p>
            <p>
              From website design and frontend development to backend systems, AI-based solutions, and website troubleshooting, our goal is to understand each project&apos;s needs and develop a solution that fits those requirements.
            </p>
            <p>
              We believe good development is more than attractive visuals. A successful digital product should be responsive, usable, maintainable, performance-conscious, and designed with security in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-10 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] mb-2">
              <Target className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#1F2421]">Our Mission</h3>
            <p className="text-[#5B6358] leading-relaxed text-sm font-sans">
              &ldquo;Our mission is to make useful digital technology more accessible by helping businesses transform their ideas into professional, reliable, and user-friendly digital experiences.&rdquo;
            </p>
          </div>

          {/* Vision */}
          <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-10 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] mb-2">
              <Eye className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#1F2421]">Our Vision</h3>
            <p className="text-[#5B6358] leading-relaxed text-sm font-sans">
              &ldquo;Our vision is to grow into a trusted digital technology studio known for thoughtful problem-solving, continuous learning, transparent collaboration, and quality-focused development.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* What We Do & Our Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#E9EDC9]/70 border border-[#CCD5AE] rounded-3xl p-8 sm:p-10 space-y-3 shadow-xs">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">Capability Scope</span>
            <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#1F2421]">What We Do</h3>
            <p className="text-[#5B6358] leading-relaxed text-sm font-sans">
              We work on websites, frontend interfaces, backend functionality, API integrations, AI-powered concepts, security-conscious implementations, and ongoing website improvements. Every project begins with understanding the actual requirement rather than forcing every client into the same template.
            </p>
          </div>

          <div className="bg-[#E9EDC9]/70 border border-[#CCD5AE] rounded-3xl p-8 sm:p-10 space-y-3 shadow-xs">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">Execution Methodology</span>
            <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#1F2421]">Our Approach</h3>
            <p className="text-[#5B6358] leading-relaxed text-sm font-sans">
              We believe in clear requirements, honest communication, thoughtful design, practical engineering, and testing before launch. We aim to explain what is feasible, identify limitations early, and keep clients informed about progress.
            </p>
          </div>
        </div>
      </section>

      {/* Core Studio Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-2 pb-4 border-b border-[#CCD5AE]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">Standards</span>
          <h2 className="text-3xl sm:text-5xl font-display font-normal text-[#1F2421]">Our Values</h2>
          <p className="text-xs sm:text-sm text-[#5B6358] font-sans">
            The principles that anchor our engineering decisions, client communications, and delivery standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <div key={idx} className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-2xl p-6 shadow-xs hover:border-[#D4A373] transition-colors space-y-2">
              <span className="text-xs font-mono text-[#A06733] font-bold">[{String(idx + 1).padStart(2, "0")}]</span>
              <h4 className="font-display font-normal text-2xl text-[#1F2421]">{val.title}</h4>
              <p className="text-xs text-[#5B6358] leading-relaxed font-sans">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Work With & Commitment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] mb-2">
              <HeartHandshake className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-2xl font-display font-normal text-[#1F2421]">Who We Work With</h3>
            <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed font-sans">
              We welcome enquiries from small businesses, entrepreneurs, startups, service providers, and individuals looking for a professional digital presence or a custom technology solution.
            </p>
          </div>

          <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] mb-2">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-2xl font-display font-normal text-[#1F2421]">Our Commitment</h3>
            <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed font-sans">
              We aim to deliver solutions that match the agreed scope, communicate project limitations clearly, and provide a maintainable foundation for future improvements. Features, timelines, pricing, and maintenance arrangements are discussed and confirmed for each project.
            </p>
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#041214] border border-[#CCD5AE]/30 p-10 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-display font-normal text-[#FEFAE0]">
            Let&apos;s Turn Your Idea Into a Digital Experience.
          </h2>
          <p className="text-xs sm:text-sm text-[#E9EDC9]/80 max-w-xl mx-auto font-sans">
            Whether you need a new website from scratch or want to enhance an existing digital product, we are ready to discuss your requirements.
          </p>
          <div>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[#041214] bg-[#D4A373] hover:bg-[#FDBB4F] shadow-md text-sm font-archia tracking-wide transition-colors"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
