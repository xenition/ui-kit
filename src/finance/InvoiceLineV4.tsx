import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce/money';
import { lineTotal, TABULAR_CLASS } from './internal/ledger-v4';
import { MoneyAmountV4 } from './MoneyAmountV4';
import type { InvoiceLineProps } from './InvoiceLine';

/** The V4 line takes exactly the base's props. */
export interface InvoiceLineV4Props extends InvoiceLineProps {}

/**
 * **V4 invoice line** — the web twin of the native `InvoiceLineV4`, same props
 * as {@link InvoiceLine}.
 *
 * ## Three changes
 *
 * 1. **A fractional line stops under-reporting.** The total was
 *    `Math.trunc(unitPriceCents) * quantity` — the unit price truncated and
 *    the quantity left alone — so `333 × 3.5` produced `1165.5`, a non-integer
 *    cents value that `MoneyAmount` then floored to **$11.65**, one cent under,
 *    while the breakdown line directly above it honestly printed "3.5 ×
 *    $3.33". The line disagreed with itself on screen. `lineTotal()` rounds
 *    the product once, in cents.
 * 2. **`emphasized` changes something.** It passed `className="font-bold"` to
 *    a `MoneyAmount` that is already `font-bold`, and `cn()` is a plain joiner
 *    — so the grand-total row was indistinguishable from the lines above it
 *    except for one type step. The total row now takes a rule above it and a
 *    bolder description, which is what a total looks like.
 * 3. **The quantity goes through `Intl`, and the caption is legible.** `3.5`
 *    was interpolated straight into the string, so its decimal mark was hard
 *    locked to `.` while the price beside it used the locale's; and the
 *    caption was inked with `muted`, a ramp step with no contrast promise.
 */
export const InvoiceLineV4 = React.forwardRef<HTMLDivElement, InvoiceLineV4Props>(
  function InvoiceLineV4(
    {
      description,
      unitPriceCents,
      quantity = 1,
      currency = 'USD',
      amountCents,
      emphasized = false,
      className,
      ...rest
    },
    ref
  ) {
    const qty = Number.isFinite(quantity) ? quantity : 1;
    const total =
      typeof amountCents === 'number' && Number.isFinite(amountCents)
        ? Math.trunc(amountCents)
        : lineTotal(unitPriceCents, qty);
    const showBreakdown = !emphasized && qty !== 1;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-md py-sm',
          // A total sits under a rule. `border-t` is a hairline, which is the
          // one thing the border token is for.
          emphasized && 'border-t border-border pt-md',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <p className={cn('text-sm text-on-surface', emphasized ? 'font-bold' : 'font-medium')}>
            {description}
          </p>
          {showBreakdown ? (
            <p className={cn('text-xs text-muted-text', TABULAR_CLASS)}>
              {`${new Intl.NumberFormat().format(qty)} × ${formatMoney(
                Number.isFinite(unitPriceCents) ? Math.trunc(unitPriceCents) : 0,
                currency
              )}`}
            </p>
          ) : null}
        </div>
        <MoneyAmountV4
          cents={total}
          currency={currency}
          tone="neutral"
          size={emphasized ? 'md' : 'sm'}
        />
      </div>
    );
  }
);
