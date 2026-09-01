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
 * **V4 harvest log** — same props as {@link HarvestLog} plus `totalLabel` and
 * `formatRemaining`.
 *
 * ## Four changes
 *
 * 1. **The total is labelled.** The base rendered it as a bare figure in the
 *    header, so the most important number on the card had nothing saying what
 *    it counted.
 * 2. **Quantities are tabular and right-aligned in a fixed column**, which is
 *    the only way a log of harvests reads as a column rather than as ragged
 *    text — with proportional figures `40` and `1,180` have no shared edge.
 * 3. **The empty state is `EmptyStateV4`**, the same one the commerce line
 *    uses, rather than the base line's.
 * 4. **Type comes from `TextV4`** — the base hand-wrote `color`, `fontSize`,
 *    `fontWeight` and `fontFamily` on raw `<Text>` seven times in one file —
 *    and every caption moves to `mutedText`.
 *
 * A `maxRows` cap still truncates the list and says how many were hidden.
 */
export declare function HarvestLogV4({ entries, title, total, totalLabel, maxRows, emptyTitle, emptyDescription, formatRemaining, style, }: HarvestLogV4Props): React.ReactElement;
//# sourceMappingURL=HarvestLogV4.d.ts.map