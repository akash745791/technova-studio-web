"use client";

import { usePathname } from "next/navigation";
import { Clock, ShieldCheck } from "lucide-react";

export default function StudioBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="w-full bg-[#E9EDC9] border-b border-[#CCD5AE] text-[11px] font-mono text-[#5B6358] py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Availability Status */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A373] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A373]"></span>
          </span>
          <span className="text-[#1F2421] font-bold uppercase tracking-wider text-[10px]">
            STUDIO DISPATCH:
          </span>
          <span className="text-[#A06733] font-semibold text-[10px] tracking-wide">
            ACCEPTING SELECT COMMISSIONS FOR Q4 2026
          </span>
        </div>

        {/* Operational SLA */}
        <div className="hidden md:flex items-center gap-5 text-[#5B6358]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#A06733]" />
            <span>DIRECT RESPONSE: &lt; 2 HOURS</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#1F2421]" />
            <span>STANDARDS: ZERO GENERIC TEMPLATES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
