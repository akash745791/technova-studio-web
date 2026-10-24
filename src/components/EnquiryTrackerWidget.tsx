"use client";

import { useState } from "react";
import { Search, Loader2, ArrowRight, Clock, MessageSquare, Phone, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

const statusSteps = [
  { key: "new", label: "Received", desc: "Brief logged & queued for technical review" },
  { key: "reviewing", label: "Reviewing", desc: "Analyzing scope & feasibility" },
  { key: "contacted", label: "Contacted", desc: "Studio reached out via preferred channel" },
  { key: "in_progress", label: "In Development", desc: "Active development underway" },
  { key: "completed", label: "Completed", desc: "Delivered & live" },
];

export default function EnquiryTrackerWidget() {
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId.trim()) {
      setError("Please enter your Reference ID (e.g. TNS-2026-XXXXX)");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/enquiries/track?ref=${encodeURIComponent(refId.trim())}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || "No enquiry found for this Reference ID.");
      } else {
        setResult(json.data);
      }
    } catch {
      setError("Connection error. Please try again or message us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status: string) => {
    if (status === "closed") return 4;
    const idx = statusSteps.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#A06733]">
          <Search className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xl font-display font-normal text-[#1F2421]">Track Your Project Status</h4>
          <p className="text-xs text-[#5B6358] font-sans">Enter your Studio Reference ID to see live progress.</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          value={refId}
          onChange={(e) => {
            setRefId(e.target.value.toUpperCase());
            setError(null);
          }}
          placeholder="e.g. TNS-2026-XDFWL"
          className="flex-1 px-4 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs font-mono font-bold tracking-wider text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] uppercase"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] text-xs font-archia font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Check Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-sans space-y-1.5">
          <p>{error}</p>
          <a
            href="https://wa.me/917457912227"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[#A06733] hover:underline"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask Studio on WhatsApp (+91 74579 12227)</span>
          </a>
        </div>
      )}

      {result && (
        <div className="p-5 rounded-2xl bg-[#FEFAE0] border border-[#CCD5AE] space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#CCD5AE]/60 pb-2.5">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#5B6358] block font-bold">Client Brief</span>
              <span className="text-xs font-bold text-[#1F2421]">{result.client_name} — {result.project_title}</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#A06733] bg-[#FAEDCD] px-2.5 py-0.5 rounded border border-[#CCD5AE]">
              {result.reference_id}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1 pt-1">
            {statusSteps.map((s, idx) => {
              const currentIdx = getStepIndex(result.status);
              const isPassed = idx <= currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={s.key} className="text-center space-y-1">
                  <div
                    className={`h-1.5 rounded-full ${
                      isCurrent ? "bg-[#D4A373] ring-2 ring-[#D4A373]/40" : isPassed ? "bg-[#25D366]" : "bg-[#CCD5AE]/60"
                    }`}
                  />
                  <span
                    className={`text-[9px] font-mono block truncate ${
                      isCurrent ? "text-[#A06733] font-bold" : isPassed ? "text-[#1F2421] font-semibold" : "text-[#8A9486]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#5B6358] pt-1">
            <span>Submitted: {formatDate(result.created_at)}</span>
            <span className="font-mono uppercase font-bold text-[#A06733] bg-[#E9EDC9] px-2 py-0.5 rounded">
              Status: {result.status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
