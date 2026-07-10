import * as React from 'react';
import { cn } from './cn';

export interface DatePickerProps {
  /** ISO date string (yyyy-mm-dd). */
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
}

/** Native, zero-asset date input bound to the theme tokens. */
export function DatePicker({
  value,
  onChange,
  min,
  max,
  disabled,
  invalid,
  className,
}: DatePickerProps): React.ReactElement {
  return (
    <input
      type="date"
      value={value}
      min={min}
      max={max}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid || undefined}
      className={cn(
        'rounded-[var(--xen-radius-sm)] border bg-surface px-3 py-2 text-base text-on-surface',
        'focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50',
        invalid
          ? 'border-danger focus:border-danger focus:ring-danger'
          : 'border-border focus:border-primary focus:ring-primary',
        className
      )}
    />
  );
}
