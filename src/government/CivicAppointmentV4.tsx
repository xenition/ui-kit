import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { AppointmentStatus, CivicAppointmentProps } from './CivicAppointment';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  isAdverse,
  labelledId,
  spokenLine,
  tintGround,
  tintInkClass,
  type ToneV4,
} from './internal/civic-v4';

export interface CivicAppointmentV4Props extends CivicAppointmentProps {
  /** Why the appointment was recorded as a no-show. Rendered and announced when adverse. */
  reason?: string;
  /** Override the six status words — `'Scheduled'`, `'No-show'`, … */
  statusLabels?: Partial<Record<AppointmentStatus, string>>;
  /** How "Check in" names itself once armed. Default `'Confirm check-in'`. */
  confirmCheckInLabel?: string;
  /** What the queue reference is called. Default `'Reference'`. */
  referenceLabel?: string;
}

/**
 * Status → word, glyph and tone.
 *
 * `scheduled` and `checked-in` are `neutral`: they are positions in a booking's
 * life, and a brand-coloured pill next to a green Confirmed reads as a rival
 * outcome.
 */
const STATUS_V4: Record<AppointmentStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  scheduled: { label: 'Scheduled', glyph: '📅', tone: IDENTITY_TONE },
  confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
  'checked-in': { label: 'Checked in', glyph: '📍', tone: IDENTITY_TONE },
  completed: { label: 'Completed', glyph: '🏁', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
  'no-show': { label: 'No-show', glyph: '!', tone: 'danger' },
};

const TERMINAL: AppointmentStatus[] = ['completed', 'cancelled', 'no-show'];

/**
 * **V4 civic appointment** — the web twin of the native `CivicAppointmentV4`,
 * same props as {@link CivicAppointment} plus `reason`, `statusLabels`,
 * `confirmCheckInLabel` and `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **A no-show says why, and announces.** It is one of the module's five
 *    rejection states — the one that costs a claimant their slot and often a
 *    fee — and not one of the five interfaces had a field for the reason, on a
 *    component that had no live region at all. `reason` renders under the
 *    header whenever {@link isAdverse} is true and joins a polite announcement
 *    that arrives one commit after mount, because a live region announces
 *    *changes* and text present at first paint speaks to nobody.
 * 2. **Checking in takes a confirming press.** Checking in early at a DMV
 *    forfeits the slot, and nothing guarded the misfire: one tap on a ~32px
 *    target, no confirm, no pending state, no undo. The control arms first,
 *    renames itself, and disarms on blur.
 * 3. **The queue reference is labelled.** `#A-042` is a glyph and a string; a
 *    reader now hears "Reference A-042" and knows what to say at the counter.
 * 4. **Both actions clear 44.** `size="sm"` is about 32px and neither `Button`
 *    primitive sets a minimum height — and this is a control tapped in a queue,
 *    standing up, holding a folder.
 * 5. **A stage stops wearing the brand colour.** Scheduled and Checked in are
 *    positions, not verdicts; identity takes the neutral chip so Confirmed →
 *    success and No-show → danger remain the only coloured signals, and the
 *    leading disc stops being `bg-primary-50`, a ramp step that mirrors under
 *    `[data-theme="dark"]`.
 */
export const CivicAppointmentV4 = React.forwardRef<HTMLDivElement, CivicAppointmentV4Props>(
  function CivicAppointmentV4(
    {
      service,
      office,
      date,
      time,
      status = 'scheduled',
      location,
      reference,
      onCheckIn,
      onReschedule,
      reason,
      statusLabels,
      confirmCheckInLabel = 'Confirm check-in',
      referenceLabel = 'Reference',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const [armed, setArmed] = React.useState(false);

    const sd = STATUS_V4[status] ?? STATUS_V4.scheduled;
    const word = statusLabels?.[status] ?? sd.label;
    const terminal = TERMINAL.includes(status);
    const showActions = !terminal && (onCheckIn != null || onReschedule != null);
    const referenceText = labelledId(referenceLabel, reference);
    const adverse = isAdverse(status);
    const why = adverse ? reason : undefined;
    const checkInWord = armed ? confirmCheckInLabel : 'Check in';

    const announcement = spokenLine([
      service,
      office,
      `${date} ${time}`,
      word,
      why,
      referenceText,
    ]);
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
      setAnnounced(adverse ? announcement : '');
    }, [adverse, announcement]);

    return (
      <CardV4 ref={ref} variant={CARD_V4} className={className} {...rest}>
        <span role="status" aria-live="polite" className="sr-only">
          {announced}
        </span>

        <div className="flex items-start gap-md">
          <span
            aria-hidden
            className="flex w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] py-sm"
            style={{ background: tintGround(sd.tone) }}
          >
            <IconV4 glyph="📅" size="lg" className={tintInkClass(sd.tone)} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{service}</p>
            <p className="truncate text-sm text-muted-text">{office}</p>
            <p className="text-sm font-semibold text-on-surface">
              {date} · {time}
            </p>
            {location != null ? (
              <p className="text-xs text-muted-text">
                <span aria-hidden="true">📍</span> {location}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-xs">
            <BadgeV4 tone={sd.tone} {...BADGE_V4}>
              {`${sd.glyph} ${word}`}
            </BadgeV4>
            {referenceText != null ? (
              <span className="text-xs text-muted-text">{referenceText}</span>
            ) : null}
          </div>
        </div>

        {why != null ? (
          <p className={cn('mt-sm text-sm font-medium', tintInkClass(sd.tone))}>{why}</p>
        ) : null}

        {showActions ? (
          <div className="mt-md flex flex-wrap justify-end gap-sm">
            {onReschedule != null ? (
              <ButtonV4
                size="md"
                variant="outline"
                aria-label={spokenLine(['Reschedule', service, `${date} ${time}`])}
                onClick={onReschedule}
              >
                Reschedule
              </ButtonV4>
            ) : null}
            {onCheckIn != null ? (
              <ButtonV4
                size="md"
                aria-label={spokenLine([checkInWord, service, office])}
                onClick={() => {
                  // Checking in early forfeits the slot, so the first press
                  // only arms.
                  if (!armed) {
                    setArmed(true);
                    return;
                  }
                  setArmed(false);
                  onCheckIn();
                }}
                // Walking away from an armed check-in disarms it.
                onBlur={() => setArmed(false)}
              >
                {checkInWord}
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </CardV4>
    );
  }
);
