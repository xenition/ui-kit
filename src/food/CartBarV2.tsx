import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import type { CartBarProps } from './CartBar';

/** Drop-in for {@link CartBar}: identical props, a distinct design. */
export type CartBarV2Props = CartBarProps;

/**
 * CartBar, alternate design **V2** — an *elevated floating pill*. Instead of a
 * full-width filled bar, V2 is a rounded-full, self-centred pill that hovers
 * above the content with a real drop shadow and a subtle hover lift — the
 * classic "N items · total" FAB-style checkout affordance. Empty and `loading`
 * states behave exactly as the base (collapses to a muted, non-interactive
 * pill). Same props as the base `CartBar`; token-only.
 */
export const CartBarV2 = React.forwardRef<HTMLDivElement, CartBarV2Props>(function CartBarV2(
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
          'mx-auto flex w-full max-w-[480px] items-center justify-center rounded-full border border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] text-center text-sm text-muted shadow-sm',
          className
        )}
        {...rest}
      >
        {emptyLabel}
      </div>
    );
  }

  const pillClass = cn(
    'mx-auto flex w-full max-w-[480px] items-center justify-between gap-[var(--xen-space-md)] rounded-full px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] shadow-lg',
    accent ? 'bg-accent text-on-accent' : 'bg-primary text-on-primary',
    className
  );

  const content = (
    <>
      <span className="flex items-center gap-[var(--xen-space-sm)]">
        <span
          className={cn(
            'inline-flex h-[26px] min-w-[26px] items-center justify-center rounded-full px-1 text-sm font-extrabold',
            accent ? 'bg-on-accent text-accent' : 'bg-on-primary text-primary'
          )}
        >
          {itemCount}
        </span>
        <span className="text-base font-bold">{loading ? 'Updating…' : label}</span>
      </span>
      <span className="text-base font-extrabold tabular-nums">{formatMoney(totalCents, currency)}</span>
    </>
  );

  const interactive = typeof onClick === 'function';
  return (
    <div
      ref={ref}
      className={cn(
        pillClass,
        interactive &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
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
