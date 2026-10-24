import Link from "next/link";
import { Home, Compass, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32 text-center">
      <div className="max-w-lg space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] font-bold">
          <span>ERROR 404 • ROUTE UNRESOLVED</span>
        </div>

        <h1 className="text-7xl sm:text-9xl font-display font-normal text-[#1F2421]">
          404
        </h1>

        <h2 className="text-3xl font-display font-normal text-[#1F2421]">
          Digital Coordinates Not Found
        </h2>

        <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed font-sans">
          The requested page or resource may have been relocated, updated, or does not exist on this server.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#041214] bg-[#D4A373] hover:bg-[#FDBB4F] shadow-xs text-sm font-archia tracking-wide transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-[#1F2421] bg-[#FAEDCD] border border-[#CCD5AE] hover:bg-[#E9EDC9] text-sm font-archia tracking-wide transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Browse Services</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-[#1F2421] bg-[#FAEDCD] border border-[#CCD5AE] hover:bg-[#E9EDC9] text-sm font-archia tracking-wide transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Contact Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
