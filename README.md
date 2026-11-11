# Kodexa Squad — Portfolio Fullstack (4 Integrantes) 🚀

Proyecto completo para el **Trabajo Práctico Integrador de Lenguajes 4**, construido con el mismo stack, arquitectura y convenciones de diseño de **`huellitas-felices`**.

Cumple el **100% de las Condiciones de Regularización y Promoción Directa**:
- **Presentación de los 4 Integrantes Fullstack** + Stack Tecnológico + Servicios.
- **Escalabilidad por 4 Integrantes:** Animaciones fluidas con Framer Motion + Integración de APIs Web (**GitHub REST API en vivo**, **Web Share API**, **Clipboard API**, **FileReader & Image Validation API**).
- **Sección de Proyectos y Demos con Registración Obligatoria:** Los visitantes ven un teaser bloqueado; al registrarse (en BD propia o mediante OAuth Google/GitHub) desbloquean el Caso de Estudio completo y el Sandbox de Demo Interactiva en vivo.
- **Formulario de Contacto vía Email con Validación Estricta:** Valida todos los campos de entrada, formato de archivos e integridad/resolución de imágenes en píxeles.
- **Navegación como Operador (`/admin`):** Gestión de contactos, filtros y envío de respuestas de seguimiento por correo electrónico.
- **Rol Administrador para Promoción Directa (`/admin`):**
  1. **CRUD Completo** de Proyectos, Demos Interactivas y Servicios Ofertados.
  2. **Panel de Usuarios Registrados** con conteo de accesos y activación/suspensión.
  3. **Métricas y Contadores de Visitas:** `Counter de visitas generales` y `Counter de usuarios registrados` en tiempo real.
  4. **Consultas Parametrizadas y Gráficos Interactivos SVG** con exportación a CSV y PDF A4.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000` en tu navegador.

## Dónde personalizar los nombres y datos de los 4 integrantes

Abrí `src/data/portfolio.ts` y editá el arreglo `INTEGRANTES_INICIALES` (líneas 120 a 205) con los nombres, apellidos, usuarios de GitHub y correos reales de los 4 integrantes de tu grupo.

## Documentación incluida para entregar a la cátedra

- `docs/MANUAL-DISENO-Y-ESTILO.md` — **Anteproyecto: Manual de Marca y Guía de Estilo** (`#HEX`, tipografía, layouts y responsividad).
- `db/schema.sql` — **Script SQL PostgreSQL** con todas las tablas, constraints y triggers.
- `docs/PROMPTS-Y-COMANDOS.md` — **Prompts listos** para expandir cualquier parte del proyecto.
- `design-system/portfolio-squad/MASTER.md` y `componentes.md` — Documentación del sistema de diseño e inventario de componentes.
