"use client";

import { CheckCircle2, Code2, Sparkles, Terminal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { usePortfolio } from "@/context/PortfolioContext";
import type { ProyectoPortfolio } from "@/data/portfolio";

interface ProjectDetailModalProps {
  proyecto: ProyectoPortfolio;
  onClose: () => void;
}

/**
 * Caso de estudio completo + sandbox de demo interactiva.
 * Sólo se monta para usuarios autenticados (ver `useProyectoDetalle`).
 * Renderizarlo con `key={proyecto.id}` para reiniciar el estado de la demo.
 */
export function ProjectDetailModal({ proyecto, onClose }: ProjectDetailModalProps) {
  const { sesion, registrarDemoEjecutada } = usePortfolio();
  const { showToast } = useToast();
  const [resultadoDemo, setResultadoDemo] = useState<string | null>(null);
  const [ejecutandoDemo, setEjecutandoDemo] = useState(false);

  const ejecutarDemo = () => {
    setEjecutandoDemo(true);
    setTimeout(() => {
      setEjecutandoDemo(false);
      setResultadoDemo(proyecto.demoSpec.respuestaEsperada);
      registrarDemoEjecutada(proyecto.id);
      showToast("success", `Demo interactiva de "${proyecto.titulo}" ejecutada.`);
    }, 350);
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={proyecto.titulo}
      icon={<Code2 className="h-5 w-5 text-brand-900" aria-hidden="true" />}
      maxWidth="max-w-4xl"
      footer={
        <Button variant="secondary" size="md" onClick={onClose}>
          Cerrar Caso de Estudio y Demo
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-status-success/30 bg-status-success/10 px-4 py-2.5 text-xs font-bold text-status-success-strong">
          <span>✓ Contenido desbloqueado por usuario autenticado ({sesion.usuario?.email})</span>
          <span className="font-mono">
            Vistas: {proyecto.vistasTotales} · Demos: {proyecto.demosEjecutadas}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-sm font-extrabold uppercase text-brand-900">
              Descripción Funcional y Alcance
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">{proyecto.descripcionCompleta}</p>

            <h3 className="mt-2 font-display text-sm font-extrabold uppercase text-brand-900">
              Arquitectura Fullstack Implementada
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">{proyecto.arquitecturaDetalle}</p>
          </div>

          <div className="flex flex-col gap-3 rounded-md border border-border bg-cream-50 p-4">
            <h3 className="font-display text-sm font-extrabold uppercase text-brand-900">
              Desafío Técnico &amp; Solución
            </h3>
            <p className="text-xs leading-relaxed text-text-secondary">
              <strong className="text-brand-900">Problema:</strong> {proyecto.desafioTecnico}
            </p>
            <p className="text-xs leading-relaxed text-text-secondary">
              <strong className="text-brand-900">Solución:</strong> {proyecto.solucionImplementada}
            </p>

            <h4 className="mt-2 font-display text-xs font-extrabold uppercase text-brand-900">
              Métricas de Impacto:
            </h4>
            <ul className="flex flex-col gap-1.5">
              {proyecto.metricasImpacto.map((m) => (
                <li key={m} className="flex items-center gap-2 text-xs font-semibold text-brand-900">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-status-success" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sandbox de demo interactiva */}
        <div className="rounded-lg bg-brand-900 p-5 text-cream-50">
          <div className="flex flex-col gap-3 border-b border-brand-700 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-accent-500">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Sandbox Interactivo
              </span>
              <h4 className="mt-1 break-all font-display text-lg font-extrabold uppercase">
                {proyecto.demoSpec.endpointSimulado}
              </h4>
              <p className="text-xs text-cream-100/80">{proyecto.demoSpec.instrucciones}</p>
            </div>

            <Button variant="primary" size="md" onClick={ejecutarDemo} disabled={ejecutandoDemo}>
              <Terminal className="h-4 w-4" aria-hidden="true" />
              {ejecutandoDemo ? "Ejecutando..." : "Ejecutar Demo Ahora"}
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2">
            <div>
              <span className="mb-1.5 block text-[11px] uppercase text-cream-100/70">
                Payload de Entrada (Request Body / Params):
              </span>
              <pre className="overflow-x-auto rounded-sm bg-brand-700/80 p-3 text-cream-50">
                {proyecto.demoSpec.payloadEjemplo}
              </pre>
            </div>

            <div>
              <span className="mb-1.5 block text-[11px] uppercase text-cream-100/70">
                Respuesta del Servidor (Response 200 OK):
              </span>
              {resultadoDemo ? (
                <pre
                  aria-live="polite"
                  className="overflow-x-auto rounded-sm border border-status-success/50 bg-brand-700 p-3 text-accent-500"
                >
                  {resultadoDemo}
                </pre>
              ) : (
                <div className="flex h-[150px] items-center justify-center rounded-sm border border-dashed border-brand-700 p-4 text-center text-cream-100/60">
                  Presioná &ldquo;Ejecutar Demo Ahora&rdquo; para disparar la simulación interactiva.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
