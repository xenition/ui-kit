import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon, type IconColor } from '../primitives/Icon';
import { MoneyAmount } from './MoneyAmount';
import { maskAccountNumber } from './internal/mask';
import { pressableProps } from './internal/pressable';

/** The kind of account a card represents. */
export type AccountVariant = 'checking' | 'savings' | 'credit';

export interface AccountCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Account display name (e.g. "Everyday Checking"). */
  name: string;
  /** Account kind — drives the accent border/glyph and default label. */
  variant: AccountVariant;
  /** Current balance in integer **cents** (may be negative for credit). */
  balanceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Full or partial account/card number; shown masked to the last four. */
  accountNumber?: string;
  /** Override the leading glyph (defaults per variant). */
  icon?: string;
  /** Fires on card click — makes the card a keyboard-operable button. */
  onClick?: () => void;
}

const VARIANT_META: Record<
  AccountVariant,
  { border: string; icon: IconColor; glyph: string; label: string }
> = {
  checking: { border: 'border-primary', icon: 'primary', glyph: '🏦', label: 'Checking' },
  savings: { border: 'border-success', icon: 'success', glyph: '🐖', label: 'Savings' },
  // `Icon` has no `accent` slot, so the accent tint rides the disc border while
  // the glyph falls back to `primary` — still fully token-bound.
  credit: { border: 'border-accent', icon: 'primary', glyph: '💳', label: 'Credit' },
};

/**
 * A single account tile: a tinted variant glyph + name/type header over the
 * balance. `variant` selects the accent border token (`checking` → primary,
 * `savings` → success, `credit` → accent) and a default glyph; the balance is
 * integer cents rendered through {@link MoneyAmount} (neutral tone, so a
 * positive balance is not colored "income" green). Token-bound throughout. Web
 * parity of the native `AccountCard`.
 */
export const AccountCard = React.forwardRef<HTMLDivElement, AccountCardProps>(function AccountCard(
  { name, variant, balanceCents, currency = 'USD', accountNumber, icon, onClick, className, ...rest },
  ref
) {
  const meta = VARIANT_META[variant];
  const interactive = pressableProps(onClick);

  return (
    <Card
      ref={ref}
      aria-label={interactive ? `${name}, ${meta.label} account` : undefined}
      className={cn(
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-md)] border bg-surface',
            meta.border
          )}
        >
          <Icon glyph={icon ?? meta.glyph} color={meta.icon} size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{name}</p>
          <p className="text-xs text-muted">
            {accountNumber != null ? maskAccountNumber(accountNumber) : meta.label}
          </p>
        </div>
      </div>
      <div className="mt-[var(--xen-space-md)] flex flex-col gap-0.5">
        <span className="text-xs text-muted">Balance</span>
        <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="lg" />
      </div>
    </Card>
  );
});
