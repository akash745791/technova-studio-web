"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";

interface EditorialProjectsProps {
  projects: Project[];
}

export default function EditorialProjects({ projects }: EditorialProjectsProps) {
  const featured = projects.filter((p) => p.featured || p.published).slice(0, 3);

  return (
    <section className="py-20 sm:py-28 border-t border-[#CCD5AE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#CCD5AE]">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">
              // 02 ARCHITECTURAL SHOWCASE
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421]">
              Selected Technical Showcases.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-xs font-mono font-semibold text-[#1F2421] hover:text-[#D4A373] flex items-center gap-1.5 transition-colors"
          >
            <span>View Complete Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Projects Showcase: Asymmetrical Editorial List with Image Previews */}
        <div className="space-y-12">
          {featured.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl overflow-hidden shadow-xs hover:border-[#D4A373] transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}>
                  {/* Image Column */}
                  <div className={`lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#E9EDC9] ${isEven ? "" : "lg:col-start-6"}`}>
                    <Image
                      src={project.cover_image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#041214]/90 text-[#FEFAE0] backdrop-blur-sm font-semibold">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#D4A373] text-[#1F2421] font-bold">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-5 p-8 sm:p-12 space-y-6 ${isEven ? "" : "lg:col-start-1"}`}>
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#A06733] block font-semibold">
                        CASE STUDY [{String(idx + 1).padStart(2, "0")}]
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421] leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed pt-1 font-sans">
                        {project.summary}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B6358] font-semibold block">
                        Engineered With:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded bg-[#E9EDC9] border border-[#CCD5AE] text-[#1F2421] text-[11px] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Verification / Transparency Note */}
                    {project.client_note && (
                      <p className="text-[11px] text-[#A06733] italic border-l-2 border-[#D4A373] pl-3 py-0.5">
                        {project.client_note}
                      </p>
                    )}

                    {/* Action Links */}
                    <div className="pt-2 flex items-center gap-4">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] font-mono text-xs font-semibold transition-all shadow-xs"
                      >
                        <span>Case Study Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5B6358] hover:text-[#1F2421] transition-colors"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
