import * as React from 'react';
import type { HarvestLogProps } from './HarvestLog';
/** Drop-in alternate of {@link HarvestLogProps} — identical prop contract. */
export type HarvestLogV2Props = HarvestLogProps;
/**
 * HarvestLog — design variant **V2**: an elevated card fronted by a **big total
 * hero** (large figure + "total harvested" label on a tinted panel), then a
 * record list where each row leads with a tinted quantity chip. Where V1 tucks
 * the total in the header corner, V2 makes it the headline. Same props as
 * {@link HarvestLogProps}; only the layout differs. Token-only.
 */
export declare function HarvestLogV2({ entries, title, total, maxRows, emptyTitle, emptyDescription, style, }: HarvestLogV2Props): React.ReactElement;
//# sourceMappingURL=HarvestLogV2.d.ts.map