import * as React from 'react';
import { cn } from './cn';
import { Label } from './Label';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label text. */
  label?: React.ReactNode;
  /** Marks the field required (adds the * marker on the label). */
  required?: boolean;
  /** Validation error; when set it renders in the danger tone and takes precedence over `hint`. */
  error?: string | null;
  /** Helper text shown below the control when there is no error. */
  hint?: string;
  /** id of the control the label points at (`htmlFor`). */
  htmlFor?: string;
}

/**
 * A labelled form row: Label + control (`children`) + hint/error — removes the
 * hand-rolled label+error markup generated forms repeat for every field.
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(
  { className, label, required = false, error, hint, htmlFor, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...rest}>
      {label != null && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
});
