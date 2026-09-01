import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';

export interface PaymentConfirmationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Amount paid, in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Confirmation / receipt number to display. */
  confirmationNumber?: string;
  /** Method the payment was made with (e.g. "Visa •••• 4242"). */
  method?: string;
  /** Localized payment date string. */
  date?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Headline (default "Payment successful"). */
  title?: string;
  /** Fires on the primary "Done" action. */
  onDone?: () => void;
  /** Fires on the "View receipt" action. */
  onViewReceipt?: () => void;
}

/**
 * The payment success surface (web parity) — the module's peak moment and the
 * one full brand-gradient ground beyond the account header. A frosted check
 * badge, the headline, and the paid amount (integer cents via `formatMoney`)
 * sit centered in near-white ink over the gradient; the confirmation #, method,
 * and date read as frosted rows (`bg-primary-500`). "Done" (a near-white
 * `bg-on-primary text-primary` pill) and "View receipt" (a ghost button) each
 * appear only when their handler is set. Every color derives from the brand
 * ramp — token-only, no literals.
 */
export const PaymentConfirmation = React.forwardRef<HTMLDivElement, PaymentConfirmationProps>(
  function PaymentConfirmation(
    {
      amountCents,
      currency = 'USD',
      confirmationNumber,
      method,
      date,
      formatMoney: format = formatMoney,
      title = 'Payment successful',
      onDone,
      onViewReceipt,
      className,
      ...rest
    },
    ref
  ) {
    const amount = Math.max(0, Math.trunc(amountCents || 0));

    const Row = ({ label, value }: { label: string; value: string }) => (
      <div className="flex items-center justify-between gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] bg-primary-500 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
        <span className="text-sm font-semibold text-primary-100">{label}</span>
        <span className="min-w-0 flex-shrink truncate text-right text-sm font-bold text-on-primary">{value}</span>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)] overflow-hidden',
          className
        )}
        {...rest}
      >
        <span
          role="img"
          aria-label={title}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500"
        >
          <Icon glyph="✓" size="2xl" color="onPrimary" />
        </span>

        <p className="mt-[var(--xen-space-md)] text-center text-xl font-extrabold text-on-primary">{title}</p>

        <p
          aria-label={`Paid ${format(amount, currency)}`}
          className="mt-[var(--xen-space-xs)] text-3xl font-extrabold tracking-tight text-on-primary"
        >
          {format(amount, currency)}
        </p>

        {confirmationNumber || method || date ? (
          <div className="mt-[var(--xen-space-lg)] flex w-full flex-col gap-[var(--xen-space-sm)]">
            {confirmationNumber ? <Row label="Confirmation" value={confirmationNumber} /> : null}
            {method ? <Row label="Method" value={method} /> : null}
            {date ? <Row label="Date" value={date} /> : null}
          </div>
        ) : null}

        {onDone || onViewReceipt ? (
          <div className="mt-[var(--xen-space-lg)] flex w-full flex-col gap-[var(--xen-space-sm)]">
            {onDone ? (
              <button
                type="button"
                aria-label="Done"
                onClick={onDone}
                className="flex w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                Done
              </button>
            ) : null}
            {onViewReceipt ? (
              <button
                type="button"
                aria-label="View receipt"
                onClick={onViewReceipt}
                className="flex w-full items-center justify-center rounded-[var(--xen-radius-md)] border border-primary-300 py-[var(--xen-space-md)] text-base font-bold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                View receipt
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
