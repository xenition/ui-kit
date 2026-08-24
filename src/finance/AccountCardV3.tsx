import * as React from 'react';
import { cn } from '../primitives/cn';
import { MoneyAmount } from './MoneyAmount';
import { maskAccountNumber } from './internal/mask';
import { pressableProps } from './internal/pressable';
import type { AccountCardProps, AccountVariant } from './AccountCard';

/** Same public contract as {@link AccountCard} — a drop-in alternate design. */
export type AccountCardV3Props = AccountCardProps;

const VARIANT_META: Record<AccountVariant, { dot: string; label: string }> = {
  checking: { dot: 'bg-primary', label: 'Checking' },
  savings: { dot: 'bg-success', label: 'Savings' },
  credit: { dot: 'bg-accent', label: 'Credit' },
};

/**
 * AccountCard, redesigned (v3): a **minimal list row**. A single colored account
 * dot (the variant accent) leads a name / type stack, with the balance right-
 * aligned through {@link MoneyAmount}. No card, no glyph tile — a hairline base
 * rule is the only separation, so a stack of these reads as a lean account list.
 * Distinct at a glance from the base's bordered card and v2's card face. Same props.
 */
export const AccountCardV3 = React.forwardRef<HTMLDivElement, AccountCardV3Props>(
  function AccountCardV3(
    { name, variant, balanceCents, currency = 'USD', accountNumber, icon: _icon, onClick, className, ...rest },
    ref
  ) {
    const meta = VARIANT_META[variant];
    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? `${name}, ${meta.label} account` : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] border-b border-border py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none',
          className
        )}
        {...interactive}
        {...rest}
      >
        <span aria-hidden className={cn('h-2.5 w-2.5 shrink-0 rounded-[var(--xen-radius-full)]', meta.dot)} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{name}</p>
          <p className="truncate text-xs text-muted">
            {accountNumber != null ? maskAccountNumber(accountNumber) : meta.label}
          </p>
        </div>
        <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="md" />
      </div>
    );
  }
);
