import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatMoney } from './internal';

export interface PaymentSuccessProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Amount charged, in integer **cents** — the big near-white numeral. */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Tender label, e.g. `"Visa ···4242"` — shown as a frosted tile when set. */
  method?: string;
  /** Change owed back to the customer (cash sales), in integer **cents**. Shown as a frosted tile when `> 0`. */
  changeDueCents?: number;
  /** Headline over the celebration (default `"Payment complete"`). */
  title?: string;
  /** Fires on the primary "Print receipt" action. Shown only when set. */
  onReceipt?: () => void;
  /** Fires on the "Email receipt" action. Shown only when set. */
  onEmailReceipt?: () => void;
  /** Fires on the "New sale" action — the path back to the register. Shown only when set. */
  onNewSale?: () => void;
}

/**
 * PaymentSuccess — the POS V4 "register" **peak-end** (web parity of the native
 * twin): the payment-complete celebration. A two-hue celebratory gradient
 * (`from-accent-400 to-primary-600`) carries a big frosted ✓ glyph, the headline,
 * and the **big near-white amount** (integer cents via `formatMoney`). The tender
 * `method` and any cash `changeDueCents` read as frosted glass tiles
 * (`bg-primary-50/15 border-primary-50/30`); "Print receipt" / "Email receipt"
 * and "New sale" appear only when their handler is set. Every color derives from
 * the brand ramp via `--xen-*` classes + gradient utilities — no literals, light
 * + dark safe.
 */
export const PaymentSuccess = React.forwardRef<HTMLDivElement, PaymentSuccessProps>(function PaymentSuccess(
  {
    amountCents,
    currency = 'USD',
    method,
    changeDueCents,
    title = 'Payment complete',
    onReceipt,
    onEmailReceipt,
    onNewSale,
    className,
    ...rest
  },
  ref
) {
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const change = Math.max(0, Math.trunc(changeDueCents || 0));

  const Tile = ({ label, value }: { label: string; value: string }) => (
    <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
      <span className="text-sm font-semibold text-primary-100">{label}</span>
      <span className="truncate text-base font-extrabold text-primary-50">{value}</span>
    </div>
  );

  return (
    <div
      ref={ref}
      data-xen-payment-success=""
      className={cn(
        'flex flex-col items-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-xl)]',
        className
      )}
      {...rest}
    >
      <span
        role="img"
        aria-label={title}
        className="flex h-16 w-16 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/20"
      >
        <Icon glyph="✓" size="2xl" className="text-primary-50" />
      </span>

      <p className="mt-[var(--xen-space-md)] text-center text-xl font-extrabold text-primary-50">{title}</p>

      <p
        aria-label={`Charged ${formatMoney(amount, currency)}`}
        className="mt-[var(--xen-space-xs)] text-4xl font-extrabold tabular-nums tracking-tight text-primary-50"
      >
        {formatMoney(amount, currency)}
      </p>

      {method || change > 0 ? (
        <div className="mt-[var(--xen-space-lg)] flex w-full gap-[var(--xen-space-sm)]">
          {method ? <Tile label="Method" value={method} /> : null}
          {change > 0 ? <Tile label="Change due" value={formatMoney(change, currency)} /> : null}
        </div>
      ) : null}

      {onReceipt || onEmailReceipt || onNewSale ? (
        <div className="mt-[var(--xen-space-lg)] flex w-full flex-col gap-[var(--xen-space-sm)]">
          {onReceipt ? (
            <button
              type="button"
              aria-label="Print receipt"
              onClick={onReceipt}
              className="flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50 py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              Print receipt
            </button>
          ) : null}
          {onEmailReceipt ? (
            <button
              type="button"
              aria-label="Email receipt"
              onClick={onEmailReceipt}
              className="flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 py-[var(--xen-space-md)] text-base font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              Email receipt
            </button>
          ) : null}
          {onNewSale ? (
            <button
              type="button"
              aria-label="New sale"
              onClick={onNewSale}
              className="flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] py-[var(--xen-space-md)] text-base font-bold text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              New sale
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
