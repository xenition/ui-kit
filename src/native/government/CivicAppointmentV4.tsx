import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  isAdverse,
  labelledId,
  spokenLine,
  tintGround,
  tintInk,
  type ToneV4,
} from './internal/civic-v4';
import type { AppointmentStatus, CivicAppointmentProps } from './CivicAppointment';

export interface CivicAppointmentV4Props extends CivicAppointmentProps {
  /** Why the appointment was missed or closed. Rendered when the status is adverse. */
  reason?: string;
  /** Override the six status words (`'Checked in'`, `'No-show'`, …). */
  statusLabels?: Partial<Record<AppointmentStatus, string>>;
  /** What the check-in button says once it is armed. Default `'Confirm check-in'`. */
  confirmCheckInLabel?: string;
  /** What the confirmation number identifies. Default `'Reference'`. */
  referenceLabel?: string;
}

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
 * **V4 civic appointment** — same props as {@link CivicAppointment} plus
 * `reason`, `statusLabels`, `confirmCheckInLabel` and `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **"Check in" takes a confirming press.** Checking in early at a DMV
 *    forfeits the slot, and the base put that one tap on a ~34pt button with
 *    nothing guarding the misfire. The first press arms the button and shows
 *    `confirmCheckInLabel`; the second checks in. Both actions clear 44.
 * 2. **A no-show says why.** It is one of the module's five rejection states
 *    and the only field it had was a red pill — nothing to carry "arrived
 *    after the 15-minute grace period". `isAdverse()` gates the `reason`, and
 *    the line is an assertive live region.
 * 3. **The reference is labelled.** It rendered as `` `#${reference}` ``, so a
 *    reader heard "number A dash 042" with no idea it was the queue ticket to
 *    quote at the desk.
 * 4. **The card is one announced object** — service, office, date, time,
 *    location, status and reference — where the base left seven loose text
 *    nodes a reader walked one at a time, and the two action buttons stay
 *    outside that name so they remain focus stops.
 * 5. **Having an appointment is not an outcome.** `scheduled` was `primary`
 *    and `checked-in` `accent`, and the calendar disc was `primary` as well.
 *    They are `IDENTITY_TONE` now, so `confirmed`, `completed` and `no-show`
 *    are the only states on the card wearing a colour that means something.
 *
 * **Renders nothing without a `service`** (§4.5).
 */
export function CivicAppointmentV4({
  service,
  office,
  date,
  time,
  status = 'scheduled',
  location,
  reference,
  reason,
  statusLabels,
  confirmCheckInLabel = 'Confirm check-in',
  referenceLabel = 'Reference',
  onCheckIn,
  onReschedule,
  style,
}: CivicAppointmentV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const [armed, setArmed] = React.useState(false);
  if (!service) return null;

  const sd = STATUS_V4[status] ?? STATUS_V4.scheduled;
  const statusWord = statusLabels?.[status] ?? sd.label;
  const adverse = isAdverse(status);
  const showReason = adverse && Boolean(reason);
  const idLine = labelledId(referenceLabel, reference);
  const when = metaLine([date, time]);

  const terminal = TERMINAL.includes(status);
  const showActions = !terminal && (onCheckIn != null || onReschedule != null);
  const tap = minTap(tokens.spacing);
  const disc = tokens.spacing['2xl'];

  const spoken = spokenLine([
    service,
    office,
    when,
    location,
    statusWord,
    idLine,
    showReason ? reason : null,
  ]);

  return (
    <CardV4 variant={CARD_V4} style={style}>
      <View
        accessible
        accessibilityLiveRegion={showReason ? 'assertive' : 'none'}
        accessibilityLabel={spoken}
        style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}
      >
        <View
          style={{
            width: disc,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            alignItems: 'center',
            backgroundColor: tintGround(theme, IDENTITY_TONE),
          }}
        >
          {/* Decorative: the card's name already says what it is. */}
          <IconV4 glyph="📅" size="lg" />
        </View>

        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
            {service}
          </TextV4>
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {office}
          </TextV4>
          <TextV4 size="sm" weight="semibold" tone="onSurface">
            {when}
          </TextV4>
          {location ? (
            <TextV4 size="xs" tone="mutedText">
              {`📍 ${location}`}
            </TextV4>
          ) : null}
          {showReason ? (
            <TextV4 size="xs" style={{ color: tintInk(theme, sd.tone) }}>
              {reason}
            </TextV4>
          ) : null}
        </View>

        <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <BadgeV4 tone={sd.tone} {...BADGE_V4}>
            {`${sd.glyph} ${statusWord}`}
          </BadgeV4>
          {idLine ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
              {idLine}
            </TextV4>
          ) : null}
        </View>
      </View>

      {showActions ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            justifyContent: 'flex-end',
          }}
        >
          {onReschedule != null ? (
            <ButtonV4 size="md" variant="outline" onPress={onReschedule} style={{ minHeight: tap }}>
              Reschedule
            </ButtonV4>
          ) : null}
          {onCheckIn != null ? (
            <ButtonV4
              size="md"
              accessibilityLabel={armed ? confirmCheckInLabel : 'Check in'}
              onPress={() => {
                // Checking in early forfeits the slot, and the card offers
                // nothing that undoes it.
                if (!armed) {
                  setArmed(true);
                  return;
                }
                setArmed(false);
                onCheckIn();
              }}
              style={{ minHeight: tap }}
            >
              {armed ? confirmCheckInLabel : 'Check in'}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </CardV4>
  );
}
