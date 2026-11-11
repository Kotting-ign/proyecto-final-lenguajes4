import { z } from "zod";

export const RegistroUsuarioSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(60),
  apellido: z.string().trim().min(2, "El apellido debe tener al menos 2 caracteres").max(60),
  email: z.string().trim().email("Correo electrónico inválido").max(140),
  empresa: z.string().trim().min(2, "La empresa/institución es obligatoria").max(120),
  cargo: z.string().trim().max(100).optional().default("Visitante Profesional"),
  metodoAuth: z.enum(["propio", "google", "github"]).default("propio"),
});

export const ConsultaContactoSchema = z.object({
  nombreCompleto: z.string().trim().min(3).max(120),
  email: z.string().trim().email().max(140),
  telefono: z.string().trim().min(8).max(40),
  empresa: z.string().trim().max(120).default("Particular"),
  tipoConsulta: z.enum([
    "Consulta General",
    "Cotización de Proyecto",
    "Asesoría Técnica",
  ]),
  integranteDestinoId: z.number().int().nullable(),
  presupuestoUsd: z.number().min(0).max(1000000).nullable(),
  asunto: z.string().trim().min(6).max(160),
  mensaje: z.string().trim().min(20).max(2000),
  adjuntoNombre: z.string().max(255).nullable(),
  adjuntoMime: z.string().max(80).nullable(),
  adjuntoTamanoKb: z.number().max(5120).nullable(),
});

export const RespuestaOperadorSchema = z.object({
  consultaId: z.number().int().positive(),
  operadorNombre: z.string().trim().min(2).max(120),
  mensajeRespuesta: z.string().trim().min(15).max(2000),
});
