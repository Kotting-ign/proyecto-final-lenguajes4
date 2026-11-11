"use client";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
  disabled?: boolean;
}

export function Switch({
  checked,
  onChange,
  ariaLabel,
  disabled = false,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-11 min-h-11 w-14 shrink-0 cursor-pointer items-center rounded-pill px-1 transition-colors duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? "bg-status-success" : "bg-cream-100 border border-border"
      }`}
    >
      <span
        className={`inline-block h-6 w-6 rounded-full bg-surface shadow transition-transform duration-fast ease-out ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}
