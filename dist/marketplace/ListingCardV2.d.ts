import * as React from 'react';
import type { ListingCardProps } from './ListingCard';
/** Same public contract as {@link ListingCard} — a drop-in alternate design. */
export type ListingCardV2Props = ListingCardProps;
/**
 * ListingCard, redesigned (v2): a **full-bleed featured card**. The photo fills
 * the tile; the watch ♥ floats top-right, the condition badge top-left, and the
 * title/subtitle/price sit on a gradient scrim at the bottom. Elevated,
 * hover-lift. Same props as {@link ListingCard}, token-only.
 */
export declare const ListingCardV2: React.ForwardRefExoticComponent<ListingCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListingCardV2.d.ts.map