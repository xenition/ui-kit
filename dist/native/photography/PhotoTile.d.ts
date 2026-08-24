import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Aspect-ratio presets for a photo tile. */
export type PhotoTileRatio = 'square' | 'portrait' | 'landscape';
export interface PhotoTileProps {
    /** Photo source URL. When absent a token-tinted placeholder is drawn. */
    url?: string;
    /** Accessible description of the photo. */
    alt?: string;
    /** Caption overlaid at the foot of the tile. */
    caption?: string;
    /** Aspect ratio preset (default `square`). */
    ratio?: PhotoTileRatio;
    /** Selected state — draws a token accent ring + check affordance. */
    selected?: boolean;
    /** Favourited state — shows a star marker (labelled, not color-alone). */
    favorite?: boolean;
    /** Loading placeholder — token-only skeleton, no image. */
    loading?: boolean;
    /** Press handler (e.g. open or toggle selection). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single photo tile — the atomic unit of a grid or selection sheet. Draws the
 * image inside an aspect-ratio box (`square`/`portrait`/`landscape`), an
 * optional overlaid `caption`, a `favorite` star marker, and a `selected` ring
 * with a check badge. Selection/favourite states carry a glyph + accessibility
 * state, never color alone. `onPress` makes it a `button`; token-only colors.
 */
export declare function PhotoTile({ url, alt, caption, ratio, selected, favorite, loading, onPress, style, }: PhotoTileProps): React.ReactElement;
//# sourceMappingURL=PhotoTile.d.ts.map