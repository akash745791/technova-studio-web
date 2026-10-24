"use client";

import { useState, useMemo } from "react";
import { Search, FolderOpen } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/lib/types";

export default function PortfolioClient({ initialProjects }: { initialProjects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    initialProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.technologies.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search and Filters Bar */}
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-archia tracking-wide transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#041214] text-[#FEFAE0] font-semibold shadow-xs"
                  : "bg-[#FEFAE0] border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421] hover:bg-[#E9EDC9] font-medium"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-[#8A9486] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search work or tech..."
            className="w-full pl-9 pr-4 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs font-mono text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center mx-auto text-[#8A9486]">
            <FolderOpen className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-display font-normal text-[#1F2421]">No Showcases Found</h4>
          <p className="text-xs text-[#5B6358] leading-relaxed font-sans">
            No projects matched your selected filter. Please select &quot;All&quot; or try a different search keyword.
          </p>
        </div>
      )}
    </div>
  );
}
