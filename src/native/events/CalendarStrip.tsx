import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { monthLabel, sameDay, weekdayLabel } from './format';

export interface CalendarStripProps {
  /** First day in the strip. Defaults to today. */
  startDate?: Date;
  /** Number of day pills to render (default 14). Clamped to at least 1. */
  days?: number;
  /** Explicit list of dates; overrides `startDate`/`days` when provided. */
  dates?: Date[];
  /** Currently selected day (highlighted). */
  selected?: Date;
  /** Days to mark with a dot (e.g. days that have events). */
  marks?: Date[];
  /** Fires when a day pill is tapped. */
  onSelectDate?: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
}

function buildDates(startDate: Date, count: number): Date[] {
  const n = Math.max(1, Math.floor(count));
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });
}

/**
 * A horizontally-scrolling week/day strip — a compact date picker for browsing
 * an event schedule. Each pill shows the weekday, day number and (on month
 * boundaries) the month, with a dot for marked days. The selected day is filled
 * with `primary` and also carries `accessibilityState.selected`. Colors come
 * from the compiled theme tokens; no literal colors.
 */
export function CalendarStrip({
  startDate,
  days = 14,
  dates,
  selected,
  marks = [],
  onSelectDate,
  style,
}: CalendarStripProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = dates && dates.length > 0 ? dates : buildDates(startDate ?? new Date(), days);

  const isMarked = (d: Date): boolean => marks.some((m) => sameDay(m, d));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="tablist"
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.xs }}
      style={style}
    >
      {list.map((date, i) => {
        const isSelected = selected != null && sameDay(selected, date);
        const showMonth = i === 0 || date.getDate() === 1;
        return (
          <Pressable
            key={date.toISOString()}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`${weekdayLabel(date)} ${monthLabel(date)} ${date.getDate()}`}
            onPress={() => onSelectDate?.(date)}
            style={({ pressed }) => ({
              alignItems: 'center',
              minWidth: tokens.spacing['2xl'] + tokens.spacing.lg,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: isSelected ? colors.primary : colors.border,
              backgroundColor: isSelected ? colors.primary : pressed ? tokens.ramps.neutral[50] : colors.surface,
            })}
          >
            <Text style={{ color: isSelected ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {weekdayLabel(date)}
            </Text>
            <Text style={{ color: isSelected ? colors.onPrimary : colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
              {date.getDate()}
            </Text>
            {showMonth ? (
              <Text style={{ color: isSelected ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs }}>
                {monthLabel(date)}
              </Text>
            ) : (
              <View style={{ height: tokens.spacing.sm, justifyContent: 'center' }}>
                {isMarked(date) ? (
                  <View style={{ width: tokens.spacing.xs, height: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: isSelected ? colors.onPrimary : colors.accent }} />
                ) : null}
              </View>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
