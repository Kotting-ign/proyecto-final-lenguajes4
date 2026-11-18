"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import type { GrupoHabilidades } from "@/data/portfolio";

function etiquetaNivel(nivel: number): string {
  if (nivel >= 85) return "Avanzado";
  if (nivel >= 70) return "Sólido";
  if (nivel >= 50) return "Intermedio";
  return "En aprendizaje";
}

/** Matriz de habilidades agrupadas por categoría con barras animadas (autoevaluación). */
export function SkillsMatrix({ grupos }: { grupos: GrupoHabilidades[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {grupos.map((grupo, gi) => (
        <Reveal key={grupo.categoria} delay={gi * 0.08}>
          <div className="h-full rounded-md border border-border bg-surface p-5 shadow-card">
            <h3 className="font-display text-base font-extrabold uppercase text-brand-900">
              {grupo.categoria}
            </h3>

            <ul className="mt-4 flex flex-col gap-4">
              {grupo.items.map((item) => (
                <li key={item.nombre}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-text-primary">{item.nombre}</span>
                    <span className="shrink-0 font-mono text-xs font-bold text-text-secondary">
                      {etiquetaNivel(item.nivel)} · {item.nivel}%
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={`Nivel de ${item.nombre}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={item.nivel}
                    className="mt-1.5 h-2 w-full overflow-hidden rounded-pill bg-cream-100"
                  >
                    <motion.div
                      initial={reduceMotion ? { width: `${item.nivel}%` } : { width: 0 }}
                      whileInView={{ width: `${item.nivel}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
                      className="h-full rounded-pill bg-brand-900"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
