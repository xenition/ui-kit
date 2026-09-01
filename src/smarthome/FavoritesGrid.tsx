import * as React from 'react';
import { cn } from '../primitives/cn';
import { DeviceTileV4 } from './DeviceTileV4';
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

const COL_CLASS: Record<1 | 2 | 3 | 4, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

/**
 * FavoritesGrid — **V4** "ambient" quick-control grid. A responsive grid of
 * favorite devices, each rendered as a glowing {@link DeviceTileV4} so active
 * devices light up while idle ones stay calm. Wraps to a single column on
 * narrow widths. Exposed as a `list` with each tile a `listitem` for
 * assistive tech; presentational only (data + the tiles' own callbacks). All
 * colors come from the reused tile and `--xen-*` token classes (no literals);
 * dark-mode safe.
 */
export const FavoritesGrid = React.forwardRef<HTMLDivElement, FavoritesGridProps>(function FavoritesGrid(
  { devices, title = 'Favorites', columns = 2, emptyLabel = 'No favorites yet', className, style, ...rest },
  ref
) {
  const list = Array.isArray(devices) ? devices : [];

  return (
    <div ref={ref} style={style} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      {title != null ? (
        <p className="px-[var(--xen-space-xs)] text-sm font-bold uppercase tracking-wide text-muted">{title}</p>
      ) : null}
      {list.length === 0 ? (
        <div className="rounded-[var(--xen-radius-lg)] border border-dashed border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-lg)] text-center text-sm text-muted">
          {emptyLabel}
        </div>
      ) : (
        <ul
          role="list"
          aria-label={typeof title === 'string' ? title : 'Favorites'}
          className={cn('grid gap-[var(--xen-space-sm)]', COL_CLASS[columns])}
        >
          {list.map((device, i) => {
            const { id, ...tile } = device;
            return (
              <li key={id ?? `${device.name}-${i}`} role="listitem">
                <DeviceTileV4 {...tile} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});
