import { obtenerDestinatarioConsulta } from "@/data/integrantes";
import type { TipoConsulta } from "@/data/portfolio";

/**
 * Integración con EmailJS REST API (https://api.emailjs.com/api/v1.0/email/send).
 *
 * Credenciales configuradas del proyecto:
 * - Public Key (`user_id`): enCNqET487eTGuM8m
 * - Private Key (`accessToken`): _ixdHje33NNIia96JHAsY
 * - Service ID (`service_id`): service_fgr2svp
 * - Template ID (`template_id`): template_xwr4jsc
 */

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

function resolveServiceId(): string {
  const envVal =
    process.env.EMAILJS_SERVICE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  if (!envVal || envVal === "default_service") {
    return "service_fgr2svp";
  }
  return envVal;
}

function resolveTemplateId(): string {
  const envVal =
    process.env.EMAILJS_TEMPLATE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  if (!envVal || envVal === "template_contacto") {
    return "template_xwr4jsc";
  }
  return envVal;
}

export function getEmailJSConfig() {
  return {
    publicKey:
      process.env.EMAILJS_PUBLIC_KEY ??
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ??
      "enCNqET487eTGuM8m",
    privateKey: process.env.EMAILJS_PRIVATE_KEY ?? "_ixdHje33NNIia96JHAsY",
    serviceId: resolveServiceId(),
    templateId: resolveTemplateId(),
  };
}

export interface EnvioConsultaEmailInput {
  nombreCompleto: string;
  email: string;
  telefono: string;
  empresa: string;
  tipoConsulta: TipoConsulta;
  integranteDestinoId: number | null;
  presupuestoUsd: number | null;
  asunto: string;
  mensaje: string;
  adjuntoNombre: string | null;
  adjuntoMime: string | null;
  adjuntoTamanoKb: number | null;
}

export interface ResultadoEmailJS {
  enviado: boolean;
  destinatarioNombre: string;
  destinatarioEmail: string;
  statusHttp?: number;
  detalle: string;
}

async function postEmailJS(templateParams: Record<string, string>): Promise<{
  ok: boolean;
  status: number;
  text: string;
}> {
  const cfg = getEmailJSConfig();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (typeof window === "undefined") {
    headers.Origin = "http://localhost:3000";
  }
  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({
      service_id: cfg.serviceId,
      template_id: cfg.templateId,
      user_id: cfg.publicKey,
      accessToken: cfg.privateKey,
      template_params: templateParams,
    }),
  });
  const text = await response.text();
  return { ok: response.ok, status: response.status, text };
}

/**
 * Envía la consulta/cotización por EmailJS:
 * 1) Al destinatario elegido en "Dirigido a":
 *    - Carlos Pacheco → capacheco@ucasal.edu.ar
 *    - Ignacio Kotting → ignacioko@hotmail.com
 *    - Agustín Vazques → agustinypaco@gmail.com
 *    - Valentina Salas → valesalas3003@gmail.com
 *    - Jeremías Torres → email de su perfil
 * 2) Si el visitante/profesor ingresó su propio correo en el campo "Correo Electrónico"
 *    y es distinto al de "Dirigido a", también envía una copia a ese correo para que
 *    reciba la cotización en su bandeja de entrada.
 */
