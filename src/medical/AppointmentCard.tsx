import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';

export type AppointmentStatus = 'upcoming' | 'confirmed' | 'completed' | 'cancelled';
export type AppointmentMode = 'in-person' | 'video' | 'phone';

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

export interface AppointmentCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Clinician name shown as the appointment owner. */
  doctorName: string;
  /** Clinician specialty, e.g. "Cardiology". */
  specialty?: string;
  /** Optional avatar image URL for the clinician. */
  doctorAvatar?: string;
  /** Human-readable date, e.g. "Mon, 24 Aug". */
  date: string;
  /** Human-readable time, e.g. "10:30 AM". */
  time: string;
  /** Delivery mode; drives the icon + label. Defaults to `in-person`. */
  mode?: AppointmentMode;
  /** Lifecycle status; drives the badge tone/label. Defaults to `upcoming`. */
  status?: AppointmentStatus;
  /** Optional location / clinic line. */
  location?: string;
  /** Skeleton placeholder while the appointment loads. */
  loading?: boolean;
  /** Fires when the primary CTA is pressed (book / join) — web mirror of native `onBook`. */
  onBook?: () => void;
  /** Fires when the secondary reschedule action is pressed. */
  onReschedule?: () => void;
  /** Overrides the primary CTA label. */
  bookLabel?: string;
}

/**
 * A single appointment summary card for clinical / telehealth schedules — the
 * web (React DOM) mirror of the native `AppointmentCard`. Shows clinician
 * identity, a date-time strip, a delivery-mode chip (in-person / video /
 * phone), a status badge, and one dominant action. For a `video` appointment
 * the CTA reads "Join call"; otherwise "Book" (a completed / cancelled state
 * hides the actions). Status is carried by text + badge, never color alone.
 * Composes `Card`, `Avatar`, `Badge`, and `Button`; every color is a `--xen-*`
 * token class. Informational UI only — not a medical device.
 */
export const AppointmentCard = React.forwardRef<HTMLDivElement, AppointmentCardProps>(
  function AppointmentCard(
    {
      doctorName,
      specialty,
      doctorAvatar,
      date,
      time,
      mode = 'in-person',
      status = 'upcoming',
      location,
      loading = false,
      onBook,
      onReschedule,
      bookLabel,
      className,
      ...rest
    },
    ref
  ) {
    const statusMeta = STATUS_META[status] ?? STATUS_META.upcoming;
    const modeMeta = MODE_META[mode] ?? MODE_META['in-person'];

    if (loading) {
      return (
        <Card
          ref={ref}
          data-xen-appointment-card=""
          aria-label="Loading appointment"
          aria-busy="true"
          className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
          {...rest}
        >
          <div className="h-4 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-3 w-2/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-10 w-full rounded-[var(--xen-radius-md)] bg-neutral-100" />
        </Card>
      );
    }

    const canAct = status === 'upcoming' || status === 'confirmed';
    const isVideo = mode === 'video';
    const ctaLabel = bookLabel ?? (isVideo ? 'Join call' : 'Book');
    const a11y = `${modeMeta.label} appointment with ${doctorName}${
      specialty ? `, ${specialty}` : ''
    }, ${date} at ${time}, ${statusMeta.label}`;

    return (
      <Card
        ref={ref}
        data-xen-appointment-card=""
        aria-label={a11y}
        className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <Avatar src={doctorAvatar} name={doctorName} size="md" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-base font-bold text-on-surface">{doctorName}</span>
            {specialty ? <span className="truncate text-sm text-muted">{specialty}</span> : null}
          </div>
          <Badge tone={statusMeta.tone}>{statusMeta.label}</Badge>
        </div>

        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <Icon glyph={modeMeta.glyph} size="base" />
          <span className="text-sm font-semibold text-on-surface">
            {date} · {time}
          </span>
          <span className="text-xs text-muted">{modeMeta.label}</span>
        </div>

        {location ? (
          <span className="truncate text-sm text-muted">📍 {location}</span>
        ) : null}

        {canAct && (onBook || onReschedule) ? (
          <div className="flex gap-[var(--xen-space-sm)]">
            {onBook ? (
              <Button variant="primary" className="flex-1" onClick={() => onBook()}>
                {ctaLabel}
              </Button>
            ) : null}
            {onReschedule ? (
              <Button variant="outline" className="flex-1" onClick={() => onReschedule()}>
                Reschedule
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
