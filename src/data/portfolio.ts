/**
 * Fuente de datos inicial del Portfolio Fullstack (4 Integrantes) — KODEXA SQUAD.
 *
 * Siguiendo la convención de Huellitas Felices:
 * - Todos los registros poseen `id` numérico (PK de la base de datos SQL).
 * - Cada punto de integración lleva comentario `// BACKEND:` con tabla y endpoint.
 */

export type RolSistema = "visitante" | "registrado" | "operador" | "admin";

export type MetodoAuth = "propio" | "google" | "github";

export type TipoConsulta =
  | "Consulta General"
  | "Cotización de Proyecto"
  | "Asesoría Técnica";

export type EstadoConsulta =
  | "Pendiente"
  | "En Revisión"
  | "Respondido"
  | "Archivado";

export type CategoriaProyecto =
  | "ERP / SaaS"
  | "FinTech & Analytics"
  | "E-Commerce & Cloud"
  | "Realtime & APIs";

export interface Integrante {
  id: number;
  nombre: string;
  apellido: string;
  rolPrincipal: string;
  especialidad: string;
  bio: string;
  email: string;
  githubUser: string;
  linkedinUrl: string;
  ubicacion: string;
  aniosExperiencia: number;
  avatarIniciales: string;
  colorAcento: string;
  stackPrincipal: string[];
  logrosDestacados: string[];
  disponible: boolean;
}

export interface TecnologiaStack {
  id: number;
  nombre: string;
  categoria: "Frontend & UI" | "Backend & APIs" | "Base de Datos" | "DevOps & Testing";
  nivelDominio: number; // 1-100
  descripcionUso: string;
  iconoClave: string;
}

export interface ServicioFullstack {
  id: number;
  codigo: string;
  titulo: string;
  categoria: "Desarrollo End-to-End" | "Arquitectura & Back" | "UX/UI & Design Systems" | "Consultoría & Auditoría";
  descripcion: string;
  entregables: string[];
  tiempoEstimadoSemanas: number;
  precioBaseUsd: number;
  integranteLiderId: number;
  activo: boolean;
}

export interface DemoInteractivaSpec {
  tipoDemo: "api-tester" | "sql-inspector" | "latency-simulator" | "design-tokens";
  instrucciones: string;
  endpointSimulado: string;
  payloadEjemplo: string;
  respuestaEsperada: string;
}

export interface ProyectoPortfolio {
  id: number;
  codigo: string;
  titulo: string;
  categoria: CategoriaProyecto;
  resumenPublico: string;
  // Campos protegidos que requieren Registración Obligatoria para visualizar en detalle:
  descripcionCompleta: string;
  arquitecturaDetalle: string;
  desafioTecnico: string;
  solucionImplementada: string;
  metricasImpacto: string[];
  stack: string[];
  imagenPortadaUrl: string;
  dimensionesImagen: string;
  repoUrl: string;
  demoLiveUrl: string;
  integrantesIds: number[];
  destacado: boolean;
  activo: boolean;
  vistasTotales: number;
  demosEjecutadas: number;
  fechaPublicacion: string;
  demoSpec: DemoInteractivaSpec;
}

export interface RespuestaConsulta {
  id: number;
  consultaId: number;
  operadorNombre: string;
  mensajeRespuesta: string;
  enviadoPorEmail: boolean;
  fechaEnvio: string;
}

export interface ConsultaContacto {
  id: number;
  nombreCompleto: string;
  email: string;
  telefono: string;
  empresa: string;
  tipoConsulta: TipoConsulta;
  integranteDestinoId: number | null; // null = Todo el equipo (4 integrantes)
  presupuestoUsd: number | null;
  asunto: string;
  mensaje: string;
  adjuntoNombre: string | null;
  adjuntoMime: string | null;
  adjuntoTamanoKb: number | null;
  estado: EstadoConsulta;
  fechaCreacion: string;
  respuestas: RespuestaConsulta[];
}

export interface UsuarioRegistrado {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  empresa: string;
  cargo: string;
  metodoAuth: MetodoAuth;
  rol: Exclude<RolSistema, "visitante">;
  estado: "Activo" | "Suspendido";
  accesosTotales: number;
  proyectosDesbloqueados: number[];
  fechaRegistro: string;
  ultimoAcceso: string;
}

export interface MetricaDiaria {
  id: number;
  fecha: string; // YYYY-MM-DD
  visitasGenerales: number;
  accesosUsuariosRegistrados: number;
  nuevosRegistros: number;
  consultasRecibidas: number;
  demosEjecutadas: number;
}

