import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';
import type { BaggageRowProps, BaggageKind } from './BaggageRow';

/** Drop-in for {@link BaggageRowProps} — same props, the V4 "journey" design. */
export type BaggageRowV4Props = BaggageRowProps;

const KIND: Record<BaggageKind, { glyph: string; label: string }> = {
  personal: { glyph: '👜', label: 'Personal item' },
  cabin: { glyph: '🧳', label: 'Cabin bag' },
  checked: { glyph: '🧳', label: 'Checked bag' },
};

/**
 * BaggageRow — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a baggage-allowance line: the baggage-kind glyph sits in
 * a small brand-gradient disc (the signature V4 touch), followed by the title and
 * the allowance detail, then a trailing status — an "Included" success badge when
 * the allowance is in the fare, otherwise the fare add-on price via `PriceTag`
 * (or a muted "Not available"). `included` drives both the badge text and the
 * announcement, so meaning never rides on color alone. Same props/behavior as
 * {@link BaggageRowProps}; all colors from `--xen-*` token classes (no literal
 * colors).
 */
export const BaggageRowV4 = React.forwardRef<HTMLDivElement, BaggageRowV4Props>(function BaggageRowV4(
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
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700 text-lg leading-none text-primary-50"
      >
        {meta.glyph}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="truncate text-sm font-semibold text-on-surface">{title}</span>
        {allowance ? <span className="truncate text-xs text-muted">{allowance}</span> : null}
      </div>
      {trailing}
    </div>
  );
});
