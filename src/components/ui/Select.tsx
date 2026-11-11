import type { SelectHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  requiredMark?: boolean;
  error?: string;
  hint?: string;
  id?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, requiredMark = false, error, hint, id, className = "", children, ...props },
    ref,
  ) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const describedBy = [error ? errorId : "", hint && !error ? hintId : ""]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-bold text-text-primary"
          >
            {label}
            {requiredMark && <span className="text-destructive"> *</span>}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={`h-11 min-h-11 cursor-pointer rounded-sm border bg-surface px-4 text-base font-normal text-text-primary transition-colors duration-fast ease-out focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20 disabled:cursor-not-allowed disabled:bg-cream-100 disabled:opacity-70 ${error ? "border-destructive" : "border-border"} ${className}`}
          {...props}
        >
          {children}
        </select>
        {error ? (
          <p id={errorId} role="alert" className="text-sm font-semibold text-destructive">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs font-medium text-text-secondary">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
