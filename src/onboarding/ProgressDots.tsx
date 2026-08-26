import * as React from 'react';
import { cn } from '../primitives/cn';

export type ProgressDotsSize = 'sm' | 'md';

/**
 * How the indicator draws itself.
 *
 * - `'dots'` — a row of dots with the active step widened into a pill. The
 *   slide-position indicator this component has always been.
 * - `'bars'` — the onboarding **step** indicator from the design spec (§2):
 *   one equal-width segment per step, complete and current filled with the
 *   primary token, upcoming in the border token. No numbers, no captions.
 *   This is what replaced the numbered-circle stepper the shipped screens used.
 */
export type ProgressDotsVariant = 'dots' | 'bars';

export interface ProgressDotsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Total number of steps/pages. */
  count: number;
  /** Zero-based index of the active step. */
  activeIndex: number;
  /** Dot scale. Default `'md'`. */
  size?: ProgressDotsSize;
  /**
   * Indicator treatment. Default `'dots'` — the historical rendering, so no
   * existing caller moves. Pass `'bars'` for the header step indicator.
   */
  variant?: ProgressDotsVariant;
  /** When set, dots become pressable and report the tapped index. */
  onDotClick?: (index: number) => void;
}

const DOT: Record<ProgressDotsSize, { base: string; active: string }> = {
  sm: { base: 'h-1.5 w-1.5', active: 'h-1.5 w-4' },
  md: { base: 'h-2 w-2', active: 'h-2 w-5' },
};

/**
 * Segment thickness for `'bars'`. Geometric, not a colour or a spacing token
 * (spec §10.1): `h-1` is 4px, `h-1.5` is 6px — the native twin's `BAR` table.
 */
const BAR: Record<ProgressDotsSize, string> = { sm: 'h-1', md: 'h-1.5' };

/**
 * Paged-progress indicator — two treatments of the same idea, chosen with
 * `variant`.
 *
 * `'dots'` (the default, and everything that shipped before this prop existed)
 * is a slide-position indicator: a row of token-bound dots where the active
 * step is a widened "pill" in the primary color and the rest are muted.
 *
 * `'bars'` is the onboarding step indicator the design spec calls for (§2):
 * equal-width segments spanning the header, filled up to and including the
 * current step, fully rounded, `gap-xs` apart. It carries no numbers and no
 * captions on purpose — the numbered circles it replaces were the single worst
 * offender on the shipped screens, cramped at the top with labels too small to
 * read.
 *
 * Both treatments are decorative unless `onDotClick` is supplied, in which case
 * each step becomes a labelled button. An empty or negative `count` renders an
 * empty row rather than crashing, and a `count` of one renders a single full
 * bar. No literal colors.
 */
export const ProgressDots = React.forwardRef<HTMLDivElement, ProgressDotsProps>(
  function ProgressDots(
    { count, activeIndex, size = 'md', variant = 'dots', onDotClick, className, ...rest },
    ref
  ) {
    const total = Math.max(0, Math.floor(count));
    const bars = variant === 'bars';
    const scale = DOT[size];

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={Math.max(0, total - 1)}
        aria-valuenow={activeIndex}
        aria-label={`Step ${Math.min(activeIndex + 1, total)} of ${total}`}
        className={cn('flex items-center gap-xs', bars && 'w-full', className)}
        {...rest}
      >
        {Array.from({ length: total }, (_, i) => {
          const active = i === activeIndex;
          // In `'bars'` a step already walked past stays filled — the bar reads
          // as "how far through am I", not "which one is selected".
          const filled = bars ? i <= activeIndex : active;
          const dotClass = bars
            ? cn('block w-full rounded-full transition-colors', BAR[size], filled ? 'bg-primary' : 'bg-border')
            : cn(
                'rounded-full transition-all',
                active ? cn(scale.active, 'bg-primary') : cn(scale.base, 'bg-border')
              );
          if (!onDotClick) {
            return bars ? (
              <span key={i} aria-hidden="true" className="flex-1">
                <span className={dotClass} />
              </span>
            ) : (
              <span key={i} aria-hidden="true" className={dotClass} />
            );
          }
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to step ${i + 1}`}
              aria-current={active || undefined}
              onClick={() => onDotClick(i)}
              className={cn(
                'inline-flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                bars ? 'flex-1 py-1' : 'p-1'
              )}
            >
              <span aria-hidden="true" className={dotClass} />
            </button>
          );
        })}
      </div>
    );
  }
);
