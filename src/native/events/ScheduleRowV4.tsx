import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { spokenLine, toneFill, toneInk, type ToneV4 } from './internal/event-v4';
import type { ScheduleRowProps, ScheduleStatus } from './ScheduleRow';

export interface ScheduleRowV4Props extends ScheduleRowProps {
  /** The word each status is printed and announced with. */
  statusLabels?: Partial<Record<ScheduleStatus, string>>;
  /** Join a start and an end time. Default `` `${start}–${end}` ``. */
  formatRange?: (start: string, end: string) => string;
  /** The tone the track rail and caption carry. Default `'neutral'`. */
  trackTone?: ToneV4;
}

const STATUS_LABEL: Record<ScheduleStatus, string> = {
  scheduled: '',
  live: 'Live now',
  ended: 'Ended',
  cancelled: 'Cancelled',
};

/** A cancelled slot is genuinely a failed state; the other three are not. */
const STATUS_TONE: Record<ScheduleStatus, ToneV4> = {
  scheduled: 'neutral',
  live: 'success',
  ended: 'neutral',
  cancelled: 'danger',
};

/** The track rail. 3px — a bar, not a hairline. */
const RAIL = 3;

/**
 * **V4 schedule row** — same props as {@link ScheduleRow} plus `statusLabels`,
 * `formatRange` and `trackTone`.
 *
 * ## Five changes
 *
 * 1. **`endTime` renders as a range**, which its own prop doc has always
 *    promised. The base stacked two bare times in the gutter with nothing
 *    between them, so "10:30" over "11:15" read as two separate start times on
 *    a printed-looking timetable — the one place that misreading costs someone
 *    a session.
 * 2. **A cancelled slot no longer announces identically to a live one.** The
 *    strike-through was visual only and the row spoke `"10:30 Keynote"`, so a
 *    screen-reader user was told to turn up to a cancelled talk.
 * 3. **A track carries identity.** The rail was `primary` for every track, so
 *    the colour distinguished nothing, and a row with no track filled the rail
 *    with `colors.border` — a hairline token used as a fill. `trackTone` lets
 *    the caller give a track its own tone; a row with no track draws no rail
 *    and keeps the gutter, so titles stay on one vertical line.
 * 4. **The status caption takes the contrast-corrected ink**, not the fill
 *    slot — `colors.muted` as text carries no contrast promise at all.
 * 5. **The row clears 44, the gutter is tabular, and a press is a state
 *    layer** rather than `opacity: 0.7`.
 *
 * **Renders nothing without a `title`.**
 */
export function ScheduleRowV4({
  time,
  endTime,
  title,
  room,
  track,
  status = 'scheduled',
  statusLabels,
  formatRange,
  trackTone = 'neutral',
  onPress,
  style,
}: ScheduleRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!title) return null;

  const statusLabel = statusLabels?.[status] ?? STATUS_LABEL[status];
  const isCancelled = status === 'cancelled';
  const range = endTime ? (formatRange ?? ((a: string, b: string) => `${a}–${b}`))(time, endTime) : time;
  const tap = minTap(tokens.spacing);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: tokens.spacing.md,
        minHeight: tap,
        paddingVertical: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      }}
    >
      <View style={{ width: tokens.spacing['2xl'] + tokens.spacing.lg }}>
        <TextV4 size="sm" weight="bold" tone="onSurface" numeric="tabular">
          {range}
        </TextV4>
      </View>
      {/* The gutter is paid whether or not there is a track, so a list of rows
          keeps one left edge. Only a real track draws a rail. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: RAIL,
          borderRadius: tokens.radius.full,
          backgroundColor: track ? toneFill(theme, trackTone) : 'transparent',
        }}
      />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4
          size="base"
          weight="semibold"
          tone="onSurface"
          numberOfLines={2}
          style={{ textDecorationLine: isCancelled ? 'line-through' : 'none' }}
        >
          {title}
        </TextV4>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            flexWrap: 'wrap',
          }}
        >
          {track ? (
            <TextV4 size="xs" weight="semibold" style={{ color: toneInk(theme, trackTone) }}>
              {track}
            </TextV4>
          ) : null}
          {room ? (
            <TextV4 size="xs" tone="mutedText">
              {room}
            </TextV4>
          ) : null}
          {statusLabel ? (
            <TextV4 size="xs" weight="bold" style={{ color: toneInk(theme, STATUS_TONE[status]) }}>
              {statusLabel}
            </TextV4>
          ) : null}
        </View>
      </View>
    </View>
  );

  const name = spokenLine([range, title, track, room, statusLabel]);

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        onPress={onPress}
        style={style}
      >
        {({ pressed }) => content(pressed)}
      </Pressable>
    );
  }
  return (
    <View accessible accessibilityLabel={name} style={style}>
      {content(false)}
    </View>
  );
}
