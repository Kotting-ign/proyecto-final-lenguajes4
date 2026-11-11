"use client";

import { Lock, UserPlus, LogIn, Globe, GitBranch, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { usePortfolio } from "@/context/PortfolioContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOLO_LETRAS_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,50}$/;

export function AuthRegistrationModal() {
  const {
    modalAuthAbierto,
    cerrarModalAuth,
    iniciarSesionEmail,
    registrarNuevoUsuario,
    loginExternoOAuth,
  } = usePortfolio();
  const { showToast } = useToast();

  const [modo, setModo] = useState<"registro" | "login">("registro");

  // Campos de Registro
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});

  const validarRegistro = () => {
    const errs: Record<string, string> = {};
    if (!SOLO_LETRAS_REGEX.test(nombre.trim())) {
      errs.nombre = "Ingresá un nombre válido (solo letras, entre 2 y 50 caracteres).";
    }
    if (!SOLO_LETRAS_REGEX.test(apellido.trim())) {
      errs.apellido = "Ingresá un apellido válido (solo letras, entre 2 y 50 caracteres).";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      errs.email = "Ingresá un correo electrónico corporativo o personal válido.";
    }
    if (empresa.trim().length < 2) {
      errs.empresa = "Indicá tu empresa, institución o universidad (mín. 2 caracteres).";
    }
    if (password.length < 8 || !/\d/.test(password)) {
      errs.password = "La contraseña debe tener al menos 8 caracteres e incluir 1 número.";
    }
    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});

    if (modo === "registro") {
      if (!validarRegistro()) return;
      const res = registrarNuevoUsuario({
        nombre,
        apellido,
        email,
        empresa,
        cargo: cargo || "Visitante Profesional",
        metodoAuth: "propio",
      });
      if (!res.ok) {
        setErrores({ email: res.error ?? "Error al registrar." });
        return;
      }
      showToast(
        "success",
        "¡Registro exitoso! Se desbloquearon todos los detalles de proyectos y las demos interactivas.",
      );
    } else {
      if (!EMAIL_REGEX.test(email.trim())) {
        setErrores({ email: "Ingresá un email válido para iniciar sesión." });
        return;
      }
      if (password.length < 4) {
        setErrores({ password: "Ingresá tu contraseña." });
        return;
      }
      const res = iniciarSesionEmail(email, password);
      if (!res.ok) {
        setErrores({ email: res.error ?? "No se pudo iniciar sesión." });
        return;
      }
      showToast("success", "¡Sesión iniciada! Proyectos y demos interactivas habilitadas.");
    }
  };

  const handleOAuth = (proveedor: "google" | "github") => {
    loginExternoOAuth(proveedor);
    showToast(
      "success",
      `Autenticación con ${
        proveedor === "google" ? "Google OAuth 2.0" : "GitHub OAuth"
      } completada. ¡Demos desbloqueadas!`,
    );
  };

  return (
    <Modal
      open={modalAuthAbierto}
      onClose={cerrarModalAuth}
      title="Acceso a Proyectos y Demos Interactivas"
      icon={<Lock className="h-5 w-5 text-brand-900" aria-hidden="true" />}
      maxWidth="max-w-xl"
    >
      <div className="flex flex-col gap-5">
        <div className="rounded-md border border-border bg-cream-50 p-3.5 text-xs text-text-secondary">
          <p className="font-bold text-brand-900">
            🔒 Requisito de Navegación (Sección 1.A del Trabajo Práctico):
          </p>
          <p className="mt-1">
            Para acceder al <strong>detalle técnico de arquitectura</strong> y ejecutar las{" "}
            <strong>demos interactivas en vivo</strong>, debés registrarte previamente en nuestra
            base de datos o autenticarte con un proveedor externo.
          </p>
        </div>

        {/* Selector de modo: Registro vs Login */}
        <div className="grid grid-cols-2 gap-2 rounded-pill bg-cream-100 p-1">
          <button
            type="button"
            onClick={() => {
              setModo("registro");
              setErrores({});
            }}
            className={`flex h-10 cursor-pointer items-center justify-center gap-2 rounded-pill text-xs font-extrabold uppercase transition-colors ${
              modo === "registro"
                ? "bg-brand-900 text-cream-50"
                : "text-text-secondary hover:text-brand-900"
            }`}
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Crear Cuenta Propia
          </button>
          <button
            type="button"
            onClick={() => {
              setModo("login");
              setErrores({});
            }}
            className={`flex h-10 cursor-pointer items-center justify-center gap-2 rounded-pill text-xs font-extrabold uppercase transition-colors ${
              modo === "login"
                ? "bg-brand-900 text-cream-50"
                : "text-text-secondary hover:text-brand-900"
            }`}
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Ya tengo cuenta
          </button>
        </div>

        {/* Autenticación externa rápida (Google / GitHub) */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Autenticación Externa Instantánea (OAuth 2.0):
          </span>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => handleOAuth("google")}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              Continuar con Google
            </Button>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => handleOAuth("github")}
            >
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              Continuar con GitHub
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-border" />
          <span className="bg-surface px-3 text-xs font-semibold uppercase text-text-secondary">
            o en Base de Datos Propia (SQL)
          </span>
          <div className="w-full border-t border-border" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {modo === "registro" && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Nombre"
                  requiredMark
                  placeholder="Ej: Sofía"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  error={errores.nombre}
                />
                <Input
                  label="Apellido"
                  requiredMark
                  placeholder="Ej: Martínez"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  error={errores.apellido}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Empresa / Universidad"
                  requiredMark
                  placeholder="Ej: Cátedra Lenguajes 4"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  error={errores.empresa}
                />
                <Input
                  label="Rol / Cargo"
                  placeholder="Ej: Docente / Recruiter / CTO"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                />
              </div>
            </>
          )}

          <Input
            label="Correo Electrónico"
            type="email"
            requiredMark
            placeholder="ejemplo@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errores.email}
            hint={
              modo === "login"
                ? "Podés probar con: lucia.fernandez@clinicavetsur.com.ar o catedra.lenguajes4@universidad.edu.ar"
                : undefined
            }
          />

          <Input
            label="Contraseña"
            type="password"
            requiredMark
            placeholder="Mínimo 8 caracteres y 1 número"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errores.password}
          />

          <div className="mt-2 flex items-center justify-between gap-3 pt-2 border-t border-border">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <ShieldCheck className="h-4 w-4 text-status-success" aria-hidden="true" />
              <span>Incrementa el Counter de Usuarios Registrados</span>
            </div>
            <Button type="submit" variant="primary" size="md">
              {modo === "registro" ? "Registrarme y Desbloquear" : "Iniciar Sesión"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
