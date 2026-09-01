import * as React from 'react';
import { cn } from '../primitives/cn';
import type { AmenityRowProps } from './AmenityRow';

/** Drop-in for {@link AmenityRowProps} — same props, the V4 "journey" design. */
export type AmenityRowV4Props = AmenityRowProps;

/**
 * AmenityRow — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a property's amenities: each amenity leads with a small
 * brand-gradient glyph disc (the signature V4 touch), the name, and a trailing
 * availability indicator — a `✓` in `text-success` when offered, a muted `✕`
 * (with the label struck) when not, so availability never rides on color alone.
 * Honors `variant` — `list` stacks one disc-led row each; `wrap` lays the discs
 * out as inline chips. Renders an empty hint when the list is empty. Same
 * props/behavior as {@link AmenityRowProps}; all colors from `--xen-*` token
 * classes (no literal colors).
 */
export const AmenityRowV4 = React.forwardRef<HTMLDivElement, AmenityRowV4Props>(function AmenityRowV4(
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
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        {amenities.map((a, i) => {
          const available = a.available !== false;
          return (
            <div
              key={`${a.label}-${i}`}
              aria-label={`${a.label}, ${available ? 'available' : 'unavailable'}`}
              className="flex items-center gap-[var(--xen-space-md)]"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50',
                  available ? '' : 'opacity-60'
                )}
              >
                {a.glyph ?? (available ? '✓' : '✕')}
              </span>
              <span
                className={cn(
                  'min-w-0 flex-1 truncate text-sm',
                  available ? 'text-on-surface' : 'text-muted line-through'
                )}
              >
                {a.label}
              </span>
              <span aria-hidden="true" className={cn('text-sm', available ? 'text-success' : 'text-muted')}>
                {available ? '✓' : '✕'}
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
              'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border border-border py-[var(--xen-space-xs)] pl-[var(--xen-space-xs)] pr-[var(--xen-space-sm)]',
              available ? '' : 'opacity-60'
            )}
          >
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-xs leading-none text-primary-50"
            >
              {a.glyph ?? (available ? '✓' : '✕')}
            </span>
            <span className={cn('text-xs', available ? 'text-on-surface' : 'text-muted line-through')}>
              {a.label}
            </span>
          </span>
        );
      })}
    </div>
  );
});
