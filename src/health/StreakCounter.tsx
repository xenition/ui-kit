import * as React from 'react';
import { cn } from '../primitives/cn';
import { TEXT_CLASS } from './internal';

export type StreakCounterTone = 'primary' | 'success' | 'warn' | 'accent';

export interface StreakCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current streak length. Clamped to `>= 0`. */
  count: number;
  /** Unit noun; defaults to "day". Pluralized automatically. */
  unit?: string;
  /** Caption under the number; defaults to "streak". */
  label?: string;
  /** Accent tone for the number + flame. */
  tone?: StreakCounterTone;
  /** Optional best/record value shown as a muted sub-caption. */
  best?: number;
}

/**
 * A prominent streak readout: a flame, the day count, and a caption. When
 * `count` is 0 it reads a muted "Start your streak" prompt instead of a cold
 * zero. Web parity of the native `StreakCounter`; all colors trace to `--xen-*`
 * token classes — no literals.
 */
export const StreakCounter = React.forwardRef<HTMLDivElement, StreakCounterProps>(
  function StreakCounter({ count, unit = 'day', label = 'streak', tone = 'warn', best, className, ...rest }, ref) {
    const safe = Math.max(Math.floor(count), 0);
    const unitLabel = safe === 1 ? unit : `${unit}s`;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={safe === 0 ? 'No active streak' : `${safe} ${unitLabel} ${label}`}
        className={cn('flex flex-col items-center gap-[var(--xen-space-xs)]', className)}
        {...rest}
      >
        <span aria-hidden="true" className="text-2xl leading-none">
          {safe === 0 ? '🌱' : '🔥'}
        </span>
        {safe === 0 ? (
          <span className="text-sm text-muted">Start your streak</span>
        ) : (
          <>
            <span className="flex items-baseline gap-[var(--xen-space-xs)]">
              <span className={cn('text-3xl font-bold leading-none', TEXT_CLASS[tone])}>{safe}</span>
              <span className="text-base text-muted">{unitLabel}</span>
            </span>
            <span className="text-sm text-on-surface">{label}</span>
          </>
        )}
        {best != null && best > 0 ? (
          <span className="text-xs text-muted">Best: {Math.max(Math.floor(best), 0)}</span>
        ) : null}
      </div>
    );
  }
);
