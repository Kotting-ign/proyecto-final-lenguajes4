"use client";

import { Lock, Play, Unlock } from "lucide-react";
import { ProjectDetailModal } from "@/components/portfolio/ProjectDetailModal";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { usePortfolio } from "@/context/PortfolioContext";
import { useProyectoDetalle } from "@/hooks/useProyectoDetalle";

/**
 * Proyectos en los que participó el integrante.
 * Respeta la registración obligatoria: el detalle y la demo sólo se abren con sesión.
 */
export function MemberProjects({ integranteId, nombre }: { integranteId: number; nombre: string }) {
  const { proyectos, integrantes, abrirModalAuth } = usePortfolio();
  const { estaAutenticado, proyectoSeleccionado, intentarAbrir, cerrar } = useProyectoDetalle();

  const propios = proyectos.filter((p) => p.activo && p.integrantesIds.includes(integranteId));

  return (
    <div>
      {!estaAutenticado && propios.length > 0 && (
        <div className="mb-5 flex flex-col gap-3 rounded-md border border-status-warning/40 bg-status-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-status-warning-strong">
            🔒 El detalle de los proyectos y las demos interactivas requiere registración.
          </p>
          <Button variant="primary" size="sm" onClick={() => abrirModalAuth()}>
            <Lock className="h-4 w-4" aria-hidden="true" />
            Registrarme
          </Button>
        </div>
      )}

      {propios.length === 0 ? (
        <p className="rounded-md border border-dashed border-border bg-cream-50 p-8 text-center text-sm text-text-secondary">
          {nombre} todavía no tiene proyectos publicados.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {propios.map((proyecto, i) => {
            const coautores = integrantes.filter(
              (d) => d.id !== integranteId && proyecto.integrantesIds.includes(d.id),
            );
            return (
              <Reveal key={proyecto.id} delay={i * 0.08}>
                <article className="flex h-full flex-col justify-between rounded-md border border-border bg-surface p-5 shadow-card">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <StatusBadge variant="info" label={proyecto.categoria} />
                      <StatusBadge
                        variant={estaAutenticado ? "success" : "warning"}
                        icon={estaAutenticado ? Unlock : Lock}
                        label={estaAutenticado ? "Demo habilitada" : "Requiere registro"}
                      />
                    </div>
                    <h3 className="mt-3 font-display text-lg font-extrabold uppercase tracking-tight text-brand-900">
                      {proyecto.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {proyecto.resumenPublico}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {proyecto.stack.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="rounded-pill border border-border bg-cream-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-brand-900"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {coautores.length > 0 && (
                      <p className="mt-3 text-xs text-text-secondary">
                        Con: {coautores.map((c) => `${c.nombre} ${c.apellido}`).join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 border-t border-border pt-4">
                    <Button
                      variant={estaAutenticado ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => intentarAbrir(proyecto)}
                    >
                      {estaAutenticado ? (
                        <>
                          <Play className="h-4 w-4" aria-hidden="true" />
                          Ver Detalle y Demo
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" aria-hidden="true" />
                          Registrate para Ver Demo
                        </>
                      )}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}

      {proyectoSeleccionado && (
        <ProjectDetailModal
          key={proyectoSeleccionado.id}
          proyecto={proyectoSeleccionado}
          onClose={cerrar}
        />
      )}
    </div>
  );
}
