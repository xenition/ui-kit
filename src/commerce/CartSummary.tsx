import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { formatMoney, MoneyFormatter } from './money';

export interface CartSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sum of line totals, in integer cents. */
  subtotalCents: number;
  /** Shipping cost in cents. Rendered as "Free" when exactly 0. */
  shippingCents?: number;
  /** Tax in cents. */
  taxCents?: number;
  /** Discount in cents (shown negative). */
  discountCents?: number;
  /** Grand total in cents. */
  totalCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Checkout handler; renders a checkout button when provided. */
  onCheckout?: () => void;
  /** Checkout button label (default `Checkout`). */
  checkoutLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * Cart totals block: subtotal / shipping / tax / (discount) / total rows plus
 * an optional checkout button. Every amount is integer cents formatted through
 * {@link formatMoney}. Token-only.
 */
export const CartSummary = React.forwardRef<HTMLDivElement, CartSummaryProps>(
  function CartSummary(
    {
      subtotalCents,
      shippingCents,
      taxCents,
      discountCents,
      totalCents,
      currency = 'USD',
      onCheckout,
      checkoutLabel = 'Checkout',
      formatMoney: format = formatMoney,
      className,
      ...rest
    },
    ref
  ) {
    const row = (label: string, value: React.ReactNode, key: string): React.ReactElement => (
      <div key={key} className="flex items-baseline justify-between text-sm text-on-surface">
        <span className="text-muted">{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
    );

    return (
      <div
        ref={ref}
        data-xen-cart-summary=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        {row('Subtotal', format(subtotalCents, currency), 'subtotal')}
        {typeof shippingCents === 'number'
          ? row(
              'Shipping',
              shippingCents === 0 ? 'Free' : format(shippingCents, currency),
              'shipping'
            )
          : null}
        {typeof taxCents === 'number' ? row('Tax', format(taxCents, currency), 'tax') : null}
        {typeof discountCents === 'number' && discountCents > 0
          ? row('Discount', `−${format(discountCents, currency)}`, 'discount')
          : null}
        <div className="mt-[var(--xen-space-xs)] border-t border-border pt-[var(--xen-space-sm)]">
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-base font-semibold text-on-surface">Total</span>
            <span
              data-xen-cart-total=""
              className="font-heading text-base font-semibold tabular-nums text-on-surface"
            >
              {format(totalCents, currency)}
            </span>
          </div>
        </div>
        {onCheckout ? (
          <Button type="button" size="md" onClick={onCheckout} className="mt-[var(--xen-space-sm)] w-full">
            {checkoutLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
