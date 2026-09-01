import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressV4 } from '../primitives/ProgressV4';
import type { ReadingProgressProps } from './ReadingProgress';
import { readingPercent, TONE_INK } from './internal/reading-v4';

export interface ReadingProgressV4Props extends ReadingProgressProps {
  /**
   * Build the bar's spoken form from the whole percent. Default
   * ``(pct) => `${pct} percent read` ``.
   */
  formatProgress?: (pct: number) => string;
  /**
   * Pin the bar to the top of the reader. Default `false`.
   *
   * The base's own prop doc described `bar` as "for pinning to the top of a
   * reader" and neither twin ever did it: web left the caller to write the
   * `position` rule and native never paid the safe-area inset.
   */
  pinned?: boolean;
}

/**
 * **V4 reading progress** — the web twin of the native `ReadingProgressV4`,
 * same props as {@link ReadingProgress} plus `formatProgress` and `pinned`.
 *
 * ## Four changes
 *
 * 1. **The name reaches the progressbar.** The base hung `aria-label` on a
 *    roleless wrapper — where ARIA ignores it — while the `Progress` primitive
 *    inside, the element that actually *is* a `progressbar`, had no name at
 *    all. The label now goes on the bar.
 * 2. **`pinned` pins it**, which the prop doc has always implied: `sticky` on
 *    web, and the safe-area inset on native.
 * 3. **The percentage is clamped by `readingPercent`**, so a caller
 *    mid-computation cannot push the fill past the track.
 * 4. **The readout is not announced twice.** The `labeled` variant drew "42%"
 *    beside a bar that already says 42, and labelled both.
 */
export const ReadingProgressV4 = React.forwardRef<HTMLDivElement, ReadingProgressV4Props>(
  function ReadingProgressV4(
    {
      progress,
      variant = 'bar',
      formatProgress = (value: number) => `${value} percent read`,
      pinned = false,
      className,
      ...rest
    },
    ref
  ) {
    // The prop is a 0–1 fraction; the bar, the readout and the label are all
    // whole percents, clamped once here rather than three times downstream.
    const pct = Math.round(readingPercent(progress * 100));
    const spoken = formatProgress(pct);

    // `z-10` keeps the rail above the article body it is pinned over; a
    // progress rail that the first paragraph scrolls through is not a rail.
    const pin = pinned ? 'sticky top-0 z-10' : null;

    if (variant === 'labeled') {
      return (
        <div ref={ref} className={cn('flex items-center gap-sm', pin, className)} {...rest}>
          <div className="flex-1">
            <ProgressV4 value={pct} max={100} tone="primary" size="sm" aria-label={spoken} />
          </div>
          {/* The bar already says it. A second announcement is the same fact
              twice, one word apart. */}
          <span
            aria-hidden
            className={cn(
              'min-w-[calc(var(--xen-space-xl)_+_var(--xen-space-xs))] text-right text-xs font-semibold',
              TONE_INK.muted
            )}
          >
            {`${pct}%`}
          </span>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(pin, className)} {...rest}>
        <ProgressV4 value={pct} max={100} tone="primary" size="sm" aria-label={spoken} />
      </div>
    );
  }
);
