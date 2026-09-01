import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import type { AppointmentCardProps, AppointmentStatus, AppointmentMode } from './AppointmentCard';

/** V4 layout choices for the "clinic" design. */
export type AppointmentCardLayout = 'full' | 'compact';

/** Drop-in for {@link AppointmentCardProps} — same props, the V4 "clinic" design. */
export interface AppointmentCardV4Props extends AppointmentCardProps {
  /** V4 layout: `full` (card, default) or `compact` (dense single row). */
  variant?: AppointmentCardLayout;
}

const STATUS_META: Record<AppointmentStatus, { label: string; tone: BadgeTone }> = {
  upcoming: { label: 'Upcoming', tone: 'primary' },
  confirmed: { label: 'Confirmed', tone: 'success' },
  completed: { label: 'Completed', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};
const MODE_META: Record<AppointmentMode, { glyph: string; label: string }> = {
  'in-person': { glyph: '🏥', label: 'In person' },
  video: { glyph: '📹', label: 'Video visit' },
  phone: { glyph: '📞', label: 'Phone call' },
};

/**
 * AppointmentCard — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on an appointment: an elevated rounded card with a soft
 * shadow, clinician identity, a date-time strip with a delivery-mode glyph, a
 * labelled status badge (never color alone), and one dominant action. Honors the
 * V4 `variant` — `full` (card, default) and `compact` (a dense single row) —
 * identical props/behavior to {@link AppointmentCardProps}. For a `video`
 * appointment the CTA reads "Join call". All colors from `--xen-*` token classes
 * (no literals). Informational UI only — not a medical device.
 */
export const AppointmentCardV4 = React.forwardRef<HTMLDivElement, AppointmentCardV4Props>(function AppointmentCardV4(
  { doctorName, specialty, doctorAvatar, date, time, mode = 'in-person', status = 'upcoming', location, loading = false, onBook, onReschedule, bookLabel, variant = 'full', className, ...rest },
  ref
) {
  const statusMeta = STATUS_META[status] ?? STATUS_META.upcoming;
  const modeMeta = MODE_META[mode] ?? MODE_META['in-person'];
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

  if (loading) {
    return (
      <div ref={ref} data-xen-appointment-card="" aria-label="Loading appointment" aria-busy="true" className={cn(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)} {...rest}>
        <div className="h-4 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        <div className="h-3 w-2/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        <div className="h-10 w-full rounded-[var(--xen-radius-md)] bg-neutral-100" />
      </div>
    );
  }

  const canAct = status === 'upcoming' || status === 'confirmed';
  const isVideo = mode === 'video';
  const ctaLabel = bookLabel ?? (isVideo ? 'Join call' : 'Book');
  const a11y = `${modeMeta.label} appointment with ${doctorName}${specialty ? `, ${specialty}` : ''}, ${date} at ${time}, ${statusMeta.label}`;

  // ── compact: dense single row ──
  if (variant === 'compact') {
    return (
      <div ref={ref} data-xen-appointment-card="" aria-label={a11y} className={cn(shell, 'flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]', className)} {...rest}>
        <Avatar src={doctorAvatar} name={doctorName} size="sm" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-bold text-on-surface">{doctorName}</span>
          <span className="truncate text-xs tabular-nums text-muted">
            <span aria-hidden="true">{modeMeta.glyph}</span> {date} · {time}
          </span>
        </div>
        <Badge tone={statusMeta.tone} variant="soft">{statusMeta.label}</Badge>
      </div>
    );
  }

  return (
    <div ref={ref} data-xen-appointment-card="" aria-label={a11y} className={cn(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)} {...rest}>
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <Avatar src={doctorAvatar} name={doctorName} size="md" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-on-surface">{doctorName}</span>
          {specialty ? <span className="truncate text-sm text-muted">{specialty}</span> : null}
        </div>
        <Badge tone={statusMeta.tone} variant="soft">{statusMeta.label}</Badge>
      </div>

      <div className="flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
        <Icon glyph={modeMeta.glyph} size="base" />
        <span className="text-sm font-semibold tabular-nums text-on-surface">{date} · {time}</span>
        <span className="text-xs text-muted">{modeMeta.label}</span>
      </div>

      {location ? <span className="truncate text-sm text-muted">📍 {location}</span> : null}

      {canAct && (onBook || onReschedule) ? (
        <div className="flex gap-[var(--xen-space-sm)]">
          {onBook ? (
            <Button variant="primary" className="flex-1" onClick={() => onBook()}>{ctaLabel}</Button>
          ) : null}
          {onReschedule ? (
            <Button variant="outline" className="flex-1" onClick={() => onReschedule()}>Reschedule</Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
