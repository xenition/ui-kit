import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { TicketTypeRowProps } from './TicketTypeRow';
import { BADGE_V4, TABULAR_CLASS, remainingParts, spokenLine } from './internal/event-v4';

export interface TicketTypeRowV4Props extends TicketTypeRowProps {
  /** At or below this many remaining, the row reads as low stock. Default `10`. */
  lowStockAt?: number;
  /** The scarcity badge's copy. Default `'2 left'`. */
  formatRemaining?: (remaining: number) => string;
  /** The sold-out badge's copy. Default `'Sold out'`. */
  soldOutLabel?: string;
}

const ROW_STATE = stateGroundVars(
  'var(--xen-card)',
  'var(--xen-on-card)'
) as React.CSSProperties;

/**
 * **V4 ticket-type row** — the web twin of the native `TicketTypeRowV4`, same
 * props as {@link TicketTypeRow} plus `lowStockAt`, `formatRemaining` and
 * `soldOutLabel`.
 *
 * ## Five changes
 *
 * 1. **Negative inventory is sold out, not purchasable.** `remaining === 0` is
 *    a strict test, so a tier oversold to `-3` was neither sold out *nor* low
 *    stock: the row rendered normal, enabled and priced, and `onSelect` fired.
 *    `remainingParts()` treats anything at or below zero as sold out.
 * 2. **`lowStockAt` replaces the hard-coded `<= 10`.** Ten is a sensible
 *    default for a club night and meaningless for a 40,000-seat stadium.
 * 3. **The row says how many are left.** Its name was `` `${name}, ${price}` ``
 *    — "2 left" is exactly the thing a buyer was not being told, and it is the
 *    thing that decides whether they buy now.
 * 4. **Disabled is 0.38 and press is a state layer.** `opacity-60` is an
 *    invented band, and `hover:bg-neutral-50` is a ramp step that mirrors under
 *    `[data-theme="dark"]` into a near-white plate on a dark sheet.
 * 5. **The row clears 44 and the radio indicator is one size on both twins**,
 *    composed from the spacing scale rather than `h-5 w-5` here and a different
 *    number there.
 */
export const TicketTypeRowV4 = React.forwardRef<HTMLButtonElement, TicketTypeRowV4Props>(
  function TicketTypeRowV4(
    {
      name,
      price,
      description,
      remaining,
      soldOut,
      selected = false,
      onSelect,
      disabled = false,
      lowStockAt = 10,
      formatRemaining,
      soldOutLabel = 'Sold out',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const stock = remainingParts(remaining, soldOut, lowStockAt);
    const isDisabled = disabled || stock.soldOut;
    const remainingText =
      stock.remaining != null && stock.lowStock
        ? (formatRemaining ?? ((n: number) => `${n} left`))(stock.remaining)
        : undefined;
    const scarcity = stock.soldOut ? soldOutLabel : remainingText;

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={selected}
        aria-label={spokenLine([name, price, description, scarcity])}
        disabled={isDisabled}
        onClick={isDisabled ? undefined : onSelect}
        data-xen-v4-state=""
        style={ROW_STATE}
        className={cn(
          'flex w-full flex-row items-center gap-md rounded-[var(--xen-radius-md)] p-md text-left',
          MIN_TAP_CLASS,
          selected ? 'border-2 border-primary' : 'border border-border',
          'bg-card text-on-card',
          V4_DISABLED_CLASS,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className
        )}
        {...rest}
      >
        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="flex flex-row flex-wrap items-center gap-sm">
            <span className="text-base font-bold text-on-card">{name}</span>
            {stock.soldOut ? (
              <BadgeV4 {...BADGE_V4} tone="danger">
                {soldOutLabel}
              </BadgeV4>
            ) : remainingText ? (
              <BadgeV4 {...BADGE_V4} tone="warn">
                {remainingText}
              </BadgeV4>
            ) : null}
          </span>
          {description ? (
            <span className="text-sm text-muted-text">{description}</span>
          ) : null}
        </span>

        <span className={cn('text-base font-bold text-on-card', TABULAR_CLASS)}>{price}</span>

        {/*
          Shape, not colour: the indicator is filled when chosen. Its diameter is
          composed from the spacing scale so the two twins are one size.
        */}
        <span
          aria-hidden="true"
          className={cn(
            'flex h-lg w-lg shrink-0 items-center justify-center rounded-full border-2',
            selected ? 'border-primary' : 'border-border'
          )}
        >
          {selected ? <span className="h-sm w-sm rounded-full bg-primary" /> : null}
        </span>
      </button>
    );
  }
);
