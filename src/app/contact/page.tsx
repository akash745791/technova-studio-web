import type { Metadata } from "next";
import { Mail, Phone, Instagram, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with TECHNOVA STUDIO. Contact us via email, WhatsApp, or telephone for project discussions and website troubleshooting.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 pb-28 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] tracking-wider font-bold">
            <span>DIRECT INQUIRIES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421] leading-tight">
            Let&apos;s Talk About Your Next Digital Project.
          </h1>

          <p className="text-base sm:text-lg text-[#5B6358] leading-relaxed font-sans">
            Have a project in mind, need troubleshooting on an existing website, or want to discuss practical AI solutions? Reach out directly using your preferred channel.
          </p>
        </div>
      </section>

      {/* Main Grid: Direct Cards + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 shadow-xs hover:border-[#D4A373] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] flex-shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-mono uppercase text-[#5B6358] block font-bold">Direct Email</span>
                  <a
                    href="mailto:technovastudio.in@gmail.com"
                    className="text-base font-bold text-[#1F2421] hover:text-[#A06733] break-all transition-colors block font-mono"
                  >
                    technovastudio.in@gmail.com
                  </a>
                  <p className="text-xs text-[#5B6358] font-sans">For detailed project briefs, RFPs, and requirements.</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Primary Card */}
            <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 shadow-xs hover:border-[#D4A373] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] flex-shrink-0">
                  <MessageSquare className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] font-mono uppercase text-[#5B6358] block font-bold">WhatsApp Direct 1</span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/917457912227?text=Hello%20TECHNOVA%20STUDIO%2C%20I%20would%20like%20to%20discuss%20a%20website%20or%20digital%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#1F2421] hover:text-[#A06733] transition-colors font-mono"
                    >
                      +91 74579 12227
                    </a>
                    <a
                      href="tel:+917457912227"
                      className="text-[11px] font-mono text-[#1F2421] hover:text-[#A06733] px-2 py-0.5 rounded-lg bg-[#E9EDC9] border border-[#CCD5AE] font-semibold"
                    >
                      Call
                    </a>
                  </div>
                  <p className="text-xs text-[#5B6358] font-sans">Quick messaging & voice consultation.</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Secondary Card */}
            <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 shadow-xs hover:border-[#D4A373] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] flex-shrink-0">
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] font-mono uppercase text-[#5B6358] block font-bold">WhatsApp / Phone 2</span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/916375547551?text=Hello%20TECHNOVA%20STUDIO%2C%20I%20would%20like%20to%20discuss%20a%20website%20or%20digital%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#1F2421] hover:text-[#A06733] transition-colors font-mono"
                    >
                      +91 63755 47551
                    </a>
                    <a
                      href="tel:+916375547551"
                      className="text-[11px] font-mono text-[#1F2421] hover:text-[#A06733] px-2 py-0.5 rounded-lg bg-[#E9EDC9] border border-[#CCD5AE] font-semibold"
                    >
                      Call
                    </a>
                  </div>
                  <p className="text-xs text-[#5B6358] font-sans">Alternative direct engineering line.</p>
                </div>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 shadow-xs hover:border-[#D4A373] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] flex-shrink-0">
                  <Instagram className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-mono uppercase text-[#5B6358] block font-bold">Official Instagram</span>
                  <a
                    href="https://www.instagram.com/technova_studio.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#1F2421] hover:text-[#A06733] transition-colors block font-mono"
                  >
                    @technova_studio.in
                  </a>
                  <p className="text-xs text-[#5B6358] font-sans">Studio visual dispatch & updates.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
