import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';

/** Lifecycle of a booked civic appointment (DMV visit, city-hall meeting…). */
export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'checked-in'
  | 'completed'
  | 'cancelled'
  | 'no-show';

const STATUS: Record<AppointmentStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
  confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
  // Native `accent` folds to `primary` on web (no `accent` BadgeTone).
  'checked-in': { label: 'Checked in', glyph: '📍', tone: 'primary' },
  completed: { label: 'Completed', glyph: '🏁', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
  'no-show': { label: 'No-show', glyph: '!', tone: 'danger' },
};

const TERMINAL: AppointmentStatus[] = ['completed', 'cancelled', 'no-show'];

export interface CivicAppointmentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Service the appointment is for (e.g. "License renewal"). */
  service: string;
  /** Office / department name (e.g. "DMV — Downtown"). */
  office: string;
  /** Localized date (already formatted, e.g. "Mon, Aug 24"). */
  date: string;
  /** Localized time (already formatted, e.g. "10:30 AM"). */
  time: string;
  /** Appointment lifecycle status (default `scheduled`). */
  status?: AppointmentStatus;
  /** Physical address / room shown as a secondary location line. */
  location?: string;
  /** Confirmation / queue reference (e.g. "A-042"). */
  reference?: string;
  /** Fires "Check in" (shown only when supplied and status is non-terminal). */
  onCheckIn?: () => void;
  /** Fires "Reschedule" (shown only when supplied and status is non-terminal). */
  onReschedule?: () => void;
}

/**
 * A booked civic appointment card: service, office, date/time, and a status pill
 * conveyed by **text + glyph + color** (never color alone). Optional `onCheckIn`
 * / `onReschedule` actions (real `<button>`s) appear only for non-terminal
 * appointments. Token-bound throughout — no literal colors. Web parity of the
 * native `CivicAppointment`.
 */
export const CivicAppointment = React.forwardRef<HTMLDivElement, CivicAppointmentProps>(
  function CivicAppointment(
    {
      service,
      office,
      date,
      time,
      status = 'scheduled',
      location,
      reference,
      onCheckIn,
      onReschedule,
      className,
      ...rest
    },
    ref
  ) {
    const sd = STATUS[status] ?? STATUS.scheduled;
    const terminal = TERMINAL.includes(status);
    const showActions = !terminal && (onCheckIn != null || onReschedule != null);

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex items-start gap-[var(--xen-space-md)]">
          <span className="flex w-14 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50 py-[var(--xen-space-sm)]">
            <Icon glyph="📅" size="lg" color="primary" aria-label="Appointment" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{service}</p>
            <p className="truncate text-sm text-muted">{office}</p>
            <p className="text-sm font-semibold text-on-surface">
              {date} · {time}
            </p>
            {location != null ? (
              <p className="text-xs text-muted">
                <span aria-hidden="true">📍</span> {location}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-[var(--xen-space-xs)]">
            <Badge tone={sd.tone}>
              <span aria-hidden="true">{sd.glyph}</span> {sd.label}
            </Badge>
            {reference != null ? <span className="text-xs text-muted">#{reference}</span> : null}
          </div>
        </div>

        {showActions ? (
          <div className="mt-[var(--xen-space-md)] flex justify-end gap-[var(--xen-space-sm)]">
            {onReschedule != null ? (
              <Button size="sm" variant="outline" onClick={onReschedule}>
                Reschedule
              </Button>
            ) : null}
            {onCheckIn != null ? (
              <Button size="sm" onClick={onCheckIn}>
                Check in
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
