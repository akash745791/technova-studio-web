import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getEnquiries, getServices, getProjects, getSiteSettings, getEmployees, getEmployeeTasks } from "@/lib/store";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | TECHNOVA STUDIO",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const isAuth = await isAuthenticatedAdmin();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const [enquiries, services, projects, settings, employees, tasks] = await Promise.all([
    getEnquiries(),
    getServices(true),
    getProjects(true),
    getSiteSettings(),
    getEmployees(),
    getEmployeeTasks(),
  ]);

  return (
    <AdminDashboardClient
      initialEnquiries={enquiries}
      initialServices={services}
      initialProjects={projects}
      initialSettings={settings}
      initialEmployees={employees}
      initialTasks={tasks}
    />
  );
}
