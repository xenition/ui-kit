import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { formatMoney } from './internal';
import type { EventTicketRowProps } from './EventTicketRow';

/** Drop-in for {@link EventTicketRowProps} — same props, the V4 "rally" design. */
export type EventTicketRowV4Props = EventTicketRowProps;

/**
 * EventTicketRow — **V4** "rally" design (web parity of the native V4). The
 * warm, mission-driven take on a selectable charity-event ticket row: an
 * elevated rounded row (soft shadow, clean surface — no gradient) with a
 * leading ticket glyph in a soft-primary well, a bold tier name, muted perks,
 * an optional tax-deductible note, the price rendered bold via `formatMoney`,
 * and a radio indicator that doubles as the ≥44px hit target. Availability is
 * read via a glyph + a labelled Badge + token color (never color alone): sold
 * out gets a danger "Sold out" badge and disables the row; low stock gets a
 * warn "N left" badge. Selection is announced by `role="radio"` +
 * `aria-checked` (plus a filled dot and a bold primary border). Honors every
 * prop of {@link EventTicketRowProps}; the whole row is a real `<button>`.
 * All colors from `--xen-*` token classes (no literals).
 */
export const EventTicketRowV4 = React.forwardRef<HTMLButtonElement, EventTicketRowV4Props>(
  function EventTicketRowV4(
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
          'flex w-full items-center gap-md rounded-lg p-md text-left shadow-md transition-colors',
          'min-h-[44px]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          selected ? 'border-2 border-primary bg-surface' : 'border border-border bg-surface',
          isDisabled ? 'opacity-60' : 'hover:bg-neutral-100',
          className
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10"
        >
          <Icon glyph="🎟️" size="lg" />
        </span>

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
