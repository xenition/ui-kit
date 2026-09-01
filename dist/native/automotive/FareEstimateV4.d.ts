import * as React from 'react';
import type { FareEstimateProps } from './FareEstimate';
export interface FareEstimateV4Props extends FareEstimateProps {
    /** Label on the total row. Default `'Total'`. */
    totalLabel?: string;
    /** Build the surge chip. Default `'1.8× surge'`. */
    formatSurge?: (multiplier: number) => string;
    /** Copy when there is nothing to estimate. Default `'No estimate yet.'`. */
    emptyMessage?: string;
}
/**
 * **V4 fare estimate** — same props as {@link FareEstimate} plus `totalLabel`,
 * `formatSurge` and `emptyMessage`.
 *
 * ## Four changes
 *
 * 1. **Every figure is tabular and the column has an edge.** A fare breakdown
 *    is a column of money; with proportional figures `$4.50` and `$11.20` are
 *    different widths and there is nothing to scan down. This is the whole job
 *    of the component and the base did not do it.
 * 2. **Surge is a labelled chip, not a red number.** The base tinted the total
 *    when `surgeMultiplier > 1` — colour alone, and `danger` on a price, which
 *    §35.4 reserves for something going wrong rather than costing more.
 * 3. **The total is separated by a hairline and set in the display face**, so
 *    the figure a rider is deciding on is not the same weight as the line
 *    items above it.
 * 4. **An empty estimate says so** rather than rendering a bordered blank.
 */
export declare function FareEstimateV4({ items, totalCents, currency, surgeMultiplier, distanceLabel, durationLabel, variant, totalLabel, formatSurge, emptyMessage, loading, style, }: FareEstimateV4Props): React.ReactElement;
//# sourceMappingURL=FareEstimateV4.d.ts.map