// BACKEND: GET /api/integrantes → tabla integrante (los 4 desarrolladores fullstack del grupo)
export const INTEGRANTES_INICIALES: Integrante[] = [
  {
    id: 1,
    nombre: "Ignacio",
    apellido: "Desarrollador 1",
    rolPrincipal: "Tech Lead & Fullstack Frontend Architect",
    especialidad: "Next.js App Router · Sistemas de Diseño · Animaciones Interactivas",
    bio: "Especialista en arquitectura frontend escalable, componentes accesibles (WCAG AA) y conexión de flujos complejos con APIs REST y Server Actions.",
    email: "ignacio@kodexasquad.dev",
    githubUser: "vercel",
    linkedinUrl: "https://linkedin.com",
    ubicacion: "Argentina (UTC-3)",
    aniosExperiencia: 4,
    avatarIniciales: "IG",
    colorAcento: "#0F172A",
    stackPrincipal: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Framer Motion", "PostgreSQL"],
    logrosDestacados: [
      "Lideró el sistema de diseño Pet Bliss y la arquitectura de 72 componentes en Huellitas Felices.",
      "Redujo el tiempo de carga LCP en un 42% aplicando SSR e hidratación selectiva.",
    ],
    disponible: true,
  },
  {
    id: 2,
    nombre: "Franco",
    apellido: "Desarrollador 2",
    rolPrincipal: "Lead Backend & Database Architect",
    especialidad: "PostgreSQL · Contratos de API · Seguridad & Validación Estricta",
    bio: "Ingeniero enfocado en modelado relacional SQL, procedimientos almacenados, triggers transaccionales y arquitectura en 5 capas (types, schema, repo, service, mapper).",
    email: "franco@kodexasquad.dev",
    githubUser: "supabase",
    linkedinUrl: "https://linkedin.com",
    ubicacion: "Argentina (UTC-3)",
    aniosExperiencia: 4,
    avatarIniciales: "FR",
    colorAcento: "#1E293B",
    stackPrincipal: ["Node.js", "PostgreSQL", "Zod", "TypeScript", "SQL Triggers", "REST APIs"],
    logrosDestacados: [
      "Diseñó un esquema relacional de 38 tablas con auditoría automática y códigos SQLSTATE personalizados.",
      "Implementó autenticación con bloqueo por intentos fallidos y protección de sesiones HTTP-Only.",
    ],
    disponible: true,
  },
  {
    id: 3,
    nombre: "Valentina",
    apellido: "Desarrolladora 3",
    rolPrincipal: "Fullstack Cloud, APIs & DevOps Engineer",
    especialidad: "Integración de APIs Web · OAuth · Despliegue Cloud & Testing",
    bio: "Desarrolladora fullstack orientada a la integración de servicios externos (GitHub API, Email/SMTP, OAuth 2.0), pipelines CI/CD y resiliencia en la nube.",
    email: "valentina@kodexasquad.dev",
    githubUser: "nodejs",
    linkedinUrl: "https://linkedin.com",
    ubicacion: "Argentina (UTC-3)",
    aniosExperiencia: 3,
    avatarIniciales: "VA",
    colorAcento: "#0F172A",
    stackPrincipal: ["TypeScript", "NextAuth / OAuth", "Docker", "GitHub API", "Playwright", "Vercel"],
    logrosDestacados: [
      "Automatizó la verificación de renderizado con headless browser y pipelines de calidad.",
      "Integró motores de notificación transaccional por correo con plantillas parametrizadas.",
    ],
    disponible: true,
  },
  {
    id: 4,
    nombre: "Mateo",
    apellido: "Desarrollador 4",
    rolPrincipal: "Fullstack Analytics, Data Viz & UX Engineer",
    especialidad: "Gráficos Interactivos SVG · Telemetría · Heurísticas UX",
    bio: "Especialista en visualización de datos interactiva sin dependencias pesadas, métricas en tiempo real, auditoría heurística (Nielsen/Krug) y validación de archivos.",
    email: "mateo@kodexasquad.dev",
    githubUser: "tailwindlabs",
    linkedinUrl: "https://linkedin.com",
    ubicacion: "Argentina (UTC-3)",
    aniosExperiencia: 3,
    avatarIniciales: "MA",
    colorAcento: "#1E293B",
    stackPrincipal: ["React 19", "SVG Data Viz", "SQL Analytics", "Tailwind CSS", "Web APIs", "UX Heuristics"],
    logrosDestacados: [
      "Desarrolló motores de gráficos SVG nativos para reportes gerenciales y análisis de rentabilidad.",
      "Implementó exportación nativa a CSV (UTF-8 BOM) y PDF (A4 print-ready) sin librerías externas.",
    ],
    disponible: true,
  },
];

