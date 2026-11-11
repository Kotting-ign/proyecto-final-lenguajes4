"use client";

import { CheckCircle2, Mail, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  FileUploadValidator,
  type ValidatedAttachment,
} from "@/components/ui/FileUploadValidator";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { usePortfolio } from "@/context/PortfolioContext";
import type { TipoConsulta } from "@/data/portfolio";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFONO_REGEX = /^[+\d\s()-]{8,22}$/;
const NOMBRE_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'-]{3,70}$/;

export function ContactEmailSection() {
  const { integrantes, servicios, enviarConsulta } = usePortfolio();
  const { showToast } = useToast();

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState<TipoConsulta>(
    "Cotización de Proyecto",
  );
  const [integranteDestinoId, setIntegranteDestinoId] = useState<string>("todos");
  const [presupuestoUsd, setPresupuestoUsd] = useState<string>("2000");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [adjunto, setAdjunto] = useState<ValidatedAttachment | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviadoExito, setEnviadoExito] = useState(false);

  const serviciosActivos = servicios.filter((s) => s.activo);

  const validarFormulario = () => {
    const errs: Record<string, string> = {};
    if (!NOMBRE_REGEX.test(nombreCompleto.trim())) {
      errs.nombreCompleto =
        "Ingresá tu nombre y apellido (solo letras, entre 3 y 70 caracteres).";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      errs.email = "Ingresá un correo electrónico válido (ej: nombre@empresa.com).";
    }
    if (!TELEFONO_REGEX.test(telefono.trim())) {
      errs.telefono =
        "Ingresá un teléfono válido (entre 8 y 22 dígitos, admite + y guiones).";
    }
    if (asunto.trim().length < 6 || asunto.trim().length > 120) {
      errs.asunto = "El asunto debe tener entre 6 y 120 caracteres.";
    }
    if (mensaje.trim().length < 20 || mensaje.trim().length > 1500) {
      errs.mensaje =
        "El mensaje detallado debe contener entre 20 y 1500 caracteres.";
    }
    if (tipoConsulta === "Cotización de Proyecto") {
      const monto = Number(presupuestoUsd);
      if (Number.isNaN(monto) || monto < 100 || monto > 250000) {
        errs.presupuestoUsd =
          "Indicá un presupuesto estimado válido entre USD 100 y USD 250.000.";
      }
    }
    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) {
      showToast("error", "Revisá los campos marcados en rojo antes de enviar.");
      return;
    }

    enviarConsulta({
      nombreCompleto: nombreCompleto.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      empresa: empresa.trim() || "Particular",
      tipoConsulta,
      integranteDestinoId:
        integranteDestinoId === "todos" ? null : Number(integranteDestinoId),
      presupuestoUsd:
        tipoConsulta === "Cotización de Proyecto" ? Number(presupuestoUsd) : null,
      asunto: asunto.trim(),
      mensaje: mensaje.trim(),
      adjuntoNombre: adjunto?.nombre ?? null,
      adjuntoMime: adjunto?.tipoMime ?? null,
      adjuntoTamanoKb: adjunto ? Math.round(adjunto.tamanoBytes / 1024) : null,
    });

    setEnviadoExito(true);
    setNombreCompleto("");
    setEmail("");
    setTelefono("");
    setEmpresa("");
    setAsunto("");
    setMensaje("");
    setAdjunto(null);
    setErrores({});

    showToast(
      "success",
      "¡Consulta enviada por email! Ya podés gestionarla y responderla desde el Panel de Operador.",
    );
  };

  return (
    <section id="servicios" className="py-16 sm:py-20 bg-cream-50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Catálogo de Servicios Fullstack Ofertados */}
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-text-secondary">
            <Sparkles className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" />
            Soluciones Profesionales del Grupo
          </span>
          <h2 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-brand-900 sm:text-4xl">
            Servicios Fullstack Ofertados
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {serviciosActivos.map((srv) => {
              const lider = integrantes.find((i) => i.id === srv.integranteLiderId);
              return (
                <div
                  key={srv.id}
                  className="flex flex-col justify-between rounded-md border border-border bg-surface p-6 shadow-card"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <StatusBadge variant="purple" label={srv.categoria} />
                      <span className="font-mono text-xs font-bold text-text-secondary">
                        {srv.codigo} · ~{srv.tiempoEstimadoSemanas} semanas
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-extrabold uppercase text-brand-900">
                      {srv.titulo}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary">
                      {srv.descripcion}
                    </p>

                    <ul className="mt-4 flex flex-col gap-1.5 border-t border-border pt-3">
                      {srv.entregables.map((ent) => (
                        <li
                          key={ent}
                          className="flex items-center gap-2 text-xs font-semibold text-text-primary"
                        >
                          <CheckCircle2
                            className="h-3.5 w-3.5 shrink-0 text-status-success"
                            aria-hidden="true"
                          />
                          {ent}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <span className="block text-[11px] uppercase text-text-secondary">
                        Inversión Base Estimada
                      </span>
                      <strong className="font-display text-xl font-extrabold text-brand-900">
                        USD {srv.precioBaseUsd.toLocaleString("es-AR")}
                      </strong>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTipoConsulta("Cotización de Proyecto");
                        setPresupuestoUsd(String(srv.precioBaseUsd));
                        setAsunto(`Solicitud de cotización: ${srv.titulo}`);
                        if (lider) setIntegranteDestinoId(String(lider.id));
                        document
                          .getElementById("contacto")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Cotizar este Servicio →
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulario de Contacto vía Email con Validación Estricta */}
        <div id="contacto" className="mt-20 pt-16 border-t border-border">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand-900 px-3 py-1 font-mono text-xs font-bold uppercase text-accent-500">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Sección 1.A y §3 · Validación Estricta
                </span>
                <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-brand-900 sm:text-4xl">
                  Formulario de Contacto vía Email
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Enviá consultas generales, solicitudes de cotización de proyectos o
                  asesoría técnica. Todos los mensajes se validan estrictamente (incluyendo
                  archivos e imágenes adjuntas) e impactan en tiempo real en el{" "}
                  <strong className="text-brand-900">Panel de Gestión del Operador</strong>.
                </p>

                <div className="mt-6 flex flex-col gap-3 rounded-md border border-border bg-surface p-5">
                  <h3 className="font-display text-sm font-extrabold uppercase text-brand-900">
                    Reglas de Validación Estricta Activas:
                  </h3>
                  <ul className="flex flex-col gap-2 text-xs text-text-secondary">
                    <li>
                      • <strong>Datos personales:</strong> Regex de nombre, email RFC y teléfono
                      internacional.
                    </li>
                    <li>
                      • <strong>Archivos e Imágenes:</strong> Verificación de MIME type
                      (PNG/JPG/WEBP/PDF), tamaño máx. 5 MB y dimensiones mínimas (400×300 px) con
                      Web API <code>Image()</code>.
                    </li>
                    <li>
                      • <strong>Integración Operador:</strong> Cada envío queda listo en{" "}
                      <code>/admin</code> para ser respondido por correo electrónico.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6 sm:p-8 shadow-card"
              >
                {enviadoExito && (
                  <div className="flex items-center justify-between rounded-md border border-status-success/40 bg-status-success/10 px-4 py-3 text-xs font-bold text-status-success-strong">
                    <span>
                      ✓ Tu solicitud fue registrada y notificada por email. Podés verla en el
                      Panel de Operador (/admin).
                    </span>
                    <button
                      type="button"
                      onClick={() => setEnviadoExito(false)}
                      className="underline cursor-pointer"
                    >
                      Ocultar
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Nombre y Apellido"
                    requiredMark
                    placeholder="Ej: Dra. Lucía Fernández"
                    value={nombreCompleto}
                    onChange={(e) => setNombreCompleto(e.target.value)}
                    error={errores.nombreCompleto}
                  />
                  <Input
                    label="Correo Electrónico"
                    type="email"
                    requiredMark
                    placeholder="nombre@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errores.email}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Teléfono / WhatsApp"
                    requiredMark
                    placeholder="+54 9 11 4589-3321"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    error={errores.telefono}
                  />
                  <Input
                    label="Empresa / Organización"
                    placeholder="Opcional"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Select
                    label="Tipo de Solicitud"
                    requiredMark
                    value={tipoConsulta}
                    onChange={(e) => setTipoConsulta(e.target.value as TipoConsulta)}
                  >
                    <option value="Cotización de Proyecto">Cotización de Proyecto</option>
                    <option value="Asesoría Técnica">Asesoría Técnica</option>
                    <option value="Consulta General">Consulta General</option>
                  </Select>

                  <Select
                    label="Dirigido a"
                    value={integranteDestinoId}
                    onChange={(e) => setIntegranteDestinoId(e.target.value)}
                  >
                    <option value="todos">Todo el Squad (4 Integrantes)</option>
                    {integrantes.map((dev) => (
                      <option key={dev.id} value={String(dev.id)}>
                        {dev.nombre} ({dev.rolPrincipal.split("&")[0].trim()})
                      </option>
                    ))}
                  </Select>

                  {tipoConsulta === "Cotización de Proyecto" && (
                    <Input
                      label="Presupuesto Estimado (USD)"
                      type="number"
                      requiredMark
                      min={100}
                      max={250000}
                      value={presupuestoUsd}
                      onChange={(e) => setPresupuestoUsd(e.target.value)}
                      error={errores.presupuestoUsd}
                    />
                  )}
                </div>

                <Input
                  label="Asunto de la Consulta"
                  requiredMark
                  placeholder="Ej: Desarrollo de plataforma web con base de datos PostgreSQL"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  error={errores.asunto}
                />

                <Textarea
                  label="Detalle del Proyecto o Consulta"
                  requiredMark
                  placeholder="Describí los objetivos, funcionalidades clave, plazos o dudas técnicas (mínimo 20 caracteres)..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  error={errores.mensaje}
                  hint={`${mensaje.length}/1500 caracteres`}
                />

                <FileUploadValidator
                  label="Adjuntar Captura, Wireframe o Especificación Técnica (Opcional, con Validación Estricta)"
                  value={adjunto}
                  onChange={setAdjunto}
                />

                <div className="mt-2 flex items-center justify-end pt-3 border-t border-border">
                  <Button type="submit" variant="primary" size="lg">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Enviar Solicitud por Correo Electrónico
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
