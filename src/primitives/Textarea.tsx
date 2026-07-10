import * as React from 'react';
import { cn } from './cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Renders the danger border/ring state. */
  invalid?: boolean;
}

/** Themed multi-line text input bound to the `--xen-*` tokens. Mirrors Input. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid = false, rows = 4, ...rest },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full bg-surface text-on-surface placeholder:text-muted resize-y',
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
