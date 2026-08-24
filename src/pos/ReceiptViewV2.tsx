import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce/EmptyState';
import { formatMoney, safeCents, PAYMENT_METHOD_META } from './internal';
import type { ReceiptViewProps } from './ReceiptView';

/** Same public contract as {@link ReceiptView} — a drop-in alternate design. */
export type ReceiptViewV2Props = ReceiptViewProps;

/**
 * ReceiptView, redesigned (v2): a **printed paper receipt**. Centered merchant +
 * address, a dashed tear rule, monospace-tabular item lines, a totals ledger, the
 * tenders with method glyphs + derived change, and a centered footer. A literal
 * till-roll look distinct from v1. Same props, token-only.
 */
export const ReceiptViewV2 = React.forwardRef<HTMLDivElement, ReceiptViewV2Props>(function ReceiptViewV2(
  { merchant, addressLines, orderNumber, timestamp, items, currency = 'USD', subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant, emptyLabel = 'No items', testID, className, ...rest },
  ref
) {
  const compact = variant === 'compact';

  if (items.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">🧾</span>} title={emptyLabel} className={className} data-testid={testID} {...rest} />;
  }

  const tendered = (tenders ?? []).reduce((sum, t) => sum + safeCents(t.amountCents), 0);
  const change = tendered - totalCents;
  const Row = ({ label, cents, strong }: { label: string; cents: number; strong?: boolean }): React.ReactElement => (
    <div className={cn('flex justify-between tabular-nums', strong ? 'text-base font-bold text-on-surface' : 'text-xs text-muted')}>
      <span>{label}</span>
      <span>{formatMoney(cents, currency)}</span>
    </div>
  );

  return (
    <div
      ref={ref}
      data-xen-receipt-view=""
      data-testid={testID}
      className={cn('flex flex-col gap-2 rounded-md border border-border bg-surface p-4', className)}
      {...rest}
    >
      <div className="text-center">
        {merchant ? <p className="text-base font-bold text-on-surface">{merchant}</p> : null}
        {!compact && addressLines ? addressLines.map((l, i) => <p key={i} className="text-xs text-muted">{l}</p>) : null}
        {(orderNumber || timestamp) ? (
          <p className="mt-1 text-xs text-muted">{[orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ')}</p>
        ) : null}
      </div>

      <div className="border-t border-dashed border-border pt-2">
        {items.map((it, i) => (
          <div key={i} className="flex justify-between gap-2 text-sm tabular-nums text-on-surface">
            <span className="min-w-0 truncate">{it.quantity && it.quantity > 1 ? `${it.quantity}× ` : ''}{it.name}</span>
            <span>{formatMoney(it.amountCents, currency)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-0.5 border-t border-dashed border-border pt-2">
        {typeof subtotalCents === 'number' ? <Row label="Subtotal" cents={subtotalCents} /> : null}
        {safeCents(discountCents) > 0 ? <Row label="Discount" cents={-safeCents(discountCents)} /> : null}
        {typeof taxCents === 'number' ? <Row label="Tax" cents={taxCents} /> : null}
        {safeCents(tipCents) > 0 ? <Row label="Tip" cents={tipCents!} /> : null}
        <Row label="Total" cents={totalCents} strong />
      </div>

      {tenders && tenders.length > 0 ? (
        <div className="flex flex-col gap-0.5 border-t border-dashed border-border pt-2">
          {tenders.map((t, i) => (
            <div key={i} className="flex justify-between text-xs tabular-nums text-muted">
              <span>{PAYMENT_METHOD_META[t.method].glyph} {PAYMENT_METHOD_META[t.method].label}</span>
              <span>{formatMoney(t.amountCents, currency)}</span>
            </div>
          ))}
          {change > 0 ? (
            <div className="flex justify-between text-xs font-semibold tabular-nums text-on-surface">
              <span>Change</span>
              <span>{formatMoney(change, currency)}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {footer ? <p className="border-t border-dashed border-border pt-2 text-center text-xs text-muted">{footer}</p> : null}
    </div>
  );
});
