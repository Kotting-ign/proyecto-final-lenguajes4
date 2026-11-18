"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { usePortfolio } from "@/context/PortfolioContext";
import type { Integrante } from "@/data/portfolio";

/** Llamado a la acción final: lleva al formulario de contacto con el integrante preseleccionado. */
export function MemberContactCta({ integrante }: { integrante: Integrante }) {
  const { setContactoDestino } = usePortfolio();

  return (
    <div className="flex flex-col items-start justify-between gap-5 rounded-lg bg-brand-900 p-6 text-cream-50 sm:flex-row sm:items-center sm:p-8">
      <div>
        <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">
          ¿Trabajamos juntos?
        </h2>
        <p className="mt-1 text-sm text-cream-100/80">
          Escribile a {integrante.nombre} por una cotización, asesoría técnica o consulta general.
        </p>
      </div>
      <Link href="/#contacto" onClick={() => setContactoDestino(String(integrante.id))}>
        <Button variant="primary" size="lg">
          Ir al formulario de contacto
        </Button>
      </Link>
    </div>
  );
}
