import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { VetAppointmentCardProps, VetAppointmentStatus, VetVisitReason } from './VetAppointmentCard';

/** Same public contract as {@link VetAppointmentCard} — a drop-in alternate design. */
export type VetAppointmentCardV3Props = VetAppointmentCardProps;

const STATUS_DOT: Record<VetAppointmentStatus, string> = {
  upcoming: 'bg-primary', today: 'bg-warn', completed: 'bg-neutral-400', cancelled: 'bg-danger',
};
const STATUS_LABEL: Record<VetAppointmentStatus, string> = {
  upcoming: 'Upcoming', today: 'Today', completed: 'Completed', cancelled: 'Cancelled',
};
const REASON_GLYPH: Record<VetVisitReason, string> = {
  checkup: '🩺', vaccination: '💉', surgery: '🔪', dental: '🦷', emergency: '🚑', grooming: '✂️', other: '🐾',
};

/**
 * VetAppointmentCard, redesigned (v3): a **dense visit line**. A reason glyph
 * leads, the vet + date·time share a line over a status dot + word · pet
 * subtitle, and a compact action hugs the right — hairline-bordered for a
 * schedule. The opposite of v2's card. Status is dot + word, never color alone.
 * Same props, token-only.
 */
export const VetAppointmentCardV3 = React.forwardRef<HTMLDivElement, VetAppointmentCardV3Props>(
  function VetAppointmentCardV3(
    { vetName, clinic, reason, date, time, status, petName, notes, actionLabel, onAction, onCancel, className },
    ref
  ) {
    void clinic;
    void notes;
    void onCancel;
    const closed = status === 'completed' || status === 'cancelled';
    const sub = [STATUS_LABEL[status], petName].filter((s): s is string => !!s);

    return (
      <div ref={ref} data-xen-vet-appointment-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}>
        <span aria-hidden className="text-lg leading-none">{REASON_GLYPH[reason]}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">
            {vetName} · <span className="font-normal text-muted">{date}{time ? ` ${time}` : ''}</span>
          </p>
          <p className="flex items-center gap-1.5 truncate text-xs text-muted">
            <span className={cn('inline-block h-2 w-2 rounded-full', STATUS_DOT[status])} aria-hidden />
            {sub.join(' · ')}
          </p>
        </div>
        {!closed && onAction ? (
          <Button size="sm" variant="ghost" onClick={onAction}>
            {actionLabel ?? 'Confirm'}
          </Button>
        ) : null}
      </div>
    );
  }
);
