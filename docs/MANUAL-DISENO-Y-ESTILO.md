## 1. Paleta de Colores (#HEX)

El sistema visual utiliza una distribución cromática **60-30-10** para equilibrar legibilidad, contraste técnico y jerarquía de llamadas a la acción:

- **60% Colores Secundarios (Lienzo y Superficies Claras):** `#F8F7F4`, `#EFECE6` y `#FFFFFF`.
- **30% Colores Primarios (Identidad y Bloques Técnicos):** `#0F172A` y `#1E293B`.
- **10% Colores de Acento (Llamadas a la Acción / CTAs):** `#F59E0B` y `#D97706`.

### 1.1 Colores Primarios, Secundarios y de Acento

| Categoría | Nombre / Token CSS | Código `#HEX` | Aplicación en la Interfaz | Contraste WCAG |
|---|---|---|---|---|
| **Primario** | `Obsidian Slate` (`--color-brand-900`) | `#0F172A` | Encabezados principales, barra superior, bloques de código/terminal, botones secundarios y pie de página | 15.4:1 sobre `#F8F7F4` (AAA) |
| **Primario Secundario** | `Deep Slate` (`--color-brand-700`) | `#1E293B` | Superficies internas en bloques oscuros, bordes de terminal y estados `hover` | 12.1:1 sobre `#FFFFFF` (AAA) |
| **Secundario (Fondo Base)** | `Alabaster Warm` (`--color-cream-50`) | `#F8F7F4` | Fondo general de la página principal y de las páginas de perfil técnico | Base |
| **Secundario Alterno** | `Warm Sand` (`--color-cream-100`) | `#EFECE6` | Chips de tecnologías, fondos de barras de progreso, selectores y separadores suaves | Base |
| **Secundario (Superficie)** | `Pure Surface` (`--color-surface`) | `#FFFFFF` | Tarjetas de integrantes, proyectos, servicios, formularios, modales y tablas | Base |
| **Acento Principal** | `Electric Amber` (`--color-accent-500`) | `#F59E0B` | Botones CTA primarios, indicadores activos, íconos destacados y badges de acento | 10.2:1 con texto `#0F172A` (AAA) |
| **Acento Hover** | `Deep Amber` (`--color-accent-600`) | `#D97706` | Estado `hover` y `active` de los botones de acción primaria | 8.4:1 con texto `#0F172A` (AAA) |
| **Texto Principal** | `Primary Ink` (`--color-text-primary`) | `#0F172A` | Títulos, etiquetas de formulario y texto de lectura principal | 15.4:1 sobre `#F8F7F4` (AAA) |
| **Texto Secundario** | `Muted Slate` (`--color-text-secondary`) | `#475569` | Subtítulos, biografías, descripciones técnicas y metadatos | 6.8:1 sobre `#F8F7F4` (AA+) |
| **Bordes y Divisores** | `Soft Border` (`--color-border`) | `#CBD5E1` | Líneas divisorias de `1px` en tarjetas, inputs, grillas y tablas | — |

### 1.2 Colores Semánticos de Estado y Validación

| Estado | Token CSS | Código `#HEX` (Base / Texto Fuerte) | Uso en el Sistema |
|---|---|---|---|
| **Éxito / Disponible** | `--color-status-success` | `#16A34A` / `#15803D` | Confirmación de envío por EmailJS, estado disponible de integrante y validaciones correctas |
| **Advertencia / Bloqueo** | `--color-status-warning` | `#D97706` / `#B45309` | Aviso de registración obligatoria en proyectos y demos para visitantes no autenticados |
| **Peligro / Error** | `--color-status-danger` | `#DC2626` / `#B91C1C` | Mensajes de error en validación estricta de formularios, archivos e imágenes |
| **Información / Categoría** | `--color-status-info` | `#2563EB` / `#1D4ED8` | Etiquetas de categoría de proyecto (`ERP / SaaS`, `FinTech`, `Realtime & APIs`) e hitos de trayectoria |
| **Destacado / Rol** | `--color-status-purple` | `#7C3AED` / `#6D28D9` | Etiquetas de rol del equipo y categorías de servicios fullstack |

---

## 2. Tipografía

El sistema tipográfico combina tres familias cargadas mediante `next/font/google`, asignando cada fuente a una función específica dentro de la interfaz:

### 2.1 Familias Tipográficas y Pesos

1. **Fuente de Títulos y Encabezados (`--font-display`):** **Space Grotesk**
   - **Pesos utilizados:** `700 (Bold)` y `800 (ExtraBold)`.
   - **Características:** Geométrica, en mayúsculas (`uppercase`), con `letter-spacing: -0.02em` y `line-height` compacto (`0.96` a `1.15`).
