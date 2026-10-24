"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, User, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAutoFill = () => {
    setEmail("technovastudio9");
    setPassword("TechnovaStudio009");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Please verify credentials.");
        return;
      }

      // Hard navigation ensures session cookie is immediately sent to /admin server component
      window.location.href = "/admin";
    } catch {
      setError("Network error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 studio-canvas">
      <div className="max-w-md w-full space-y-8 bg-[#FAEDCD]/80 backdrop-blur-md border border-[#CCD5AE] rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9EDC9] border border-[#CCD5AE] text-xs font-mono text-[#A06733] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>STUDIO ADMIN CONSOLE</span>
          </div>

          <h2 className="text-3xl font-display font-normal text-[#1F2421] pt-2">
            Administrator Login
          </h2>

          <p className="text-xs text-[#5B6358] font-sans">
            Restricted access for TECHNOVA STUDIO operations, content management, and enquiry administration.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
              Admin Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8A9486] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="technovastudio9"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#5B6358] mb-1.5 font-bold">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8A9486] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-[#1F2421] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl font-semibold text-[#041214] bg-[#D4A373] hover:bg-[#FDBB4F] shadow-sm text-sm font-archia tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Secure Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#CCD5AE] text-center space-y-2">
          <p className="text-[11px] text-[#5B6358] font-mono">
            Default credentials: <span className="font-semibold text-[#1F2421]">technovastudio9</span> / <span className="font-semibold text-[#1F2421]">TechnovaStudio009</span>
          </p>
          <button
            type="button"
            onClick={handleAutoFill}
            className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-[#E9EDC9] hover:bg-[#D4A373] hover:text-[#1F2421] text-[11px] font-archia font-medium text-[#1F2421] border border-[#CCD5AE] transition-colors"
          >
            Auto-fill credentials
          </button>
        </div>
      </div>
    </div>
  );
}
