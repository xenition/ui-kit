import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { toBadgeTone } from './_tokens';
import type { VetAppointmentCardProps, VetAppointmentStatus, VetVisitReason } from './VetAppointmentCard';

/** V4 layout choices for the "companion" design. */
export type VetAppointmentCardLayout = 'card' | 'compact';

/** Drop-in for {@link VetAppointmentCardProps} — same props, the V4 "companion" design. */
export interface VetAppointmentCardV4Props extends VetAppointmentCardProps {
  /** V4 layout: `card` (default) or `compact` (dense single row). */
  variant?: VetAppointmentCardLayout;
}

const STATUS_META: Record<VetAppointmentStatus, { label: string; tone: 'primary' | 'warn' | 'success' | 'neutral' }> = {
  upcoming: { label: 'Upcoming', tone: 'primary' },
  today: { label: 'Today', tone: 'warn' },
  completed: { label: 'Completed', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'neutral' },
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

/**
 * VetAppointmentCard — **V4** "companion" design (web parity of the native V4).
 * The warm, friendly take on a vet visit: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the reason glyph in a soft-primary
 * tinted well, a bold vet name, muted meta lines (date/time/pet/clinic), a
 * labelled status Badge, and the notes shown as a soft-primary chip. Open visits
 * (`upcoming`/`today`) keep the confirm + cancel actions. Same props/behavior as
 * {@link VetAppointmentCardProps}; status + reason both read via glyph + labelled
 * chip (never color alone). All colors from `--xen-*` token classes (no literals).
 */
export const VetAppointmentCardV4 = React.forwardRef<HTMLDivElement, VetAppointmentCardV4Props>(
  function VetAppointmentCardV4(
    { vetName, clinic, reason, date, time, status, petName, notes, actionLabel = 'Confirm', onAction, onCancel, className, variant = 'card' },
    ref
  ) {
    const meta = STATUS_META[status];
    const open = status === 'upcoming' || status === 'today';
    const a11y = `${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`;

    const glyphWell = (size: string) => (
      <span
        className={cn('flex shrink-0 items-center justify-center rounded-full bg-primary/10', size)}
        aria-hidden="true"
      >
        {REASON_GLYPH[reason]}
      </span>
    );

    const statusBadge = (
      <Badge tone={toBadgeTone(meta.tone)} variant="soft">
        {meta.label}
      </Badge>
    );

    // ── compact ───────────────────────────────────────────────────────────────
    if (variant === 'compact') {
      const metaLine = clinic || (petName ? `For ${petName}` : undefined);
      return (
        <div
          ref={ref}
          aria-label={a11y}
          className={cn(
            'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-sm)] shadow-md',
            status === 'cancelled' && 'opacity-70',
            className
          )}
        >
          {glyphWell('h-9 w-9 text-lg')}
          <div className="flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]">
            <p className="truncate text-sm font-bold text-on-surface">{vetName}</p>
            {metaLine ? <p className="truncate text-xs text-muted">{metaLine}</p> : null}
          </div>
          {statusBadge}
          <p className="shrink-0 text-sm font-semibold text-on-surface">
            {time ? time : date}
          </p>
        </div>
      );
    }

    // ── card (default) ─────────────────────────────────────────────────────────
    return (
      <div
        ref={ref}
        aria-label={a11y}
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md',
          status === 'cancelled' && 'opacity-70',
          className
        )}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          {glyphWell('h-11 w-11 text-xl')}
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-on-surface">{vetName}</p>
            {clinic ? <p className="truncate text-sm text-muted">📍 {clinic}</p> : null}
          </div>
          {statusBadge}
        </div>

        <p className="text-base font-semibold text-on-surface">
          📅 {date}
          {time ? ` · ${time}` : ''}
        </p>

        {petName ? <p className="text-sm text-muted">For {petName}</p> : null}

        {notes ? (
          <span className="inline-flex max-w-full items-center self-start rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface">
            <span className="line-clamp-3">{notes}</span>
          </span>
        ) : null}

        {open && (onAction || onCancel) ? (
          <div className="mt-[var(--xen-space-xs)] flex gap-[var(--xen-space-sm)]">
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
