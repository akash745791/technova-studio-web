"use client";

import { useState } from "react";
import {
  Search,
  X,
  Loader2,
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface TrackEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef?: string;
}

const statusSteps = [
  { key: "new", label: "Received", desc: "Project brief received & queued for architectural review" },
  { key: "reviewing", label: "Reviewing", desc: "Engineering team analyzing specifications & feasibility" },
  { key: "contacted", label: "Contacted", desc: "Studio initiated discussion via your preferred channel" },
  { key: "in_progress", label: "In Development", desc: "Milestones confirmed & active development in progress" },
  { key: "completed", label: "Completed", desc: "Project successfully engineered, verified & deployed" },
];

export default function TrackEnquiryModal({ isOpen, onClose, initialRef = "" }: TrackEnquiryModalProps) {
  const [refId, setRefId] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
        setError(json.error || "Reference ID not found.");
      } else {
        setResult(json.data);
      }
    } catch {
      setError("Network connection error. Please try again or message us on WhatsApp.");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FEFAE0] border border-[#CCD5AE] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#1F2421]">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#CCD5AE]/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FAEDCD] border border-[#CCD5AE] flex items-center justify-center text-[#A06733]">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-display font-normal text-[#1F2421]">Track Project Enquiry</h3>
              <p className="text-[11px] font-mono text-[#5B6358]">Real-time status lookup using your Studio Reference ID</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#FAEDCD] border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="mt-5 space-y-3">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6358] font-bold">
            Enter Reference ID
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={refId}
                onChange={(e) => {
                  setRefId(e.target.value.toUpperCase());
                  setError(null);
                }}
                placeholder="e.g. TNS-2026-XDFWL"
                className="w-full px-4 py-3 bg-[#FAEDCD]/60 border border-[#CCD5AE] rounded-xl text-xs font-mono font-bold tracking-wider text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] text-xs font-archia font-semibold tracking-wide flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Track Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Notice */}
        {error && (
          <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-sans space-y-2">
            <p>{error}</p>
            <a
              href={`https://wa.me/919214133787?text=Hello%20TECHNOVA%20STUDIO%2C%20I%20am%20trying%20to%20track%20my%20enquiry%20reference%20ID%3A%20${encodeURIComponent(
                refId
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[#A06733] hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Verify ID with Studio on WhatsApp (+91 92141 33787)</span>
            </a>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="mt-6 space-y-5 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-[#FAEDCD]/80 border border-[#CCD5AE] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#CCD5AE]/60 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#5B6358] block font-bold">Client / Project</span>
                  <span className="text-sm font-semibold text-[#1F2421]">{result.client_name} — {result.project_title}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#5B6358] block">Reference ID</span>
                  <span className="font-mono text-xs font-bold text-[#A06733] bg-[#FEFAE0] px-2.5 py-0.5 rounded border border-[#CCD5AE]">
                    {result.reference_id}
                  </span>
                </div>
              </div>

              {/* Status Stepper */}
              <div className="pt-2 space-y-3">
                <span className="text-[10px] font-mono uppercase text-[#5B6358] font-bold block">
                  Project Workflow Progress
                </span>

                <div className="grid grid-cols-5 gap-1.5">
                  {statusSteps.map((s, idx) => {
                    const currentIdx = getStepIndex(result.status);
                    const isPassed = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={s.key} className="text-center space-y-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isCurrent
                              ? "bg-[#D4A373] ring-2 ring-[#D4A373]/40"
                              : isPassed
                              ? "bg-[#25D366]"
                              : "bg-[#CCD5AE]/60"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-mono block truncate ${
                            isCurrent
                              ? "text-[#A06733] font-bold"
                              : isPassed
                              ? "text-[#1F2421] font-medium"
                              : "text-[#8A9486]"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] flex items-start gap-2.5 mt-2">
                  <Clock className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold text-[#1F2421] block">
                      Current Status: {result.status.toUpperCase()}
                    </span>
                    <span className="text-[#5B6358] text-[11px] block mt-0.5">
                      Submitted on {formatDate(result.created_at)} • Preferred channel: {result.preferred_contact_method}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={`https://wa.me/919214133787?text=Hello%20TECHNOVA%20STUDIO%2C%20I%20am%20checking%20my%20enquiry%20%5B${result.reference_id}%5D%20regarding%20${encodeURIComponent(
                  result.project_title
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-xs font-archia tracking-wide hover:brightness-105 transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+919214133787"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAEDCD] border border-[#CCD5AE] text-[#1F2421] font-semibold text-xs font-archia tracking-wide hover:bg-[#E9EDC9] transition-all"
              >
                <Phone className="w-4 h-4 text-[#D4A373]" />
                <span>Call Studio</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
