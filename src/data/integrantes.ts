/**
 * Perfiles técnicos de los 4 integrantes — KODEXA SQUAD.
 *
 * Esta es la ÚNICA fuente de verdad para las páginas `/equipo/[slug]`, las
 * tarjetas del home, el formulario de contacto (destinatario) y el filtro de
 * proyectos. No se persiste en la base JSON: el contenido de los perfiles se
 * edita acá y se versiona con el código.
 *
 * ⚠️ CONTENIDO A REVISAR POR CADA INTEGRANTE (marcado con `TODO(perfil)`):
 *   - `githubUser`: usuario real de GitHub (vacío = el panel muestra "pendiente").
 *   - `linkedinUrl` y `email`: datos de contacto reales.
 *   - `habilidades[].nivel`: autoevaluación 1–100, ajustar a la realidad.
 *   - `trayectoria`: hitos académicos / laborales / de proyectos reales.
 *
 * BACKEND: GET /api/integrantes → tabla `integrante` (+ `habilidad_integrante`,
 * `hito_trayectoria`). Hoy se sirve desde este módulo estático.
 */

import type { HitoTrayectoria, Integrante } from "./portfolio";

export const INTEGRANTES_INICIALES: Integrante[] = [
  {
    id: 1,
    slug: "ignacio-kotting",
    nombre: "Ignacio",
    apellido: "Kotting",
    rolPrincipal: "Tech Lead & Frontend / UI Engineer",
    especialidad: "Next.js · Sistemas de Diseño · Animaciones Interactivas",
    tagline: "Interfaces accesibles, rápidas y consistentes de punta a punta.",
    bio: "Lidera la arquitectura del portfolio y el sistema de diseño del equipo. Se especializa en frontend escalable con Next.js (App Router), componentes accesibles y animaciones fluidas que mejoran la experiencia sin sacrificar rendimiento.",
    email: "ignacioko@hotmail.com",
    githubUser: "kotting-ign",
    linkedinUrl: "https://www.linkedin.com/", // TODO(perfil): URL real
    ubicacion: "Argentina (UTC-3)",
    avatarIniciales: "IK",
    stackPrincipal: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Figma"],
    logrosDestacados: [
      "Definió el sistema de diseño “Editorial Tech & Warm Studio” (tokens, tipografía y regla 60-30-10).",
      "Construyó la librería de componentes UI reutilizables con foco en accesibilidad y teclado.",
    ],
    disponible: true,
    perfilTecnico: {
      resumen: [
        "Ignacio coordina el rumbo técnico del proyecto: decide la estructura de carpetas, las convenciones de código y cómo se conectan las pantallas con los contratos de API.",
        "Su foco está en la capa de presentación: componentes tipados, diseño responsivo mobile-first, microinteracciones con Framer Motion y respeto por `prefers-reduced-motion`.",
      ],
      habilidades: [
        {
          categoria: "Frontend & UI",
          items: [
            { nombre: "Next.js (App Router)", nivel: 88 },
            { nombre: "React 19", nivel: 88 },
            { nombre: "TypeScript", nivel: 82 },
            { nombre: "Tailwind CSS v4", nivel: 90 },
            { nombre: "Framer Motion", nivel: 80 },
          ],
        },
        {
          categoria: "Backend & APIs",
          items: [
            { nombre: "Route Handlers (Next.js)", nivel: 70 },
            { nombre: "Consumo de APIs REST", nivel: 80 },
            { nombre: "Validación con Zod", nivel: 72 },
          ],
        },
        {
          categoria: "Herramientas & Diseño",
          items: [
            { nombre: "Git & GitHub", nivel: 85 },
            { nombre: "Figma / prototipado", nivel: 72 },
            { nombre: "Despliegue en Vercel", nivel: 75 },
          ],
        },
      ],
      herramientas: ["VS Code", "Git", "GitHub", "Figma", "Vercel", "ESLint", "Chrome DevTools"],
      responsabilidades: [
        {
          titulo: "Sistema de diseño y UI",
          descripcion: "Tokens en Tailwind `@theme`, componentes base (Button, Input, Modal, Toast) y manual de estilo.",
        },
        {
          titulo: "Página principal y navegación",
          descripcion: "Hero, navbar responsiva, secciones del home y enrutado hacia los 4 perfiles técnicos.",
        },
        {
          titulo: "Animaciones",
          descripcion: "Transiciones de entrada, barras de dominio animadas y soporte de movimiento reducido.",
        },
      ],
      trayectoria: [
        {
          id: 1,
          periodo: "2026",
          tipo: "proyecto",
          titulo: "Kodexa Squad — Portfolio Fullstack",
          entidad: "TP Integrador · Lenguajes 4",
          descripcion: "Tech Lead y responsable del sistema de diseño, la home y la arquitectura de componentes.",
          tecnologias: ["Next.js", "Tailwind CSS", "Framer Motion"],
        },
        {
          id: 2,
          periodo: "2026",
          tipo: "proyecto",
          titulo: "Huellitas Felices — ERP veterinario",
          entidad: "Proyecto de cursada",
          descripcion: "Diseño del sistema “Pet Bliss” y desarrollo de la capa de componentes del ERP.",
          tecnologias: ["React", "TypeScript", "PostgreSQL"],
        },
        {
          id: 3,
          periodo: "Actual",
          tipo: "academico",
          titulo: "Cursada de Lenguajes 4",
          entidad: "Universidad", // TODO(perfil): institución / carrera reales
          descripcion: "Desarrollo web fullstack, bases de datos y trabajo colaborativo con Git.",
          tecnologias: ["JavaScript", "SQL", "Git"],
        },
      ],
      intereses: ["Accesibilidad web", "Design systems", "Rendimiento (Core Web Vitals)"],
    },
  },
  {
    id: 2,
    slug: "agustin-vazques",
    nombre: "Agustín",
    apellido: "Vazques",
    rolPrincipal: "Backend & Database Engineer",
    especialidad: "PostgreSQL · Contratos de API · Validación Estricta",
    tagline: "Datos consistentes y APIs que dicen siempre la verdad.",
    bio: "Responsable del modelo de datos y de la capa de servidor. Diseña esquemas relacionales normalizados, endpoints con validación estricta y reglas de integridad que mantienen la información confiable.",
    email: "agustinypaco@gmail.com",
    githubUser: "DaanDaan17",
    linkedinUrl: "https://www.linkedin.com/", // TODO(perfil): URL real
    ubicacion: "Argentina (UTC-3)",
    avatarIniciales: "AV",
    stackPrincipal: ["Node.js", "PostgreSQL", "SQL", "Zod", "REST APIs", "TypeScript"],
    logrosDestacados: [
      "Diseñó el esquema relacional del portfolio (usuarios, consultas, respuestas, proyectos y métricas).",
      "Definió los contratos de API y las validaciones del lado del servidor con Zod.",
    ],
    disponible: true,
    perfilTecnico: {
      resumen: [
        "Agustín se ocupa de todo lo que sucede detrás de la pantalla: el modelo de datos, los endpoints y las reglas que impiden que entre información inválida al sistema.",
        "Trabaja con la premisa de “contrato primero”: cada endpoint se documenta y se valida antes de conectarse a la interfaz.",
      ],
      habilidades: [
        {
          categoria: "Base de Datos",
          items: [
            { nombre: "PostgreSQL", nivel: 82 },
            { nombre: "Modelado relacional (3FN)", nivel: 80 },
            { nombre: "SQL & consultas parametrizadas", nivel: 82 },
          ],
        },
        {
          categoria: "Backend & APIs",
          items: [
            { nombre: "Node.js", nivel: 80 },
            { nombre: "Diseño de APIs REST", nivel: 82 },
            { nombre: "Validación con Zod", nivel: 85 },
            { nombre: "Seguridad básica (hash, sesiones)", nivel: 68 },
          ],
        },
        {
          categoria: "Frontend & Herramientas",
          items: [
            { nombre: "TypeScript", nivel: 80 },
            { nombre: "React / Next.js", nivel: 70 },
            { nombre: "Git & GitHub", nivel: 80 },
          ],
        },
      ],
      herramientas: ["PostgreSQL", "pgAdmin / DBeaver", "Postman / Thunder Client", "Git", "GitHub", "Node.js"],
      responsabilidades: [
        {
          titulo: "Base de datos",
          descripcion: "Script `db/schema.sql`, diccionario de datos y restricciones de integridad.",
        },
        {
          titulo: "API y validaciones del servidor",
          descripcion: "Route Handlers, esquemas Zod y manejo centralizado de errores.",
        },
        {
          titulo: "Persistencia de consultas y registros",
          descripcion: "Almacenamiento de contactos, respuestas, usuarios registrados y contadores.",
        },
      ],
      trayectoria: [
        {
          id: 1,
          periodo: "2026",
          tipo: "proyecto",
          titulo: "Kodexa Squad — Portfolio Fullstack",
          entidad: "TP Integrador · Lenguajes 4",
          descripcion: "Responsable del esquema SQL, los endpoints y las validaciones del servidor.",
          tecnologias: ["PostgreSQL", "Node.js", "Zod"],
        },
        {
          id: 2,
          periodo: "2026",
          tipo: "proyecto",
          titulo: "Huellitas Felices — ERP veterinario",
          entidad: "Proyecto de cursada",
          descripcion: "Modelado relacional del ERP: turnos, stock, caja y cuentas corrientes.",
          tecnologias: ["PostgreSQL", "SQL", "REST"],
        },
        {
          id: 3,
          periodo: "Actual",
          tipo: "academico",
          titulo: "Cursada de Lenguajes 4",
          entidad: "Universidad", // TODO(perfil): institución / carrera reales
          descripcion: "Bases de datos relacionales, APIs y desarrollo fullstack.",
          tecnologias: ["SQL", "JavaScript", "Git"],
        },
      ],
      intereses: ["Arquitectura de datos", "Seguridad de aplicaciones", "Optimización de consultas"],
    },
  },
  {
    id: 3,
    slug: "valentina-salas",
    nombre: "Valentina",
    apellido: "Salas",
    rolPrincipal: "Integraciones, Autenticación & DevOps",
    especialidad: "APIs Web · OAuth · Correo transaccional · Despliegue Cloud",
    tagline: "Conecta el producto con el mundo: servicios, identidad y despliegue.",
    bio: "Se encarga de integrar servicios externos al portfolio: autenticación de usuarios, envío de correos, consumo de APIs públicas y puesta en producción en la nube.",
    email: "valesalas3003@gmail.com",
    githubUser: "vales3003",
    linkedinUrl: "https://www.linkedin.com/", // TODO(perfil): URL real
    ubicacion: "Argentina (UTC-3)",
    avatarIniciales: "VS",
    stackPrincipal: ["TypeScript", "OAuth 2.0", "GitHub API", "Email / SMTP", "Vercel", "Docker"],
    logrosDestacados: [
      "Diseñó el flujo de registración obligatoria (cuenta propia y proveedores externos Google / GitHub).",
      "Integró la GitHub REST API y el circuito de envío y respuesta de consultas por correo.",
    ],
    disponible: true,
    perfilTecnico: {
      resumen: [
        "Valentina trabaja en la frontera del sistema: todo lo que entra o sale hacia servicios de terceros pasa por sus módulos (identidad, correo, APIs públicas).",
        "También lleva el ciclo de entrega: variables de entorno, build reproducible y despliegue en la nube.",
      ],
      habilidades: [
        {
          categoria: "Integraciones & Identidad",
          items: [
            { nombre: "OAuth 2.0 (Google / GitHub)", nivel: 78 },
            { nombre: "Consumo de APIs REST", nivel: 85 },
            { nombre: "Correo transaccional (SMTP / API)", nivel: 75 },
          ],
        },
        {
          categoria: "Backend & Frontend",
          items: [
            { nombre: "TypeScript", nivel: 82 },
            { nombre: "Next.js / Route Handlers", nivel: 78 },
            { nombre: "Manejo de errores y reintentos", nivel: 72 },
          ],
        },
        {
          categoria: "DevOps & Calidad",
          items: [
            { nombre: "Despliegue en Vercel / Render", nivel: 80 },
            { nombre: "Docker (básico)", nivel: 62 },
            { nombre: "Git & GitHub (flujos de PR)", nivel: 82 },
          ],
        },
      ],
      herramientas: ["GitHub", "Vercel", "Docker", "Postman", "Google Cloud Console", "VS Code"],
      responsabilidades: [
        {
          titulo: "Registración y autenticación",
          descripcion: "Registro propio y login externo para desbloquear proyectos y demos.",
        },
        {
          titulo: "Correo electrónico",
          descripcion: "Envío de consultas desde el formulario y respuestas del operador por mail.",
        },
        {
          titulo: "APIs externas y despliegue",
          descripcion: "GitHub REST API, variables de entorno y publicación en la nube.",
        },
      ],
      trayectoria: [
        {
          id: 1,
          periodo: "2026",
          tipo: "proyecto",
          titulo: "Kodexa Squad — Portfolio Fullstack",
          entidad: "TP Integrador · Lenguajes 4",
          descripcion: "Responsable de autenticación, correo y APIs externas del portfolio.",
          tecnologias: ["OAuth 2.0", "GitHub API", "Vercel"],
        },
        {
          id: 2,
          periodo: "2026",
          tipo: "proyecto",
          titulo: "Huellitas Felices — ERP veterinario",
          entidad: "Proyecto de cursada",
          descripcion: "Autenticación de usuarios, despliegue y verificación de calidad del build.",
          tecnologias: ["TypeScript", "Vercel", "ESLint"],
        },
        {
          id: 3,
          periodo: "Actual",
          tipo: "academico",
          titulo: "Cursada de Lenguajes 4",
          entidad: "Universidad", // TODO(perfil): institución / carrera reales
          descripcion: "Integración de servicios web y desarrollo fullstack colaborativo.",
          tecnologias: ["JavaScript", "APIs", "Git"],
        },
      ],
      intereses: ["Integración de servicios", "Seguridad de identidad", "Automatización de despliegues"],
    },
  },
  {
    id: 4,
    slug: "jeremias-torres",
    nombre: "Jeremías",
    apellido: "Torres",
    rolPrincipal: "Data Viz, Analytics & QA Engineer",
    especialidad: "Gráficos SVG · Panel de gestión · Testing · UX",
    tagline: "Convierte datos y formularios en decisiones claras y confiables.",
    bio: "Desarrolla el panel del operador, las visualizaciones de datos y las validaciones de formularios, archivos e imágenes. También cuida la calidad del producto con pruebas y revisión de usabilidad.",
    email: "torrezgeremias@gmail.com",
    githubUser: "torrezgeremias-cyber",
    linkedinUrl: "https://www.linkedin.com/", // TODO(perfil): URL real
    ubicacion: "Argentina (UTC-3)",
    avatarIniciales: "JT",
    stackPrincipal: ["React 19", "SVG Data Viz", "Tailwind CSS", "Validación de archivos", "Testing", "UX"],
    logrosDestacados: [
      "Implementó el panel de operador para gestionar consultas y responderlas por correo.",
      "Construyó el validador estricto de archivos e imágenes (MIME, peso y resolución mínima).",
    ],
    disponible: true,
    perfilTecnico: {
      resumen: [
        "Jeremías es responsable de que los datos se vean y se validen bien: gráficos propios en SVG, tablas filtrables y formularios que no dejan pasar información inválida.",
        "Además revisa la usabilidad del conjunto aplicando heurísticas de Nielsen y chequeos de accesibilidad.",
      ],
      habilidades: [
        {
          categoria: "Visualización & Panel",
          items: [
            { nombre: "Gráficos SVG nativos", nivel: 80 },
            { nombre: "React 19 (estado y formularios)", nivel: 82 },
            { nombre: "Exportación CSV / PDF", nivel: 72 },
          ],
        },
        {
          categoria: "Validación & Calidad",
          items: [
            { nombre: "Validación de formularios", nivel: 85 },
            { nombre: "Validación de archivos e imágenes", nivel: 82 },
            { nombre: "Testing y revisión manual", nivel: 70 },
          ],
        },
        {
          categoria: "UX & Estilos",
          items: [
            { nombre: "Tailwind CSS", nivel: 82 },
            { nombre: "Heurísticas de usabilidad", nivel: 75 },
            { nombre: "Accesibilidad (WCAG AA)", nivel: 72 },
          ],
        },
      ],
      herramientas: ["Chrome DevTools", "Lighthouse", "Playwright (básico)", "Git", "GitHub", "VS Code"],
      responsabilidades: [
        {
          titulo: "Panel del operador",
          descripcion: "Listado de contactos, filtros, estados y respuesta por correo electrónico.",
        },
        {
          titulo: "Validación estricta",
          descripcion: "Campos de texto, adjuntos e imágenes con feedback accesible (`role=alert`).",
        },
        {
          titulo: "Gráficos y QA",
          descripcion: "Visualizaciones SVG interactivas y revisión de calidad antes de cada entrega.",
        },
      ],
      trayectoria: [
        {
          id: 1,
          periodo: "2026",
          tipo: "proyecto",
          titulo: "Kodexa Squad — Portfolio Fullstack",
          entidad: "TP Integrador · Lenguajes 4",
          descripcion: "Responsable del panel del operador, los gráficos y la validación de formularios.",
          tecnologias: ["React", "SVG", "Zod"],
        },
        {
          id: 2,
          periodo: "2026",
          tipo: "proyecto",
          titulo: "Huellitas Felices — ERP veterinario",
          entidad: "Proyecto de cursada",
          descripcion: "Reportes gerenciales con gráficos SVG y exportación a CSV / PDF.",
          tecnologias: ["React", "SVG", "CSV / PDF"],
        },
        {
          id: 3,
          periodo: "Actual",
          tipo: "academico",
          titulo: "Cursada de Lenguajes 4",
          entidad: "Universidad", // TODO(perfil): institución / carrera reales
          descripcion: "Desarrollo fullstack, bases de datos y calidad de software.",
          tecnologias: ["JavaScript", "SQL", "Testing"],
        },
      ],
      intereses: ["Visualización de datos", "Calidad de software", "Experiencia de usuario"],
    },
  },
];

