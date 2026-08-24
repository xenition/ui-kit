import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import type { BadgeTone } from '../primitives';
import type { VetAppointmentCardProps, VetAppointmentStatus, VetVisitReason } from './VetAppointmentCard';

/** Same public contract as {@link VetAppointmentCard} — a drop-in alternate design. */
export type VetAppointmentCardV2Props = VetAppointmentCardProps;

const STATUS: Record<VetAppointmentStatus, { label: string; tone: BadgeTone }> = {
  upcoming: { label: 'Upcoming', tone: 'primary' },
  today: { label: 'Today', tone: 'warn' },
  completed: { label: 'Completed', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};
const REASON_GLYPH: Record<VetVisitReason, string> = {
  checkup: '🩺', vaccination: '💉', surgery: '🔪', dental: '🦷', emergency: '🚑', grooming: '✂️', other: '🐾',
};

/**
 * VetAppointmentCard, redesigned (v2): an **elevated visit card**. A reason glyph
 * tile leads; the vet/clinic + pet name head the body next to a date/time block;
 * a status badge sits top-right; notes and confirm/cancel actions anchor the
 * card. Distinct from v1's row. Same props, token-only.
 */
export const VetAppointmentCardV2 = React.forwardRef<HTMLDivElement, VetAppointmentCardV2Props>(
  function VetAppointmentCardV2(
    { vetName, clinic, reason, date, time, status, petName, notes, actionLabel, onAction, onCancel, className },
    ref
  ) {
    const st = STATUS[status];
    const closed = status === 'completed' || status === 'cancelled';

    return (
      <div ref={ref} data-xen-vet-appointment-card="" className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className)}>
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xl">{REASON_GLYPH[reason]}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-on-surface">{vetName}</p>
            {clinic ? <p className="truncate text-xs text-muted">{clinic}</p> : null}
            {petName ? <p className="truncate text-xs text-muted">For {petName}</p> : null}
          </div>
          <div className="text-right">
            <Badge tone={st.tone}>{st.label}</Badge>
            <p className="mt-1 text-xs font-semibold text-on-surface">{date}</p>
            {time ? <p className="text-xs text-muted">{time}</p> : null}
          </div>
        </div>
        {notes ? <p className="rounded-md bg-neutral-100 px-3 py-2 text-xs text-on-surface">{notes}</p> : null}
        {!closed && (onAction || onCancel) ? (
          <div className="flex gap-2">
            {onAction ? (
              <Button size="md" variant="primary" className="flex-1" onClick={onAction}>
                {actionLabel ?? 'Confirm'}
              </Button>
            ) : null}
            {onCancel ? (
              <Button size="md" variant="outline" className="flex-1" onClick={onCancel}>
                Cancel
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
