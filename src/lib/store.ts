import fs from "fs";
import path from "path";
import os from "os";
import { Service, Project, Enquiry, SiteSettings } from "./types";
import { initialServices, initialProjects, initialSiteSettings } from "./data";
import { isSupabaseConfigured, supabaseServer } from "./supabase";

const LOCAL_DATA_DIR = path.join(process.cwd(), ".data");
const LOCAL_STORE_FILE = path.join(LOCAL_DATA_DIR, "store.json");
const TMP_STORE_FILE = path.join(os.tmpdir(), "technova_store.json");

interface LocalStoreData {
  services: Service[];
  projects: Project[];
  enquiries: Enquiry[];
  settings: SiteSettings;
}

// Global in-memory cache to ensure serverless hot-reloads retain state without read-only disk errors
let memoryStore: LocalStoreData | null = null;

function ensureDataFile(): LocalStoreData {
  if (memoryStore) return memoryStore;

  const defaultData: LocalStoreData = {
    services: initialServices,
    projects: initialProjects,
    enquiries: [],
    settings: initialSiteSettings,
  };

  // 1. Try reading from /tmp if updated in this serverless runtime
  try {
    if (fs.existsSync(TMP_STORE_FILE)) {
      const content = fs.readFileSync(TMP_STORE_FILE, "utf8");
      memoryStore = JSON.parse(content);
      return memoryStore!;
    }
  } catch (err) {
    console.warn("Could not read from tmp store:", err);
  }

  // 2. Try reading from .data/store.json (local or bundled in repo)
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      const content = fs.readFileSync(LOCAL_STORE_FILE, "utf8");
      memoryStore = JSON.parse(content);
      return memoryStore!;
    }
  } catch (err) {
    console.warn("Could not read local store file:", err);
  }

  memoryStore = defaultData;
  return memoryStore;
}

function writeDataFile(data: LocalStoreData) {
  memoryStore = data;

  // Try writing to local .data/store.json first
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(data, null, 2), "utf8");
    return;
  } catch {
    // Expected on serverless (read-only file system); try /tmp
  }

  // Fallback to /tmp which is always writable on serverless / AWS Lambda / Vercel
  try {
    fs.writeFileSync(TMP_STORE_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write to tmp store file:", err);
  }
}

// ==========================================
// SERVICES REPOSITORY
// ==========================================
export async function getServices(includeUnpublished = false): Promise<Service[]> {
  if (isSupabaseConfigured && supabaseServer) {
    let query = supabaseServer.from("services").select("*").order("display_order", { ascending: true });
    if (!includeUnpublished) {
      query = query.eq("published", true);
    }
    const { data, error } = await query;
    if (!error && data) return data as Service[];
  }

  const store = ensureDataFile();
  return store.services
    .filter((s) => includeUnpublished || s.published)
    .sort((a, b) => a.display_order - b.display_order);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (isSupabaseConfigured && supabaseServer) {
    const { data, error } = await supabaseServer.from("services").select("*").eq("slug", slug).single();
    if (!error && data) return data as Service;
  }

  const store = ensureDataFile();
  return store.services.find((s) => s.slug === slug) || null;
}

export async function saveService(serviceData: Partial<Service> & { id?: string }): Promise<Service> {
  const store = ensureDataFile();
  const existingIdx = store.services.findIndex((s) => s.id === serviceData.id || s.slug === serviceData.slug);

  const fullService: Service = {
    id: serviceData.id || `srv-${Date.now()}`,
    title: serviceData.title || "Untitled Service",
    slug: serviceData.slug || `service-${Date.now()}`,
    short_description: serviceData.short_description || "",
    full_description: serviceData.full_description || "",
    deliverables: serviceData.deliverables || [],
    faqs: serviceData.faqs || [],
    starting_price: serviceData.starting_price || "Request a Quote",
    published: serviceData.published ?? true,
    display_order: serviceData.display_order ?? (store.services.length + 1),
    icon_name: serviceData.icon_name || "Code2",
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabaseServer) {
    await supabaseServer.from("services").upsert([fullService]);
  }

  if (existingIdx >= 0) {
    store.services[existingIdx] = fullService;
  } else {
    store.services.push(fullService);
  }
  writeDataFile(store);

  return fullService;
}

export async function deleteService(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseServer) {
    await supabaseServer.from("services").delete().eq("id", id);
  }
  const store = ensureDataFile();
  store.services = store.services.filter((s) => s.id !== id);
  writeDataFile(store);
  return true;
}

