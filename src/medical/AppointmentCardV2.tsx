import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Button } from '../primitives';
import type { BadgeTone } from '../primitives';
import type { AppointmentCardProps, AppointmentStatus, AppointmentMode } from './AppointmentCard';

/** Same public contract as {@link AppointmentCard} — a drop-in alternate design. */
export type AppointmentCardV2Props = AppointmentCardProps;

const STATUS: Record<AppointmentStatus, { label: string; tone: BadgeTone }> = {
  upcoming: { label: 'Upcoming', tone: 'primary' },
  confirmed: { label: 'Confirmed', tone: 'success' },
  completed: { label: 'Completed', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};
const MODE: Record<AppointmentMode, { glyph: string; label: string }> = {
  'in-person': { glyph: '🏥', label: 'In person' },
  video: { glyph: '📹', label: 'Video' },
  phone: { glyph: '📞', label: 'Phone' },
};

/**
 * AppointmentCard, redesigned (v2): an **elevated card with a date medallion**. A
 * primary-tinted date/time block leads on the left; the clinician avatar, name,
 * specialty, mode chip, and status badge sit to the right, with Book/Reschedule
 * anchoring the card. Distinct from v1's stacked row. Same props, token-only.
 */
export const AppointmentCardV2 = React.forwardRef<HTMLDivElement, AppointmentCardV2Props>(
  function AppointmentCardV2(
    { doctorName, specialty, doctorAvatar, date, time, mode = 'in-person', status = 'upcoming', location, loading = false, onBook, onReschedule, bookLabel, className, ...rest },
    ref
  ) {
    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-appointment-card=""
          aria-label="Loading appointment"
          className={cn('flex gap-3 rounded-lg bg-surface p-md shadow-md', className)}
          {...rest}
        >
          <div className="h-16 w-16 animate-pulse rounded-md bg-neutral-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/2 animate-pulse rounded-sm bg-neutral-200" />
            <div className="h-3 w-1/3 animate-pulse rounded-sm bg-neutral-200" />
          </div>
        </div>
      );
    }

    const st = STATUS[status];
    const md = MODE[mode];

    return (
      <div
        ref={ref}
        data-xen-appointment-card=""
        className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className)}
        {...rest}
      >
        <div className="flex gap-3">
          <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 py-2 text-center">
            <span className="text-xs font-semibold text-primary">{date}</span>
            <span className="text-sm font-bold text-on-surface">{time}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Avatar src={doctorAvatar} name={doctorName} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-on-surface">{doctorName}</p>
                {specialty ? <p className="truncate text-xs text-muted">{specialty}</p> : null}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">
                {md.glyph} {md.label}
              </span>
              <Badge tone={st.tone}>{st.label}</Badge>
            </div>
            {location ? <p className="mt-1 truncate text-xs text-muted">📍 {location}</p> : null}
          </div>
        </div>
        {(onBook || onReschedule) ? (
          <div className="flex gap-2">
            {onBook ? (
              <Button size="md" variant="primary" className="flex-1" onClick={onBook}>
                {bookLabel ?? (mode === 'video' ? 'Join' : 'Book')}
              </Button>
            ) : null}
            {onReschedule ? (
              <Button size="md" variant="outline" className="flex-1" onClick={onReschedule}>
                Reschedule
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
