import * as React from 'react';
import type { HarvestLogProps } from './HarvestLog';
/** Same public contract as {@link HarvestLog} — a drop-in alternate design. */
export type HarvestLogV2Props = HarvestLogProps;
/**
 * HarvestLog, redesigned (v2): an **elevated ledger card**. A header pairs the
 * title with a period-total badge; each harvest is a row — crop, a big yield
 * figure, date·field, and a grade chip. Distinct from v1. Same props, token-only.
 */
export declare const HarvestLogV2: React.ForwardRefExoticComponent<HarvestLogProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HarvestLogV2.d.ts.map