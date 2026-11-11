# AGENTS.md — Kodexa Squad (Portfolio Fullstack · 4 Integrantes)

Guía de trabajo para agentes de IA en este repositorio. Basada en la arquitectura y convenciones probadas en `huellitas-felices`.

## Proyecto

- **Producto:** Kodexa Squad — Portfolio Fullstack grupal (4 integrantes) para el Trabajo Práctico Integrador de **Lenguajes 4** (incluye Condiciones de Regularización y Condiciones de Promoción Directa).
- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS v4 (`@theme`) + Framer Motion + Lucide React + Zod + PostgreSQL (`pg`).
- **Roles del Sistema:**
  1. **Visitante (No registrado):** Explora perfiles de los 4 integrantes, stack, servicios, envía consultas por email con validación estricta, y visualiza teasers de proyectos/demos con bloqueo de registración obligatoria.
  2. **Usuario Registrado:** Autenticado vía base de datos propia o proveedor externo (Google/GitHub). Incrementa el `Counter de usuarios registrados` y desbloquea el detalle de arquitectura y las demos interactivas en vivo.
  3. **Operador / Administrador:** Gestiona contactos/consultas y envía respuestas por email (§1.B), ejecuta el CRUD completo de Proyectos, Demos y Servicios (§4.1), administra Usuarios Registrados (§4.2), y audita Contadores y Gráficos Interactivos Parametrizados (§4.3 y §4.4).

## Documentación de Referencia

- `docs/MANUAL-DISENO-Y-ESTILO.md` — Anteproyecto: Manual de Marca y Guía de Estilo (`#HEX`, tipografía, layouts, responsividad).
- `design-system/portfolio-squad/MASTER.md` — Tokens operativos del Design System "Editorial Tech & Warm Studio".
- `design-system/portfolio-squad/componentes.md` — Inventario de componentes reutilizables en `src/components/`.
- `docs/esquema-bd-front.md` y `db/schema.sql` — Diccionario de datos y DDL PostgreSQL de las 9 tablas del sistema.
- `docs/PROMPTS-Y-COMANDOS.md` — Secuencia maestra de prompts para generar o extender cada módulo con IA.

## Reglas Técnicas

- **Componentes reutilizables** en `src/components/ui/` y `src/components/<módulo>/`.
- **Tokens vía Tailwind (`src/app/globals.css`, `@theme`)** — prohibido hardcodear colores fuera de paleta.
- **Regla 60-30-10:** 60% Alabaster Warm (`#F8F7F4` / `#EFECE6`), 30% Obsidian Slate (`#0F172A` / `#1E293B`), 10% Electric Amber (`#F59E0B` exclusivo para CTAs y acentos de alto valor).
- **Validación estricta:** Todos los formularios validan formato, longitud, regex y adjuntos (`FileUploadValidator`: MIME type, peso máximo en MB y dimensiones mínimas en píxeles con Web API `Image()`).
- **Preparación para Backend:** Todos los registros llevan `id` numérico (PK) y cada punto de integración incluye comentario `// BACKEND:` con el endpoint y tabla SQL correspondiente.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
