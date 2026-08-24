import * as React from 'react';
import type { WatchlistRowProps } from './WatchlistRow';
/** Same public contract as {@link WatchlistRow} — a drop-in alternate design. */
export type WatchlistRowV3Props = WatchlistRowProps;
/**
 * WatchlistRow, redesigned (v3): an **ultra-dense saved line**. A tiny thumbnail,
 * the title inline, the price pinned right (struck compare-at beneath when it
 * dropped), and a compact ♥ toggle — a single hairline row for a long watchlist.
 * Ended items dim + strike the title. The opposite of v2's card. Same props,
 * token-only.
 */
export declare const WatchlistRowV3: React.ForwardRefExoticComponent<WatchlistRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WatchlistRowV3.d.ts.map