// BACKEND: GET /api/stack → tabla tecnologia_stack
export const STACK_TECNOLOGIAS: TecnologiaStack[] = [
  {
    id: 1,
    nombre: "Next.js 16 + React 19",
    categoria: "Frontend & UI",
    nivelDominio: 96,
    descripcionUso: "App Router, Server/Client Components, Suspense boundaries y optimización de rutas.",
    iconoClave: "Layers",
  },
  {
    id: 2,
    nombre: "TypeScript 5 (Strict Mode)",
    categoria: "Frontend & UI",
    nivelDominio: 95,
    descripcionUso: "Contratos tipados de punta a punta entre base de datos, mappers y componentes UI.",
    iconoClave: "FileCode2",
  },
  {
    id: 3,
    nombre: "Tailwind CSS v4 + Design Tokens",
    categoria: "Frontend & UI",
    nivelDominio: 98,
    descripcionUso: "Variables @theme semánticas, regla 60-30-10, responsive design y soporte de impresión A4.",
    iconoClave: "Palette",
  },
  {
    id: 4,
    nombre: "Framer Motion & Web Animations",
    categoria: "Frontend & UI",
    nivelDominio: 92,
    descripcionUso: "Microinteracciones fluidas, transiciones de layout y soporte estricto de prefers-reduced-motion.",
    iconoClave: "Sparkles",
  },
  {
    id: 5,
    nombre: "Node.js & Next Route Handlers",
    categoria: "Backend & APIs",
    nivelDominio: 94,
    descripcionUso: "Arquitectura limpia en 5 capas (types, schema, repo, service, mapper) con manejo centralizado de errores.",
    iconoClave: "Server",
  },
  {
    id: 6,
    nombre: "Zod 4 + Validación de Archivos/Imágenes",
    categoria: "Backend & APIs",
    nivelDominio: 95,
    descripcionUso: "Validación estricta de esquemas, sanitización de inputs, control de MIME, peso y resolución en px.",
    iconoClave: "ShieldCheck",
  },
  {
    id: 7,
    nombre: "PostgreSQL & Supabase",
    categoria: "Base de Datos",
    nivelDominio: 93,
    descripcionUso: "Modelado relacional 3FN, funciones PL/pgSQL, triggers de auditoría y consultas parametrizadas.",
    iconoClave: "Database",
  },
  {
    id: 8,
    nombre: "Git, GitHub CLI & Vercel Cloud",
    categoria: "DevOps & Testing",
    nivelDominio: 91,
    descripcionUso: "Flujos Scrum por Historia de Usuario (HU), verificación estática (lint + tsc) y despliegue continuo.",
    iconoClave: "GitBranch",
  },
];

// BACKEND: GET/POST/PUT/DELETE /api/servicios → tabla servicio_ofertado (CRUD Administrador)
export const SERVICIOS_INICIALES: ServicioFullstack[] = [
  {
    id: 1,
    codigo: "SRV-001",
    titulo: "Desarrollo de Plataformas SaaS & ERP a Medida",
    categoria: "Desarrollo End-to-End",
    descripcion:
      "Construcción integral desde el relevamiento de Historias de Usuario y wireframes hasta el frontend en Next.js y la base de datos relacional en PostgreSQL.",
    entregables: [
      "Sistema de Diseño propio documentado (MASTER + tokens CSS)",
      "Frontend React/Next.js accesible y 100% responsivo",
      "API REST en 5 capas con validación Zod y base SQL",
      "Panel de reportes con exportación a PDF y CSV",
    ],
    tiempoEstimadoSemanas: 6,
    precioBaseUsd: 2400,
    integranteLiderId: 1,
    activo: true,
  },
  {
    id: 2,
    codigo: "SRV-002",
    titulo: "Arquitectura de Base de Datos SQL & APIs de Alto Rendimiento",
    categoria: "Arquitectura & Back",
    descripcion:
      "Diseño de esquemas relacionales robustos, optimización de queries, triggers de integridad transaccional y migración de sistemas legacy.",
    entregables: [
      "Diccionario de datos y DER normalizado",
      "Scripts DDL, funciones y triggers de auditoría",
      "Contratos de API documentados y testeados",
      "Módulo de autenticación segura y control de roles (RBAC)",
    ],
    tiempoEstimadoSemanas: 3,
    precioBaseUsd: 1350,
    integranteLiderId: 2,
    activo: true,
  },
  {
    id: 3,
    codigo: "SRV-003",
    titulo: "Design System, Auditoría UX (Nielsen/Krug) & Animaciones Web",
    categoria: "UX/UI & Design Systems",
    descripcion:
      "Transformación visual e interactiva de productos digitales aplicando heurísticas de usabilidad, animaciones fluidas y componentes reutilizables.",
    entregables: [
      "Manual de Marca y Guía de Estilo completa (#HEX, tipografía, grillas)",
      "Auditoría UX con matriz de severidad y mejoras aplicadas",
      "Librería de componentes UI reutilizables con soporte de teclado",
      "Microinteracciones Framer Motion optimizadas para Core Web Vitals",
    ],
    tiempoEstimadoSemanas: 3,
    precioBaseUsd: 1200,
    integranteLiderId: 4,
    activo: true,
  },
  {
    id: 4,
    codigo: "SRV-004",
    titulo: "Integración de APIs Externas, Pagos, OAuth & Despliegue Cloud",
    categoria: "Consultoría & Auditoría",
    descripcion:
      "Conexión segura con pasarelas de pago, proveedores de identidad (Google/GitHub OAuth), servicios de correo transaccional y monitoreo de tráfico.",
    entregables: [
      "Integración de OAuth 2.0 / JWT y pasarelas de correo",
      "Dashboard de analíticas y contadores de tráfico en tiempo real",
      "Configuración CI/CD y despliegue productivo en Vercel/Render",
      "Documentación técnica de mantenimiento para el cliente",
    ],
    tiempoEstimadoSemanas: 2,
    precioBaseUsd: 950,
    integranteLiderId: 3,
    activo: true,
  },
];

