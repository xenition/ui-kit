import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import type { CivicAppointmentProps, AppointmentStatus } from './CivicAppointment';

/** Same public contract as {@link CivicAppointment} — a drop-in alternate design. */
export type CivicAppointmentV3Props = CivicAppointmentProps;

const DOT: Record<AppointmentStatus, string> = { scheduled: 'bg-primary', confirmed: 'bg-success', 'checked-in': 'bg-accent', completed: 'bg-neutral-400', cancelled: 'bg-danger', 'no-show': 'bg-warn' };
const LABEL: Record<AppointmentStatus, string> = { scheduled: 'Scheduled', confirmed: 'Confirmed', 'checked-in': 'Checked in', completed: 'Completed', cancelled: 'Cancelled', 'no-show': 'No-show' };
const TERMINAL = new Set<AppointmentStatus>(['completed', 'cancelled', 'no-show']);

/**
 * CivicAppointment, redesigned (v3): a **dense appointment line**. A status dot,
 * the service + date·time over an office·status subtitle, and a compact Check in —
 * hairline-bordered for a list. The opposite of v2's card. Status is dot + word,
 * never color alone. Same props, token-only.
 */
export const CivicAppointmentV3 = React.forwardRef<HTMLDivElement, CivicAppointmentV3Props>(
  function CivicAppointmentV3({ service, office, date, time, status = 'scheduled', location, reference, onCheckIn, onReschedule, className, ...rest }, ref) {
    void location;
    void reference;
    void onReschedule;
    const sub = [LABEL[status], office].filter((s): s is string => !!s).join(' · ');
    return (
      <div ref={ref} data-xen-civic-appointment="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
        <span className={cn('inline-block h-2.5 w-2.5 shrink-0 rounded-full', DOT[status])} aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{service} · <span className="font-normal text-muted">{date} {time}</span></p>
          {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
        </div>
        {!TERMINAL.has(status) && onCheckIn ? <Button size="sm" variant="ghost" onClick={onCheckIn}>Check in</Button> : null}
      </div>
    );
  }
);
