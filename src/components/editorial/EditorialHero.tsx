"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, Compass, Shield, Terminal, Sparkles, MessageSquare } from "lucide-react";

export default function EditorialHero() {
  const studioPillars = [
    { label: "Website Design & Development", tag: "Full-Stack" },
    { label: "Frontend & UI Engineering", tag: "Next.js / TS" },
    { label: "Backend Architectures & APIs", tag: "Node / Supabase" },
    { label: "Practical AI & Automation", tag: "LLM Workflows" },
    { label: "Cybersecurity Web Hardening", tag: "Zero-Trust" },
    { label: "Maintenance & Bug Troubleshooting", tag: "Direct SLA" },
  ];

  return (
    <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Hero Typography Side */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Studio Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] shadow-xs text-xs font-mono text-[#1F2421]"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4A373]" />
              <span className="uppercase tracking-widest text-[11px] font-bold">
                TECHNOVA STUDIO // DIGITAL ENGINEERING
              </span>
            </motion.div>

            {/* Moniqa Oversized Expressive Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2"
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-normal text-[#1F2421] tracking-normal leading-[1.03]">
                Your Ideas. <br />
                Our Technology. <br />
                <span className="text-[#D4A373] italic">
                  Real Digital Experiences.
                </span>
              </h1>
            </motion.div>

            {/* Studio Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[#5B6358] leading-relaxed max-w-xl font-sans"
            >
              TECHNOVA STUDIO helps businesses turn ideas into professional websites, powerful digital solutions, and smarter online experiences.
            </motion.p>

            {/* Two Clear Calls to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <Link
                href="/get-a-quote"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-archia font-semibold tracking-wide text-[#FEFAE0] bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] shadow-sm active:scale-[0.98] transition-all"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-archia font-semibold tracking-wide text-[#1F2421] bg-[#FAEDCD] border border-[#CCD5AE] hover:bg-[#E9EDC9] hover:border-[#D4A373] transition-all shadow-xs"
              >
                <span>Explore Our Services</span>
                <Compass className="w-4 h-4 text-[#D4A373]" />
              </Link>
            </motion.div>

            {/* Studio Engineering Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-4 border-t border-[#CCD5AE]/70 flex flex-wrap items-center gap-6 text-xs text-[#5B6358] font-mono"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4A373]" />
                <span>Responsive & Mobile-First</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4A373]" />
                <span>Security-Conscious Development</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4A373]" />
                <span>Direct Technical Collaboration</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Architectural Studio Overview Card (Clean, static, human-crafted) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAEDCD]/80 backdrop-blur-md border border-[#CCD5AE] rounded-3xl p-7 sm:p-9 shadow-md space-y-6"
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-5 border-b border-[#CCD5AE]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] overflow-hidden p-1 shadow-xs flex-shrink-0">
                    <Image
                      src="/brand/technova-logo.jpg"
                      alt="TECHNOVA STUDIO"
                      width={32}
                      height={32}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <span className="font-display text-lg font-normal text-[#1F2421] leading-none block">
                      TECHNOVA STUDIO
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#A06733] font-bold block pt-0.5">
                      Operational Blueprint // 2026
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-[#E9EDC9] text-[#1F2421] text-[10px] font-mono font-bold border border-[#CCD5AE]">
                  ACTIVE
                </span>
              </div>

              {/* Core Disciplines List */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B6358] font-bold block">
                  Studio Engineering Disciplines:
                </span>
                <div className="space-y-2">
                  {studioPillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE]/70 flex items-center justify-between text-xs hover:border-[#D4A373] transition-colors"
                    >
                      <span className="text-[#1F2421] font-medium font-sans">{pillar.label}</span>
                      <span className="text-[10px] font-mono text-[#A06733] bg-[#E9EDC9] px-2 py-0.5 rounded font-bold">
                        {pillar.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2 border-t border-[#CCD5AE] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#5B6358] block">Direct Consultation:</span>
                  <a
                    href="https://wa.me/917457912227"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-[#1F2421] hover:text-[#A06733] transition-colors"
                  >
                    +91 74579 12227
                  </a>
                </div>

                <a
                  href="https://wa.me/917457912227"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-archia font-semibold tracking-wide shadow-xs hover:brightness-105 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
