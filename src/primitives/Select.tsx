import * as React from 'react';
import { cn } from './cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Renders the danger border/ring state. */
  invalid?: boolean;
}

/**
 * Themed `<select>` bound to the `--xen-*` tokens — the control every relation or
 * enum field needs. Pass `<option>` (or `<optgroup>`) children; the native caret is
 * kept for zero-asset, accessible behavior.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid = false, children, ...rest },
  ref
) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full bg-surface text-on-surface',
        'border rounded-[var(--xen-radius-sm)] px-3 py-2 text-base transition-colors',
        'focus:outline-none focus:ring-1',
        invalid
          ? 'border-danger focus:border-danger focus:ring-danger'
          : 'border-border focus:border-primary focus:ring-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
});
