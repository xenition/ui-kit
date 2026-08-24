import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Layout variants for an album card. */
export type AlbumCardVariant = 'cover' | 'list' | 'compact';
export interface AlbumCardProps {
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
    /** Press handler for the whole card. */
    onPress?: () => void;
    /** Word for "photos" in the count line (default `photos`). */
    countLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A photo-album tile — cover image, title, photo count, and an optional date.
 * `variant` switches a full-bleed `cover` card, a horizontal `list` row, and a
 * dense `compact` tile. A private album shows a labelled `Badge` (never color
 * alone). Reuses the `Badge` primitive; `onPress` makes the whole card a
 * `button`. Token-only — cover placeholder and surfaces trace to theme tokens.
 */
export declare function AlbumCard({ title, photoCount, dateText, coverUrl, isPrivate, variant, loading, onPress, countLabel, style, }: AlbumCardProps): React.ReactElement;
//# sourceMappingURL=AlbumCard.d.ts.map