import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { INTEGRANTES_INICIALES, obtenerIntegrantesAdyacentes } from "@/data/integrantes";

/** Navegación entre los 4 perfiles: anterior / siguiente y acceso directo a cada integrante. */
export function MemberPager({ integranteId }: { integranteId: number }) {
  const { anterior, siguiente } = obtenerIntegrantesAdyacentes(integranteId);

  const linkClase =
    "group flex min-h-11 flex-1 flex-col gap-1 rounded-md border border-border bg-surface p-4 transition-colors hover:border-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900";

  return (
    <nav aria-label="Navegación entre perfiles del equipo" className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href={`/equipo/${anterior.slug}`} className={linkClase}>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-text-secondary">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Anterior
          </span>
          <span className="font-display text-base font-extrabold uppercase text-brand-900">
            {anterior.nombre} {anterior.apellido}
          </span>
          <span className="text-xs text-text-secondary">{anterior.rolPrincipal}</span>
        </Link>

        <Link href={`/equipo/${siguiente.slug}`} className={`${linkClase} sm:items-end sm:text-right`}>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-text-secondary">
            Siguiente
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="font-display text-base font-extrabold uppercase text-brand-900">
            {siguiente.nombre} {siguiente.apellido}
          </span>
          <span className="text-xs text-text-secondary">{siguiente.rolPrincipal}</span>
        </Link>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-2">
        {INTEGRANTES_INICIALES.map((i) => (
          <li key={i.id}>
            <Link
              href={`/equipo/${i.slug}`}
              aria-current={i.id === integranteId ? "page" : undefined}
              className={`inline-flex min-h-9 items-center rounded-pill px-3.5 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 ${
                i.id === integranteId
                  ? "bg-brand-900 text-cream-50"
                  : "border border-brand-900 text-brand-900 hover:bg-brand-900/5"
              }`}
            >
              {i.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
