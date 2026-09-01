import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { PriceTag, formatMoney } from '../commerce';
import { clickableProps } from './internal';
import type { PropertyCardProps, PropertyStatus } from './PropertyCard';

/** Drop-in for {@link PropertyCardProps} — same props, the V4 "listing" design. */
export type PropertyCardV4Props = PropertyCardProps;

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
 * PropertyCard — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a listing summary: an elevated card with a
 * floating rounded photo, an overlaid status chip, a price-forward header, and
 * the beds/baths/sqft facts as small soft-primary chips. Same props/behavior as
 * {@link PropertyCardProps}; the `sale`/`rent` variant only changes the price
 * suffix. All colors from `--xen-*` token classes (no literals). `loading` shows
 * a recap; when `onClick` is set the card is a keyboard-activatable button.
 */
export const PropertyCardV4 = React.forwardRef<HTMLDivElement, PropertyCardV4Props>(function PropertyCardV4(
  { address, locality, priceCents, currency = 'USD', variant = 'sale', beds, baths, sqft, imageUrl, status, loading = false, onClick, className, ...rest },
  ref
) {
  const facts: { glyph: string; value: string }[] = [];
  if (typeof beds === 'number') facts.push({ glyph: '🛏', value: `${beds} bd` });
  if (typeof baths === 'number') facts.push({ glyph: '🛁', value: `${baths} ba` });
  if (typeof sqft === 'number') facts.push({ glyph: '📐', value: `${sqft.toLocaleString()} sqft` });

  const priceLabel = `${formatMoney(priceCents, currency)}${variant === 'rent' ? ' per month' : ''}`;
  const label = `${address}, ${priceLabel}${facts.length ? `, ${facts.map((f) => f.value).join(', ')}` : ''}`;

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md',
        onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...clickableProps(onClick as React.MouseEventHandler | undefined, label)}
      {...rest}
    >
      {/* Floating rounded photo. */}
      <div className="relative flex h-[190px] items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-on-surface/10">
        {imageUrl ? <img src={imageUrl} alt={address} className="h-full w-full object-cover" /> : <span className="text-sm text-muted">No photo</span>}
        {status ? (
          <span className="absolute left-2 top-2">
            <Badge tone={STATUS_TONE[status]} variant="soft">
              {STATUS_LABEL[status]}
            </Badge>
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1 px-1 pb-1 pt-[var(--xen-space-md)]">
        {loading ? (
          <span className="text-sm text-muted">Loading listing…</span>
        ) : (
          <>
            <span className="flex items-baseline gap-1">
              <PriceTag cents={priceCents} currency={currency} size="lg" />
              {variant === 'rent' ? <span className="text-sm text-muted">/mo</span> : null}
            </span>
            <span className="truncate text-base font-bold text-on-surface">{address}</span>
            {locality ? <span className="truncate text-sm text-muted">{locality}</span> : null}
            {facts.length > 0 ? (
              <div className="mt-0.5 flex flex-wrap gap-1">
                {facts.map((f) => (
                  <span key={f.value} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-on-surface">
                    <span aria-hidden="true">{f.glyph}</span>
                    {f.value}
                  </span>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
});
