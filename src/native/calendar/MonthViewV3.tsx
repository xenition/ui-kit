import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import {
  resolveTone,
  monthGrid,
  sameDay,
  clockLabel,
  weekdayHeader,
  monthLongLabel,
  WEEKDAYS_NARROW,
} from './format';
import type { CalendarEvent } from './types';
import type { MonthViewProps } from './MonthView';

/** Same public contract as {@link MonthView} — a drop-in alternate design. */
export type MonthViewV3Props = MonthViewProps;

const PREVIEW_MAX = 4;

/**
 * MonthView, redesigned (v3): a **compact month with a mini agenda preview**.
 * The grid is small and dense (single tone dot per day), and beneath it a short
 * agenda lists the focused day's events (the `selected` day, else `today`) as
 * time + tone-rail + title rows. Selected fills; today rings + bolds (never
 * color-alone). Same props, token-pure.
 */
export function MonthViewV3({
  month,
  events = [],
  selected,
  today,
  weekStartsOn = 0,
  density = 'compact',
  onSelectDate,
  style,
}: MonthViewV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
  const headers = weekdayHeader(WEEKDAYS_NARROW, weekStartsOn);

  const eventsFor = (date: Date): CalendarEvent[] =>
    events
      .filter((e) => sameDay(e.start, date))
      .sort((a, b) => {
        if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
        return a.start.getTime() - b.start.getTime();
      });

  const focus = selected ?? today ?? null;
  const focusEvents = focus ? eventsFor(focus) : [];
  const focusLabel = focus ? `${monthLongLabel(focus)} ${focus.getDate()}` : null;

  return (
    <View
      accessibilityRole="none"
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          padding: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        {headers.map((w, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center', paddingVertical: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {w}
            </Text>
          </View>
        ))}
      </View>

      {Array.from({ length: cells.length / 7 }).map((_, row) => (
        <View key={row} style={{ flexDirection: 'row' }}>
          {cells.slice(row * 7, row * 7 + 7).map((date, col) => {
            if (date == null) {
              return <View key={col} style={{ flex: 1, aspectRatio: 1 }} />;
            }
            const dayEvents = eventsFor(date);
            const isSelected = selected != null && sameDay(selected, date);
            const isToday = today != null && sameDay(today, date);
            const dot = dayEvents[0];

            return (
              <Pressable
                key={col}
                accessibilityRole="button"
                accessibilityLabel={
                  `${date.getDate()}${isToday ? ', today' : ''}` +
                  (dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length === 1 ? '' : 's'}` : '')
                }
                accessibilityState={{ selected: isSelected }}
                onPress={() => onSelectDate?.(date)}
                style={{ flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <View
                  style={{
                    width: tokens.spacing.lg,
                    height: tokens.spacing.lg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: isSelected ? colors.primary : 'transparent',
                    borderWidth: isToday && !isSelected ? 1.5 : 0,
                    borderColor: colors.primary,
                  }}
                >
                  <Text
                    style={{
                      color: isSelected ? colors.onPrimary : colors.onSurface,
                      fontSize: tokens.typography.scale.xs,
                      fontWeight: isSelected || isToday ? '800' : '400',
                    }}
                  >
                    {date.getDate()}
                  </Text>
                </View>
                <View style={{ height: tokens.spacing.xs, justifyContent: 'center' }}>
                  {dot != null && !isSelected ? (
                    <View
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: tokens.radius.full,
                        backgroundColor: resolveTone(colors, dot.tone).base,
                      }}
                    />
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}

      {/* Mini agenda preview for the focused day. */}
      <View
        style={{
          marginTop: tokens.spacing.sm,
          paddingTop: tokens.spacing.sm,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          gap: tokens.spacing.xs,
        }}
      >
        {focusLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {focusLabel}
          </Text>
        ) : null}
        {focus == null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Select a day</Text>
        ) : focusEvents.length === 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No events</Text>
        ) : (
          focusEvents.slice(0, PREVIEW_MAX).map((event) => {
            const { base } = resolveTone(colors, event.tone);
            return (
              <Pressable
                key={event.id}
                accessibilityRole="button"
                accessibilityLabel={`${event.title}, ${event.allDay ? 'All day' : clockLabel(event.start)}`}
                onPress={() => onSelectDate?.(event.start)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.sm,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View style={{ width: 3, alignSelf: 'stretch', borderRadius: tokens.radius.full, backgroundColor: base }} />
                <Text style={{ width: 44, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {event.allDay ? 'All day' : clockLabel(event.start)}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}
                >
                  {event.title}
                </Text>
              </Pressable>
            );
          })
        )}
      </View>
    </View>
  );
}
