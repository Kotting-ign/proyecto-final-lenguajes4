"use client";

import { UploadCloud, FileText, Image as ImageIcon, X, CheckCircle2, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";

export interface ValidatedAttachment {
  nombre: string;
  tipoMime: string;
  tamanoBytes: number;
  dimensiones?: { ancho: number; alto: number };
  previewUrl?: string;
}

interface FileUploadValidatorProps {
  label: string;
  hint?: string;
  acceptTypes?: string[];
  maxSizeMB?: number;
  minImageWidth?: number;
  minImageHeight?: number;
  onlyImages?: boolean;
  value: ValidatedAttachment | null;
  onChange: (file: ValidatedAttachment | null) => void;
  error?: string;
}

const DEFAULT_ACCEPT = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
];

export function FileUploadValidator({
  label,
  hint = "Formatos permitidos: PNG, JPG, WEBP o PDF (máx. 5 MB). Imágenes mín. 400×300 px.",
  acceptTypes = DEFAULT_ACCEPT,
  maxSizeMB = 5,
  minImageWidth = 400,
  minImageHeight = 300,
  onlyImages = false,
  value,
  onChange,
  error: externalError,
}: FileUploadValidatorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [validando, setValidando] = useState(false);

  const allowedTypes = onlyImages
    ? ["image/png", "image/jpeg", "image/webp"]
    : acceptTypes;

  const validarArchivo = (file: File) => {
    setLocalError(null);
    setValidando(true);

    // 1. Validación estricta de tipo MIME y extensión
    if (!allowedTypes.includes(file.type)) {
      setValidando(false);
      setLocalError(
        `Formato no permitido (${file.type || "desconocido"}). Solo se aceptan: ${allowedTypes
          .map((t) => t.split("/")[1].toUpperCase())
          .join(", ")}.`,
      );
      onChange(null);
      return;
    }

    // 2. Validación estricta de tamaño (ni vacío ni mayor al límite)
    if (file.size === 0) {
      setValidando(false);
      setLocalError("El archivo seleccionado está vacío (0 bytes).");
      onChange(null);
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setValidando(false);
      const actualMB = (file.size / (1024 * 1024)).toFixed(2);
      setLocalError(
        `El archivo pesa ${actualMB} MB y supera el límite estricto de ${maxSizeMB} MB.`,
      );
      onChange(null);
      return;
    }

    // 3. Validación de nombre de archivo seguro (sin caracteres peligrosos)
    if (!/^[\w\-. ()áéíóúÁÉÍÓÚñÑ]+$/.test(file.name)) {
      setValidando(false);
      setLocalError(
        "El nombre del archivo contiene caracteres especiales no válidos. Renombralo antes de subirlo.",
      );
      onChange(null);
      return;
    }

    // 4. Si es imagen, validar integridad del binario y dimensiones en píxeles con Web API Image()
    if (file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      const img = new window.Image();

      img.onload = () => {
        setValidando(false);
        if (img.width < minImageWidth || img.height < minImageHeight) {
          URL.revokeObjectURL(objectUrl);
          setLocalError(
            `Resolución insuficiente (${img.width}×${img.height} px). Se requiere mínimo ${minImageWidth}×${minImageHeight} px.`,
          );
          onChange(null);
          return;
        }
        onChange({
          nombre: file.name,
          tipoMime: file.type,
          tamanoBytes: file.size,
          dimensiones: { ancho: img.width, alto: img.height },
          previewUrl: objectUrl,
        });
      };

      img.onerror = () => {
        setValidando(false);
        URL.revokeObjectURL(objectUrl);
        setLocalError(
          "El archivo de imagen está corrupto o su encabezado binario no corresponde a una imagen válida.",
        );
        onChange(null);
      };

      img.src = objectUrl;
      return;
    }

    // Si es PDF válido
    setValidando(false);
    onChange({
      nombre: file.name,
      tipoMime: file.type,
      tamanoBytes: file.size,
    });
  };

  const displayError = localError || externalError;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-bold text-text-primary">{label}</span>

      <input
        ref={inputRef}
        type="file"
        accept={allowedTypes.join(",")}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) validarArchivo(f);
        }}
      />

      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex min-h-[104px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-4 text-center transition-colors duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 ${
            displayError
              ? "border-destructive bg-status-danger/5"
              : "border-border bg-cream-50/70 hover:border-brand-900 hover:bg-cream-100/60"
          }`}
        >
          <UploadCloud className="h-6 w-6 text-brand-900" aria-hidden="true" />
          <div className="text-sm font-bold text-brand-900">
            {validando
              ? "Verificando integridad y dimensiones del archivo..."
              : "Hacé clic para adjuntar imagen o especificación técnica"}
          </div>
          <p className="text-xs text-text-secondary">{hint}</p>
        </button>
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-md border border-status-success/40 bg-status-success/5 p-3">
          <div className="flex items-center gap-3 min-w-0">
            {value.previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value.previewUrl}
                alt={`Vista previa de ${value.nombre}`}
                className="h-12 w-16 shrink-0 rounded-sm border border-border object-cover"
              />
            ) : value.tipoMime.startsWith("image/") ? (
              <ImageIcon className="h-8 w-8 shrink-0 text-brand-900" aria-hidden="true" />
            ) : (
              <FileText className="h-8 w-8 shrink-0 text-brand-900" aria-hidden="true" />
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-status-success"
                  aria-hidden="true"
                />
                <p className="truncate text-sm font-bold text-brand-900">
                  {value.nombre}
                </p>
              </div>
              <p className="font-mono text-xs text-text-secondary">
                {(value.tamanoBytes / 1024).toFixed(1)} KB · {value.tipoMime}
                {value.dimensiones
                  ? ` · ${value.dimensiones.ancho}×${value.dimensiones.alto} px (Verificado)`
                  : " · Integridad verificada"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setLocalError(null);
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            aria-label="Quitar archivo adjunto"
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-pill text-text-secondary hover:bg-brand-900/10 hover:text-destructive"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {displayError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-sm bg-status-danger/10 px-3 py-2 text-xs font-bold text-status-danger-strong"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}
