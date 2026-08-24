import * as React from 'react';
import type { HarvestLogProps } from './HarvestLog';
/** Same public contract as {@link HarvestLog} — a drop-in alternate design. */
export type HarvestLogV3Props = HarvestLogProps;
/**
 * HarvestLog, redesigned (v3): a **compact ledger list**. A tight title·total
 * header over dense hairline rows — crop + field·date on the left, the yield (and
 * grade) pinned right. The opposite of v2's card. Same props, token-only.
 */
export declare const HarvestLogV3: React.ForwardRefExoticComponent<HarvestLogProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HarvestLogV3.d.ts.map