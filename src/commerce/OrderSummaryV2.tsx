import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusBadge } from './StatusBadge';
import { formatMoney } from './money';
import type { OrderSummaryProps } from './OrderSummary';

/** Drop-in alternate of {@link OrderSummaryProps} — identical prop contract. */
export type OrderSummaryV2Props = OrderSummaryProps;

/**
 * OrderSummary — design variant **V2**: an **elevated receipt**. Where the base
 * is a flat bordered recap, V2 floats on a shadow, prefixes each line with a
 * neutral **`×qty` chip**, separates items from totals with a **dashed
 * perforation**, and drops the grand total into a primary-tinted band. Same
 * props as {@link OrderSummaryProps}. Read-only; token-only; integer cents.
 */
export const OrderSummaryV2 = React.forwardRef<HTMLDivElement, OrderSummaryV2Props>(
  function OrderSummaryV2(
    {
      items,
      subtotalCents,
      shippingCents,
      taxCents,
      totalCents,
      currency = 'USD',
      status,
      orderNumber,
      title = 'Order summary',
      formatMoney: format = formatMoney,
      className,
      ...rest
    },
    ref
  ) {
    const totalRow = (label: string, value: React.ReactNode, key: string): React.ReactElement => (
      <div key={key} className="flex items-baseline justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="tabular-nums text-on-surface">{value}</span>
      </div>
    );

    return (
      <div
        ref={ref}
        data-xen-order-summary=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-lg',
          className
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
          <div className="flex min-w-0 flex-col">
            <h3 className="font-heading text-lg font-bold text-on-surface">{title}</h3>
            {orderNumber ? <span className="text-xs text-muted">#{orderNumber}</span> : null}
          </div>
          {status ? <StatusBadge status={status} /> : null}
        </div>

        <ul className="flex flex-col gap-[var(--xen-space-sm)]">
          {items.map((item, i) => (
            <li
              key={i}
              data-xen-order-line=""
              className="flex items-start gap-[var(--xen-space-sm)]"
            >
              <span className="shrink-0 rounded-[var(--xen-radius-sm)] bg-neutral-100 px-[var(--xen-space-xs)] py-0.5 text-xs font-semibold tabular-nums text-muted">
                ×{item.quantity}
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm text-on-surface">{item.title}</span>
                {item.variantTitle ? (
                  <span className="truncate text-xs text-muted">{item.variantTitle}</span>
                ) : null}
              </div>
              <span className="shrink-0 text-sm tabular-nums text-on-surface">
                {format(item.unitPriceCents * item.quantity, currency)}
              </span>
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="border-t border-dashed border-border"
        />

        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {totalRow('Subtotal', format(subtotalCents, currency), 'subtotal')}
          {typeof shippingCents === 'number'
            ? totalRow(
                'Shipping',
                shippingCents === 0 ? 'Free' : format(shippingCents, currency),
                'shipping'
              )
            : null}
          {typeof taxCents === 'number' ? totalRow('Tax', format(taxCents, currency), 'tax') : null}
        </div>

        <div className="flex items-center justify-between rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
          <span className="font-heading text-base font-semibold text-on-surface">Total</span>
          <span
            data-xen-order-total=""
            className="font-heading text-lg font-bold tabular-nums text-primary"
          >
            {format(totalCents, currency)}
          </span>
        </div>
      </div>
    );
  }
);

export { OrderSummaryV2 as CheckoutSummaryV2 };
