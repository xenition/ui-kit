import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import type { MoneyFormatter } from '../commerce';

export type CartBarVariant = 'primary' | 'accent';

export interface CartBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Number of items in the cart; drives the count pill and empty state. */
  itemCount: number;
  /** Cart total in integer cents. */
  totalCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Primary action label (default `View cart`). */
  label?: string;
  /** Activation handler for the bar / checkout action (native `onPress`). */
  onClick?: () => void;
  /** Color variant (default `primary`). */
  variant?: CartBarVariant;
  /** Show an "Updating…" busy state and block activation. */
  loading?: boolean;
  /** Copy shown when the cart is empty (default `Your cart is empty`). */
  emptyLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * A sticky bottom cart summary bar — item count, running total, and a primary
 * action. When `itemCount` is 0 it collapses to a muted, non-interactive empty
 * state; `loading` disables activation and shows a busy label. The filled bar
 * uses the `primary`/`accent` token pair so its text always meets the
 * contrast-guaranteed `on-*` slot. Web parity of the native `CartBar`. When
 * interactive the root is a keyboard-operable `role="button"`. Token-only.
 */
export const CartBar = React.forwardRef<HTMLDivElement, CartBarProps>(function CartBar(
  {
    itemCount,
    totalCents,
    currency = 'USD',
    label = 'View cart',
    onClick,
    variant = 'primary',
    loading = false,
    emptyLabel = 'Your cart is empty',
    formatMoney = defaultFormat,
    className,
    ...rest
  },
  ref
) {
  const empty = itemCount <= 0;
  const disabled = empty || loading;
  const accent = variant === 'accent';

  if (empty) {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--xen-radius-lg)] border border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-center text-sm text-muted',
          className
        )}
        {...rest}
      >
        {emptyLabel}
      </div>
    );
  }

  const barClass = cn(
    'flex items-center justify-between rounded-[var(--xen-radius-lg)] px-[var(--xen-space-lg)] py-[var(--xen-space-md)]',
    accent ? 'bg-accent text-on-accent' : 'bg-primary text-on-primary',
    className
  );

  const content = (
    <>
      <span className="flex items-center gap-[var(--xen-space-sm)]">
        <span
          className={cn(
            'inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-bold',
            accent ? 'bg-on-accent text-accent' : 'bg-on-primary text-primary'
          )}
        >
          {itemCount}
        </span>
        <span className="text-base font-semibold">{loading ? 'Updating…' : label}</span>
      </span>
      <span className="text-base font-bold tabular-nums">{formatMoney(totalCents, currency)}</span>
    </>
  );

  const interactive = typeof onClick === 'function';
  return (
    <div
      ref={ref}
      className={cn(
        barClass,
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        disabled && 'opacity-60'
      )}
      {...rest}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: disabled ? -1 : 0,
            'aria-label': `${label}, ${itemCount} items, ${formatMoney(totalCents, currency)}`,
            'aria-disabled': disabled || undefined,
            'aria-busy': loading || undefined,
            onClick: disabled ? undefined : onClick,
            onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (disabled) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
    >
      {content}
    </div>
  );
});
