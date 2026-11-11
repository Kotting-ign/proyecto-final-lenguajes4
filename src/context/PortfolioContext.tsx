"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSULTAS_INICIALES,
  INTEGRANTES_INICIALES,
  METRICAS_DIARIAS_INICIALES,
  PROYECTOS_INICIALES,
  SERVICIOS_INICIALES,
  STACK_TECNOLOGIAS,
  USUARIOS_REGISTRADOS_INICIALES,
  type ConsultaContacto,
  type EstadoConsulta,
  type Integrante,
  type MetodoAuth,
  type MetricaDiaria,
  type ProyectoPortfolio,
  type RolSistema,
  type ServicioFullstack,
  type TecnologiaStack,
  type TipoConsulta,
  type UsuarioRegistrado,
} from "@/data/portfolio";
import type { DatabaseSchema } from "@/lib/db/persistent-store";

export interface SesionActiva {
  rol: RolSistema;
  usuario: UsuarioRegistrado | null;
}

export interface NuevoRegistroInput {
  nombre: string;
  apellido: string;
  email: string;
  empresa: string;
  cargo: string;
  metodoAuth: MetodoAuth;
}

export interface NuevaConsultaInput {
  nombreCompleto: string;
  email: string;
  telefono: string;
  empresa: string;
  tipoConsulta: TipoConsulta;
  integranteDestinoId: number | null;
  presupuestoUsd: number | null;
  asunto: string;
  mensaje: string;
  adjuntoNombre: string | null;
  adjuntoMime: string | null;
  adjuntoTamanoKb: number | null;
}

export type ProyectoDraft = Omit<
  ProyectoPortfolio,
  "id" | "vistasTotales" | "demosEjecutadas" | "fechaPublicacion"
>;

export type ServicioDraft = Omit<ServicioFullstack, "id">;

interface PortfolioContextValue {
  sesion: SesionActiva;
  integrantes: Integrante[];
  stack: TecnologiaStack[];
  servicios: ServicioFullstack[];
  proyectos: ProyectoPortfolio[];
  consultas: ConsultaContacto[];
  usuariosRegistrados: UsuarioRegistrado[];
  metricasDiarias: MetricaDiaria[];
  counterVisitasGenerales: number;
  counterAccesosRegistrados: number;
  sincronizandoBd: boolean;
  modalAuthAbierto: boolean;
  proyectoPendienteId: number | null;
  abrirModalAuth: (proyectoId?: number) => void;
  cerrarModalAuth: () => void;
  iniciarSesionEmail: (email: string, password: string) => { ok: boolean; error?: string };
  registrarNuevoUsuario: (input: NuevoRegistroInput) => { ok: boolean; error?: string };
  loginExternoOAuth: (proveedor: "google" | "github") => void;
  cambiarRolDemoRapido: (rol: RolSistema) => void;
  cerrarSesion: () => void;
  enviarConsulta: (input: NuevaConsultaInput) => void;
  responderConsulta: (consultaId: number, operadorNombre: string, mensajeRespuesta: string) => void;
  cambiarEstadoConsulta: (consultaId: number, nuevoEstado: EstadoConsulta) => void;
  guardarProyecto: (draft: ProyectoDraft, editarId?: number) => void;
  eliminarProyecto: (proyectoId: number) => void;
  toggleActivoProyecto: (proyectoId: number) => void;
  registrarVistaProyecto: (proyectoId: number) => void;
  registrarDemoEjecutada: (proyectoId: number) => void;
  guardarServicio: (draft: ServicioDraft, editarId?: number) => void;
  eliminarServicio: (servicioId: number) => void;
  toggleActivoServicio: (servicioId: number) => void;
  toggleEstadoUsuario: (usuarioId: number) => void;
  cambiarRolUsuario: (usuarioId: number, nuevoRol: Exclude<RolSistema, "visitante">) => void;
  eliminarUsuario: (usuarioId: number) => void;
  simularTraficoEnVivo: () => void;
}

