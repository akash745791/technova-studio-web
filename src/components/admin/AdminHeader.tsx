"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, LogOut, ExternalLink, RefreshCw } from "lucide-react";
import Logo from "../Logo";

interface AdminHeaderProps {
  onRefresh?: () => void;
  refreshing?: boolean;
  isLive?: boolean;
  lastSyncedText?: string;
}

export default function AdminHeader({ onRefresh, refreshing, isLive = true, lastSyncedText }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Logout error:", err);
      window.location.href = "/admin/login";
    }
  };

  return (
    <header className="bg-[#FAEDCD]/90 backdrop-blur-md border-b border-[#CCD5AE] px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      <div className="flex items-center gap-4">
        <Logo size="sm" />
        <span className="hidden sm:inline-block h-4 w-px bg-[#CCD5AE]" />
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1F2421]">
            Admin Console
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isLive && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9EDC9] border border-[#CCD5AE] text-[11px] font-mono text-[#1F2421]">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-bold">LIVE SYNC</span>
            {lastSyncedText && <span className="text-[#5B6358] text-[10px] ml-1">({lastSyncedText})</span>}
          </div>
        )}

        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="p-2 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421] hover:bg-[#E9EDC9] transition-colors"
            title="Refresh Data (Live auto-syncs every 6s)"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#A06733]" : ""}`} />
          </button>
        )}

        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-xs font-archia font-medium tracking-wide text-[#5B6358] hover:text-[#1F2421] transition-colors"
        >
          <span>Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-archia font-medium tracking-wide text-red-700 hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
