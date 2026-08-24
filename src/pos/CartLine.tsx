import * as React from 'react';
import { cn } from '../primitives/cn';
import { QuantityStepper } from '../commerce/QuantityStepper';
import { formatMoney, safeCents } from './internal';

export type CartLineVariant = 'default' | 'compact';

export interface CartLineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Item name. */
  name: string;
  /** Quantity on the ticket. */
  quantity: number;
  /** Unit price in integer **cents**. */
  unitPriceCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Modifier / option chips (e.g. "No onion", "Large"). */
  modifiers?: string[];
  /** Free-text note for the line. */
  note?: string;
  /** Per-line discount already applied, in cents (shown struck from the total). */
  discountCents?: number;
  /** Quantity-change handler. When absent the line is read-only (qty as text). */
  onQuantityChange?: (quantity: number) => void;
  /** Minimum quantity for the stepper (default 1). */
  min?: number;
  /** Maximum quantity for the stepper. */
  max?: number;
  /** Void / remove handler; renders a remove control when provided. */
  onVoid?: () => void;
  /** Void control accessible label (default `Void {name}`). */
  voidLabel?: string;
  /** Marks the line voided — struck through + muted, stepper hidden. */
  voided?: boolean;
  /** Density. `compact` hides modifiers/notes. */
  variant?: CartLineVariant;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

/**
 * One line on the register ticket — the DOM parity of the native `CartLine`
 * (sibling of the commerce `CartLineItem`): name, an inline
 * {@link QuantityStepper} (or read-only qty), modifiers/notes, an optional
 * per-line discount, the line total, and a void control. A `voided` line strikes
 * through and mutes (state by text + style, never color alone). Money is integer
 * **cents** via `formatMoney`. When `onClick` is set the whole row is a keyboard-
 * operable `role="button"`. Token-only.
 */
export const CartLine = React.forwardRef<HTMLDivElement, CartLineProps>(function CartLine(
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(e);
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      (onClick as (ev: React.SyntheticEvent) => void)(e);
    }
  };

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
        'flex items-start gap-[var(--xen-space-md)]',
        compact ? 'py-[var(--xen-space-sm)]' : 'py-[var(--xen-space-md)]',
        voided ? 'opacity-60' : '',
        interactive ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300' : '',
        className
      )}
      {...rest}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
        <span
          className={cn(
            'truncate text-sm font-semibold',
            nameColor,
            voided ? 'line-through' : ''
          )}
        >
          {name}
        </span>

        {!compact && modifiers && modifiers.length > 0 ? (
          <span className="truncate text-xs text-muted">{modifiers.join(' · ')}</span>
        ) : null}
        {!compact && note ? (
          <span className="truncate text-xs italic text-muted">“{note}”</span>
        ) : null}

        {onQuantityChange && !voided ? (
          <QuantityStepper
            value={quantity}
            min={min}
            max={max}
            onChange={onQuantityChange}
            label={`Quantity for ${name}`}
          />
        ) : (
          <span className="text-xs text-muted">
            {quantity} × {formatMoney(unitPriceCents, currency)}
          </span>
        )}
      </div>

      <div className="flex flex-col items-end gap-[var(--xen-space-xs)]">
        <span
          className={cn(
            'text-sm font-bold tabular-nums',
            nameColor,
            voided ? 'line-through' : ''
          )}
        >
          {formatMoney(lineTotal, currency)}
        </span>
        {discount > 0 && !voided ? (
          <span className="text-xs font-semibold text-success">
            −{formatMoney(discount, currency)}
          </span>
        ) : null}
        {onVoid ? (
          <button
            type="button"
            aria-label={voidLabel ?? `Void ${name}`}
            onClick={(e) => {
              e.stopPropagation();
              onVoid();
            }}
            className="text-xs font-semibold text-danger underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
          >
            {voided ? 'Voided' : 'Void'}
          </button>
        ) : null}
      </div>
    </div>
  );
});
