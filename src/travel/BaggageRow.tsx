import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';

/** The category of baggage. */
export type BaggageKind = 'cabin' | 'personal' | 'checked';

export interface BaggageRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Baggage category (selects a default glyph + label). */
  kind?: BaggageKind;
  /** Override the row title. */
  label?: string;
  /** Allowance detail, e.g. `'1 × 23 kg'` or `'55 × 40 × 20 cm'`. */
  allowance?: string;
  /** Whether the allowance is included in the fare. */
  included?: boolean;
  /** Extra price in integer minor units (cents) when not included. */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
}

const KIND: Record<BaggageKind, { glyph: string; label: string }> = {
  personal: { glyph: '👜', label: 'Personal item' },
  cabin: { glyph: '🧳', label: 'Cabin bag' },
  checked: { glyph: '🧳', label: 'Checked bag' },
};

/**
 * Web parity of the native `BaggageRow`: a single baggage-allowance line — a
 * kind glyph, the title, the allowance detail, and a trailing status: an
 * "Included" badge or a fare add-on price. `included` drives both the badge text
 * and the announcement (never color-alone). Token-only colors.
 */
export const BaggageRow = React.forwardRef<HTMLDivElement, BaggageRowProps>(function BaggageRow(
  { kind = 'cabin', label, allowance, included = false, priceCents, currency = 'USD', className, ...rest },
  ref
) {
  const meta = KIND[kind];
  const title = label ?? meta.label;

  const trailing = included ? (
    <Badge tone="success">Included</Badge>
  ) : typeof priceCents === 'number' ? (
    <PriceTag cents={priceCents} currency={currency} size="sm" />
  ) : (
    <span className="text-xs text-muted">Not available</span>
  );

  return (
    <div
      ref={ref}
      data-xen-baggage-row=""
      aria-label={`${title}${allowance ? `, ${allowance}` : ''}, ${included ? 'included' : 'extra'}`}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        className
      )}
      {...rest}
    >
      <span aria-hidden="true" className="text-lg text-on-surface">
        {meta.glyph}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="text-sm font-semibold text-on-surface">{title}</span>
        {allowance ? <span className="text-xs text-muted">{allowance}</span> : null}
      </div>
      {trailing}
    </div>
  );
});
