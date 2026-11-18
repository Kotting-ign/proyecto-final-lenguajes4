"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { usePortfolio } from "@/context/PortfolioContext";
import type { ProyectoPortfolio } from "@/data/portfolio";

/**
 * Lógica compartida del "gate" de Registración Obligatoria para Proyectos y Demos.
 * La usan el home (grilla de proyectos) y los perfiles `/equipo/[slug]`.
 *
 * - Visitante  → se muestra el aviso y se abre el modal de registro (recordando el proyecto).
 * - Registrado → se contabiliza la vista y se abre el detalle con la demo interactiva.
 *
 * BACKEND: la vista se registra en POST /api/portfolio (REGISTRAR_VISTA_PROYECTO → tabla `proyecto_portfolio`).
 */
export function useProyectoDetalle() {
  const { sesion, abrirModalAuth, registrarVistaProyecto } = usePortfolio();
  const { showToast } = useToast();
  const [proyectoSeleccionado, setProyectoSeleccionado] =
    useState<ProyectoPortfolio | null>(null);

  const estaAutenticado = sesion.rol !== "visitante";

  const intentarAbrir = useCallback(
    (proyecto: ProyectoPortfolio) => {
      if (!estaAutenticado) {
        showToast(
          "error",
          "🔒 Registración obligatoria: iniciá sesión o creá tu cuenta para acceder al detalle y la demo interactiva.",
        );
        abrirModalAuth(proyecto.id);
        return;
      }
      registrarVistaProyecto(proyecto.id);
      setProyectoSeleccionado(proyecto);
    },
    [estaAutenticado, showToast, abrirModalAuth, registrarVistaProyecto],
  );

  const cerrar = useCallback(() => setProyectoSeleccionado(null), []);

  return { estaAutenticado, proyectoSeleccionado, intentarAbrir, cerrar };
}
