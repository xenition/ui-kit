import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MediaItem } from '../../media/types';
export interface GalleryProps {
    /** Media items to lay out. */
    items: MediaItem[];
    /** Column count (default 3). */
    columns?: 2 | 3 | 4;
    /** `grid` (uniform square tiles) or `masonry` (natural aspect ratios). Default `grid`. */
    variant?: 'grid' | 'masonry';
    /** Fired with the item index when a tile is activated. */
    onOpen?: (index: number) => void;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
    /** Passed through to the underlying FlatList (e.g. `scrollEnabled`). */
    scrollEnabled?: boolean;
}
/**
 * Responsive media grid — the native mirror of the web `Gallery`. Backed by a
 * `FlatList` with `numColumns` (windowing gives the lazy loading the web gets
 * from `loading="lazy"`); `grid` renders uniform square tiles, `masonry` keeps
 * each item's intrinsic aspect ratio (from `width`/`height`). When `onOpen` is
 * provided each tile is a `Pressable` `button` that reports its index (wire it
 * to a `Lightbox`). Token-only — radii and tile background trace to theme
 * tokens.
 */
export declare function Gallery({ items, columns, variant, onOpen, style, scrollEnabled, }: GalleryProps): React.ReactElement;
//# sourceMappingURL=Gallery.d.ts.map