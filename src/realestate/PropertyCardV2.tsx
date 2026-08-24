import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { formatMoney } from '../commerce';
import { clickableProps } from './internal';
import type { PropertyCardProps, PropertyStatus } from './PropertyCard';

/** Same public contract as {@link PropertyCard} — a drop-in alternate design. */
export type PropertyCardV2Props = PropertyCardProps;

const STATUS: Record<PropertyStatus, { label: string; tone: BadgeTone }> = {
  active: { label: 'Active', tone: 'success' },
  pending: { label: 'Pending', tone: 'warn' },
  sold: { label: 'Sold', tone: 'neutral' },
  new: { label: 'New', tone: 'primary' },
};

/**
 * PropertyCard, redesigned (v2): a **full-bleed listing hero**. The photo fills
 * the card; the status chip floats top-left and the price + address + beds·baths·
 * sqft sit on a gradient scrim at the bottom. Elevated, hover-lift. Same props as
 * {@link PropertyCard}, token-only.
 */
export const PropertyCardV2 = React.forwardRef<HTMLDivElement, PropertyCardV2Props>(
  function PropertyCardV2(
    { address, locality, priceCents, currency = 'USD', variant = 'sale', beds, baths, sqft, imageUrl, status, loading = false, className, onClick, ...rest },
    ref
  ) {
    if (loading) {
      return <div ref={ref} data-xen-property-card="" aria-label="Loading listing" className={cn('h-56 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
    }

    const st = status ? STATUS[status] : undefined;
    const price = `${formatMoney(priceCents, currency)}${variant === 'rent' ? '/mo' : ''}`;
    const meta = [
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
          'relative flex h-56 flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 shadow-md transition-transform',
          onClick && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
          className
        )}
        {...rest}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl">🏠</div>
        )}
        {st ? <div className="absolute left-2 top-2"><Badge tone={st.tone}>{st.label}</Badge></div> : null}
        <div className="relative bg-gradient-to-t from-neutral-900/75 to-transparent p-3 pt-10">
          <p className="text-lg font-bold text-neutral-50">{price}</p>
          <p className="truncate text-sm text-neutral-100">{address}</p>
          {locality ? <p className="truncate text-xs text-neutral-300">{locality}</p> : null}
          {meta.length > 0 ? <p className="mt-0.5 text-xs text-neutral-200">{meta.join(' · ')}</p> : null}
        </div>
      </div>
    );
  }
);
