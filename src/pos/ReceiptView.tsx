import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import { formatMoney, safeCents, PAYMENT_METHOD_META, type PaymentMethod } from './internal';

export interface ReceiptLine {
  /** Item name. */
  name: string;
  /** Quantity (default 1). */
  quantity?: number;
  /** Line total in integer **cents**. */
  amountCents: number;
  /** Optional muted sub-line (modifiers / notes). */
  detail?: string;
}

export interface ReceiptTender {
  /** Tender type. */
  method: PaymentMethod;
  /** Amount applied in integer **cents**. */
  amountCents: number;
}

export type ReceiptViewVariant = 'full' | 'compact';

export interface ReceiptViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Merchant / store name shown at the top. */
  merchant?: string;
  /** Address / contact lines under the merchant. */
  addressLines?: string[];
  /** Human order/receipt reference. */
  orderNumber?: string;
  /** Pre-formatted timestamp string. */
  timestamp?: string;
  /** Purchased lines. When empty an {@link EmptyState} renders. */
  items: ReceiptLine[];
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Subtotal in cents. */
  subtotalCents?: number;
  /** Discount in cents (shown negative). */
  discountCents?: number;
  /** Tax in cents. */
  taxCents?: number;
  /** Tip / gratuity in cents. */
  tipCents?: number;
  /** Grand total in cents. */
  totalCents: number;
  /** Tenders applied (cash/card/…); change is derived when they exceed total. */
  tenders?: ReceiptTender[];
  /** Footer note (e.g. "Thank you!"). */
  footer?: string;
  /** Density. `compact` hides the address block and per-line details. */
  variant?: ReceiptViewVariant;
  /** Empty-state copy when there are no items. */
  emptyLabel?: string;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

interface RowProps {
  label: string;
  value: string;
  strong?: boolean;
  tone?: 'muted' | 'success';
}

function Row({ label, value, strong, tone }: RowProps): React.ReactElement {
  return (
    <div className="flex items-baseline justify-between">
      <span className={cn(strong ? 'text-base font-bold text-on-surface' : 'text-sm text-muted')}>
        {label}
      </span>
      <span
        className={cn(
          'tabular-nums',
          strong ? 'text-base font-bold text-on-surface' : 'text-sm',
          tone === 'success' ? 'text-success' : strong ? 'text-on-surface' : 'text-on-surface'
        )}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * A token-styled printed-receipt facsimile — the DOM parity of the native
 * `ReceiptView`. Plain `div`/`span`, no printer and no dependency. Header
 * (merchant + address + order ref), item lines, the subtotal / discount / tax /
 * tip / total ladder, tenders with derived change, and a footer. Money is
 * integer **cents** throughout via `formatMoney`. An empty item list renders a
 * labelled {@link EmptyState}. Token-only colors.
 */
export const ReceiptView = React.forwardRef<HTMLDivElement, ReceiptViewProps>(function ReceiptView(
  {
    merchant,
    addressLines,
    orderNumber,
    timestamp,
    items,
    currency = 'USD',
    subtotalCents,
    discountCents,
    taxCents,
    tipCents,
    totalCents,
    tenders,
    footer,
    variant = 'full',
    emptyLabel = 'No items on this receipt',
    testID,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const rule = <div className="my-[var(--xen-space-sm)] h-px bg-border" />;

  const tendered = (tenders ?? []).reduce((acc, t) => acc + safeCents(t.amountCents), 0);
  const changeDue = tenders && tenders.length > 0 ? tendered - safeCents(totalCents) : 0;

  return (
    <div
      ref={ref}
      data-xen-receipt-view=""
      data-testid={testID}
      className={cn(
        'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex flex-col items-center gap-0.5">
        {merchant ? (
          <span className="text-center text-lg font-bold text-on-surface">{merchant}</span>
        ) : null}
        {!compact && addressLines
          ? addressLines.map((line, i) => (
              <span key={i} className="text-center text-xs text-muted">
                {line}
              </span>
            ))
          : null}
        {orderNumber || timestamp ? (
          <span className="text-center text-xs text-muted">
            {[orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ')}
          </span>
        ) : null}
      </div>

      {rule}

      {items.length === 0 ? (
        <EmptyState title={emptyLabel} />
      ) : (
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {items.map((item, i) => {
            const qty = item.quantity ?? 1;
            return (
              <div key={i} className="flex justify-between gap-[var(--xen-space-md)]">
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-on-surface">
                    {qty > 1 ? `${qty}× ` : ''}
                    {item.name}
                  </span>
                  {!compact && item.detail ? (
                    <span className="block truncate text-xs text-muted">{item.detail}</span>
                  ) : null}
                </div>
                <span className="shrink-0 text-sm tabular-nums text-on-surface">
                  {formatMoney(item.amountCents, currency)}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {rule}

      <div className="flex flex-col gap-[var(--xen-space-xs)]">
        {typeof subtotalCents === 'number' ? (
          <Row label="Subtotal" value={formatMoney(subtotalCents, currency)} />
        ) : null}
        {typeof discountCents === 'number' && discountCents > 0 ? (
          <Row label="Discount" value={`−${formatMoney(discountCents, currency)}`} tone="success" />
        ) : null}
        {typeof taxCents === 'number' ? (
          <Row label="Tax" value={formatMoney(taxCents, currency)} />
        ) : null}
        {typeof tipCents === 'number' && tipCents > 0 ? (
          <Row label="Tip" value={formatMoney(tipCents, currency)} />
        ) : null}
        <Row label="Total" value={formatMoney(totalCents, currency)} strong />
      </div>

      {tenders && tenders.length > 0 ? (
        <>
          {rule}
          <div className="flex flex-col gap-[var(--xen-space-xs)]">
            {tenders.map((t, i) => (
              <div key={i} className="flex items-center justify-between">
                <StatusPill meta={PAYMENT_METHOD_META[t.method]} variant="inline" size="sm" />
                <span className="text-sm tabular-nums text-on-surface">
                  {formatMoney(t.amountCents, currency)}
                </span>
              </div>
            ))}
            {changeDue > 0 ? <Row label="Change" value={formatMoney(changeDue, currency)} /> : null}
          </div>
        </>
      ) : null}

      {footer ? (
        <p className="mt-[var(--xen-space-md)] text-center text-xs text-muted">{footer}</p>
      ) : null}
    </div>
  );
});
