import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CoverGalleryItem {
    /** Stable seed for this plate's generative composition. */
    seed: string | number;
    /**
     * Real image URL. When set, an `Image` is drawn instead of the seeded
     * {@link GenerativeCover} plate.
     */
    imageUrl?: string;
    /** Accessible label for the plate. */
    label?: string;
    /** Caption rendered under the plate (title of the piece / work). */
    caption?: string;
    /** Small secondary line under the caption (medium, year, artist, …). */
    meta?: string;
    /** When set, the whole tile is pressable (native equivalent of the web `href`). */
    onPress?: () => void;
}
export interface CoverGalleryProps {
    /** The plates to render. */
    items: CoverGalleryItem[];
    /** Column count (native wraps into rows of this width; default 3). */
    columns?: 2 | 3 | 4;
    /** width / height aspect ratio of every plate (default 1 — square). */
    aspect?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A gallery of seeded {@link GenerativeCover} plates (or real images) with
 * captions — the native mirror of the web `CoverGallery`. The web CSS-grid
 * breakpoints become a flex-wrap row with `flexBasis` columns; each tile
 * optionally becomes a `Pressable` (native's `href`). The native
 * `GenerativeCover` has a simpler seed/label contract, so the web `form`/`ink`/
 * `paper` per-plate role overrides are dropped. Token-only — no literal colors.
 */
export declare function CoverGallery({ items, columns, aspect, style, }: CoverGalleryProps): React.ReactElement;
//# sourceMappingURL=CoverGallery.d.ts.map