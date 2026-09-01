import * as React from 'react';
import { cn } from '../primitives/cn';
import type { SurveyProgressProps } from './SurveyProgress';

/** Drop-in for {@link SurveyProgressProps} — same props, the V4 "focus" design. */
export type SurveyProgressV4Props = SurveyProgressProps;

/**
 * SurveyProgress — **V4** "clean form / focus" design (web parity of the native
 * V4). Deliberately calm — NO gradient — so it never competes with the question:
 * a clean rounded progress bar (track = soft-primary tint `bg-primary/10`, fill =
 * solid `bg-primary`) under a legible "Step N of M" line with a big primary
 * percentage numeral. `steps` swaps the bar for a segmented dot-per-question
 * track; `fraction` shows just the caption. Exposes a `progressbar` role with
 * min/max/now so assistive tech can read completion. `current` is clamped into
 * `[0, total]`. Same props/behavior as {@link SurveyProgressProps}; all colors
 * from `--xen-*` token classes (no literal colors), dark-mode safe.
 */
export const SurveyProgressV4 = React.forwardRef<HTMLDivElement, SurveyProgressV4Props>(
  function SurveyProgressV4({ current, total, variant = 'bar', showLabel = true, label, className }, ref) {
    const safeTotal = Math.max(1, Math.floor(total));
    const safeCurrent = Math.max(0, Math.min(safeTotal, Math.floor(current)));
    const pct = Math.round((safeCurrent / safeTotal) * 100);
    const caption = label ?? `Step ${safeCurrent} of ${safeTotal}`;

    return (
      <div ref={ref} data-xen-survey-progress="" aria-label={caption} className={cn('flex flex-col gap-sm', className)}>
        {showLabel ? (
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-muted">{caption}</span>
            {variant !== 'fraction' ? (
              <span className="text-xl font-extrabold tabular-nums text-primary">{pct}%</span>
            ) : null}
          </div>
        ) : null}

        {variant === 'bar' ? (
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={safeTotal}
            aria-valuenow={safeCurrent}
            aria-label={caption}
            className="h-2 w-full overflow-hidden rounded-full bg-primary/10"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{ width: `${pct}%` }}
            />
          </div>
        ) : variant === 'steps' ? (
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={safeTotal}
            aria-valuenow={safeCurrent}
            aria-label={caption}
            className="flex gap-xs"
          >
            {Array.from({ length: safeTotal }, (_, i) => (
              <span
                key={i}
                className={cn('h-2 flex-1 rounded-full', i < safeCurrent ? 'bg-primary' : 'bg-primary/10')}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
