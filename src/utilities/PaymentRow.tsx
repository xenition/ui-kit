import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import { formatMoney, type MoneyFormatter, DISC_TINT, tintSlot } from './internal/format';
import { paymentState, type PaymentState } from './internal/status';

export type { PaymentState };

export interface PaymentRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Amount of the payment in integer **cents**. */
  amountCents: number;
  /** Localized date string (already formatted by the caller). */
  date: string;
  /** Settlement state — conveyed by text + glyph + color. */
  status: PaymentState;
  /** Payment method label (e.g. "Visa ···4242", "Bank ···1881"). */
  method?: string;
  /** Reference / confirmation number. */
  reference?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on row click (e.g. open receipt); becomes a button when supplied. */
  onClick?: () => void;
}

/**
 * One line in a payment history: a tinted state glyph disc, a method/date stack,
 * a right-aligned amount, and a status pill. The state is conveyed redundantly
 * (glyph + label + a color that traces to a semantic token: paid → success,
 * failed → danger) so it is never color-alone. A refunded/failed amount is shown
 * muted with a strike so it reads as non-current at a glance. Amount is integer
 * cents via `formatMoney`. Becomes a `role="button"` row only when `onClick` is
 * supplied. Web parity of the native `PaymentRow`.
 */
export const PaymentRow = React.forwardRef<HTMLDivElement, PaymentRowProps>(function PaymentRow(
  {
    amountCents,
    date,
    status,
    method,
    reference,
    currency = 'USD',
    formatMoney: format = formatMoney,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const sd = paymentState(status);
  const slot = tintSlot(sd.tone);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const voided = status === 'failed' || status === 'refunded';
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': `Payment ${format(amount, currency)}, ${date}, ${sd.label}`,
            onClick,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
      {...rest}
    >
      <span
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full',
          DISC_TINT[slot]
        )}
      >
        <Icon glyph={sd.glyph} aria-label={sd.label} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">{method ?? 'Payment'}</span>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span className="text-xs text-muted">{date}</span>
          <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span
          className={cn(
            'text-base font-bold',
            voided ? 'text-muted line-through' : 'text-on-surface'
          )}
        >
          {format(amount, currency)}
        </span>
        {reference != null ? <span className="truncate text-xs text-muted">{reference}</span> : null}
      </div>
    </div>
  );
});
