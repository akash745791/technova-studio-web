import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, ShieldAlert } from "lucide-react";
import { getProjects } from "@/lib/store";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects(false);
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects(false);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Case Study | TECHNOVA STUDIO`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | TECHNOVA STUDIO`,
      description: project.summary,
      images: [{ url: project.cover_image }],
    },
  };
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const projects = await getProjects(false);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-20 pb-28 space-y-16">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#5B6358] hover:text-[#1F2421] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Showcases</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#A06733] font-bold">
            <span>{project.category}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-normal text-[#1F2421] leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#5B6358] leading-relaxed font-sans">
            {project.summary}
          </p>

          {project.project_url && (
            <div className="pt-2">
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAEDCD] border border-[#CCD5AE] text-xs font-mono text-[#1F2421] hover:border-[#D4A373] transition-colors shadow-xs"
              >
                <span>Visit External Repository / Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Cover Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video sm:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#CCD5AE] shadow-xs bg-[#E9EDC9]">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Case Study Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Case Study Copy */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-12 space-y-4 shadow-xs">
              <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">Project Overview</h2>
              <p className="text-[#5B6358] leading-relaxed text-sm sm:text-base whitespace-pre-line font-sans">
                {project.description}
              </p>
            </div>

            {/* Key Deliverables & Engineering Features */}
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-8 sm:p-12 space-y-6 shadow-xs">
                <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#1F2421]">Key Architectural Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.deliverables.map((d, idx) => (
                    <div key={idx} className="bg-[#FEFAE0] border border-[#CCD5AE] rounded-2xl p-4 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-[#1F2421] font-medium font-sans">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specs & CTA */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            {/* Tech Stack */}
            <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 space-y-4 shadow-xs">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#A06733] block font-bold">
                Technology Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#E9EDC9] text-[#1F2421] border border-[#CCD5AE]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Authenticity Transparency Statement */}
            <div className="bg-[#E9EDC9]/70 border border-[#CCD5AE] rounded-3xl p-6 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A06733] font-bold block">
                Studio Transparency
              </span>
              <p className="text-xs text-[#5B6358] leading-relaxed font-sans">
                {project.client_note || "Architectural demonstration developed by TECHNOVA STUDIO."}
              </p>
            </div>

            {/* Build Similar Project CTA */}
            <div className="bg-[#041214] border border-[#CCD5AE]/30 rounded-3xl p-6 text-center space-y-3 shadow-xl">
              <h4 className="text-2xl font-display font-normal text-[#FEFAE0]">
                Need a Similar Architecture?
              </h4>
              <p className="text-xs text-[#E9EDC9]/80 font-sans">
                We can adapt these patterns to your exact business workflow.
              </p>
              <Link
                href={`/get-a-quote?service=${project.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-[#041214] bg-[#D4A373] hover:bg-[#FDBB4F] shadow-sm text-sm font-archia tracking-wide transition-colors"
              >
                <span>Request Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
