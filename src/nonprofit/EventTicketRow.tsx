import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { formatMoney } from './internal';

export interface EventTicketRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  /** Ticket tier name, e.g. `Gala Table` or `General Entry`. */
  name: string;
  /** Ticket price, integer **cents**. `0` renders as the localized zero (free). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Short perks / description line. */
  description?: string;
  /** Portion of the price that is tax-deductible, integer **cents**. */
  deductibleCents?: number;
  /** Remaining inventory; `0` marks the row sold out and disables it. */
  remaining?: number;
  /** Force the sold-out state regardless of `remaining`. */
  soldOut?: boolean;
  /** Current selection (radio-style). */
  selected?: boolean;
  /** Fires when chosen (never fires while sold out / disabled). */
  onSelect?: () => void;
  /** Disable interaction without the sold-out styling. */
  disabled?: boolean;
}

/**
 * Web parity of the native `EventTicketRow`: a selectable charity-event ticket
 * row — tier name, price (integer cents → `formatMoney`), optional
 * tax-deductible portion, perks, and inventory, with a radio indicator. The row
 * is a real `<button role="radio">`, so selection is announced by `aria-checked`
 * (plus a filled indicator and bold border) — not color alone. Sold-out rows are
 * dimmed, badged and non-interactive. All colors come from the `--xen-*` token
 * classes — no literal colors.
 */
export const EventTicketRow = React.forwardRef<HTMLButtonElement, EventTicketRowProps>(
  function EventTicketRow(
    {
      name,
      priceCents,
      currency = 'USD',
      description,
      deductibleCents,
      remaining,
      soldOut,
      selected = false,
      onSelect,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const isSoldOut = soldOut === true || remaining === 0;
    const isDisabled = disabled || isSoldOut;
    const lowStock = !isSoldOut && typeof remaining === 'number' && remaining > 0 && remaining <= 10;
    const priceLabel = formatMoney(priceCents, currency);

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={selected}
        aria-disabled={isDisabled || undefined}
        aria-label={`${name}, ${priceLabel}${isSoldOut ? ', sold out' : ''}`}
        disabled={isDisabled}
        onClick={isDisabled ? undefined : onSelect}
        className={cn(
          'flex w-full items-center gap-md rounded-md p-md text-left transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          selected ? 'border-2 border-primary' : 'border border-border',
          isDisabled ? 'opacity-60' : 'bg-surface hover:bg-neutral-100',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-sm">
            <span className="text-base font-bold text-on-surface">{name}</span>
            {isSoldOut ? (
              <Badge tone="danger">Sold out</Badge>
            ) : lowStock ? (
              <Badge tone="warn">{`${remaining} left`}</Badge>
            ) : null}
          </div>
          {description ? <span className="text-sm text-muted">{description}</span> : null}
          {typeof deductibleCents === 'number' ? (
            <span className="text-xs text-success">
              {`${formatMoney(deductibleCents, currency)} tax-deductible`}
            </span>
          ) : null}
        </div>

        <span className="text-base font-bold text-on-surface">{priceLabel}</span>

        <span
          className={cn(
            'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
            selected ? 'border-primary' : 'border-border'
          )}
        >
          {selected ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
        </span>
      </button>
    );
  }
);
