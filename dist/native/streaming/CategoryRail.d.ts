import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One browse category — a genre or mood tile in a {@link CategoryRail}. */
export interface CategoryRailItem {
    /** Stable unique id (used as the list key and passed to `onSelect`). */
    id: string;
    /** Human label rendered on the tile, e.g. `'Chill'`. */
    label: string;
    /** Optional decorative glyph shown when there's no artwork. */
    glyph?: string;
    /** Optional cover artwork URL; replaces the gradient glow when present. */
    artworkUrl?: string;
}
export interface CategoryRailProps {
    /** The browse categories, rendered left→right in a horizontally-scrolling rail. */
    categories: readonly CategoryRailItem[];
    /** Optional header label above the rail. */
    title?: string;
    /** Called with a category `id` when its tile is tapped. */
    onSelect?: (id: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * CategoryRail — **V4** "spotlight" design. A horizontally-scrolling rail of
 * rounded browse tiles (genres / moods). Each tile is a gradient-glow cover —
 * the V4 accent→primary wash — or the category artwork when supplied, with the
 * label set in near-white spotlight ink over a legibility scrim. Tiles are
 * ≥44px tap targets. Presentational only; token-only colors via
 * `useXenitionTheme()` and the `spotlight*` helpers (no literal hex).
 * Dark-mode safe.
 */
export declare function CategoryRail({ categories, title, onSelect, style, }: CategoryRailProps): React.ReactElement | null;
//# sourceMappingURL=CategoryRail.d.ts.map