import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce/EmptyState';
import { formatMoney, safeCents, PAYMENT_METHOD_META } from './internal';
import type { ReceiptViewProps } from './ReceiptView';

/** Same public contract as {@link ReceiptView} — a drop-in alternate design. */
export type ReceiptViewV3Props = ReceiptViewProps;

/**
 * ReceiptView, redesigned (v3): a **compact total-first summary**. The grand total
 * leads as a hero figure with the merchant + reference beneath; item lines fold
 * into a quiet list and tenders sit as small method chips. A digital-receipt card
 * distinct from v1/v2's ledger. Same props, token-only.
 */
export const ReceiptViewV3 = React.forwardRef<HTMLDivElement, ReceiptViewV3Props>(function ReceiptViewV3(
  { merchant, addressLines, orderNumber, timestamp, items, currency = 'USD', subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant, emptyLabel = 'No items', testID, className, ...rest },
  ref
) {
  void variant;
  void addressLines;
  void subtotalCents;
  void discountCents;
  void taxCents;
  void tipCents;

  if (items.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">🧾</span>} title={emptyLabel} className={className} data-testid={testID} {...rest} />;
  }

  return (
    <div
      ref={ref}
      data-xen-receipt-view=""
      data-testid={testID}
      className={cn('flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-sm', className)}
      {...rest}
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-muted">Total</p>
        <p className="text-3xl font-bold tabular-nums text-on-surface">{formatMoney(totalCents, currency)}</p>
        <p className="text-xs text-muted">
          {[merchant, orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ')}
        </p>
      </div>
      <ul className="flex flex-col gap-0.5 border-t border-border pt-2">
        {items.map((it, i) => (
          <li key={i} className="flex justify-between text-xs tabular-nums text-muted">
            <span className="min-w-0 truncate">{it.quantity && it.quantity > 1 ? `${it.quantity}× ` : ''}{it.name}</span>
            <span>{formatMoney(it.amountCents, currency)}</span>
          </li>
        ))}
      </ul>
      {tenders && tenders.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {tenders.map((t, i) => (
            <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">
              {PAYMENT_METHOD_META[t.method].glyph} {formatMoney(safeCents(t.amountCents), currency)}
            </span>
          ))}
        </div>
      ) : null}
      {footer ? <p className="text-xs text-muted">{footer}</p> : null}
    </div>
  );
});
