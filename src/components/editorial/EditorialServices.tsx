"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Code2, Globe, Layout, Server, Cpu, ShieldCheck, Wrench } from "lucide-react";
import { Service } from "@/lib/types";

interface EditorialServicesProps {
  services: Service[];
}

const iconMap: Record<string, any> = {
  Globe,
  Layout,
  Server,
  Cpu,
  ShieldCheck,
  Wrench,
  Code2,
};

export default function EditorialServices({ services }: EditorialServicesProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]?.id || "");
  const activeService = services.find((s) => s.id === activeServiceId) || services[0];
  const IconComponent = activeService ? iconMap[activeService.icon_name] || Code2 : Code2;

  return (
    <section className="py-20 sm:py-28 border-t border-[#CCD5AE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#CCD5AE]">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">
              // 01 SERVICES & DISCIPLINES
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421]">
              Comprehensive Digital Capabilities.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#5B6358] max-w-md">
            Six disciplined practice areas built around genuine business requirements rather than rigid template constraints.
          </p>
        </div>

        {/* Asymmetrical Composition (Left: Active Spotlight Detail, Right: Editorial Index) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Spotlight Deep Dive on Active Service */}
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-10 space-y-8 shadow-xs sticky top-28"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#CCD5AE]">
                <div className="w-12 h-12 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373]">
                  <IconComponent className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-mono text-[#5B6358] uppercase tracking-wider font-semibold">
                  DISCIPLINE [{String(activeService.display_order).padStart(2, "0")}]
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">
                  {activeService.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed font-sans">
                  {activeService.full_description}
                </p>
              </div>

              {/* Key Deliverables */}
              {activeService.deliverables && (
                <div className="space-y-3 pt-4 border-t border-[#CCD5AE]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                    Deliverables & Standards:
                  </span>
                  <ul className="space-y-2">
                    {activeService.deliverables.slice(0, 4).map((d, idx) => (
                      <li key={idx} className="text-xs text-[#5B6358] flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] mt-1.5 flex-shrink-0" />
                        <span><strong>{d.title}:</strong> {d.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Link CTA */}
              <div className="pt-4 flex items-center justify-between border-t border-[#CCD5AE]">
                <span className="text-xs font-mono text-[#A06733] font-semibold">
                  {activeService.starting_price}
                </span>

                <Link
                  href={`/services/${activeService.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#1F2421] hover:text-[#D4A373] transition-colors"
                >
                  <span>Explore Technical Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Right Column: Editorial Service List */}
          <div className="lg:col-span-7 space-y-3">
            {services.map((service, index) => {
              const isActive = service.id === activeService?.id;
              const ServiceIcon = iconMap[service.icon_name] || Code2;
              return (
                <motion.div
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  onMouseEnter={() => setActiveServiceId(service.id)}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={`p-6 sm:p-7 rounded-2xl border transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#FEFAE0] border-[#D4A373] shadow-md ring-1 ring-[#D4A373]/30"
                      : "bg-[#FAEDCD]/40 border-[#CCD5AE]/70 hover:border-[#CCD5AE] hover:bg-[#FAEDCD]/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#A06733] font-bold">
                          /{String(index + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-2xl font-display font-normal text-[#1F2421]">
                          {service.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5B6358] line-clamp-2 leading-relaxed font-sans">
                        {service.short_description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0 pt-1">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? "bg-[#E9EDC9] text-[#A06733]" : "bg-[#FAEDCD] text-[#5B6358]"
                      }`}>
                        <ServiceIcon className="w-4 h-4" />
                      </div>
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`p-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-[#041214] text-[#FEFAE0]"
                            : "bg-[#CCD5AE]/40 text-[#1F2421] hover:bg-[#041214] hover:text-[#FEFAE0]"
                        }`}
                        title="View Detail Page"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
