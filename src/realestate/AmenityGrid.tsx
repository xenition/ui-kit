import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { EmptyState } from '../commerce';

/** One amenity entry. `available: false` renders a struck, muted "not offered" tile. */
export interface Amenity {
  /** Human label (e.g. "In-unit laundry"). */
  label: string;
  /** Optional leading glyph/emoji. */
  glyph?: string;
  /** Availability; defaults to `true`. */
  available?: boolean;
}

export interface AmenityGridProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Amenities to display. Empty renders the shared `EmptyState`. */
  amenities: Amenity[];
  /** Number of columns (default 2). */
  columns?: number;
  /** Empty-state headline. */
  emptyLabel?: string;
}

/**
 * Web parity of the native `AmenityGrid`: a grid of property amenities — each a
 * token-styled tile with an optional glyph, a check/dash availability marker, and
 * a struck label when the amenity is not offered. Presentational only (data in,
 * nothing fetches); degrades to the shared `EmptyState` when `amenities` is empty.
 * `columns` controls the layout width. All colors come from the `--xen-*` tokens
 * — no literal colors; each tile carries an a11y label.
 */
export const AmenityGrid = React.forwardRef<HTMLUListElement, AmenityGridProps>(
  function AmenityGrid(
    { amenities, columns = 2, emptyLabel = 'No amenities listed', className, style, ...rest },
    ref
  ) {
    if (amenities.length === 0) {
      return (
        <EmptyState
          title={emptyLabel}
          description="Amenity details will appear here."
          className={className}
        />
      );
    }

    const cols = Math.max(1, columns);

    return (
      <ul
        ref={ref}
        className={cn('grid list-none gap-2 p-0', className)}
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, ...style }}
        {...rest}
      >
        {amenities.map((a, i) => {
          const available = a.available !== false;
          return (
            <li
              key={`${a.label}-${i}`}
              aria-label={`${a.label}, ${available ? 'available' : 'not available'}`}
              className={cn(
                'flex items-center gap-2 border border-border bg-surface px-3 py-2',
                'rounded-[var(--xen-radius-md)]',
                !available && 'opacity-60'
              )}
            >
              {a.glyph ? <Icon glyph={a.glyph} size="base" color={available ? 'onSurface' : 'muted'} /> : null}
              <Icon glyph={available ? '✓' : '—'} size="sm" color={available ? 'success' : 'muted'} />
              <span
                className={cn(
                  'flex-1 truncate text-sm',
                  available ? 'text-on-surface' : 'text-muted line-through'
                )}
              >
                {a.label}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
);
