import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';
import type { DestinationCardProps } from './DestinationCard';

/** Same public contract as {@link DestinationCard} — a drop-in alternate design. */
export type DestinationCardV2Props = DestinationCardProps;

/**
 * DestinationCard, redesigned (v2): a **full-bleed destination hero**. A big
 * tinted media panel with the glyph watermark, a corner badge, and the name/
 * country/tagline over a scrim, with a "from" price chip floating. Elevated,
 * hover-lift. Same props as {@link DestinationCard}, token-only.
 */
export const DestinationCardV2 = React.forwardRef<HTMLDivElement, DestinationCardV2Props>(
  function DestinationCardV2({ name, country, tagline, glyph = '📍', fromCents, currency = 'USD', badge, variant, onClick, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    return (
      <div
        ref={ref}
        data-xen-destination-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={name}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
        className={cn('relative flex h-48 flex-col justify-end overflow-hidden rounded-lg bg-primary/10 shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className)}
        {...rest}
      >
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-6xl opacity-40" aria-hidden>{glyph}</span>
        {badge ? <div className="absolute left-2 top-2"><Badge tone="primary">{badge}</Badge></div> : null}
        {typeof fromCents === 'number' ? (
          <div className="absolute right-2 top-2 rounded-full bg-surface/90 px-2 py-0.5">
            <span className="text-xs text-muted">from </span>
            <PriceTag cents={fromCents} currency={currency} size="sm" />
          </div>
        ) : null}
        <div className="relative bg-gradient-to-t from-neutral-900/70 to-transparent p-3 pt-10">
          <p className="text-lg font-bold text-neutral-50">{name}</p>
          {country ? <p className="text-xs text-neutral-200">{country}</p> : null}
          {tagline ? <p className="mt-0.5 text-xs text-neutral-300">{tagline}</p> : null}
        </div>
      </div>
    );
  }
);
