import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { PriceTag, formatMoney } from '../commerce';
import { clickableProps } from './internal';

/** Whether the listing is for sale or for rent (drives the price suffix). */
export type PropertyCardVariant = 'sale' | 'rent';

/** Listing status chip shown over the media. */
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'new';

export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Street address / headline line. */
  address: string;
  /** Secondary locality line (e.g. "Brooklyn, NY 11201"). */
  locality?: string;
  /** Price in integer minor units (cents). For `rent`, this is the monthly rent. */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Sale vs. rent — `rent` appends a "/mo" suffix to the price. */
  variant?: PropertyCardVariant;
  /** Bedroom count. */
  beds?: number;
  /** Bathroom count. */
  baths?: number;
  /** Interior area in square feet. */
  sqft?: number;
  /** Hero image URL. Omit for a token-styled placeholder. */
  imageUrl?: string;
  /** Optional status chip rendered on the media. */
  status?: PropertyStatus;
  /** Renders a lightweight placeholder recap instead of data. */
  loading?: boolean;
}

const STATUS_TONE: Record<PropertyStatus, BadgeTone> = {
  active: 'success',
  pending: 'warn',
  sold: 'danger',
  new: 'primary',
};

const STATUS_LABEL: Record<PropertyStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  sold: 'Sold',
  new: 'New',
};

/**
 * Web parity of the native `PropertyCard`: a single real-estate listing summary
 * — hero media, price, address, and the beds/baths/sqft fact row. Data +
 * `onClick` only; nothing fetches. The `sale` vs. `rent` variant only changes
 * the price suffix ("/mo" for rentals). All colors come from the `--xen-*`
 * tokens via Tailwind classes — no literal colors; the media placeholder and
 * status chip are token-styled. Pass `loading` for a recap. When `onClick` is
 * set the card becomes a keyboard-activatable button.
 */
export const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  function PropertyCard(
    {
      address,
      locality,
      priceCents,
      currency = 'USD',
      variant = 'sale',
      beds,
      baths,
      sqft,
      imageUrl,
      status,
      loading = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const facts: string[] = [];
    if (typeof beds === 'number') facts.push(`${beds} bd`);
    if (typeof baths === 'number') facts.push(`${baths} ba`);
    if (typeof sqft === 'number') facts.push(`${sqft.toLocaleString()} sqft`);

    const priceLabel = `${formatMoney(priceCents, currency)}${variant === 'rent' ? ' per month' : ''}`;
    const label = `${address}, ${priceLabel}${facts.length ? `, ${facts.join(', ')}` : ''}`;

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'overflow-hidden border border-border bg-surface text-on-surface',
          'rounded-[var(--xen-radius-lg)]',
          onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...clickableProps(onClick as React.MouseEventHandler | undefined, label)}
        {...rest}
      >
        <div className="relative flex h-[180px] items-center justify-center overflow-hidden bg-neutral-100">
          {imageUrl ? (
            <img src={imageUrl} alt={address} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm text-muted">No photo</span>
          )}
          {status ? (
            <span className="absolute left-2 top-2">
              <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1 p-[var(--xen-space-lg)]">
          {loading ? (
            <span className="text-sm text-muted">Loading listing…</span>
          ) : (
            <>
              <span className="flex items-baseline gap-1">
                <PriceTag cents={priceCents} currency={currency} size="lg" />
                {variant === 'rent' ? <span className="text-sm text-muted">/mo</span> : null}
              </span>
              <span className="truncate text-base font-semibold text-on-surface">{address}</span>
              {locality ? <span className="truncate text-sm text-muted">{locality}</span> : null}
              {facts.length > 0 ? (
                <span className="text-sm text-muted">{facts.join(' · ')}</span>
              ) : null}
            </>
          )}
        </div>
      </div>
    );
  }
);
