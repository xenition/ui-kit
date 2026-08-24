import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';
import type { ComparableRowProps, ComparableStatus } from './ComparableRow';

/** Same public contract as {@link ComparableRow} — a drop-in alternate design. */
export type ComparableRowV3Props = ComparableRowProps;

const STATUS_DOT: Record<ComparableStatus, string> = { active: 'bg-success', pending: 'bg-warn', sold: 'bg-neutral-400' };
const STATUS_LABEL: Record<ComparableStatus, string> = { active: 'Active', pending: 'Pending', sold: 'Sold' };

/**
 * ComparableRow, redesigned (v3): a **dense comp line**. The address over a
 * beds·baths·sqft·distance subtitle with a status dot + word, and the price pinned
 * right — hairline-bordered for a comps table. The opposite of v2's card. Status
 * is dot + word, never color alone. Same props, token-only.
 */
export const ComparableRowV3 = React.forwardRef<HTMLDivElement, ComparableRowV3Props>(
  function ComparableRowV3(
    { address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, className, ...rest },
    ref
  ) {
    const sub = [
      status ? STATUS_LABEL[status] : null,
      typeof beds === 'number' ? `${beds} bd` : null,
      typeof baths === 'number' ? `${baths} ba` : null,
      typeof sqft === 'number' ? `${sqft.toLocaleString()} sqft` : null,
      distance,
    ].filter((s): s is string => !!s);

    return (
      <div ref={ref} data-xen-comparable-row="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
        {status ? <span className={cn('inline-block h-2 w-2 shrink-0 rounded-full', STATUS_DOT[status])} aria-hidden /> : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-on-surface">{address}</p>
          {sub.length > 0 ? <p className="truncate text-xs text-muted">{sub.join(' · ')}</p> : null}
        </div>
        <span className="text-sm font-bold text-on-surface">{formatMoney(priceCents, currency)}</span>
      </div>
    );
  }
);
