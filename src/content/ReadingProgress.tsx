import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives/Progress';

export type ReadingProgressVariant = 'bar' | 'labeled';

export interface ReadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * How far through the article the reader is, `0`–`1` (clamped). Typically
   * derived from a scroll offset: `offsetY / (contentHeight - viewportHeight)`.
   */
  progress: number;
  /**
   * - `bar`     — a thin token-styled progress bar (default), for pinning to
   *               the top of a reader.
   * - `labeled` — bar plus a "42%" readout.
   */
  variant?: ReadingProgressVariant;
}

/** Clamp an arbitrary number into the `[0, 1]` reading fraction. */
function clampFraction(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

/**
 * A reading-progress indicator for an article reader — the thin bar that fills
 * as the reader scrolls. Web (React DOM) mirror of the native `ReadingProgress`.
 * Composes the `Progress` primitive (0–100 scale) from a clamped `0`–`1`
 * fraction, so a scroll handler can drive it directly. A `labeled` variant adds
 * a percentage readout. All colors come from `--xen-*` token classes.
 */
export const ReadingProgress = React.forwardRef<HTMLDivElement, ReadingProgressProps>(
  function ReadingProgress({ progress, variant = 'bar', className, ...rest }, ref) {
    const fraction = clampFraction(progress);
    const pct = Math.round(fraction * 100);

    if (variant === 'labeled') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-[var(--xen-space-sm)]', className)}
          {...rest}
        >
          <div className="flex-1">
            <Progress value={pct} max={100} tone="primary" size="sm" />
          </div>
          <span
            aria-label={`${pct} percent read`}
            className="min-w-[34px] text-right text-xs font-semibold text-muted"
          >
            {`${pct}%`}
          </span>
        </div>
      );
    }

    return (
      <div ref={ref} aria-label={`${pct} percent read`} className={className} {...rest}>
        <Progress value={pct} max={100} tone="primary" size="sm" />
      </div>
    );
  }
);
