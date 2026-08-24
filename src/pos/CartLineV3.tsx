import * as React from 'react';
import { cn } from '../primitives/cn';
import { QuantityStepper } from '../commerce/QuantityStepper';
import { formatMoney, safeCents } from './internal';
import type { CartLineProps } from './CartLine';

/** Same public contract as {@link CartLine} — a drop-in alternate design. */
export type CartLineV3Props = CartLineProps;

/**
 * CartLine, redesigned (v3): a **dense ticket line**. A leading `N×` quantity, the
 * name inline, and the line total pinned right, with a stepper only when editable
 * and a small void ×. Hairline-bordered for a tight running ticket. The opposite
 * of v2's card. Same props, token-only.
 */
export const CartLineV3 = React.forwardRef<HTMLDivElement, CartLineV3Props>(function CartLineV3(
  { name, quantity, unitPriceCents, currency = 'USD', modifiers, note, discountCents, onQuantityChange, min = 1, max, onVoid, voidLabel, voided = false, variant, testID, className, ...rest },
  ref
) {
  void variant;
  void note;
  const total = safeCents(unitPriceCents) * quantity - safeCents(discountCents);

  return (
    <div
      ref={ref}
      data-xen-cart-line=""
      data-testid={testID}
      className={cn('flex items-center gap-2 border-b border-border py-2', voided && 'opacity-60', className)}
      {...rest}
    >
      {!voided && onQuantityChange ? (
        <QuantityStepper value={quantity} min={min} max={max} onChange={onQuantityChange} />
      ) : (
        <span className="w-8 shrink-0 text-sm font-semibold tabular-nums text-muted">{quantity}×</span>
      )}
      <div className="min-w-0 flex-1">
        <p className={cn('truncate text-sm text-on-surface', voided && 'line-through')}>{name}</p>
        {modifiers && modifiers.length > 0 ? <p className="truncate text-xs text-muted">{modifiers.join(', ')}</p> : null}
      </div>
      <span className={cn('text-sm font-semibold text-on-surface', voided && 'line-through')}>{formatMoney(total, currency)}</span>
      {onVoid ? (
        <button type="button" aria-label={voidLabel ?? `Void ${name}`} onClick={onVoid} className="text-base text-muted hover:text-danger">
          ×
        </button>
      ) : null}
    </div>
  );
});