// BACKEND: GET/POST/PUT/DELETE /api/proyectos → tabla proyecto_portfolio + demo_interactiva (CRUD Administrador)
export const PROYECTOS_INICIALES: ProyectoPortfolio[] = [
  {
    id: 1,
    codigo: "PRJ-001",
    titulo: "Huellitas Felices — Sistema ERP de Gestión Veterinaria",
    categoria: "ERP / SaaS",
    resumenPublico:
      "Plataforma integral para clínicas veterinarias con gestión de turnos, agenda semanal, historia clínica inmutable, stock multi-depósito, cuentas corrientes y reportes gerenciales.",
    descripcionCompleta:
      "Desarrollado bajo metodología Scrum con un sistema de diseño propio ('Pet Bliss Style') y más de 70 componentes reutilizables. Integra control de cajas con arqueo en vivo, facturación con desglose automático de IVA, alertas de reposición de stock y dashboard gerencial con actualización en tiempo real.",
    arquitecturaDetalle:
      "Frontend en Next.js 16 + React 19 + Tailwind CSS v4 (@theme) + Framer Motion. Backend estructurado en 5 capas (types, schema con Zod, repo con pg, service transaccional y mapper) sobre PostgreSQL (Supabase) con 38 tablas, triggers de historial de precios e inmutabilidad clínica.",
    desafioTecnico:
      "Garantizar consistencia contable y clínica entre turnos atendidos, insumos médicos descontados del depósito y movimientos de caja en efectivo vs. transferencias.",
    solucionImplementada:
      "Contratos de API estrictos previos al diseño de cada pantalla, triggers PL/pgSQL para cierres automáticos y gráficos SVG nativos sin dependencias externas pesadas.",
    metricasImpacto: [
      "72 componentes UI/módulo reutilizables documentados",
      "38 tablas SQL con integridad referencial y auditoría",
      "100% cumplimiento WCAG AA en contraste y touch targets ≥44px",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "PostgreSQL", "Zod", "Framer Motion"],
    imagenPortadaUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    dimensionesImagen: "1000×650",
    repoUrl: "https://github.com/frqn2003/huellitas-felices",
    demoLiveUrl: "https://huellitas-felices.vercel.app",
    integrantesIds: [1, 2, 3, 4],
    destacado: true,
    activo: true,
    vistasTotales: 342,
    demosEjecutadas: 128,
    fechaPublicacion: "2026-09-29",
    demoSpec: {
      tipoDemo: "api-tester",
      instrucciones:
        "Probá el endpoint simulado de liquidación de turno y verificación de stock crítico del ERP Huellitas Felices.",
      endpointSimulado: "POST /api/turnos/14/liquidar-consulta",
      payloadEjemplo: JSON.stringify(
        {
          turnoId: 14,
          paciente: "Rex (Canino)",
          practica: "Consulta Clínica General",
          insumosAplicados: [{ articuloId: 102, nombre: "Vacuna Séxtuple", cantidad: 1, precioUnitario: 18500 }],
          medioPago: "Efectivo",
        },
        null,
        2,
      ),
      respuestaEsperada: JSON.stringify(
        {
          ok: true,
          comprobanteNumero: "FC-B-0004-00001892",
          subtotal: 33500,
          iva21: 7035,
          totalFacturado: 40535,
          impactoStock: "Descontada 1 u. de Depósito Central (Stock restante: 24 u.)",
          impactoCaja: "Ingreso registrado en Caja Apertura #8 (+ARS 40.535)",
        },
        null,
        2,
      ),
    },
  },
  {
    id: 2,
    codigo: "PRJ-002",
    titulo: "PulseMetrics — Motor de Analítica Financiera & Rentabilidad Multi-Sucursal",
    categoria: "FinTech & Analytics",
    resumenPublico:
      "Suite de inteligencia de negocios con gráficos interactivos de barras apiladas, curvas de evolución diaria, ranking de sucursales y exportación contable instantánea.",
    descripcionCompleta:
      "Permite a directores financieros comparar ingresos vs. egresos operativos (proveedores y caja chica) de múltiples sucursales en ventanas de tiempo parametrizadas, detectando desvíos de margen bruto al instante.",
    arquitecturaDetalle:
      "Motor de visualización construido 100% en SVG reactivo con cálculos vectoriales en cliente, respaldado por consultas SQL parametrizadas con agregaciones temporales (`DATE_TRUNC`) y exportación directa con UTF-8 BOM para Excel.",
    desafioTecnico:
      "Renderizar comparativas mensuales y acumuladas con tooltips precisos sin cargar librerías de gráficos de 300 KB que degraden el rendimiento en móviles.",
    solucionImplementada:
      "Componentes SVG modulares (`TrendChart`, `AccumulatedBarChart`) con escalado dinámico y hojas de estilo `@media print` para reportes PDF ejecutivos en hoja A4.",
    metricasImpacto: [
      "0 KB de dependencias externas para gráficos",
      "< 45 ms de tiempo de respuesta en consultas agregadas",
      "Exportación instantánea a CSV y PDF nativo A4",
    ],
    stack: ["React 19", "TypeScript", "SVG Data Viz", "PostgreSQL", "Tailwind CSS"],
    imagenPortadaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    dimensionesImagen: "1000×650",
    repoUrl: "https://github.com/kodexa-squad/pulse-metrics",
    demoLiveUrl: "https://pulse-metrics-demo.vercel.app",
    integrantesIds: [2, 4],
    destacado: true,
    activo: true,
    vistasTotales: 256,
    demosEjecutadas: 94,
    fechaPublicacion: "2026-10-08",
    demoSpec: {
      tipoDemo: "sql-inspector",
      instrucciones:
        "Ejecutá la consulta parametrizada de margen bruto por sucursal y observá el plan de ejecución y resultado JSON.",
      endpointSimulado: "GET /api/dashboard/rentabilidad?desde=2026-09-01&hasta=2026-10-31&sucursales=1,2",
      payloadEjemplo: JSON.stringify(
        {
          filtroDesde: "2026-09-01",
          filtroHasta: "2026-10-31",
          sucursalesSeleccionadas: ["Casa Central", "Sucursal Norte"],
          agrupacion: "mensual_acumulado",
        },
        null,
        2,
      ),
      respuestaEsperada: JSON.stringify(
        {
          ok: true,
          kpisGlobales: {
            ingresosTotales: 14850000,
            egresosTotales: 9120000,
            margenNeto: 5730000,
            rentabilidadPorcentaje: "38.58%",
          },
          rankingPodio: [
            { puesto: 1, sucursal: "Casa Central", margen: "41.2%" },
            { puesto: 2, sucursal: "Sucursal Norte", margen: "34.8%" },
          ],
        },
        null,
        2,
      ),
    },
  },
  {
    id: 3,
    codigo: "PRJ-003",
    titulo: "AuthGuard Cloud — Gateway de Identidad, OAuth 2.0 & Auditoría de Sesiones",
    categoria: "Realtime & APIs",
    resumenPublico:
      "Microservicio fullstack de autenticación empresarial con registro propio, login social (Google/GitHub), bloqueo automático por fuerza bruta y segundo factor (2FA).",
    descripcionCompleta:
      "Soluciona la seguridad de acceso en aplicaciones web modernas trasladando toda la validación al servidor con cookies HTTP-Only, registro inmutable en tabla `auditoria_sesion` y políticas de bloqueo temporal sincronizadas por base de datos.",
    arquitecturaDetalle:
      "Next.js API Routes + PostgreSQL + Web Crypto API + Zod. Previene enumeración de usuarios devolviendo mensajes neutros y gestionando el contador de intentos fallidos en la base de datos.",
    desafioTecnico:
      "Evitar que la recarga del navegador reinicie los intentos fallidos o permita saltear el bloqueo temporal de 15 minutos.",
    solucionImplementada:
      "Persistencia de `intentos_fallidos` y `bloqueado_hasta` (timestamp ISO) en PostgreSQL con componente reactivo `BlockedOverlay` sincronizado con el reloj del servidor.",
    metricasImpacto: [
      "Bloqueo automático tras 3 intentos fallidos en servidor",
      "Mitigación 100% de enumeración de cuentas en login",
      "Auditoría completa de IP, user-agent y resultado de sesión",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "OAuth 2.0", "Zod", "Web Crypto API"],
    imagenPortadaUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=80",
    dimensionesImagen: "1000×650",
    repoUrl: "https://github.com/kodexa-squad/authguard-cloud",
    demoLiveUrl: "https://authguard-demo.vercel.app",
    integrantesIds: [1, 2, 3],
    destacado: false,
    activo: true,
    vistasTotales: 198,
    demosEjecutadas: 81,
    fechaPublicacion: "2026-10-15",
    demoSpec: {
      tipoDemo: "latency-simulator",
      instrucciones:
        "Simulá el flujo de verificación de sesión HTTP-Only, evaluación de intentos fallidos y emisión de token seguro.",
      endpointSimulado: "POST /api/auth/verify-handshake",
      payloadEjemplo: JSON.stringify(
        {
          email: "cliente.demo@empresa.com",
          metodo: "oauth_google_pkce",
          deviceFingerprint: "win11-chrome-130-utc-3",
        },
        null,
        2,
      ),
      respuestaEsperada: JSON.stringify(
        {
          status: "authenticated",
          cookieHttpOnly: "kodexa_sid=eyJhbGciOiJIUzI1NiIsInR5cCI6...; HttpOnly; Secure; SameSite=Lax",
          auditoriaId: 4092,
          permisosDesbloqueados: ["VER_DETALLE_PROYECTOS", "EJECUTAR_DEMOS_INTERACTIVAS"],
        },
        null,
        2,
      ),
    },
  },
  {
    id: 4,
    codigo: "PRJ-004",
    titulo: "SupplyFlow OCR — Recepción Inteligente de Comprobantes y Órdenes de Compra",
    categoria: "E-Commerce & Cloud",
    resumenPublico:
      "Plataforma de abastecimiento con validación de archivos PDF/imágenes, extracción asistida de campos de facturas de proveedores y conciliación contra órdenes de compra.",
    descripcionCompleta:
      "Digitaliza el circuito de compras (Solicitudes de Cotización → Comparativa de Proveedores → Orden de Compra → Recepción de Mercadería → Comprobante y Cuenta Corriente) con validación estricta de adjuntos.",
    arquitecturaDetalle:
      "Interfaz con Dropzone validado por MIME y resolución, visor lateral de comprobantes, tablas con filtros reactivos instantáneos y actualización transaccional de cuentas corrientes.",
    desafioTecnico:
      "Validar en cliente y servidor que los archivos subidos por operadores sean imágenes legibles o PDFs íntegros antes de impactar los saldos de cuenta corriente.",
    solucionImplementada:
      "Inspector binario con FileReader + Image() API y esquemas Zod multi-etapa con retroalimentación accesible (`role='alert'`).",
    metricasImpacto: [
      "Reducción del 65% en errores de carga de facturas",
      "Validación previa de resolución mínima y peso máximo",
      "Trazabilidad completa Orden de Compra ↔ Factura ↔ Pago",
    ],
    stack: ["React 19", "Next.js", "FileReader API", "Tailwind v4", "PostgreSQL", "Framer Motion"],
    imagenPortadaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    dimensionesImagen: "1000×650",
    repoUrl: "https://github.com/kodexa-squad/supplyflow-ocr",
    demoLiveUrl: "https://supplyflow-demo.vercel.app",
    integrantesIds: [1, 3, 4],
    destacado: false,
    activo: true,
    vistasTotales: 174,
    demosEjecutadas: 63,
    fechaPublicacion: "2026-10-20",
    demoSpec: {
      tipoDemo: "design-tokens",
      instrucciones:
        "Probá el validador y conciliador automático entre una Orden de Compra emitida y los ítems recibidos del proveedor.",
      endpointSimulado: "POST /api/comprobantes-proveedor/conciliar",
      payloadEjemplo: JSON.stringify(
        {
          ordenCompraId: "OC-2026-0084",
          cuitProveedor: "30-71458921-9",
          adjuntoVerificado: { nombre: "factura_A_0012.pdf", mime: "application/pdf", tamanoKb: 412 },
          lineas: [{ codigo: "INS-044", pedido: 50, recibido: 50, precioUnitario: 4200 }],
        },
        null,
        2,
      ),
      respuestaEsperada: JSON.stringify(
        {
          conciliacion: "EXACTA (100% recibido)",
          estadoOrden: "Recibida Total",
          asientoCuentaCorriente: "Saldo actualizado +ARS 210.000 (Vto: 30 días)",
        },
        null,
        2,
      ),
    },
  },
];

