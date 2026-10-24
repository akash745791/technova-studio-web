"use client";

import Link from "next/link";
import { Globe, Layout, Server, Cpu, ShieldCheck, Wrench, ArrowRight, Code2 } from "lucide-react";
import { Service } from "@/lib/types";

const iconMap: Record<string, any> = {
  Globe,
  Layout,
  Server,
  Cpu,
  ShieldCheck,
  Wrench,
  Code2,
};

export default function ServiceCard({ service }: { service: Service }) {
  const IconComponent = iconMap[service.icon_name] || Code2;
  const indexStr = service.display_order ? String(service.display_order).padStart(2, "0") : "01";

  return (
    <div className="group relative bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] hover:border-[#D4A373] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div>
        {/* Top Header with Index & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-11 h-11 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#D4A373] transition-colors">
            <IconComponent className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-xs font-mono text-[#5B6358] uppercase tracking-widest font-semibold">
            [{indexStr}]
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#1F2421] mb-3 group-hover:text-[#A06733] transition-colors">
          <Link href={`/services/${service.slug}`} className="focus:outline-none focus:underline">
            {service.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed mb-6 font-sans">
          {service.short_description}
        </p>

        {/* Deliverables Checklist */}
        {service.deliverables && service.deliverables.length > 0 && (
          <ul className="space-y-2 mb-6 border-t border-[#CCD5AE]/60 pt-4">
            {service.deliverables.slice(0, 3).map((d, idx) => (
              <li key={idx} className="text-xs text-[#5B6358] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
                <span className="truncate">{d.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#CCD5AE]/60 flex items-center justify-between gap-2">
        <span className="text-xs font-mono text-[#A06733] font-semibold">
          {service.starting_price}
        </span>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-archia font-semibold tracking-wide text-[#1F2421] group-hover:text-[#D4A373] transition-colors"
        >
          <span>Scope Details</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
