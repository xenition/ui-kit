import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button, Icon, type BadgeTone } from '../primitives';
import { PriceTag } from '../commerce';
import type { ShootBookingCardProps, ShootBookingStatus } from './ShootBookingCard';

/** Drop-in for {@link ShootBookingCardProps} — same props, the V4 "studio" design. */
export type ShootBookingCardV4Props = ShootBookingCardProps;

const STATUS: Record<ShootBookingStatus, { label: string; tone: BadgeTone }> = {
  requested: { label: 'Requested', tone: 'warn' },
  confirmed: { label: 'Confirmed', tone: 'success' },
  completed: { label: 'Completed', tone: 'primary' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};

/**
 * ShootBookingCard — **V4** "studio" design (web parity of the native V4). A
 * booking summary on a clean, elevated studio surface: an elevated `shadow-md`
 * card, bold client name, muted shoot type, and a date/time/location block with
 * muted glyphs. The lifecycle `status` is a labelled `Badge` with the correct
 * tone per status — `requested` (warn), `confirmed` (success), `completed`
 * (primary), `cancelled` (danger) — never color alone. The confirm `Button`
 * only shows for `requested` and stops propagation so it never triggers the
 * card. Optional quoted price via {@link PriceTag}. Identical props/behavior to
 * {@link ShootBookingCardProps}; `onClick` makes the card a keyboard-operable
 * `button`. All colors from `--xen-*` token classes (no literals).
 */
export const ShootBookingCardV4 = React.forwardRef<HTMLDivElement, ShootBookingCardV4Props>(
  function ShootBookingCardV4(
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
      <div
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
          'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface shadow-md',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="truncate text-base font-bold text-on-surface">{clientName}</p>
            {shootType ? <p className="truncate text-sm text-muted">{shootType}</p> : null}
          </div>
          <Badge tone={meta.tone} variant="soft">
            {meta.label}
          </Badge>
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
      </div>
    );
  }
);
