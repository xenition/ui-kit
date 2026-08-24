import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { formatMoney } from './money';
import type { CartSummaryProps } from './CartSummary';

/** Drop-in alternate of {@link CartSummaryProps} — identical prop contract. */
export type CartSummaryV2Props = CartSummaryProps;

/**
 * CartSummary — design variant **V2**: an **elevated receipt** with a
 * highlighted total band. Where the base is a flat bordered list, V2 floats on a
 * drop-shadow, separates the running lines from the total with a **dashed
 * perforation**, and drops the grand total into a primary-tinted band so the
 * amount owed is unmistakable. Same props as {@link CartSummaryProps}.
 * Token-only; money is integer cents.
 */
export const CartSummaryV2 = React.forwardRef<HTMLDivElement, CartSummaryV2Props>(
  function CartSummaryV2(
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
          'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-lg',
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

        <div
          aria-hidden="true"
          className="my-[var(--xen-space-xs)] border-t border-dashed border-border"
        />

        <div className="flex items-center justify-between rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
          <span className="font-heading text-base font-semibold text-on-surface">Total</span>
          <span
            data-xen-cart-total=""
            className="font-heading text-lg font-bold tabular-nums text-primary"
          >
            {format(totalCents, currency)}
          </span>
        </div>

        {onCheckout ? (
          <Button type="button" size="md" onClick={onCheckout} className="mt-[var(--xen-space-xs)] w-full">
            {checkoutLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