/** Busca un integrante por el segmento de URL `/equipo/[slug]`. */
export function obtenerIntegrantePorSlug(slug: string): Integrante | undefined {
  return INTEGRANTES_INICIALES.find((i) => i.slug === slug);
}

/** Integrante anterior y siguiente (circular) para la navegación entre perfiles. */
export function obtenerIntegrantesAdyacentes(id: number): {
  anterior: Integrante;
  siguiente: Integrante;
} {
  const total = INTEGRANTES_INICIALES.length;
  const idx = Math.max(
    0,
    INTEGRANTES_INICIALES.findIndex((i) => i.id === id),
  );
  return {
    anterior: INTEGRANTES_INICIALES[(idx - 1 + total) % total],
    siguiente: INTEGRANTES_INICIALES[(idx + 1) % total],
  };
}

export function nombreCompleto(i: Pick<Integrante, "nombre" | "apellido">): string {
  return `${i.nombre} ${i.apellido}`;
}

/**
 * Destinatario principal cuando en el formulario se selecciona "Carlos Pacheco"
 * (reemplaza la opción anterior "Todo el equipo").
 */
export const DESTINATARIO_CARLOS_PACHECO = {
  nombre: "Carlos",
  apellido: "Pacheco",
  nombreCompleto: "Carlos Pacheco",
  email: "capacheco@ucasal.edu.ar",
  rol: "Docente / Cátedra Lenguajes 4",
} as const;

