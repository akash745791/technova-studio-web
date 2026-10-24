"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Trash2,
  Send,
  X,
  ExternalLink,
} from "lucide-react";
import { Enquiry, EnquiryStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface EnquiriesManagerProps {
  enquiries: Enquiry[];
  onUpdate: () => void;
  targetRef?: string;
  onClearTargetRef?: () => void;
}

const statusColors: Record<EnquiryStatus, { bg: string; text: string; border: string }> = {
  new: { bg: "bg-[#D4A373]/15", text: "text-[#A06733]", border: "border-[#D4A373]/40" },
  reviewing: { bg: "bg-amber-500/15", text: "text-amber-800", border: "border-amber-500/40" },
  contacted: { bg: "bg-purple-500/15", text: "text-purple-800", border: "border-purple-500/40" },
  in_progress: { bg: "bg-sky-500/15", text: "text-sky-800", border: "border-sky-500/40" },
  completed: { bg: "bg-emerald-600/15", text: "text-emerald-800", border: "border-emerald-600/40" },
  closed: { bg: "bg-stone-500/15", text: "text-stone-700", border: "border-stone-500/40" },
};

export default function EnquiriesManager({
  enquiries,
  onUpdate,
  targetRef,
  onClearTargetRef,
}: EnquiriesManagerProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<EnquiryStatus>("new");
  const [saving, setSaving] = useState(false);
  const [retryingEmail, setRetryingEmail] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    if (targetRef && targetRef.trim()) {
      const clean = targetRef.trim().toUpperCase();
      const match = enquiries.find(
        (e) => e.reference_id.toUpperCase() === clean || e.id.toUpperCase() === clean
      );
      if (match) {
        openModal(match);
      } else {
        setSearch(clean);
      }
      onClearTargetRef?.();
    }
  }, [targetRef, enquiries, onClearTargetRef]);

  const filtered = enquiries.filter((e) => {
    const matchesStatus = filterStatus === "all" || e.status === filterStatus;
    const query = search.toLowerCase().trim();
    const matchesQuery =
      !query ||
      e.client_name.toLowerCase().includes(query) ||
      e.email.toLowerCase().includes(query) ||
      e.reference_id.toLowerCase().includes(query) ||
      e.project_title.toLowerCase().includes(query) ||
      (e.business_name && e.business_name.toLowerCase().includes(query));

    return matchesStatus && matchesQuery;
  });

  const openModal = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setNotes(enq.internal_notes || "");
    setStatus(enq.status);
    setActionMessage(null);
  };

  const closeModal = () => {
    setSelectedEnquiry(null);
    setActionMessage(null);
  };

  const handleSaveDetails = async () => {
    if (!selectedEnquiry) return;
    setSaving(true);
    setActionMessage(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internal_notes: notes }),
      });

      if (res.ok) {
        setActionMessage("Enquiry updated successfully.");
        onUpdate();
      } else {
        setActionMessage("Failed to update enquiry.");
      }
    } catch {
      setActionMessage("Network error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        closeModal();
        onUpdate();
      } else {
        alert("Failed to delete enquiry.");
      }
    } catch {
      alert("Error deleting enquiry.");
    }
  };

  const handleRetryEmail = async (id: string) => {
    setRetryingEmail(true);
    setActionMessage(null);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ retry_email: true }),
      });
      const data = await res.json();
      if (data.emailResult?.sent) {
        setActionMessage("Notification email sent successfully!");
        onUpdate();
      } else {
        setActionMessage(`Email dispatch status: ${data.emailResult?.error || "Failed or skipped"}`);
      }
    } catch {
      setActionMessage("Failed to retry email notification.");
    } finally {
      setRetryingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-5 space-y-3.5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#A06733] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Reference ID (e.g. TNS-2026-...), Client Name, Email, Phone..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono font-medium"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9486] hover:text-[#1F2421]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#8A9486] hidden sm:inline" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono font-medium"
            >
              <option value="all">All Statuses ({enquiries.length})</option>
              <option value="new">New ({enquiries.filter((e) => e.status === "new").length})</option>
              <option value="reviewing">Reviewing</option>
              <option value="contacted">Contacted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Status Badges */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#CCD5AE]/60 text-xs">
          <span className="text-[10px] font-mono uppercase text-[#5B6358] mr-1 font-bold">Filter By:</span>
          {["all", "new", "reviewing", "contacted", "in_progress", "completed"].map((st) => {
            const count = st === "all" ? enquiries.length : enquiries.filter((e) => e.status === st).length;
            const active = filterStatus === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all ${
                  active
                    ? "bg-[#041214] text-[#FEFAE0]"
                    : "bg-[#FEFAE0] border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421]"
                }`}
              >
                {st.replace("_", " ").toUpperCase()} ({count})
              </button>
            );
          })}
          <span className="ml-auto text-[11px] font-mono text-[#5B6358]">
            Showing {filtered.length} of {enquiries.length} enquiries
          </span>
        </div>
      </div>

      {/* Enquiries Table / List */}
      {filtered.length > 0 ? (
        <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#E9EDC9] border-b border-[#CCD5AE] text-[#5B6358] font-mono uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Ref & Date</th>
                  <th className="py-3.5 px-4 sm:px-6">Client & Business</th>
                  <th className="py-3.5 px-4 sm:px-6">Project Title & Service</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CCD5AE]/60">
                {filtered.map((enq) => {
                  const s = statusColors[enq.status] || statusColors.new;
                  return (
                    <tr
                      key={enq.id}
                      onClick={() => openModal(enq)}
                      className="hover:bg-[#E9EDC9]/50 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <span className="font-mono font-bold text-[#A06733] block">
                          {enq.reference_id}
                        </span>
                        <span className="text-[11px] text-[#5B6358] block mt-0.5">
                          {formatDate(enq.created_at)}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <span className="font-semibold text-[#1F2421] block text-sm">
                          {enq.client_name}
                        </span>
                        <span className="text-[#5B6358] block font-mono text-[11px]">{enq.email}</span>
                        {enq.business_name && (
                          <span className="text-[11px] text-[#8A9486] block">
                            {enq.business_name}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 sm:px-6 max-w-xs">
                        <span className="font-medium text-[#1F2421] block truncate">
                          {enq.project_title}
                        </span>
                        <span className="text-[11px] font-mono text-[#5B6358] block">
                          {enq.service_slug || "General Enquiry"}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border font-bold ${s.bg} ${s.text} ${s.border}`}
                        >
                          {enq.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(enq);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#FEFAE0] border border-[#CCD5AE] hover:border-[#D4A373] text-[#1F2421] hover:text-[#A06733] text-xs font-mono transition-colors font-bold shadow-xs"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-[#FAEDCD]/70 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-12 text-center text-[#5B6358] shadow-xs">
          <p className="text-sm font-sans">No enquiries found matching the selected filter or search.</p>
        </div>
      )}

      {/* Detail / Action Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-[#041214]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAEDCD] border border-[#CCD5AE] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-8 text-[#1F2421]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#FEFAE0] text-[#5B6358] hover:text-[#1F2421] border border-[#CCD5AE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-[#A06733] bg-[#E9EDC9] px-2.5 py-0.5 rounded border border-[#CCD5AE] font-bold">
                  {selectedEnquiry.reference_id}
                </span>
                <span className="text-xs text-[#5B6358] font-mono">
                  Submitted: {formatDate(selectedEnquiry.created_at)}
                </span>
              </div>
              <h3 className="text-2xl font-display font-normal text-[#1F2421]">{selectedEnquiry.project_title}</h3>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FEFAE0] p-4 rounded-2xl border border-[#CCD5AE] text-xs">
              <div>
                <span className="text-[#5B6358] block uppercase font-mono text-[10px] font-bold">Client Name:</span>
                <span className="text-[#1F2421] font-semibold text-sm">{selectedEnquiry.client_name}</span>
                {selectedEnquiry.business_name && (
                  <span className="text-[#5B6358] block">({selectedEnquiry.business_name})</span>
                )}
              </div>

              <div>
                <span className="text-[#5B6358] block uppercase font-mono text-[10px] font-bold">Email Address:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-[#A06733] font-semibold hover:underline font-mono">
                  {selectedEnquiry.email}
                </a>
              </div>

              {selectedEnquiry.phone && (
                <div>
                  <span className="text-[#5B6358] block uppercase font-mono text-[10px] font-bold">Phone / WhatsApp:</span>
                  <div className="flex items-center gap-2 mt-0.5 font-mono">
                    <span className="text-[#1F2421] font-medium">{selectedEnquiry.phone}</span>
                    <a
                      href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#128C7E] font-bold hover:underline"
                    >
                      (WhatsApp)
                    </a>
                  </div>
                </div>
              )}

              <div>
                <span className="text-[#5B6358] block uppercase font-mono text-[10px] font-bold">Preferred Contact:</span>
                <span className="text-[#1F2421] capitalize font-medium">{selectedEnquiry.preferred_contact_method}</span>
              </div>

              {selectedEnquiry.budget_range && (
                <div>
                  <span className="text-[#5B6358] block uppercase font-mono text-[10px] font-bold">Budget Range:</span>
                  <span className="text-[#1F2421] font-medium">{selectedEnquiry.budget_range}</span>
                </div>
              )}

              {selectedEnquiry.timeline && (
                <div>
                  <span className="text-[#5B6358] block uppercase font-mono text-[10px] font-bold">Desired Timeline:</span>
                  <span className="text-[#1F2421] font-medium">{selectedEnquiry.timeline}</span>
                </div>
              )}
            </div>

            {/* Project Description */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase text-[#5B6358] block font-bold">Project Description:</span>
              <div className="bg-[#FEFAE0] p-4 rounded-2xl border border-[#CCD5AE] text-[#1F2421] text-xs sm:text-sm whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto font-sans">
                {selectedEnquiry.project_description}
              </div>
            </div>

            {/* Status & Notification Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
                  Update Enquiry Status:
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
                  className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-mono"
                >
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <span className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
                  Email Dispatch Status:
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#FEFAE0] text-[#1F2421] border border-[#CCD5AE] capitalize font-medium">
                    {selectedEnquiry.notification_status}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRetryEmail(selectedEnquiry.id)}
                    disabled={retryingEmail}
                    className="px-2.5 py-1 rounded-lg bg-[#E9EDC9] border border-[#CCD5AE] text-[#A06733] hover:bg-[#FEFAE0] text-xs font-mono flex items-center gap-1 font-bold"
                  >
                    <Send className="w-3 h-3" />
                    <span>{retryingEmail ? "Retrying..." : "Retry Dispatch"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
                Private Internal Notes (Studio Admin Only):
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add confidential notes on client budget, discussion summary, or follow-up dates..."
                className="w-full px-3 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373] font-sans"
              />
            </div>

            {actionMessage && (
              <p className="text-xs font-mono text-[#A06733] font-bold">{actionMessage}</p>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#CCD5AE]">
              <button
                type="button"
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 hover:bg-red-500/20 text-xs font-mono flex items-center gap-1.5 font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Enquiry</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-xs font-mono text-[#5B6358] hover:text-[#1F2421]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveDetails}
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] font-bold text-[#FEFAE0] text-xs shadow-xs transition-colors"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
