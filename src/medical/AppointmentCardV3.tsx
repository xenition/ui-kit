import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { AppointmentCardProps, AppointmentStatus, AppointmentMode } from './AppointmentCard';

/** Same public contract as {@link AppointmentCard} — a drop-in alternate design. */
export type AppointmentCardV3Props = AppointmentCardProps;

const STATUS_DOT: Record<AppointmentStatus, string> = {
  upcoming: 'bg-primary',
  confirmed: 'bg-success',
  completed: 'bg-neutral-400',
  cancelled: 'bg-danger',
};
const STATUS_LABEL: Record<AppointmentStatus, string> = {
  upcoming: 'Upcoming',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
};
const MODE_GLYPH: Record<AppointmentMode, string> = { 'in-person': '🏥', video: '📹', phone: '📞' };

/**
 * AppointmentCard, redesigned (v3): a **dense agenda line**. A mode glyph leads,
 * the clinician + date·time share a line over a specialty·location subtitle, a
 * status dot + word marks state (never color alone), and a compact CTA hugs the
 * right. Hairline-bordered for schedule lists. Same props, token-only.
 */
export const AppointmentCardV3 = React.forwardRef<HTMLDivElement, AppointmentCardV3Props>(
  function AppointmentCardV3(
    { doctorName, specialty, doctorAvatar, date, time, mode = 'in-person', status = 'upcoming', location, loading = false, onBook, onReschedule, bookLabel, className, ...rest },
    ref
  ) {
    void doctorAvatar;
    void onReschedule;

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-appointment-card=""
          aria-label="Loading appointment"
          className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}
          {...rest}
        >
          <div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-200" />
        </div>
      );
    }

    const sub = [specialty, location].filter((s): s is string => !!s);

    return (
      <div
        ref={ref}
        data-xen-appointment-card=""
        className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}
        {...rest}
      >
        <span aria-hidden className="text-lg leading-none">
          {MODE_GLYPH[mode]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">
            {doctorName} · <span className="font-normal text-muted">{date} {time}</span>
          </p>
          <p className="flex items-center gap-1.5 truncate text-xs text-muted">
            <span className={cn('inline-block h-2 w-2 rounded-full', STATUS_DOT[status])} aria-hidden />
            {STATUS_LABEL[status]}
            {sub.length > 0 ? ` · ${sub.join(' · ')}` : ''}
          </p>
        </div>
        {onBook ? (
          <Button size="sm" variant="ghost" onClick={onBook}>
            {bookLabel ?? (mode === 'video' ? 'Join' : 'Book')}
          </Button>
        ) : null}
      </div>
    );
  }
);
