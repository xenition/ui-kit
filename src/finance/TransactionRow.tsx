import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import { MoneyAmount } from './MoneyAmount';
import { pressableProps } from './internal/pressable';

/** Credit (money in) vs debit (money out). */
export type TransactionDirection = 'income' | 'expense';

export interface TransactionRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Merchant / counterparty / description. */
  title: string;
  /** Secondary line (category, account, memo). */
  subtitle?: string;
  /** Transaction amount in integer **cents** (magnitude; sign taken from `direction`). */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /**
   * Income tints the amount `success` and prefixes `+`; expense tints it
   * `danger` and prefixes `−`. Omit to let the sign of `amountCents` drive tone.
   */
  direction?: TransactionDirection;
  /** Right-aligned timestamp string (already localized by the caller). */
  date?: string;
  /** Leading glyph/emoji for the category avatar (e.g. `'☕'`, `'🛒'`). */
  icon?: string;
  /** Token color slot for the avatar disc glyph (default `primary`). */
  iconColor?: IconColor;
  /** Fires on row click — makes the row a keyboard-operable button. */
  onClick?: () => void;
}

/**
 * One line in a transaction feed: a tinted category avatar, a title/subtitle
 * stack, and a right-aligned {@link MoneyAmount} over an optional date. The
 * amount tone follows `direction` (income = `text-success`, expense =
 * `text-danger`) and the magnitude is integer cents — no float drift. Fully
 * token-bound; becomes a button only when `onClick` is supplied. Web parity of
 * the native `TransactionRow`.
 */
export const TransactionRow = React.forwardRef<HTMLDivElement, TransactionRowProps>(
  function TransactionRow(
    { title, subtitle, amountCents, currency = 'USD', direction, date, icon, iconColor = 'primary', onClick, className, ...rest },
    ref
  ) {
    const signedCents = direction
      ? direction === 'expense'
        ? -Math.abs(amountCents)
        : Math.abs(amountCents)
      : amountCents;
    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? title : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        {icon != null ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-full)] border border-border bg-surface">
            <Icon glyph={icon} color={iconColor} size="lg" />
          </span>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-semibold text-on-surface">{title}</span>
          {subtitle != null ? <span className="truncate text-sm text-muted">{subtitle}</span> : null}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <MoneyAmount
            cents={signedCents}
            currency={currency}
            tone={direction ?? 'auto'}
            size="md"
            signDisplay="always"
          />
          {date != null ? <span className="text-xs text-muted">{date}</span> : null}
        </div>
      </div>
    );
  }
);
