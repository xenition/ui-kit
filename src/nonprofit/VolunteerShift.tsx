import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { goalPct } from './internal';

export interface VolunteerShiftProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Role / task name, e.g. `Food Bank Sorter`. */
  role: string;
  /** Pre-formatted date label, e.g. `Sat, Aug 24`. */
  date?: string;
  /** Pre-formatted time window, e.g. `9:00 AM – 12:00 PM`. */
  time?: string;
  /** Location line. */
  location?: string;
  /** Number of slots already filled. */
  filled?: number;
  /** Total slots available (a zero/negative capacity is guarded). */
  capacity?: number;
  /** Whether the viewer is already signed up for this shift. */
  signedUp?: boolean;
  /** Fires when the viewer clicks to sign up (never fires when full). */
  onSignUp?: () => void;
  /** Fires when a signed-up viewer clicks to cancel. */
  onCancel?: () => void;
  /** Block the action button (web `Button` has no `loading`, so it is disabled). */
  loading?: boolean;
}

/**
 * Web parity of the native `VolunteerShift`: a volunteer-shift row — role,
 * date/time/location meta, a slots-filled meter, and a sign-up / cancel action.
 * Capacity fill is guarded against a zero capacity and clamped. Full shifts are
 * badged and the action is disabled; signed-up state is announced via
 * `aria-pressed` on the action button — not color alone. All colors come from
 * the `--xen-*` token classes — no literal colors.
 */
export const VolunteerShift = React.forwardRef<HTMLDivElement, VolunteerShiftProps>(
  function VolunteerShift(
    {
      role,
      date,
      time,
      location,
      filled = 0,
      capacity = 0,
      signedUp = false,
      onSignUp,
      onCancel,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const hasCapacity = capacity > 0;
    const isFull = hasCapacity && filled >= capacity && !signedUp;
    const pct = goalPct(filled, capacity);
    const metaLine = [date, time].filter(Boolean).join(' · ');

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-sm rounded-md border border-border bg-surface p-md',
          className
        )}
        {...rest}
      >
        <div className="flex flex-wrap items-center gap-sm">
          <span className="text-base font-bold text-on-surface">{role}</span>
          {signedUp ? (
            <Badge tone="success">Signed up</Badge>
          ) : isFull ? (
            <Badge tone="danger">Full</Badge>
          ) : null}
        </div>

        {metaLine ? (
          <div className="flex items-center gap-xs">
            <Icon glyph="🗓️" size="sm" color="muted" />
            <span className="text-sm text-muted">{metaLine}</span>
          </div>
        ) : null}
        {location ? (
          <div className="flex items-center gap-xs">
            <Icon glyph="📍" size="sm" color="muted" />
            <span className="truncate text-sm text-muted">{location}</span>
          </div>
        ) : null}

        {hasCapacity ? (
          <div className="flex flex-col gap-xs">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={capacity}
              aria-valuenow={Math.min(filled, capacity)}
              aria-label={`${filled} of ${capacity} volunteers`}
              className="h-1.5 w-full overflow-hidden rounded-full bg-border"
            >
              <div
                className={cn('h-full rounded-full', isFull ? 'bg-danger' : 'bg-primary')}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-muted">{`${filled} of ${capacity} spots filled`}</span>
          </div>
        ) : null}

        {signedUp ? (
          <Button variant="outline" aria-pressed={true} disabled={loading} onClick={onCancel}>
            Cancel shift
          </Button>
        ) : (
          <Button
            variant="primary"
            aria-pressed={false}
            disabled={isFull || loading}
            onClick={onSignUp}
          >
            {isFull ? 'Shift full' : 'Sign up'}
          </Button>
        )}
      </div>
    );
  }
);
