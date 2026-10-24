"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, MessageSquare, Phone } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Do not render public navbar on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FEFAE0]/95 backdrop-blur-md border-b border-[#CCD5AE] py-3.5 shadow-xs"
          : "bg-[#FEFAE0]/80 backdrop-blur-sm border-b border-[#CCD5AE]/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FAEDCD] px-3.5 py-1.5 rounded-full border border-[#CCD5AE] shadow-xs" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs font-archia tracking-wide rounded-full transition-colors duration-200 ${
                    active
                      ? "text-[#1F2421] bg-[#E9EDC9] shadow-xs font-bold"
                      : "text-[#5B6358] hover:text-[#1F2421] hover:bg-[#FEFAE0] font-medium"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4A373]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/917457912227?text=Hello%20TECHNOVA%20STUDIO%2C%20I%20would%20like%20to%20discuss%20a%20website%20or%20digital%20engineering%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-archia font-medium text-[#1F2421] hover:text-[#A06733] border border-[#CCD5AE] hover:border-[#D4A373] rounded-lg transition-colors bg-[#FAEDCD] shadow-xs"
              title="Chat on WhatsApp: +91 74579 12227"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>+91 74579 12227</span>
            </a>

            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-archia font-semibold tracking-wide rounded-lg text-[#FEFAE0] bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] transition-all shadow-xs"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/get-a-quote"
              className="px-3 py-1.5 text-xs font-archia font-semibold rounded-md text-[#FEFAE0] bg-[#041214]"
            >
              Quote
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#FAEDCD] border border-[#CCD5AE] text-[#1F2421]"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#FEFAE0] z-50 overflow-y-auto px-6 py-8 flex flex-col justify-between border-t border-[#CCD5AE]">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A06733] block">
              DIRECTORY //
            </span>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 text-sm font-archia font-medium rounded-xl transition-colors flex items-center justify-between ${
                      active
                        ? "bg-[#E9EDC9] text-[#1F2421] font-bold border border-[#CCD5AE]"
                        : "text-[#5B6358] hover:bg-[#FAEDCD] hover:text-[#1F2421]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#CCD5AE]">
            <Link
              href="/get-a-quote"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#041214] text-[#FEFAE0] font-archia text-sm font-semibold tracking-wide"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/917457912227"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAEDCD] border border-[#CCD5AE] text-[#1F2421] font-archia text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 text-[#D4A373]" />
              <span>WhatsApp: +91 74579 12227</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
