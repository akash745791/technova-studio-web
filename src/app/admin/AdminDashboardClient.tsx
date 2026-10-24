"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Layers,
  Settings,
  ArrowUpRight,
  Search,
  Bell,
  X,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import EnquiriesManager from "@/components/admin/EnquiriesManager";
import ServicesManager from "@/components/admin/ServicesManager";
import ProjectsManager from "@/components/admin/ProjectsManager";
import SettingsManager from "@/components/admin/SettingsManager";
import { Enquiry, Service, Project, SiteSettings } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface AdminDashboardClientProps {
  initialEnquiries: Enquiry[];
  initialServices: Service[];
  initialProjects: Project[];
  initialSettings: SiteSettings;
}

export default function AdminDashboardClient({
  initialEnquiries = [],
  initialServices = [],
  initialProjects = [],
  initialSettings,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "enquiries" | "services" | "projects" | "settings">("overview");
  const [refreshing, setRefreshing] = useState(false);

  // Live state for enquiries and target reference
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [targetRef, setTargetRef] = useState<string>("");
  const [overviewSearchRef, setOverviewSearchRef] = useState("");
  const [lastSyncedTime, setLastSyncedTime] = useState<string>("Live");
  const [newAlert, setNewAlert] = useState<Enquiry | null>(null);

  // Live data fetching routine
  const fetchLatestData = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/enquiries?_t=" + Date.now());
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setEnquiries((prev) => {
            // Check for newly arrived enquiries to alert admin
            if (prev.length > 0 && json.data.length > prev.length) {
              const newest = json.data[0];
              if (newest && !prev.some((p) => p.id === newest.id)) {
                setNewAlert(newest);
              }
            }
            return json.data;
          });
          const now = new Date();
          const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
          setLastSyncedTime(timeStr);
        }
      }
    } catch (err) {
      console.warn("Live sync error:", err);
    } finally {
      if (isManual) {
        router.refresh();
        setRefreshing(false);
      }
    }
  }, [router]);

  // Real-time polling every 6 seconds + instant refetch on window focus
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatestData(false);
    }, 6000);

    const handleFocus = () => {
      fetchLatestData(false);
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchLatestData]);

  // Overview Reference ID Search Handler
  const handleOverviewSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!overviewSearchRef.trim()) return;
    setTargetRef(overviewSearchRef.trim());
    setActiveTab("enquiries");
  };

  const handleOpenEnquiryRef = (ref: string) => {
    setTargetRef(ref);
    setActiveTab("enquiries");
  };

  // Metrics (computed from live enquiries)
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;
  const inProgressEnquiries = enquiries.filter((e) => e.status === "in_progress" || e.status === "reviewing").length;
  const publishedServices = services.filter((s) => s.published).length;
  const publishedProjects = projects.filter((p) => p.published).length;

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "enquiries", label: `Enquiries (${newEnquiries > 0 ? `${newEnquiries} new` : totalEnquiries})`, icon: Inbox },
    { id: "services", label: `Services (${services.length})`, icon: Briefcase },
    { id: "projects", label: `Portfolio (${projects.length})`, icon: Layers },
    { id: "settings", label: "Studio Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen studio-canvas text-[#1F2421] flex flex-col font-sans">
      <AdminHeader
        onRefresh={() => fetchLatestData(true)}
        refreshing={refreshing}
        isLive={true}
        lastSyncedText={lastSyncedTime}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow space-y-6">
        {/* Real-time New Enquiry Alert Banner */}
        {newAlert && (
          <div className="p-4 rounded-2xl bg-[#D4A373]/20 border border-[#D4A373] text-[#1F2421] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#041214] text-[#FEFAE0] flex items-center justify-center flex-shrink-0 animate-bounce">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A06733] block">
                  🔔 New Live Submission Logged!
                </span>
                <p className="text-xs text-[#1F2421] font-sans">
                  <strong>{newAlert.client_name}</strong> submitted an enquiry:{" "}
                  <span className="font-mono font-bold text-[#A06733]">[{newAlert.reference_id}]</span> — {newAlert.project_title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  handleOpenEnquiryRef(newAlert.reference_id);
                  setNewAlert(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] text-xs font-archia font-semibold tracking-wide transition-all shadow-xs"
              >
                View Enquiry
              </button>
              <button
                type="button"
                onClick={() => setNewAlert(null)}
                className="p-1.5 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Top Tab Bar */}
        <div className="flex items-center gap-2 border-b border-[#CCD5AE] pb-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-archia tracking-wide transition-all whitespace-nowrap ${
                  active
                    ? "bg-[#041214] text-[#FEFAE0] font-semibold border border-[#041214] shadow-xs"
                    : "text-[#5B6358] hover:text-[#1F2421] hover:bg-[#FAEDCD] border border-transparent font-medium"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Reference ID Search Bar */}
            <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E9EDC9] border border-[#CCD5AE] flex items-center justify-center text-[#A06733]">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-display font-normal text-[#1F2421]">
                    Quick Reference ID Search & Instant Lookup
                  </h4>
                  <p className="text-[11px] text-[#5B6358] font-sans">
                    Paste or type any client Reference ID (e.g. TNS-2026-XDFWL) to immediately inspect details.
                  </p>
                </div>
              </div>

              <form onSubmit={handleOverviewSearch} className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <input
                  type="text"
                  value={overviewSearchRef}
                  onChange={(e) => setOverviewSearchRef(e.target.value.toUpperCase())}
                  placeholder="Enter Reference ID (e.g. TNS-2026-XDFWL)..."
                  className="flex-1 px-4 py-2.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs font-mono font-bold tracking-wider text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373] uppercase"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] text-xs font-archia font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find & Open Enquiry</span>
                </button>
              </form>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 space-y-1 shadow-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6358] font-bold block">Total Enquiries</span>
                <span className="text-3xl font-display font-normal text-[#1F2421]">{totalEnquiries}</span>
                <span className="text-[11px] text-[#5B6358] block pt-1 font-sans">All time received</span>
              </div>

              <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#D4A373] rounded-3xl p-6 space-y-1 shadow-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A06733] font-bold block">New Enquiries</span>
                <span className="text-3xl font-display font-normal text-[#A06733]">{newEnquiries}</span>
                <span className="text-[11px] text-[#5B6358] block pt-1 font-sans">Needs review</span>
              </div>

              <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 space-y-1 shadow-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#1F2421] font-bold block">Active / Reviewing</span>
                <span className="text-3xl font-display font-normal text-[#1F2421]">{inProgressEnquiries}</span>
                <span className="text-[11px] text-[#5B6358] block pt-1 font-sans">Under discussion</span>
              </div>

              <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 space-y-1 shadow-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6358] font-bold block">Live Content</span>
                <span className="text-3xl font-display font-normal text-[#1F2421]">
                  {publishedServices + publishedProjects}
                </span>
                <span className="text-[11px] text-[#5B6358] block pt-1 font-sans">
                  {publishedServices} Services • {publishedProjects} Showcases
                </span>
              </div>
            </div>

            {/* Recent Enquiries Box */}
            <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#CCD5AE]/60 pb-4">
                <div>
                  <h3 className="text-2xl font-display font-normal text-[#1F2421]">Recent Live Enquiries</h3>
                  <p className="text-xs text-[#5B6358] font-sans">Automatically synced every 6 seconds from the public website.</p>
                </div>
                <button
                  onClick={() => setActiveTab("enquiries")}
                  className="text-xs font-mono font-bold text-[#A06733] hover:underline flex items-center gap-1"
                >
                  <span>View All Enquiries</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {enquiries.length > 0 ? (
                <div className="divide-y divide-[#CCD5AE]/60">
                  {enquiries.slice(0, 5).map((enq) => (
                    <div
                      key={enq.id}
                      onClick={() => handleOpenEnquiryRef(enq.reference_id)}
                      className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#E9EDC9]/40 p-2 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#1F2421] text-sm">{enq.client_name}</span>
                          <span className="font-mono text-[10px] text-[#A06733] bg-[#E9EDC9] px-2 py-0.5 rounded border border-[#CCD5AE] font-bold">
                            {enq.reference_id}
                          </span>
                        </div>
                        <p className="text-xs text-[#5B6358] truncate max-w-md font-sans">{enq.project_title}</p>
                      </div>

                      <div className="text-right flex items-center gap-3">
                        <div>
                          <span className="text-xs font-mono text-[#5B6358] block">
                            {formatDate(enq.created_at)}
                          </span>
                          <span className="text-[10px] font-mono uppercase text-[#A06733] font-bold block mt-0.5">
                            {enq.status}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8A9486]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-[#5B6358] font-sans">
                  No enquiries logged yet. Enquiries will appear here immediately when submitted on the website.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <EnquiriesManager
            enquiries={enquiries}
            onUpdate={() => fetchLatestData(true)}
            targetRef={targetRef}
            onClearTargetRef={() => setTargetRef("")}
          />
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === "services" && (
          <ServicesManager services={services} onUpdate={() => fetchLatestData(true)} />
        )}

        {/* TAB 4: PORTFOLIO */}
        {activeTab === "projects" && (
          <ProjectsManager projects={projects} onUpdate={() => fetchLatestData(true)} />
        )}

        {/* TAB 5: SITE SETTINGS */}
        {activeTab === "settings" && (
          <SettingsManager settings={initialSettings} onUpdate={() => fetchLatestData(true)} />
        )}
      </div>
    </div>
  );
}
