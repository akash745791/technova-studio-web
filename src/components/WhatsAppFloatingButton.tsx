"use client";

import { MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WhatsAppFloatingButton() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/917457912227?text=Hello%20TECHNOVA%20STUDIO%2C%20I%20would%20like%20to%20discuss%20a%20website%20or%20digital%20engineering%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 bg-[#FAEDCD] border border-[#CCD5AE] hover:border-[#D4A373] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        title="Direct WhatsApp with TECHNOVA STUDIO (+91 74579 12227)"
        aria-label="Direct WhatsApp Chat"
      >
        {/* Pulsing indicator in Terracotta */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A373] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4A373]"></span>
        </span>

        {/* Hover Label */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-archia text-[#1F2421] font-semibold tracking-wide pr-1">
          Chat with Studio
        </span>

        <div className="w-7 h-7 rounded-full bg-[#E9EDC9] flex items-center justify-center text-[#A06733]">
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
        </div>
      </a>
    </div>
  );
}