// BACKEND: GET/POST /api/consultas y POST /api/consultas/:id/responder → tablas consulta_contacto y respuesta_consulta
export const CONSULTAS_INICIALES: ConsultaContacto[] = [
  {
    id: 1,
    nombreCompleto: "Dra. Lucía Fernández",
    email: "lucia.fernandez@clinicavetsur.com.ar",
    telefono: "+54 9 11 4589-3321",
    empresa: "Clínica Veterinaria del Sur",
    tipoConsulta: "Cotización de Proyecto",
    integranteDestinoId: 1,
    presupuestoUsd: 2800,
    asunto: "Implementación de sistema de turnos e historia clínica para 3 sucursales",
    mensaje:
      "Hola equipo Kodexa! Vimos la demo de Huellitas Felices y necesitamos cotizar una adaptación para nuestras 3 clínicas con migración de pacientes actuales.",
    adjuntoNombre: "relevamiento_sucursales_2026.pdf",
    adjuntoMime: "application/pdf",
    adjuntoTamanoKb: 640,
    estado: "Respondido",
    fechaCreacion: "2026-10-22T14:30:00Z",
    respuestas: [
      {
        id: 1,
        consultaId: 1,
        operadorNombre: "Ignacio (Tech Lead)",
        mensajeRespuesta:
          "Estimada Dra. Lucía, ¡muchas gracias por contactarnos! Analizamos el PDF adjunto. Podemos implementar el módulo multi-sucursal y migrar su base en 5 semanas. Le enviamos por correo el presupuesto detallado y propuesta de reunión.",
        enviadoPorEmail: true,
        fechaEnvio: "2026-10-22T18:15:00Z",
      },
    ],
  },
  {
    id: 2,
    nombreCompleto: "Ing. Martín Gómez",
    email: "mgomez@fintechlatam.io",
    telefono: "+54 9 351 612-9087",
    empresa: "FinTech Latam S.A.",
    tipoConsulta: "Asesoría Técnica",
    integranteDestinoId: 2,
    presupuestoUsd: 1500,
    asunto: "Auditoría de performance en PostgreSQL y arquitectura de APIs en Next.js",
    mensaje:
      "Necesitamos asesoría técnica de su equipo para optimizar consultas de reportes financieros que hoy demoran más de 8 segundos y estructurar validación con Zod.",
    adjuntoNombre: "metricas_pg_stat.png",
    adjuntoMime: "image/png",
    adjuntoTamanoKb: 385,
    estado: "Pendiente",
    fechaCreacion: "2026-10-24T10:15:00Z",
    respuestas: [],
  },
  {
    id: 3,
    nombreCompleto: "Sofía Peralta",
    email: "sofia@estudiocreativo.ar",
    telefono: "+54 9 11 5902-1140",
    empresa: "Estudio Nexo Digital",
    tipoConsulta: "Consulta General",
    integranteDestinoId: null,
    presupuestoUsd: null,
    asunto: "Disponibilidad del equipo para alianza en proyectos E-Commerce",
    mensaje:
      "Buenas tardes! Queríamos consultar si tienen disponibilidad a partir de noviembre para colaborar en el desarrollo fullstack de dos tiendas online con integración ERP.",
    adjuntoNombre: null,
    adjuntoMime: null,
    adjuntoTamanoKb: null,
    estado: "En Revisión",
    fechaCreacion: "2026-10-25T16:40:00Z",
    respuestas: [],
  },
  {
    id: 4,
    nombreCompleto: "Carlos Rodríguez",
    email: "crodriguez@logisticaandina.com",
    telefono: "+54 9 261 488-7712",
    empresa: "Logística Andina",
    tipoConsulta: "Cotización de Proyecto",
    integranteDestinoId: 4,
    presupuestoUsd: 3200,
    asunto: "Dashboard de trazabilidad de flota y control de cajas por chofer",
    mensaje:
      "Buscamos desarrollar un panel administrativo con gráficos interactivos y exportación a PDF igual al que muestran en su portfolio. Adjunto esquema preliminar.",
    adjuntoNombre: "arquitectura_flota.png",
    adjuntoMime: "image/png",
    adjuntoTamanoKb: 510,
    estado: "Pendiente",
    fechaCreacion: "2026-10-26T09:20:00Z",
    respuestas: [],
  },
];

