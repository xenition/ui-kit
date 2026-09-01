import * as React from 'react';
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
    /** Preferred column count on wide viewports (1–4). Defaults to `2`; wraps to 1 on small widths. */
    columns?: 1 | 2 | 3 | 4;
    /** Copy shown when `devices` is empty. Defaults to `'No favorites yet'`. */
    emptyLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * FavoritesGrid — **V4** "ambient" quick-control grid. A responsive grid of
 * favorite devices, each rendered as a glowing {@link DeviceTileV4} so active
 * devices light up while idle ones stay calm. Wraps to a single column on
 * narrow widths. Exposed as a `list` with each tile a `listitem` for
 * assistive tech; presentational only (data + the tiles' own callbacks). All
 * colors come from the reused tile and `--xen-*` token classes (no literals);
 * dark-mode safe.
 */
export declare const FavoritesGrid: React.ForwardRefExoticComponent<FavoritesGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FavoritesGrid.d.ts.map