const SESSION_STORAGE_KEY = "kodexa_active_session_v1";

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio debe utilizarse dentro de <PortfolioProvider>");
  }
  return ctx;
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [integrantes, setIntegrantes] = useState<Integrante[]>(INTEGRANTES_INICIALES);
  const [stack, setStack] = useState<TecnologiaStack[]>(STACK_TECNOLOGIAS);
  const [servicios, setServicios] = useState<ServicioFullstack[]>(SERVICIOS_INICIALES);
  const [proyectos, setProyectos] = useState<ProyectoPortfolio[]>(PROYECTOS_INICIALES);
  const [consultas, setConsultas] = useState<ConsultaContacto[]>(CONSULTAS_INICIALES);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState<UsuarioRegistrado[]>(
    USUARIOS_REGISTRADOS_INICIALES,
  );
  const [metricasDiarias, setMetricasDiarias] = useState<MetricaDiaria[]>(
    METRICAS_DIARIAS_INICIALES,
  );

  const [counterVisitasGenerales, setCounterVisitasGenerales] = useState<number>(1443);
  const [counterAccesosRegistrados, setCounterAccesosRegistrados] = useState<number>(494);
  const [sincronizandoBd, setSincronizandoBd] = useState<boolean>(false);

  const [sesion, setSesion] = useState<SesionActiva>({
    rol: "visitante",
    usuario: null,
  });

  const [modalAuthAbierto, setModalAuthAbierto] = useState(false);
  const [proyectoPendienteId, setProyectoPendienteId] = useState<number | null>(null);

  const aplicarSnapshotBd = useCallback((db: DatabaseSchema) => {
    setIntegrantes(db.integrantes);
    setStack(db.stack);
    setServicios(db.servicios);
    setProyectos(db.proyectos);
    setConsultas(db.consultas);
    setUsuariosRegistrados(db.usuariosRegistrados);
    setMetricasDiarias(db.metricasDiarias);
    setCounterVisitasGenerales(db.counterVisitasGenerales);
    setCounterAccesosRegistrados(db.counterAccesosRegistrados);
  }, []);

  const mutateBackend = useCallback(
    async (action: string, payload: Record<string, unknown>) => {
      setSincronizandoBd(true);
      try {
        const res = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, payload }),
        });
        const data = (await res.json()) as { ok: boolean; db?: DatabaseSchema };
        if (data.ok && data.db) {
          aplicarSnapshotBd(data.db);
        }
      } catch {
        // Fallback en memoria si el servidor está reiniciando
      } finally {
        setSincronizandoBd(false);
      }
    },
    [aplicarSnapshotBd],
  );

  // Al montar: recupera sesión persistida en navegador y sincroniza con la Base de Datos del servidor (+1 visita general)
  useEffect(() => {
    let cancelado = false;

    fetch("/api/portfolio?trackVisit=true", { cache: "no-store" })
      .then((r) => r.json())
      .then((db: DatabaseSchema) => {
        if (cancelado) return;
        if (db && typeof db.counterVisitasGenerales === "number") {
          aplicarSnapshotBd(db);
        }
        try {
          const guardada = window.localStorage.getItem(SESSION_STORAGE_KEY);
          if (guardada) {
            const parsed = JSON.parse(guardada) as SesionActiva;
            if (parsed && parsed.rol) {
              setSesion(parsed);
            }
          }
        } catch {
          // Ignorar errores de localStorage
        }
      })
      .catch(() => {
        // Si falla en primer render, conserva seed inicial
      });

    return () => {
      cancelado = true;
    };
  }, [aplicarSnapshotBd]);

  const persistirSesionLocal = useCallback((nuevaSesion: SesionActiva) => {
    setSesion(nuevaSesion);
    try {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nuevaSesion));
    } catch {
      // Ignorar
    }
  }, []);

  const abrirModalAuth = useCallback((proyectoId?: number) => {
    if (proyectoId !== undefined) {
      setProyectoPendienteId(proyectoId);
    }
    setModalAuthAbierto(true);
  }, []);

  const cerrarModalAuth = useCallback(() => {
    setModalAuthAbierto(false);
  }, []);

  const iniciarSesionEmail = useCallback(
    (email: string, password: string): { ok: boolean; error?: string } => {
      void password;
      const cleanEmail = email.trim().toLowerCase();
      const existente = usuariosRegistrados.find(
        (u) => u.email.toLowerCase() === cleanEmail,
      );

      if (existente && existente.estado === "Suspendido") {
        return {
          ok: false,
          error: "Esta cuenta se encuentra suspendida por el administrador.",
        };
      }

      const ahora = new Date().toISOString().slice(0, 16).replace("T", " ");

      if (existente) {
        const actualizado: UsuarioRegistrado = {
          ...existente,
          accesosTotales: existente.accesosTotales + 1,
          ultimoAcceso: ahora,
        };
        persistirSesionLocal({ rol: actualizado.rol, usuario: actualizado });
      } else {
        const nuevo: UsuarioRegistrado = {
          id: Date.now(),
          nombre: cleanEmail.split("@")[0] || "Usuario",
          apellido: "Registrado",
          email: cleanEmail,
          empresa: "Visitante Verificado",
          cargo: "Desarrollador / Cliente",
          metodoAuth: "propio",
          rol:
            cleanEmail.includes("admin") || cleanEmail.includes("catedra")
              ? "admin"
              : "registrado",
          estado: "Activo",
          accesosTotales: 1,
          proyectosDesbloqueados: proyectoPendienteId ? [proyectoPendienteId] : [1],
          fechaRegistro: new Date().toISOString().slice(0, 10),
          ultimoAcceso: ahora,
        };
        persistirSesionLocal({ rol: nuevo.rol, usuario: nuevo });
      }

      void mutateBackend("LOGIN_ACCESO", { email: cleanEmail, metodoAuth: "propio" });
      setModalAuthAbierto(false);
      return { ok: true };
    },
    [usuariosRegistrados, proyectoPendienteId, persistirSesionLocal, mutateBackend],
  );

  const registrarNuevoUsuario = useCallback(
    (input: NuevoRegistroInput): { ok: boolean; error?: string } => {
      const cleanEmail = input.email.trim().toLowerCase();
      if (usuariosRegistrados.some((u) => u.email.toLowerCase() === cleanEmail)) {
        return {
          ok: false,
          error: "Ya existe un usuario registrado con ese correo electrónico.",
        };
      }

      const ahora = new Date().toISOString().slice(0, 16).replace("T", " ");
      const nuevo: UsuarioRegistrado = {
        id: Math.max(0, ...usuariosRegistrados.map((u) => u.id)) + 1,
        nombre: input.nombre.trim(),
        apellido: input.apellido.trim(),
        email: cleanEmail,
        empresa: input.empresa.trim() || "Particular",
        cargo: input.cargo.trim() || "Visitante Profesional",
        metodoAuth: input.metodoAuth,
        rol: "registrado",
        estado: "Activo",
        accesosTotales: 1,
        proyectosDesbloqueados: proyectoPendienteId ? [proyectoPendienteId] : [1],
        fechaRegistro: new Date().toISOString().slice(0, 10),
        ultimoAcceso: ahora,
      };

      persistirSesionLocal({ rol: "registrado", usuario: nuevo });
      void mutateBackend("REGISTRAR_USUARIO", { ...input, email: cleanEmail });
      setModalAuthAbierto(false);
      return { ok: true };
    },
    [usuariosRegistrados, proyectoPendienteId, persistirSesionLocal, mutateBackend],
  );

  const loginExternoOAuth = useCallback(
    (proveedor: "google" | "github") => {
      const ahora = new Date().toISOString().slice(0, 16).replace("T", " ");
      const emailDemo =
        proveedor === "google"
          ? "invitado.google@gmail.com"
          : "dev.github@users.noreply.github.com";

      const nuevo: UsuarioRegistrado = {
        id: Math.max(0, ...usuariosRegistrados.map((u) => u.id)) + 1,
        nombre: proveedor === "google" ? "Cuenta Google" : "Cuenta GitHub",
        apellido: "Verificada",
        email: emailDemo,
        empresa: proveedor === "google" ? "Google OAuth 2.0" : "GitHub Developer",
        cargo: "Evaluador / Cliente",
        metodoAuth: proveedor,
        rol: "registrado",
        estado: "Activo",
        accesosTotales: 1,
        proyectosDesbloqueados: proyectoPendienteId ? [proyectoPendienteId] : [1, 2],
        fechaRegistro: new Date().toISOString().slice(0, 10),
        ultimoAcceso: ahora,
      };

      persistirSesionLocal({ rol: "registrado", usuario: nuevo });
      void mutateBackend("LOGIN_ACCESO", {
        email: emailDemo,
        nombre: nuevo.nombre,
        apellido: nuevo.apellido,
        empresa: nuevo.empresa,
        cargo: nuevo.cargo,
        metodoAuth: proveedor,
      });
      setModalAuthAbierto(false);
    },
    [usuariosRegistrados, proyectoPendienteId, persistirSesionLocal, mutateBackend],
  );

  const cambiarRolDemoRapido = useCallback(
    (rol: RolSistema) => {
      if (rol === "visitante") {
        persistirSesionLocal({ rol: "visitante", usuario: null });
        return;
      }
      const usuarioBase =
        usuariosRegistrados.find((u) => u.rol === rol) ?? usuariosRegistrados[0];
      persistirSesionLocal({
        rol,
        usuario: {
          ...usuarioBase,
          rol,
        },
      });
    },
    [usuariosRegistrados, persistirSesionLocal],
  );

  const cerrarSesion = useCallback(() => {
    persistirSesionLocal({ rol: "visitante", usuario: null });
  }, [persistirSesionLocal]);

  const enviarConsulta = useCallback(
    (input: NuevaConsultaInput) => {
      void mutateBackend("ENVIAR_CONSULTA", { ...input });
    },
    [mutateBackend],
  );

  const responderConsulta = useCallback(
    (consultaId: number, operadorNombre: string, mensajeRespuesta: string) => {
      void mutateBackend("RESPONDER_CONSULTA", {
        consultaId,
        operadorNombre,
        mensajeRespuesta,
      });
    },
    [mutateBackend],
  );

  const cambiarEstadoConsulta = useCallback(
    (consultaId: number, nuevoEstado: EstadoConsulta) => {
      void mutateBackend("CAMBIAR_ESTADO_CONSULTA", { consultaId, nuevoEstado });
    },
    [mutateBackend],
  );

  const guardarProyecto = useCallback(
    (draft: ProyectoDraft, editarId?: number) => {
      void mutateBackend("GUARDAR_PROYECTO", { draft, editarId });
    },
    [mutateBackend],
  );

  const eliminarProyecto = useCallback(
    (proyectoId: number) => {
      void mutateBackend("ELIMINAR_PROYECTO", { proyectoId });
    },
    [mutateBackend],
  );

  const toggleActivoProyecto = useCallback(
    (proyectoId: number) => {
      void mutateBackend("TOGGLE_PROYECTO", { proyectoId });
    },
    [mutateBackend],
  );

  const registrarVistaProyecto = useCallback(
    (proyectoId: number) => {
      void mutateBackend("REGISTRAR_VISTA_PROYECTO", {
        proyectoId,
        usuarioId: sesion.usuario?.id,
      });
    },
    [mutateBackend, sesion.usuario?.id],
  );

  const registrarDemoEjecutada = useCallback(
    (proyectoId: number) => {
      void mutateBackend("REGISTRAR_DEMO_EJECUTADA", { proyectoId });
    },
    [mutateBackend],
  );

  const guardarServicio = useCallback(
    (draft: ServicioDraft, editarId?: number) => {
      void mutateBackend("GUARDAR_SERVICIO", { draft, editarId });
    },
    [mutateBackend],
  );

  const eliminarServicio = useCallback(
    (servicioId: number) => {
      void mutateBackend("ELIMINAR_SERVICIO", { servicioId });
    },
    [mutateBackend],
  );

  const toggleActivoServicio = useCallback(
    (servicioId: number) => {
      void mutateBackend("TOGGLE_SERVICIO", { servicioId });
    },
    [mutateBackend],
  );

  const toggleEstadoUsuario = useCallback(
    (usuarioId: number) => {
      void mutateBackend("TOGGLE_ESTADO_USUARIO", { usuarioId });
    },
    [mutateBackend],
  );

  const cambiarRolUsuario = useCallback(
    (usuarioId: number, nuevoRol: Exclude<RolSistema, "visitante">) => {
      void mutateBackend("CAMBIAR_ROL_USUARIO", { usuarioId, nuevoRol });
    },
    [mutateBackend],
  );

  const eliminarUsuario = useCallback(
    (usuarioId: number) => {
      void mutateBackend("ELIMINAR_USUARIO", { usuarioId });
    },
    [mutateBackend],
  );

  const simularTraficoEnVivo = useCallback(() => {
    void mutateBackend("SIMULAR_TRAFICO", {});
  }, [mutateBackend]);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      sesion,
      integrantes,
      stack,
      servicios,
      proyectos,
      consultas,
      usuariosRegistrados,
      metricasDiarias,
      counterVisitasGenerales,
      counterAccesosRegistrados,
      sincronizandoBd,
      modalAuthAbierto,
      proyectoPendienteId,
      abrirModalAuth,
      cerrarModalAuth,
      iniciarSesionEmail,
      registrarNuevoUsuario,
      loginExternoOAuth,
      cambiarRolDemoRapido,
      cerrarSesion,
      enviarConsulta,
      responderConsulta,
      cambiarEstadoConsulta,
      guardarProyecto,
      eliminarProyecto,
      toggleActivoProyecto,
      registrarVistaProyecto,
      registrarDemoEjecutada,
      guardarServicio,
      eliminarServicio,
      toggleActivoServicio,
      toggleEstadoUsuario,
      cambiarRolUsuario,
      eliminarUsuario,
      simularTraficoEnVivo,
    }),
    [
      sesion,
      integrantes,
      stack,
      servicios,
      proyectos,
      consultas,
      usuariosRegistrados,
      metricasDiarias,
      counterVisitasGenerales,
      counterAccesosRegistrados,
      sincronizandoBd,
      modalAuthAbierto,
      proyectoPendienteId,
      abrirModalAuth,
      cerrarModalAuth,
      iniciarSesionEmail,
      registrarNuevoUsuario,
      loginExternoOAuth,
      cambiarRolDemoRapido,
      cerrarSesion,
      enviarConsulta,
      responderConsulta,
      cambiarEstadoConsulta,
      guardarProyecto,
      eliminarProyecto,
      toggleActivoProyecto,
      registrarVistaProyecto,
      registrarDemoEjecutada,
      guardarServicio,
      eliminarServicio,
      toggleActivoServicio,
      toggleEstadoUsuario,
      cambiarRolUsuario,
      eliminarUsuario,
      simularTraficoEnVivo,
    ],
  );

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
}
