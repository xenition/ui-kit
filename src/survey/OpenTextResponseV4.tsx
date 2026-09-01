import * as React from 'react';
import { cn } from '../primitives/cn';
import type { OpenTextResponseProps } from './OpenTextResponse';

/** Drop-in for {@link OpenTextResponseProps} — same props, the V4 "focus" design. */
export type OpenTextResponseV4Props = OpenTextResponseProps;

/**
 * OpenTextResponse — **V4** "clean form / focus" design. A big, comfortable
 * multiline answer field on a calm `bg-surface`: a `border-border` hairline that
 * lifts to a soft **primary** ring/border on focus (the single signature accent),
 * an optional label, and a live character counter that turns **danger** once the
 * text meets or exceeds `maxLength`. Generous padding, rounded control, no
 * gradients. Fully controlled (`value`/`onChange`); preserves the `textbox`
 * a11y (`aria-label`, `aria-invalid`) and `maxLength` guard. Same props/behavior
 * as {@link OpenTextResponseProps}; all colors from `--xen-*` token classes (no
 * literal colors).
 */
export const OpenTextResponseV4 = React.forwardRef<HTMLDivElement, OpenTextResponseV4Props>(
  function OpenTextResponseV4(
    { value, onChange, placeholder, label, rows = 4, maxLength, error, disabled = false, className },
    ref
  ) {
    const atLimit = maxLength != null && value.length >= maxLength;
    const invalid = error != null;

    return (
      <div ref={ref} className={cn('flex flex-col gap-xs', className)}>
        {label ? <label className="text-sm font-semibold text-on-surface">{label}</label> : null}

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-label={label ?? placeholder ?? 'Your answer'}
          className={cn(
            'w-full resize-y rounded-[var(--xen-radius-lg)] border bg-surface px-md py-sm text-base text-on-surface',
            'placeholder:text-muted transition-colors outline-none',
            'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary',
            'disabled:pointer-events-none disabled:opacity-50',
            invalid ? 'border-danger focus-visible:ring-danger/40 focus-visible:border-danger' : 'border-border'
          )}
        />

        <div className="flex items-center justify-between">
          {error ? (
            <span className="flex-1 text-sm font-semibold text-danger">{error}</span>
          ) : (
            <span className="flex-1" />
          )}
          {maxLength != null ? (
            <span className={cn('text-xs', atLimit ? 'font-bold text-danger' : 'font-normal text-muted')}>
              {value.length} / {maxLength}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);
