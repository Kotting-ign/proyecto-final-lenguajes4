import type { ReactNode } from "react";
import { AuthRegistrationModal } from "@/components/auth/AuthRegistrationModal";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

/**
 * Estructura común de las páginas públicas (home y perfiles de equipo):
 * enlace "saltar al contenido", navbar, modal de registración y footer.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-brand-900"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <AuthRegistrationModal />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
