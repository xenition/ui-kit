import * as React from 'react';
import { cn } from '../primitives/cn';
import { QuantityStepper } from '../commerce/QuantityStepper';
import { formatMoney, safeCents } from './internal';
import type { CartLineProps } from './CartLine';

/** Same public contract as {@link CartLine} — a drop-in alternate design. */
export type CartLineV2Props = CartLineProps;

/**
 * CartLine, redesigned (v2): an **elevated ticket card**. The quantity stepper
 * leads on the left, the name + modifier chips + note fill the middle, and the
 * line total (with a struck discount) anchors the right — a chunky order-ticket
 * row. Voided lines strike through. Distinct from v1. Same props, token-only.
 */
export const CartLineV2 = React.forwardRef<HTMLDivElement, CartLineV2Props>(function CartLineV2(
  { name, quantity, unitPriceCents, currency = 'USD', modifiers, note, discountCents, onQuantityChange, min = 1, max, onVoid, voidLabel, voided = false, variant, testID, className, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const gross = safeCents(unitPriceCents) * quantity;
  const total = gross - safeCents(discountCents);

  return (
    <div
      ref={ref}
      data-xen-cart-line=""
      data-testid={testID}
      className={cn('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm', voided && 'opacity-60', className)}
      {...rest}
    >
      {!voided && onQuantityChange ? (
        <QuantityStepper value={quantity} min={min} max={max} onChange={onQuantityChange} />
      ) : (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-sm font-bold text-on-surface">
          {quantity}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className={cn('truncate text-sm font-semibold text-on-surface', voided && 'line-through')}>{name}</p>
        {!compact && modifiers && modifiers.length > 0 ? (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {modifiers.map((m, i) => (
              <span key={i} className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-xs text-muted">{m}</span>
            ))}
          </div>
        ) : null}
        {!compact && note ? <p className="truncate text-xs italic text-muted">{note}</p> : null}
      </div>
      <div className="text-right">
        <p className={cn('text-sm font-bold text-on-surface', voided && 'line-through')}>{formatMoney(total, currency)}</p>
        {safeCents(discountCents) > 0 ? <p className="text-xs text-muted line-through">{formatMoney(gross, currency)}</p> : null}
      </div>
      {onVoid ? (
        <button type="button" aria-label={voidLabel ?? `Void ${name}`} onClick={onVoid} className="text-lg text-muted hover:text-danger">
          ×
        </button>
      ) : null}
    </div>
  );
});
