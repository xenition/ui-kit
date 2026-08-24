import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export interface CalendarProps {
  /** The month to display (any date within it). Defaults to today. */
  month?: Date;
  /** Currently selected date (highlighted). */
  selected?: Date;
  /** Dates to mark with a dot (e.g. events). */
  marks?: Date[];
  /** Fires when a day cell is tapped. */
  onSelectDate?: (date: Date) => void;
  /** Fires when the prev/next chevrons page the month. */
  onMonthChange?: (month: Date) => void;
  style?: StyleProp<ViewStyle>;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Static month grid — a display calendar distinct from the booking
 * `BookingCalendar` and the `DatePicker` field. Renders a header with
 * prev/next chevrons, a weekday row, and a 6×7 day grid; the selected day is
 * filled with `colors.primary` and marked days get an accent dot. All colors
 * and spacing come from the compiled theme tokens via `useXenitionTheme()` —
 * no literal colors.
 */
export function Calendar({
  month,
  selected,
  marks = [],
  onSelectDate,
  onMonthChange,
  style,
}: CalendarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const base = month ?? new Date();
  const year = base.getFullYear();
  const monthIndex = base.getMonth();
  const today = new Date();

  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // 6 rows × 7 columns; leading blanks then the days.
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const goMonth = (delta: number): void => {
    onMonthChange?.(new Date(year, monthIndex + delta, 1));
  };

  const isMarked = (day: number): boolean =>
    marks.some((m) => sameDay(m, new Date(year, monthIndex, day)));

  return (
    <View
      accessibilityRole="none"
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: tokens.spacing.sm,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous month"
          onPress={() => goMonth(-1)}
          style={{ padding: tokens.spacing.xs }}
        >
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg }}>‹</Text>
        </Pressable>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {`${MONTHS[monthIndex] ?? ''} ${year}`}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next month"
          onPress={() => goMonth(1)}
          style={{ padding: tokens.spacing.xs }}
        >
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg }}>›</Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {WEEKDAYS.map((w) => (
          <View key={w} style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
              {w}
            </Text>
          </View>
        ))}
      </View>

      {Array.from({ length: cells.length / 7 }).map((_, row) => (
        <View key={row} style={{ flexDirection: 'row' }}>
          {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
            if (day == null) {
              return <View key={col} style={{ flex: 1, aspectRatio: 1 }} />;
            }
            const cellDate = new Date(year, monthIndex, day);
            const isSelected = selected != null && sameDay(selected, cellDate);
            const isToday = sameDay(today, cellDate);
            return (
              <Pressable
                key={col}
                accessibilityRole="button"
                accessibilityLabel={`${MONTHS[monthIndex] ?? ''} ${day}, ${year}`}
                accessibilityState={{ selected: isSelected }}
                onPress={() => onSelectDate?.(cellDate)}
                style={{ flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <View
                  style={{
                    width: tokens.spacing.xl + tokens.spacing.xs,
                    height: tokens.spacing.xl + tokens.spacing.xs,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: isSelected ? colors.primary : 'transparent',
                    borderWidth: isToday && !isSelected ? 1 : 0,
                    borderColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: isSelected ? colors.onPrimary : colors.onSurface,
                      fontSize: tokens.typography.scale.sm,
                      fontWeight: isSelected ? '700' : '400',
                    }}
                  >
                    {day}
                  </Text>
                </View>
                {isMarked(day) ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: tokens.spacing.xs / 2,
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
