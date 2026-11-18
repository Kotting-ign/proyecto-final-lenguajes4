"use client";

import { Briefcase, GraduationCap, Rocket, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { HitoTrayectoria } from "@/data/portfolio";

const TIPO_META: Record<HitoTrayectoria["tipo"], { icono: LucideIcon; etiqueta: string }> = {
  proyecto: { icono: Rocket, etiqueta: "Proyecto" },
  academico: { icono: GraduationCap, etiqueta: "Académico" },
  laboral: { icono: Briefcase, etiqueta: "Laboral" },
};

/** Línea de tiempo vertical de experiencia (proyectos, formación y trabajo). */
export function ExperienceTimeline({ hitos }: { hitos: HitoTrayectoria[] }) {
  return (
    <ol className="relative flex flex-col gap-6 border-l-2 border-border pl-8">
      {hitos.map((hito, i) => {
        const { icono: Icono, etiqueta } = TIPO_META[hito.tipo];
        return (
          <li key={hito.id} className="relative">
            <span
              aria-hidden="true"
              style={{ left: "calc(-2rem - 13px)" }}
              className="absolute top-5 flex h-6 w-6 items-center justify-center rounded-pill bg-brand-900 text-accent-500"
            >
              <Icono className="h-3.5 w-3.5" />
            </span>

            <Reveal delay={i * 0.08}>
              <article className="rounded-md border border-border bg-surface p-5 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <StatusBadge variant="info" label={etiqueta} />
                  <span className="font-mono text-xs font-bold text-text-secondary">{hito.periodo}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-extrabold uppercase tracking-tight text-brand-900">
                  {hito.titulo}
                </h3>
                <p className="text-xs font-bold text-text-secondary">{hito.entidad}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{hito.descripcion}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {hito.tecnologias.map((t) => (
                    <span
                      key={t}
                      className="rounded-pill border border-border bg-cream-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-brand-900"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
