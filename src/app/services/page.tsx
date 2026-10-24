import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/store";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore TECHNOVA STUDIO's digital services: Website Development, Frontend Interfaces, Backend & APIs, AI Solutions, Cybersecurity-Focused Development, and Maintenance.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices(false);

  return (
    <div className="pt-20 pb-28 space-y-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] tracking-wider font-bold">
            <span>DISCIPLINES & PRACTICES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421] leading-tight">
            Specialized Digital Services for Modern Businesses.
          </h1>

          <p className="text-base sm:text-lg text-[#5B6358] leading-relaxed font-sans">
            From performant frontend interfaces and scalable backend architectures to practical AI automations and website troubleshooting—every solution is tailored directly to your project scope.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Pricing Transparency Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">
              TRANSPARENT COMMERCIAL TERMS
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">
              Project-Based Custom Quotations
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed font-sans">
              We do not publish artificial fixed pricing because every business has distinct architectural needs, timeline constraints, and feature scopes. We review your exact specifications and provide an honest, itemized quotation.
            </p>
          </div>

          <Link
            href="/get-a-quote"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] font-archia text-sm font-semibold tracking-wide shadow-xs flex-shrink-0 transition-all"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
