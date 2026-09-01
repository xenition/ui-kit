import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { goalPct } from './internal';
import type { VolunteerShiftProps } from './VolunteerShift';

/** Drop-in for {@link VolunteerShiftProps} — same props, the V4 "rally" design. */
export type VolunteerShiftV4Props = VolunteerShiftProps;

/**
 * VolunteerShift — **V4** "rally" design (web parity of the native V4). The
 * warm, mission-driven take on a volunteer-shift row: an elevated rounded row
 * (soft shadow, clean surface — no gradient) with a leading calendar glyph in a
 * soft-primary well, a bold role title, muted date/time/location meta, a
 * slots-filled meter, and a primary sign-up / outline cancel CTA (≥44px).
 * Status is read via a glyph + a labelled Badge + token color (never color
 * alone): a signed-up viewer gets a success "Signed up" badge, a full shift a
 * danger "Full" badge with the action disabled; the signed-up state is also
 * announced via `aria-pressed`. Honors every prop of
 * {@link VolunteerShiftProps}; capacity fill is guarded and clamped. All colors
 * from `--xen-*` token classes (no literals).
 */
export const VolunteerShiftV4 = React.forwardRef<HTMLDivElement, VolunteerShiftV4Props>(
  function VolunteerShiftV4(
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
          'flex flex-row items-start gap-md rounded-lg border border-border bg-surface p-md shadow-md',
          className
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10"
        >
          <Icon glyph="🙌" size="lg" />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-sm">
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
                className="h-1.5 w-full overflow-hidden rounded-full bg-primary/15"
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
      </div>
    );
  }
);
