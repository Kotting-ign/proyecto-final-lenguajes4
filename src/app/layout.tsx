import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kodexa Squad — Portfolio Fullstack (4 Integrantes) · Lenguajes 4",
  description:
    "Portfolio Fullstack interactivo desarrollado por 4 integrantes. Incluye demos con registración obligatoria, contacto por email, panel operador y analytics de promoción.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <PortfolioProvider>{children}</PortfolioProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
