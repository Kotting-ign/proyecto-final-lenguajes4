# Inventario de Componentes — Kodexa Squad Portfolio

Índice de los componentes que existen en `src/components/`.

## Compartidos (`src/components/ui/`)

| Componente | Propósito | Props Clave / Notas |
|---|---|---|
| `Button` | Botón pill del sistema | `variant`: primary (ámbar CTA) / secondary (obsidian) / outline / ghost / destructive · `size`: sm/md/lg/icon |
| `Input` | Input de texto con validación accesible | `label`, `requiredMark`, `error`, `hint`, `aria-invalid`, `aria-describedby` |
| `Textarea` | Área de texto multilínea validada | `label`, `requiredMark`, `error`, `hint` |
| `Select` | Selector nativo accesible | `label`, `requiredMark`, `error`, `hint` |
| `StatusBadge` | Etiqueta semántica con punto o ícono | `variant`: success/warning/danger/info/neutral/purple + `label`, `icon?` |
| `Modal` | Ventana modal animada con Framer Motion | `open`, `onClose`, `title`, `icon?`, `footer?`, `maxWidth?`, cierre con `Escape` |
| `Switch` | Interruptor accesible `role="switch"` | `checked`, `onChange`, `ariaLabel`, touch target ≥ 44×44px |
| `Toast` | Sistema de notificaciones flotantes | `ToastProvider` + `useToast()` → `showToast("success" \| "error", msg)` |
| `FileUploadValidator` | Validador estricto de archivos e imágenes | Verifica MIME type, peso máximo en MB, caracteres de nombre y dimensiones mínimas en px con Web API `Image()` |

## Por Módulo (`src/components/<módulo>/`)

- **`layout/Navbar.tsx`**: Barra de navegación responsiva con contadores en vivo (`Visitas` y `Accesos Registrados`), indicador de candado en Proyectos/Demos y selector rápido de los 4 roles para la defensa oral.
- **`auth/AuthRegistrationModal.tsx`**: Módulo de registración obligatoria en base de datos propia + login + botones de autenticación externa OAuth (Google / GitHub).
- **`portfolio/TeamSquadSection.tsx`**: Presentación interactiva de los 4 integrantes Fullstack + consulta en vivo a la **GitHub REST API** + matriz filtrable del Stack Tecnológico.
- **`portfolio/ProjectsAndDemosSection.tsx`**: Grilla de proyectos con filtro por categoría e integrante, bloqueo para visitantes no registrados y modal de Caso de Estudio + Sandbox de Demo Interactiva en vivo.
- **`portfolio/ContactEmailSection.tsx`**: Catálogo de servicios ofertados con precarga de cotización + formulario de contacto por email con validación estricta y adjuntos verificados.
- **`admin/AnalyticsCharts.tsx`**: 3 gráficos SVG interactivos nativos (Evolución de Tráfico Visitas vs Registrados, Distribución de Tipos de Consulta y Rendimiento por Proyecto/Demo).
