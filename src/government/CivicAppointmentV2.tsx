import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import type { CivicAppointmentProps, AppointmentStatus } from './CivicAppointment';

/** Same public contract as {@link CivicAppointment} — a drop-in alternate design. */
export type CivicAppointmentV2Props = CivicAppointmentProps;

const STATUS: Record<AppointmentStatus, { label: string; tone: BadgeTone; terminal: boolean }> = {
  scheduled: { label: 'Scheduled', tone: 'primary', terminal: false }, confirmed: { label: 'Confirmed', tone: 'success', terminal: false }, 'checked-in': { label: 'Checked in', tone: 'accent', terminal: false }, completed: { label: 'Completed', tone: 'neutral', terminal: true }, cancelled: { label: 'Cancelled', tone: 'danger', terminal: true }, 'no-show': { label: 'No-show', tone: 'warn', terminal: true },
};

/**
 * CivicAppointment, redesigned (v2): an **elevated appointment card**. A primary-
 * tinted date/time medallion leads the service/office; a status badge and a
 * reference chip sit on the header, and Check in/Reschedule anchor the card.
 * Distinct from v1. Same props, token-only.
 */
export const CivicAppointmentV2 = React.forwardRef<HTMLDivElement, CivicAppointmentV2Props>(
  function CivicAppointmentV2({ service, office, date, time, status = 'scheduled', location, reference, onCheckIn, onReschedule, className, ...rest }, ref) {
    const st = STATUS[status];
    return (
      <div ref={ref} data-xen-civic-appointment="" className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className)} {...rest}>
        <div className="flex gap-3">
          <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 py-2 text-center">
            <span className="text-xs font-semibold text-primary">{date}</span>
            <span className="text-sm font-bold text-on-surface">{time}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-on-surface">{service}</p>
            <p className="truncate text-xs text-muted">{office}</p>
            {location ? <p className="truncate text-xs text-muted">📍 {location}</p> : null}
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge tone={st.tone}>{st.label}</Badge>
            {reference ? <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-on-surface">{reference}</span> : null}
          </div>
        </div>
        {!st.terminal && (onCheckIn || onReschedule) ? (
          <div className="flex gap-2">
            {onCheckIn ? <Button size="md" variant="primary" className="flex-1" onClick={onCheckIn}>Check in</Button> : null}
            {onReschedule ? <Button size="md" variant="outline" className="flex-1" onClick={onReschedule}>Reschedule</Button> : null}
          </div>
        ) : null}
      </div>
    );
  }
);
