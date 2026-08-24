import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusBadge, OrderStatus } from './StatusBadge';
import { formatMoney, MoneyFormatter } from './money';

export interface OrderLine {
  /** Product title. */
  title: string;
  /** Chosen variant label. */
  variantTitle?: string;
  /** Quantity ordered. */
  quantity: number;
  /** Unit price in integer cents. */
  unitPriceCents: number;
}

export interface OrderSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Line items in the order. */
  items: OrderLine[];
  /** Sum of line totals, in cents. */
  subtotalCents: number;
  /** Shipping cost in cents ("Free" when 0). */
  shippingCents?: number;
  /** Tax in cents. */
  taxCents?: number;
  /** Grand total in cents. */
  totalCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Order lifecycle status → renders a `StatusBadge`. */
  status?: OrderStatus;
  /** Order reference number/id shown in the header. */
  orderNumber?: string;
  /** Heading text (default `Order summary`). */
  title?: React.ReactNode;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * Read-only recap of a placed (or about-to-be-placed) order: line items with
 * per-line totals, the subtotal/shipping/tax/total rows, and an optional
 * status badge. No interactivity — this is the checkout/confirmation view.
 * Token-only; money is integer cents throughout.
 */
export const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  function OrderSummary(
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
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
          <div className="flex flex-col">
            <h3 className="font-heading text-base font-semibold text-on-surface">{title}</h3>
            {orderNumber ? (
              <span className="text-xs text-muted">#{orderNumber}</span>
            ) : null}
          </div>
          {status ? <StatusBadge status={status} /> : null}
        </div>

        <ul className="flex flex-col divide-y divide-border">
          {items.map((item, i) => (
            <li
              key={i}
              data-xen-order-line=""
              className="flex items-start justify-between gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]"
            >
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm text-on-surface">{item.title}</span>
                {item.variantTitle ? (
                  <span className="truncate text-xs text-muted">{item.variantTitle}</span>
                ) : null}
                <span className="text-xs text-muted">Qty {item.quantity}</span>
              </div>
              <span className="shrink-0 text-sm tabular-nums text-on-surface">
                {format(item.unitPriceCents * item.quantity, currency)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-[var(--xen-space-xs)] border-t border-border pt-[var(--xen-space-sm)]">
          {totalRow('Subtotal', format(subtotalCents, currency), 'subtotal')}
          {typeof shippingCents === 'number'
            ? totalRow(
                'Shipping',
                shippingCents === 0 ? 'Free' : format(shippingCents, currency),
                'shipping'
              )
            : null}
          {typeof taxCents === 'number' ? totalRow('Tax', format(taxCents, currency), 'tax') : null}
          <div className="flex items-baseline justify-between pt-[var(--xen-space-xs)]">
            <span className="font-heading text-base font-semibold text-on-surface">Total</span>
            <span
              data-xen-order-total=""
              className="font-heading text-base font-semibold tabular-nums text-on-surface"
            >
              {format(totalCents, currency)}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export { OrderSummary as CheckoutSummary };
