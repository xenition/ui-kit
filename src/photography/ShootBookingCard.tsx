import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Badge, Button, Icon, type BadgeTone } from '../primitives';
import { PriceTag, type MoneyFormatter } from '../commerce';

/** Lifecycle of a shoot booking. */
export type ShootBookingStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled';

const STATUS: Record<ShootBookingStatus, { label: string; tone: BadgeTone }> = {
  requested: { label: 'Requested', tone: 'warn' },
  confirmed: { label: 'Confirmed', tone: 'success' },
  completed: { label: 'Completed', tone: 'primary' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};

export interface ShootBookingCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Client name. */
  clientName: string;
  /** Shoot type (e.g. "Wedding", "Portrait session"). */
  shootType?: string;
  /** Human date line (e.g. "Sat, Aug 30"). */
  dateText?: string;
  /** Human time line (e.g. "2:00 PM – 5:00 PM"). */
  timeText?: string;
  /** Location / venue. */
  location?: string;
  /** Booking status (default `requested`). */
  status?: ShootBookingStatus;
  /** Quoted price in integer cents. */
  priceCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Confirm handler; renders a confirm button when provided and pending. */
  onConfirm?: () => void;
  /** Confirm button label (default `Confirm`). */
  confirmLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * A photo-shoot booking summary — client, shoot type, a date/time/location
 * block, a status `Badge`, an optional quoted {@link PriceTag}, and a confirm
 * action for pending requests. Composes `Card`, `Badge`, `Button`, `Icon`, and
 * `PriceTag`. Status is a labelled badge (not color alone). Passing `onClick`
 * makes the card a keyboard-operable `button`; the confirm `<button>` stops
 * propagation so it never triggers the card. Token-only colors.
 */
export const ShootBookingCard = React.forwardRef<HTMLDivElement, ShootBookingCardProps>(
  function ShootBookingCard(
    {
      clientName,
      shootType,
      dateText,
      timeText,
      location,
      status = 'requested',
      priceCents,
      currency = 'USD',
      onConfirm,
      confirmLabel = 'Confirm',
      formatMoney,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const meta = STATUS[status];
    const interactive = typeof onClick === 'function';

    const line = (glyph: string, text?: string) =>
      text ? (
        <span className="flex items-center gap-[var(--xen-space-xs)]">
          <Icon glyph={glyph} size="sm" color="muted" />
          <span className="text-sm text-on-surface">{text}</span>
        </span>
      ) : null;

    const showFooter = typeof priceCents === 'number' || (onConfirm && status === 'requested');

    return (
      <Card
        ref={ref}
        data-xen-shoot-booking-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `${clientName}, ${meta.label}` : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }
            : undefined
        }
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="truncate text-base font-bold text-on-surface">{clientName}</p>
            {shootType ? <p className="truncate text-sm text-muted">{shootType}</p> : null}
          </div>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>

        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {line('📅', dateText)}
          {line('🕐', timeText)}
          {line('📍', location)}
        </div>

        {showFooter ? (
          <div className="mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]">
            {typeof priceCents === 'number' ? (
              <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} />
            ) : (
              <span />
            )}
            {onConfirm && status === 'requested' ? (
              <Button
                size="sm"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm();
                }}
              >
                {confirmLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
