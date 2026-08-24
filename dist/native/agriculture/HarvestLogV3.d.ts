import * as React from 'react';
import type { HarvestLogProps } from './HarvestLog';
/** Drop-in alternate of {@link HarvestLogProps} — identical prop contract. */
export type HarvestLogV3Props = HarvestLogProps;
/**
 * HarvestLog — design variant **V3**: a **minimal log** — a title + total on one
 * header line, then each record as a single dense line (`qty unit · crop ·
 * field · date`). No card chrome, no dividers. Empty `entries` collapse to a
 * muted one-liner. Same props as {@link HarvestLogProps}; only the layout
 * differs. Token-only.
 */
export declare function HarvestLogV3({ entries, title, total, maxRows, emptyTitle, style, }: HarvestLogV3Props): React.ReactElement;
//# sourceMappingURL=HarvestLogV3.d.ts.map