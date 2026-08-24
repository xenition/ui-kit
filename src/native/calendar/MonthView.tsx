import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { resolveTone, monthGrid, sameDay, weekdayHeader, WEEKDAYS_NARROW, WEEKDAYS_SHORT } from './format';
import type { CalendarEvent } from './types';

export type MonthViewDensity = 'compact' | 'full';

export interface MonthViewProps {
  /** Any date within the month to render (required — no clock read at import). */
  month: Date;
  /** Events; grouped onto their start day as accent dots / counts. */
  events?: CalendarEvent[];
  /** The currently selected day (filled). */
  selected?: Date;
  /** "Today" instant — outlined + labelled (never color-alone). */
  today?: Date;
  /** 0 = week starts Sunday (default), 1 = Monday, … */
  weekStartsOn?: number;
  /** `full` shows up to 3 event dots per cell; `compact` shows one. */
  density?: MonthViewDensity;
  /** Fires when a day cell is tapped. */
  onSelectDate?: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
}

const MAX_DOTS = 3;

/**
 * A full month grid for scheduling — distinct from the `Calendar` primitive in
 * that it groups real `CalendarEvent`s onto their day (tone-colored dots, plus
 * an overflow "+n"). The selected day is filled and today carries a ring **and**
 * a bold weight (not color-alone). All colors resolve from theme tokens.
 */
export function MonthView({
  month,
  events = [],
  selected,
  today,
  weekStartsOn = 0,
  density = 'full',
  onSelectDate,
  style,
}: MonthViewProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
  const headers = weekdayHeader(density === 'compact' ? WEEKDAYS_NARROW : WEEKDAYS_SHORT, weekStartsOn);

  const eventsFor = (date: Date): CalendarEvent[] =>
    events.filter((e) => sameDay(e.start, date));

  return (
    <View
      accessibilityRole="none"
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.sm,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        {headers.map((w, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }}>
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
              return <View key={col} style={{ flex: 1, aspectRatio: density === 'compact' ? 1 : 0.9 }} />;
            }
            const dayEvents = eventsFor(date);
            const isSelected = selected != null && sameDay(selected, date);
            const isToday = today != null && sameDay(today, date);
            const dots = dayEvents.slice(0, density === 'compact' ? 1 : MAX_DOTS);
            const overflow = dayEvents.length - dots.length;

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
                style={{
                  flex: 1,
                  aspectRatio: density === 'compact' ? 1 : 0.9,
                  alignItems: 'center',
                  paddingTop: tokens.spacing.xs,
                }}
              >
                <View
                  style={{
                    width: tokens.spacing.xl,
                    height: tokens.spacing.xl,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: isSelected ? colors.primary : 'transparent',
                    borderWidth: isToday && !isSelected ? 1 : 0,
                    borderColor: colors.primary,
                  }}
                >
                  <Text
                    style={{
                      color: isSelected ? colors.onPrimary : colors.onSurface,
                      fontSize: tokens.typography.scale.sm,
                      fontWeight: isSelected || isToday ? '800' : '400',
                    }}
                  >
                    {date.getDate()}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 }}>
                  {dots.map((e, i) => {
                    const { base } = resolveTone(colors, e.tone);
                    return (
                      <View
                        key={i}
                        style={{
                          width: tokens.spacing.xs,
                          height: tokens.spacing.xs,
                          borderRadius: tokens.radius.full,
                          backgroundColor: isSelected ? colors.onPrimary : base,
                        }}
                      />
                    );
                  })}
                  {overflow > 0 ? (
                    <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                      {`+${overflow}`}
                    </Text>
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
