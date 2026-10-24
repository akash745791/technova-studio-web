"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Globe, Layout, Server, Cpu, ShieldCheck, Wrench } from "lucide-react";
import { Service } from "@/lib/types";

interface ServicesManagerProps {
  services: Service[];
  onUpdate: () => void;
}

export default function ServicesManager({ services, onUpdate }: ServicesManagerProps) {
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const startCreate = () => {
    setIsNew(true);
    setEditingService({
      title: "",
      slug: "",
      short_description: "",
      full_description: "",
      deliverables: [{ title: "Deliverable 1", description: "Deliverable description" }],
      faqs: [{ q: "Question?", a: "Answer." }],
      starting_price: "Request a Quote",
      published: true,
      display_order: services.length + 1,
      icon_name: "Globe",
    });
  };

  const startEdit = (s: Service) => {
    setIsNew(false);
    setEditingService({ ...s });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      if (res.ok) {
        setEditingService(null);
        onUpdate();
      } else {
        alert("Failed to save service");
      }
    } catch {
      alert("Error saving service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
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
          <h3 className="text-2xl font-display font-normal text-[#1F2421]">Active Studio Services</h3>
          <p className="text-xs text-[#5B6358] font-sans">Manage offered studio services, deliverables, and FAQs.</p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] font-bold text-xs font-mono shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-[#D4A373] transition-colors shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E9EDC9] text-[#A06733] font-bold border border-[#CCD5AE]">
                  Order: {service.display_order} • /{service.slug}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    service.published
                      ? "bg-emerald-600/10 text-emerald-800 border border-emerald-600/20"
                      : "bg-red-500/10 text-red-800 border border-red-500/20"
                  }`}
                >
                  {service.published ? "Published" : "Draft"}
                </span>
              </div>
              <h4 className="text-2xl font-display font-normal text-[#1F2421] mb-1">{service.title}</h4>
              <p className="text-xs text-[#5B6358] line-clamp-2 leading-relaxed font-sans">
                {service.short_description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#CCD5AE]/60">
              <span className="text-xs text-[#5B6358] font-mono">
                {service.deliverables?.length || 0} Deliverables • {service.faqs?.length || 0} FAQs
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(service)}
                  className="p-2 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-[#1F2421] hover:text-[#A06733] hover:border-[#D4A373] transition-colors"
                  title="Edit Service"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 hover:bg-red-500/20 transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-[#041214]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="bg-[#FAEDCD] border border-[#CCD5AE] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8 shadow-2xl relative text-[#1F2421]"
          >
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#FEFAE0] text-[#5B6358] hover:text-[#1F2421] border border-[#CCD5AE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-display font-normal text-[#1F2421]">
              {isNew ? "Create New Service" : `Edit Service: ${editingService.title}`}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ""}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Slug</label>
                <input
                  type="text"
                  required
                  value={editingService.slug || ""}
                  onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Icon</label>
                <select
                  value={editingService.icon_name || "Globe"}
                  onChange={(e) => setEditingService({ ...editingService, icon_name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
                >
                  <option value="Globe">Globe</option>
                  <option value="Layout">Layout</option>
                  <option value="Server">Server</option>
                  <option value="Cpu">Cpu</option>
                  <option value="ShieldCheck">ShieldCheck</option>
                  <option value="Wrench">Wrench</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Display Order</label>
                <input
                  type="number"
                  value={editingService.display_order ?? 1}
                  onChange={(e) => setEditingService({ ...editingService, display_order: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1F2421] font-bold">
                  <input
                    type="checkbox"
                    checked={editingService.published ?? true}
                    onChange={(e) => setEditingService({ ...editingService, published: e.target.checked })}
                    className="rounded border-[#CCD5AE] text-[#D4A373] focus:ring-[#D4A373]"
                  />
                  <span>Published on site</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Short Description</label>
              <textarea
                rows={2}
                required
                value={editingService.short_description || ""}
                onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1 font-bold">Full Description</label>
              <textarea
                rows={4}
                required
                value={editingService.full_description || ""}
                onChange={(e) => setEditingService({ ...editingService, full_description: e.target.value })}
                className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-sans"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#CCD5AE]">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-xs font-mono text-[#5B6358] hover:text-[#1F2421]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] font-bold text-[#FEFAE0] text-xs shadow-xs transition-colors"
              >
                {saving ? "Saving..." : "Save Service"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
