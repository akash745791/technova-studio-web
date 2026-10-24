"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Mail, Instagram, MessageSquare, Phone } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  // Do not render public footer on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-[#041214] border-t border-[#CCD5AE]/20 pt-16 pb-12 overflow-hidden text-[#E9EDC9]">
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CCD5AE]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#CCD5AE]/20">
          {/* Brand Info & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showTagline />
            <p className="text-xs sm:text-sm text-[#E9EDC9]/80 leading-relaxed max-w-sm pt-2 font-sans">
              TECHNOVA STUDIO helps businesses, startups, and creators turn ideas into professional websites, modern digital solutions, and smarter online experiences.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/technova_studio.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-[#CCD5AE]/20 flex items-center justify-center text-[#E9EDC9] hover:text-[#FDBB4F] hover:border-[#FDBB4F]/40 transition-colors"
                title="Follow TECHNOVA STUDIO on Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/917457912227?text=Hello%20TECHNOVA%20STUDIO%2C%20I%20would%20like%20to%20discuss%20a%20website%20or%20digital%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-[#CCD5AE]/20 flex items-center justify-center text-[#E9EDC9] hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors"
                title="Chat with TECHNOVA STUDIO on WhatsApp"
                aria-label="WhatsApp Primary"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:technovastudio.in@gmail.com"
                className="w-9 h-9 rounded-xl bg-white/5 border border-[#CCD5AE]/20 flex items-center justify-center text-[#E9EDC9] hover:text-[#D4A373] hover:border-[#D4A373]/40 transition-colors"
                title="Email TECHNOVA STUDIO"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-archia uppercase tracking-widest text-[#FDBB4F] font-bold">Services</h4>
            <ul className="space-y-2 text-xs font-archia font-medium">
              <li>
                <Link href="/services/website-development" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/frontend-development" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Frontend Development
                </Link>
              </li>
              <li>
                <Link href="/services/backend-apis" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Backend & APIs
                </Link>
              </li>
              <li>
                <Link href="/services/ai-solutions" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  AI Solutions & Automation
                </Link>
              </li>
              <li>
                <Link href="/services/cybersecurity-development" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Cybersecurity Development
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance-bug-fixing" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Maintenance & Bug Fixing
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-archia uppercase tracking-widest text-[#FDBB4F] font-bold">Studio</h4>
            <ul className="space-y-2 text-xs font-archia font-medium">
              <li>
                <Link href="/about" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Portfolio Showcases
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Studio FAQ
                </Link>
              </li>
              <li>
                <Link href="/get-a-quote" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#E9EDC9]/80 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-[#E9EDC9]/60 hover:text-[#FEFAE0] hover:underline transition-colors">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Communication Channels */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#FDBB4F] font-bold">Direct Channels</h4>
            <div className="space-y-2.5 text-xs font-mono">
              <div>
                <span className="text-[#8A9486] block text-[10px] uppercase">Email Inquiries:</span>
                <a href="mailto:technovastudio.in@gmail.com" className="text-[#FEFAE0] hover:underline">
                  technovastudio.in@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[#8A9486] block text-[10px] uppercase">WhatsApp / Call 1:</span>
                <a href="https://wa.me/917457912227" target="_blank" rel="noopener noreferrer" className="text-[#FEFAE0] hover:underline">
                  +91 74579 12227
                </a>
              </div>
              <div>
                <span className="text-[#8A9486] block text-[10px] uppercase">WhatsApp / Call 2:</span>
                <a href="https://wa.me/916375547551" target="_blank" rel="noopener noreferrer" className="text-[#FEFAE0] hover:underline">
                  +91 63755 47551
                </a>
              </div>
              <div>
                <span className="text-[#8A9486] block text-[10px] uppercase">Instagram:</span>
                <a
                  href="https://www.instagram.com/technova_studio.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FEFAE0] hover:underline"
                >
                  @technova_studio.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8A9486]">
          <p>© {currentYear} TECHNOVA STUDIO. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#FEFAE0] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FEFAE0] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#FEFAE0] transition-colors">
              Cookie Policy
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 border border-[#CCD5AE]/20 hover:border-[#FEFAE0] text-[#E9EDC9] hover:text-[#FEFAE0] transition-colors"
            title="Scroll to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
