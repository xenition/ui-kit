import * as React from 'react';
import type { LivestockHealth, LivestockRowProps } from './LivestockRow';
export interface LivestockRowV4Props extends LivestockRowProps {
    /** Override the health names — three English words lived inside the component. */
    healthLabels?: Partial<Record<LivestockHealth, string>>;
    /** Shown in place of the head count when it is unknown. Default `'—'`. */
    unknownCountLabel?: string;
    /** Format the head count. Default `String(count)`. */
    formatCount?: (count: number) => string;
}
/**
 * **V4 livestock row** — same props as {@link LivestockRow} plus
 * `healthLabels`, `unknownCountLabel` and `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line** (`dashboard/internal/row-v4`),
 *    so its height, padding, press fill and separator inset are the same
 *    decisions every other row in the kit makes.
 * 2. **Press is a state layer**, not `opacity: 0.85` on the row's content.
 * 3. **The head count is tabular and formattable.** A column of pen counts
 *    that does not line up is a column nobody can scan, and `1,240` is not
 *    `1.240` everywhere.
 * 4. **Type comes from `TextV4`**, with the caption on `mutedText`.
 *
 * **Renders nothing without a `species`** (§4.5).
 */
export declare function LivestockRowV4({ species, count, icon, location, health, detail, healthLabels, unknownCountLabel, formatCount, last, onPress, style, }: LivestockRowV4Props): React.ReactElement | null;
//# sourceMappingURL=LivestockRowV4.d.ts.map