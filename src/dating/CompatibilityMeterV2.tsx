import * as React from 'react';
import { cn } from '../primitives/cn';
import type { CompatibilityMeterProps } from './CompatibilityMeter';

/** Drop-in alternate design — identical props to `CompatibilityMeter`. */
export type CompatibilityMeterV2Props = CompatibilityMeterProps;

interface Band {
  word: string;
  /** Text token for the numeric hero. */
  text: string;
  /** Border token for the disc ring. */
  border: string;
  /** Solid dot token for the band pill. */
  dot: string;
  /** Tint token for the disc fill + pill background. */
  tint: string;
}

/** Score bands → tone + spelled-out word (meaning never rests on color). */
function bandFor(score: number): Band {
  if (score >= 80)
    return { word: 'Great match', text: 'text-success', border: 'border-success', dot: 'bg-success', tint: 'bg-success/10' };
  if (score >= 55)
    return { word: 'Good match', text: 'text-primary', border: 'border-primary', dot: 'bg-primary', tint: 'bg-primary/10' };
  if (score >= 30)
    return { word: 'Some overlap', text: 'text-accent', border: 'border-accent', dot: 'bg-accent', tint: 'bg-accent/10' };
  return { word: 'Low overlap', text: 'text-muted', border: 'border-muted', dot: 'bg-muted', tint: 'bg-neutral-100' };
}

const DIAL: Record<CompatibilityMeterProps['size'] & string, string> = {
  sm: 'h-16 w-16 text-lg',
  md: 'h-24 w-24 text-2xl',
  lg: 'h-32 w-32 text-3xl',
};

/**
 * CompatibilityMeter — design variant **V2**, a bold **score dial** (web parity of
 * the native V2). A large, tone-tinted disc makes the numeric percentage the hero,
 * with the label caption above and the spelled-out band word in a pill beneath — a
 * stat-tile feel, distinct from the base's slim inline bar/ring. Same
 * `CompatibilityMeterProps`; token classes only; input is clamped and NaN-guarded;
 * a loading skeleton is included and meaning never rests on color.
 */
export const CompatibilityMeterV2 = React.forwardRef<HTMLDivElement, CompatibilityMeterV2Props>(
  function CompatibilityMeterV2(
    { score, label = 'Compatibility', showValue = true, size = 'md', loading = false, className, ...rest },
    ref
  ) {
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
    const band = bandFor(clamped);
    const a11y = `${label}: ${clamped} percent, ${band.word}`;

    if (loading) {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-label={`${label}: loading`}
          className={cn('flex flex-col items-center gap-sm', className)}
          {...rest}
        >
          <div className={cn('animate-pulse rounded-full bg-neutral-200', DIAL[size])} />
          <div className="h-3 w-24 animate-pulse rounded-full bg-neutral-200" />
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
        className={cn('flex flex-col items-center gap-sm', className)}
        {...rest}
      >
        <span className="text-xs font-bold uppercase tracking-wide text-muted">{label}</span>
        <div
          className={cn(
            'flex items-center justify-center rounded-full border-[6px] font-extrabold text-on-surface transition-transform duration-200 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:transform-none',
            band.border,
            band.tint,
            DIAL[size]
          )}
        >
          {showValue ? (
            <span>
              {clamped}
              <span className="text-sm font-bold">%</span>
            </span>
          ) : null}
        </div>
        <span className={cn('inline-flex items-center gap-xs rounded-full px-sm py-xs', band.tint)}>
          <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', band.dot)} />
          <span className="text-sm font-bold text-on-surface">{band.word}</span>
        </span>
      </div>
    );
  }
);
