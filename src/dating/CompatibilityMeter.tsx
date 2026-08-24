import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';
import type { ProgressTone } from '../primitives';

export type CompatibilityMeterVariant = 'bar' | 'ring' | 'compact';
export type CompatibilityMeterSize = 'sm' | 'md' | 'lg';

export interface CompatibilityMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Compatibility score 0–100. */
  score: number;
  /** Heading above the meter. */
  label?: string;
  /** Show the numeric percentage. Defaults to true. */
  showValue?: boolean;
  /** Presentation. `bar` (default), `ring` (dial), or `compact` (inline pill). */
  variant?: CompatibilityMeterVariant;
  /** Size scale (drives ring diameter / text). Defaults to `md`. */
  size?: CompatibilityMeterSize;
  /** Loading skeleton (indeterminate). */
  loading?: boolean;
}

interface Band {
  word: string;
  /** Text/border token class for the band's tone. */
  text: string;
  border: string;
  dot: string;
  /** Progress tone (web `Progress` has no `accent`; the `accent` band → `warn`). */
  progress: ProgressTone;
}

/** Score bands → semantic tone. The band is always spelled out in words, never color-alone. */
function bandFor(score: number): Band {
  if (score >= 80)
    return { word: 'Great match', text: 'text-success', border: 'border-success', dot: 'bg-success', progress: 'success' };
  if (score >= 55)
    return { word: 'Good match', text: 'text-primary', border: 'border-primary', dot: 'bg-primary', progress: 'primary' };
  if (score >= 30)
    return { word: 'Some overlap', text: 'text-accent', border: 'border-accent', dot: 'bg-accent', progress: 'warn' };
  return { word: 'Low overlap', text: 'text-muted', border: 'border-muted', dot: 'bg-muted', progress: 'primary' };
}

const RING_SIZE: Record<CompatibilityMeterSize, string> = {
  sm: 'h-12 w-12 text-base',
  md: 'h-16 w-16 text-lg',
  lg: 'h-24 w-24 text-2xl',
};

/**
 * Compatibility score meter — the web parity of the native meter. Visualises a
 * 0–100 match score as a token-styled bar, ring dial, or compact pill. The tone
 * shifts across score bands, but the band is always spelled out in words ("Great
 * match") and the a11y label states the number, so meaning never rests on color.
 * Token classes only — no literal colors. Guarded against out-of-range / NaN input.
 */
export const CompatibilityMeter = React.forwardRef<HTMLDivElement, CompatibilityMeterProps>(
  function CompatibilityMeter(
    { score, label = 'Compatibility', showValue = true, variant = 'bar', size = 'md', loading = false, className, ...rest },
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
          className={cn('flex flex-col gap-xs', className)}
          {...rest}
        >
          <div className="h-3 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-2.5 rounded-full bg-neutral-200" />
        </div>
      );
    }

    if (variant === 'ring') {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={a11y}
          className={cn('flex flex-col items-center gap-xs', className)}
          {...rest}
        >
          <div
            className={cn(
              'flex items-center justify-center rounded-full border-4 bg-surface font-bold text-on-surface',
              band.border,
              RING_SIZE[size]
            )}
          >
            {showValue ? <span>{clamped}%</span> : null}
          </div>
          <span className="text-xs text-muted">{band.word}</span>
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          aria-label={a11y}
          className={cn(
            'inline-flex items-center gap-xs self-start rounded-full bg-neutral-100 px-sm py-0.5',
            className
          )}
          {...rest}
        >
          <span className={cn('h-2 w-2 rounded-full', band.dot)} aria-hidden="true" />
          <span className="text-sm font-semibold text-on-surface">
            {clamped}% · {band.word}
          </span>
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
          ) : null}
        </div>
        <Progress value={clamped} max={100} tone={band.progress} size={size === 'sm' ? 'sm' : 'md'} />
      </div>
    );
  }
);
