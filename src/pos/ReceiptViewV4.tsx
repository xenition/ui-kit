import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import { formatMoney, safeCents, PAYMENT_METHOD_META } from './internal';
import type { ReceiptViewProps } from './ReceiptView';

/** Drop-in for {@link ReceiptViewProps} — same props, the V4 "register" design. */
export type ReceiptViewV4Props = ReceiptViewProps;

interface RowProps {
  label: string;
  value: string;
  tone?: 'muted' | 'success';
}

function Row({ label, value, tone }: RowProps): React.ReactElement {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-muted">{label}</span>
      <span
        className={cn('text-sm tabular-nums', tone === 'success' ? 'text-success' : 'text-on-surface')}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * ReceiptView — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a printed receipt: a monospace-feel item list, a clean
 * subtotal / discount / tax / tip block, and — after a **dashed tear line** — the
 * **grand total big and bold** in `tabular-nums` (the number that closes the
 * sale). Header (merchant + address + order ref), tenders with derived change,
 * and a footer are preserved. Money is integer **cents** throughout via
 * `formatMoney`. An empty item list renders a labelled {@link EmptyState}. Same
 * props/behavior as {@link ReceiptViewProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export const ReceiptViewV4 = React.forwardRef<HTMLDivElement, ReceiptViewV4Props>(
  function ReceiptViewV4(
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
          'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] font-mono',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col items-center gap-0.5">
          {merchant ? (
            <span className="text-center text-lg font-extrabold uppercase tracking-wide text-on-surface">
              {merchant}
            </span>
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
        </div>

        {/* dashed tear line above the grand total */}
        <div className="my-[var(--xen-space-md)] border-t-2 border-dashed border-border" />

        <div className="flex items-baseline justify-between">
          <span className="text-base font-extrabold uppercase tracking-wide text-on-surface">
            Total
          </span>
          <span className="text-2xl font-extrabold tabular-nums text-on-surface">
            {formatMoney(totalCents, currency)}
          </span>
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
              {changeDue > 0 ? (
                <Row label="Change" value={formatMoney(changeDue, currency)} />
              ) : null}
            </div>
          </>
        ) : null}

        {footer ? (
          <p className="mt-[var(--xen-space-md)] text-center text-xs text-muted">{footer}</p>
        ) : null}
      </div>
    );
  }
);
