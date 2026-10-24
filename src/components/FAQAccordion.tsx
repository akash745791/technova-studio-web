"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "@/lib/types";

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export default function FAQAccordion({ items, defaultOpenIndex = 0 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const headingId = `faq-heading-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-[#FEFAE0] border-[#D4A373] shadow-xs"
                : "bg-[#FAEDCD]/60 border-[#CCD5AE] hover:border-[#CCD5AE]/90"
            }`}
          >
            <button
              id={headingId}
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373]"
            >
              <span className="text-xl sm:text-2xl font-display font-normal text-[#1F2421] flex items-center gap-3">
                <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors ${isOpen ? "text-[#D4A373]" : "text-[#8A9486]"}`} />
                <span>{item.q}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#8A9486] flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#D4A373]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5B6358] leading-relaxed border-t border-[#CCD5AE]/60 font-sans"
              >
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
