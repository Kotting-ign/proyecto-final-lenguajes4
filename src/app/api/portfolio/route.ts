import { NextRequest, NextResponse } from "next/server";
import { readDatabase, updateDatabase } from "@/lib/db/persistent-store";
import {
  ConsultaContactoSchema,
  RegistroUsuarioSchema,
  RespuestaOperadorSchema,
} from "@/lib/validation/schemas";
import type {
  EstadoConsulta,
  ProyectoPortfolio,
  RolSistema,
  ServicioFullstack,
  UsuarioRegistrado,
} from "@/data/portfolio";

export async function GET(req: NextRequest) {
  const trackVisit = req.nextUrl.searchParams.get("trackVisit") === "true";

  if (trackVisit) {
    const updated = await updateDatabase((db) => {
      db.counterVisitasGenerales += 1;
      const hoy = new Date().toISOString().slice(0, 10);
      const filaHoy = db.metricasDiarias.find((m) => m.fecha === hoy);
      if (filaHoy) {
        filaHoy.visitasGenerales += 1;
      } else if (db.metricasDiarias.length > 0) {
        db.metricasDiarias[db.metricasDiarias.length - 1].visitasGenerales += 1;
      }
    });
    return NextResponse.json(updated);
  }

  const db = await readDatabase();
  return NextResponse.json(db);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body as { action: string; payload: Record<string, unknown> };

    const updatedDb = await updateDatabase((db) => {
      const ahoraIso = new Date().toISOString();
      const ahoraCorto = ahoraIso.slice(0, 16).replace("T", " ");

      switch (action) {
        case "REGISTRAR_USUARIO": {
          const parsed = RegistroUsuarioSchema.parse(payload);
          const cleanEmail = parsed.email.toLowerCase();
          if (db.usuariosRegistrados.some((u) => u.email.toLowerCase() === cleanEmail)) {
            throw new Error("EMAIL_DUPLICADO: Ya existe un usuario registrado con ese correo.");
          }
          const nuevoId =
            Math.max(0, ...db.usuariosRegistrados.map((u) => u.id)) + 1;
          const nuevo: UsuarioRegistrado = {
            id: nuevoId,
            nombre: parsed.nombre,
            apellido: parsed.apellido,
            email: cleanEmail,
            empresa: parsed.empresa,
            cargo: parsed.cargo,
            metodoAuth: parsed.metodoAuth,
            rol: "registrado",
            estado: "Activo",
            accesosTotales: 1,
            proyectosDesbloqueados: [1],
            fechaRegistro: ahoraIso.slice(0, 10),
            ultimoAcceso: ahoraCorto,
          };
          db.usuariosRegistrados.unshift(nuevo);
          db.counterAccesosRegistrados += 1;
          if (db.metricasDiarias.length > 0) {
            const ult = db.metricasDiarias[db.metricasDiarias.length - 1];
            ult.nuevosRegistros += 1;
            ult.accesosUsuariosRegistrados += 1;
          }
          break;
        }

        case "LOGIN_ACCESO": {
          const email = String(payload.email ?? "").trim().toLowerCase();
          const proveedor = payload.metodoAuth as "propio" | "google" | "github" | undefined;
          const existente = db.usuariosRegistrados.find(
            (u) => u.email.toLowerCase() === email,
          );
          if (existente) {
            if (existente.estado === "Suspendido") {
              throw new Error("CUENTA_SUSPENDIDA: Esta cuenta fue suspendida por el administrador.");
            }
            existente.accesosTotales += 1;
            existente.ultimoAcceso = ahoraCorto;
          } else {
            const nuevoId =
              Math.max(0, ...db.usuariosRegistrados.map((u) => u.id)) + 1;
            db.usuariosRegistrados.unshift({
              id: nuevoId,
              nombre: String(payload.nombre ?? (email.split("@")[0] || "Usuario")),
              apellido: String(payload.apellido ?? "Verificado"),
              email,
              empresa: String(payload.empresa ?? "Visitante Registrado"),
              cargo: String(payload.cargo ?? "Profesional"),
              metodoAuth: proveedor ?? "propio",
              rol:
                email.includes("admin") || email.includes("catedra")
                  ? "admin"
                  : "registrado",
              estado: "Activo",
              accesosTotales: 1,
              proyectosDesbloqueados: [1],
              fechaRegistro: ahoraIso.slice(0, 10),
              ultimoAcceso: ahoraCorto,
            });
          }
          db.counterAccesosRegistrados += 1;
          if (db.metricasDiarias.length > 0) {
            db.metricasDiarias[db.metricasDiarias.length - 1].accesosUsuariosRegistrados += 1;
          }
          break;
        }

        case "ENVIAR_CONSULTA": {
          const parsed = ConsultaContactoSchema.parse(payload);
          const nuevoId = Math.max(0, ...db.consultas.map((c) => c.id)) + 1;
          db.consultas.unshift({
            id: nuevoId,
            ...parsed,
            estado: "Pendiente",
            fechaCreacion: ahoraIso,
            respuestas: [],
          });
          if (db.metricasDiarias.length > 0) {
            db.metricasDiarias[db.metricasDiarias.length - 1].consultasRecibidas += 1;
          }
          break;
        }

        case "RESPONDER_CONSULTA": {
          const parsed = RespuestaOperadorSchema.parse(payload);
          const consulta = db.consultas.find((c) => c.id === parsed.consultaId);
          if (consulta) {
            consulta.estado = "Respondido";
            consulta.respuestas.push({
              id: consulta.respuestas.length + 1,
              consultaId: consulta.id,
              operadorNombre: parsed.operadorNombre,
              mensajeRespuesta: parsed.mensajeRespuesta,
              enviadoPorEmail: true,
              fechaEnvio: ahoraIso,
            });
          }
          break;
        }

        case "CAMBIAR_ESTADO_CONSULTA": {
          const consultaId = Number(payload.consultaId);
          const nuevoEstado = payload.nuevoEstado as EstadoConsulta;
          const consulta = db.consultas.find((c) => c.id === consultaId);
          if (consulta) {
            consulta.estado = nuevoEstado;
          }
          break;
        }

        case "GUARDAR_PROYECTO": {
          const editarId = payload.editarId as number | undefined;
          const draft = payload.draft as Omit<
            ProyectoPortfolio,
            "id" | "vistasTotales" | "demosEjecutadas" | "fechaPublicacion"
          >;
          if (editarId !== undefined) {
            db.proyectos = db.proyectos.map((p) =>
              p.id === editarId ? { ...p, ...draft } : p,
            );
          } else {
            const nuevoId = Math.max(0, ...db.proyectos.map((p) => p.id)) + 1;
            db.proyectos.unshift({
              ...draft,
              id: nuevoId,
              vistasTotales: 1,
              demosEjecutadas: 0,
              fechaPublicacion: ahoraIso.slice(0, 10),
            });
          }
          break;
        }

        case "ELIMINAR_PROYECTO": {
          const proyectoId = Number(payload.proyectoId);
          db.proyectos = db.proyectos.filter((p) => p.id !== proyectoId);
          break;
        }

        case "TOGGLE_PROYECTO": {
          const proyectoId = Number(payload.proyectoId);
          const prj = db.proyectos.find((p) => p.id === proyectoId);
          if (prj) prj.activo = !prj.activo;
          break;
        }

        case "REGISTRAR_VISTA_PROYECTO": {
          const proyectoId = Number(payload.proyectoId);
          const usuarioId = payload.usuarioId as number | undefined;
          const prj = db.proyectos.find((p) => p.id === proyectoId);
          if (prj) prj.vistasTotales += 1;
          if (usuarioId) {
            const usr = db.usuariosRegistrados.find((u) => u.id === usuarioId);
            if (usr && !usr.proyectosDesbloqueados.includes(proyectoId)) {
              usr.proyectosDesbloqueados.push(proyectoId);
            }
          }
          break;
        }

        case "REGISTRAR_DEMO_EJECUTADA": {
          const proyectoId = Number(payload.proyectoId);
          const prj = db.proyectos.find((p) => p.id === proyectoId);
          if (prj) prj.demosEjecutadas += 1;
          if (db.metricasDiarias.length > 0) {
            db.metricasDiarias[db.metricasDiarias.length - 1].demosEjecutadas += 1;
          }
          break;
        }

        case "GUARDAR_SERVICIO": {
          const editarId = payload.editarId as number | undefined;
          const draft = payload.draft as Omit<ServicioFullstack, "id">;
          if (editarId !== undefined) {
            db.servicios = db.servicios.map((s) =>
              s.id === editarId ? { ...s, ...draft } : s,
            );
          } else {
            const nuevoId = Math.max(0, ...db.servicios.map((s) => s.id)) + 1;
            db.servicios.unshift({ ...draft, id: nuevoId });
          }
          break;
        }

        case "ELIMINAR_SERVICIO": {
          const servicioId = Number(payload.servicioId);
          db.servicios = db.servicios.filter((s) => s.id !== servicioId);
          break;
        }

        case "TOGGLE_SERVICIO": {
          const servicioId = Number(payload.servicioId);
          const srv = db.servicios.find((s) => s.id === servicioId);
          if (srv) srv.activo = !srv.activo;
          break;
        }

        case "TOGGLE_ESTADO_USUARIO": {
          const usuarioId = Number(payload.usuarioId);
          const usr = db.usuariosRegistrados.find((u) => u.id === usuarioId);
          if (usr) {
            usr.estado = usr.estado === "Activo" ? "Suspendido" : "Activo";
          }
          break;
        }

        case "CAMBIAR_ROL_USUARIO": {
          const usuarioId = Number(payload.usuarioId);
          const nuevoRol = payload.nuevoRol as Exclude<RolSistema, "visitante">;
          const usr = db.usuariosRegistrados.find((u) => u.id === usuarioId);
          if (usr) {
            usr.rol = nuevoRol;
          }
          break;
        }

        case "ELIMINAR_USUARIO": {
          const usuarioId = Number(payload.usuarioId);
          db.usuariosRegistrados = db.usuariosRegistrados.filter(
            (u) => u.id !== usuarioId,
          );
          break;
        }

        case "SIMULAR_TRAFICO": {
          const incVisitas = Math.floor(Math.random() * 8) + 4;
          const incReg = Math.floor(Math.random() * 4) + 1;
          db.counterVisitasGenerales += incVisitas;
          db.counterAccesosRegistrados += incReg;
          if (db.metricasDiarias.length > 0) {
            const ult = db.metricasDiarias[db.metricasDiarias.length - 1];
            ult.visitasGenerales += incVisitas;
            ult.accesosUsuariosRegistrados += incReg;
            ult.nuevosRegistros += 1;
            ult.demosEjecutadas += 2;
          }
          break;
        }
      }
    });

    return NextResponse.json({ ok: true, db: updatedDb });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno del servidor";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