2. **Fuente de Subtítulos, Cuerpo de Texto e Interfaz (`--font-sans`):** **Plus Jakarta Sans**
   - **Pesos utilizados:** `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`, `700 (Bold)` y `800 (ExtraBold)`.
   - **Características:** Alta legibilidad en párrafos extensos, formularios, botones y tablas.
3. **Fuente Técnica de Código, Métricas y APIs (`--font-mono`):** **JetBrains Mono**
   - **Pesos utilizados:** `400 (Regular)`, `600 (SemiBold)` y `700 (Bold)`.
   - **Características:** Monoespaciada para bloques de código, payloads JSON de las demos interactivas, respuestas en vivo de la GitHub REST API, porcentajes de dominio y contadores.

### 2.2 Jerarquía Tipográfica

| Nivel Jerárquico | Fuente | Peso | Tamaño (Mobile → Desktop) | Interlineado | Uso Principal |
|---|---|---|---|---|---|
| **H1 · Título Hero** | Space Grotesk | `800 (ExtraBold)` | `36px (2.25rem)` → `60px (3.75rem)` | `0.96 – 0.98` | Titular principal de la Home y nombre del integrante en su página de perfil técnico |
| **H2 · Título de Sección** | Space Grotesk | `800 (ExtraBold)` | `30px (1.875rem)` → `36px (2.25rem)` | `1.10` | Encabezados de sección (*Equipo Fullstack*, *Stack Fullstack*, *Proyectos & Demos*, *Servicios*, *Contacto*) |
| **H3 · Título de Tarjeta / Subsección** | Space Grotesk | `800 (ExtraBold)` | `18px (1.125rem)` → `20px (1.25rem)` | `1.20` | Nombres en tarjetas de integrantes, títulos de proyectos, servicios y categorías de habilidades |
| **Subtítulo / Eyebrow Técnico** | JetBrains Mono | `700 (Bold)` | `12px (0.75rem)` | `1.40` | Etiquetas superiores de sección en mayúsculas y metadatos de rol/código (`PRJ-001`, `SRV-001`) |
| **Cuerpo Principal (Body Lg / Base)** | Plus Jakarta Sans | `400 / 500` | `16px (1rem)` → `18px (1.125rem)` | `1.55 – 1.65` | Resumen profesional, biografías técnicas, descripción de casos de estudio y experiencia |
| **Cuerpo Secundario (Body Sm)** | Plus Jakarta Sans | `400 / 600` | `14px (0.875rem)` | `1.50` | Descripciones en tarjetas, listas de entregables, labels e inputs de formularios |
| **Código / Badges / Telemetría** | JetBrains Mono | `600 / 700` | `11px – 12px` | `1.45` | Chips de tecnologías, terminal interactiva, JSON de demos y panel de GitHub API |

---

## 3. Diseño del Portfolio y Prototipado (Layouts e Interfaz Visual)

La solución plantea una arquitectura multipágina con **1 Página Principal (`/`)**, **4 Páginas de Perfil Técnico Individual (`/equipo/[slug]`)** y **1 Panel de Operador / Gestión (`/admin`)**, conectadas por una estructura común (`SiteShell`: barra de navegación superior, modal de autenticación y pie de página).

