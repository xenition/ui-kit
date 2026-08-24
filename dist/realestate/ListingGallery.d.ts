import * as React from 'react';
export interface ListingGalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Ordered photo URLs. Empty renders a token-styled empty state. */
    images: string[];
    /** Frame height in px (default 220). */
    height?: number;
    /** Controlled active index; falls back to internal state when omitted. */
    index?: number;
    /** Fires with the new page index after a navigation. */
    onIndexChange?: (index: number) => void;
    /** Empty-state headline. */
    emptyLabel?: string;
}
/**
 * Web parity of the native `ListingGallery`: a single-photo viewer for a listing
 * with prev/next controls, a "n / total" counter, and a dot indicator. Works
 * uncontrolled, or drive it with `index`. Data only: URLs in, an `onIndexChange`
 * callback out; nothing fetches. On an empty `images` array it renders the shared
 * `EmptyState`. All colors come from the `--xen-*` tokens — no literal colors.
 */
export declare const ListingGallery: React.ForwardRefExoticComponent<ListingGalleryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListingGallery.d.ts.map