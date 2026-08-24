import * as React from 'react';
import { cn } from '../primitives/cn';

/** A single amenity. */
export interface Amenity {
  /** Leading glyph/emoji, e.g. `'📶'`. */
  glyph?: string;
  /** Amenity name. */
  label: string;
  /** Whether the property offers it (default `true`). */
  available?: boolean;
}

/** Layout for the amenity list. */
export type AmenityRowVariant = 'wrap' | 'list';

export interface AmenityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Amenities to display. */
  amenities: readonly Amenity[];
  /** `wrap` = inline chips; `list` = one stacked row each with a status glyph. */
  variant?: AmenityRowVariant;
}

/**
 * Web parity of the native `AmenityRow`: a property's amenities — either inline
 * chips (`wrap`) or a stacked list. Unavailable amenities are muted, struck, and
 * carry a `✕` (available carry a `✓`), so availability never depends on color
 * alone. Renders an empty hint when the list is empty. Token-only colors.
 */
export const AmenityRow = React.forwardRef<HTMLDivElement, AmenityRowProps>(function AmenityRow(
  { amenities, variant = 'wrap', className, ...rest },
  ref
) {
  if (amenities.length === 0) {
    return (
      <div ref={ref} data-xen-amenity-row="" className={cn('text-sm text-muted', className)} {...rest}>
        No amenities listed.
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div
        ref={ref}
        data-xen-amenity-row=""
        className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)}
        {...rest}
      >
        {amenities.map((a, i) => {
          const available = a.available !== false;
          return (
            <div
              key={`${a.label}-${i}`}
              aria-label={`${a.label}, ${available ? 'available' : 'unavailable'}`}
              className="flex items-center gap-[var(--xen-space-sm)]"
            >
              <span aria-hidden="true" className={cn('text-sm', available ? 'text-success' : 'text-muted')}>
                {available ? '✓' : '✕'}
              </span>
              {a.glyph ? (
                <span aria-hidden="true" className="text-sm text-on-surface">
                  {a.glyph}
                </span>
              ) : null}
              <span
                className={cn(
                  'text-sm',
                  available ? 'text-on-surface' : 'text-muted line-through'
                )}
              >
                {a.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-amenity-row=""
      className={cn('flex flex-wrap gap-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      {amenities.map((a, i) => {
        const available = a.available !== false;
        return (
          <span
            key={`${a.label}-${i}`}
            aria-label={`${a.label}, ${available ? 'available' : 'unavailable'}`}
            className={cn(
              'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border border-border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
              available ? '' : 'opacity-60'
            )}
          >
            <span aria-hidden="true" className="text-xs text-on-surface">
              {a.glyph ?? (available ? '✓' : '✕')}
            </span>
            <span
              className={cn('text-xs', available ? 'text-on-surface' : 'text-muted line-through')}
            >
              {a.label}
            </span>
          </span>
        );
      })}
    </div>
  );
});
