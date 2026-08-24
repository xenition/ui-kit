import * as React from 'react';
import type { WatchlistRowProps } from './WatchlistRow';
/** Drop-in alternate of {@link WatchlistRowProps} — identical prop contract. */
export type WatchlistRowV3Props = WatchlistRowProps;
/**
 * WatchlistRow — Design V3: an **ultra-minimal list line**. A small rounded
 * thumbnail leads, the title takes a single line, and the price is right-aligned
 * as a trailing stack with a compact ♥ toggle — separation comes from a single
 * bottom hairline, no card border or fill. Built for long, dense saved-item
 * lists. The toggle stays outside the row press target; `ended` dims the line
 * and appends a "Sold" badge (state via text + tone). Same props as
 * `WatchlistRow`; token-pure with `withAlpha` tints.
 */
export declare function WatchlistRowV3({ title, priceCents, currency, compareAtCents, imageUrl, condition, watched, ended, onToggleWatch, onPress, style, }: WatchlistRowV3Props): React.ReactElement;
//# sourceMappingURL=WatchlistRowV3.d.ts.map