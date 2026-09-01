import * as React from 'react';
import type { HarvestLogProps } from './HarvestLog';
export interface HarvestLogV4Props extends HarvestLogProps {
    /** Label for the period total. Default `'Total'`. */
    totalLabel?: string;
    /**
     * Copy for the "and N more" line. Default `'+3 more'`, which the base built
     * inline — so a host could not localize it or say "3 further harvests".
     */
    formatRemaining?: (remaining: number) => string;
}
/**
 * **V4 harvest log** — the web twin of the native `HarvestLogV4`, same props as
 * {@link HarvestLog} plus `totalLabel` and `formatRemaining`.
 *
 * ## Four changes
 *
 * 1. **The total is labelled.** The base rendered it as a bare figure in the
 *    header, so the most important number on the card had nothing saying what
 *    it counted.
 * 2. **Quantities are tabular**, which is the only way a log of harvests reads
 *    as a column rather than as ragged text — with proportional figures `40`
 *    and `1,180` have no shared edge.
 * 3. **The rows are a real `<ul>`**, so a screen reader announces "list, 6
 *    items" instead of walking six anonymous divs.
 * 4. **Captions take `muted-text`**, and the empty state is `EmptyStateV4`.
 *
 * A `maxRows` cap still truncates the list and says how many were hidden.
 */
export declare const HarvestLogV4: React.ForwardRefExoticComponent<HarvestLogV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HarvestLogV4.d.ts.map