// BACKEND: GET/POST/PATCH /api/usuarios-registrados → tabla usuario_registrado (Condición de Promoción #2)
export const USUARIOS_REGISTRADOS_INICIALES: UsuarioRegistrado[] = [
  {
    id: 1,
    nombre: "Profesor",
    apellido: "Evaluador Lenguajes 4",
    email: "catedra.lenguajes4@universidad.edu.ar",
    empresa: "Cátedra Lenguajes 4",
    cargo: "Docente Evaluador",
    metodoAuth: "propio",
    rol: "admin",
    estado: "Activo",
    accesosTotales: 18,
    proyectosDesbloqueados: [1, 2, 3, 4],
    fechaRegistro: "2026-10-01",
    ultimoAcceso: "2026-10-26 19:45",
  },
  {
    id: 2,
    nombre: "Lucía",
    apellido: "Fernández",
    email: "lucia.fernandez@clinicavetsur.com.ar",
    empresa: "Clínica Veterinaria del Sur",
    cargo: "Directora Médica",
    metodoAuth: "google",
    rol: "registrado",
    estado: "Activo",
    accesosTotales: 9,
    proyectosDesbloqueados: [1, 2],
    fechaRegistro: "2026-10-12",
    ultimoAcceso: "2026-10-25 11:20",
  },
  {
    id: 3,
    nombre: "Martín",
    apellido: "Gómez",
    email: "mgomez@fintechlatam.io",
    empresa: "FinTech Latam S.A.",
    cargo: "CTO",
    metodoAuth: "github",
    rol: "registrado",
    estado: "Activo",
    accesosTotales: 14,
    proyectosDesbloqueados: [1, 2, 3],
    fechaRegistro: "2026-10-15",
    ultimoAcceso: "2026-10-26 15:10",
  },
  {
    id: 4,
    nombre: "Alejandro",
    apellido: "Vega",
    email: "avega@techrecruiting.com",
    empresa: "IT Talent Global",
    cargo: "Senior Tech Recruiter",
    metodoAuth: "google",
    rol: "registrado",
    estado: "Activo",
    accesosTotales: 6,
    proyectosDesbloqueados: [1, 4],
    fechaRegistro: "2026-10-19",
    ultimoAcceso: "2026-10-24 17:05",
  },
  {
    id: 5,
    nombre: "Usuario",
    apellido: "Prueba Inactivo",
    email: "test.suspendido@correo.com",
    empresa: "Freelance",
    cargo: "Analista",
    metodoAuth: "propio",
    rol: "registrado",
    estado: "Suspendido",
    accesosTotales: 2,
    proyectosDesbloqueados: [1],
    fechaRegistro: "2026-10-20",
    ultimoAcceso: "2026-10-21 09:00",
  },
];

