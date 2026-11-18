"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Send,
  Share2,
  Terminal,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { usePortfolio } from "@/context/PortfolioContext";
import type { Integrante } from "@/data/portfolio";

/**
 * Cabecera del perfil técnico de un integrante.
 * Web APIs usadas: Clipboard API (copiar email) y Web Share API (compartir perfil).
 */
export function MemberHero({ integrante }: { integrante: Integrante }) {
  const { showToast } = useToast();
  const { setContactoDestino } = usePortfolio();
  const reduceMotion = useReducedMotion();
  const nombreCompleto = `${integrante.nombre} ${integrante.apellido}`;

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(integrante.email);
      showToast(
        "success",
        `Correo de ${integrante.nombre} (${integrante.email}) copiado al portapapeles.`,
      );
    } catch {
      showToast("error", `No se pudo copiar. Correo: ${integrante.email}`);
    }
  };

  const compartirPerfil = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${nombreCompleto} — ${integrante.rolPrincipal}`,
          text: integrante.tagline,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        showToast("success", "Enlace del perfil copiado al portapapeles.");
      }
    } catch {
      // El usuario canceló el diálogo de compartir.
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-border bg-cream-50 py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-text-secondary">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-sm hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/#equipo"
            className="rounded-sm hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
          >
            Equipo
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-brand-900">
            {nombreCompleto}
          </span>
        </nav>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-5 lg:col-span-7"
          >
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge variant="purple" icon={Users} label={`Integrante ${integrante.id} de 4`} />
              <StatusBadge
                variant={integrante.disponible ? "success" : "neutral"}
                label={integrante.disponible ? "Disponible para proyectos" : "No disponible"}
              />
            </div>

            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-pill bg-brand-900 font-display text-3xl font-extrabold text-accent-500 sm:h-24 sm:w-24 sm:text-4xl"
              >
                {integrante.avatarIniciales}
              </span>
              <div>
                <h1 className="font-display text-3xl font-extrabold uppercase leading-[0.98] tracking-tight text-brand-900 sm:text-5xl">
                  {nombreCompleto}
                </h1>
                <p className="mt-1.5 text-sm font-bold text-text-secondary sm:text-base">
                  {integrante.rolPrincipal}
                </p>
              </div>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {integrante.tagline}
            </p>

            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {integrante.ubicacion}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/#contacto" onClick={() => setContactoDestino(String(integrante.id))}>
                <Button variant="primary" size="lg">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Contactar a {integrante.nombre}
                </Button>
              </Link>
              <Button variant="secondary" size="lg" onClick={copiarEmail}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Copiar email ({integrante.email})
                <Copy className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="lg" onClick={compartirPerfil}>
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Compartir
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm font-bold">
              <a
                href={integrante.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm text-brand-900 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              {integrante.githubUser ? (
                <a
                  href={`https://github.com/${integrante.githubUser}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm text-brand-900 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
                >
                  <GitBranch className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              ) : null}
            </div>
          </motion.div>

          {/* Ficha técnica estilo terminal */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-lg border border-brand-700 bg-brand-900 text-cream-50 shadow-card">
              <div className="flex items-center justify-between border-b border-brand-700 bg-brand-700/60 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-status-danger" aria-hidden="true" />
                  <span className="h-3 w-3 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
                  <span className="h-3 w-3 shrink-0 rounded-full bg-status-success" aria-hidden="true" />
                  <span className="ml-2 truncate font-mono text-xs font-bold text-cream-100">
                    perfil://{integrante.slug}.ts
                  </span>
                </div>
                <Terminal className="h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
              </div>

              <div className="p-5 font-mono text-xs leading-relaxed">
                <p className="text-cream-100/70">{"// Ficha técnica"}</p>
                <p className="mt-2">
                  <span className="text-accent-500">const</span>{" "}
                  <span className="font-bold text-cream-50">perfil</span> = {"{"}
                </p>
                <p className="pl-4">
                  rol: <span className="text-status-success">&quot;{integrante.rolPrincipal}&quot;</span>,
                </p>
                <p className="pl-4">
                  email: <span className="text-status-success">&quot;{integrante.email}&quot;</span>,
                </p>
                <p className="pl-4">
                  especialidad:{" "}
                  <span className="text-status-success">&quot;{integrante.especialidad}&quot;</span>,
                </p>
                <p className="pl-4">stack: [</p>
                <div className="flex flex-wrap gap-1.5 py-1 pl-8">
                  {integrante.stackPrincipal.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-pill bg-brand-700 px-2 py-0.5 text-[11px] font-semibold text-accent-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="pl-4">],</p>
                <p>{"};"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
