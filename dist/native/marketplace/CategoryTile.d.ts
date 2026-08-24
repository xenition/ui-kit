import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type CategoryTileVariant = 'tile' | 'chip';
export interface CategoryTileProps {
    /** Category label. */
    label: string;
    /** Emoji/unicode glyph rendered in the icon slot. */
    glyph?: string;
    /** Optional listing count shown under the label. */
    count?: number;
    /** Marks the tile as the active/selected filter. */
    selected?: boolean;
    /** Fires when the tile is pressed. */
    onPress?: () => void;
    /** `tile` (default) is a square block; `chip` is a compact horizontal pill. */
    variant?: CategoryTileVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * A tappable category entry for a marketplace browse grid — an icon glyph, a
 * label, and an optional listing count. `tile` (default) stacks the glyph over
 * the label as a square block; `chip` lays them out inline as a pill. The
 * `selected` state is carried by an accent ring + tinted surface and the a11y
 * selected state (never color alone). Reuses `Icon`; token-only colors with a
 * token-derived alpha tint.
 */
export declare function CategoryTile({ label, glyph, count, selected, onPress, variant, style, }: CategoryTileProps): React.ReactElement;
//# sourceMappingURL=CategoryTile.d.ts.map