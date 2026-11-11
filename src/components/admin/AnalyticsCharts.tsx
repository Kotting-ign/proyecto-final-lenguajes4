"use client";

import { BarChart3, PieChart, TrendingUp, UserPlus } from "lucide-react";
import { useId, useState } from "react";
import type { ConsultaContacto, MetricaDiaria, ProyectoPortfolio } from "@/data/portfolio";

interface AnalyticsChartsProps {
  metricas: MetricaDiaria[];
  consultas: ConsultaContacto[];
  proyectos: ProyectoPortfolio[];
}

export function AnalyticsCharts({
  metricas,
  consultas,
  proyectos,
}: AnalyticsChartsProps) {
  const gradientVisitasId = useId();
  const gradientRegId = useId();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Dimensiones SVG del gráfico de evolución de tráfico
  const width = 760;
  const height = 250;
  const padX = 48;
  const padTop = 24;
  const padBottom = 38;
  const chartW = width - padX * 2;
  const chartH = height - padTop - padBottom;

  const maxValor = Math.max(
    ...metricas.map((m) => Math.max(m.visitasGenerales, m.accesosUsuariosRegistrados)),
    10,
  );

  const ptsVisitas = metricas.map((m, idx) => {
    const x =
      metricas.length <= 1
        ? width / 2
        : padX + (idx / (metricas.length - 1)) * chartW;
    const y = padTop + chartH - (m.visitasGenerales / maxValor) * chartH;
    return { ...m, x, y };
  });

  const ptsReg = metricas.map((m, idx) => {
    const x =
      metricas.length <= 1
        ? width / 2
        : padX + (idx / (metricas.length - 1)) * chartW;
    const y = padTop + chartH - (m.accesosUsuariosRegistrados / maxValor) * chartH;
    return { ...m, x, y };
  });

  const pathVisitas = ptsVisitas.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    "",
  );
  const areaVisitas =
    ptsVisitas.length > 1
      ? `${pathVisitas} L ${ptsVisitas[ptsVisitas.length - 1].x} ${
          padTop + chartH
        } L ${ptsVisitas[0].x} ${padTop + chartH} Z`
      : "";

  const pathReg = ptsReg.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    "",
  );
  const areaReg =
    ptsReg.length > 1
      ? `${pathReg} L ${ptsReg[ptsReg.length - 1].x} ${padTop + chartH} L ${
          ptsReg[0].x
        } ${padTop + chartH} Z`
      : "";

  // Distribución por Tipo de Consulta
  const conteoPorTipo = [
    {
      tipo: "Cotización de Proyecto",
      cantidad: consultas.filter((c) => c.tipoConsulta === "Cotización de Proyecto")
        .length,
      color: "bg-brand-900",
    },
    {
      tipo: "Asesoría Técnica",
      cantidad: consultas.filter((c) => c.tipoConsulta === "Asesoría Técnica").length,
      color: "bg-accent-500",
    },
    {
      tipo: "Consulta General",
      cantidad: consultas.filter((c) => c.tipoConsulta === "Consulta General").length,
      color: "bg-status-info",
    },
  ];
  const totalConsultas = Math.max(consultas.length, 1);
  const maxFlujo = Math.max(
    ...metricas.map((m) => Math.max(m.nuevosRegistros, m.demosEjecutadas)),
    1,
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Gráfico 1: Estadísticas de Tráfico (Visitas Generales vs Usuarios Registrados) */}
      <div className="rounded-md border border-border bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand-900" aria-hidden="true" />
            <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-brand-900">
              Gráfico 1 · Estadísticas de Tráfico: Visitas Generales vs. Accesos Registrados
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 text-brand-900">
              <span className="h-3 w-3 rounded-full bg-brand-900" />
              Visitas Generales
            </span>
            <span className="inline-flex items-center gap-1.5 text-accent-600">
              <span className="h-3 w-3 rounded-full bg-accent-500" />
              Usuarios Registrados
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto min-w-[540px] select-none"
            role="img"
            aria-label="Gráfico interactivo de tráfico de visitas generales y usuarios registrados"
          >
            <defs>
              <linearGradient id={gradientVisitasId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F172A" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#0F172A" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id={gradientRegId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {[0, 0.33, 0.66, 1].map((ratio) => {
              const y = padTop + chartH * (1 - ratio);
              const val = Math.round(maxValor * ratio);
              return (
                <g key={ratio}>
                  <line
                    x1={padX}
                    y1={y}
                    x2={width - padX}
                    y2={y}
                    stroke="#CBD5E1"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={padX - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="fill-[#475569] text-[10px] font-mono font-semibold"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {areaVisitas && <path d={areaVisitas} fill={`url(#${gradientVisitasId})`} />}
            {pathVisitas && (
              <path
                d={pathVisitas}
                fill="none"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}

            {areaReg && <path d={areaReg} fill={`url(#${gradientRegId})`} />}
            {pathReg && (
              <path
                d={pathReg}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}

            {ptsVisitas.map((p, idx) => {
              const pReg = ptsReg[idx];
              const isHover = hoveredIdx === idx;
              return (
                <g
                  key={p.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHover ? 6 : 4}
                    fill="#0F172A"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <circle
                    cx={pReg.x}
                    cy={pReg.y}
                    r={isHover ? 6 : 4}
                    fill="#F59E0B"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                  <text
                    x={p.x}
                    y={height - 10}
                    textAnchor="middle"
                    className="fill-[#475569] text-[10px] font-mono font-bold"
                  >
                    {p.fecha.slice(5)}
                  </text>

                  {isHover && (
                    <g>
                      <rect
                        x={Math.min(Math.max(p.x - 75, 10), width - 165)}
                        y={Math.max(p.y - 52, 4)}
                        width="155"
                        height="44"
                        rx="6"
                        fill="#0F172A"
                      />
                      <text
                        x={Math.min(Math.max(p.x, 87), width - 87)}
                        y={Math.max(p.y - 34, 20)}
                        textAnchor="middle"
                        className="fill-[#F8F7F4] text-[10px] font-mono font-bold"
                      >
                        {p.fecha}: {p.visitasGenerales} visitas
                      </text>
                      <text
                        x={Math.min(Math.max(p.x, 87), width - 87)}
                        y={Math.max(p.y - 18, 35)}
                        textAnchor="middle"
                        className="fill-[#F59E0B] text-[10px] font-mono font-bold"
                      >
                        Registrados: {p.accesosUsuariosRegistrados} · Demos: {p.demosEjecutadas}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Gráfico 2: Flujo de Registros de Usuarios y Demos Ejecutadas por Fecha */}
      <div className="rounded-md border border-border bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-brand-900" aria-hidden="true" />
            <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-brand-900">
              Gráfico 2 · Flujo de Registros de Nuevos Usuarios y Ejecución de Demos
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 text-status-success-strong">
              <span className="h-3 w-3 rounded-full bg-status-success" />
              Nuevos Registros de Cuenta
            </span>
            <span className="inline-flex items-center gap-1.5 text-status-purple-strong">
              <span className="h-3 w-3 rounded-full bg-status-purple" />
              Demos Interactivas Ejecutadas
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {metricas.map((m) => {
            const hReg = Math.max(Math.round((m.nuevosRegistros / maxFlujo) * 100), 12);
            const hDemos = Math.max(Math.round((m.demosEjecutadas / maxFlujo) * 100), 18);
            return (
              <div
                key={m.id}
                className="flex flex-col items-center justify-between rounded-sm border border-border bg-cream-50/70 p-3"
              >
                <div className="flex h-28 w-full items-end justify-center gap-2 border-b border-border pb-2">
                  <div
                    title={`${m.nuevosRegistros} nuevos registros`}
                    style={{ height: `${hReg}%` }}
                    className="w-5 rounded-t-sm bg-status-success transition-all duration-normal"
                  />
                  <div
                    title={`${m.demosEjecutadas} demos ejecutadas`}
                    style={{ height: `${hDemos}%` }}
                    className="w-5 rounded-t-sm bg-status-purple transition-all duration-normal"
                  />
                </div>
                <div className="mt-2 text-center font-mono text-[11px]">
                  <strong className="block text-brand-900">{m.fecha.slice(5)}</strong>
                  <span className="text-status-success-strong">+{m.nuevosRegistros} reg</span>{" "}
                  · <span className="text-status-purple-strong">{m.demosEjecutadas} d</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gráficos 3 y 4 en paralelo */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Gráfico 3: Tipos de Consulta más frecuentes */}
        <div className="rounded-md border border-border bg-surface p-5 shadow-card">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-4">
            <PieChart className="h-5 w-5 text-brand-900" aria-hidden="true" />
            <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-brand-900">
              Gráfico 3 · Tipos de Consulta Más Frecuentes
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {conteoPorTipo.map((item) => {
              const pct = Math.round((item.cantidad / totalConsultas) * 100);
              return (
                <div key={item.tipo} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-brand-900">{item.tipo}</span>
                    <span className="font-mono text-text-secondary">
                      {item.cantidad} ({pct}%)
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-pill bg-cream-100">
                    <div
                      className={`h-full rounded-pill transition-all duration-normal ${item.color}`}
                      style={{ width: `${Math.max(pct, 6)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gráfico 4: Proyectos y Demos con mayor conversión */}
        <div className="rounded-md border border-border bg-surface p-5 shadow-card">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-4">
            <BarChart3 className="h-5 w-5 text-brand-900" aria-hidden="true" />
            <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-brand-900">
              Gráfico 4 · Tráfico y Ejecución por Proyecto / Demo
            </h3>
          </div>

          <div className="flex flex-col gap-3.5">
            {proyectos.map((prj) => {
              const maxVistas = Math.max(...proyectos.map((p) => p.vistasTotales), 1);
              const pctVistas = Math.round((prj.vistasTotales / maxVistas) * 100);
              return (
                <div key={prj.id} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-900 truncate max-w-[260px]">
                      {prj.codigo} · {prj.titulo.split("—")[0]}
                    </span>
                    <span className="font-mono font-bold text-text-secondary">
                      {prj.vistasTotales} vistas ·{" "}
                      <strong className="text-brand-900">
                        {prj.demosEjecutadas} demos
                      </strong>
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-pill bg-cream-100">
                    <div
                      className="h-full rounded-pill bg-brand-900 transition-all duration-normal"
                      style={{ width: `${Math.max(pctVistas, 8)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
