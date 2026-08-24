import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { formatMoney as defaultFormat } from '../commerce';
import type { CartBarProps } from './CartBar';

/** Drop-in for {@link CartBar}: identical props, a distinct design. */
export type CartBarV3Props = CartBarProps;

const MAX_DOTS = 6;

/**
 * CartBar, alternate design **V3** — a *full-width itemised bar*. A surface-
 * toned bar with a top hairline that splits into a summary block (a row of dots
 * previewing how many items are in the cart, plus the running total) and a
 * distinct filled action `Button` — rather than the single filled pill of the
 * base. The Button is the sole activation target so `onClick` never double-
 * fires; empty/`loading` behave as the base. Same props; token-only.
 */
export const CartBarV3 = React.forwardRef<HTMLDivElement, CartBarV3Props>(function CartBarV3(
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

  const barClass = cn(
    'flex items-center justify-between gap-[var(--xen-space-md)] border-t border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]',
    className
  );

  if (empty) {
    return (
      <div ref={ref} className={cn(barClass, 'text-sm text-muted')} {...rest}>
        <span className="flex-1">{emptyLabel}</span>
      </div>
    );
  }

  const dotCount = Math.min(MAX_DOTS, Math.max(1, itemCount));
  const dots = Array.from({ length: dotCount }, (_, i) => (
    <span
      key={i}
      className={cn('inline-block h-1.5 w-1.5 rounded-full', accent ? 'bg-accent/60' : 'bg-primary/60')}
    />
  ));

  return (
    <div
      ref={ref}
      role="group"
      aria-label={`${itemCount} ${itemCount === 1 ? 'item' : 'items'}, ${formatMoney(totalCents, currency)}`}
      aria-busy={loading || undefined}
      className={barClass}
      {...rest}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-[var(--xen-space-xs)]">
          <span className="text-xs font-semibold text-muted">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
          <span className="flex items-center gap-[3px]">{dots}</span>
          {itemCount > MAX_DOTS ? (
            <span className="text-xs text-muted">+{itemCount - MAX_DOTS}</span>
          ) : null}
        </span>
        <span className="text-lg font-extrabold tabular-nums text-on-surface">
          {formatMoney(totalCents, currency)}
        </span>
      </span>
      <Button
        size="md"
        variant={accent ? 'secondary' : 'primary'}
        disabled={disabled}
        aria-busy={loading || undefined}
        onClick={onClick}
      >
        {loading ? 'Updating…' : label}
      </Button>
    </div>
  );
});
