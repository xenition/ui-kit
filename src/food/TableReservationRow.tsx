import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';

/** Reservation lifecycle. */
export type ReservationStatus = 'requested' | 'confirmed' | 'seated' | 'completed' | 'cancelled';

export interface TableReservationRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Guest / booking name. */
  name: string;
  /** Party size (number of guests). */
  partySize: number;
  /** Date text (e.g. "Fri, Aug 29"). */
  dateText?: string;
  /** Time text (e.g. "7:30 PM"). */
  timeText?: string;
  /** Table label / number (e.g. "Table 12"). */
  tableLabel?: string;
  /** Reservation status; drives the status badge (default `requested`). */
  status?: ReservationStatus;
  /** Whole-row activation handler (native `onPress`). */
  onClick?: () => void;
}

const STATUS_META: Record<ReservationStatus, { label: string; tone: BadgeTone }> = {
  requested: { label: 'Requested', tone: 'warn' },
  confirmed: { label: 'Confirmed', tone: 'primary' },
  seated: { label: 'Seated', tone: 'success' },
  completed: { label: 'Completed', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};

/**
 * A single table-reservation row — guest name, a party-size chip, date/time,
 * an optional table label, and a status `Badge`. The status is shown as a
 * labelled badge (text + tone), so it never depends on color alone. Optionally
 * activatable to open the booking. Reuses the `Badge` and `Icon` primitives.
 * Web parity of the native `TableReservationRow`; token-only. When `onClick` is
 * set the root is a keyboard-operable `role="button"`.
 */
export const TableReservationRow = React.forwardRef<HTMLDivElement, TableReservationRowProps>(
  function TableReservationRow(
    { name, partySize, dateText, timeText, tableLabel, status = 'requested', onClick, className, ...rest },
    ref
  ) {
    const meta = STATUS_META[status] ?? STATUS_META.requested;
    const when = [dateText, timeText].filter(Boolean).join(' · ');

    const containerClass = cn(
      'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
      className
    );

    const inner = (
      <>
        <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100">
          <Icon glyph="👥" size="sm" aria-label={`Party of ${partySize}`} />
          <span className="text-xs font-bold text-on-surface">{partySize}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="truncate font-heading text-base font-semibold text-on-surface">{name}</p>
          {when ? <p className="text-sm text-muted">{when}</p> : null}
          {tableLabel ? <p className="text-xs text-muted">{tableLabel}</p> : null}
        </div>
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </>
    );

    const interactive = typeof onClick === 'function';
    return (
      <div
        ref={ref}
        className={cn(
          containerClass,
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
        )}
        {...rest}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': `${name}, party of ${partySize}${when ? `, ${when}` : ''}, ${meta.label}`,
              onClick,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
      >
        {inner}
      </div>
    );
  }
);
