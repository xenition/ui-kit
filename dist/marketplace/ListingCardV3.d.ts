import * as React from 'react';
import type { ListingCardProps } from './ListingCard';
/** Same public contract as {@link ListingCard} — a drop-in alternate design. */
export type ListingCardV3Props = ListingCardProps;
/**
 * ListingCard, redesigned (v3): a **dense list row**. A small square thumbnail,
 * the title over a subtitle·condition meta line, the price (with a struck
 * compare-at) pinned right, and a compact watch ♥ — hairline-bordered for long
 * catalog lists. The opposite of v2's featured tile. Same props, token-only.
 */
export declare const ListingCardV3: React.ForwardRefExoticComponent<ListingCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListingCardV3.d.ts.map