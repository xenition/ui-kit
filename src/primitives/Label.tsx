import * as React from 'react';
import { cn } from './cn';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Appends a danger-colored required marker (*). */
  required?: boolean;
}

/** Themed form label bound to the `--xen-*` tokens. */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, required = false, children, ...rest },
  ref
) {
  return (
    <label ref={ref} className={cn('text-sm font-medium text-on-surface', className)} {...rest}>
      {children}
      {required && (
        <span className="ml-0.5 text-danger" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
});
