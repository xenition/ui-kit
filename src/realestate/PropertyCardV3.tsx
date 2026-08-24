import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { formatMoney } from '../commerce';
import { clickableProps } from './internal';
import type { PropertyCardProps, PropertyStatus } from './PropertyCard';

/** Same public contract as {@link PropertyCard} — a drop-in alternate design. */
export type PropertyCardV3Props = PropertyCardProps;

const STATUS: Record<PropertyStatus, { label: string; tone: BadgeTone }> = {
  active: { label: 'Active', tone: 'success' },
  pending: { label: 'Pending', tone: 'warn' },
  sold: { label: 'Sold', tone: 'neutral' },
  new: { label: 'New', tone: 'primary' },
};

/**
 * PropertyCard, redesigned (v3): a **dense listing row**. A small thumbnail, the
 * price + address over a locality·beds·baths·sqft line, and the status badge on
 * the trailing edge — hairline-bordered for a results list. The opposite of v2's
 * hero. Same props, token-only.
 */
export const PropertyCardV3 = React.forwardRef<HTMLDivElement, PropertyCardV3Props>(
  function PropertyCardV3(
    { address, locality, priceCents, currency = 'USD', variant = 'sale', beds, baths, sqft, imageUrl, status, loading = false, className, onClick, ...rest },
    ref
  ) {
    if (loading) {
      return (
        <div ref={ref} data-xen-property-card="" aria-label="Loading listing" className={cn('flex items-center gap-3 border-b border-border py-3', className)} {...rest}>
          <div className="h-14 w-14 animate-pulse rounded-md bg-neutral-100" />
          <div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" />
        </div>
      );
    }

    const st = status ? STATUS[status] : undefined;
    const price = `${formatMoney(priceCents, currency)}${variant === 'rent' ? '/mo' : ''}`;
    const meta = [
      locality,
      typeof beds === 'number' ? `${beds} bd` : null,
      typeof baths === 'number' ? `${baths} ba` : null,
      typeof sqft === 'number' ? `${sqft.toLocaleString()} sqft` : null,
    ].filter((s): s is string => !!s);
    const click = clickableProps(onClick as React.MouseEventHandler | undefined, address);

    return (
      <div
        ref={ref}
        data-xen-property-card=""
        onClick={onClick}
        {...click}
        className={cn(
          'flex items-center gap-3 border-b border-border py-3',
          onClick && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        {...rest}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
          {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : '🏠'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-on-surface">{price}</p>
          <p className="truncate text-sm text-on-surface">{address}</p>
          {meta.length > 0 ? <p className="truncate text-xs text-muted">{meta.join(' · ')}</p> : null}
        </div>
        {st ? <Badge tone={st.tone}>{st.label}</Badge> : null}
      </div>
    );
  }
);
