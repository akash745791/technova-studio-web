"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Layers,
  Settings,
  ArrowUpRight,
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
  initialEnquiries,
  initialServices,
  initialProjects,
  initialSettings,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "enquiries" | "services" | "projects" | "settings">("overview");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  // Metrics
  const totalEnquiries = initialEnquiries.length;
  const newEnquiries = initialEnquiries.filter((e) => e.status === "new").length;
  const inProgressEnquiries = initialEnquiries.filter((e) => e.status === "in_progress" || e.status === "reviewing").length;
  const publishedServices = initialServices.filter((s) => s.published).length;
  const publishedProjects = initialProjects.filter((p) => p.published).length;

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "enquiries", label: `Enquiries (${newEnquiries > 0 ? `${newEnquiries} new` : totalEnquiries})`, icon: Inbox },
    { id: "services", label: `Services (${initialServices.length})`, icon: Briefcase },
    { id: "projects", label: `Portfolio (${initialProjects.length})`, icon: Layers },
    { id: "settings", label: "Studio Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen studio-canvas text-[#1F2421] flex flex-col font-sans">
      <AdminHeader onRefresh={handleRefresh} refreshing={refreshing} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow space-y-8">
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
                  <h3 className="text-2xl font-display font-normal text-[#1F2421]">Recent Enquiries</h3>
                  <p className="text-xs text-[#5B6358] font-sans">Latest client submissions from the public quote and contact forms.</p>
                </div>
                <button
                  onClick={() => setActiveTab("enquiries")}
                  className="text-xs font-mono font-bold text-[#A06733] hover:underline flex items-center gap-1"
                >
                  <span>View All Enquiries</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {initialEnquiries.length > 0 ? (
                <div className="divide-y divide-[#CCD5AE]/60">
                  {initialEnquiries.slice(0, 5).map((enq) => (
                    <div key={enq.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#1F2421] text-sm">{enq.client_name}</span>
                          <span className="font-mono text-[10px] text-[#A06733] bg-[#E9EDC9] px-2 py-0.5 rounded border border-[#CCD5AE] font-bold">
                            {enq.reference_id}
                          </span>
                        </div>
                        <p className="text-xs text-[#5B6358] truncate max-w-md font-sans">{enq.project_title}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono text-[#5B6358] block">
                          {formatDate(enq.created_at)}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#A06733] font-bold block mt-0.5">
                          {enq.status}
                        </span>
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
          <EnquiriesManager enquiries={initialEnquiries} onUpdate={handleRefresh} />
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === "services" && (
          <ServicesManager services={initialServices} onUpdate={handleRefresh} />
        )}

        {/* TAB 4: PORTFOLIO */}
        {activeTab === "projects" && (
          <ProjectsManager projects={initialProjects} onUpdate={handleRefresh} />
        )}

        {/* TAB 5: SITE SETTINGS */}
        {activeTab === "settings" && (
          <SettingsManager settings={initialSettings} onUpdate={handleRefresh} />
        )}
      </div>
    </div>
  );
}
