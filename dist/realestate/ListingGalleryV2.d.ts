import * as React from 'react';
import type { ListingGalleryProps } from './ListingGallery';
/** Same public contract as {@link ListingGallery} — a drop-in alternate design. */
export type ListingGalleryV2Props = ListingGalleryProps;
/**
 * ListingGallery, redesigned (v2): a **hero + thumbnail strip**. A large frame
 * with prev/next arrows and an "n / total" counter, plus a row of tappable
 * thumbnails beneath that highlight the active image. Distinct from v1's plain
 * pager. Same props, token-only.
 */
export declare const ListingGalleryV2: React.ForwardRefExoticComponent<ListingGalleryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListingGalleryV2.d.ts.map