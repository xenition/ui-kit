import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { formatMoney } from './internal';

/** A single money row in the breakdown — label + integer-cents amount. */
interface BreakdownRow {
  key: string;
  label: string;
  amountCents: number;
  /** Render the amount as a negative (a discount/credit). */
  negative?: boolean;
  /** Calmer, secondary styling (the running sub-lines vs. the total). */
  muted?: boolean;
}

/**
 * Props for {@link CheckoutSummary} — the register's subtotal → total
 * breakdown with a full-width **Charge** CTA. Presentational only: every value
 * is passed in as integer **cents** and the caller owns the charge action.
 */
export interface CheckoutSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pre-tax, pre-tip line-item subtotal, in integer **cents**. */
  subtotalCents: number;
  /** Tax amount, in integer **cents**. Row hidden when omitted. */
  taxCents?: number;
  /** Discount amount, in integer **cents**; shown as a negative credit row. Hidden when omitted or `0`. */
  discountCents?: number;
  /** Tip amount, in integer **cents**. Row hidden when omitted or `0`. */
  tipCents?: number;
  /** The grand total to charge, in integer **cents** — the big bold number. */
  totalCents: number;
  /** ISO 4217 currency code for all amounts. Defaults to `'USD'`. */
  currency?: string;
  /** Item count shown beside the total (e.g. `3 items`). Hidden when omitted. */
  itemCount?: number;
  /** Fired when the Charge button is pressed. */
  onCharge?: () => void;
  /**
   * Charge button label. Receives the formatted total so callers can override
   * the copy; defaults to `Charge {total}` (e.g. `Charge $42.00`).
   */
  chargeLabel?: (formattedTotal: string) => string;
  /** When `true`, the Charge button shows a busy label and is disabled. */
  charging?: boolean;
  /** Optional test id forwarded to the root element. */
  testID?: string;
}

/**
 * CheckoutSummary — **V4** "register" design. The tactile close-of-sale panel:
 * a compact **breakdown list** (subtotal, optional discount/tax/tip) in calm
 * `tabular-nums`, a hairline, then the **grand total big and bold** — the
 * number the counter is built around. A full-width primary **Charge** button
 * (≥44px) repeats the total so the tap target reads the amount. Money is
 * integer **cents** throughout via `formatMoney`; all colors come from
 * `--xen-*` token classes (no literals), dark-mode safe.
 */
export const CheckoutSummary = React.forwardRef<HTMLDivElement, CheckoutSummaryProps>(
  function CheckoutSummary(
    {
      subtotalCents,
      taxCents,
      discountCents,
      tipCents,
      totalCents,
      currency = 'USD',
      itemCount,
      onCharge,
      chargeLabel,
      charging = false,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const rows: BreakdownRow[] = [
      { key: 'subtotal', label: 'Subtotal', amountCents: subtotalCents, muted: true },
    ];
    if (typeof discountCents === 'number' && discountCents > 0) {
      rows.push({ key: 'discount', label: 'Discount', amountCents: discountCents, negative: true, muted: true });
    }
    if (typeof taxCents === 'number') {
      rows.push({ key: 'tax', label: 'Tax', amountCents: taxCents, muted: true });
    }
    if (typeof tipCents === 'number' && tipCents > 0) {
      rows.push({ key: 'tip', label: 'Tip', amountCents: tipCents, muted: true });
    }

    const formattedTotal = formatMoney(totalCents, currency);
    const label = chargeLabel ? chargeLabel(formattedTotal) : `Charge ${formattedTotal}`;

    return (
      <div
        ref={ref}
        data-xen-checkout-summary=""
        data-testid={testID}
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)]',
          'border border-border bg-surface p-[var(--xen-space-lg)] shadow-sm',
          className
        )}
        {...rest}
      >
        <ul className="flex flex-col gap-[var(--xen-space-xs)]" aria-label="Order breakdown">
          {rows.map((row) => (
            <li key={row.key} className="flex items-baseline justify-between">
              <span className="text-sm text-muted">{row.label}</span>
              <span
                className={cn(
                  'text-sm tabular-nums',
                  row.negative ? 'text-success' : 'text-on-surface'
                )}
              >
                {row.negative ? '−' : ''}
                {formatMoney(row.amountCents, currency)}
              </span>
            </li>
          ))}
        </ul>

        {/* hairline before the big bold total */}
        <div className="h-px bg-border" />

        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="text-base font-extrabold uppercase tracking-wide text-on-surface">
              Total
            </span>
            {typeof itemCount === 'number' ? (
              <span className="text-xs font-medium text-muted">
                {itemCount} item{itemCount === 1 ? '' : 's'}
              </span>
            ) : null}
          </div>
          <span className="text-3xl font-extrabold tabular-nums text-on-surface">
            {formattedTotal}
          </span>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onCharge}
          disabled={charging}
          aria-label={label}
          className="min-h-[44px] w-full text-base font-extrabold tabular-nums"
        >
          {charging ? 'Charging…' : label}
        </Button>
      </div>
    );
  }
);
