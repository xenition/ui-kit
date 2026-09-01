import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { sameDay } from '../../calendar/format';
import { hourTitle, layoutEvents, minutesOf } from '../../calendar/layout-v4';
import { EventBlockV4 } from './EventBlockV4';
import { gridMetrics } from './internal/grid-v4';
import type { TimeGridProps } from './TimeGrid';

export interface TimeGridV4Props extends TimeGridProps {
  /** Locale for the hour gutter. Default: the device's. */
  locale?: string;
  /** Accessible name for the current-time rule. Default `'Current time'`. */
  nowLabel?: string;
  /** Copy when the day has no timed events. Default `'Nothing scheduled.'`. */
  emptyLabel?: string;
}

/**
 * **V4 time grid** — same props as {@link TimeGrid} plus `locale`, `nowLabel`
 * and `emptyLabel`.
 *
 * ## The change this component exists for
 *
 * **The overlap layout was inconsistent.** The base computed, per event, the
 * set of events overlapping *that* event and used its size as the column
 * count — so A 9:00–10:00, B 9:30–10:30 and C 10:00–11:00 were laid out on
 * three different column grids in one day, colliding and leaving gaps at the
 * same time. `layoutEvents()` in `calendar/layout-v4.ts` replaces it with the
 * standard two-pass algorithm: cluster the connected overlaps, then pack each
 * cluster into columns every one of its members shares. The reasoning, and the
 * worked example, are in that file.
 *
 * ## Three more
 *
 * 1. **The hour gutter is localized.** It was built from a frozen English
 *    `hourLabel`; `Intl` already knows every locale's clock.
 * 2. **"Now" is announced.** The base drew a rule and gave it no name, so a
 *    screen-reader user got no current time at all.
 * 3. **The metrics come off the spacing scale**, so the hour rules and the
 *    blocks agree on a seed that scales its spacing — they drifted apart with
 *    `hourHeight = 56` and a `GUTTER` of 48.
 */
export function TimeGridV4({
  day,
  events = [],
  startHour = 6,
  endHour = 22,
  hourHeight,
  now,
  locale,
  nowLabel = 'Current time',
  emptyLabel = 'Nothing scheduled.',
  onSelectEvent,
  selectedEventId,
  scroll = true,
  style,
}: TimeGridV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = gridMetrics(theme);
  const hourPx = hourHeight ?? metrics.hour;

  const from = Math.max(0, Math.min(23, startHour));
  const to = Math.max(from + 1, Math.min(24, endHour));
  const hours = Array.from({ length: to - from }, (_, i) => from + i);
  const gridTop = from * 60;
  const totalHeight = (to - from) * hourPx;
  const yFor = (minutes: number): number => ((minutes - gridTop) / 60) * hourPx;

  const timed = React.useMemo(
    () => events.filter((e) => !e.allDay && sameDay(e.start, day)),
    [events, day]
  );
  const positioned = React.useMemo(() => layoutEvents(timed), [timed]);

  const nowMinutes = now != null && sameDay(now, day) ? minutesOf(now) : null;
  const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;

  const body = (
    <View style={{ height: totalHeight, flexDirection: 'row' }}>
      <View style={{ width: metrics.gutter }}>
        {hours.map((h, i) => (
          <View
            key={h}
            style={{
              position: 'absolute',
              top: i * hourPx - tokens.typography.scale.xs / 2,
              right: tokens.spacing.xs,
            }}
          >
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              {hourTitle(h, locale)}
            </TextV4>
          </View>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        {hours.map((h, i) => (
          <View
            key={h}
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: i * hourPx,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: colors.border,
            }}
          />
        ))}

        {positioned.length === 0 ? (
          <View style={{ padding: tokens.spacing.md }}>
            <TextV4 size="sm" tone="mutedText">
              {emptyLabel}
            </TextV4>
          </View>
        ) : null}

        {positioned.map((p) => (
          <View
            key={p.key}
            style={{
              position: 'absolute',
              top: Math.max(0, yFor(p.startMin)),
              height: Math.max(metrics.minBlock, yFor(p.endMin) - yFor(p.startMin)),
              // Every member of a cluster shares its column count, so the
              // blocks in one overlap group finally line up.
              left: `${(100 / p.columns) * p.column}%`,
              width: `${100 / p.columns}%`,
              paddingRight: tokens.spacing.xs / 2,
            }}
          >
            <EventBlockV4
              event={p.event}
              size="sm"
              selected={selectedEventId === p.event.id}
              onPress={onSelectEvent}
              height={Math.max(metrics.minBlock, yFor(p.endMin) - yFor(p.startMin))}
            />
          </View>
        ))}

        {showNow ? (
          <View
            accessible
            accessibilityRole="text"
            accessibilityLabel={nowLabel}
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: yFor(nowMinutes as number),
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: colors.danger,
            }}
          />
        ) : null}
      </View>
    </View>
  );

  if (!scroll) return <View style={style}>{body}</View>;

  return (
    <ScrollView style={style} contentContainerStyle={{ paddingBottom: tokens.spacing.lg }}>
      {body}
    </ScrollView>
  );
}
