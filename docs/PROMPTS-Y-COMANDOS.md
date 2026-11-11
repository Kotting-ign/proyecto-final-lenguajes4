# Guía Maestra de Prompts y Comandos — Portfolio Fullstack (4 Integrantes)

Este documento reúne todos los **Prompts listos para copiar y pegar** para construir, personalizar o expandir cada módulo del Trabajo Práctico Integrador de **Lenguajes 4**, manteniendo el mismo flujo profesional de trabajo que en `huellitas-felices`.

---

## Prompt 1 — Inicialización de Arquitectura, Design System y Contexto Global

```text
Actuá como Arquitecto Fullstack Senior en Next.js 16 (App Router), React 19, TypeScript 5 y Tailwind CSS v4.
Necesito construir un Portfolio Fullstack para un equipo de 4 integrantes ("Kodexa Squad") que cumpla con todas las condiciones de Regularización y Promoción Directa de la cátedra Lenguajes 4:

1. Configurá `src/app/globals.css` usando `@theme` de Tailwind v4 con la paleta "Editorial Tech & Warm Studio" (Regla 60-30-10):
   - Canvas 60%: `--color-cream-50: #F8F7F4`, `--color-cream-100: #EFECE6`, `--color-surface: #FFFFFF`
   - Brand 30%: `--color-brand-900: #0F172A`, `--color-brand-700: #1E293B`
   - Accent 10% (solo CTAs): `--color-accent-500: #F59E0B`, `--color-accent-600: #D97706`
   - Status tokens exclusivos para `StatusBadge`: success, warning, danger, info, purple.
   - Tipografías de Google Fonts: `Space Grotesk` (display uppercase), `Plus Jakarta Sans` (body) y `JetBrains Mono` (código/métricas).
2. Creá los primitivos reutilizables en `src/components/ui/`: `Button`, `Input`, `Textarea`, `Select`, `StatusBadge`, `Modal`, `Switch`, `Toast` y `FileUploadValidator` (con validación estricta de MIME type, tamaño máximo en MB y dimensiones mínimas en píxeles usando `new Image()`).
3. Creá `src/data/portfolio.ts` con IDs numéricos y comentarios `// BACKEND:` para los 4 integrantes, el stack tecnológico, los servicios ofertados, los proyectos con demos interactivas, los usuarios registrados, las consultas de contacto y las métricas diarias de tráfico.
```

---

## Prompt 2 — Presentación de los 4 Integrantes +Escalabilidad (Animaciones y APIs Web)

```text
Diseñá y programá el componente `src/components/portfolio/TeamSquadSection.tsx` para presentar a los 4 integrantes del grupo Fullstack cumpliendo con el requisito de "Escalabilidad por Integrantes (Animaciones y APIs Web)":

1. Mostrá una grilla interactiva de 4 tarjetas (1 por cada integrante del grupo) con animaciones fluidas en Framer Motion respetando `useReducedMotion()`.
2. Al seleccionar un integrante, desplegá su panel detallado con especialidad, años de experiencia, biografía, hitos logrados en el equipo y chips de su stack técnico.
3. Integrá dos APIs Web reales en el perfil:
   - Clipboard API (`navigator.clipboard.writeText`) para copiar el correo electrónico con confirmación mediante Toast.
   - GitHub REST API (`fetch('https://api.github.com/users/<username>')`) en vivo para consultar repositorios públicos y seguidores en tiempo real, incluyendo un fallback local resiliente por si se expone sin conexión a internet.
4. Debajo, incluí una matriz filtrable del Stack Fullstack por categoría (`Frontend & UI`, `Backend & APIs`, `Base de Datos`, `DevOps & Testing`) con barras de progreso animadas.
```

---

## Prompt 3 — Sección de Proyectos y Demos con Registración Obligatoria

```text
Diseñá y programá `src/components/portfolio/ProjectsAndDemosSection.tsx` y `src/components/auth/AuthRegistrationModal.tsx` cumpliendo estrictamente con la regla "Sección de Proyectos y Demos (con Registración Obligatoria)":

1. Cuando el usuario navega como `visitante` (no autenticado), mostrá las tarjetas de proyectos con su resumen público, stack y un indicador `StatusBadge` de "Requiere Registro" (con ícono de candado).
2. Si un visitante hace clic en "Registrate para Ver Demo", abrí `AuthRegistrationModal` ofreciendo:
   - Registro en base de datos propia con validación estricta de Nombre, Apellido, Empresa/Universidad, Email y Contraseña (mínimo 8 caracteres y 1 número).
   - Inicio de sesión para usuarios existentes.
   - Botones de Autenticación Externa (Google OAuth 2.0 y GitHub OAuth).
