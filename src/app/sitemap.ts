import { MetadataRoute } from "next";
import { getServices, getProjects } from "@/lib/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://technovastudio.in";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/get-a-quote`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/cookie-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  try {
    const services = await getServices(false);
    const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(s.updated_at || Date.now()),
      changeFrequency: "monthly",
      priority: 0.85,
    }));

    const projects = await getProjects(false);
    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: new Date(p.updated_at || Date.now()),
      changeFrequency: "monthly",
      priority: 0.75,
    }));

    return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
