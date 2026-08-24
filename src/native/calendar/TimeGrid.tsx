import * as React from 'react';
import { ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EventBlock } from './EventBlock';
import { hourLabel, minutesSinceMidnight, sameDay } from './format';
import type { CalendarEvent } from './types';

export interface TimeGridProps {
  /** The day being laid out (used to filter events + place the `now` line). */
  day: Date;
  /** Timed events for the day (all-day events are ignored — use `AllDayRow`). */
  events?: CalendarEvent[];
  /** First hour shown (0–23, default 6). */
  startHour?: number;
  /** Last hour shown (exclusive-ish, default 22). Clamped above `startHour`. */
  endHour?: number;
  /** Pixels per hour (default 56). */
  hourHeight?: number;
  /** "Now" instant; draws a marker line when it falls on `day`. */
  now?: Date;
  /** Fires when an event block is tapped. */
  onSelectEvent?: (event: CalendarEvent) => void;
  /** Currently selected event id. */
  selectedEventId?: string;
  /** Wrap the grid in its own vertical scroll (default true). */
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

const GUTTER = 48;

/**
 * A vertical time grid — hour rules with timed events positioned by their
 * minute offset and sized by duration. Overlapping events split the available
 * width evenly so neither is hidden. A `now` marker (danger-toned line + dot)
 * lands only when `now` is on `day`. Every color is a theme token.
 */
export function TimeGrid({
  day,
  events = [],
  startHour = 6,
  endHour = 22,
  hourHeight = 56,
  now,
  onSelectEvent,
  selectedEventId,
  scroll = true,
  style,
}: TimeGridProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const from = Math.max(0, Math.min(23, startHour));
  const to = Math.max(from + 1, Math.min(24, endHour));
  const hours = Array.from({ length: to - from }, (_, i) => from + i);
  const gridTop = from * 60;
  const totalHeight = (to - from) * hourHeight;
  const yFor = (minutes: number): number => ((minutes - gridTop) / 60) * hourHeight;

  const timed = React.useMemo(
    () =>
      events
        .filter((e) => !e.allDay && sameDay(e.start, day))
        .sort((a, b) => a.start.getTime() - b.start.getTime()),
    [events, day]
  );

  // Naive overlap grouping: events sharing any minute go in the same column set.
  const positioned = timed.map((event, index) => {
    const startMin = minutesSinceMidnight(event.start);
    const endMin = event.end ? minutesSinceMidnight(event.end) : startMin + 30;
    const overlaps = timed.filter((o) => {
      const oStart = minutesSinceMidnight(o.start);
      const oEnd = o.end ? minutesSinceMidnight(o.end) : oStart + 30;
      return oStart < endMin && startMin < oEnd;
    });
    const col = overlaps.findIndex((o) => o.id === event.id);
    return {
      event,
      key: event.id || String(index),
      top: Math.max(0, yFor(startMin)),
      height: Math.max(hourHeight / 3, yFor(endMin) - yFor(startMin)),
      widthPct: 100 / Math.max(1, overlaps.length),
      leftPct: (100 / Math.max(1, overlaps.length)) * Math.max(0, col),
    };
  });

  const nowMinutes = now != null && sameDay(now, day) ? minutesSinceMidnight(now) : null;
  const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;

  const body = (
    <View style={{ height: totalHeight, flexDirection: 'row' }}>
      {/* Hour gutter + rules. */}
      <View style={{ width: GUTTER }}>
        {hours.map((h, i) => (
          <View key={h} style={{ position: 'absolute', top: i * hourHeight - tokens.typography.scale.xs / 2, right: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{hourLabel(h)}</Text>
          </View>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        {hours.map((h, i) => (
          <View
            key={h}
            style={{
              position: 'absolute',
              top: i * hourHeight,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: colors.border,
            }}
          />
        ))}

        {positioned.map((p) => (
          <View
            key={p.key}
            style={{
              position: 'absolute',
              top: p.top,
              height: p.height,
              left: `${p.leftPct}%`,
              width: `${p.widthPct}%`,
              paddingRight: 2,
              paddingLeft: tokens.spacing.xs,
            }}
          >
            <EventBlock
              event={p.event}
              variant="soft"
              size="sm"
              height={p.height}
              selected={p.event.id === selectedEventId}
              onPress={onSelectEvent}
              style={{ flex: 1 }}
            />
          </View>
        ))}

        {showNow ? (
          <View
            accessibilityLabel="Current time"
            accessibilityRole="image"
            style={{ position: 'absolute', top: yFor(nowMinutes as number), left: 0, right: 0, flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                width: tokens.spacing.sm,
                height: tokens.spacing.sm,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.danger,
              }}
            />
            <View style={{ flex: 1, height: 2, backgroundColor: colors.danger }} />
          </View>
        ) : null}
      </View>
    </View>
  );

  if (!scroll) return <View style={style}>{body}</View>;
  return (
    <ScrollView style={style} showsVerticalScrollIndicator={false}>
      {body}
    </ScrollView>
  );
}