export async function enviarCorreoContactoEmailJS(
  input: EnvioConsultaEmailInput,
): Promise<ResultadoEmailJS> {
  const destinatario = obtenerDestinatarioConsulta(input.integranteDestinoId);
  const presupuestoTexto = input.presupuestoUsd
    ? `USD ${input.presupuestoUsd.toLocaleString("es-AR")}`
    : "No aplica";
  const adjuntoTexto = input.adjuntoNombre
    ? `${input.adjuntoNombre} (${input.adjuntoMime}, ${input.adjuntoTamanoKb} KB)`
    : "Sin adjunto";

  const resumenCompleto = [
    `Tipo de solicitud: ${input.tipoConsulta}`,
    `Asunto: ${input.asunto}`,
    `Presupuesto estimado: ${presupuestoTexto}`,
    `Remitente: ${input.nombreCompleto} (${input.email} · Tel: ${input.telefono} · Empresa: ${input.empresa})`,
    `Dirigido a: ${destinatario.nombreCompleto} (${destinatario.email})`,
    `Adjunto: ${adjuntoTexto}`,
    "",
    "Detalle del mensaje:",
    input.mensaje,
  ].join("\n");

  const construirParams = (targetEmail: string, targetName: string) => ({
    // Nombres de variables estándar en plantillas de EmailJS para el campo "To Email"
    to_email: targetEmail,
    email: targetEmail,
    recipient_email: targetEmail,
    destinatario_email: targetEmail,
    user_email: targetEmail,
    to_name: targetName,
    destinatario_nombre: targetName,
    // Datos del remitente / solicitante
    from_name: input.nombreCompleto,
    name: input.nombreCompleto,
    user_name: input.nombreCompleto,
    from_email: input.email,
    reply_to: input.email,
    telefono: input.telefono,
    empresa: input.empresa,
    tipo_consulta: input.tipoConsulta,
    presupuesto_usd: presupuestoTexto,
    // Asunto y cuerpo (incluye alias comunes de EmailJS: title, subject, asunto, message, mensaje)
    title: `${input.tipoConsulta}: ${input.asunto}`,
    subject: `${input.tipoConsulta}: ${input.asunto}`,
    asunto: input.asunto,
    message: resumenCompleto,
    mensaje: resumenCompleto,
    adjunto: adjuntoTexto,
  });

  try {
    const envioPrincipal = await postEmailJS(
      construirParams(destinatario.email, destinatario.nombreCompleto),
    );

    const emailSolicitante = input.email.trim().toLowerCase();
    const emailDestinatario = destinatario.email.trim().toLowerCase();

    // Si el profesor/cliente puso su propio correo en el formulario y es diferente al destinatario,
    // le enviamos también la copia de la cotización a su correo.
    if (emailSolicitante && emailSolicitante !== emailDestinatario) {
      await postEmailJS(construirParams(input.email.trim(), input.nombreCompleto));
    }

    if (envioPrincipal.ok) {
      const destinos =
        emailSolicitante && emailSolicitante !== emailDestinatario
          ? `${destinatario.nombreCompleto} (${destinatario.email}) y copia a ${input.email.trim()}`
          : `${destinatario.nombreCompleto} (${destinatario.email})`;

      return {
        enviado: true,
        destinatarioNombre: destinatario.nombreCompleto,
        destinatarioEmail: destinatario.email,
        statusHttp: envioPrincipal.status,
        detalle: `Enviado vía EmailJS a ${destinos}`,
      };
    }

    return {
      enviado: false,
      destinatarioNombre: destinatario.nombreCompleto,
      destinatarioEmail: destinatario.email,
      statusHttp: envioPrincipal.status,
      detalle: `EmailJS respondió HTTP ${envioPrincipal.status}: ${envioPrincipal.text}`,
    };
  } catch (err) {
    return {
      enviado: false,
      destinatarioNombre: destinatario.nombreCompleto,
      destinatarioEmail: destinatario.email,
      detalle: err instanceof Error ? err.message : "Error de red al conectar con EmailJS",
    };
  }
}

/**
 * Envía por EmailJS la respuesta de un operador desde el panel `/admin` al visitante.
 */
export async function enviarRespuestaOperadorEmailJS(input: {
  destinatarioNombre: string;
  destinatarioEmail: string;
  operadorNombre: string;
  asuntoOriginal: string;
  mensajeRespuesta: string;
}): Promise<ResultadoEmailJS> {
  try {
    const res = await postEmailJS({
      to_name: input.destinatarioNombre,
      to_email: input.destinatarioEmail,
      destinatario_nombre: input.destinatarioNombre,
      destinatario_email: input.destinatarioEmail,
      recipient_email: input.destinatarioEmail,
      email: input.destinatarioEmail,
      user_email: input.destinatarioEmail,
      from_name: input.operadorNombre,
      name: input.operadorNombre,
      user_name: input.operadorNombre,
      title: `Re: ${input.asuntoOriginal}`,
      subject: `Re: ${input.asuntoOriginal}`,
      asunto: `Re: ${input.asuntoOriginal}`,
      message: input.mensajeRespuesta,
      mensaje: input.mensajeRespuesta,
    });

    return {
      enviado: res.ok,
      destinatarioNombre: input.destinatarioNombre,
      destinatarioEmail: input.destinatarioEmail,
      statusHttp: res.status,
      detalle: res.ok
        ? `Respuesta enviada vía EmailJS a ${input.destinatarioEmail}`
        : `EmailJS respondió HTTP ${res.status}: ${res.text}`,
    };
  } catch (err) {
    return {
      enviado: false,
      destinatarioNombre: input.destinatarioNombre,
      destinatarioEmail: input.destinatarioEmail,
      detalle: err instanceof Error ? err.message : "Error de red al conectar con EmailJS",
    };
  }
}
