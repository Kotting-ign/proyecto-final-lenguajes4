import { Briefcase, FolderGit2, GitBranch, Layers, UserRound } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ExperienceTimeline } from "@/components/team/ExperienceTimeline";
import { GitHubPanel } from "@/components/team/GitHubPanel";
import { MemberAbout } from "@/components/team/MemberAbout";
import { MemberContactCta } from "@/components/team/MemberContactCta";
import { MemberHero } from "@/components/team/MemberHero";
import { MemberPager } from "@/components/team/MemberPager";
import { MemberProjects } from "@/components/team/MemberProjects";
import { SkillsMatrix } from "@/components/team/SkillsMatrix";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INTEGRANTES_INICIALES, obtenerIntegrantePorSlug } from "@/data/integrantes";

// Sólo existen los 4 perfiles definidos en src/data/integrantes.ts
export const dynamicParams = false;

export function generateStaticParams() {
  return INTEGRANTES_INICIALES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const integrante = obtenerIntegrantePorSlug(slug);
  if (!integrante) return { title: "Integrante no encontrado" };

  const titulo = `${integrante.nombre} ${integrante.apellido} — ${integrante.rolPrincipal}`;
  return {
    title: titulo,
    description: `${integrante.tagline} ${integrante.especialidad}.`,
    openGraph: { title: titulo, description: integrante.tagline, type: "profile" },
  };
}

export default async function PerfilIntegrantePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const integrante = obtenerIntegrantePorSlug(slug);
  if (!integrante) notFound();

  const { perfilTecnico } = integrante;

  return (
    <SiteShell>
      <MemberHero integrante={integrante} />

      {/* Sobre mí */}
      <section aria-label="Sobre mí" className="scroll-mt-32 border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <SectionHeading
            as="h2"
            eyebrow="Perfil"
            icon={UserRound}
            title="Sobre mí"
            description={integrante.especialidad}
          />
          <div className="mt-8">
            <MemberAbout integrante={integrante} />
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section aria-label="Habilidades técnicas" className="scroll-mt-32 border-b border-border bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <SectionHeading
            eyebrow="Stack fullstack"
            icon={Layers}
            title="Habilidades técnicas"
            description="Autoevaluación del integrante por área. Los porcentajes son orientativos."
          />
          <div className="mt-8">
            <SkillsMatrix grupos={perfilTecnico.habilidades} />
          </div>
        </div>
      </section>

      {/* Responsabilidades + Experiencia */}
      <section aria-label="Experiencia" className="scroll-mt-32 border-b border-border py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Rol en el equipo" icon={Briefcase} title="Responsabilidades" />
            <ul className="mt-8 flex flex-col gap-4">
              {perfilTecnico.responsabilidades.map((r) => (
                <li key={r.titulo} className="rounded-md border border-border bg-surface p-5 shadow-card">
                  <h3 className="font-display text-base font-extrabold uppercase text-brand-900">
                    {r.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{r.descripcion}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Trayectoria" icon={Briefcase} title="Experiencia" />
            <div className="mt-8">
              <ExperienceTimeline hitos={perfilTecnico.trayectoria} />
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section aria-label="Proyectos" className="scroll-mt-32 border-b border-border bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <SectionHeading
            eyebrow="Portfolio"
            icon={FolderGit2}
            title={`Proyectos de ${integrante.nombre}`}
          />
          <div className="mt-8">
            <MemberProjects integranteId={integrante.id} nombre={integrante.nombre} />
          </div>
        </div>
      </section>

      {/* GitHub (Web API) */}
      <section aria-label="Actividad en GitHub" className="scroll-mt-32 border-b border-border py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Web API" icon={GitBranch} title="Actividad en GitHub" />
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Datos obtenidos en tiempo real desde la API pública de GitHub: repositorios,
              seguidores y últimos proyectos publicados.
            </p>
          </div>
          <div className="lg:col-span-7">
            <GitHubPanel githubUser={integrante.githubUser} nombre={integrante.nombre} />
          </div>
        </div>
      </section>

      {/* CTA + navegación */}
      <section aria-label="Contacto y navegación" className="py-14 sm:py-16">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 sm:px-6">
          <MemberContactCta integrante={integrante} />

          <MemberPager integranteId={integrante.id} />
        </div>
      </section>
    </SiteShell>
  );
}
