"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Database,
  LayoutDashboard,
  Lock,
  ShieldCheck,
  Sparkles,
  Terminal,
  Unlock,
  Users,
} from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactEmailSection } from "@/components/portfolio/ContactEmailSection";
import { ProjectsAndDemosSection } from "@/components/portfolio/ProjectsAndDemosSection";
import { TeamSquadSection } from "@/components/portfolio/TeamSquadSection";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { usePortfolio } from "@/context/PortfolioContext";

export default function PortfolioHomePage() {
  const {
    sesion,
    integrantes,
    proyectos,
    counterVisitasGenerales,
    counterAccesosRegistrados,
    abrirModalAuth,
  } = usePortfolio();
  const reduceMotion = useReducedMotion();
  const estaAutenticado = sesion.rol !== "visitante";

  const kpis = [
    { valor: `${integrantes.length} Devs`, etiqueta: "Squad Fullstack" },
    { valor: `${proyectos.length} Demos`, etiqueta: "Sandbox Interactivo" },
    { valor: counterVisitasGenerales.toLocaleString("es-AR"), etiqueta: "Visitas Generales" },
    { valor: counterAccesosRegistrados.toLocaleString("es-AR"), etiqueta: "Accesos Registrados" },
  ];

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-cream-50 py-14 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Izquierda: headline + CTAs */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col gap-5 lg:col-span-7"
            >
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge variant="purple" icon={Sparkles} label="Equipo Fullstack · 4 Integrantes" />
                <StatusBadge
                  variant={estaAutenticado ? "success" : "warning"}
                  icon={estaAutenticado ? Unlock : Lock}
                  label={
                    estaAutenticado
                      ? "Demos Interactivas Desbloqueadas"
                      : "Demos con Registración Obligatoria"
                  }
                />
              </div>

              <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.96] tracking-tight text-brand-900 sm:text-5xl lg:text-6xl">
                Ingeniería Fullstack, Sistemas de Diseño &amp; Datos SQL en Producción.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                Somos <strong className="text-brand-900">Kodexa Squad</strong>, un equipo de 4
                desarrolladores fullstack especializados en arquitecturas{" "}
                <strong className="text-brand-900">Next.js + React + TypeScript + PostgreSQL</strong>.
                Construimos software escalable con contratos de API estrictos, animaciones fluidas y
                validación total.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/#equipo">
                  <Button variant="primary" size="lg">
                    Conocer al equipo
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/#proyectos">
                  <Button variant="outline" size="lg">
                    Proyectos y Demos
                  </Button>
                </Link>
                {!estaAutenticado ? (
                  <Button variant="secondary" size="lg" onClick={() => abrirModalAuth()}>
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    Registrarme
                  </Button>
                ) : (
                  <Link href="/admin">
                    <Button variant="secondary" size="lg">
                      <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                      Panel Operador / Admin
                    </Button>
                  </Link>
                )}
              </div>

              {/* KPIs */}
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
                {kpis.map((k) => (
                  <div key={k.etiqueta}>
                    <p className="font-display text-2xl font-extrabold text-brand-900">{k.valor}</p>
                    <p className="text-xs font-semibold text-text-secondary">{k.etiqueta}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Derecha: roster del equipo (cada fila enlaza al perfil) */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="overflow-hidden rounded-lg border border-brand-700 bg-brand-900 text-cream-50 shadow-card">
                <div className="flex items-center justify-between border-b border-brand-700 bg-brand-700/60 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-status-danger" aria-hidden="true" />
                    <span className="h-3 w-3 rounded-full bg-accent-500" aria-hidden="true" />
                    <span className="h-3 w-3 rounded-full bg-status-success" aria-hidden="true" />
                    <span className="ml-2 font-mono text-xs font-bold text-cream-100">
                      kodexa-squad://equipo.ts
                    </span>
                  </div>
                  <Terminal className="h-4 w-4 text-accent-500" aria-hidden="true" />
                </div>

                <div className="p-5 font-mono text-xs leading-relaxed">
                  <p className="text-cream-100/70">{"// Elegí un integrante para ver su perfil técnico"}</p>
                  <p className="mt-2">
                    <span className="text-accent-500">export const</span>{" "}
                    <span className="font-bold text-cream-50">SQUAD</span> = [
                  </p>
                  {integrantes.map((dev) => (
                    <Link
                      key={dev.id}
                      href={`/equipo/${dev.slug}`}
                      className="my-1.5 block rounded-sm border-l-2 border-accent-500 bg-brand-700/60 px-3 py-2 transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-cream-50">
                          {dev.id}. {dev.nombre} {dev.apellido}
                        </strong>
                        <span className="shrink-0 text-[10px] text-accent-500">{dev.stackPrincipal[0]}</span>
                      </div>
                      <p className="truncate text-[11px] text-cream-100/80">{dev.rolPrincipal}</p>
                    </Link>
                  ))}
                  <p className="mt-2">];</p>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-brand-700 pt-3 text-[11px]">
                    <div className="flex items-center gap-1.5 text-status-success">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Zod + MIME</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-accent-500">
                      <Database className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>PostgreSQL</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-cream-100">
                      <Users className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>4 Perfiles</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1. Equipo + Experiencia + Stack */}
      <TeamSquadSection />

      {/* 2. Proyectos y demos con registración obligatoria */}
      <ProjectsAndDemosSection />

      {/* 3. Servicios + contacto por email con validación estricta */}
      <ContactEmailSection />
    </SiteShell>
  );
}
