"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, Sparkles, UserCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ExperienceTimeline } from "@/components/team/ExperienceTimeline";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { usePortfolio } from "@/context/PortfolioContext";
import { EXPERIENCIA_EQUIPO } from "@/data/integrantes";

const CATEGORIAS_STACK = [
  "Todas",
  "Frontend & UI",
  "Backend & APIs",
  "Base de Datos",
  "DevOps & Testing",
] as const;

/**
 * Home · Presentación profesional: tarjetas de los 4 integrantes (cada una enlaza a su
 * perfil técnico `/equipo/[slug]`), experiencia del equipo y matriz del stack fullstack.
 */
export function TeamSquadSection() {
  const { integrantes, stack } = usePortfolio();
  const reduceMotion = useReducedMotion();
  const [categoriaStack, setCategoriaStack] = useState<string>("Todas");

  const stackFiltrado =
    categoriaStack === "Todas" ? stack : stack.filter((s) => s.categoria === categoriaStack);

  return (
    <>
      {/* EQUIPO */}
      <section id="equipo" className="scroll-mt-32 border-b border-border bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <SectionHeading
            eyebrow="Presentación profesional"
            icon={UserCheck}
            title="Equipo Fullstack — 4 Integrantes"
            description="Conocé el perfil técnico de cada integrante: stack, experiencia, proyectos y actividad en GitHub."
          />

          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {integrantes.map((dev, i) => (
              <li key={dev.id}>
                <Reveal delay={i * 0.07} className="h-full">
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="h-full"
                  >
                    <Link
                      href={`/equipo/${dev.slug}`}
                      className="group flex h-full flex-col justify-between rounded-md border border-border bg-surface p-5 shadow-card transition-colors duration-fast hover:border-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            aria-hidden="true"
                            className="flex h-14 w-14 items-center justify-center rounded-pill bg-brand-900 font-display text-lg font-extrabold text-accent-500 transition-colors group-hover:bg-accent-500 group-hover:text-brand-900"
                          >
                            {dev.avatarIniciales}
                          </span>
                          <StatusBadge
                            variant={dev.disponible ? "success" : "neutral"}
                            label={`Integrante #${dev.id}`}
                          />
                        </div>
                        <h3 className="mt-4 font-display text-lg font-extrabold uppercase tracking-tight text-brand-900">
                          {dev.nombre} {dev.apellido}
                        </h3>
                        <p className="mt-1 text-xs font-bold text-text-secondary">{dev.rolPrincipal}</p>
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{dev.tagline}</p>
                      </div>

                      <div className="mt-4 border-t border-border pt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {dev.stackPrincipal.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-pill bg-cream-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-brand-900"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-brand-900">
                          Ver perfil técnico
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EXPERIENCIA DEL EQUIPO */}
      <section id="experiencia" className="scroll-mt-32 border-b border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Trayectoria" icon={Briefcase} title="Experiencia del equipo" />
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Proyectos y formación que respaldan nuestro trabajo conjunto. Cada integrante
              detalla su propia experiencia en su perfil.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ExperienceTimeline hitos={EXPERIENCIA_EQUIPO} />
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="scroll-mt-32 border-b border-border bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Arquitectura end-to-end" icon={Sparkles} title="Stack Fullstack" />

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar tecnologías por categoría">
              {CATEGORIAS_STACK.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoriaStack(cat)}
                  aria-pressed={categoriaStack === cat}
                  className={`min-h-9 cursor-pointer rounded-pill px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    categoriaStack === cat
                      ? "bg-brand-900 text-cream-50"
                      : "border border-brand-900 bg-transparent text-brand-900 hover:bg-brand-900/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stackFiltrado.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-md border border-border bg-surface p-5 shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <StatusBadge variant="neutral" label={item.categoria} />
                    <span className="font-mono text-xs font-extrabold text-brand-900">
                      {item.nivelDominio}%
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-extrabold uppercase text-brand-900">
                    {item.nombre}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                    {item.descripcionUso}
                  </p>
                </div>

                <div
                  role="progressbar"
                  aria-label={`Dominio de ${item.nombre}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={item.nivelDominio}
                  className="mt-4 h-2 w-full overflow-hidden rounded-pill bg-cream-100"
                >
                  <motion.div
                    initial={reduceMotion ? { width: `${item.nivelDominio}%` } : { width: 0 }}
                    whileInView={{ width: `${item.nivelDominio}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
                    className="h-full rounded-pill bg-brand-900"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
