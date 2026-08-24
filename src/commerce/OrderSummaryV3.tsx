import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusBadge } from './StatusBadge';
import { formatMoney } from './money';
import type { OrderSummaryProps } from './OrderSummary';

/** Drop-in alternate of {@link OrderSummaryProps} — identical prop contract. */
export type OrderSummaryV3Props = OrderSummaryProps;

/**
 * OrderSummary — design variant **V3**: **minimal and total-first**. Where the
 * base and V2 lead with a header and itemized rows, V3 opens with the grand
 * total set large (status badge + order number tucked alongside as metadata),
 * then lists the line items and subtotal/shipping/tax beneath as muted fine
 * print. No box, no shadow. Same props as {@link OrderSummaryProps}. Read-only;
 * token-only; integer cents.
 */
export const OrderSummaryV3 = React.forwardRef<HTMLDivElement, OrderSummaryV3Props>(
  function OrderSummaryV3(
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
    const line = (label: string, value: React.ReactNode, key: string): React.ReactElement => (
      <div key={key} className="flex items-baseline justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
    );

    return (
      <div
        ref={ref}
        data-xen-order-summary=""
        className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
        {...rest}
      >
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {status || orderNumber ? (
            <div className="flex items-center gap-[var(--xen-space-sm)]">
              {status ? <StatusBadge status={status} /> : null}
              {orderNumber ? <span className="text-xs text-muted">#{orderNumber}</span> : null}
            </div>
          ) : null}
          <span
            data-xen-order-total=""
            className="font-heading text-3xl font-bold tabular-nums text-on-surface"
          >
            {format(totalCents, currency)}
          </span>
          {typeof title === 'string' ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {title}
            </span>
          ) : (
            title
          )}
        </div>

        <ul className="flex flex-col gap-[var(--xen-space-xs)]">
          {items.map((item, i) => (
            <li
              key={i}
              data-xen-order-line=""
              className="flex items-baseline justify-between gap-[var(--xen-space-sm)] text-xs text-muted"
            >
              <span className="min-w-0 flex-1 truncate">
                {item.title}
                {item.variantTitle ? ` · ${item.variantTitle}` : ''} ×{item.quantity}
              </span>
              <span className="shrink-0 tabular-nums">
                {format(item.unitPriceCents * item.quantity, currency)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-[var(--xen-space-xs)] border-t border-border pt-[var(--xen-space-sm)]">
          {line('Subtotal', format(subtotalCents, currency), 'subtotal')}
          {typeof shippingCents === 'number'
            ? line(
                'Shipping',
                shippingCents === 0 ? 'Free' : format(shippingCents, currency),
                'shipping'
              )
            : null}
          {typeof taxCents === 'number' ? line('Tax', format(taxCents, currency), 'tax') : null}
        </div>
      </div>
    );
  }
);

export { OrderSummaryV3 as CheckoutSummaryV3 };
