import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { SLOT_BORDER_T, type PetSlot } from './_tokens';

export type VetAppointmentStatus = 'upcoming' | 'today' | 'completed' | 'cancelled';
export type VetVisitReason = 'checkup' | 'vaccination' | 'surgery' | 'dental' | 'emergency' | 'grooming' | 'other';

interface StatusMeta {
  label: string;
  tone: 'primary' | 'warn' | 'success' | 'neutral';
  slot: PetSlot;
}

const STATUS_META: Record<VetAppointmentStatus, StatusMeta> = {
  upcoming: { label: 'Upcoming', tone: 'primary', slot: 'primary' },
  today: { label: 'Today', tone: 'warn', slot: 'warn' },
  completed: { label: 'Completed', tone: 'success', slot: 'success' },
  cancelled: { label: 'Cancelled', tone: 'neutral', slot: 'muted' },
};

const REASON_GLYPH: Record<VetVisitReason, string> = {
  checkup: '🩺',
  vaccination: '💉',
  surgery: '🔪',
  dental: '🦷',
  emergency: '🚑',
  grooming: '✂️',
  other: '📋',
};

export interface VetAppointmentCardProps {
  /** Vet or veterinary clinic name. */
  vetName: string;
  /** Clinic / location line. */
  clinic?: string;
  /** Reason for the visit; drives the icon. */
  reason: VetVisitReason;
  /** Appointment date (already formatted). */
  date: string;
  /** Appointment time (already formatted). */
  time?: string;
  /** Lifecycle status; drives the chip + accent. */
  status: VetAppointmentStatus;
  /** Pet name shown as a sub-label. */
  petName?: string;
  /** Optional notes / preparation instructions. */
  notes?: string;
  /** Primary action label (confirm/reschedule) — hidden when the visit is closed. */
  actionLabel?: string;
  onAction?: () => void;
  /** Secondary cancel action for open appointments. */
  onCancel?: () => void;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * A vet-visit card: reason icon, vet + clinic, the scheduled date/time, and a
 * status chip. Open visits (`upcoming`/`today`) expose confirm + cancel actions;
 * `completed`/`cancelled` visits are read-only. Status reads via a labelled chip
 * plus a top accent bar. Token-only colors.
 */
export const VetAppointmentCard = React.forwardRef<HTMLDivElement, VetAppointmentCardProps>(
  function VetAppointmentCard(
    { vetName, clinic, reason, date, time, status, petName, notes, actionLabel = 'Confirm', onAction, onCancel, className },
    ref
  ) {
    const meta = STATUS_META[status];
    const open = status === 'upcoming' || status === 'today';

    return (
      <div
        ref={ref}
        aria-label={`${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`}
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border border-t-[3px] rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
          SLOT_BORDER_T[meta.slot],
          status === 'cancelled' && 'opacity-70',
          className
        )}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span className="text-xl" aria-hidden="true">
            {REASON_GLYPH[reason]}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-on-surface">{vetName}</p>
            {clinic ? <p className="truncate text-sm text-muted">{clinic}</p> : null}
          </div>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>

        <p className="text-base font-semibold text-on-surface">
          📅 {date}
          {time ? ` · ${time}` : ''}
        </p>

        {petName ? <p className="text-sm text-muted">For {petName}</p> : null}
        {notes ? <p className="line-clamp-3 text-sm text-muted">{notes}</p> : null}

        {open && (onAction || onCancel) ? (
          <div className="flex gap-[var(--xen-space-sm)]">
            {onAction ? (
              <Button variant="primary" size="sm" className="flex-1" onClick={onAction}>
                {actionLabel}
              </Button>
            ) : null}
            {onCancel ? (
              <Button variant="outline" size="sm" className="flex-1" onClick={onCancel}>
                Cancel
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
