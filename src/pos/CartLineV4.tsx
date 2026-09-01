import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, safeCents } from './internal';
import type { CartLineProps } from './CartLine';

/** Drop-in for {@link CartLineProps} — same props, the V4 "register" design. */
export type CartLineV4Props = CartLineProps;

/**
 * CartLine — **V4** "register" design (web parity of the native V4). The tactile
 * checkout take on a ticket line: product name + modifiers on the left, a **big
 * bold line total** in `tabular-nums` on the right (the number a busy counter
 * scans), and a chunky ≥44px −/+ qty stepper with a satisfying press. A `voided`
 * line strikes through and mutes (state by text + style, never color alone). One
 * accent = **primary**; money is integer **cents** via `formatMoney`. Same
 * props/behavior as {@link CartLineProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export const CartLineV4 = React.forwardRef<HTMLDivElement, CartLineV4Props>(function CartLineV4(
  {
    name,
    quantity,
    unitPriceCents,
    currency = 'USD',
    modifiers,
    note,
    discountCents,
    onQuantityChange,
    min = 1,
    max,
    onVoid,
    voidLabel,
    voided = false,
    variant = 'default',
    testID,
    onClick,
    onKeyDown,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const gross = safeCents(unitPriceCents) * quantity;
  const discount = Math.min(safeCents(discountCents), gross);
  const lineTotal = gross - discount;
  const interactive = typeof onClick === 'function';
  const nameColor = voided ? 'text-muted' : 'text-on-surface';

  const atMin = quantity <= min;
  const atMax = typeof max === 'number' && quantity >= max;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(e);
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      (onClick as (ev: React.SyntheticEvent) => void)(e);
    }
  };

  const stepBtn =
    'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border border-border bg-surface text-lg font-bold text-on-surface transition-all ' +
    'hover:bg-primary-50 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ' +
    'disabled:pointer-events-none disabled:opacity-40';

  return (
    <div
      ref={ref}
      data-xen-cart-line=""
      data-testid={testID}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive ? `${name}, ${quantity} for ${formatMoney(lineTotal, currency)}` : undefined
      }
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-start gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)]',
        compact ? 'py-[var(--xen-space-sm)]' : 'py-[var(--xen-space-md)]',
        voided ? 'opacity-60' : '',
        interactive
          ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          : '',
        className
      )}
      {...rest}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-sm)]">
        <span className={cn('truncate text-sm font-bold', nameColor, voided ? 'line-through' : '')}>
          {name}
        </span>

        {!compact && modifiers && modifiers.length > 0 ? (
          <span className="truncate text-xs text-muted">{modifiers.join(' · ')}</span>
        ) : null}
        {!compact && note ? (
          <span className="truncate text-xs italic text-muted">“{note}”</span>
        ) : null}

        {onQuantityChange && !voided ? (
          <div
            role="group"
            aria-label={`Quantity for ${name}`}
            className="mt-[var(--xen-space-xs)] inline-flex w-fit items-center gap-[var(--xen-space-sm)]"
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={atMin}
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(quantity - 1);
              }}
              className={stepBtn}
            >
              −
            </button>
            <span
              aria-live="polite"
              className="min-w-[2ch] text-center text-base font-bold tabular-nums text-on-surface"
            >
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={atMax}
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(quantity + 1);
              }}
              className={stepBtn}
            >
              +
            </button>
          </div>
        ) : (
          <span className="text-xs text-muted">
            {quantity} × {formatMoney(unitPriceCents, currency)}
          </span>
        )}
      </div>

      <div className="flex flex-col items-end gap-[var(--xen-space-xs)]">
        <span
          className={cn(
            'text-lg font-extrabold tabular-nums',
            nameColor,
            voided ? 'line-through' : ''
          )}
        >
          {formatMoney(lineTotal, currency)}
        </span>
        {discount > 0 && !voided ? (
          <span className="text-xs font-bold text-success">−{formatMoney(discount, currency)}</span>
        ) : null}
        {onVoid ? (
          <button
            type="button"
            aria-label={voidLabel ?? `Void ${name}`}
            onClick={(e) => {
              e.stopPropagation();
              onVoid();
            }}
            className="text-xs font-bold text-danger underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
          >
            {voided ? 'Voided' : 'Void'}
          </button>
        ) : null}
      </div>
    </div>
  );
});
