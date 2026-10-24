"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] hover:border-[#D4A373] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div>
        {/* Cover Image Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#E9EDC9] border-b border-[#CCD5AE]">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category Pill */}
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#041214]/90 text-[#FEFAE0] backdrop-blur-sm font-semibold">
              {project.category}
            </span>
          </div>

          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#D4A373] text-[#1F2421] font-bold">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#1F2421] mb-2 group-hover:text-[#A06733] transition-colors leading-snug">
            <Link href={`/portfolio/${project.slug}`} className="focus:outline-none focus:underline">
              {project.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed mb-4 line-clamp-2 font-sans">
            {project.summary}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9EDC9] text-[#1F2421] border border-[#CCD5AE]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 pt-0 flex items-center justify-between gap-2 border-t border-[#CCD5AE]/60 mt-4 pt-4">
        <Link
          href={`/portfolio/${project.slug}`}
          className="text-xs font-archia font-semibold tracking-wide text-[#1F2421] hover:text-[#D4A373] flex items-center gap-1 transition-colors"
        >
          <span>View Architecture</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-archia font-medium tracking-wide text-[#5B6358] hover:text-[#1F2421] flex items-center gap-1 transition-colors"
          >
            <span>Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
