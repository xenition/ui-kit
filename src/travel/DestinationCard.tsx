import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';

/** Visual size for a {@link DestinationCard}. */
export type DestinationCardVariant = 'default' | 'wide';

export interface DestinationCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Destination/city name. */
  name: string;
  /** Country or region line. */
  country?: string;
  /** Short evocative tagline. */
  tagline?: string;
  /** Leading emoji/glyph overlaid on the media placeholder (e.g. `'🗼'`). */
  glyph?: string;
  /** "From" price in integer minor units (cents). */
  fromCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Corner ribbon label, e.g. `'Popular'`. */
  badge?: string;
  /** Size variant. */
  variant?: DestinationCardVariant;
  /** Fires when the card is activated. */
  onClick?: () => void;
}

/**
 * Web parity of the native `DestinationCard`: a destination discovery tile — a
 * token-styled media placeholder (no image dependency) with an overlaid glyph,
 * the place name/country, an optional tagline, a "from" price, and an optional
 * badge ribbon. Data + `onClick` only. Token-only colors.
 */
export const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  function DestinationCard(
    {
      name,
      country,
      tagline,
      glyph = '🌍',
      fromCents,
      currency = 'USD',
      badge,
      variant = 'default',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const wide = variant === 'wide';
    const interactive = typeof onClick === 'function';
    const a11yLabel = `${name}${country ? `, ${country}` : ''}`;

    return (
      <div
        ref={ref}
        data-xen-destination-card=""
        className={cn(
          'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
          wide ? 'w-full' : 'w-[220px]',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': a11yLabel,
              onClick,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
      >
        <div
          aria-hidden="true"
          className={cn(
            'relative flex items-center justify-center bg-neutral-100',
            wide ? 'h-[120px]' : 'h-[140px]'
          )}
        >
          <span className="text-3xl text-muted">{glyph}</span>
          {badge ? (
            <span className="absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]">
              <Badge tone="primary">{badge}</Badge>
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-md)]">
          <div className="flex items-baseline justify-between gap-[var(--xen-space-sm)]">
            <span className="min-w-0 flex-shrink truncate text-lg font-bold text-on-surface">
              {name}
            </span>
            {country ? <span className="text-xs text-muted">{country}</span> : null}
          </div>
          {tagline ? <span className="line-clamp-2 text-sm text-muted">{tagline}</span> : null}
          {typeof fromCents === 'number' ? (
            <div className="flex items-baseline gap-[var(--xen-space-xs)]">
              <span className="text-xs text-muted">from</span>
              <PriceTag cents={fromCents} currency={currency} size="sm" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
