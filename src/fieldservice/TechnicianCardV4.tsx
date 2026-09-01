import * as React from 'react';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import type { AvatarStatus } from '../primitives/Avatar';
import { BADGE_V4, discGround, type ToneV4 } from './internal/job-v4';
import type { TechnicianCardProps, TechnicianStatus } from './TechnicianCard';

export interface TechnicianCardV4Props extends TechnicianCardProps {
  /** The call action's label. Default `'Call'`. */
  callLabel?: string;
  /** The assign action's label. Default `'Assign'`. */
  assignLabel?: string;
  /** Format the phone number for display. Defaults to the number as given. */
  formatPhone?: (phone: string) => string;
}

/**
 * Availability → word, glyph, tone and the **`Avatar` presence value**.
 *
 * `presence` is an {@link AvatarStatus} and is handed to `AvatarV4` rather than
 * being painted from a second table. The base kept its own map, in which
 * `busy` was `bg-primary` — blue — while `Avatar`'s own `busy` is red, so the
 * same technician had two different dots depending on which component drew
 * them.
 */
const TECH_STATUS_V4: Record<
  TechnicianStatus,
  { label: string; glyph: string; tone: ToneV4; presence: AvatarStatus }
> = {
  available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
  'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
  'en-route': { label: 'En route', glyph: '→', tone: 'primary', presence: 'away' },
  offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};

/**
 * **V4 technician card** — the web twin of the native `TechnicianCardV4`, same
 * props as {@link TechnicianCard} plus `callLabel`, `assignLabel` and
 * `formatPhone`.
 *
 * ## Five changes
 *
 * 1. **The `phone` it accepts is the phone it shows.** The number was used
 *    only as a boolean gate: it was never rendered, and a dispatcher who wired
 *    `onCall` without one silently got no Call button at all. It is now a meta
 *    line through `formatPhone`, and Call is gated on `onCall` alone.
 * 2. **One presence palette.** See {@link TECH_STATUS_V4} — the dot is
 *    `Avatar`'s `status`, which is also the only way it stays in step when the
 *    avatar's own dot moves.
 * 3. **The dot is not a second reader stop.** It carried `role="img"` and the
 *    status label, so the availability was announced from the dot and then
 *    again from the pill beside the name.
 * 4. **Skills are a neutral chip.** They were `text-primary` — a *fill* token
 *    used as ink, with no contrast promise — on a brand wash, which also spent
 *    the brand colour on a list of certifications.
 * 5. **Both actions clear 44** and take their labels from props.
 */
export const TechnicianCardV4 = React.forwardRef<HTMLDivElement, TechnicianCardV4Props>(
  function TechnicianCardV4(
    {
      name,
      role,
      status,
      avatarUrl,
      skills,
      jobsToday,
      phone,
      onCall,
      onAssign,
      callLabel = 'Call',
      assignLabel = 'Assign',
      formatPhone = (value: string) => value,
      className,
      style,
    },
    ref
  ) {
    const sd = TECH_STATUS_V4[status] ?? TECH_STATUS_V4.offline;
    const skillList = Array.isArray(skills) ? skills : [];
    const showActions = onCall != null || onAssign != null;

    return (
      <CardV4 ref={ref} className={className} style={style}>
        <div className="flex items-center gap-md">
          <AvatarV4 src={avatarUrl} name={name} size="lg" status={sd.presence} />
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <span className="truncate font-heading text-lg font-bold text-on-card">{name}</span>
            {role != null ? (
              <span className="truncate text-sm text-muted-text">{role}</span>
            ) : null}
            {phone != null ? (
              <span className="truncate text-xs text-muted-text">📞 {formatPhone(phone)}</span>
            ) : null}
            {jobsToday != null ? (
              <span className="text-xs text-muted-text">
                🗒 {Math.max(0, Math.trunc(jobsToday))} jobs today
              </span>
            ) : null}
          </div>
          <BadgeV4 tone={sd.tone} {...BADGE_V4}>
            {`${sd.glyph} ${sd.label}`}
          </BadgeV4>
        </div>

        {skillList.length > 0 ? (
          <div className="mt-md flex flex-wrap gap-xs">
            {skillList.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="rounded-[var(--xen-radius-full)] px-sm py-xs text-xs font-medium text-on-card"
                style={{ background: discGround('neutral') }}
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}

        {showActions ? (
          <div className="mt-md flex gap-sm">
            {onCall != null ? (
              <ButtonV4 variant="outline" size="md" onClick={onCall} className="flex-1">
                {callLabel}
              </ButtonV4>
            ) : null}
            {onAssign != null ? (
              <ButtonV4 variant="primary" size="md" onClick={onAssign} className="flex-1">
                {assignLabel}
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </CardV4>
    );
  }
);
