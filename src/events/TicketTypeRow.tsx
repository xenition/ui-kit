import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';

export interface TicketTypeRowProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  /** Tier name, e.g. `General Admission`. */
  name: string;
  /** Pre-formatted price, e.g. `$49` or `Free`. */
  price: string;
  /** Short description / perks line. */
  description?: string;
  /** Remaining inventory; `0` marks the row sold out and disables it. */
  remaining?: number;
  /** Force the sold-out state regardless of `remaining`. */
  soldOut?: boolean;
  /** Whether this row is the current selection. */
  selected?: boolean;
  /** Fires when the row is chosen (never fires while sold out/disabled). */
  onSelect?: () => void;
}

/**
 * A selectable ticket-tier row for a purchase sheet: name, price, description
 * and inventory, with a radio-style indicator on the right. Selection is
 * conveyed by a filled indicator, a bold border, and `aria-checked` — not color
 * alone. Sold-out rows are dimmed, badged, and non-interactive (`onSelect`
 * never fires while sold out). `onSelect` is renamed from the DOM `onSelect`.
 * Colors come from the `--xen-*` tokens; no literal colors.
 */
export const TicketTypeRow = React.forwardRef<HTMLButtonElement, TicketTypeRowProps>(function TicketTypeRow(
  { name, price, description, remaining, soldOut, selected = false, onSelect, disabled = false, className, ...rest },
  ref
) {
  const isSoldOut = soldOut === true || remaining === 0;
  const isDisabled = disabled || isSoldOut;
  const lowStock = !isSoldOut && typeof remaining === 'number' && remaining > 0 && remaining <= 10;

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${name}, ${price}${isSoldOut ? ', sold out' : ''}`}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onSelect}
      className={cn(
        'flex w-full flex-row items-center gap-md rounded-md p-md text-left',
        selected ? 'border-2 border-primary' : 'border border-border',
        'bg-surface transition-colors',
        isDisabled ? 'opacity-60' : 'hover:bg-neutral-50',
        'disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="flex flex-row flex-wrap items-center gap-sm">
          <span className="text-base font-bold text-on-surface">{name}</span>
          {isSoldOut ? (
            <Badge tone="danger">Sold out</Badge>
          ) : lowStock ? (
            <Badge tone="warn">{`${remaining} left`}</Badge>
          ) : null}
        </span>
        {description ? <span className="text-sm text-muted">{description}</span> : null}
      </span>

      <span className="text-base font-bold text-on-surface">{price}</span>

      {/* Radio indicator — filled when selected, so state is shape + a11y, not color. */}
      <span
        aria-hidden="true"
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-full border-2',
          selected ? 'border-primary' : 'border-border'
        )}
      >
        {selected ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
      </span>
    </button>
  );
});
