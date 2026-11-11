"use client";

import {
  Code2,
  Lock,
  Unlock,
  ShieldCheck,
  Users,
  Eye,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { usePortfolio } from "@/context/PortfolioContext";
import type { RolSistema } from "@/data/portfolio";

export function Navbar() {
  const pathname = usePathname();
  const { showToast } = useToast();
  const {
    sesion,
    counterVisitasGenerales,
    counterAccesosRegistrados,
    abrirModalAuth,
    cambiarRolDemoRapido,
    cerrarSesion,
  } = usePortfolio();

  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  const handleRolDemo = (nuevoRol: RolSistema) => {
    cambiarRolDemoRapido(nuevoRol);
    const etiquetas: Record<RolSistema, string> = {
      visitante: "Modo Visitante (Proyectos y Demos bloqueados con registro obligatorio)",
      registrado: "Modo Usuario Registrado (Proyectos y Demos Interactivas desbloqueadas)",
      operador: "Modo Operador (Gestión de Consultas y Respuestas por Email)",
      admin: "Modo Administrador Promoción (CRUD completo, Usuarios y Gráficos Analytics)",
    };
    showToast("success", etiquetas[nuevoRol]);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream-50/95 backdrop-blur-md print:hidden">
      {/* Barra superior de demostración para la exposición oral de la cátedra */}
      <div className="border-b border-brand-700 bg-brand-900 px-4 py-2 text-xs text-cream-50">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-accent-500">
              <span className="h-2 w-2 rounded-full bg-status-success animate-pulse" />
              TP INTEGRADOR LENGUAJES 4 (4 INTEGRANTES)
            </span>
            <span className="hidden text-cream-100/80 md:inline">|</span>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1" title="Counter de visitas generales">
                <Eye className="h-3.5 w-3.5 text-accent-500" aria-hidden="true" />
                Visitas: <strong>{counterVisitasGenerales.toLocaleString("es-AR")}</strong>
              </span>
              <span className="inline-flex items-center gap-1" title="Counter de accesos de usuarios registrados">
                <Users className="h-3.5 w-3.5 text-accent-500" aria-hidden="true" />
                Accesos Reg.: <strong>{counterAccesosRegistrados.toLocaleString("es-AR")}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] font-semibold text-cream-100/80">
              Simulador de Rol (Defensa TP):
            </span>
            {(
              [
                { id: "visitante", label: "1. Visitante" },
                { id: "registrado", label: "2. Registrado" },
                { id: "operador", label: "3. Operador" },
                { id: "admin", label: "4. Admin (Promoción)" },
              ] as const
            ).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRolDemo(r.id)}
                className={`cursor-pointer rounded-pill px-2.5 py-1 text-[11px] font-bold transition-colors duration-fast ${
                  sesion.rol === r.id
                    ? "bg-accent-500 text-brand-900"
                    : "bg-brand-700 text-cream-50 hover:bg-brand-700/80"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 rounded-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-900 text-accent-500 font-display font-extrabold text-lg">
            <Code2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="block font-display text-lg font-extrabold uppercase leading-none tracking-tight text-brand-900">
              KODEXA SQUAD
            </span>
            <span className="block font-mono text-[11px] font-semibold text-text-secondary">
              4 FULLSTACK DEVELOPERS
            </span>
          </div>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-6 lg:flex"
        >
          <Link
            href="/#equipo"
            className="text-sm font-bold text-text-primary hover:text-brand-700 transition-colors"
          >
            Equipo (4)
          </Link>
          <Link
            href="/#stack"
            className="text-sm font-bold text-text-primary hover:text-brand-700 transition-colors"
          >
            Stack & APIs
          </Link>
          <Link
            href="/#proyectos"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-text-primary hover:text-brand-700 transition-colors"
          >
            Proyectos & Demos
            {sesion.rol === "visitante" ? (
              <Lock className="h-3.5 w-3.5 text-status-warning" aria-hidden="true" />
            ) : (
              <Unlock className="h-3.5 w-3.5 text-status-success" aria-hidden="true" />
            )}
          </Link>
          <Link
            href="/#servicios"
            className="text-sm font-bold text-text-primary hover:text-brand-700 transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="/#contacto"
            className="text-sm font-bold text-text-primary hover:text-brand-700 transition-colors"
          >
            Contacto Email
          </Link>
          <Link
            href="/admin"
            className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors ${
              pathname === "/admin"
                ? "bg-brand-900 text-cream-50"
                : "border border-brand-900/30 bg-cream-100 text-brand-900 hover:bg-brand-900 hover:text-cream-50"
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
            Panel Operador / Admin
          </Link>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          {sesion.rol === "visitante" ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => abrirModalAuth()}
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              Registrarse / Iniciar Sesión
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <StatusBadge
                variant={sesion.rol === "admin" ? "purple" : "success"}
                icon={ShieldCheck}
                label={`${sesion.usuario?.nombre ?? "Usuario"} (${sesion.rol.toUpperCase()})`}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  cerrarSesion();
                  showToast("success", "Sesión cerrada. Volviste al modo Visitante.");
                }}
                aria-label="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Salir
              </Button>
            </div>
          )}
        </div>

        {/* Botón Hamburguesa Mobile */}
        <button
          type="button"
          onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
          aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú de navegación"}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-pill border border-border bg-surface text-brand-900 lg:hidden"
        >
          {menuMovilAbierto ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Menú Mobile Adaptativo */}
      {menuMovilAbierto && (
        <div className="border-t border-border bg-surface px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/#equipo"
              onClick={() => setMenuMovilAbierto(false)}
              className="py-2 text-sm font-bold text-brand-900"
            >
              Equipo Fullstack (4 Integrantes)
            </Link>
            <Link
              href="/#stack"
              onClick={() => setMenuMovilAbierto(false)}
              className="py-2 text-sm font-bold text-brand-900"
            >
              Stack Tecnológico & APIs Web
            </Link>
            <Link
              href="/#proyectos"
              onClick={() => setMenuMovilAbierto(false)}
              className="py-2 text-sm font-bold text-brand-900"
            >
              Proyectos y Demos Interactivas
            </Link>
            <Link
              href="/#servicios"
              onClick={() => setMenuMovilAbierto(false)}
              className="py-2 text-sm font-bold text-brand-900"
            >
              Servicios Ofertados
            </Link>
            <Link
              href="/#contacto"
              onClick={() => setMenuMovilAbierto(false)}
              className="py-2 text-sm font-bold text-brand-900"
            >
              Formulario de Contacto vía Email
            </Link>
            <Link
              href="/admin"
              onClick={() => setMenuMovilAbierto(false)}
              className="py-2 text-sm font-extrabold uppercase text-status-purple-strong"
            >
              Ir al Panel Operador / Administrador →
            </Link>
            <div className="pt-2 border-t border-border">
              {sesion.rol === "visitante" ? (
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setMenuMovilAbierto(false);
                    abrirModalAuth();
                  }}
                >
                  Registrarse para Desbloquear Demos
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    cerrarSesion();
                    setMenuMovilAbierto(false);
                  }}
                >
                  Cerrar Sesión ({sesion.usuario?.email})
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
