"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, Lock, Play, Share2, Unlock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProjectDetailModal } from "@/components/portfolio/ProjectDetailModal";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { usePortfolio } from "@/context/PortfolioContext";
import type { ProyectoPortfolio } from "@/data/portfolio";
import { useProyectoDetalle } from "@/hooks/useProyectoDetalle";

export function ProjectsAndDemosSection() {
  const { sesion, proyectos, integrantes, abrirModalAuth } = usePortfolio();
  const { estaAutenticado, proyectoSeleccionado, intentarAbrir, cerrar } =
    useProyectoDetalle();
  const { showToast } = useToast();
  const reduceMotion = useReducedMotion();

  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("Todas");
  const [integranteFiltro, setIntegranteFiltro] = useState<number | "todos">("todos");

  const proyectosVisibles = proyectos.filter((p) => {
    if (!p.activo) return false;
    if (categoriaFiltro !== "Todas" && p.categoria !== categoriaFiltro) return false;
    if (integranteFiltro !== "todos" && !p.integrantesIds.includes(integranteFiltro)) {
      return false;
    }
    return true;
  });

  // Web Share API con fallback a Clipboard API
  const compartirProyecto = async (proyecto: ProyectoPortfolio) => {
    const shareData = {
      title: proyecto.titulo,
      text: proyecto.resumenPublico,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${proyecto.titulo} — ${proyecto.demoLiveUrl}`);
        showToast("success", "Enlace del proyecto copiado al portapapeles.");
      }
    } catch {
      // Cancelado por el usuario
    }
  };

  return (
    <section id="proyectos" className="scroll-mt-32 border-b border-border bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Encabezado */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge
                variant={estaAutenticado ? "success" : "warning"}
                icon={estaAutenticado ? Unlock : Lock}
                label={
                  estaAutenticado
                    ? `Acceso desbloqueado (${sesion.usuario?.email})`
                    : "Sección con registración obligatoria"
                }
              />
              <span className="font-mono text-xs font-bold text-text-secondary">
                · {proyectosVisibles.length} proyectos activos
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-brand-900 sm:text-4xl">
              Proyectos Fullstack &amp; Demos Interactivas
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-text-secondary">
              Cada proyecto incluye un caso de estudio completo y una demo interactiva. Para
              acceder al detalle es necesario registrarse o iniciar sesión.
            </p>
          </div>

          {!estaAutenticado && (
            <Button variant="primary" size="md" onClick={() => abrirModalAuth()}>
              <Lock className="h-4 w-4" aria-hidden="true" />
              Registrarme para Desbloquear Demos
            </Button>
          )}
        </div>

        {/* Filtros por categoría e integrante */}
        <div className="mt-8 flex flex-col gap-4 rounded-md border border-border bg-cream-50 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-extrabold uppercase text-brand-900">Categoría:</span>
            {(
              [
                "Todas",
                "ERP / SaaS",
                "FinTech & Analytics",
                "Realtime & APIs",
                "E-Commerce & Cloud",
              ] as const
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoriaFiltro(cat)}
                aria-pressed={categoriaFiltro === cat}
                className={`min-h-9 cursor-pointer rounded-pill px-3 py-1.5 text-xs font-bold transition-colors ${
                  categoriaFiltro === cat
                    ? "bg-brand-900 text-cream-50"
                    : "border border-brand-900 bg-transparent text-brand-900 hover:bg-brand-900/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-extrabold uppercase text-brand-900">Integrante:</span>
            <button
              type="button"
              onClick={() => setIntegranteFiltro("todos")}
              aria-pressed={integranteFiltro === "todos"}
              className={`min-h-9 cursor-pointer rounded-pill px-3 py-1 text-xs font-bold ${
                integranteFiltro === "todos"
                  ? "bg-accent-500 text-brand-900"
                  : "border border-border bg-surface text-text-secondary"
              }`}
            >
              Los 4 Integrantes
            </button>
            {integrantes.map((dev) => (
              <button
                key={dev.id}
                type="button"
                onClick={() => setIntegranteFiltro(dev.id)}
                aria-pressed={integranteFiltro === dev.id}
                className={`min-h-9 cursor-pointer rounded-pill px-3 py-1 text-xs font-bold ${
                  integranteFiltro === dev.id
                    ? "bg-accent-500 text-brand-900"
                    : "border border-border bg-surface text-text-secondary"
                }`}
              >
                {dev.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Proyectos */}
        {proyectosVisibles.length === 0 ? (
          <p className="mt-8 rounded-md border border-dashed border-border bg-cream-50 p-8 text-center text-sm text-text-secondary">
            No hay proyectos que coincidan con los filtros seleccionados.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {proyectosVisibles.map((proyecto) => {
              const autores = integrantes.filter((i) => proyecto.integrantesIds.includes(i.id));
              return (
                <motion.article
                  key={proyecto.id}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between overflow-hidden rounded-md border border-border bg-cream-50/60 shadow-card"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-brand-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={proyecto.imagenPortadaUrl}
                        alt={`Captura del proyecto ${proyecto.titulo}`}
                        loading="lazy"
                        className={`h-full w-full object-cover transition-all duration-slow ${
                          !estaAutenticado ? "scale-105 opacity-60 blur-[2px]" : "opacity-90"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/30 to-transparent" />

                      <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
                        <StatusBadge variant="info" label={proyecto.categoria} />
                        <StatusBadge
                          variant={estaAutenticado ? "success" : "warning"}
                          icon={estaAutenticado ? Unlock : Lock}
                          label={estaAutenticado ? "Demo habilitada" : "Requiere registro"}
                        />
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-xs text-cream-50">
                        <span>{proyecto.codigo}</span>
                        <span className="inline-flex items-center gap-2">
                          <Eye className="h-3.5 w-3.5 text-accent-500" aria-hidden="true" />
                          {proyecto.vistasTotales} vistas · {proyecto.demosEjecutadas} demos
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-brand-900">
                        {proyecto.titulo}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {proyecto.resumenPublico}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {proyecto.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-pill border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] font-bold text-brand-900"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {autores.map((a) => (
                        <Link
                          key={a.id}
                          href={`/equipo/${a.slug}`}
                          title={`Ver perfil técnico de ${a.nombre} ${a.apellido}`}
                          aria-label={`Ver perfil técnico de ${a.nombre} ${a.apellido}`}
                          className="flex h-9 w-9 items-center justify-center rounded-pill bg-brand-900 font-display text-xs font-bold text-cream-50 transition-colors hover:bg-accent-500 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
                        >
                          {a.avatarIniciales}
                        </Link>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => compartirProyecto(proyecto)}
                        aria-label={`Compartir ${proyecto.titulo}`}
                        title="Compartir proyecto (Web Share API)"
                      >
                        <Share2 className="h-4 w-4" aria-hidden="true" />
                      </Button>

                      <Button
                        variant={estaAutenticado ? "secondary" : "primary"}
                        size="sm"
                        onClick={() => intentarAbrir(proyecto)}
                      >
                        {estaAutenticado ? (
                          <>
                            <Play className="h-4 w-4" aria-hidden="true" />
                            Ver Detalle y Ejecutar Demo
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4" aria-hidden="true" />
                            Registrate para Ver Demo
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {proyectoSeleccionado && (
        <ProjectDetailModal
          key={proyectoSeleccionado.id}
          proyecto={proyectoSeleccionado}
          onClose={cerrar}
        />
      )}
    </section>
  );
}
