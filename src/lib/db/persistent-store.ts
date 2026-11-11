import fs from "fs/promises";
import path from "path";
import {
  CONSULTAS_INICIALES,
  INTEGRANTES_INICIALES,
  METRICAS_DIARIAS_INICIALES,
  PROYECTOS_INICIALES,
  SERVICIOS_INICIALES,
  STACK_TECNOLOGIAS,
  USUARIOS_REGISTRADOS_INICIALES,
  type ConsultaContacto,
  type Integrante,
  type MetricaDiaria,
  type ProyectoPortfolio,
  type ServicioFullstack,
  type TecnologiaStack,
  type UsuarioRegistrado,
} from "@/data/portfolio";

export interface DatabaseSchema {
  counterVisitasGenerales: number;
  counterAccesosRegistrados: number;
  integrantes: Integrante[];
  stack: TecnologiaStack[];
  servicios: ServicioFullstack[];
  proyectos: ProyectoPortfolio[];
  consultas: ConsultaContacto[];
  usuariosRegistrados: UsuarioRegistrado[];
  metricasDiarias: MetricaDiaria[];
  ultimaActualizacion: string;
}

const DB_FILE_PATH = path.join(process.cwd(), "db", "portfolio-database.json");

const INITIAL_DB_STATE: DatabaseSchema = {
  counterVisitasGenerales: 1443,
  counterAccesosRegistrados: 494,
  integrantes: INTEGRANTES_INICIALES,
  stack: STACK_TECNOLOGIAS,
  servicios: SERVICIOS_INICIALES,
  proyectos: PROYECTOS_INICIALES,
  consultas: CONSULTAS_INICIALES,
  usuariosRegistrados: USUARIOS_REGISTRADOS_INICIALES,
  metricasDiarias: METRICAS_DIARIAS_INICIALES,
  ultimaActualizacion: new Date().toISOString(),
};

declare global {
  var __portfolioDbCache: DatabaseSchema | undefined;
}

export async function readDatabase(): Promise<DatabaseSchema> {
  if (globalThis.__portfolioDbCache) {
    return globalThis.__portfolioDbCache;
  }

  try {
    const raw = await fs.readFile(DB_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as DatabaseSchema;
    globalThis.__portfolioDbCache = parsed;
    return parsed;
  } catch {
    await writeDatabase(INITIAL_DB_STATE);
    return INITIAL_DB_STATE;
  }
}

export async function writeDatabase(nextState: DatabaseSchema): Promise<DatabaseSchema> {
  const updated: DatabaseSchema = {
    ...nextState,
    ultimaActualizacion: new Date().toISOString(),
  };
  globalThis.__portfolioDbCache = updated;
  await fs.mkdir(path.dirname(DB_FILE_PATH), { recursive: true });
  await fs.writeFile(DB_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

export async function updateDatabase(
  mutator: (draft: DatabaseSchema) => void | DatabaseSchema,
): Promise<DatabaseSchema> {
  const current = await readDatabase();
  const clone: DatabaseSchema = JSON.parse(JSON.stringify(current));
  const maybeReturned = mutator(clone);
  return writeDatabase(maybeReturned ?? clone);
}
