import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import {
  addMonths,
  monthGrid,
  monthLongLabel,
  sameDay,
  weekdayHeader,
  WEEKDAYS_NARROW,
} from './format';

export type MiniCalendarVariant = 'bordered' | 'plain';

export interface MiniCalendarProps {
  /** Any date within the month to render (required — no import-time clock). */
  month: Date;
  /** The currently selected day (filled). */
  selected?: Date;
  /** "Today" instant — outlined + bolded (never color-alone). */
  today?: Date;
  /** Days to mark with a dot (e.g. days that have events). */
  marks?: Date[];
  /** 0 = week starts Sunday (default), 1 = Monday, … */
  weekStartsOn?: number;
  /** Surface treatment. */
  variant?: MiniCalendarVariant;
  /** Fires when a day cell is tapped. */
  onSelectDate?: (date: Date) => void;
  /** Fires when the prev/next chevrons page the month. */
  onMonthChange?: (month: Date) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A dense mini month picker for sidebars, popovers and the `EventDetailSheet`.
 * Header chevrons page the month; days are 1:1 tap targets with a selected fill
 * and a marked-day dot. Distinct from `MonthView` (no per-day event stacks) and
 * from the `Calendar` primitive (integrated month paging + marks). Token colors
 * only.
 */
export function MiniCalendar({
  month,
  selected,
  today,
  marks = [],
  weekStartsOn = 0,
  variant = 'bordered',
  onSelectDate,
  onMonthChange,
  style,
}: MiniCalendarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
  const headers = weekdayHeader(WEEKDAYS_NARROW, weekStartsOn);
  const isMarked = (d: Date): boolean => marks.some((m) => sameDay(m, d));

  return (
    <View
      accessibilityRole="none"
      style={[
        {
          borderWidth: variant === 'bordered' ? 1 : 0,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.sm,
          backgroundColor: variant === 'bordered' ? colors.surface : 'transparent',
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: tokens.spacing.xs,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous month"
          onPress={() => onMonthChange?.(addMonths(month, -1))}
          style={{ padding: tokens.spacing.xs }}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base }}>‹</Text>
        </Pressable>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {`${monthLongLabel(month)} ${month.getFullYear()}`}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next month"
          onPress={() => onMonthChange?.(addMonths(month, 1))}
          style={{ padding: tokens.spacing.xs }}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base }}>›</Text>
        </Pressable>
      </View>

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
            const isSelected = selected != null && sameDay(selected, date);
            const isToday = today != null && sameDay(today, date);
            return (
              <Pressable
                key={col}
                accessibilityRole="button"
                accessibilityLabel={`${monthLongLabel(month)} ${date.getDate()}${isToday ? ', today' : ''}`}
                accessibilityState={{ selected: isSelected }}
                onPress={() => onSelectDate?.(date)}
                style={{ flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <View
                  style={{
                    width: tokens.spacing.lg + tokens.spacing.xs,
                    height: tokens.spacing.lg + tokens.spacing.xs,
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
                      fontSize: tokens.typography.scale.xs,
                      fontWeight: isSelected || isToday ? '800' : '400',
                    }}
                  >
                    {date.getDate()}
                  </Text>
                </View>
                {isMarked(date) ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: tokens.spacing.xs,
                      height: tokens.spacing.xs,
                      borderRadius: tokens.radius.full,
                      backgroundColor: isSelected ? colors.onPrimary : colors.accent,
                    }}
                  />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
