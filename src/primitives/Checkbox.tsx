import * as React from 'react';
import { cn } from './cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Renders the danger state. */
  invalid?: boolean;
}

/** Themed checkbox bound to the `--xen-*` tokens — the check fills with the primary color. */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, invalid = false, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-invalid={invalid || undefined}
      className={cn(
        'h-4 w-4 shrink-0 cursor-pointer rounded-[var(--xen-radius-sm)] accent-primary',
        'border border-border transition-colors',
        'focus:outline-none focus:ring-1 focus:ring-primary',
        invalid && 'ring-1 ring-danger',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...rest}
    />
  );
});
