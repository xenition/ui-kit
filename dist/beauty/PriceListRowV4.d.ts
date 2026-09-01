import * as React from 'react';
import type { PriceListRowProps } from './PriceListRow';
export interface PriceListRowV4Props extends PriceListRowProps {
    /** Prefix on an open-ended price. Default `'from'`. */
    fromLabel?: string;
    /** Format the duration. Default `'45 min'`. */
    formatDuration?: (minutes: number) => string;
    /** Draw the separator under the row. Default `false`. */
    last?: boolean;
}
/**
 * **V4 price list row** — the web twin of the native `PriceListRowV4`, same
 * props as {@link PriceListRow} plus `fromLabel`, `formatDuration` and `last`.
 *
 * ## Four changes
 *
 * 1. **The compare-at price is finally drawn.** The base has carried
 *    `compareAtCents` since it was written and never rendered it. It is now an
 *    `<s>` — semantically "no longer accurate", which is exactly what it is —
 *    labelled `Was …`, and a compare-at that is not higher than the price is
 *    refused rather than drawn.
 * 2. **Prices are tabular.** A price list is *the* column-of-money component;
 *    with proportional figures it has no edge to scan down.
 * 3. **A real dotted leader** joins the service to its price, so the eye can
 *    travel across the row.
 * 4. **The `section` variant is a real heading**, announced as one.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export declare const PriceListRowV4: React.ForwardRefExoticComponent<PriceListRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceListRowV4.d.ts.map