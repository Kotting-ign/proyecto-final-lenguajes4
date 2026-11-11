# Anteproyecto: Manual de Diseño y Estilo (Manual de Marca / Guía de Estilo)
## Proyecto: KODEXA SQUAD — Portfolio Fullstack (Grupo de 4 Integrantes)
**Materia:** Lenguajes 4 — Trabajo Práctico Integrador

---

## 1. Identidad de Marca y Concepto Visual

- **Nombre del Estudio / Grupo:** **KODEXA SQUAD** (4 Desarrolladores Fullstack).
- **Personalidad Visual:** *"Editorial Tech & Warm Studio"* — Combina la calidez orgánica de un lienzo claro en tono alabastro (`#F8F7F4`) con la precisión técnica de bloques en obsidiana profunda (`#0F172A`), tipografía geométrica audaz y acentos medidos en ámbar eléctrico (`#F59E0B`).
- **Principio Rector (Regla 60-30-10):**
  - **60% Lienzo Cálido y Superficies Claras** (`#F8F7F4`, `#EFECE6`, `#FFFFFF`) para garantizar lectura cómoda y jerarquía limpia.
  - **30% Ancla Visual y Bloques Técnicos** (`#0F172A`, `#1E293B`) en navegación, encabezados, terminales interactivas y pie de página.
  - **10% Acento de Acción Escaso** (`#F59E0B`, `#D97706`) reservado estrictamente para botones CTA principales, indicadores en vivo y elementos interactivos clave.

---

## 2. Paleta de Colores Oficial (`#HEX`)

### 2.1 Colores Primarios, Secundarios y de Acento

| Categoría | Nombre del Token | Código `#HEX` | Rol en la Interfaz | Contraste WCAG |
|---|---|---|---|---|
| **Primario (Brand)** | `--color-brand-900` | `#0F172A` | Títulos principales, barra superior, terminal de código, botones secundarios, footer | **15.4:1** sobre `#F8F7F4` (AAA) |
| **Primario Claro** | `--color-brand-700` | `#1E293B` | Superficies secundarias en bloques oscuros, estados hover | **12.1:1** sobre `#FFFFFF` (AAA) |
| **Secundario (Canvas)** | `--color-cream-50` | `#F8F7F4` | Fondo general de la aplicación | Base |
| **Secundario Alterno** | `--color-cream-100` | `#EFECE6` | Fondos de filtros, chips neutros, separación de bloques | Base |
| **Superficie (Cards)** | `--color-surface` | `#FFFFFF` | Tarjetas de proyectos, tablas administrativas, modales | Base |
| **Acento / CTA** | `--color-accent-500` | `#F59E0B` | Botones de acción primaria (sobre texto `#0F172A`), badges de alerta positiva | **10.2:1** con texto `#0F172A` (AAA) |
| **Acento Hover** | `--color-accent-600` | `#D97706` | Estado hover/active de llamadas a la acción | **8.4:1** con texto `#0F172A` (AAA) |
| **Texto Secundario** | `--color-text-secondary` | `#475569` | Párrafos descriptivos, subtítulos, etiquetas secundarias | **6.8:1** sobre `#F8F7F4` (AA+) |
| **Bordes** | `--color-border` | `#CBD5E1` | Líneas divisorias sutiles de 1px en tarjetas, inputs y tablas | — |

### 2.2 Colores Semánticos de Estado (Exclusivos para `StatusBadge`)

- **Éxito / Desbloqueado (`--color-status-success`):** `#16A34A` (Texto fuerte `#15803D`)
- **Advertencia / Requiere Registro (`--color-status-warning`):** `#D97706` (Texto fuerte `#B45309`)
- **Información / Categoría (`--color-status-info`):** `#2563EB` (Texto fuerte `#1D4ED8`)
- **Rol Admin / Servicio (`--color-status-purple`):** `#7C3AED` (Texto fuerte `#6D28D9`)
- **Peligro / Error de Validación (`--color-status-danger`):** `#DC2626` (Texto fuerte `#B91C1C`)

---

## 3. Tipografía y Jerarquía Tipográfica

El sistema utiliza tres familias tipográficas cargadas mediante `next/font/google`:

