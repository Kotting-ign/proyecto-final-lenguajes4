import { NextRequest, NextResponse } from "next/server";
import { readDatabase } from "@/lib/db/persistent-store";

/**
 * Endpoint de Consultas Parametrizadas (Condición de Promoción #4).
 * Permite filtrar métricas diarias, consultas y proyectos desde el servidor por:
 * - desde (YYYY-MM-DD)
 * - hasta (YYYY-MM-DD)
 * - tipoConsulta
 * - categoriaProyecto
 */
export async function GET(req: NextRequest) {
  const db = await readDatabase();
  const params = req.nextUrl.searchParams;

  const desde = params.get("desde") ?? "2026-01-01";
  const hasta = params.get("hasta") ?? "2026-12-31";
  const tipoConsulta = params.get("tipoConsulta") ?? "Todos";
  const categoriaProyecto = params.get("categoriaProyecto") ?? "Todas";

  const metricasFiltradas = db.metricasDiarias.filter(
    (m) => m.fecha >= desde && m.fecha <= hasta,
  );

  const consultasFiltradas = db.consultas.filter((c) => {
    const fechaC = c.fechaCreacion.slice(0, 10);
    const enRango = fechaC >= desde && fechaC <= hasta;
    const coincideTipo =
      tipoConsulta === "Todos" || c.tipoConsulta === tipoConsulta;
    return enRango && coincideTipo;
  });

  const proyectosFiltrados = db.proyectos.filter((p) =>
    categoriaProyecto === "Todas" ? true : p.categoria === categoriaProyecto,
  );

  return NextResponse.json({
    ok: true,
    parametrosAplicados: { desde, hasta, tipoConsulta, categoriaProyecto },
    kpis: {
      counterVisitasGenerales: db.counterVisitasGenerales,
      counterAccesosRegistrados: db.counterAccesosRegistrados,
      totalUsuariosRegistrados: db.usuariosRegistrados.length,
      totalConsultasPeriodo: consultasFiltradas.length,
    },
    metricasFiltradas,
    consultasFiltradas,
    proyectosFiltrados,
  });
}