3. Al completarse el registro o inicio de sesión:
   - Incrementá automáticamente el `Counter de usuarios registrados`.
   - Desbloqueá el Modal de Caso de Estudio y Demo Interactiva, donde el usuario puede ejecutar un Sandbox interactivo en vivo (Request Payload → Response 200 OK) que incrementa el contador de `demosEjecutadas`.
```

---

## Prompt 4 — Formulario de Contacto vía Email con Validación Estricta de Datos e Imágenes

```text
Diseñá y programá `src/components/portfolio/ContactEmailSection.tsx` para cubrir la sección de Servicios Ofertados y el Formulario de Contacto vía Email:

1. Permití seleccionar el tipo de solicitud (`Cotización de Proyecto`, `Asesoría Técnica`, `Consulta General`), el integrante destinatario (uno de los 4 desarrolladores o todo el equipo) y el presupuesto estimado en USD.
2. Aplicá validación estricta en todos los campos:
   - Nombre y apellido con regex alfabético (3 a 70 caracteres).
   - Email válido según formato estándar.
   - Teléfono válido (8 a 22 caracteres numéricos/internacionales).
   - Asunto (6 a 120 caracteres) y Mensaje detallado (20 a 1500 caracteres).
   - Archivo o imagen adjunta validada con `FileUploadValidator`: solo PNG, JPG, WEBP o PDF, peso máximo 5 MB, nombre de archivo seguro y verificación de dimensiones mínimas (400×300 px) en imágenes.
3. Al enviar el formulario, registrá la consulta en el estado global / base de datos para que aparezca de inmediato en la bandeja del Operador en `/admin`.
```

---

## Prompt 5 — Panel de Operador y Administrador para Promoción Directa (`/admin`)

```text
Diseñá y programá la ruta `src/app/admin/page.tsx` y el motor de gráficos `src/components/admin/AnalyticsCharts.tsx` cubriendo la Navegación como Operador (§1.B) y las 4 Condiciones de Promoción Directa del Rol Administrador (§4):

1. Encabezado con las 4 tarjetas KPI principales, destacando el `Counter de Visitas Generales` y el `Counter de Usuarios Registrados`, más un botón para simular tráfico en vivo durante la exposición y exportación a PDF A4 (`window.print()`).
2. Tab 1 (Operador — Gestión de Contactos y Respuestas): Listado de consultas con filtros por tipo, estado y búsqueda por texto. Incluí un Modal para responder al visitante por correo electrónico, guardando el historial de respuestas y cambiando el estado automáticamente a `Respondido`.
3. Tab 2 (Promoción #1 — CRUD de Proyectos y Demos): Tabla administrativa y Modal para Crear, Editar, Activar/Desactivar y Eliminar proyectos y sus demos interactivas, exigiendo validación estricta de imagen de portada.
4. Tab 3 (Promoción #1 — CRUD de Servicios): Alta, edición, baja y switch de estado para los servicios fullstack ofertados.
5. Tab 4 (Promoción #2 — Usuarios Registrados): Panel de control con el listado de usuarios que crearon cuenta para acceder a proyectos/demos, método de autenticación (`PROPIO`, `GOOGLE`, `GITHUB`), cantidad de accesos y switch para Activar/Suspender cuentas.
6. Tab 5 (Promoción #3 y #4 — Consultas Parametrizadas y Gráficos Interactivos): Selector parametrizado de rango de fechas (`Desde` / `Hasta`), exportación a CSV (UTF-8 BOM) y 3 gráficos interactivos en SVG nativo (Evolución de Visitas Generales vs Accesos Registrados con tooltips en hover, Distribución por Tipo de Consulta y Rendimiento por Proyecto/Demo).
```

---

## Prompt 6 — Conexión a Base de Datos PostgreSQL (5 Capas al Estilo `huellitas-felices`)

```text
Siguiendo la arquitectura en 5 capas de nuestro proyecto `huellitas-felices` (`types`, `schema` con Zod, `repo` con `pg`, `service` y `mapper` + Route Handlers en `src/app/api/`), conectá los puntos marcados con `// BACKEND:` contra el esquema `db/schema.sql`:

1. Creá `src/lib/db.ts` con el pool de conexión a PostgreSQL (`process.env.DATABASE_URL`).
2. Implementá los módulos en `src/modules/`:
   - `proyectos` (`GET/POST/PUT/DELETE /api/proyectos`)
   - `servicios` (`GET/POST/PUT/DELETE /api/servicios`)
   - `consultas` (`GET/POST /api/consultas` y `POST /api/consultas/[id]/responder`)
   - `usuarios` (`POST /api/auth/register`, `POST /api/auth/login` y `GET/PATCH /api/usuarios-registrados`)
   - `analytics` (`GET/POST /api/analytics/trafico?desde=&hasta=`)
3. Verificá que `npm run lint` y `npx tsc --noEmit` pasen sin errores.
```
