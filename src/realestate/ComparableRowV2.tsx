import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { formatMoney } from '../commerce';
import type { ComparableRowProps, ComparableStatus } from './ComparableRow';

/** Same public contract as {@link ComparableRow} — a drop-in alternate design. */
export type ComparableRowV2Props = ComparableRowProps;

const STATUS: Record<ComparableStatus, { label: string; tone: BadgeTone }> = {
  active: { label: 'Active', tone: 'success' },
  pending: { label: 'Pending', tone: 'warn' },
  sold: { label: 'Sold', tone: 'neutral' },
};

/**
 * ComparableRow, redesigned (v2): an **elevated comp card**. The address leads
 * with a status badge, the price is a hero figure, and beds·baths·sqft·$/sqft
 * render as tinted stat chips with the distance trailing. Distinct from v1's flat
 * row. Same props, token-only.
 */
export const ComparableRowV2 = React.forwardRef<HTMLDivElement, ComparableRowV2Props>(
  function ComparableRowV2(
    { address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, className, ...rest },
    ref
  ) {
    const st = status ? STATUS[status] : undefined;
    const perSqft = sqft && sqft > 0 ? Math.round(priceCents / sqft) : null;
    const chips = [
      typeof beds === 'number' ? `${beds} bd` : null,
      typeof baths === 'number' ? `${baths} ba` : null,
      typeof sqft === 'number' ? `${sqft.toLocaleString()} sqft` : null,
      perSqft ? `${formatMoney(perSqft, currency)}/sqft` : null,
    ].filter((s): s is string => !!s);

    return (
      <div ref={ref} data-xen-comparable-row="" className={cn('flex flex-col gap-2 rounded-lg bg-surface p-3 shadow-sm', className)} {...rest}>
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{address}</p>
          {st ? <Badge tone={st.tone}>{st.label}</Badge> : null}
        </div>
        <p className="text-xl font-bold text-on-surface">{formatMoney(priceCents, currency)}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {chips.map((c, i) => (
            <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{c}</span>
          ))}
          {distance ? <span className="ml-auto text-xs text-muted">{distance}</span> : null}
        </div>
      </div>
    );
  }
);
