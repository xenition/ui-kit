import * as React from 'react';
import { cn } from '../primitives/cn';
import type { CompatibilityMeterProps } from './CompatibilityMeter';

/** Drop-in alternate design — identical props to `CompatibilityMeter`. */
export type CompatibilityMeterV3Props = CompatibilityMeterProps;

interface Band {
  word: string;
  text: string;
  /** Fill token for a lit segment. */
  fill: string;
}

/** Score bands → tone + spelled-out word (meaning never rests on color). */
function bandFor(score: number): Band {
  if (score >= 80) return { word: 'Great match', text: 'text-success', fill: 'bg-success' };
  if (score >= 55) return { word: 'Good match', text: 'text-primary', fill: 'bg-primary' };
  if (score >= 30) return { word: 'Some overlap', text: 'text-accent', fill: 'bg-accent' };
  return { word: 'Low overlap', text: 'text-muted', fill: 'bg-muted' };
}

const SEGMENTS = 10;
const SEG_H: Record<CompatibilityMeterProps['size'] & string, string> = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

/**
 * CompatibilityMeter — design variant **V3**, a **segmented bar** (web parity of
 * the native V3). The score is quantised into ten discrete pips that fill in the
 * band tone up to the value — a chunky, glanceable read distinct from the base's
 * smooth progress bar — with the label, percentage, and a spelled-out band word on
 * a header row above. Same `CompatibilityMeterProps`; token classes only; clamped
 * and NaN-guarded; loading skeleton included.
 */
export const CompatibilityMeterV3 = React.forwardRef<HTMLDivElement, CompatibilityMeterV3Props>(
  function CompatibilityMeterV3(
    { score, label = 'Compatibility', showValue = true, size = 'md', loading = false, className, ...rest },
    ref
  ) {
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
    const band = bandFor(clamped);
    const filled = Math.round((clamped / 100) * SEGMENTS);
    const a11y = `${label}: ${clamped} percent, ${band.word}`;

    if (loading) {
      return (
        <div ref={ref} role="progressbar" aria-label={`${label}: loading`} className={cn('flex flex-col gap-xs', className)} {...rest}>
          <div className="h-3 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="flex gap-xs">
            {Array.from({ length: SEGMENTS }).map((_, i) => (
              <div key={i} className={cn('flex-1 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200', SEG_H[size])} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={a11y}
        className={cn('flex flex-col gap-xs', className)}
        {...rest}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-on-surface">{label}</span>
          {showValue ? (
            <span className={cn('text-sm font-semibold', band.text)}>
              {clamped}% · {band.word}
            </span>
          ) : (
            <span className="text-sm font-semibold text-muted">{band.word}</span>
          )}
        </div>
        <div className="flex gap-xs" aria-hidden="true">
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 rounded-[var(--xen-radius-sm)] transition-colors duration-200 motion-reduce:transition-none',
                SEG_H[size],
                i < filled ? band.fill : 'bg-neutral-200'
              )}
            />
          ))}
        </div>
      </div>
    );
  }
);
