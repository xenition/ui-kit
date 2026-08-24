import * as React from 'react';
import type { WatchlistRowProps } from './WatchlistRow';
/** Drop-in alternate of {@link WatchlistRowProps} — identical prop contract. */
export type WatchlistRowV2Props = WatchlistRowProps;
/**
 * WatchlistRow — Design V2: an **elevated media-left tile that leans into the
 * price drop**. A larger thumbnail leads; the title, condition, and price stack
 * in the middle; and when a `compareAtCents` is higher than the current price a
 * success-toned "▼ Save $X" callout announces the drop — the reason a shopper
 * saved the item. The ♥ toggle is a circular tinted button on the trailing
 * edge, kept outside the row press target. `ended` dims the tile and shows a
 * "Sold" badge (state via text + tone). Same props as `WatchlistRow`;
 * token-pure with `withAlpha` tints; elevated surface.
 */
export declare function WatchlistRowV2({ title, priceCents, currency, compareAtCents, imageUrl, condition, watched, ended, onToggleWatch, onPress, style, }: WatchlistRowV2Props): React.ReactElement;
//# sourceMappingURL=WatchlistRowV2.d.ts.map