import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { AmenityGridProps } from './AmenityGrid';

/** Drop-in for {@link AmenityGridProps} — same props, the V4 "listing" design. */
export type AmenityGridV4Props = AmenityGridProps;

/**
 * AmenityGrid — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on the amenity grid: each amenity is a soft-primary
 * tinted glyph disc above an airy label, wrapping responsively into a clean grid.
 * ONE accent = primary; unavailable amenities read muted with a struck label and a
 * dashed disc. Same props/behavior as {@link AmenityGridProps}; `columns` sets the
 * layout width and an empty list degrades to the shared `EmptyState`. All colors
 * come from the `--xen-*` token classes (no literals); each tile carries an a11y label.
 */
export const AmenityGridV4 = React.forwardRef<HTMLUListElement, AmenityGridV4Props>(
  function AmenityGridV4(
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
                'flex flex-col items-center gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 text-center shadow-sm',
                !available && 'opacity-60'
              )}
            >
              {/* Soft-primary tinted glyph disc. */}
              <span
                aria-hidden="true"
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full text-lg',
                  available ? 'bg-primary/10 text-on-surface' : 'border border-dashed border-border bg-transparent text-muted'
                )}
              >
                {a.glyph ?? (available ? '✓' : '—')}
              </span>
              <span
                className={cn(
                  'w-full truncate text-sm font-medium',
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
