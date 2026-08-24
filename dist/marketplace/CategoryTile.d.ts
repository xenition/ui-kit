import * as React from 'react';
export type CategoryTileVariant = 'tile' | 'chip';
export interface CategoryTileProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Category label. */
    label: string;
    /** Emoji/unicode glyph rendered in the icon slot. */
    glyph?: string;
    /** Optional listing count shown under the label. */
    count?: number;
    /** Marks the tile as the active/selected filter. */
    selected?: boolean;
    /** `tile` (default) is a square block; `chip` is a compact horizontal pill. */
    variant?: CategoryTileVariant;
    /**
     * Fires when the tile is activated. When set, the tile is a `role="button"`
     * with keyboard support and `aria-pressed` reflecting `selected`.
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
/**
 * A tappable category entry for a marketplace browse grid — an icon glyph, a
 * label, and an optional listing count. `tile` (default) stacks the glyph over
 * the label as a square block; `chip` lays them out inline as a pill. The
 * `selected` state is carried by an accent ring + tinted surface and the
 * `aria-pressed` state (never color alone). Reuses `Icon`; token-only colors.
 */
export declare const CategoryTile: React.ForwardRefExoticComponent<CategoryTileProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CategoryTile.d.ts.map