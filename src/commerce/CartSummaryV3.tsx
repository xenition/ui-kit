import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { formatMoney } from './money';
import type { CartSummaryProps } from './CartSummary';

/** Drop-in alternate of {@link CartSummaryProps} — identical prop contract. */
export type CartSummaryV3Props = CartSummaryProps;

/**
 * CartSummary — design variant **V3**: **minimal and total-first**. Where the
 * base and V2 build up subtotal → … → total, V3 leads with the grand total set
 * large under a small tracked caption, then lists the muted breakdown lines
 * beneath it as fine print. No box, no shadow — just type hierarchy and a
 * full-width checkout. Same props as {@link CartSummaryProps}. Token-only;
 * money is integer cents.
 */
export const CartSummaryV3 = React.forwardRef<HTMLDivElement, CartSummaryV3Props>(
  function CartSummaryV3(
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
    const line = (label: string, value: React.ReactNode, key: string): React.ReactElement => (
      <div key={key} className="flex items-baseline justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
    );

    return (
      <div
        ref={ref}
        data-xen-cart-summary=""
        className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
        {...rest}
      >
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Total</span>
          <span
            data-xen-cart-total=""
            className="font-heading text-3xl font-bold tabular-nums text-on-surface"
          >
            {format(totalCents, currency)}
          </span>
        </div>

        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {line('Subtotal', format(subtotalCents, currency), 'subtotal')}
          {typeof shippingCents === 'number'
            ? line(
                'Shipping',
                shippingCents === 0 ? 'Free' : format(shippingCents, currency),
                'shipping'
              )
            : null}
          {typeof taxCents === 'number' ? line('Tax', format(taxCents, currency), 'tax') : null}
          {typeof discountCents === 'number' && discountCents > 0
            ? line('Discount', `−${format(discountCents, currency)}`, 'discount')
            : null}
        </div>

        {onCheckout ? (
          <Button type="button" size="lg" onClick={onCheckout} className="w-full">
            {checkoutLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
