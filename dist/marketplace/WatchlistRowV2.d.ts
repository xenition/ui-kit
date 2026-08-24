import * as React from 'react';
import type { WatchlistRowProps } from './WatchlistRow';
/** Same public contract as {@link WatchlistRow} — a drop-in alternate design. */
export type WatchlistRowV2Props = WatchlistRowProps;
/**
 * WatchlistRow, redesigned (v2): an **elevated saved-item card**. A larger
 * thumbnail, the title over a condition chip, the price with a struck compare-at
 * and a "Price drop" flag when it fell, and a prominent watch ♥ — shadowed and
 * lifting on hover. Ended items dim + show a Sold badge. Distinct from v1's flat
 * row. Same props, token-only.
 */
export declare const WatchlistRowV2: React.ForwardRefExoticComponent<WatchlistRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WatchlistRowV2.d.ts.map