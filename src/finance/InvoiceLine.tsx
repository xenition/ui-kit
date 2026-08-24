import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce/money';
import { MoneyAmount } from './MoneyAmount';

export interface InvoiceLineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Line description (product / service). */
  description: string;
  /** Unit price in integer **cents**. */
  unitPriceCents: number;
  /** Quantity (default `1`). */
  quantity?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /**
   * Line total in **cents**. When omitted it is computed as
   * `unitPriceCents × quantity` — integer math, so no float drift.
   */
  amountCents?: number;
  /** Render as the emphasized total row (heavier weight, no unit breakdown). */
  emphasized?: boolean;
}

/**
 * One invoice / receipt line: a description with a `qty × unit` sub-line and a
 * right-aligned line total. The total defaults to `unitPriceCents * quantity`
 * (integer cents — exact), rendered neutral-toned through {@link MoneyAmount}.
 * `emphasized` styles it as the grand-total row. Token-bound throughout. Web
 * parity of the native `InvoiceLine`.
 */
export const InvoiceLine = React.forwardRef<HTMLDivElement, InvoiceLineProps>(function InvoiceLine(
  { description, unitPriceCents, quantity = 1, currency = 'USD', amountCents, emphasized = false, className, ...rest },
  ref
) {
  const qty = Number.isFinite(quantity) ? quantity : 1;
  const total = typeof amountCents === 'number' ? amountCents : Math.trunc(unitPriceCents) * qty;
  const showBreakdown = !emphasized && qty !== 1;

  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className={cn('text-sm text-on-surface', emphasized ? 'font-bold' : 'font-medium')}>
          {description}
        </p>
        {showBreakdown ? (
          <p className="text-xs text-muted">
            {qty} × {formatMoney(Number.isFinite(unitPriceCents) ? Math.trunc(unitPriceCents) : 0, currency)}
          </p>
        ) : null}
      </div>
      <MoneyAmount
        cents={total}
        currency={currency}
        tone="neutral"
        size={emphasized ? 'md' : 'sm'}
        className={emphasized ? 'font-bold' : undefined}
      />
    </div>
  );
});
