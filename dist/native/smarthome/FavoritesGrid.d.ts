import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { DeviceTileProps } from './DeviceTile';
/** A favorite device entry — a {@link DeviceTileProps} plus a stable `id` key. */
export interface FavoriteDevice extends DeviceTileProps {
    /** Stable identity used as the React key (falls back to `name` if absent). */
    id?: string;
}
export interface FavoritesGridProps {
    /**
     * The favorite devices to render, each as a {@link DeviceTileV4}. Same prop
     * shape as {@link DeviceTileProps} (with an optional `id` key).
     */
    devices: readonly FavoriteDevice[];
    /** Section heading above the grid. Defaults to `'Favorites'`. Pass `null` to hide it. */
    title?: string | null;
    /** Preferred column count (1–4). Defaults to `2`; tiles wrap to fit the width. */
    columns?: 1 | 2 | 3 | 4;
    /** Copy shown when `devices` is empty. Defaults to `'No favorites yet'`. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * FavoritesGrid — **V4** "ambient" quick-control grid. A responsive grid of
 * favorite devices, each rendered as a glowing {@link DeviceTileV4} so active
 * devices light up while idle ones stay calm. Tiles wrap across `columns`.
 * Exposed as a `list` for assistive tech; presentational only (data + the
 * tiles' own callbacks). Token-only colors via `useXenitionTheme()` and the
 * reused tile; dark-mode safe.
 */
export declare function FavoritesGrid({ devices, title, columns, emptyLabel, style, }: FavoritesGridProps): React.ReactElement;
//# sourceMappingURL=FavoritesGrid.d.ts.map