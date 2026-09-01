import * as React from 'react';
import { cn } from '../primitives/cn';
import { npsBucket, type NPSScaleProps, type NPSBucket } from './NPSScale';

/** Drop-in for {@link NPSScaleProps} — same props, the V4 "focus" design. */
export type NPSScaleV4Props = NPSScaleProps;

/** Selected-cell classes when `colorByBucket` — semantic tokens per bucket. */
const BUCKET_BG: Record<NPSBucket, string> = {
  detractor: 'bg-danger border-danger text-on-danger',
  passive: 'bg-warn border-warn text-on-warn',
  promoter: 'bg-success border-success text-on-success',
};

/**
 * NPSScale — **V4** "clean form / focus" design. Eleven big 0–10 cells (min
 * height 44px, bold 800 numerals) in a calm, legible row that wraps, with the
 * anchor labels underneath. The selected cell is a solid **primary** fill with
 * on-primary numeral by default, or its semantic **bucket** color
 * (detractor→danger, passive→warn, promoter→success) when `colorByBucket`;
 * unselected cells sit on `bg-surface` + `border-border` with a soft
 * `bg-primary/10` hover. One accent otherwise. Same props/behavior as
 * {@link NPSScaleProps} — the `radiogroup`/`radio` roles, `aria-checked`, bucket
 * announcements and `onChange` are all preserved; all colors come from `--xen-*`
 * token classes (no literal colors).
 */
export const NPSScaleV4 = React.forwardRef<HTMLDivElement, NPSScaleV4Props>(function NPSScaleV4(
  {
    value,
    onChange,
    minLabel = 'Not at all likely',
    maxLabel = 'Extremely likely',
    colorByBucket = false,
    'aria-label': ariaLabel = 'Likelihood to recommend, 0 to 10',
    disabled = false,
    className,
  },
  ref
) {
  return (
    <div ref={ref} className={cn('flex flex-col gap-sm', className)}>
      <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-xs">
        {Array.from({ length: 11 }, (_, score) => {
          const selected = value === score;
          const bucket = npsBucket(score);
          const selectedClasses = colorByBucket ? BUCKET_BG[bucket] : 'bg-primary border-primary text-on-primary';
          return (
            <button
              key={score}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${score}, ${bucket}`}
              disabled={disabled}
              onClick={() => onChange?.(score)}
              className={cn(
                'flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-md)] border text-lg font-extrabold transition-colors',
                'disabled:pointer-events-none disabled:opacity-50',
                selected
                  ? cn('border-2', selectedClasses)
                  : 'border-border bg-surface text-on-surface hover:bg-primary/10'
              )}
            >
              {score}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <span className="shrink text-xs text-muted">{minLabel}</span>
        <span className="shrink text-right text-xs text-muted">{maxLabel}</span>
      </div>
    </div>
  );
});
