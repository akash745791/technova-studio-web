"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Calculator, Clock } from "lucide-react";

interface FeatureModule {
  id: string;
  name: string;
  category: string;
  timelineDays: number;
  complexity: "Standard" | "Advanced" | "Enterprise";
}

const modules: FeatureModule[] = [
  { id: "frontend", name: "Custom Responsive Frontend (Next.js 15)", category: "Frontend", timelineDays: 7, complexity: "Standard" },
  { id: "admin_cms", name: "Admin Dashboard & Content Management", category: "Backend", timelineDays: 5, complexity: "Standard" },
  { id: "database_auth", name: "PostgreSQL Database with Supabase Auth", category: "Backend", timelineDays: 6, complexity: "Advanced" },
  { id: "ai_integration", name: "Practical AI / LLM Automation Workflow", category: "AI Logic", timelineDays: 8, complexity: "Advanced" },
  { id: "security_audit", name: "Cybersecurity Hardening & Defensive Headers", category: "Security", timelineDays: 4, complexity: "Standard" },
  { id: "seo_perf", name: "Technical SEO, Schema & Sub-Second LCP", category: "Optimization", timelineDays: 3, complexity: "Standard" },
];

export default function ScopeEstimator() {
  const [selected, setSelected] = useState<string[]>(["frontend", "admin_cms", "seo_perf"]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalDays = selected.reduce((acc, id) => {
    const found = modules.find((m) => m.id === id);
    return acc + (found ? found.timelineDays : 0);
  }, 0);

  const estimatedWeeks = Math.max(1, Math.round((totalDays / 6) * 10) / 10);

  return (
    <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#CCD5AE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A06733] uppercase tracking-wider font-bold">
            <Calculator className="w-4 h-4 text-[#D4A373]" />
            <span>Interactive Scope Blueprint</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">
            Custom Architecture Scope Calculator
          </h3>
          <p className="text-xs sm:text-sm text-[#5B6358] font-sans">
            Select modules to preview an engineering timeline estimate before submitting your project brief.
          </p>
        </div>

        {/* Live Estimate Metric Card */}
        <div className="bg-[#E9EDC9] border border-[#CCD5AE] rounded-2xl p-4 flex items-center gap-6 flex-shrink-0 shadow-xs">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#5B6358] block font-semibold">Selected Modules</span>
            <span className="text-2xl font-display font-bold text-[#1F2421]">{selected.length} / {modules.length}</span>
          </div>
          <div className="h-8 w-px bg-[#CCD5AE]" />
          <div>
            <span className="text-[10px] font-mono uppercase text-[#5B6358] block font-semibold">Estimated Delivery</span>
            <div className="flex items-center gap-1.5 text-2xl font-display font-bold text-[#A06733]">
              <Clock className="w-5 h-5 text-[#D4A373]" />
              <span>~{estimatedWeeks} wks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-8">
        {modules.map((mod) => {
          const isSelected = selected.includes(mod.id);
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => toggle(mod.id)}
              className={`p-4 rounded-xl text-left border transition-all flex items-start justify-between gap-3 ${
                isSelected
                  ? "bg-[#FEFAE0] border-[#D4A373] shadow-xs"
                  : "bg-[#FAEDCD] border-[#CCD5AE]/80 hover:border-[#CCD5AE] text-[#5B6358]"
              }`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A06733] font-semibold block">
                  {mod.category} • ~{mod.timelineDays} Days
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#1F2421] block leading-snug">
                  {mod.name}
                </span>
              </div>

              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  isSelected
                    ? "bg-[#D4A373] border-[#D4A373] text-[#FEFAE0]"
                    : "border-[#CCD5AE] bg-[#FEFAE0]"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-8 mt-8 border-t border-[#CCD5AE] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-[#5B6358] font-mono">
          * Engineering timelines adjust dynamically based on API complexity, third-party approvals, and design readiness.
        </span>

        <Link
          href={`/get-a-quote?scope=${selected.join(",")}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] font-archia text-sm font-semibold tracking-wide transition-all shadow-xs flex-shrink-0"
        >
          <span>Submit This Specification</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
