"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, GitBranch, Globe, RefreshCw, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface PerfilGitHub {
  login: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
}

interface RepoGitHub {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  htmlUrl: string;
  updatedAt: string;
}

type Estado =
  | { tipo: "cargando" }
  | { tipo: "ok"; perfil: PerfilGitHub; repos: RepoGitHub[] }
  | { tipo: "error"; mensaje: string };

interface GitHubPanelProps {
  githubUser: string;
  nombre: string;
}

/**
 * Integración Web API: GitHub REST API (pública, sin token).
 *   GET https://api.github.com/users/{user}
 *   GET https://api.github.com/users/{user}/repos?sort=updated&per_page=4
 * Sólo muestra datos reales; ante errores (red, límite de uso, usuario inexistente) lo informa.
 */
async function consultarGitHub(githubUser: string, signal: AbortSignal): Promise<Estado | null> {
  try {
    const base = `https://api.github.com/users/${encodeURIComponent(githubUser)}`;
    const [resPerfil, resRepos] = await Promise.all([
      fetch(base, { signal, headers: { Accept: "application/vnd.github+json" } }),
      fetch(`${base}/repos?sort=updated&per_page=4`, {
        signal,
        headers: { Accept: "application/vnd.github+json" },
      }),
    ]);

    if (resPerfil.status === 404) {
      return { tipo: "error", mensaje: `No existe el usuario “${githubUser}” en GitHub.` };
    }
    if (resPerfil.status === 403 || resPerfil.status === 429) {
      return {
        tipo: "error",
        mensaje: "GitHub limitó temporalmente las consultas anónimas. Probá de nuevo en unos minutos.",
      };
    }
    if (!resPerfil.ok || !resRepos.ok) {
      return { tipo: "error", mensaje: "No se pudo obtener la información de GitHub." };
    }

    const p = await resPerfil.json();
    const r: Array<Record<string, unknown>> = await resRepos.json();

    return {
      tipo: "ok",
      perfil: {
        login: String(p.login),
        bio: (p.bio as string | null) ?? null,
        publicRepos: Number(p.public_repos ?? 0),
        followers: Number(p.followers ?? 0),
        following: Number(p.following ?? 0),
        htmlUrl: String(p.html_url),
      },
      repos: r.map((repo) => ({
        id: Number(repo.id),
        name: String(repo.name),
        description: (repo.description as string | null) ?? null,
        language: (repo.language as string | null) ?? null,
        stars: Number(repo.stargazers_count ?? 0),
        htmlUrl: String(repo.html_url),
        updatedAt: String(repo.updated_at),
      })),
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return null;
    return { tipo: "error", mensaje: "Sin conexión con la API de GitHub." };
  }
}

export function GitHubPanel({ githubUser, nombre }: GitHubPanelProps) {
  const reduceMotion = useReducedMotion();
  const [estado, setEstado] = useState<Estado>({ tipo: "cargando" });

  useEffect(() => {
    if (!githubUser) return;
    const controller = new AbortController();
    void consultarGitHub(githubUser, controller.signal).then((resultado) => {
      if (resultado) setEstado(resultado);
    });
    return () => controller.abort();
  }, [githubUser]);

  const reintentar = () => {
    setEstado({ tipo: "cargando" });
    void consultarGitHub(githubUser, new AbortController().signal).then((resultado) => {
      if (resultado) setEstado(resultado);
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-brand-700 bg-brand-900 text-cream-50 shadow-card">
      <div className="flex items-center justify-between gap-2 border-b border-brand-700 bg-brand-700/60 px-5 py-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-accent-500">
          <GitBranch className="h-4 w-4" aria-hidden="true" />
          GitHub REST API
        </span>
        <Globe className="h-4 w-4 text-cream-100/70" aria-hidden="true" />
      </div>

      <div className="p-5" aria-live="polite">
        {!githubUser ? (
          <p className="text-sm text-cream-100/80">
            El usuario de GitHub de {nombre} todavía no fue configurado.
            <span className="mt-1 block font-mono text-[11px] text-cream-100/60">
              Editar `githubUser` en src/data/integrantes.ts
            </span>
          </p>
        ) : estado.tipo === "cargando" ? (
          <div className="flex items-center gap-2 font-mono text-xs text-cream-100/80">
            <RefreshCw className={`h-4 w-4 ${reduceMotion ? "" : "animate-spin"}`} aria-hidden="true" />
            GET api.github.com/users/{githubUser} …
          </div>
        ) : estado.tipo === "error" ? (
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-cream-100/90">{estado.mensaje}</p>
            <Button variant="primary" size="sm" onClick={reintentar}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Reintentar
            </Button>
          </div>
        ) : (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <a
                href={estado.perfil.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm font-mono text-sm font-bold text-accent-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              >
                @{estado.perfil.login}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <span className="font-mono text-[11px] text-status-success">✓ Datos en vivo</span>
            </div>

            {estado.perfil.bio ? (
              <p className="text-sm text-cream-100/85">{estado.perfil.bio}</p>
            ) : null}

            <dl className="grid grid-cols-3 gap-2 rounded-sm bg-brand-700/70 p-3 text-center">
              {[
                { etiqueta: "Repos", valor: estado.perfil.publicRepos },
                { etiqueta: "Seguidores", valor: estado.perfil.followers },
                { etiqueta: "Siguiendo", valor: estado.perfil.following },
              ].map((s) => (
                <div key={s.etiqueta}>
                  <dt className="text-[10px] uppercase text-cream-100/70">{s.etiqueta}</dt>
                  <dd className="font-mono text-base font-bold text-accent-500">{s.valor}</dd>
                </div>
              ))}
            </dl>

            <div>
              <h3 className="font-mono text-[11px] font-bold uppercase text-cream-100/70">
                Repositorios recientes
              </h3>
              {estado.repos.length === 0 ? (
                <p className="mt-2 text-xs text-cream-100/70">Sin repositorios públicos.</p>
              ) : (
                <ul className="mt-2 flex flex-col gap-2">
                  {estado.repos.map((repo) => (
                    <li key={repo.id} className="rounded-sm bg-brand-700/60 px-3 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate font-mono text-xs font-bold text-cream-50 hover:text-accent-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                        >
                          {repo.name}
                        </a>
                        <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-cream-100/80">
                          <Star className="h-3 w-3" aria-hidden="true" />
                          {repo.stars}
                        </span>
                      </div>
                      {repo.description ? (
                        <p className="mt-0.5 truncate text-[11px] text-cream-100/70">{repo.description}</p>
                      ) : null}
                      <p className="mt-0.5 font-mono text-[10px] text-cream-100/60">
                        {repo.language ?? "—"} · actualizado{" "}
                        {new Date(repo.updatedAt).toLocaleDateString("es-AR")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
