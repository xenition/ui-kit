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
 * **V4 price list row** — same props as {@link PriceListRow} plus
 * `fromLabel`, `formatDuration` and `last`.
 *
 * ## Four changes
 *
 * 1. **The compare-at price is finally drawn.** The base has carried
 *    `compareAtCents` since it was written and never rendered it. It is now a
 *    struck figure beside the price, **announced** as `Was …` so a reader
 *    handed two numbers knows which is which — and a compare-at that is not
 *    higher than the price is refused rather than drawn, because a fabricated
 *    discount is a dark pattern.
 * 2. **Prices are tabular.** A price list is *the* column-of-money component
 *    in the kit; with proportional figures it has no edge to scan down, which
 *    is the entire job.
 * 3. **The leader is a real dotted rule**, not the space between two
 *    right-floated strings, so the eye can travel from a service to its price.
 * 4. **The `section` variant is a heading**, announced as one.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export declare function PriceListRowV4({ label, priceCents, currency, fromPrice, note, durationMin, compareAtCents: compareAt, variant, formatMoney, fromLabel, formatDuration, last, style, }: PriceListRowV4Props): React.ReactElement | null;
//# sourceMappingURL=PriceListRowV4.d.ts.map