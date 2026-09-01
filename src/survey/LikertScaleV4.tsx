import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LikertScaleProps } from './LikertScale';

/** Drop-in for {@link LikertScaleProps} — same props, the V4 "focus" design. */
export type LikertScaleV4Props = LikertScaleProps;

/**
 * LikertScale — **V4** "clean form / focus" design. A calm, legible agreement
 * scale: the N points render as a row of big, tappable pills (min height 44px)
 * that wrap responsively. The selected pill is a solid **primary** fill with
 * on-primary text; unselected pills sit on `bg-surface` with a `border-border`
 * hairline and a soft `bg-primary/10` hover tint. One accent, generous 8-pt air.
 * Same props/behavior as {@link LikertScaleProps} — the `radiogroup`/`radio`
 * roles, `aria-checked`, anchor labels and `onChange` are all preserved; all
 * colors come from `--xen-*` token classes (no literal colors).
 */
export const LikertScaleV4 = React.forwardRef<HTMLDivElement, LikertScaleV4Props>(
  function LikertScaleV4(
    {
      points = 5,
      value,
      onChange,
      minLabel,
      maxLabel,
      'aria-label': ariaLabel = 'Agreement scale',
      variant = 'dots',
      disabled = false,
      className,
    },
    ref
  ) {
    const count = Math.max(2, Math.floor(points));

    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)}>
        <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-xs">
          {Array.from({ length: count }, (_, i) => {
            const point = i + 1;
            const selected = value === point;
            return (
              <button
                key={point}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`Point ${point} of ${count}`}
                disabled={disabled}
                onClick={() => onChange?.(point)}
                className={cn(
                  'flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-lg)] border px-md py-sm text-sm font-bold transition-colors',
                  'disabled:pointer-events-none disabled:opacity-50',
                  selected
                    ? 'border-2 border-primary bg-primary text-on-primary'
                    : 'border-border bg-surface text-on-surface hover:bg-primary/10'
                )}
              >
                {variant === 'numbered' ? point : null}
              </button>
            );
          })}
        </div>

        {minLabel || maxLabel ? (
          <div className="flex justify-between">
            <span className="shrink text-xs text-muted">{minLabel ?? ''}</span>
            <span className="shrink text-right text-xs text-muted">{maxLabel ?? ''}</span>
          </div>
        ) : null}
      </div>
    );
  }
);
