import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EventBlock } from './EventBlock';
import {
  hourLabel,
  minutesSinceMidnight,
  sameDay,
  weekDates,
  weekdayLabel,
} from './format';
import type { CalendarEvent } from './types';

export interface WeekViewProps {
  /** Any date within the week to render (required — no import-time clock). */
  week: Date;
  /** Timed events; each is placed in its day column by minute offset. */
  events?: CalendarEvent[];
  /** The highlighted day column. */
  selected?: Date;
  /** "Today" instant — its column header is ringed + bolded (not color-alone). */
  today?: Date;
  /** 0 = week starts Sunday (default), 1 = Monday, … */
  weekStartsOn?: number;
  /** First hour shown (default 7). */
  startHour?: number;
  /** Last hour shown (default 21). */
  endHour?: number;
  /** Pixels per hour (default 48). */
  hourHeight?: number;
  /** Fires when a day column header is tapped. */
  onSelectDate?: (date: Date) => void;
  /** Fires when an event block is tapped. */
  onSelectEvent?: (event: CalendarEvent) => void;
  /** Currently selected event id. */
  selectedEventId?: string;
  style?: StyleProp<ViewStyle>;
}

const GUTTER = 40;

/**
 * A 7-day week view: a sticky weekday header (each column tappable to select the
 * day) over a shared, scrollable hour grid where timed events sit in their day
 * column. Today's header carries a ring + bold weight (never color-alone).
 * Colors resolve from theme tokens only.
 */
export function WeekView({
  week,
  events = [],
  selected,
  today,
  weekStartsOn = 0,
  startHour = 7,
  endHour = 21,
  hourHeight = 48,
  onSelectDate,
  onSelectEvent,
  selectedEventId,
  style,
}: WeekViewProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const days = React.useMemo(() => weekDates(week, weekStartsOn), [week, weekStartsOn]);
  const from = Math.max(0, Math.min(23, startHour));
  const to = Math.max(from + 1, Math.min(24, endHour));
  const hours = Array.from({ length: to - from }, (_, i) => from + i);
  const gridTop = from * 60;
  const totalHeight = (to - from) * hourHeight;
  const yFor = (minutes: number): number => ((minutes - gridTop) / 60) * hourHeight;

  return (
    <View style={[{ borderWidth: 1, borderColor: colors.border, borderRadius: tokens.radius.md, overflow: 'hidden' }, style]}>
      {/* Header row */}
      <View style={{ flexDirection: 'row', backgroundColor: colors.surface }}>
        <View style={{ width: GUTTER }} />
        {days.map((date) => {
          const isSelected = selected != null && sameDay(selected, date);
          const isToday = today != null && sameDay(today, date);
          return (
            <Pressable
              key={date.toISOString()}
              accessibilityRole="button"
              accessibilityLabel={`${weekdayLabel(date)} ${date.getDate()}${isToday ? ', today' : ''}`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelectDate?.(date)}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: tokens.spacing.xs,
                backgroundColor: isSelected ? colors.primary : 'transparent',
              }}
            >
              <Text style={{ color: isSelected ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {weekdayLabel(date)}
              </Text>
              <View
                style={{
                  marginTop: 2,
                  width: tokens.spacing.lg,
                  height: tokens.spacing.lg,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.full,
                  borderWidth: isToday && !isSelected ? 1 : 0,
                  borderColor: colors.primary,
                }}
              >
                <Text style={{ color: isSelected ? colors.onPrimary : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: isToday || isSelected ? '800' : '500' }}>
                  {date.getDate()}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={{ height: 1, backgroundColor: colors.border }} />

      {/* Scrollable body */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: totalHeight }}>
        <View style={{ height: totalHeight, flexDirection: 'row' }}>
          <View style={{ width: GUTTER }}>
            {hours.map((h, i) => (
              <View key={h} style={{ position: 'absolute', top: i * hourHeight - tokens.typography.scale.xs / 2, right: tokens.spacing.xs }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{hourLabel(h)}</Text>
              </View>
            ))}
          </View>
          {days.map((date, dIdx) => {
            const dayEvents = events
              .filter((e) => !e.allDay && sameDay(e.start, date))
              .sort((a, b) => a.start.getTime() - b.start.getTime());
            return (
              <View key={date.toISOString()} style={{ flex: 1, borderLeftWidth: dIdx === 0 ? 0 : 1, borderLeftColor: colors.border }}>
                {hours.map((h, i) => (
                  <View key={h} style={{ position: 'absolute', top: i * hourHeight, left: 0, right: 0, height: 1, backgroundColor: colors.border }} />
                ))}
                {dayEvents.map((event, i) => {
                  const startMin = minutesSinceMidnight(event.start);
                  const endMin = event.end ? minutesSinceMidnight(event.end) : startMin + 30;
                  return (
                    <View
                      key={event.id || String(i)}
                      style={{
                        position: 'absolute',
                        top: Math.max(0, yFor(startMin)),
                        height: Math.max(hourHeight / 3, yFor(endMin) - yFor(startMin)),
                        left: 1,
                        right: 1,
                      }}
                    >
                      <EventBlock
                        event={event}
                        variant="soft"
                        size="sm"
                        selected={event.id === selectedEventId}
                        onPress={onSelectEvent}
                        style={{ flex: 1 }}
                      />
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
