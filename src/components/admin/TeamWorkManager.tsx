"use client";

import { useState } from "react";
import {
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  ExternalLink,
  MessageSquare,
  Briefcase,
  UserCheck,
  Calendar,
  X,
  Sparkles,
} from "lucide-react";
import { Employee, EmployeeTask, TaskPriority, TaskStatus, Enquiry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface TeamWorkManagerProps {
  employees: Employee[];
  tasks: EmployeeTask[];
  enquiries?: Enquiry[];
  onUpdate: () => void;
}

const priorityColors: Record<TaskPriority, { bg: string; text: string; border: string }> = {
  urgent: { bg: "bg-red-500/15", text: "text-red-700", border: "border-red-500/40" },
  high: { bg: "bg-amber-500/15", text: "text-amber-800", border: "border-amber-500/40" },
  medium: { bg: "bg-[#D4A373]/20", text: "text-[#A06733]", border: "border-[#D4A373]/40" },
  low: { bg: "bg-[#CCD5AE]/40", text: "text-[#5B6358]", border: "border-[#CCD5AE]" },
};

const statusColors: Record<TaskStatus, { bg: string; text: string; border: string }> = {
  pending: { bg: "bg-stone-500/15", text: "text-stone-700", border: "border-stone-500/40" },
  in_progress: { bg: "bg-sky-500/15", text: "text-sky-800", border: "border-sky-500/40" },
  in_review: { bg: "bg-purple-500/15", text: "text-purple-800", border: "border-purple-500/40" },
  completed: { bg: "bg-emerald-600/15", text: "text-emerald-800", border: "border-emerald-600/40" },
};

export default function TeamWorkManager({
  employees = [],
  tasks = [],
  enquiries = [],
  onUpdate,
}: TeamWorkManagerProps) {
  const [viewMode, setViewMode] = useState<"employees" | "tasks">("employees");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<EmployeeTask | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Task Form State
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskEmpId, setTaskEmpId] = useState("");
  const [taskProject, setTaskProject] = useState("");
  const [taskEnquiryRef, setTaskEnquiryRef] = useState("");
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("medium");
  const [taskStatus, setTaskStatus] = useState<TaskStatus>("in_progress");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskNotes, setTaskNotes] = useState("");

  // Employee Form State
  const [empName, setEmpName] = useState("");
  const [empRole, setEmpRole] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [empStatus, setEmpStatus] = useState<"active" | "busy" | "away" | "offline">("active");

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filtered Tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesEmp = selectedEmployeeId === "all" || t.employee_id === selectedEmployeeId;
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.employee_name.toLowerCase().includes(q) ||
      t.client_or_project.toLowerCase().includes(q) ||
      (t.related_enquiry_ref && t.related_enquiry_ref.toLowerCase().includes(q)) ||
      (t.notes && t.notes.toLowerCase().includes(q));

    return matchesEmp && matchesStatus && matchesQuery;
  });

  // Open Task Modal for New / Edit
  const openTaskModal = (task?: EmployeeTask, defaultEmpId?: string) => {
    setErrorMsg(null);
    if (task) {
      setEditingTask(task);
      setTaskTitle(task.title);
      setTaskDesc(task.description);
      setTaskEmpId(task.employee_id);
      setTaskProject(task.client_or_project);
      setTaskEnquiryRef(task.related_enquiry_ref || "");
      setTaskPriority(task.priority);
      setTaskStatus(task.status);
      setTaskDueDate(task.due_date || "");
      setTaskNotes(task.notes || "");
    } else {
      setEditingTask(null);
      setTaskTitle("");
      setTaskDesc("");
      setTaskEmpId(defaultEmpId || (employees[0]?.id || ""));
      setTaskProject("");
      setTaskEnquiryRef("");
      setTaskPriority("medium");
      setTaskStatus("in_progress");
      setTaskDueDate("");
      setTaskNotes("");
    }
    setIsTaskModalOpen(true);
  };

  // Open Employee Modal for New / Edit
  const openEmployeeModal = (emp?: Employee) => {
    setErrorMsg(null);
    if (emp) {
      setEditingEmployee(emp);
      setEmpName(emp.name);
      setEmpRole(emp.role);
      setEmpEmail(emp.email);
      setEmpPhone(emp.phone);
      setEmpStatus(emp.status);
    } else {
      setEditingEmployee(null);
      setEmpName("");
      setEmpRole("");
      setEmpEmail("");
      setEmpPhone("");
      setEmpStatus("active");
    }
    setIsEmployeeModalOpen(true);
  };

  // Save Task Handler
  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskEmpId) {
      setErrorMsg("Please enter a task title and assign it to an employee.");
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    const emp = employees.find((x) => x.id === taskEmpId);

    const payload = {
      id: editingTask?.id,
      title: taskTitle.trim(),
      description: taskDesc.trim(),
      employee_id: taskEmpId,
      employee_name: emp ? emp.name : "Team Member",
      client_or_project: taskProject.trim() || "TECHNOVA Project",
      related_enquiry_ref: taskEnquiryRef.trim(),
      priority: taskPriority,
      status: taskStatus,
      due_date: taskDueDate,
      notes: taskNotes.trim(),
    };

    try {
      const res = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsTaskModalOpen(false);
        onUpdate();
      } else {
        const json = await res.json();
        setErrorMsg(json.error || "Failed to save task.");
      }
    } catch {
      setErrorMsg("Network error saving task.");
    } finally {
      setSaving(false);
    }
  };

  // Quick Task Status Change
  const handleQuickStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await fetch(`/api/admin/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      onUpdate();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // Delete Task Handler
  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await fetch(`/api/admin/tasks/${taskId}`, { method: "DELETE" });
      onUpdate();
    } catch {
      alert("Failed to delete task.");
    }
  };

  // Save Employee Handler
  const handleSaveEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName.trim() || !empRole.trim()) {
      setErrorMsg("Name and Role are required.");
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    const payload = {
      id: editingEmployee?.id,
      name: empName.trim(),
      role: empRole.trim(),
      email: empEmail.trim(),
      phone: empPhone.trim(),
      status: empStatus,
    };

    try {
      const res = await fetch("/api/admin/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsEmployeeModalOpen(false);
        onUpdate();
      } else {
        const json = await res.json();
        setErrorMsg(json.error || "Failed to save employee.");
      }
    } catch {
      setErrorMsg("Network error saving employee.");
    } finally {
      setSaving(false);
    }
  };

  // Delete Employee Handler
  const handleDeleteEmployee = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove team member "${name}"?`)) return;
    try {
      await fetch(`/api/admin/employees/${id}`, { method: "DELETE" });
      onUpdate();
    } catch {
      alert("Failed to delete employee.");
    }
  };

  // Stats
  const activeWorkingCount = employees.filter((e) => e.status === "active" || e.status === "busy").length;
  const inProgressTasksCount = tasks.filter((t) => t.status === "in_progress").length;
  const inReviewTasksCount = tasks.filter((t) => t.status === "in_review").length;
  const completedTasksCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner & Quick Actions */}
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A06733] font-bold">
              // TEAM & WORKFORCE ALLOCATION
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#E9EDC9] border border-[#CCD5AE] text-[10px] font-mono font-bold text-[#1F2421]">
              Live Activity Tracker
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#1F2421]">
            Kaun Sa Employee Kya Kaam Kar Raha Hai
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6358] max-w-2xl font-sans">
            Track real-time employee workload, active assignments, client enquiry allocations, and task deliverables.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => openTaskModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] text-xs font-archia font-semibold tracking-wide transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Naya Kaam Assign Karein</span>
          </button>

          <button
            type="button"
            onClick={() => openEmployeeModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FEFAE0] hover:bg-[#E9EDC9] text-[#1F2421] border border-[#CCD5AE] hover:border-[#D4A373] text-xs font-archia font-semibold tracking-wide transition-all shadow-xs"
          >
            <UserCheck className="w-4 h-4 text-[#A06733]" />
            <span>+ Naya Employee Add Karein</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-5 sm:p-6 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6358] font-bold block">
            Team Members
          </span>
          <span className="text-3xl font-display font-normal text-[#1F2421]">{employees.length}</span>
          <span className="text-[11px] text-[#A06733] block font-mono font-semibold pt-1">
            {activeWorkingCount} Active / Busy
          </span>
        </div>

        <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#D4A373] rounded-3xl p-5 sm:p-6 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A06733] font-bold block">
            In Progress (Chalu Kaam)
          </span>
          <span className="text-3xl font-display font-normal text-[#A06733]">{inProgressTasksCount}</span>
          <span className="text-[11px] text-[#5B6358] block pt-1 font-sans">Actively being engineered</span>
        </div>

        <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-5 sm:p-6 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
            In Review / QA
          </span>
          <span className="text-3xl font-display font-normal text-[#1F2421]">{inReviewTasksCount}</span>
          <span className="text-[11px] text-[#5B6358] block pt-1 font-sans">Testing & client approval</span>
        </div>

        <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-5 sm:p-6 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6358] font-bold block">
            Completed Tasks
          </span>
          <span className="text-3xl font-display font-normal text-emerald-800">{completedTasksCount}</span>
          <span className="text-[11px] text-[#5B6358] block pt-1 font-sans">Delivered successfully</span>
        </div>
      </div>

      {/* View Switcher & Search Bar */}
      <div className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] rounded-3xl p-5 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Switch View Buttons */}
          <div className="flex items-center gap-2 bg-[#E9EDC9] p-1.5 rounded-2xl border border-[#CCD5AE] w-fit">
            <button
              type="button"
              onClick={() => setViewMode("employees")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-archia font-semibold transition-all ${
                viewMode === "employees"
                  ? "bg-[#041214] text-[#FEFAE0] shadow-xs"
                  : "text-[#5B6358] hover:text-[#1F2421]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Employees Overview ({employees.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("tasks")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-archia font-semibold transition-all ${
                viewMode === "tasks"
                  ? "bg-[#041214] text-[#FEFAE0] shadow-xs"
                  : "text-[#5B6358] hover:text-[#1F2421]"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>All Work Items & Tasks ({tasks.length})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#A06733] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employee, task title, project, or enquiry ref..."
              className="w-full pl-10 pr-4 py-2 bg-[#FEFAE0] border border-[#CCD5AE] rounded-xl text-xs font-sans text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            />
          </div>
        </div>

        {/* Filters Row (when in Tasks view or to filter tasks by employee) */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#CCD5AE]/60">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5B6358]">
            <Filter className="w-3.5 h-3.5 text-[#A06733]" />
            <span>Filter by Employee:</span>
          </div>
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className="px-3 py-1.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-lg text-xs font-sans text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          >
            <option value="all">All Team Members ({employees.length})</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.role})
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5B6358] ml-2">
            <span>Status:</span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 bg-[#FEFAE0] border border-[#CCD5AE] rounded-lg text-xs font-sans text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          >
            <option value="all">All Statuses</option>
            <option value="in_progress">In Progress</option>
            <option value="in_review">In Review</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* VIEW 1: EMPLOYEES DIRECTORY WITH ACTIVE TASKS */}
      {viewMode === "employees" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((emp) => {
            const empTasks = tasks.filter((t) => t.employee_id === emp.id);
            const activeTask = empTasks.find((t) => t.status === "in_progress") || empTasks[0];
            const inProgCount = empTasks.filter((t) => t.status === "in_progress").length;

            return (
              <div
                key={emp.id}
                className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] hover:border-[#D4A373] rounded-3xl p-6 sm:p-7 space-y-6 shadow-xs transition-all duration-300"
              >
                {/* Employee Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#CCD5AE]/70">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#041214] text-[#FEFAE0] flex items-center justify-center font-display text-lg font-bold shadow-xs">
                      {emp.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-display font-normal text-[#1F2421]">{emp.name}</h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            emp.status === "active"
                              ? "bg-emerald-600/15 text-emerald-800 border border-emerald-600/40"
                              : emp.status === "busy"
                              ? "bg-amber-500/15 text-amber-800 border border-amber-500/40"
                              : "bg-stone-500/15 text-stone-700 border border-stone-500/40"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#A06733] font-semibold">{emp.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEmployeeModal(emp)}
                      className="p-2 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421] hover:border-[#D4A373] transition-colors"
                      title="Edit Employee Profile"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                      className="p-2 rounded-xl bg-[#FEFAE0] border border-[#CCD5AE] text-[#5B6358] hover:text-red-700 hover:border-red-400 transition-colors"
                      title="Remove Employee"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Contact & Meta */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono text-[#5B6358]">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-[#8A9486] block">Direct Phone</span>
                    {emp.phone ? (
                      <a
                        href={`https://wa.me/${emp.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1F2421] hover:text-[#A06733] flex items-center gap-1 font-semibold"
                      >
                        <MessageSquare className="w-3 h-3 text-[#D4A373]" />
                        <span>{emp.phone}</span>
                      </a>
                    ) : (
                      <span>Not provided</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-[#8A9486] block">Workload</span>
                    <span className="text-[#1F2421] font-semibold">
                      {empTasks.length} Total ({inProgCount} In Progress)
                    </span>
                  </div>
                </div>

                {/* CURRENT ACTIVE WORK BLOCK */}
                <div className="bg-[#E9EDC9]/60 border border-[#CCD5AE] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A06733] font-bold flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      <span>Currently Working On (Abhi Ka Kaam):</span>
                    </span>
                    {activeTask && (
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          statusColors[activeTask.status]?.bg
                        } ${statusColors[activeTask.status]?.text}`}
                      >
                        {activeTask.status.replace("_", " ")}
                      </span>
                    )}
                  </div>

                  {activeTask ? (
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-semibold text-[#1F2421] line-clamp-1">{activeTask.title}</h4>
                      <p className="text-xs text-[#5B6358] line-clamp-2 font-sans">
                        {activeTask.description || activeTask.notes || "No extra description provided."}
                      </p>
                      <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-[#A06733]">
                        <span className="font-bold">{activeTask.client_or_project}</span>
                        {activeTask.related_enquiry_ref && (
                          <span className="px-1.5 py-0.5 rounded bg-[#FEFAE0] border border-[#CCD5AE] text-[10px] font-bold">
                            [{activeTask.related_enquiry_ref}]
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[#8A9486] italic py-1">
                      No active task in progress. Click below to assign new work.
                    </p>
                  )}
                </div>

                {/* Action Buttons for this Employee */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEmployeeId(emp.id);
                      setViewMode("tasks");
                    }}
                    className="text-xs font-mono font-bold text-[#1F2421] hover:text-[#A06733] flex items-center gap-1.5 transition-colors"
                  >
                    <span>View All {empTasks.length} Tasks</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openTaskModal(undefined, emp.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] text-xs font-archia font-semibold tracking-wide transition-all shadow-xs"
                  >
                    + Assign Kaam
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: ALL TASKS LIST / BOARD */}
      {viewMode === "tasks" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-normal text-[#1F2421]">
              Showing {filteredTasks.length} Work Items
            </h3>
            <button
              type="button"
              onClick={() => openTaskModal()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] text-xs font-archia font-semibold transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Naya Kaam Assign Karein</span>
            </button>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="space-y-3.5">
              {filteredTasks.map((task) => {
                const priorityMeta = priorityColors[task.priority] || priorityColors.medium;
                const statusMeta = statusColors[task.status] || statusColors.in_progress;

                return (
                  <div
                    key={task.id}
                    className="bg-[#FAEDCD]/80 backdrop-blur-sm border border-[#CCD5AE] hover:border-[#D4A373] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${priorityMeta.bg} ${priorityMeta.text} ${priorityMeta.border}`}
                          >
                            Priority: {task.priority}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#A06733]">
                            {task.client_or_project}
                          </span>
                          {task.related_enquiry_ref && (
                            <span className="px-2 py-0.5 rounded bg-[#E9EDC9] border border-[#CCD5AE] text-[10px] font-mono font-bold text-[#1F2421]">
                              REF: {task.related_enquiry_ref}
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg sm:text-xl font-display font-normal text-[#1F2421]">
                          {task.title}
                        </h4>

                        {task.description && (
                          <p className="text-xs sm:text-sm text-[#5B6358] leading-relaxed font-sans">
                            {task.description}
                          </p>
                        )}
                      </div>

                      {/* Right Side: Quick Status Dropdown & Employee Badge */}
                      <div className="flex sm:flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-[#5B6358] hidden sm:inline">Status:</span>
                          <select
                            value={task.status}
                            onChange={(e) => handleQuickStatusChange(task.id, e.target.value as TaskStatus)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="in_review">In Review</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>

                        {task.due_date && (
                          <span className="text-[11px] font-mono text-[#8A9486] flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#D4A373]" />
                            <span>Due: {task.due_date}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Metadata & Notes */}
                    <div className="pt-3 border-t border-[#CCD5AE]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[#8A9486] font-mono">Assigned To:</span>
                          <span className="px-2.5 py-1 rounded-lg bg-[#E9EDC9] border border-[#CCD5AE] font-mono font-bold text-[#1F2421] flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-[#A06733]" />
                            <span>{task.employee_name}</span>
                          </span>
                        </div>

                        {task.notes && (
                          <span className="text-[#5B6358] italic truncate max-w-sm hidden md:inline">
                            Note: {task.notes}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => openTaskModal(task)}
                          className="px-3 py-1.5 rounded-lg bg-[#FEFAE0] border border-[#CCD5AE] text-[#1F2421] hover:border-[#D4A373] text-xs font-mono font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Edit2 className="w-3 h-3 text-[#A06733]" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1.5 rounded-lg bg-[#FEFAE0] border border-[#CCD5AE] text-[#5B6358] hover:text-red-700 hover:border-red-400 transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#FAEDCD]/60 border border-[#CCD5AE] rounded-3xl space-y-3">
              <Briefcase className="w-8 h-8 text-[#A06733] mx-auto opacity-60" />
              <h4 className="text-base font-display font-normal text-[#1F2421]">No tasks match the filter</h4>
              <p className="text-xs text-[#5B6358] font-sans">
                Try selecting a different status, employee, or clear your search term.
              </p>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: ASSIGN / EDIT TASK */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FEFAE0] border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#CCD5AE]">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A06733] font-bold">
                  {editingTask ? "// EDIT TASK ASSIGNMENT" : "// ASSIGN NEW WORK"}
                </span>
                <h3 className="text-2xl font-display font-normal text-[#1F2421]">
                  {editingTask ? "Update Work Item" : "Naya Kaam Assign Karein"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTaskModalOpen(false)}
                className="p-2 rounded-xl bg-[#FAEDCD] border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-800 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveTask} className="space-y-4">
              {/* Employee Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                  Assign To Employee (Kaun Kaam Karega) *
                </label>
                <select
                  value={taskEmpId}
                  onChange={(e) => setTaskEmpId(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-semibold text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                >
                  <option value="">-- Select Team Member --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} — {emp.role} ({emp.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Task Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                  Task Title (Kya Kaam Karna Hai) *
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Build product catalog, connect WhatsApp API, setup Supabase auth"
                  required
                  className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-sans text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              {/* Project / Client Name & Related Enquiry Ref */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                    Project / Client Name
                  </label>
                  <input
                    type="text"
                    value={taskProject}
                    onChange={(e) => setTaskProject(e.target.value)}
                    placeholder="e.g. Verma Enterprises, Apex Commerce"
                    className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-sans text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                    Enquiry Ref (Optional)
                  </label>
                  <select
                    value={taskEnquiryRef}
                    onChange={(e) => {
                      setTaskEnquiryRef(e.target.value);
                      if (!taskProject && e.target.value) {
                        const enq = enquiries.find((x) => x.reference_id === e.target.value);
                        if (enq) setTaskProject(enq.business_name || enq.client_name);
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-mono text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  >
                    <option value="">-- No linked enquiry --</option>
                    {enquiries.map((enq) => (
                      <option key={enq.id} value={enq.reference_id}>
                        {enq.reference_id} - {enq.client_name} ({enq.project_title.slice(0, 25)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Priority & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as TaskPriority)}
                    className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-semibold text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                    Initial Status
                  </label>
                  <select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
                    className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-semibold text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  >
                    <option value="in_progress">In Progress (Chalu Hai)</option>
                    <option value="in_review">In Review (Checking / QA)</option>
                    <option value="pending">Pending (Baad me start hoga)</option>
                    <option value="completed">Completed (Khatam)</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                  Due Date (Target Completion)
                </label>
                <input
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-mono text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                  Task Scope / Deliverables
                </label>
                <textarea
                  rows={2}
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  placeholder="Detail out what needs to be engineered..."
                  className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-sans text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                  Internal Notes / Instructions
                </label>
                <textarea
                  rows={2}
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  placeholder="e.g. Discuss with client on WhatsApp before finalizing payment gateway credentials"
                  className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-sans text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              <div className="pt-4 border-t border-[#CCD5AE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421] text-xs font-archia font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] text-xs font-archia font-semibold tracking-wide transition-all shadow-xs disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingTask ? "Update Task" : "Assign Kaam"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT EMPLOYEE */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FEFAE0] border border-[#CCD5AE] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#CCD5AE]">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A06733] font-bold">
                  {editingEmployee ? "// EDIT TEAM MEMBER" : "// NEW TEAM MEMBER"}
                </span>
                <h3 className="text-2xl font-display font-normal text-[#1F2421]">
                  {editingEmployee ? "Update Employee Profile" : "Naya Employee Add Karein"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEmployeeModalOpen(false)}
                className="p-2 rounded-xl bg-[#FAEDCD] border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-800 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveEmployee} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                  Employee Full Name *
                </label>
                <input
                  type="text"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  placeholder="e.g. Akash Rai, Rahul Sharma"
                  required
                  className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-sans text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                  Role / Designation *
                </label>
                <input
                  type="text"
                  value={empRole}
                  onChange={(e) => setEmpRole(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer, UI/UX Designer"
                  required
                  className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-sans text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={empPhone}
                    onChange={(e) => setEmpPhone(e.target.value)}
                    placeholder="+91 92141 33787"
                    className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-mono text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={empEmail}
                    onChange={(e) => setEmpEmail(e.target.value)}
                    placeholder="team@technovastudio.in"
                    className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-sans text-[#1F2421] placeholder-[#8A9486] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#1F2421] font-bold block">
                  Availability Status
                </label>
                <select
                  value={empStatus}
                  onChange={(e) => setEmpStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-[#FAEDCD] border border-[#CCD5AE] rounded-xl text-xs font-semibold text-[#1F2421] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                >
                  <option value="active">Active (Available for work)</option>
                  <option value="busy">Busy (Full workload)</option>
                  <option value="away">Away / On Leave</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#CCD5AE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEmployeeModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#CCD5AE] text-[#5B6358] hover:text-[#1F2421] text-xs font-archia font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#041214] hover:bg-[#D4A373] hover:text-[#1F2421] text-[#FEFAE0] text-xs font-archia font-semibold tracking-wide transition-all shadow-xs disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingEmployee ? "Update Employee" : "Add Team Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
