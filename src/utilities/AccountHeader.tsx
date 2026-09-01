import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, type MoneyFormatter } from './internal/format';

export interface AccountHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Account holder or provider name. */
  accountName: string;
  /** Service address / account number line. */
  address?: string;
  /** Current balance owed, in integer **cents** (`<= 0` → all paid up). */
  balanceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Localized next-due date string. */
  dueDate?: string;
  /** Show an "AutoPay on" chip. */
  autoPay?: boolean;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Pay button label (default "Pay bill"). Hidden when no `onPay` or nothing due. */
  payLabel?: string;
  /** Fires on the pay action. */
  onPay?: () => void;
  /** Fires when the profile avatar is tapped. */
  onProfile?: () => void;
  /** Avatar glyph for the profile button. Default `'👤'`. */
  avatarGlyph?: string;
}

/**
 * The account home header (web parity): a calm brand-gradient panel with the
 * account name, the current balance (integer cents via `formatMoney`), the next
 * due date + an optional AutoPay chip, and a pay CTA. When the balance is `<= 0`
 * it flips to an "all paid up" state. Near-white ink (`text-on-primary` /
 * `text-primary-100`) and the gradient both derive from the brand ramp; the
 * frosted chips are `bg-primary-500` and the pay pill is near-white
 * (`bg-on-primary text-primary`). Token-only colors — the one vivid surface on
 * an otherwise clean, trust-first screen.
 */
export const AccountHeader = React.forwardRef<HTMLDivElement, AccountHeaderProps>(function AccountHeader(
  {
    accountName,
    address,
    balanceCents,
    currency = 'USD',
    dueDate,
    autoPay = false,
    formatMoney: format = formatMoney,
    payLabel = 'Pay bill',
    onPay,
    onProfile,
    avatarGlyph = '👤',
    className,
    ...rest
  },
  ref
) {
  const owed = Math.max(0, Math.trunc(balanceCents || 0));
  const settled = owed <= 0;

  const Chip = ({ glyph, text }: { glyph: string; text: string }) => (
    <span className="inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-500 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]">
      <span aria-hidden="true" className="text-sm">
        {glyph}
      </span>
      <span className="text-sm font-semibold text-on-primary">{text}</span>
    </span>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-extrabold text-on-primary">{accountName}</p>
          {address ? <p className="mt-0.5 truncate text-sm text-primary-100">{address}</p> : null}
        </div>

        {onProfile ? (
          <button
            type="button"
            aria-label="Open profile"
            onClick={onProfile}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <span aria-hidden="true">{avatarGlyph}</span>
          </button>
        ) : null}
      </div>

      <div className="mt-[var(--xen-space-lg)] flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-primary-100">
          {settled ? 'Balance' : 'Current balance'}
        </span>
        <span className="text-4xl font-extrabold tracking-tight text-on-primary">
          {settled ? format(0, currency) : format(owed, currency)}
        </span>
      </div>

      {settled || dueDate || autoPay ? (
        <div className="mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-sm)]">
          {settled ? (
            <Chip glyph="✓" text="All paid up" />
          ) : dueDate ? (
            <Chip glyph="🗓️" text={`Due ${dueDate}`} />
          ) : null}
          {autoPay ? <Chip glyph="🔁" text="AutoPay on" /> : null}
        </div>
      ) : null}

      {onPay && !settled ? (
        <button
          type="button"
          aria-label={`${payLabel}, ${format(owed, currency)}`}
          onClick={onPay}
          className="mt-[var(--xen-space-lg)] flex w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          {`${payLabel} · ${format(owed, currency)}`}
        </button>
      ) : null}
    </div>
  );
});