### 3.1 Layout de la Página Principal (`/`)

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ BARRA SUPERIOR: Estado del Sistema + Contadores + Simulador de Rol           │
├──────────────────────────────────────────────────────────────────────────────┤
│ NAVBAR STICKY: Logo KODEXA SQUAD | Equipo | Stack | Proyectos | Servicios    │
│                | Contacto Email | Panel Operador | Botón Registro / Sesión   │
├──────────────────────────────────────┬───────────────────────────────────────┤
│ HERO (7 columnas):                   │ TERMINAL DEL EQUIPO (5 columnas):     │
│ • Título H1 + Descripción del Squad  │ • Ventana `kodexa-squad://equipo.ts`  │
│ • CTAs: Conocer al equipo /          │ • Accesos directos a los 4 perfiles   │
│   Proyectos y Demos / Registrarme    │   técnicos individuales               │
│ • 4 KPIs (4 Devs, Demos, Visitas)    │ • Indicadores: Zod + MIME, SQL        │
├──────────────────────────────────────┴───────────────────────────────────────┤
│ SECCIÓN 1 · EQUIPO FULLSTACK (Grilla de 4 Tarjetas Interactivas):            │
│ [ 1. Ignacio Kotting ] [ 2. Agustín Vazques ] [ 3. Valentina Salas ]         │
│ [ 4. Jeremías Torres ]  → Cada tarjeta enlaza a su página `/equipo/[slug]`   │
├──────────────────────────────────────────────────────────────────────────────┤
│ SECCIÓN 2 · EXPERIENCIA DEL EQUIPO + MATRIZ DE STACK FULLSTACK:              │
│ • Línea de tiempo vertical con hitos de proyectos y formación                │
│ • Filtro interactivo por categoría (Frontend, Backend, BD, DevOps) +         │
│   Tarjetas con barras de progreso animadas                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ SECCIÓN 3 · PROYECTOS Y DEMOS (Con Registración Obligatoria):                │
│ • Filtros combinados por Categoría y por Integrante                          │
│ • Grilla 2x2 de Proyectos: los visitantes no registrados ven la vista previa │
│   bloqueada; al registrarse acceden al Modal con Caso de Estudio completo y  │
│   Sandbox para ejecutar la Demo Interactiva en vivo                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ SECCIÓN 4 · SERVICIOS OFERTADOS + FORMULARIO DE CONTACTO VÍA EMAIL (EmailJS):│
│ • Catálogo de 4 servicios con botón "Cotizar este Servicio" (autocompleta)   │
│ • Formulario de 2 columnas con selector "Dirigido a" (Carlos Pacheco y los   │
│   4 integrantes con sus correos vinculados), validación estricta de campos,  │
│   validador de archivos/imágenes (MIME, peso y dimensiones px) y envío real  │
│   mediante EmailJS API                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ FOOTER: Identidad del grupo + Enlaces directos a los 4 perfiles + Secciones  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Layout de las 4 Páginas de Perfil Técnico Individual (`/equipo/[slug]`)

Cada integrante cuenta con su propia página dedicada:
- `/equipo/ignacio-kotting` (**Ignacio Kotting** — Tech Lead & Frontend / UI Engineer)
- `/equipo/agustin-vazques` (**Agustín Vazques** — Backend & Database Engineer)
- `/equipo/valentina-salas` (**Valentina Salas** — Integraciones, Autenticación & DevOps)
- `/equipo/jeremias-torres` (**Jeremías Torres** — Data Viz, Analytics & QA Engineer)

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB: ← Inicio / Equipo / [Nombre y Apellido del Integrante]           │
├──────────────────────────────────────┬───────────────────────────────────────┤
│ CABECERA DEL INTEGRANTE (7 cols):    │ FICHA TÉCNICA TERMINAL (5 cols):      │
│ • Avatar con iniciales + Badges      │ • `perfil://[slug].ts`                │
│ • Nombre H1 + Rol Principal + Bio    │ • Rol, email, especialidad y chips    │
│ • Botones: Contactar (preselecciona  │   del stack principal                 │
│   al integrante en el formulario),   │                                       │
│   Copiar email (Clipboard API) y     │                                       │
│   Compartir perfil (Web Share API)   │                                       │
├──────────────────────────────────────┴───────────────────────────────────────┤
│ SOBRE MÍ Y HERRAMIENTAS: Resumen técnico + Logros destacados (7 cols)        │
│                          + Herramientas e intereses técnicos (5 cols)        │
├──────────────────────────────────────────────────────────────────────────────┤
│ MATRIZ DE HABILIDADES TÉCNICAS: Grilla de 3 columnas agrupada por área       │
│ con barras de nivel animadas y porcentaje de dominio                         │
├──────────────────────────────────────┬───────────────────────────────────────┤
│ RESPONSABILIDADES EN EL EQUIPO       │ LÍNEA DE TIEMPO DE EXPERIENCIA        │
│ (5 columnas)                         │ (7 columnas: proyectos y formación)   │
├──────────────────────────────────────┴───────────────────────────────────────┤
│ PROYECTOS DEL INTEGRANTE: Tarjetas de proyectos en los que participó         │
│ (respetando el bloqueo por registración obligatoria para ver detalle y demo) │
├──────────────────────────────────────────────────────────────────────────────┤
│ INTEGRACIÓN WEB API · GITHUB REST API EN VIVO:                               │
│ Consulta en tiempo real a `api.github.com/users/{usuario}` mostrando         │
│ repositorios públicos, seguidores y últimos repositorios actualizados        │
├──────────────────────────────────────────────────────────────────────────────┤
│ CTA DE CONTACTO DIRECTO + PAGINADOR CIRCULAR (← Anterior | Siguiente →)      │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Layout del Panel de Operador (`/admin`)

