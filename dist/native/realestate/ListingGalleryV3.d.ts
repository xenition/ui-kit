import * as React from 'react';
import type { ListingGalleryProps } from './ListingGallery';
/** Drop-in alternate of {@link ListingGalleryProps} — identical prop contract. */
export type ListingGalleryV3Props = ListingGalleryProps;
/**
 * ListingGallery — design variant **V3**: a **2-column photo grid**. Where V1 is
 * a single swipe-paged frame, V3 lays every photo out as a tappable tile in two
 * columns (a contact-sheet view); tapping a tile selects it and reports the
 * index (uncontrolled, or drive it with `index`). The selected tile is ringed in
 * the primary color. Same props as {@link ListingGalleryProps}; empty renders
 * the shared `EmptyState`. `height` sets the total grid height cap via tile
 * aspect ratio. Token-only.
 */
export declare function ListingGalleryV3({ images, height, index, onIndexChange, emptyLabel, style, }: ListingGalleryV3Props): React.ReactElement;
//# sourceMappingURL=ListingGalleryV3.d.ts.map