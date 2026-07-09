/**
 * Prop shapes mirror the media module: an **album** has a title, and each
 * **item** carries a URL, kind, caption, alt text, and intrinsic dimensions
 * (used to reserve aspect-ratio boxes and avoid layout shift).
 */
export type MediaKind = 'image' | 'video';
export interface MediaItem {
    /** Source URL. */
    url: string;
    /** `image` (default) or `video`. */
    kind?: MediaKind;
    /** Caption shown under the item (figure / lightbox). */
    caption?: string;
    /** Alt text for the image (accessibility). */
    alt?: string;
    /** Intrinsic width in px (reserves the aspect-ratio box). */
    width?: number;
    /** Intrinsic height in px. */
    height?: number;
    /** Poster frame for a video item. */
    poster?: string;
}
export interface MediaAlbum {
    /** Album title. */
    title: string;
    /** Items in the album. */
    items?: MediaItem[];
}
//# sourceMappingURL=types.d.ts.map