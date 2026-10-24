import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for TECHNOVA STUDIO. Transparent explanation of cookie usage and visitor privacy.",
};

export default function CookiePolicyPage() {
  return (
    <div className="pt-20 pb-28 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] tracking-wider font-bold">
          <span>COOKIE TRANSPARENCY</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421]">
          Cookie Policy
        </h1>
        <p className="text-xs font-mono text-[#5B6358]">
          Last Updated: October 2026 • TECHNOVA STUDIO
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8 text-sm sm:text-base text-[#5B6358] leading-relaxed font-sans">
        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">1. Our Privacy-First Approach to Cookies</h2>
          <p>
            At TECHNOVA STUDIO, we believe in privacy-by-design. We do not use intrusive third-party cross-site tracking cookies, marketing pixels, or invasive surveillance analytics on our public website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">2. Essential Cookies Used</h2>
          <p>
            The only cookies set by this website are strictly necessary technical cookies:
          </p>
          <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#D4A373] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[#1F2421] text-sm font-bold">technova_admin_token</span>
                <p className="text-xs text-[#5B6358] mt-1">
                  <strong>Type:</strong> Strictly Necessary / Authentication Cookie (HttpOnly, Secure, SameSite=Lax).
                </p>
                <p className="text-xs text-[#5B6358] mt-0.5">
                  <strong>Purpose:</strong> Used solely to authenticate authorized studio personnel accessing the private `/admin` dashboard. It is never set for regular public website visitors.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-display font-normal text-[#1F2421]">3. Third-Party Embeds & External Links</h2>
          <p>
            Our website contains links to external platforms such as WhatsApp (`wa.me`) and Instagram (`instagram.com`). When you click these links to visit external services, their respective privacy and cookie practices apply.
          </p>
        </section>
      </div>
    </div>
  );
}
