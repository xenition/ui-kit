import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce/money';
import { maskAccountNumber } from './internal/mask';
import { pressableProps } from './internal/pressable';
import type { AccountCardProps, AccountVariant } from './AccountCard';

/** Same public contract as {@link AccountCard} — a drop-in alternate design. */
export type AccountCardV2Props = AccountCardProps;

const VARIANT_META: Record<
  AccountVariant,
  { fill: string; on: string; sub: string; sheen: string; glyph: string; label: string }
> = {
  checking: { fill: 'bg-primary', on: 'text-on-primary', sub: 'text-on-primary', sheen: 'bg-on-primary', glyph: '🏦', label: 'Checking' },
  savings: { fill: 'bg-success', on: 'text-on-success', sub: 'text-on-success', sheen: 'bg-on-success', glyph: '🐖', label: 'Savings' },
  credit: { fill: 'bg-accent', on: 'text-on-accent', sub: 'text-on-accent', sheen: 'bg-on-accent', glyph: '💳', label: 'Credit' },
};

/**
 * AccountCard, redesigned (v2): a **full credit-card face**. The whole tile is
 * filled with the variant's fill slot (primary / success / accent) and lifted
 * with a shadow; a translucent on-color sheen disc suggests a gradient without a
 * literal color. The balance is set large in the guaranteed on-fill text slot,
 * the name up top, and the masked number along the bottom like an embossed PAN.
 * Distinct at a glance from the base's small glyph tile. Same props, cents.
 */
export const AccountCardV2 = React.forwardRef<HTMLDivElement, AccountCardV2Props>(
  function AccountCardV2(
    { name, variant, balanceCents, currency = 'USD', accountNumber, icon, onClick, className, ...rest },
    ref
  ) {
    const meta = VARIANT_META[variant];
    const interactive = pressableProps(onClick);
    const safeBalance = Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0;

    return (
      <div
        ref={ref}
        aria-label={interactive ? `${name}, ${meta.label} account` : undefined}
        className={cn(
          'relative flex min-h-[172px] flex-col justify-between overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)] shadow-lg',
          meta.fill,
          meta.on,
          interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
        {...interactive}
        {...rest}
      >
        {/* Sheen disc — a translucent on-color wash reading as a gradient. */}
        <span
          aria-hidden
          className={cn('pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-[var(--xen-radius-full)] opacity-10', meta.sheen)}
        />
        <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold">{name}</p>
            <p className={cn('text-xs opacity-80', meta.sub)}>{meta.label}</p>
          </div>
          <span className="text-2xl leading-none">{icon ?? meta.glyph}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className={cn('text-xs opacity-80', meta.sub)}>Balance</span>
          <span className="text-3xl font-bold tabular-nums">{formatMoney(safeBalance, currency)}</span>
        </div>
        <span className={cn('text-sm tracking-widest tabular-nums opacity-80', meta.sub)}>
          {accountNumber != null ? maskAccountNumber(accountNumber) : '•• ••••'}
        </span>
      </div>
    );
  }
);
