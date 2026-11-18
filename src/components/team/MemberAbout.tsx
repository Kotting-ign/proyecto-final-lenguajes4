import { CheckCircle2, Sparkles, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Integrante } from "@/data/portfolio";

/** Bio, responsabilidades en el proyecto, logros, herramientas e intereses. */
export function MemberAbout({ integrante }: { integrante: Integrante }) {
  const { perfilTecnico } = integrante;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <div className="flex flex-col gap-4">
          {perfilTecnico.resumen.map((p) => (
            <p key={p} className="text-base leading-relaxed text-text-secondary">
              {p}
            </p>
          ))}

          <h3 className="mt-2 font-display text-sm font-extrabold uppercase tracking-wider text-brand-900">
            Logros destacados
          </h3>
          <ul className="flex flex-col gap-2.5">
            {integrante.logrosDestacados.map((logro) => (
              <li key={logro} className="flex items-start gap-2 text-sm text-text-primary">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-status-success" aria-hidden="true" />
                <span>{logro}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="lg:col-span-5">
        <div className="flex flex-col gap-5 rounded-md border border-border bg-surface p-5 shadow-card">
          <div>
            <h3 className="inline-flex items-center gap-1.5 font-display text-sm font-extrabold uppercase tracking-wider text-brand-900">
              <Wrench className="h-4 w-4 text-accent-600" aria-hidden="true" />
              Herramientas
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {perfilTecnico.herramientas.map((h) => (
                <span
                  key={h}
                  className="rounded-pill border border-brand-900/20 bg-cream-50 px-3 py-1 font-mono text-xs font-bold text-brand-900"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="inline-flex items-center gap-1.5 font-display text-sm font-extrabold uppercase tracking-wider text-brand-900">
              <Sparkles className="h-4 w-4 text-accent-600" aria-hidden="true" />
              Intereses técnicos
            </h3>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-text-secondary">
              {perfilTecnico.intereses.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
