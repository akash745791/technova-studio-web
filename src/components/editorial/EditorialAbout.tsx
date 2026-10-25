"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function EditorialAbout() {
  const values = [
    { title: "Quality over unnecessary complexity", desc: "We prioritize clean, readable architectures and native browser capabilities over bloated dependencies." },
    { title: "Transparency over unrealistic promises", desc: "Honest timeline evaluations, clear limitations, and realistic feasibility discussions from day one." },
    { title: "Usability alongside visual design", desc: "A website must be effortless to navigate, read, and use—not merely decorative." },
    { title: "Security and privacy from the beginning", desc: "Defensive headers, input validation, strict auth patterns, and Row Level Security built in early." },
    { title: "Continuous learning and improvement", desc: "We stay current with evolving web standards, security benchmarks, and practical AI tooling." },
    { title: "Collaboration and clear communication", desc: "Keeping clients informed at every phase with zero technical jargon confusion." },
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-[#CCD5AE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">
            // 03 STUDIO PHILOSOPHY
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421] leading-[1.08]">
            We Believe Good Development is More Than Attractive Visuals.
          </h2>
          <p className="text-sm sm:text-base text-[#5B6358] leading-relaxed font-sans">
            Technology should make ideas possible, businesses stronger, and digital experiences easier to use. TECHNOVA STUDIO was created around this belief. A successful digital product should be responsive, usable, maintainable, performance-conscious, and designed with security in mind.
          </p>
        </div>

        {/* 6 Core Studio Values in a Refined Editorial Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 border-t border-[#CCD5AE]">
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="space-y-2.5 pb-6 border-b border-[#CCD5AE]/70 hover:border-[#D4A373] transition-colors p-4 rounded-2xl hover:bg-[#FAEDCD]/40"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#5B6358]">
                <span className="font-bold">[{String(idx + 1).padStart(2, "0")}]</span>
                <span className="text-[#A06733] font-semibold">PRINCIPLE</span>
              </div>
              <h3 className="text-2xl font-display font-normal text-[#1F2421]">
                {v.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed font-sans">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Studio Commitment Banner */}
        <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A06733] font-bold">
              OUR HONEST COMMITMENT
            </span>
            <h4 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">
              Engineered With Purpose, Delivered With Integrity.
            </h4>
            <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed font-sans">
              We don&apos;t invent awards or pretend to be a 500-person agency. You work directly with engineers who write your code, verify your security, and care about your digital outcome.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] font-mono text-xs font-semibold transition-all shadow-xs flex-shrink-0"
          >
            <span>Read Studio Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
