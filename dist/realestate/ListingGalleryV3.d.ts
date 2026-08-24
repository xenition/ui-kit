import * as React from 'react';
import type { ListingGalleryProps } from './ListingGallery';
/** Same public contract as {@link ListingGallery} — a drop-in alternate design. */
export type ListingGalleryV3Props = ListingGalleryProps;
/**
 * ListingGallery, redesigned (v3): a **minimal dot pager**. A single framed image
 * with tap zones on the left/right halves and a row of position dots beneath — no
 * thumbnails, no arrows. The compact counterpart to v2's hero strip. Same props,
 * token-only.
 */
export declare const ListingGalleryV3: React.ForwardRefExoticComponent<ListingGalleryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListingGalleryV3.d.ts.map