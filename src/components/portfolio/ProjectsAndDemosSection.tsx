"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Eye,
  Lock,
  Play,
  Share2,
  Sparkles,
  Terminal,
  Unlock,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { usePortfolio } from "@/context/PortfolioContext";
import type { ProyectoPortfolio } from "@/data/portfolio";

export function ProjectsAndDemosSection() {
  const {
    sesion,
    proyectos,
    integrantes,
    abrirModalAuth,
    registrarVistaProyecto,
    registrarDemoEjecutada,
  } = usePortfolio();
  const { showToast } = useToast();
  const reduceMotion = useReducedMotion();

  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("Todas");
  const [integranteFiltro, setIntegranteFiltro] = useState<number | "todos">("todos");
  const [proyectoSeleccionado, setProyectoSeleccionado] =
    useState<ProyectoPortfolio | null>(null);
  const [resultadoDemo, setResultadoDemo] = useState<string | null>(null);
  const [ejecutandoDemo, setEjecutandoDemo] = useState<boolean>(false);

  const estaAutenticado = sesion.rol !== "visitante";

  const proyectosVisibles = proyectos.filter((p) => {
    if (!p.activo) return false;
    if (categoriaFiltro !== "Todas" && p.categoria !== categoriaFiltro) return false;
    if (
      integranteFiltro !== "todos" &&
      !p.integrantesIds.includes(integranteFiltro)
    ) {
      return false;
    }
    return true;
  });

  const handleIntentarAbrirProyecto = (proyecto: ProyectoPortfolio) => {
    if (!estaAutenticado) {
      showToast(
        "error",
        "🔒 Registración obligatoria: Iniciá sesión o creá tu cuenta para acceder al detalle y la demo interactiva.",
      );
      abrirModalAuth(proyecto.id);
      return;
    }
    registrarVistaProyecto(proyecto.id);
    setResultadoDemo(null);
    setProyectoSeleccionado(proyecto);
  };

  const handleEjecutarDemoInteractiva = (proyecto: ProyectoPortfolio) => {
    setEjecutandoDemo(true);
    setTimeout(() => {
      setEjecutandoDemo(false);
      setResultadoDemo(proyecto.demoSpec.respuestaEsperada);
      registrarDemoEjecutada(proyecto.id);
      showToast(
        "success",
        `Demo interactiva de "${proyecto.titulo}" ejecutada y contabilizada en Analytics.`,
      );
    }, 350);
  };

  // Web Share API / Clipboard fallback
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
        await navigator.clipboard.writeText(
          `${proyecto.titulo} — ${proyecto.demoLiveUrl}`,
        );
        showToast("success", "Enlace del proyecto copiado al portapapeles.");
      }
    } catch {
      // Cancelado por el usuario
    }
  };

  return (
    <section id="proyectos" className="py-16 sm:py-20 border-b border-border bg-surface">
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
                    ? `Acceso Desbloqueado (${sesion.usuario?.email})`
                    : "Sección con Registración Obligatoria"
                }
              />
              <span className="font-mono text-xs font-bold text-text-secondary">
                · {proyectosVisibles.length} proyectos activos
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-brand-900 sm:text-4xl">
              Proyectos Fullstack & Demos Interactivas
            </h2>
          </div>

          {!estaAutenticado && (
            <Button
              variant="primary"
              size="md"
              onClick={() => abrirModalAuth()}
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              Registrarme para Desbloquear Demos
            </Button>
          )}
        </div>

        {/* Barra de Filtros por Categoría e Integrante */}
        <div className="mt-8 flex flex-col gap-4 rounded-md border border-border bg-cream-50 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold uppercase text-brand-900 mr-1">
              Categoría:
            </span>
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
                className={`cursor-pointer rounded-pill px-3 py-1.5 text-xs font-bold transition-colors ${
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
            <span className="text-xs font-extrabold uppercase text-brand-900 mr-1">
              Integrante:
            </span>
            <button
              type="button"
              onClick={() => setIntegranteFiltro("todos")}
              className={`cursor-pointer rounded-pill px-3 py-1 text-xs font-bold ${
                integranteFiltro === "todos"
                  ? "bg-accent-500 text-brand-900"
                  : "bg-surface text-text-secondary border border-border"
              }`}
            >
              Los 4 Integrantes
            </button>
            {integrantes.map((dev) => (
              <button
                key={dev.id}
                type="button"
                onClick={() => setIntegranteFiltro(dev.id)}
                className={`cursor-pointer rounded-pill px-3 py-1 text-xs font-bold ${
                  integranteFiltro === dev.id
                    ? "bg-accent-500 text-brand-900"
                    : "bg-surface text-text-secondary border border-border"
                }`}
              >
                {dev.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Proyectos */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {proyectosVisibles.map((proyecto) => {
            const autores = integrantes.filter((i) =>
              proyecto.integrantesIds.includes(i.id),
            );
            return (
              <motion.article
                key={proyecto.id}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-between overflow-hidden rounded-md border border-border bg-cream-50/60 shadow-card"
              >
                <div>
                  {/* Imagen 16:10 con estado de bloqueo */}
                  <div className="relative h-56 w-full overflow-hidden bg-brand-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proyecto.imagenPortadaUrl}
                      alt={`Captura del proyecto ${proyecto.titulo}`}
                      className={`h-full w-full object-cover transition-all duration-slow ${
                        !estaAutenticado ? "scale-105 blur-[2px] opacity-60" : "opacity-90"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/30 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <StatusBadge variant="info" label={proyecto.categoria} />
                      <StatusBadge
                        variant={estaAutenticado ? "success" : "warning"}
                        icon={estaAutenticado ? Unlock : Lock}
                        label={
                          estaAutenticado
                            ? "Demo Interactiva Habilitada"
                            : "Requiere Registro"
                        }
                      />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-cream-50">
                      <span>Código: {proyecto.codigo}</span>
                      <span className="inline-flex items-center gap-2">
                        <Eye className="h-3.5 w-3.5 text-accent-500" aria-hidden="true" />
                        {proyecto.vistasTotales} vistas · {proyecto.demosEjecutadas} demos
                      </span>
                    </div>
                  </div>

                  {/* Cuerpo de la Card */}
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

                {/* Pie de la Card */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {autores.map((a) => (
                      <span
                        key={a.id}
                        title={`${a.nombre} (${a.rolPrincipal})`}
                        className="flex h-8 w-8 items-center justify-center rounded-pill bg-brand-900 font-display text-xs font-bold text-cream-50"
                      >
                        {a.avatarIniciales}
                      </span>
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
                      onClick={() => handleIntentarAbrirProyecto(proyecto)}
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
      </div>

      {/* Modal de Detalle Completo y Demo Interactiva (Solo accesible tras registrarse) */}
      {proyectoSeleccionado && (
        <Modal
          open={Boolean(proyectoSeleccionado)}
          onClose={() => setProyectoSeleccionado(null)}
          title={proyectoSeleccionado.titulo}
          icon={<Code2 className="h-5 w-5 text-brand-900" aria-hidden="true" />}
          maxWidth="max-w-4xl"
          footer={
            <Button
              variant="secondary"
              size="md"
              onClick={() => setProyectoSeleccionado(null)}
            >
              Cerrar Caso de Estudio y Demo
            </Button>
          }
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-status-success/30 bg-status-success/10 px-4 py-2.5 text-xs font-bold text-status-success-strong">
              <span>
                ✓ Contenido desbloqueado por usuario autenticado ({sesion.usuario?.email})
              </span>
              <span className="font-mono">
                Vistas: {proyectoSeleccionado.vistasTotales} · Demos:{" "}
                {proyectoSeleccionado.demosEjecutadas}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-sm font-extrabold uppercase text-brand-900">
                  Descripción Funcional y Alcance
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {proyectoSeleccionado.descripcionCompleta}
                </p>

                <h3 className="mt-2 font-display text-sm font-extrabold uppercase text-brand-900">
                  Arquitectura Fullstack Implementada
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {proyectoSeleccionado.arquitecturaDetalle}
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-md border border-border bg-cream-50 p-4">
                <h3 className="font-display text-sm font-extrabold uppercase text-brand-900">
                  Desafío Técnico & Solución
                </h3>
                <p className="text-xs leading-relaxed text-text-secondary">
                  <strong className="text-brand-900">Problema:</strong>{" "}
                  {proyectoSeleccionado.desafioTecnico}
                </p>
                <p className="text-xs leading-relaxed text-text-secondary">
                  <strong className="text-brand-900">Solución:</strong>{" "}
                  {proyectoSeleccionado.solucionImplementada}
                </p>

                <h4 className="mt-2 font-display text-xs font-extrabold uppercase text-brand-900">
                  Métricas de Impacto Verificadas:
                </h4>
                <ul className="flex flex-col gap-1.5">
                  {proyectoSeleccionado.metricasImpacto.map((m) => (
                    <li
                      key={m}
                      className="flex items-center gap-2 text-xs font-semibold text-brand-900"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-status-success"
                        aria-hidden="true"
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sandbox de Demo Interactiva en Vivo */}
            <div className="rounded-lg bg-brand-900 p-5 text-cream-50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-brand-700 pb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-accent-500">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Sandbox Interactivo en Vivo
                  </span>
                  <h4 className="mt-1 font-display text-lg font-extrabold uppercase">
                    {proyectoSeleccionado.demoSpec.endpointSimulado}
                  </h4>
                  <p className="text-xs text-cream-100/80">
                    {proyectoSeleccionado.demoSpec.instrucciones}
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() =>
                    handleEjecutarDemoInteractiva(proyectoSeleccionado)
                  }
                  disabled={ejecutandoDemo}
                >
                  <Terminal className="h-4 w-4" aria-hidden="true" />
                  {ejecutandoDemo ? "Ejecutando..." : "Ejecutar Demo Ahora"}
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 font-mono text-xs">
                <div>
                  <span className="block mb-1.5 text-[11px] uppercase text-cream-100/70">
                    Payload de Entrada (Request Body / Params):
                  </span>
                  <pre className="overflow-x-auto rounded-sm bg-brand-700/80 p-3 text-cream-50">
                    {proyectoSeleccionado.demoSpec.payloadEjemplo}
                  </pre>
                </div>

                <div>
                  <span className="block mb-1.5 text-[11px] uppercase text-cream-100/70">
                    Respuesta del Servidor (Response 200 OK):
                  </span>
                  {resultadoDemo ? (
                    <pre className="overflow-x-auto rounded-sm border border-status-success/50 bg-brand-700 p-3 text-accent-500">
                      {resultadoDemo}
                    </pre>
                  ) : (
                    <div className="flex h-[150px] items-center justify-center rounded-sm border border-dashed border-brand-700 p-4 text-center text-cream-100/60">
                      Presioná &ldquo;Ejecutar Demo Ahora&rdquo; para disparar la simulación
                      interactiva y registrar el evento en Analytics.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
