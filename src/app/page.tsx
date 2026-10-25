import { getServices, getProjects } from "@/lib/store";
import EditorialHero from "@/components/editorial/EditorialHero";
import EditorialMarquee from "@/components/editorial/EditorialMarquee";
import EditorialServices from "@/components/editorial/EditorialServices";
import EditorialProjects from "@/components/editorial/EditorialProjects";
import EditorialAbout from "@/components/editorial/EditorialAbout";
import EditorialProcess from "@/components/editorial/EditorialProcess";
import EditorialCTA from "@/components/editorial/EditorialCTA";
import ScopeEstimator from "@/components/ScopeEstimator";

export const revalidate = 60;

export default async function HomePage() {
  const [services, projects] = await Promise.all([
    getServices(false),
    getProjects(false),
  ]);

  return (
    <div className="space-y-0">
      {/* 1. EDITORIAL HERO WITH SCULPTURAL 3D PIECE */}
      <EditorialHero />

      {/* 1.1 RUNNING EDITORIAL TICKER MARQUEE */}
      <EditorialMarquee />

      {/* 2. INTERACTIVE SCOPE ESTIMATOR (HUMAN DESIGN ARTIFACT) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScopeEstimator />
      </section>

      {/* 3. ASYMMETRICAL EDITORIAL SERVICES SECTION */}
      <EditorialServices services={services} />

      {/* 4. AUTHENTIC ARCHITECTURAL DEMO PROJECTS SHOWCASE */}
      <EditorialProjects projects={projects} />

      {/* 5. STUDIO VALUES & APPROACH */}
      <EditorialAbout />

      {/* 6. TRANSPARENT 6-PHASE METHODOLOGY */}
      <EditorialProcess />

      {/* 7. REFINED FINAL CALL TO ACTION */}
      <EditorialCTA />
    </div>
  );
}
