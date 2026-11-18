import { Code2, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { INTEGRANTES_INICIALES } from "@/data/integrantes";

const enlaceClase =
  "rounded-sm text-sm text-cream-100/85 transition-colors hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500";

export function Footer() {
  return (
    <footer className="border-t border-brand-700 bg-brand-900 py-12 text-cream-50 print:hidden">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent-500 font-display font-extrabold text-brand-900">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-display text-xl font-extrabold uppercase tracking-tight">
                Kodexa Squad
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-cream-100/75">
              Portfolio fullstack grupal de 4 integrantes. Trabajo Práctico Integrador ·
              Lenguajes 4.
            </p>
          </div>

          <nav aria-label="Equipo" className="md:col-span-3">
            <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-accent-500">
              Equipo
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {INTEGRANTES_INICIALES.map((i) => (
                <li key={i.id}>
                  <Link href={`/equipo/${i.slug}`} className={enlaceClase}>
                    {i.nombre} {i.apellido}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Secciones del sitio" className="md:col-span-2">
            <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-accent-500">
              Sitio
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link href="/#stack" className={enlaceClase}>
                  Stack
                </Link>
              </li>
              <li>
                <Link href="/#proyectos" className={enlaceClase}>
                  Proyectos y demos
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className={enlaceClase}>
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className={enlaceClase}>
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-accent-500">
              Gestión
            </h2>
            <Link href="/admin" className="mt-3 inline-block">
              <Button variant="primary" size="sm">
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                Panel Operador
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
