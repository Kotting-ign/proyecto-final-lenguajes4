# Design System Master File — Kodexa Squad Portfolio

> **SOURCE OF TRUTH:** Tokens oficiales del Anteproyecto / Manual de Diseño y Estilo (`docs/MANUAL-DISENO-Y-ESTILO.md`).

---

## Global Rules

### 1. Paleta de Colores (`#HEX` — Regla 60-30-10)

| Rol | Código HEX | Variable CSS (`@theme`) | Uso Principal |
|---|---|---|---|
| **Background Principal (60%)** | `#F8F7F4` | `--color-cream-50` | Lienzo principal cálido (Alabaster Warm) |
| **Background Secundario** | `#EFECE6` | `--color-cream-100` | Alternancia de secciones, chips neutros, hovers suaves |
| **Surface (Cards/Modales)** | `#FFFFFF` | `--color-surface` | Tarjetas de proyectos, tablas, formularios, modales |
| **Primary / Brand (30%)** | `#0F172A` | `--color-brand-900` | Encabezados, barra superior, bloques de código, footer |
| **Primary Light** | `#1E293B` | `--color-brand-700` | Superficies oscuras secundarias, bordes en modo oscuro |
| **Accent / CTA (10%)** | `#F59E0B` | `--color-accent-500` | **Exclusivo CTAs principales**, indicadores en vivo y highlights |
| **Accent Hover** | `#D97706` | `--color-accent-600` | Estado hover de botones primarios |
| **Text Primary** | `#0F172A` | `--color-text-primary` | Texto principal (contraste > 15:1 sobre `#F8F7F4`) |
| **Text Secondary** | `#475569` | `--color-text-secondary` | Subtítulos, metadatos, descripciones (contraste > 5.8:1) |
| **Border** | `#CBD5E1` | `--color-border` | Líneas divisorias, bordes de inputs y cards |
| **Destructive** | `#DC2626` | `--color-destructive` | Errores de validación y acciones de borrado |

### 2. Colores Semánticos de Estado (`StatusBadge` únicamente)

| Variante | Dot / Indicador | Texto Fuerte | Semántica |
|---|---|---|---|
| `success` | `#16A34A` | `#15803D` | Autenticado, Demo Desbloqueada, Respondido, Activo |
| `warning` | `#D97706` | `#B45309` | Requiere Registro, Consulta Pendiente |
| `info` | `#2563EB` | `#1D4ED8` | En Revisión, Categoría Técnica, OAuth Google |
| `purple` | `#7C3AED` | `#6D28D9` | Rol Admin, Servicio Fullstack, OAuth GitHub |
| `danger` | `#DC2626` | `#B91C1C` | Cuenta Suspendida, Error Crítico |

### 3. Tipografía y Jerarquía Visual

- **Display / Títulos (`--font-display`):** `Space Grotesk` (700 Bold, uppercase, tracking `-0.02em`)
- **Cuerpo y UI (`--font-sans`):** `Plus Jakarta Sans` (400, 500, 600, 700, 800)
- **Código, Métricas y Terminal (`--font-mono`):** `JetBrains Mono` (400, 600, 700)

| Nivel | Tamaño Desktop | Tamaño Mobile | Peso | Line Height |
|---|---|---|---|---|
| **Hero Display (H1)** | `48px – 60px` | `36px – 40px` | `800` | `0.96` |
| **Título de Sección (H2)** | `32px – 36px` | `26px – 30px` | `800` | `1.05` |
| **Subtítulo Card (H3)** | `20px – 24px` | `18px – 20px` | `800` | `1.15` |
| **Body Estándar** | `16px` | `15px` | `400 – 500` | `1.55` |
| **Metadata / Monospace** | `12px` | `11px` | `600 – 700` | `1.35` |

### 4. Radios, Sombras y Motion

- **Radios:** `--radius-sm: 8px` (inputs), `--radius-md: 12px` (cards/tablas), `--radius-lg: 16px` (modales/bloques), `--radius-pill: 999px` (botones y badges).
- **Sombra de Card:** `0 4px 20px rgba(15, 23, 42, 0.07)`.
- **Motion:** `150ms` (fast), `250ms` (normal), `500ms` (slow), respetando siempre `useReducedMotion()`.
