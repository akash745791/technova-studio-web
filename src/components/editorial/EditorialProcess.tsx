"use client";

import { motion } from "framer-motion";

export default function EditorialProcess() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      summary: "Understand the idea and business goals.",
      detail: "We evaluate your concept, identify user journeys, assess constraints, and define core objectives.",
    },
    {
      number: "02",
      title: "Plan",
      summary: "Define scope, features, timeline, and requirements.",
      detail: "Deliverables, architectural stack, milestone dates, and clear project boundaries are formalized.",
    },
    {
      number: "03",
      title: "Design",
      summary: "Create and refine the visual experience.",
      detail: "Clean layout structures, purposeful typography, responsive grid hierarchy, and fluid micro-interactions.",
    },
    {
      number: "04",
      title: "Develop",
      summary: "Build frontend, backend, and integrations.",
      detail: "Type-safe engineering with Next.js 15, PostgreSQL database modeling, and server-side validation.",
    },
    {
      number: "05",
      title: "Test",
      summary: "Verify functionality, responsiveness, and security.",
      detail: "Cross-device responsiveness from 320px up to 4K, edge-case form testing, and security audits.",
    },
    {
      number: "06",
      title: "Launch & Maintain",
      summary: "Deploy, monitor, and improve as agreed.",
      detail: "Production release with SSL, DNS configuration, and agreed maintenance monitoring.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-[#CCD5AE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-2xl space-y-2 pb-6 border-b border-[#CCD5AE]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">
            // 04 DELIVERY METHODOLOGY
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421]">
            A Transparent, Milestone-Driven Process.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#5B6358]">
            Predictable workflows from initial discovery through production deployment and maintenance.
          </p>
        </div>

        {/* 6 Step Editorial Grid with Numbered Markers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAEDCD]/60 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-7 sm:p-8 space-y-4 hover:border-[#D4A373] transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#CCD5AE]">
                <span className="font-display text-4xl sm:text-5xl font-normal text-[#D4A373]">
                  {step.number}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#E9EDC9] text-[#1F2421] border border-[#CCD5AE]">
                  PHASE
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#1F2421]">
                  {step.title}
                </h3>
                <p className="text-xs font-mono text-[#A06733] font-semibold">
                  {step.summary}
                </p>
              </div>

              <p className="text-xs text-[#5B6358] leading-relaxed pt-2 border-t border-[#CCD5AE]/60 font-sans">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
