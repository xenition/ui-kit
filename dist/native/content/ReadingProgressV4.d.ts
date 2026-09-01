import * as React from 'react';
import type { ReadingProgressProps } from './ReadingProgress';
export interface ReadingProgressV4Props extends ReadingProgressProps {
    /** The bar's accessible name. Default ``(pct) => `${pct} percent read` ``. */
    formatProgress?: (pct: number) => string;
    /** Pin the bar to the top of the reader, paying the safe-area inset. Default `false`. */
    pinned?: boolean;
}
/**
 * **V4 reading progress** — same props as {@link ReadingProgress} plus
 * `formatProgress` and `pinned`.
 *
 * ## Four changes
 *
 * 1. **The name reaches the progressbar.** The label sat on the wrapper while
 *    the `Progress` primitive inside it — the element that actually *is* a
 *    progressbar — had none, so a reader was told "42 percent read" by a
 *    roleless box on one platform and by nothing at all on the other. The
 *    role, the name and the value are now on one element.
 * 2. **`pinned` does what the prop doc always claimed.** The base described
 *    the `bar` variant as being "for pinning to the top of a reader" and left
 *    the pinning to the caller, who then had to discover the notch. `pinned`
 *    anchors the bar and pays `useSafeAreaInsets().top`.
 * 3. **The percentage cannot overrun the track**, because it runs through
 *    `readingPercent()` rather than straight into the bar.
 * 4. **The visible readout is not announced twice.** It is the same number the
 *    progressbar already reports, so it is hidden from the reader.
 */
export declare function ReadingProgressV4({ progress, variant, formatProgress, pinned, style, }: ReadingProgressV4Props): React.ReactElement;
//# sourceMappingURL=ReadingProgressV4.d.ts.map