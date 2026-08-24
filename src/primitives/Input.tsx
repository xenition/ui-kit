import * as React from 'react';
import { cn } from './cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Renders the danger border/ring state. */
  invalid?: boolean;
}

/** Themed text input bound to the `--xen-*` tokens. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid = false, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full bg-surface text-on-surface placeholder:text-muted',
        'border rounded-[var(--xen-radius-sm)] px-3 py-2 text-base transition-colors',
        'focus:outline-none focus:ring-1',
        invalid
          ? 'border-danger focus:border-danger focus:ring-danger'
          : 'border-border focus:border-primary focus:ring-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...rest}
    />
  );
});
