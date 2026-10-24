import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import ProjectCard from "@/components/ProjectCard";
import { getServices, getProjects } from "@/lib/store";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices(false);
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const services = await getServices(false);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} — TECHNOVA STUDIO`,
    description: service.short_description,
    openGraph: {
      title: `${service.title} | TECHNOVA STUDIO`,
      description: service.short_description,
    },
  };
}

export const revalidate = 60;

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const [services, allProjects] = await Promise.all([
    getServices(false),
    getProjects(false),
  ]);

  const service = services.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const relatedProjects = allProjects.filter((p) =>
    p.category.toLowerCase().includes(service.title.toLowerCase()) ||
    service.title.toLowerCase().includes(p.category.toLowerCase())
  );

  const limitationsMap: Record<string, string[]> = {
    "website-development": [
      "Custom domain registration and hosting provider accounts are provided by or registered directly in the client's name for complete asset ownership.",
      "Third-party API rate limits and external service costs (such as email dispatch or database hosting) depend on the chosen tiers.",
      "Project timelines depend on responsive feedback during discovery and design approval milestones.",
    ],
    "frontend-development": [
      "Backend APIs must adhere to standard REST/GraphQL contracts, or mock specifications must be agreed before frontend implementation.",
      "Cross-browser testing covers evergreen modern browsers (Chrome, Safari, Firefox, Edge). Legacy non-standard browsers are excluded unless scoped.",
    ],
    "backend-apis": [
      "Cloud infrastructure hosting fees (e.g., Supabase, AWS, Cloudflare) are billed directly by the respective provider.",
      "API performance SLAs are subject to underlying server compute capacity and network topology.",
    ],
    "ai-solutions": [
      "External AI providers (e.g. Google Gemini, OpenAI) require active API keys and may incur token usage billing directly from the vendor.",
      "AI outputs are probabilistic; human-in-the-loop verification is recommended for mission-critical workflows.",
      "We never claim AI models function without configured, authorized provider credentials.",
    ],
    "cybersecurity-development": [
      "We provide security-conscious engineering, defensive headers, RLS setup, and dependency vulnerability mitigation.",
      "We do not claim certified penetration testing or guarantee 100% invulnerability against novel zero-day threats.",
      "All assessments must be strictly within authorized, client-owned digital assets.",
    ],
    "maintenance-bug-fixing": [
      "Scope is bounded by agreed ticket hours or retainer agreements.",
      "Access to code repositories, hosting accounts, or server logs is required for debugging.",
      "Outdated legacy frameworks with deprecated dependencies may require refactoring before specific bugs can be resolved.",
    ],
  };

  const limitations = limitationsMap[service.slug] || [
    "Project scope and specific deliverables are confirmed prior to contract commencement.",
    "Third-party subscriptions, hosting fees, and domains remain the client's direct asset ownership.",
  ];

  return (
    <div className="pt-20 pb-28 space-y-20">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#5B6358] hover:text-[#1F2421] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Service Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] font-bold">
              <span>SERVICE SPECIFICATION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421] leading-tight">
              {service.title}
            </h1>

            <p className="text-lg text-[#5B6358] leading-relaxed font-sans">
              {service.short_description}
            </p>

            <div className="pt-2 text-[#5B6358] leading-relaxed space-y-4 text-sm sm:text-base font-sans">
              <p>{service.full_description}</p>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className="lg:col-span-4 bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 space-y-6 shadow-xs sticky top-28">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#A06733] block font-bold">
              Direct Service Brief
            </span>

            <div className="space-y-1">
              <span className="text-xs text-[#5B6358] block">Commercial Pricing:</span>
              <span className="text-xl font-display font-bold text-[#A06733]">
                {service.starting_price || "Starting from ₹5,000"}
              </span>
            </div>

            <p className="text-xs text-[#5B6358] leading-relaxed font-sans">
              All quotes are itemized in Indian Rupees (INR / ₹) based on your custom requirements with zero hidden charges.
            </p>

            <div className="space-y-3 pt-2">
              <Link
                href={`/get-a-quote?service=${service.slug}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-[#FEFAE0] bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] shadow-xs text-sm font-archia tracking-wide transition-all"
              >
                <span>Request This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href={`https://wa.me/917457912227?text=Hello%20TECHNOVA%20STUDIO%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-archia font-medium tracking-wide text-[#1F2421] bg-[#FEFAE0] border border-[#CCD5AE] hover:bg-[#E9EDC9] transition-all"
              >
                <span>Discuss on WhatsApp (+91 74579 12227)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-14 space-y-8 shadow-xs">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold block mb-2">
              Scope & Tangible Outputs
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">
              What We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="bg-[#FEFAE0] border border-[#CCD5AE] rounded-2xl p-6 space-y-2">
                <div className="flex items-center gap-2.5 text-[#1F2421] font-bold text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed pl-6 font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clear Limitations & Assumptions (Honesty Rule) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E9EDC9]/70 border border-[#CCD5AE] rounded-3xl p-8 sm:p-10 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#1F2421]">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-[#A06733]" />
            <h3 className="font-display font-normal text-2xl text-[#1F2421]">Limitations & Realistic Assumptions</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed font-sans">
            We value realistic transparency over unachievable marketing promises. Please note the following parameters:
          </p>
          <ul className="space-y-2.5 pt-2">
            {limitations.map((lim, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-[#5B6358] flex items-start gap-2.5 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] mt-2 flex-shrink-0" />
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">Inquiries</span>
              <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion items={service.faqs} />
          </div>
        </section>
      )}

      {/* Related Showcase Projects if available */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold block mb-1">
              Demonstrations
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">
              Related Technical Showcases
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#041214] border border-[#CCD5AE]/30 p-10 sm:p-14 text-center space-y-4 shadow-xl">
          <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#FEFAE0]">
            Ready to begin your {service.title} project?
          </h3>
          <p className="text-xs sm:text-sm text-[#E9EDC9]/80 max-w-lg mx-auto font-sans">
            Contact us today for a structured requirement review and transparent project roadmap.
          </p>
          <div className="pt-2">
            <Link
              href={`/get-a-quote?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[#041214] bg-[#D4A373] hover:bg-[#FDBB4F] shadow-sm text-sm font-archia tracking-wide transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