- **Gestión de Contactos y Consultas:** Listado filtrable por texto y por estado (`Pendiente`, `En Revisión`, `Respondido`, `Archivado`) con visualización del remitente, empresa, destinatario asignado, presupuesto y archivo adjunto verificado.
- **Gestión de Respuestas por Correo Electrónico:** Modal de respuesta donde el operador selecciona quién firma, redacta el mensaje, lo envía por correo electrónico mediante **EmailJS** y actualiza automáticamente el estado de la consulta a `Respondido` con historial de seguimiento.

---

## 4. Navegabilidad y Responsividad (Responsive Design)

### 4.1 Arquitectura de Navegación

1. **Navegación Global Persistente (`Navbar`):**
   - Permanencia superior (`sticky top-0`) con desenfoque de fondo (`backdrop-blur-md`).
   - Enlaces de anclaje suave (`scroll-behavior: smooth` con `scroll-margin-top` para evitar solapamiento) hacia `#equipo`, `#stack`, `#proyectos`, `#servicios` y `#contacto`, más acceso al panel `/admin` y al modal de registración/login.
2. **Navegación Multipágina entre Home y Perfiles (`/equipo/[slug]`):**
   - Desde la página principal se accede al perfil técnico de cualquiera de los 4 integrantes desde las tarjetas de la sección **Equipo**, desde la **Terminal del Hero**, desde los **avatares de autores** en cada proyecto y desde el **Footer**.
   - Cada perfil individual incluye **migas de pan (breadcrumbs)** para volver al inicio, un **paginador inferior (Anterior / Siguiente + píldoras de acceso rápido a los 4 integrantes)** y botones de contacto que redirigen a `/#contacto` dejando preseleccionado a ese integrante en el campo *"Dirigido a"*.
3. **Flujo de Registración Obligatoria en Proyectos y Demos:**
   - Como **Visitante no registrado**, los proyectos muestran un indicador de *"Requiere registro"* y al intentar abrirlos se despliega el modal de registración/inicio de sesión (en base de datos propia o con proveedores externos Google / GitHub).
   - Una vez **autenticado**, desaparecen los avisos de bloqueo y se habilita la apertura del caso de estudio completo junto con la ejecución del sandbox de la demo interactiva.

### 4.2 Adaptación Responsiva para Pantallas de PC y Dispositivos Móviles

El diseño aplica una estrategia **Mobile-First** sobre un contenedor central de `max-w-[1200px]` con márgenes laterales adaptativos (`px-4` en celulares y `px-6` en pantallas mayores):

| Dispositivo / Breakpoint | Rango de Pantalla | Comportamiento del Layout y Componentes |
|---|---|---|
| **Móviles / Celulares (`base`)** | `< 640px` | • **Navegación:** Se oculta la barra horizontal de enlaces y se activa el botón **menú hamburguesa** (`44×44px`) con panel desplegable vertical y botones de ancho completo (`w-full`).<br>• **Grillas:** Todas las secciones pasan a **1 sola columna (`grid-cols-1`)** para lectura vertical sin scroll horizontal.<br>• **Hero y Perfiles:** La columna de texto y la tarjeta terminal se apilan verticalmente; los bloques de código JSON incluyen `overflow-x-auto` contenido.<br>• **Formulario y Modales:** Campos apilados a 1 columna con áreas táctiles mínimas de `44px` de alto (`h-11` / `h-12`). |
| **Tablets (`sm` y `md`)** | `640px – 1023px` | • **Grillas a 2 columnas (`sm:grid-cols-2` / `md:grid-cols-2`):** Las 4 tarjetas de integrantes se organizan en una cuadrícula `2×2`; los proyectos, servicios y matriz de habilidades también se distribuyen en 2 columnas.<br>• **Formulario de contacto:** Los campos cortos (Nombre/Email, Teléfono/Empresa, Tipo/Dirigido a/Presupuesto) se agrupan en filas de 2 y 3 columnas. |
| **Pantallas de PC / Desktop (`lg+`)** | `≥ 1024px` | • **Navegación completa:** Barra horizontal visible con todos los enlaces de sección, estado de sesión y acceso al panel de operador.<br>• **Grilla editorial de 12 columnas (`lg:grid-cols-12`):** El Hero principal, la cabecera de cada perfil técnico, la sección *Sobre mí* y el bloque de Contacto dividen el espacio en proporción `7 columnas / 5 columnas`.<br>• **Grilla de 4 columnas (`lg:grid-cols-4`):** Las 4 tarjetas del equipo fullstack y las 8 tecnologías del stack se despliegan en fila completa de 4 columnas. |
