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
 * **V4 fare estimate** — the web twin of the native `FareEstimateV4`, same
 * props as {@link FareEstimate} plus `totalLabel`, `formatSurge` and
 * `emptyMessage`.
 *
 * ## Four changes
 *
 * 1. **Every figure is tabular and the column has an edge.** A fare breakdown
 *    is a column of money; with proportional figures there is nothing to scan
 *    down, which is the whole job of the component.
 * 2. **Surge is a labelled chip, not a red total.** A higher price is a
 *    condition, not an error (§35.4) — and colour alone says nothing.
 * 3. **The breakdown is a real `<dl>`**, so a reader hears label/value pairs
 *    rather than a run of loose strings.
 * 4. **An empty estimate says so** rather than rendering a bordered blank.
 */
export declare const FareEstimateV4: React.ForwardRefExoticComponent<FareEstimateV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FareEstimateV4.d.ts.map