1. **Títulos y Encabezados (`--font-display`):** **Space Grotesk**
   - **Pesos:** `700 (Bold)` / `800 (ExtraBold)`
   - **Estilo:** Predominantemente `UPPERCASE`, `letter-spacing: -0.02em`, `line-height: 0.96–1.10`.
   - **Aplicación:** Hero principal (`48px–60px`), títulos de sección (`32px–36px`), títulos de tarjetas (`20px–24px`).
2. **Cuerpo de Texto y Controles UI (`--font-sans`):** **Plus Jakarta Sans**
   - **Pesos:** `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`, `700 (Bold)`
   - **Aplicación:** Párrafos de biografía y casos de estudio (`16px`, `line-height: 1.55`), labels de formularios (`14px Bold`), botones (`14px–16px Bold`).
3. **Código, APIs y Métricas (`--font-mono`):** **JetBrains Mono**
   - **Pesos:** `400 (Regular)`, `600 (SemiBold)`, `700 (Bold)`
   - **Aplicación:** Inspector de GitHub API en vivo, Sandbox de Demos Interactivas, contadores de tráfico y códigos de entidad (`PRJ-001`, `SRV-001`).

---

## 4. Diseño del Portfolio y Prototipado (Layouts Desktop y Mobile)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ BARRA SUPERIOR: Contadores en Vivo (Visitas / Reg.) + Selector de Rol    │
├──────────────────────────────────────────────────────────────────────────┤
│ HEADER: Logo KODEXA SQUAD | Equipo | Stack | Proyectos🔒 | Contacto |CTA │
├───────────────────────────────────┬──────────────────────────────────────┤
│ HERO (7 cols):                    │ TERMINAL ARQUITECTURA (5 cols):      │
│ Headline Display + Badges         │ Roster en vivo de los 4 Integrantes  │
│ CTAs + 4 KPIs del Equipo          │ + Estado de Validación Zod/SQL       │
├───────────────────────────────────┴──────────────────────────────────────┤
│ SECCIÓN 1: EQUIPO FULLSTACK (4 Cards Interactivas + Panel Detalle +      │
│            Inspector GitHub REST API en Vivo + Matriz de Stack)          │
├──────────────────────────────────────────────────────────────────────────┤
│ SECCIÓN 2: PROYECTOS Y DEMOS (Filtros por Categoría e Integrante +       │
│            Gate de Registración Obligatoria + Sandbox Interactivo Modal) │
├──────────────────────────────────────────────────────────────────────────┤
│ SECCIÓN 3: SERVICIOS OFERTADOS + FORMULARIO DE CONTACTO VÍA EMAIL        │
│            (Con Validación Estricta de Campos, Imágenes y PDFs)          │
├──────────────────────────────────────────────────────────────────────────┤
│ RUTA /admin: PANEL OPERADOR (Consultas/Respuestas Email) +               │
│              PROMOCIÓN (CRUD Proyectos/Demos/Servicios, Usuarios, SVG)   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Navegabilidad y Responsividad (Responsive Design)

- **Contenedor Principal:** `max-w-[1200px]` centrado con padding lateral adaptativo (`px-4` en mobile, `px-6` en tablet/desktop).
- **Puntos de Quiebre (Breakpoints):**
  - **Mobile (`< 640px`):** Grilla de 1 columna (`grid-cols-1`), menú hamburguesa desplegable con botones de ancho completo (`w-full`), tablas con desplazamiento horizontal suave (`overflow-x-auto`), touch targets mínimos de `44×44px`.
  - **Tablet (`640px – 1024px`):** Grilla de 2 columnas (`sm:grid-cols-2`, `md:grid-cols-2`) para tarjetas de integrantes, proyectos y servicios.
  - **Desktop (`> 1024px`):** Grilla de 12 columnas en Hero y Detalle de Integrante (`lg:grid-cols-12`) y 4 columnas para las tarjetas de los 4 integrantes y KPIs (`lg:grid-cols-4`).
- **Impresión / Exportación PDF (`@media print`):** Configuración automática de página `A4 portrait` que oculta barras de navegación (`print:hidden`) y formatea los reportes y gráficos del administrador para entrega impresa o en PDF.