/**
 * Resuelve el nombre completo y el correo electrónico del destinatario de una consulta.
 * - `integranteDestinoId === null` → Carlos Pacheco (capacheco@ucasal.edu.ar)
 * - `integranteDestinoId === 1..4` → el integrante correspondiente con su email real
 */
export function obtenerDestinatarioConsulta(integranteDestinoId: number | null): {
  nombreCompleto: string;
  email: string;
  rol: string;
} {
  if (integranteDestinoId !== null) {
    const dev = INTEGRANTES_INICIALES.find((i) => i.id === integranteDestinoId);
    if (dev) {
      return {
        nombreCompleto: `${dev.nombre} ${dev.apellido}`,
        email: dev.email,
        rol: dev.rolPrincipal,
      };
    }
  }
  return {
    nombreCompleto: DESTINATARIO_CARLOS_PACHECO.nombreCompleto,
    email: DESTINATARIO_CARLOS_PACHECO.email,
    rol: DESTINATARIO_CARLOS_PACHECO.rol,
  };
}

/**
 * Experiencia colectiva del equipo (se muestra en el home).
 * TODO(perfil): completar con hitos reales (proyectos entregados, pasantías, etc.).
 */
export const EXPERIENCIA_EQUIPO: HitoTrayectoria[] = [
  {
    id: 1,
    periodo: "2026",
    tipo: "proyecto",
    titulo: "Kodexa Squad — Portfolio Fullstack",
    entidad: "TP Integrador · Lenguajes 4",
    descripcion:
      "Portfolio grupal con perfiles técnicos individuales, proyectos con registración obligatoria, contacto por email y panel de gestión.",
    tecnologias: ["Next.js", "React 19", "Tailwind CSS", "PostgreSQL"],
  },
  {
    id: 2,
    periodo: "2026",
    tipo: "proyecto",
    titulo: "Huellitas Felices — ERP veterinario",
    entidad: "Proyecto de cursada",
    descripcion:
      "Sistema de gestión para clínicas veterinarias: turnos, historia clínica, stock, caja y reportes con gráficos SVG.",
    tecnologias: ["Next.js", "TypeScript", "PostgreSQL", "Zod"],
  },
  {
    id: 3,
    periodo: "Actual",
    tipo: "academico",
    titulo: "Cursada de Lenguajes 4",
    entidad: "Universidad", // TODO(perfil): institución / carrera reales
    descripcion:
      "Desarrollo web fullstack, bases de datos relacionales, consumo de APIs y trabajo colaborativo con Git.",
    tecnologias: ["JavaScript", "SQL", "APIs Web", "Git"],
  },
];
