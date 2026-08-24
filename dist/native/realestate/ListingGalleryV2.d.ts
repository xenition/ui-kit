import * as React from 'react';
import type { ListingGalleryProps } from './ListingGallery';
/** Drop-in alternate of {@link ListingGalleryProps} — identical prop contract. */
export type ListingGalleryV2Props = ListingGalleryProps;
/**
 * ListingGallery — design variant **V2**: a large **hero photo above a
 * thumbnail strip**. Where V1 is a swipe-paged carousel with a dot indicator,
 * V2 shows one hero and a horizontal row of tappable thumbnails below it;
 * tapping a thumbnail selects that photo (uncontrolled, or drive it with
 * `index`). Same props as {@link ListingGalleryProps}; empty renders the shared
 * `EmptyState`. Token-only.
 */
export declare function ListingGalleryV2({ images, height, index, onIndexChange, emptyLabel, style, }: ListingGalleryV2Props): React.ReactElement;
//# sourceMappingURL=ListingGalleryV2.d.ts.map