// ==========================================
// PROJECTS REPOSITORY
// ==========================================
export async function getProjects(includeUnpublished = false): Promise<Project[]> {
  if (isSupabaseConfigured && supabaseServer) {
    let query = supabaseServer.from("projects").select("*").order("display_order", { ascending: true });
    if (!includeUnpublished) {
      query = query.eq("published", true);
    }
    const { data, error } = await query;
    if (!error && data) return data as Project[];
  }

  const store = ensureDataFile();
  return store.projects
    .filter((p) => includeUnpublished || p.published)
    .sort((a, b) => a.display_order - b.display_order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured && supabaseServer) {
    const { data, error } = await supabaseServer.from("projects").select("*").eq("slug", slug).single();
    if (!error && data) return data as Project;
  }

  const store = ensureDataFile();
  return store.projects.find((p) => p.slug === slug) || null;
}

export async function saveProject(projectData: Partial<Project> & { id?: string }): Promise<Project> {
  const store = ensureDataFile();
  const existingIdx = store.projects.findIndex((p) => p.id === projectData.id || p.slug === projectData.slug);

  const fullProject: Project = {
    id: projectData.id || `proj-${Date.now()}`,
    title: projectData.title || "Untitled Project",
    slug: projectData.slug || `project-${Date.now()}`,
    summary: projectData.summary || "",
    description: projectData.description || "",
    category: projectData.category || "Website Development",
    technologies: projectData.technologies || [],
    deliverables: projectData.deliverables || [],
    cover_image: projectData.cover_image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    gallery: projectData.gallery || [],
    project_url: projectData.project_url || "",
    featured: projectData.featured ?? false,
    published: projectData.published ?? true,
    display_order: projectData.display_order ?? (store.projects.length + 1),
    client_note: projectData.client_note || "",
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabaseServer) {
    await supabaseServer.from("projects").upsert([fullProject]);
  }

  if (existingIdx >= 0) {
    store.projects[existingIdx] = fullProject;
  } else {
    store.projects.push(fullProject);
  }
  writeDataFile(store);

  return fullProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseServer) {
    await supabaseServer.from("projects").delete().eq("id", id);
  }
  const store = ensureDataFile();
  store.projects = store.projects.filter((p) => p.id !== id);
  writeDataFile(store);
  return true;
}

// ==========================================
// ENQUIRIES REPOSITORY
// ==========================================
export async function getEnquiries(): Promise<Enquiry[]> {
  if (isSupabaseConfigured && supabaseServer) {
    const { data, error } = await supabaseServer.from("enquiries").select("*").order("created_at", { ascending: false });
    if (!error && data) return data as Enquiry[];
  }

  const store = ensureDataFile();
  return store.enquiries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  if (isSupabaseConfigured && supabaseServer) {
    const { data, error } = await supabaseServer.from("enquiries").select("*").eq("id", id).single();
    if (!error && data) return data as Enquiry;
  }

  const store = ensureDataFile();
  return store.enquiries.find((e) => e.id === id || e.reference_id === id) || null;
}

export async function createEnquiry(enquiry: Omit<Enquiry, "id"> & { id?: string }): Promise<Enquiry> {
  const fullEnquiry: Enquiry = {
    ...enquiry,
    id: enquiry.id || `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabaseServer) {
    const { data, error } = await supabaseServer.from("enquiries").insert([fullEnquiry]).select().single();
    if (!error && data) {
      return data as Enquiry;
    }
  }

  const store = ensureDataFile();
  store.enquiries.unshift(fullEnquiry);
  writeDataFile(store);

  return fullEnquiry;
}

export async function updateEnquiry(id: string, updates: Partial<Enquiry>): Promise<Enquiry | null> {
  const store = ensureDataFile();
  const idx = store.enquiries.findIndex((e) => e.id === id);

  if (isSupabaseConfigured && supabaseServer) {
    const { data, error } = await supabaseServer.from("enquiries").update(updates).eq("id", id).select().single();
    if (!error && data) {
      if (idx >= 0) store.enquiries[idx] = data as Enquiry;
      writeDataFile(store);
      return data as Enquiry;
    }
  }

  if (idx < 0) return null;
  const updated = { ...store.enquiries[idx], ...updates, updated_at: new Date().toISOString() };
  store.enquiries[idx] = updated;
  writeDataFile(store);

  return updated;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseServer) {
    await supabaseServer.from("enquiries").delete().eq("id", id);
  }
  const store = ensureDataFile();
  store.enquiries = store.enquiries.filter((e) => e.id !== id);
  writeDataFile(store);
  return true;
}

// ==========================================
// SITE SETTINGS REPOSITORY
// ==========================================
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured && supabaseServer) {
    const { data, error } = await supabaseServer.from("site_settings").select("*").eq("id", "default").single();
    if (!error && data) return data as SiteSettings;
  }

  const store = ensureDataFile();
  return store.settings || initialSiteSettings;
}

export async function updateSiteSettings(settingsUpdate: Partial<SiteSettings>): Promise<SiteSettings> {
  const store = ensureDataFile();
  const updated: SiteSettings = {
    ...store.settings,
    ...settingsUpdate,
    id: "default",
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabaseServer) {
    await supabaseServer.from("site_settings").upsert([updated]);
  }

  store.settings = updated;
  writeDataFile(store);

  return updated;
}
