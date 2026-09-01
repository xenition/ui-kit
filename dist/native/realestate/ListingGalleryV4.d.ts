import * as React from 'react';
import type { ListingGalleryProps } from './ListingGallery';
/** Drop-in for {@link ListingGalleryProps} — same props, the V4 "listing" design. */
export type ListingGalleryV4Props = ListingGalleryProps;
/**
 * ListingGallery — **V4** "listing" design. The image-forward, editorial take on
 * a listing gallery: a big rounded hero photo (a horizontally paged `ScrollView`)
 * with a bottom gradient scrim, a near-white "n / total" counter overlaid on the
 * scrim, and a rounded thumbnail strip that also drives the active index. The
 * active page is derived from the scroll offset (works uncontrolled, or drive it
 * with `index`). Data only: URIs in, an `onIndexChange` callback out; nothing
 * fetches. On an empty `images` array it renders the shared `EmptyState`.
 * Token-only colors via `useXenitionTheme()` (+ the listing scrim helpers).
 */
export declare function ListingGalleryV4({ images, height, index, onIndexChange, emptyLabel, style, }: ListingGalleryV4Props): React.ReactElement;
//# sourceMappingURL=ListingGalleryV4.d.ts.map