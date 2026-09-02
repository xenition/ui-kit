import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { StatusPillV4 } from './StatusPillV4';
import { SHIFT_STATUS_V4, spokenLine, toneGround } from './internal/tone-v4';
import type { ShiftScheduleProps } from './ShiftSchedule';

export interface ShiftScheduleV4Props extends ShiftScheduleProps {
  /** Body text for a shift with nobody on it. Default `'Unassigned'`. */
  unassignedLabel?: string;
  /** Next-step sentence under `emptyLabel`. Default `'Shifts you add will appear here.'` */
  emptyDescription?: string;
}

/**
 * **V4 shift schedule** — same props as {@link ShiftSchedule} plus
 * `unassignedLabel` and `emptyDescription`.
 *
 * ## Five changes
 *
 * 1. **A shift has one truth about who is on it.** The base derived the tint
 *    from `!shift.assignee` and the pill from `shift.status`, so
 *    `{ status: 'confirmed', assignee: undefined }` rendered a row tinted as
 *    open, the body text "Unassigned", and a green "✓ Confirmed" pill — three
 *    statements, two of them contradicting each other, on the roster a shift
 *    manager reads to decide whether anyone is coming in. The open flag is now
 *    the assignee and nothing else, and an unassigned shift is `open`
 *    regardless of what status was passed with it.
 * 2. **The open tint is a token, and it never carries the meaning alone.** The
 *    base washed an open row in `withAlpha(tone, 0.08)` — translucent, so the
 *    same row was a different colour on a card than on the page, and a
 *    different colour again from the web twin's own hand-rolled alpha. It is
 *    `toneGround()` now: one composited 10% mix, opaque, identical on both
 *    platforms. The tint is decoration on top of the word "Open", which is what
 *    a colour-blind user actually reads.
 * 3. **Every row is a target.** The rows were `Pressable`s whose height came
 *    from `xs` padding around two lines of `xs` text; they clear `minTap` now.
 * 4. **A press is a state layer**, where the base had no press feedback on the
 *    shift rows at all — a tap on a roster row did nothing visible until the
 *    next screen appeared.
 * 5. **The copy is props and the columns come off the scale.** "Unassigned" was
 *    hard-coded, the time column was a literal `width: 96`, and the row's spoken
 *    name was "Shift 09:00 to 17:00, Confirmed" — no assignee, no role, no
 *    location, which is everything a manager is scanning the roster for.
 */
export function ShiftScheduleV4({
  shifts,
  dateLabel,
  variant = 'default',
  unassignedLabel = 'Unassigned',
  emptyLabel = 'No shifts scheduled',
  emptyDescription = 'Shifts you add will appear here.',
  onSelectShift,
  testID,
  style,
}: ShiftScheduleV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const compact = variant === 'compact';
  const tap = minTap(tokens.spacing);
  const timeColumn = tokens.spacing['2xl'] * 2;
  const list = Array.isArray(shifts) ? shifts : [];

  const header = dateLabel ? (
    <TextV4 size="sm" weight="bold" tone="onCard">
      {dateLabel}
    </TextV4>
  ) : null;

  if (list.length === 0) {
    return (
      <View testID={testID} style={[{ gap: tokens.spacing.sm }, style]}>
        {header}
        <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
      </View>
    );
  }

  return (
    <CardV4
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      testID={testID}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      {header}
      <View style={{ gap: tokens.spacing.xs }}>
        {list.map((shift) => {
          /*
            One source. An unassigned shift is open no matter what status came
            with it — the roster's whole job is to say whether somebody is
            coming in, and the assignee is the field that answers that.
          */
          const open = shift.assignee == null || shift.assignee === '';
          const meta = SHIFT_STATUS_V4[open ? 'open' : (shift.status ?? 'scheduled')];
          const who = open ? unassignedLabel : (shift.assignee as string);
          const time = `${shift.start}–${shift.end}`;

          const spoken = spokenLine([
            time,
            shift.role,
            who,
            !compact ? shift.location : null,
            meta.label,
          ]);

          // The shared 10% mix, not a hand-rolled alpha — see change 2.
          const ground = open ? toneGround(theme, meta.tone) : colors.card;

          const row = (pressed: boolean): React.ReactElement => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                minHeight: tap,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed
                  ? pressOver(theme, ground, colors.onCard)
                  : open
                    ? ground
                    : 'transparent',
              }}
            >
              <View style={{ width: timeColumn }}>
                <TextV4 size="sm" weight="semibold" tone="onCard" numeric="tabular">
                  {time}
                </TextV4>
                {shift.role ? (
                  <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                    {shift.role}
                  </TextV4>
                ) : null}
              </View>
              <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
                <TextV4 size="sm" tone={open ? 'mutedText' : 'onCard'} numberOfLines={1}>
                  {who}
                </TextV4>
                {!compact && shift.location ? (
                  <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                    {shift.location}
                  </TextV4>
                ) : null}
              </View>
              <StatusPillV4 meta={meta} size="sm" decorative />
            </View>
          );

          return onSelectShift ? (
            <Pressable
              key={shift.id}
              accessibilityRole="button"
              accessibilityLabel={spoken}
              onPress={() => onSelectShift(shift)}
              style={{ borderRadius: tokens.radius.md }}
            >
              {({ pressed }) => row(pressed)}
            </Pressable>
          ) : (
            <View key={shift.id} accessible accessibilityLabel={spoken}>
              {row(false)}
            </View>
          );
        })}
      </View>
    </CardV4>
  );
}
