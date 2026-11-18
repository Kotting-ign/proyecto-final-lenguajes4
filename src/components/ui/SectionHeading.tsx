import type { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  icon?: LucideIcon;
  description?: string;
  as?: "h2" | "h3";
}

/** Encabezado de sección reutilizable (etiqueta superior + título display). */
export function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
  description,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-text-secondary">
          {Icon ? <Icon className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" /> : null}
          {eyebrow}
        </span>
        <Tag className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-brand-900 sm:text-4xl">
          {title}
        </Tag>
      </div>
      {description ? <p className="max-w-md text-sm text-text-secondary">{description}</p> : null}
    </div>
  );
}
