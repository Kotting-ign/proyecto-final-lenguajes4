"use client";

import {
  Activity,
  BarChart3,
  Briefcase,
  Code2,
  Database,
  Download,
  Edit3,
  FileSpreadsheet,
  Inbox,
  MailCheck,
  Plus,
  Printer,
  Reply,
  ShieldAlert,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import { AuthRegistrationModal } from "@/components/auth/AuthRegistrationModal";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import {
  FileUploadValidator,
  type ValidatedAttachment,
} from "@/components/ui/FileUploadValidator";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { usePortfolio } from "@/context/PortfolioContext";
import type {
  CategoriaProyecto,
  ConsultaContacto,
  EstadoConsulta,
  ProyectoPortfolio,
  RolSistema,
  ServicioFullstack,
} from "@/data/portfolio";

type TabAdmin =
  | "consultas"
  | "proyectos"
  | "servicios"
  | "usuarios"
  | "analytics";

export default function AdminDashboardPage() {
  const {
    sesion,
    integrantes,
    consultas,
    proyectos,
    servicios,
    usuariosRegistrados,
    metricasDiarias,
    counterVisitasGenerales,
    counterAccesosRegistrados,
    sincronizandoBd,
    cambiarRolDemoRapido,
    responderConsulta,
    cambiarEstadoConsulta,
    guardarProyecto,
    eliminarProyecto,
    toggleActivoProyecto,
    guardarServicio,
    eliminarServicio,
    toggleActivoServicio,
    toggleEstadoUsuario,
    cambiarRolUsuario,
    eliminarUsuario,
    simularTraficoEnVivo,
  } = usePortfolio();
  const { showToast } = useToast();

  const [tabActiva, setTabActiva] = useState<TabAdmin>("consultas");

  // Filtros Consultas (Operador §1.B + Parametrizadas §4.4)
  const [filtroTipoConsulta, setFiltroTipoConsulta] = useState<string>("Todos");
  const [filtroEstadoConsulta, setFiltroEstadoConsulta] = useState<string>("Todos");
  const [busquedaConsulta, setBusquedaConsulta] = useState<string>("");

  // Filtros Usuarios Registrados (§4.2)
  const [busquedaUsuario, setBusquedaUsuario] = useState<string>("");
  const [filtroMetodoUsuario, setFiltroMetodoUsuario] = useState<string>("Todos");

  // Modal Responder Consulta por Email
  const [consultaAResponder, setConsultaAResponder] =
    useState<ConsultaContacto | null>(null);
  const [operadorRespuesta, setOperadorRespuesta] = useState<string>(
    "Ignacio (Tech Lead)",
  );
  const [textoRespuesta, setTextoRespuesta] = useState<string>("");
  const [errorRespuesta, setErrorRespuesta] = useState<string>("");

  // Modal CRUD Proyecto + Demo (Promoción §4.1)
  const [modalProyectoAbierto, setModalProyectoAbierto] = useState(false);
  const [proyectoEditandoId, setProyectoEditandoId] = useState<number | undefined>(
    undefined,
  );
  const [prjCodigo, setPrjCodigo] = useState("PRJ-005");
  const [prjTitulo, setPrjTitulo] = useState("");
  const [prjCategoria, setPrjCategoria] =
    useState<CategoriaProyecto>("ERP / SaaS");
  const [prjResumen, setPrjResumen] = useState("");
  const [prjDescripcion, setPrjDescripcion] = useState("");
  const [prjArquitectura, setPrjArquitectura] = useState("");
  const [prjStack, setPrjStack] = useState("Next.js 16, TypeScript, PostgreSQL, Tailwind v4");
  const [prjEndpointDemo, setPrjEndpointDemo] = useState("GET /api/v1/demo-status");
  const [prjInstruccionesDemo, setPrjInstruccionesDemo] = useState(
    "Ejecutá el endpoint interactivo para verificar la respuesta JSON del servidor.",
  );
  const [prjImagenUrl, setPrjImagenUrl] = useState(
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
  );
  const [prjImagenArchivo, setPrjImagenArchivo] =
    useState<ValidatedAttachment | null>(null);
  const [erroresProyecto, setErroresProyecto] = useState<Record<string, string>>(
    {},
  );

  // Modal CRUD Servicio (Promoción §4.1)
  const [modalServicioAbierto, setModalServicioAbierto] = useState(false);
  const [servicioEditandoId, setServicioEditandoId] = useState<number | undefined>(
    undefined,
  );
  const [srvCodigo, setSrvCodigo] = useState("SRV-005");
  const [srvTitulo, setSrvTitulo] = useState("");
  const [srvCategoria, setSrvCategoria] = useState<
    ServicioFullstack["categoria"]
  >("Desarrollo End-to-End");
  const [srvDescripcion, setSrvDescripcion] = useState("");
  const [srvPrecio, setSrvPrecio] = useState("1500");
  const [srvSemanas, setSrvSemanas] = useState("4");
  const [erroresServicio, setErroresServicio] = useState<Record<string, string>>(
    {},
  );

  // Filtros Parametrizados de Analytics (Promoción §4.4)
  const [fechaDesde, setFechaDesde] = useState("2026-10-15");
  const [fechaHasta, setFechaHasta] = useState("2026-10-31");
  const [filtroCatAnalytics, setFiltroCatAnalytics] = useState<string>("Todas");
  const [filtroTipoAnalytics, setFiltroTipoAnalytics] = useState<string>("Todos");

  const consultasFiltradas = consultas.filter((c) => {
    if (filtroTipoConsulta !== "Todos" && c.tipoConsulta !== filtroTipoConsulta)
      return false;
    if (filtroEstadoConsulta !== "Todos" && c.estado !== filtroEstadoConsulta)
      return false;
    if (busquedaConsulta.trim()) {
      const q = busquedaConsulta.toLowerCase();
      return (
        c.nombreCompleto.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.asunto.toLowerCase().includes(q) ||
        c.empresa.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const usuariosFiltrados = usuariosRegistrados.filter((u) => {
    if (
      filtroMetodoUsuario !== "Todos" &&
      u.metodoAuth !== filtroMetodoUsuario.toLowerCase()
    ) {
      return false;
    }
    if (busquedaUsuario.trim()) {
      const q = busquedaUsuario.toLowerCase();
      return (
        u.nombre.toLowerCase().includes(q) ||
        u.apellido.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.empresa.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const metricasFiltradas = metricasDiarias.filter(
    (m) => m.fecha >= fechaDesde && m.fecha <= fechaHasta,
  );

  const consultasAnalyticsFiltradas = consultas.filter((c) => {
    if (filtroTipoAnalytics !== "Todos" && c.tipoConsulta !== filtroTipoAnalytics)
      return false;
    return true;
  });

  const proyectosAnalyticsFiltrados = proyectos.filter((p) => {
    if (filtroCatAnalytics !== "Todas" && p.categoria !== filtroCatAnalytics)
      return false;
    return true;
  });

  const handleEnviarRespuestaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultaAResponder) return;
    if (textoRespuesta.trim().length < 15) {
      setErrorRespuesta(
        "La respuesta por correo debe tener al menos 15 caracteres detallados.",
      );
      return;
    }
    responderConsulta(
      consultaAResponder.id,
      operadorRespuesta,
      textoRespuesta.trim(),
    );
    showToast(
      "success",
      `Respuesta guardada en BD y enviada por correo a ${consultaAResponder.email}. Estado: Respondido.`,
    );
    setTextoRespuesta("");
    setErrorRespuesta("");
    setConsultaAResponder(null);
  };

  const abrirNuevoProyecto = () => {
    setProyectoEditandoId(undefined);
    setPrjCodigo(`PRJ-00${proyectos.length + 1}`);
    setPrjTitulo("");
    setPrjResumen("");
    setPrjDescripcion("");
    setPrjArquitectura("");
    setPrjInstruccionesDemo(
      "Ejecutá el endpoint interactivo para verificar la respuesta JSON del servidor.",
    );
    setPrjImagenArchivo(null);
    setErroresProyecto({});
    setModalProyectoAbierto(true);
  };

  const abrirEditarProyecto = (p: ProyectoPortfolio) => {
    setProyectoEditandoId(p.id);
    setPrjCodigo(p.codigo);
    setPrjTitulo(p.titulo);
    setPrjCategoria(p.categoria);
    setPrjResumen(p.resumenPublico);
    setPrjDescripcion(p.descripcionCompleta);
    setPrjArquitectura(p.arquitecturaDetalle);
    setPrjStack(p.stack.join(", "));
    setPrjEndpointDemo(p.demoSpec.endpointSimulado);
    setPrjInstruccionesDemo(p.demoSpec.instrucciones);
    setPrjImagenUrl(p.imagenPortadaUrl);
    setPrjImagenArchivo(null);
    setErroresProyecto({});
    setModalProyectoAbierto(true);
  };

  const handleGuardarProyecto = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (prjTitulo.trim().length < 5) {
      errs.titulo = "El título del proyecto debe tener al menos 5 caracteres.";
    }
    if (prjResumen.trim().length < 20) {
      errs.resumen = "El resumen público debe tener al menos 20 caracteres.";
    }
    if (prjDescripcion.trim().length < 25) {
      errs.descripcion =
        "La descripción técnica (protegida) debe tener al menos 25 caracteres.";
    }
    if (!prjImagenArchivo && !/^https?:\/\/.+/.test(prjImagenUrl.trim())) {
      errs.imagen =
        "Debés subir un archivo de imagen validado o proveer una URL https:// válida.";
    }
    setErroresProyecto(errs);
    if (Object.keys(errs).length > 0) return;

    guardarProyecto(
      {
        codigo: prjCodigo.trim(),
        titulo: prjTitulo.trim(),
        categoria: prjCategoria,
        resumenPublico: prjResumen.trim(),
        descripcionCompleta: prjDescripcion.trim(),
        arquitecturaDetalle:
          prjArquitectura.trim() ||
          "Arquitectura en capas Next.js + PostgreSQL + Validación Zod.",
        desafioTecnico:
          "Escalabilidad concurrente y validación de integridad de datos de extremo a extremo.",
        solucionImplementada:
          "Diseño modular con contratos tipados y componentes UI accesibles.",
        metricasImpacto: [
          "100% tipado estricto TypeScript",
          "Validación Zod en cliente y servidor",
        ],
        stack: prjStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        imagenPortadaUrl: prjImagenArchivo?.previewUrl ?? prjImagenUrl.trim(),
        dimensionesImagen: prjImagenArchivo?.dimensiones
          ? `${prjImagenArchivo.dimensiones.ancho}×${prjImagenArchivo.dimensiones.alto}`
          : "1000×650",
        repoUrl: "https://github.com/kodexa-squad",
        demoLiveUrl: "https://kodexa-squad.vercel.app",
        integrantesIds: [1, 2, 3, 4],
        destacado: true,
        activo: true,
        demoSpec: {
          tipoDemo: "api-tester",
          instrucciones: prjInstruccionesDemo.trim(),
          endpointSimulado: prjEndpointDemo.trim(),
          payloadEjemplo: JSON.stringify(
            { proyecto: prjCodigo, timestamp: new Date().toISOString() },
            null,
            2,
          ),
          respuestaEsperada: JSON.stringify(
            { ok: true, status: 200, mensaje: "Demo ejecutada correctamente" },
            null,
            2,
          ),
        },
      },
      proyectoEditandoId,
    );

    setModalProyectoAbierto(false);
    showToast(
      "success",
      proyectoEditandoId
        ? "Proyecto y Demo Interactiva actualizados en la Base de Datos."
        : "Nuevo Proyecto y Demo Interactiva persistidos en la Base de Datos.",
    );
  };

  const handleGuardarServicio = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (srvTitulo.trim().length < 5) {
      errs.titulo = "El título del servicio debe tener al menos 5 caracteres.";
    }
    if (srvDescripcion.trim().length < 15) {
      errs.descripcion = "La descripción debe tener al menos 15 caracteres.";
    }
    const precioNum = Number(srvPrecio);
    if (Number.isNaN(precioNum) || precioNum < 100) {
      errs.precio = "El precio base debe ser un número mayor o igual a USD 100.";
    }
    setErroresServicio(errs);
    if (Object.keys(errs).length > 0) return;

    guardarServicio(
      {
        codigo: srvCodigo.trim(),
        titulo: srvTitulo.trim(),
        categoria: srvCategoria,
        descripcion: srvDescripcion.trim(),
        entregables: [
          "Arquitectura Fullstack documentada",
          "Código fuente validado (lint + tsc)",
          "Despliegue en entorno cloud",
        ],
        tiempoEstimadoSemanas: Math.max(1, Number(srvSemanas) || 3),
        precioBaseUsd: precioNum,
        integranteLiderId: 1,
        activo: true,
      },
      servicioEditandoId,
    );

    setModalServicioAbierto(false);
    showToast(
      "success",
      servicioEditandoId
        ? "Servicio actualizado en la Base de Datos."
        : "Nuevo servicio fullstack guardado en la Base de Datos.",
    );
  };

  // Exportación CSV con BOM UTF-8 (Patrón ExportActions de Huellitas Felices)
  const exportarAnalyticsCSV = () => {
    const encabezados = [
      "Fecha",
      "Visitas Generales",
      "Accesos Usuarios Registrados",
      "Nuevos Registros",
      "Consultas Recibidas",
      "Demos Ejecutadas",
    ];
    const filas = metricasFiltradas.map((m) =>
      [
        m.fecha,
        m.visitasGenerales,
        m.accesosUsuariosRegistrados,
        m.nuevosRegistros,
        m.consultasRecibidas,
        m.demosEjecutadas,
      ].join(","),
    );
    const csvContent = "\uFEFF" + [encabezados.join(","), ...filas].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_analytics_kodexa_${fechaDesde}_${fechaHasta}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("success", "Reporte CSV exportado con codificación UTF-8 BOM.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />
      <AuthRegistrationModal />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 sm:px-6">
        {/* Banner informativo si está en modo Visitante */}
        {(sesion.rol === "visitante" || sesion.rol === "registrado") && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-md border border-status-warning/40 bg-status-warning/10 p-4">
            <div className="flex items-center gap-3">
              <ShieldAlert
                className="h-6 w-6 shrink-0 text-status-warning-strong"
                aria-hidden="true"
              />
              <div className="text-xs">
                <p className="font-bold text-brand-900">
                  Estás viendo el Panel de Gestión con rol &ldquo;{sesion.rol.toUpperCase()}&rdquo;.
                </p>
                <p className="text-text-secondary">
                  Para la exposición del TP podés activar el rol{" "}
                  <strong>Administrador (Promoción Directa)</strong> con un solo clic:
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                cambiarRolDemoRapido("admin");
                showToast(
                  "success",
                  "Rol Administrador activado. Todas las funciones de Promoción Directa habilitadas.",
                );
              }}
            >
              Activar Rol Administrador Ahora
            </Button>
          </div>
        )}

        {/* Encabezado y KPIs Globales (Counters exigidos en §4.3) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase text-text-secondary">
                Secciones 1.B (Operador) y 4 (Promoción Directa Administrador)
              </span>
              <StatusBadge
                variant={sincronizandoBd ? "warning" : "success"}
                icon={Database}
                label={
                  sincronizandoBd
                    ? "Sincronizando con BD..."
                    : "Base de Datos Conectada (Persistencia Activa)"
                }
              />
            </div>
            <h1 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-brand-900">
              Centro de Control — Operador & Administrador
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                simularTraficoEnVivo();
                showToast(
                  "success",
                  "Se simularon y guardaron en BD nuevas visitas, registros y demos.",
                );
              }}
            >
              <Activity className="h-4 w-4" aria-hidden="true" />
              Simular Tráfico en Vivo (+Visitas BD)
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              Imprimir / Exportar PDF A4
            </Button>
          </div>
        </div>

        {/* 4 Tarjetas KPI con Counters Oficiales del PDF */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-border border-l-4 border-l-brand-900 bg-surface p-5 shadow-card">
            <span className="text-xs font-bold uppercase text-text-secondary">
              Counter de Visitas Generales
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <strong className="font-display text-3xl font-extrabold text-brand-900">
                {counterVisitasGenerales.toLocaleString("es-AR")}
              </strong>
              <StatusBadge variant="info" label="Tráfico Total" />
            </div>
            <p className="mt-1 text-xs text-text-secondary">
              Persiste en BD en cada recarga real (§4.3.a)
            </p>
          </div>

          <div className="rounded-md border border-border border-l-4 border-l-accent-500 bg-surface p-5 shadow-card">
            <span className="text-xs font-bold uppercase text-text-secondary">
              Counter Usuarios Registrados
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <strong className="font-display text-3xl font-extrabold text-brand-900">
                {counterAccesosRegistrados.toLocaleString("es-AR")}
              </strong>
              <StatusBadge variant="success" label={`${usuariosRegistrados.length} Cuentas`} />
            </div>
            <p className="mt-1 text-xs text-text-secondary">
              Accesos autenticados a proyectos/demos (§4.3.b)
            </p>
          </div>

          <div className="rounded-md border border-border border-l-4 border-l-status-purple bg-surface p-5 shadow-card">
            <span className="text-xs font-bold uppercase text-text-secondary">
              Consultas y Cotizaciones
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <strong className="font-display text-3xl font-extrabold text-brand-900">
                {consultas.length}
              </strong>
              <StatusBadge
                variant="warning"
                label={`${consultas.filter((c) => c.estado === "Pendiente").length} Pendientes`}
              />
            </div>
            <p className="mt-1 text-xs text-text-secondary">
              Bandeja del Operador con respuesta por Email (§1.B)
            </p>
          </div>

          <div className="rounded-md border border-border border-l-4 border-l-status-success bg-surface p-5 shadow-card">
            <span className="text-xs font-bold uppercase text-text-secondary">
              Catálogo CRUD Activo
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <strong className="font-display text-3xl font-extrabold text-brand-900">
                {proyectos.length} Prj · {servicios.length} Srv
              </strong>
              <StatusBadge variant="purple" label="CRUD + BD" />
            </div>
            <p className="mt-1 text-xs text-text-secondary">
              Proyectos, Demos y Servicios ofertados (§4.1)
            </p>
          </div>
        </div>

        {/* Pestañas de Navegación del Panel */}
        <div
          role="tablist"
          aria-label="Módulos de administración"
          className="mt-8 flex flex-wrap gap-2 border-b border-border pb-3 print:hidden"
        >
          {(
            [
              {
                id: "consultas",
                label: "1. Consultas & Respuestas Email (Operador)",
                icon: Inbox,
              },
              {
                id: "proyectos",
                label: "2. CRUD Proyectos & Demos",
                icon: Code2,
              },
              {
                id: "servicios",
                label: "3. CRUD Servicios",
                icon: Briefcase,
              },
              {
                id: "usuarios",
                label: "4. Usuarios Registrados",
                icon: Users,
              },
              {
                id: "analytics",
                label: "5. Analytics & Gráficos Parametrizados",
                icon: BarChart3,
              },
            ] as const
          ).map((t) => {
            const Icon = t.icon;
            const activa = tabActiva === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={activa}
                type="button"
                onClick={() => setTabActiva(t.id)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-pill px-4 py-2 text-xs font-extrabold uppercase transition-colors ${
                  activa
                    ? "bg-brand-900 text-cream-50"
                    : "border border-border bg-surface text-text-secondary hover:text-brand-900"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: GESTIÓN DE CONTACTOS Y RESPUESTAS POR EMAIL */}
        {tabActiva === "consultas" && (
          <section className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-3 rounded-md border border-border bg-surface p-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 flex-1">
                <Input
                  label="Buscar por cliente, email o asunto"
                  placeholder="Ej: Lucía, FinTech, PostgreSQL..."
                  value={busquedaConsulta}
                  onChange={(e) => setBusquedaConsulta(e.target.value)}
                />
                <Select
                  label="Filtrar por Tipo de Consulta"
                  value={filtroTipoConsulta}
                  onChange={(e) => setFiltroTipoConsulta(e.target.value)}
                >
                  <option value="Todos">Todos los tipos</option>
                  <option value="Cotización de Proyecto">Cotización de Proyecto</option>
                  <option value="Asesoría Técnica">Asesoría Técnica</option>
                  <option value="Consulta General">Consulta General</option>
                </Select>
                <Select
                  label="Filtrar por Estado"
                  value={filtroEstadoConsulta}
                  onChange={(e) => setFiltroEstadoConsulta(e.target.value)}
                >
                  <option value="Todos">Todos los estados</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Revisión">En Revisión</option>
                  <option value="Respondido">Respondido</option>
                  <option value="Archivado">Archivado</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {consultasFiltradas.map((c) => {
                const devAsignado = integrantes.find(
                  (i) => i.id === c.integranteDestinoId,
                );
                return (
                  <div
                    key={c.id}
                    className="rounded-md border border-border bg-surface p-5 shadow-card"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusBadge
                            variant={
                              c.estado === "Respondido"
                                ? "success"
                                : c.estado === "Pendiente"
                                  ? "warning"
                                  : "info"
                            }
                            label={c.estado}
                          />
                          <StatusBadge variant="purple" label={c.tipoConsulta} />
                          {c.presupuestoUsd && (
                            <span className="font-mono text-xs font-extrabold text-brand-900">
                              Presupuesto: USD {c.presupuestoUsd.toLocaleString("es-AR")}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 font-display text-lg font-extrabold uppercase text-brand-900">
                          #{c.id} · {c.asunto}
                        </h3>
                        <p className="text-xs text-text-secondary">
                          De: <strong>{c.nombreCompleto}</strong> ({c.email} · {c.telefono}) —
                          Empresa: <strong>{c.empresa}</strong> · Destino:{" "}
                          <strong>
                            {devAsignado
                              ? `${devAsignado.nombre} (${devAsignado.rolPrincipal})`
                              : "Todo el Equipo (4 Integrantes)"}
                          </strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Select
                          aria-label={`Cambiar estado de consulta ${c.id}`}
                          value={c.estado}
                          onChange={(e) =>
                            cambiarEstadoConsulta(c.id, e.target.value as EstadoConsulta)
                          }
                          className="h-9 min-h-9 text-xs"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En Revisión">En Revisión</option>
                          <option value="Respondido">Respondido</option>
                          <option value="Archivado">Archivado</option>
                        </Select>

                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            setConsultaAResponder(c);
                            setTextoRespuesta(
                              `Hola ${c.nombreCompleto}, gracias por escribir a Kodexa Squad respecto a "${c.asunto}". Revisamos tu solicitud y...`,
                            );
                          }}
                        >
                          <Reply className="h-4 w-4" aria-hidden="true" />
                          Responder por Email
                        </Button>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-text-primary">
                      {c.mensaje}
                    </p>

                    {c.adjuntoNombre && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-sm border border-border bg-cream-50 px-3 py-1.5 font-mono text-xs text-brand-900">
                        <span>📎 Adjunto validado:</span>
                        <strong>{c.adjuntoNombre}</strong>
                        <span>
                          ({c.adjuntoMime} · {c.adjuntoTamanoKb} KB)
                        </span>
                      </div>
                    )}

                    {/* Historial de Respuestas Enviadas por Correo */}
                    {c.respuestas.length > 0 && (
                      <div className="mt-4 flex flex-col gap-2 border-t border-border pt-3">
                        <span className="text-xs font-extrabold uppercase text-status-success-strong">
                          Historial de Seguimiento Enviado por Email:
                        </span>
                        {c.respuestas.map((r) => (
                          <div
                            key={r.id}
                            className="rounded-sm border border-status-success/30 bg-status-success/5 p-3 text-xs"
                          >
                            <div className="flex items-center justify-between font-bold text-brand-900">
                              <span className="inline-flex items-center gap-1.5">
                                <MailCheck
                                  className="h-4 w-4 text-status-success"
                                  aria-hidden="true"
                                />
                                Respondido por {r.operadorNombre}
                              </span>
                              <span className="font-mono text-text-secondary">
                                {r.fechaEnvio.slice(0, 16).replace("T", " ")}
                              </span>
                            </div>
                            <p className="mt-1.5 text-text-primary">{r.mensajeRespuesta}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 2: CRUD DE PROYECTOS Y DEMOS INTERACTIVAS (Promoción #1) */}
        {tabActiva === "proyectos" && (
          <section className="mt-6 flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-surface p-4">
              <div>
                <h2 className="font-display text-lg font-extrabold uppercase text-brand-900">
                  Gestión de Contenido: CRUD Completo de Proyectos y Demos
                </h2>
                <p className="text-xs text-text-secondary">
                  Creá, editá, activá/desactivá o eliminá proyectos y sus endpoints de demo
                  interactiva con persistencia en Base de Datos y validación de imágenes.
                </p>
              </div>
              <Button variant="primary" size="md" onClick={abrirNuevoProyecto}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Nuevo Proyecto + Demo
              </Button>
            </div>

            <div className="overflow-x-auto rounded-md border border-border bg-surface shadow-card">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="border-b border-border bg-cream-50 font-display text-xs font-extrabold uppercase text-brand-900">
                  <tr>
                    <th className="px-4 py-3">Código / Proyecto</th>
                    <th className="px-4 py-3">Categoría</th>
                    <th className="px-4 py-3">Endpoint Demo Interactiva</th>
                    <th className="px-4 py-3">Métricas</th>
                    <th className="px-4 py-3">Visible</th>
                    <th className="px-4 py-3 text-right">Acciones CRUD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {proyectos.map((p) => (
                    <tr key={p.id} className="hover:bg-cream-50/60">
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs font-bold text-text-secondary">
                          {p.codigo}
                        </span>
                        <p className="font-bold text-brand-900">{p.titulo}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge variant="info" label={p.categoria} />
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-brand-900">
                        {p.demoSpec.endpointSimulado}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs">
                        {p.vistasTotales} vistas · {p.demosEjecutadas} demos
                      </td>
                      <td className="px-4 py-3.5">
                        <Switch
                          checked={p.activo}
                          onChange={() => {
                            toggleActivoProyecto(p.id);
                            showToast(
                              "success",
                              `Estado del proyecto ${p.codigo} actualizado en BD.`,
                            );
                          }}
                          ariaLabel={`Activar o desactivar proyecto ${p.titulo}`}
                        />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => abrirEditarProyecto(p)}
                          >
                            <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              eliminarProyecto(p.id);
                              showToast(
                                "success",
                                `Proyecto ${p.codigo} eliminado de la BD.`,
                              );
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Borrar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: CRUD DE SERVICIOS OFERTADOS (Promoción #1) */}
        {tabActiva === "servicios" && (
          <section className="mt-6 flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-surface p-4">
              <div>
                <h2 className="font-display text-lg font-extrabold uppercase text-brand-900">
                  CRUD Completo de Servicios Fullstack Ofertados
                </h2>
                <p className="text-xs text-text-secondary">
                  Administrá los servicios que se exhiben en el portfolio y se precargan en
                  el cotizador por email.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setServicioEditandoId(undefined);
                  setSrvCodigo(`SRV-00${servicios.length + 1}`);
                  setSrvTitulo("");
                  setSrvDescripcion("");
                  setSrvPrecio("1500");
                  setErroresServicio({});
                  setModalServicioAbierto(true);
                }}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Nuevo Servicio
              </Button>
            </div>

            <div className="overflow-x-auto rounded-md border border-border bg-surface shadow-card">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="border-b border-border bg-cream-50 font-display text-xs font-extrabold uppercase text-brand-900">
                  <tr>
                    <th className="px-4 py-3">Código / Servicio</th>
                    <th className="px-4 py-3">Categoría</th>
                    <th className="px-4 py-3">Plazo Estimado</th>
                    <th className="px-4 py-3">Precio Base USD</th>
                    <th className="px-4 py-3">Activo</th>
                    <th className="px-4 py-3 text-right">Acciones CRUD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {servicios.map((s) => (
                    <tr key={s.id} className="hover:bg-cream-50/60">
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs font-bold text-text-secondary">
                          {s.codigo}
                        </span>
                        <p className="font-bold text-brand-900">{s.titulo}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge variant="purple" label={s.categoria} />
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs">
                        {s.tiempoEstimadoSemanas} semanas
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-brand-900">
                        USD {s.precioBaseUsd.toLocaleString("es-AR")}
                      </td>
                      <td className="px-4 py-3.5">
                        <Switch
                          checked={s.activo}
                          onChange={() => toggleActivoServicio(s.id)}
                          ariaLabel={`Activar o desactivar servicio ${s.titulo}`}
                        />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setServicioEditandoId(s.id);
                              setSrvCodigo(s.codigo);
                              setSrvTitulo(s.titulo);
                              setSrvCategoria(s.categoria);
                              setSrvDescripcion(s.descripcion);
                              setSrvPrecio(String(s.precioBaseUsd));
                              setSrvSemanas(String(s.tiempoEstimadoSemanas));
                              setErroresServicio({});
                              setModalServicioAbierto(true);
                            }}
                          >
                            <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              eliminarServicio(s.id);
                              showToast(
                                "success",
                                `Servicio ${s.codigo} eliminado de la BD.`,
                              );
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Borrar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 4: PANEL DE CONTROL DE USUARIOS REGISTRADOS (Promoción #2) */}
        {tabActiva === "usuarios" && (
          <section className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-3 rounded-md border border-border bg-surface p-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-lg font-extrabold uppercase text-brand-900">
                  Registro de Usuarios Autenticados (Acceso a Proyectos y Demos)
                </h2>
                <p className="text-xs text-text-secondary">
                  Control de cuentas generadas mediante base de datos propia u OAuth
                  (Google/GitHub), cambio de rol, suspensión y baja.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 min-w-[360px]">
                <Input
                  label="Buscar usuario o empresa"
                  placeholder="Ej: Lucía, FinTech..."
                  value={busquedaUsuario}
                  onChange={(e) => setBusquedaUsuario(e.target.value)}
                />
                <Select
                  label="Método de Registro"
                  value={filtroMetodoUsuario}
                  onChange={(e) => setFiltroMetodoUsuario(e.target.value)}
                >
                  <option value="Todos">Todos los métodos</option>
                  <option value="propio">Base de Datos Propia</option>
                  <option value="google">Google OAuth 2.0</option>
                  <option value="github">GitHub OAuth</option>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border border-border bg-surface shadow-card">
              <table className="w-full min-w-[960px] text-left text-sm">
                <thead className="border-b border-border bg-cream-50 font-display text-xs font-extrabold uppercase text-brand-900">
                  <tr>
                    <th className="px-4 py-3">ID / Usuario</th>
                    <th className="px-4 py-3">Empresa / Cargo</th>
                    <th className="px-4 py-3">Método Auth</th>
                    <th className="px-4 py-3">Rol Asignado</th>
                    <th className="px-4 py-3">Accesos & Demos Vistas</th>
                    <th className="px-4 py-3">Estado Cuenta</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {usuariosFiltrados.map((u) => (
                    <tr key={u.id} className="hover:bg-cream-50/60">
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-brand-900">
                          #{u.id} · {u.nombre} {u.apellido}
                        </p>
                        <span className="font-mono text-xs text-text-secondary">
                          {u.email}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        <strong className="text-brand-900">{u.empresa}</strong>
                        <span className="block text-text-secondary">{u.cargo}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge
                          variant={
                            u.metodoAuth === "google"
                              ? "info"
                              : u.metodoAuth === "github"
                                ? "purple"
                                : "neutral"
                          }
                          label={u.metodoAuth.toUpperCase()}
                        />
                      </td>
                      <td className="px-4 py-3.5">
                        <Select
                          aria-label={`Rol de ${u.email}`}
                          value={u.rol}
                          onChange={(e) => {
                            cambiarRolUsuario(
                              u.id,
                              e.target.value as Exclude<RolSistema, "visitante">,
                            );
                            showToast(
                              "success",
                              `Rol de ${u.email} actualizado en BD.`,
                            );
                          }}
                          className="h-9 min-h-9 text-xs"
                        >
                          <option value="registrado">Registrado</option>
                          <option value="operador">Operador</option>
                          <option value="admin">Administrador</option>
                        </Select>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs">
                        <strong>{u.accesosTotales}</strong> accesos ·{" "}
                        {u.proyectosDesbloqueados.length} proyectos
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={u.estado === "Activo"}
                            onChange={() => {
                              toggleEstadoUsuario(u.id);
                              showToast(
                                "success",
                                `Estado de ${u.email} cambiado a ${
                                  u.estado === "Activo" ? "Suspendido" : "Activo"
                                }.`,
                              );
                            }}
                            ariaLabel={`Cambiar estado de ${u.email}`}
                          />
                          <StatusBadge
                            variant={u.estado === "Activo" ? "success" : "danger"}
                            label={u.estado}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            eliminarUsuario(u.id);
                            showToast(
                              "success",
                              `Usuario ${u.email} eliminado de la BD.`,
                            );
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 5: ANALYTICS, CONTADORES Y GRÁFICOS PARAMETRIZADOS (Promoción #3 y #4) */}
        {tabActiva === "analytics" && (
          <section className="mt-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-md border border-border bg-surface p-5 lg:flex-row lg:items-end lg:justify-between print:hidden">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 flex-1">
                <Input
                  label="Fecha Desde"
                  type="date"
                  value={fechaDesde}
                  max={fechaHasta}
                  onChange={(e) => setFechaDesde(e.target.value)}
                />
                <Input
                  label="Fecha Hasta"
                  type="date"
                  value={fechaHasta}
                  min={fechaDesde}
                  onChange={(e) => setFechaHasta(e.target.value)}
                />
                <Select
                  label="Tipo de Consulta"
                  value={filtroTipoAnalytics}
                  onChange={(e) => setFiltroTipoAnalytics(e.target.value)}
                >
                  <option value="Todos">Todos los tipos</option>
                  <option value="Cotización de Proyecto">Cotización de Proyecto</option>
                  <option value="Asesoría Técnica">Asesoría Técnica</option>
                  <option value="Consulta General">Consulta General</option>
                </Select>
                <Select
                  label="Categoría de Proyecto"
                  value={filtroCatAnalytics}
                  onChange={(e) => setFiltroCatAnalytics(e.target.value)}
                >
                  <option value="Todas">Todas las categorías</option>
                  <option value="ERP / SaaS">ERP / SaaS</option>
                  <option value="FinTech & Analytics">FinTech & Analytics</option>
                  <option value="Realtime & APIs">Realtime & APIs</option>
                  <option value="E-Commerce & Cloud">E-Commerce & Cloud</option>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={exportarAnalyticsCSV}
                >
                  <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
                  Exportar CSV (UTF-8)
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => window.print()}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Exportar Reporte PDF A4
                </Button>
              </div>
            </div>

            <AnalyticsCharts
              metricas={metricasFiltradas}
              consultas={consultasAnalyticsFiltradas}
              proyectos={proyectosAnalyticsFiltrados}
            />
          </section>
        )}
      </main>

      {/* MODAL RESPONDER CONSULTA POR EMAIL */}
      {consultaAResponder && (
        <Modal
          open={Boolean(consultaAResponder)}
          onClose={() => setConsultaAResponder(null)}
          title={`Responder por Email a ${consultaAResponder.nombreCompleto}`}
          icon={<Reply className="h-5 w-5 text-brand-900" aria-hidden="true" />}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleEnviarRespuestaEmail} className="flex flex-col gap-4">
            <div className="rounded-sm bg-cream-50 p-3 text-xs text-text-secondary">
              <p>
                <strong>Para:</strong> {consultaAResponder.email} ({consultaAResponder.empresa})
              </p>
              <p className="mt-1">
                <strong>Asunto original:</strong> {consultaAResponder.asunto}
              </p>
            </div>

            <Select
              label="Integrante que firma la respuesta"
              value={operadorRespuesta}
              onChange={(e) => setOperadorRespuesta(e.target.value)}
            >
              {integrantes.map((dev) => (
                <option
                  key={dev.id}
                  value={`${dev.nombre} (${dev.rolPrincipal})`}
                >
                  {dev.nombre} — {dev.rolPrincipal}
                </option>
              ))}
            </Select>

            <Textarea
              label="Cuerpo del Correo de Respuesta / Seguimiento"
              requiredMark
              value={textoRespuesta}
              onChange={(e) => setTextoRespuesta(e.target.value)}
              error={errorRespuesta}
              hint="Al confirmar, se envía el correo y la consulta pasa automáticamente a estado Respondido en la BD."
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setConsultaAResponder(null)}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Enviar Correo y Guardar en BD
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL CRUD PROYECTO + DEMO INTERACTIVA */}
      <Modal
        open={modalProyectoAbierto}
        onClose={() => setModalProyectoAbierto(false)}
        title={
          proyectoEditandoId
            ? "Editar Proyecto y Demo Interactiva"
            : "Crear Nuevo Proyecto y Demo Interactiva"
        }
        icon={<Code2 className="h-5 w-5 text-brand-900" aria-hidden="true" />}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleGuardarProyecto} noValidate className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              label="Código"
              requiredMark
              value={prjCodigo}
              onChange={(e) => setPrjCodigo(e.target.value)}
            />
            <div className="sm:col-span-2">
              <Select
                label="Categoría"
                value={prjCategoria}
                onChange={(e) =>
                  setPrjCategoria(e.target.value as CategoriaProyecto)
                }
              >
                <option value="ERP / SaaS">ERP / SaaS</option>
                <option value="FinTech & Analytics">FinTech & Analytics</option>
                <option value="Realtime & APIs">Realtime & APIs</option>
                <option value="E-Commerce & Cloud">E-Commerce & Cloud</option>
              </Select>
            </div>
          </div>

          <Input
            label="Título del Proyecto"
            requiredMark
            placeholder="Ej: MediCloud — Historia Clínica Digital"
            value={prjTitulo}
            onChange={(e) => setPrjTitulo(e.target.value)}
            error={erroresProyecto.titulo}
          />

          <Textarea
            label="Resumen Público (Visible para Visitantes)"
            requiredMark
            value={prjResumen}
            onChange={(e) => setPrjResumen(e.target.value)}
            error={erroresProyecto.resumen}
          />

          <Textarea
            label="Descripción Técnica Completa (Desbloqueable con Registro Obligatorio)"
            requiredMark
            value={prjDescripcion}
            onChange={(e) => setPrjDescripcion(e.target.value)}
            error={erroresProyecto.descripcion}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Stack (separado por comas)"
              value={prjStack}
              onChange={(e) => setPrjStack(e.target.value)}
            />
            <Input
              label="Endpoint de Demo Interactiva"
              value={prjEndpointDemo}
              onChange={(e) => setPrjEndpointDemo(e.target.value)}
            />
          </div>

          <Input
            label="Instrucciones de la Demo Interactiva"
            value={prjInstruccionesDemo}
            onChange={(e) => setPrjInstruccionesDemo(e.target.value)}
          />

          <FileUploadValidator
            label="Subir Imagen de Portada del Proyecto (Validación Estricta de Imagen)"
            onlyImages
            value={prjImagenArchivo}
            onChange={setPrjImagenArchivo}
            error={erroresProyecto.imagen}
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalProyectoAbierto(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar Proyecto y Demo en BD
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL CRUD SERVICIO */}
      <Modal
        open={modalServicioAbierto}
        onClose={() => setModalServicioAbierto(false)}
        title={
          servicioEditandoId
            ? "Editar Servicio Fullstack"
            : "Nuevo Servicio Fullstack"
        }
        icon={<Briefcase className="h-5 w-5 text-brand-900" aria-hidden="true" />}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleGuardarServicio} noValidate className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Código"
              requiredMark
              value={srvCodigo}
              onChange={(e) => setSrvCodigo(e.target.value)}
            />
            <Select
              label="Categoría"
              value={srvCategoria}
              onChange={(e) =>
                setSrvCategoria(e.target.value as ServicioFullstack["categoria"])
              }
            >
              <option value="Desarrollo End-to-End">Desarrollo End-to-End</option>
              <option value="Arquitectura & Back">Arquitectura & Back</option>
              <option value="UX/UI & Design Systems">UX/UI & Design Systems</option>
              <option value="Consultoría & Auditoría">Consultoría & Auditoría</option>
            </Select>
          </div>

          <Input
            label="Título del Servicio"
            requiredMark
            value={srvTitulo}
            onChange={(e) => setSrvTitulo(e.target.value)}
            error={erroresServicio.titulo}
          />

          <Textarea
            label="Descripción del Servicio"
            requiredMark
            value={srvDescripcion}
            onChange={(e) => setSrvDescripcion(e.target.value)}
            error={erroresServicio.descripcion}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Precio Base (USD)"
              type="number"
              requiredMark
              value={srvPrecio}
              onChange={(e) => setSrvPrecio(e.target.value)}
              error={erroresServicio.precio}
            />
            <Input
              label="Tiempo Estimado (Semanas)"
              type="number"
              requiredMark
              value={srvSemanas}
              onChange={(e) => setSrvSemanas(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalServicioAbierto(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar Servicio en BD
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
