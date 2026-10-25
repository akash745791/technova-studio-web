"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Compass,
  Shield,
  Terminal,
  Sparkles,
  MessageSquare,
  Cpu,
  Layers,
  Zap,
} from "lucide-react";

export default function EditorialHero() {
  const [activeTab, setActiveTab] = useState<"disciplines" | "stack" | "standards">("disciplines");

  const studioPillars = [
    { label: "Website Design & Development", tag: "Full-Stack" },
    { label: "Frontend & UI Engineering", tag: "Next.js / TS" },
    { label: "Backend Architectures & APIs", tag: "Node / Supabase" },
    { label: "Practical AI & Automation", tag: "LLM Workflows" },
    { label: "Cybersecurity Web Hardening", tag: "Zero-Trust" },
    { label: "Maintenance & Bug Troubleshooting", tag: "Direct SLA" },
  ];

  const techStack = [
    { name: "Next.js 15 & React 19", role: "Hybrid SSR / SSG & Server Components", status: "Active" },
    { name: "TypeScript & Tailwind CSS", role: "Zero-runtime, typed responsive UI", status: "Active" },
    { name: "Supabase & PostgreSQL", role: "Relational data with Row Level Security", status: "Active" },
    { name: "Gemini AI Automation", role: "Structured LLM extraction & prompt tuning", status: "Active" },
  ];

  const standards = [
    { label: "Packages Starting from ₹5,000", desc: "Transparent, itemized pricing in INR with no surprises" },
    { label: "Sub-Second LCP Performance", desc: "Clean semantic markup, optimized assets, zero layout shifts" },
    { label: "Direct Technical Collaboration", desc: "Chat and build directly with the engineers writing your code" },
    { label: "Turnkey Domain & SSL Setup", desc: "Production deployment with automated CI/CD and security headers" },
  ];

  return (
    <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 overflow-hidden">
      {/* Ambient Moving Glow Orbs in Background */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#D4A373]/15 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#CCD5AE]/25 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Hero Typography Side */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Studio Beacon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] shadow-xs text-xs font-mono text-[#1F2421]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A373] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A373]"></span>
              </span>
              <span className="uppercase tracking-widest text-[11px] font-bold">
                TECHNOVA STUDIO // COMMISSIONS OPEN 2026
              </span>
            </motion.div>

            {/* Moniqa Oversized Expressive Editorial Headline with Staggered Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2"
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-normal text-[#1F2421] tracking-normal leading-[1.03]">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="block"
                >
                  Your Ideas.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="block"
                >
                  Our Technology.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="text-[#D4A373] italic block"
                >
                  Real Digital Experiences.
                </motion.span>
              </h1>
            </motion.div>

            {/* Studio Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[#5B6358] leading-relaxed max-w-xl font-sans"
            >
              TECHNOVA STUDIO helps businesses turn ideas into professional websites, powerful digital solutions, and smarter online experiences. Websites start from ₹5,000 with direct engineering support.
            </motion.p>

            {/* Two Clear Calls to Action with Interactive Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/get-a-quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-archia font-semibold tracking-wide text-[#FEFAE0] bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] shadow-sm transition-all"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-archia font-semibold tracking-wide text-[#1F2421] bg-[#FAEDCD] border border-[#CCD5AE] hover:bg-[#E9EDC9] hover:border-[#D4A373] transition-all shadow-xs"
                >
                  <span>Explore Our Services</span>
                  <Compass className="w-4 h-4 text-[#D4A373]" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Studio Engineering Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-4 border-t border-[#CCD5AE]/70 flex flex-wrap items-center gap-6 text-xs text-[#5B6358] font-mono"
            >
              <div className="flex items-center gap-2 hover:text-[#1F2421] transition-colors">
                <Check className="w-4 h-4 text-[#D4A373]" />
                <span>Responsive & Mobile-First</span>
              </div>
              <div className="flex items-center gap-2 hover:text-[#1F2421] transition-colors">
                <Check className="w-4 h-4 text-[#D4A373]" />
                <span>Security-Conscious Development</span>
              </div>
              <div className="flex items-center gap-2 hover:text-[#1F2421] transition-colors">
                <Check className="w-4 h-4 text-[#D4A373]" />
                <span>Direct Technical Collaboration</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Architectural Studio Overview Card with Motion & Interactive Tabs */}
          <div className="lg:col-span-5 relative">
            {/* Floating Top Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3.5 -right-2 sm:-right-4 z-20 bg-[#041214] text-[#FEFAE0] border border-[#CCD5AE]/60 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold shadow-lg flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3 text-[#FDBB4F]" />
              <span>SUB-SECOND LCP • 100% SCORE</span>
            </motion.div>

            {/* Floating Bottom Badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3.5 -left-2 sm:-left-4 z-20 bg-[#FEFAE0] text-[#1F2421] border border-[#CCD5AE] px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold shadow-lg flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#D4A373]" />
              <span>STARTING FROM ₹5,000</span>
            </motion.div>

            {/* Main Interactive Floating Card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="bg-[#FAEDCD]/85 backdrop-blur-md border border-[#CCD5AE] rounded-3xl p-7 sm:p-9 shadow-xl space-y-5 relative"
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#CCD5AE]">
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

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E9EDC9] text-[#1F2421] text-[10px] font-mono font-bold border border-[#CCD5AE]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Interactive Card Tab Switcher */}
              <div className="flex gap-1.5 p-1 bg-[#FEFAE0]/80 rounded-xl border border-[#CCD5AE]/60 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("disciplines")}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] uppercase transition-all ${
                    activeTab === "disciplines"
                      ? "bg-[#041214] text-[#FEFAE0] shadow-xs"
                      : "text-[#5B6358] hover:text-[#1F2421]"
                  }`}
                >
                  Disciplines
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("stack")}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] uppercase transition-all ${
                    activeTab === "stack"
                      ? "bg-[#041214] text-[#FEFAE0] shadow-xs"
                      : "text-[#5B6358] hover:text-[#1F2421]"
                  }`}
                >
                  Tech Stack
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("standards")}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] uppercase transition-all ${
                    activeTab === "standards"
                      ? "bg-[#041214] text-[#FEFAE0] shadow-xs"
                      : "text-[#5B6358] hover:text-[#1F2421]"
                  }`}
                >
                  Standards
                </button>
              </div>

              {/* Dynamic Content Panel */}
              <AnimatePresence mode="wait">
                {activeTab === "disciplines" && (
                  <motion.div
                    key="disciplines"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2"
                  >
                    {studioPillars.map((pillar, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 4 }}
                        className="p-2 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE]/70 flex items-center justify-between text-xs hover:border-[#D4A373] transition-all cursor-default"
                      >
                        <span className="text-[#1F2421] font-medium font-sans truncate">{pillar.label}</span>
                        <span className="text-[10px] font-mono text-[#A06733] bg-[#E9EDC9] px-2 py-0.5 rounded font-bold flex-shrink-0 ml-2">
                          {pillar.tag}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "stack" && (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2"
                  >
                    {techStack.map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 4 }}
                        className="p-2.5 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE]/70 space-y-1 hover:border-[#D4A373] transition-all cursor-default"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1F2421] font-mono">{item.name}</span>
                          <span className="text-[9px] font-mono text-[#25D366] font-bold bg-[#25D366]/10 px-1.5 py-0.5 rounded">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5B6358] font-sans">{item.role}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "standards" && (
                  <motion.div
                    key="standards"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2"
                  >
                    {standards.map((st, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 4 }}
                        className="p-2.5 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE]/70 space-y-0.5 hover:border-[#D4A373] transition-all cursor-default"
                      >
                        <span className="text-xs font-bold text-[#A06733] block font-mono">{st.label}</span>
                        <p className="text-[11px] text-[#5B6358] font-sans">{st.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2 border-t border-[#CCD5AE] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#5B6358] block">Direct Consultation:</span>
                  <a
                    href="https://wa.me/919214133787"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-[#1F2421] hover:text-[#A06733] transition-colors"
                  >
                    +91 92141 33787
                  </a>
                </div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/919214133787"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-archia font-semibold tracking-wide shadow-xs hover:brightness-105 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
