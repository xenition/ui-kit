import * as React from 'react';
/** Layout variants for an album card. */
export type AlbumCardVariant = 'cover' | 'list' | 'compact';
export interface AlbumCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Album title. */
    title: string;
    /** Number of photos in the album. */
    photoCount?: number;
    /** Short date / event line (e.g. "Aug 24, 2026"). */
    dateText?: string;
    /** Cover photo URL. When absent a token-tinted placeholder is drawn. */
    coverUrl?: string;
    /** Marks the album as private / unlisted (labelled, not color-alone). */
    isPrivate?: boolean;
    /** Layout variant (default `cover`). */
    variant?: AlbumCardVariant;
    /** Loading placeholder — token-only skeleton, no content. */
    loading?: boolean;
    /** Word for "photos" in the count line (default `photos`). */
    countLabel?: string;
}
/**
 * A photo-album tile — cover image, title, photo count, and an optional date.
 * `variant` switches a full-bleed `cover` card, a horizontal `list` row, and a
 * dense `compact` tile. A private album shows a labelled `Badge` (never color
 * alone). Reuses the `Badge` primitive; passing `onClick` makes the whole card a
 * keyboard-operable `button`. Token-only — placeholder and surfaces are `--xen-*`.
 */
export declare const AlbumCard: React.ForwardRefExoticComponent<AlbumCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AlbumCard.d.ts.map