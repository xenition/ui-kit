import * as React from 'react';
import type { ReadingProgressProps } from './ReadingProgress';
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
export declare const ReadingProgressV4: React.ForwardRefExoticComponent<ReadingProgressV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReadingProgressV4.d.ts.map