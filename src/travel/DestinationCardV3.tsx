import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';
import type { DestinationCardProps } from './DestinationCard';

/** Same public contract as {@link DestinationCard} — a drop-in alternate design. */
export type DestinationCardV3Props = DestinationCardProps;

/**
 * DestinationCard, redesigned (v3): a **compact destination row**. A glyph tile,
 * the name over a country·tagline line with an optional badge, and the "from"
 * price pinned right — hairline-bordered for a list. The opposite of v2's hero.
 * Same props, token-only.
 */
export const DestinationCardV3 = React.forwardRef<HTMLDivElement, DestinationCardV3Props>(
  function DestinationCardV3({ name, country, tagline, glyph = '📍', fromCents, currency = 'USD', badge, variant, onClick, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const sub = [country, tagline].filter((s): s is string => !!s).join(' · ');
    return (
      <div
        ref={ref}
        data-xen-destination-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={name}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
        className={cn('flex items-center gap-3 border-b border-border py-3', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
        {...rest}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-2xl" aria-hidden>{glyph}</span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-on-surface">
            {name}
            {badge ? <Badge tone="primary">{badge}</Badge> : null}
          </p>
          {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
        </div>
        {typeof fromCents === 'number' ? (
          <div className="text-right">
            <p className="text-xs text-muted">from</p>
            <PriceTag cents={fromCents} currency={currency} size="sm" />
          </div>
        ) : null}
      </div>
    );
  }
);