// BACKEND: GET /api/analytics/trafico?desde=&hasta= → tabla metrica_diaria (Condición de Promoción #3 y #4)
export const METRICAS_DIARIAS_INICIALES: MetricaDiaria[] = [
  {
    id: 1,
    fecha: "2026-10-15",
    visitasGenerales: 112,
    accesosUsuariosRegistrados: 28,
    nuevosRegistros: 4,
    consultasRecibidas: 2,
    demosEjecutadas: 19,
  },
  {
    id: 2,
    fecha: "2026-10-17",
    visitasGenerales: 145,
    accesosUsuariosRegistrados: 39,
    nuevosRegistros: 6,
    consultasRecibidas: 3,
    demosEjecutadas: 27,
  },
  {
    id: 3,
    fecha: "2026-10-19",
    visitasGenerales: 168,
    accesosUsuariosRegistrados: 52,
    nuevosRegistros: 7,
    consultasRecibidas: 4,
    demosEjecutadas: 38,
  },
  {
    id: 4,
    fecha: "2026-10-21",
    visitasGenerales: 194,
    accesosUsuariosRegistrados: 64,
    nuevosRegistros: 9,
    consultasRecibidas: 5,
    demosEjecutadas: 49,
  },
  {
    id: 5,
    fecha: "2026-10-23",
    visitasGenerales: 230,
    accesosUsuariosRegistrados: 81,
    nuevosRegistros: 11,
    consultasRecibidas: 6,
    demosEjecutadas: 62,
  },
  {
    id: 6,
    fecha: "2026-10-25",
    visitasGenerales: 278,
    accesosUsuariosRegistrados: 104,
    nuevosRegistros: 15,
    consultasRecibidas: 8,
    demosEjecutadas: 84,
  },
  {
    id: 7,
    fecha: "2026-10-26",
    visitasGenerales: 315,
    accesosUsuariosRegistrados: 126,
    nuevosRegistros: 18,
    consultasRecibidas: 11,
    demosEjecutadas: 97,
  },
];
