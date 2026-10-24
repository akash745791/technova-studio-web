"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectsManagerProps {
  projects: Project[];
  onUpdate: () => void;
}

export default function ProjectsManager({ projects, onUpdate }: ProjectsManagerProps) {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState("");

  const startCreate = () => {
    setIsNew(true);
    setEditingProject({
      title: "",
      slug: "",
      summary: "",
      description: "",
      category: "Website Development",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      deliverables: ["Responsive Web Design", "API Integration"],
      cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      gallery: [],
      project_url: "",
      featured: false,
      published: true,
      display_order: projects.length + 1,
      client_note: "Architectural showcase developed by TECHNOVA STUDIO.",
    });
    setTechInput("Next.js, TypeScript, Tailwind CSS");
  };

  const startEdit = (p: Project) => {
    setIsNew(false);
    setEditingProject({ ...p });
    setTechInput(p.technologies?.join(", ") || "");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setSaving(true);

    const techs = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...editingProject,
      technologies: techs,
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditingProject(null);
        onUpdate();
      } else {
        alert("Failed to save project");
      }
    } catch {
      alert("Error saving project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        onUpdate();
      }
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-display font-normal text-[#1F2421]">Portfolio & Showcase Projects</h3>
          <p className="text-xs text-[#5B6358] font-sans">Manage published client case studies and verified studio architectures.</p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] font-bold text-xs font-mono shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#D4A373] transition-colors shadow-xs"
          >
            <div>
              <div className="relative aspect-video w-full bg-[#E9EDC9] border-b border-[#CCD5AE]">
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#041214]/90 text-[#FEFAE0] font-semibold backdrop-blur-sm">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D4A373] text-[#1F2421] font-bold shadow-xs">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h4 className="text-xl font-display font-normal text-[#1F2421] truncate">{project.title}</h4>
                <p className="text-xs text-[#5B6358] line-clamp-2 leading-relaxed font-sans">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.technologies.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9EDC9] border border-[#CCD5AE] text-[#1F2421]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-3 border-t border-[#CCD5AE]/60 flex items-center justify-between bg-[#E9EDC9]/40">
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  project.published
                    ? "bg-emerald-600/10 text-emerald-800 border border-emerald-600/20"
                    : "bg-red-500/10 text-red-800 border border-red-500/20"
                }`}
              >
                {project.published ? "Published" : "Draft"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(project)}
                  className="p-1.5 rounded-lg bg-[#FEFAE0] border border-[#CCD5AE] text-[#1F2421] hover:text-[#A06733] hover:border-[#D4A373] transition-colors shadow-xs"
                  title="Edit Project"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 hover:bg-red-500/20 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-[#041214]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="bg-[#FAEDCD] border border-[#CCD5AE] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 my-8 shadow-2xl relative text-[#1F2421]"
          >
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#FEFAE0] text-[#5B6358] hover:text-[#1F2421] border border-[#CCD5AE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-display font-normal text-[#1F2421]">
              {isNew ? "Create New Portfolio Project" : `Edit Project: ${editingProject.title}`}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Slug</label>
                <input
                  type="text"
                  required
                  value={editingProject.slug || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Category</label>
                <select
                  value={editingProject.category || "Website Development"}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development & APIs">Backend Development & APIs</option>
                  <option value="AI Solutions & Automation">AI Solutions & Automation</option>
                  <option value="Cybersecurity-Focused Development">Cybersecurity Development</option>
                  <option value="Website Maintenance & Bug Fixing">Website Maintenance</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1F2421] font-bold">
                  <input
                    type="checkbox"
                    checked={editingProject.featured ?? false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="rounded border-[#CCD5AE] text-[#D4A373] focus:ring-[#D4A373]"
                  />
                  <span>Featured Showcase</span>
                </label>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1F2421] font-bold">
                  <input
                    type="checkbox"
                    checked={editingProject.published ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="rounded border-[#CCD5AE] text-[#D4A373] focus:ring-[#D4A373]"
                  />
                  <span>Published on site</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Cover Image URL</label>
              <input
                type="url"
                required
                value={editingProject.cover_image || ""}
                onChange={(e) => setEditingProject({ ...editingProject, cover_image: e.target.value })}
                className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Summary</label>
              <input
                type="text"
                required
                value={editingProject.summary || ""}
                onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Full Description</label>
              <textarea
                rows={3}
                required
                value={editingProject.description || ""}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">External Project URL (Optional)</label>
              <input
                type="url"
                value={editingProject.project_url || ""}
                onChange={(e) => setEditingProject({ ...editingProject, project_url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Studio / Client Transparency Note</label>
              <input
                type="text"
                value={editingProject.client_note || ""}
                onChange={(e) => setEditingProject({ ...editingProject, client_note: e.target.value })}
                className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-sans"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#CCD5AE]">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-xs font-mono text-[#5B6358] hover:text-[#1F2421]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] font-bold text-[#FEFAE0] text-xs shadow-xs transition-colors"
              >
                {saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
