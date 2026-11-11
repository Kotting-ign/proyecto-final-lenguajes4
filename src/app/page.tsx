"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Code2,
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
import { AuthRegistrationModal } from "@/components/auth/AuthRegistrationModal";
import { Navbar } from "@/components/layout/Navbar";
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

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />
      <AuthRegistrationModal />

      <main className="flex-1">
        {/* HERO EDITORIAL FULLSTACK */}
        <section className="relative overflow-hidden border-b border-border bg-cream-50 py-14 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Columna Izquierda: Headline dominante + CTAs */}
              <motion.div
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="lg:col-span-7 flex flex-col gap-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge
                    variant="purple"
                    icon={Sparkles}
                    label="Equipo Fullstack · 4 Integrantes"
                  />
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
                  Ingeniería Fullstack, Sistemas de Diseño & Datos SQL en Producción.
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                  Somos <strong className="text-brand-900">Kodexa Squad</strong>, un
                  equipo de 4 desarrolladores fullstack especializados en arquitecturas{" "}
                  <strong className="text-brand-900">
                    Next.js + React + TypeScript + PostgreSQL
                  </strong>
                  . Construimos software escalable con contratos de API estrictos,
                  animaciones fluidas y validación total.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link href="#proyectos">
                    <Button variant="primary" size="lg">
                      Explorar Proyectos y Demos
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>

                  {!estaAutenticado ? (
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => abrirModalAuth()}
                    >
                      <Lock className="h-4 w-4" aria-hidden="true" />
                      Registrarme (Acceso Demos)
                    </Button>
                  ) : (
                    <Link href="/admin">
                      <Button variant="secondary" size="lg">
                        <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                        Abrir Panel Operador / Admin
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Barra de Confianza y Métricas en Vivo */}
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
                  <div>
                    <span className="font-display text-2xl font-extrabold text-brand-900">
                      4 Devs
                    </span>
                    <p className="text-xs font-semibold text-text-secondary">
                      Squad Fullstack
                    </p>
                  </div>
                  <div>
                    <span className="font-display text-2xl font-extrabold text-brand-900">
                      {proyectos.length} Demos
                    </span>
                    <p className="text-xs font-semibold text-text-secondary">
                      Sandbox Interactivo
                    </p>
                  </div>
                  <div>
                    <span className="font-display text-2xl font-extrabold text-brand-900">
                      {counterVisitasGenerales.toLocaleString("es-AR")}
                    </span>
                    <p className="text-xs font-semibold text-text-secondary">
                      Visitas Generales
                    </p>
                  </div>
                  <div>
                    <span className="font-display text-2xl font-extrabold text-brand-900">
                      {counterAccesosRegistrados.toLocaleString("es-AR")}
                    </span>
                    <p className="text-xs font-semibold text-text-secondary">
                      Accesos Registrados
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Columna Derecha: Terminal de Arquitectura del Equipo */}
              <motion.div
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="lg:col-span-5"
              >
                <div className="overflow-hidden rounded-lg border border-brand-700 bg-brand-900 text-cream-50 shadow-card">
                  <div className="flex items-center justify-between border-b border-brand-700 bg-brand-700/60 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-status-danger" />
                      <span className="h-3 w-3 rounded-full bg-accent-500" />
                      <span className="h-3 w-3 rounded-full bg-status-success" />
                      <span className="ml-2 font-mono text-xs font-bold text-cream-100">
                        kodexa-squad://architecture.ts
                      </span>
                    </div>
                    <Terminal className="h-4 w-4 text-accent-500" aria-hidden="true" />
                  </div>

                  <div className="p-5 font-mono text-xs leading-relaxed">
                    <p className="text-cream-100/70">
                      {"// Escalabilidad por 4 Integrantes (Animaciones + APIs Web)"}
                    </p>
                    <p className="mt-2">
                      <span className="text-accent-500">export const</span>{" "}
                      <span className="text-cream-50 font-bold">SQUAD_ROSTER</span> = [
                    </p>
                    {integrantes.map((dev) => (
                      <div
                        key={dev.id}
                        className="my-1.5 rounded-sm bg-brand-700/60 px-3 py-2 border-l-2 border-accent-500"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-cream-50">
                            {dev.id}. {dev.nombre}
                          </strong>
                          <span className="text-[10px] text-accent-500">
                            {dev.stackPrincipal[0]} + {dev.stackPrincipal[1]}
                          </span>
                        </div>
                        <p className="text-[11px] text-cream-100/80 truncate">
                          {dev.rolPrincipal}
                        </p>
                      </div>
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
                        <span>RBAC 3 Roles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 1: EQUIPO DE 4 INTEGRANTES + API GITHUB + STACK */}
        <TeamSquadSection />

        {/* SECCIÓN 2: PROYECTOS Y DEMOS CON REGISTRACIÓN OBLIGATORIA */}
        <ProjectsAndDemosSection />

        {/* SECCIÓN 3: SERVICIOS + FORMULARIO DE CONTACTO VÍA EMAIL CON VALIDACIÓN ESTRICTA */}
        <ContactEmailSection />
      </main>

      {/* FOOTER VERDE/OBSIDIANPROFUNDO */}
      <footer className="border-t border-brand-700 bg-brand-900 py-12 text-cream-50 print:hidden">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent-500 text-brand-900 font-display font-extrabold">
                  <Code2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-display text-xl font-extrabold uppercase tracking-tight">
                  KODEXA SQUAD — PORTFOLIO FULLSTACK
                </span>
              </div>
              <p className="mt-2 text-xs text-cream-100/75">
                Trabajo Práctico Integrador · Lenguajes 4 · Modalidad Grupal (4
                Integrantes) · Condiciones de Regularización y Promoción Directa.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/admin">
                <Button variant="primary" size="sm">
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                  Panel Operador / Administrador
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
