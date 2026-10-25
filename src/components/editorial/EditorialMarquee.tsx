"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function EditorialMarquee() {
  const items = [
    "TECHNOVA STUDIO // 2026",
    "CUSTOM WEB DEVELOPMENT",
    "WEBSITES FROM ₹5,000",
    "NEXT.JS 15 & REACT 19",
    "SUB-SECOND CORE WEB VITALS",
    "DEFENSIVE CYBERSECURITY",
    "POSTGRESQL & SUPABASE",
    "PRACTICAL AI AUTOMATION",
    "100% RESPONSIVE ARCHITECTURE",
    "DIRECT WHATSAPP SLA",
  ];

  // Duplicate items for continuous seamless loop
  const marqueeItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-[#CCD5AE] bg-[#FAEDCD]/50 backdrop-blur-sm py-3.5 select-none">
      {/* Edge Gradients for Soft Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FEFAE0] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FEFAE0] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap items-center gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 32,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#1F2421] uppercase hover:text-[#A06733] transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
