import * as React from 'react';
import type { ListingGalleryProps } from './ListingGallery';
/** Drop-in for {@link ListingGalleryProps} — same props, the V4 "listing" design. */
export type ListingGalleryV4Props = ListingGalleryProps;
/**
 * ListingGallery — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a listing gallery: a big rounded hero photo
 * with a bottom gradient scrim, a near-white "n / total" counter overlaid on the
 * scrim, prev/next controls, and a rounded thumbnail strip that also drives the
 * active index. Works uncontrolled, or drive it with `index`. Data only: URLs
 * in, an `onIndexChange` callback out; nothing fetches. On an empty `images`
 * array it renders the shared `EmptyState`. All colors from `--xen-*` token
 * classes (no literals).
 */
export declare const ListingGalleryV4: React.ForwardRefExoticComponent<ListingGalleryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListingGalleryV4.d.ts.map