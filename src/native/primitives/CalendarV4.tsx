import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { CalendarProps } from './Calendar';
import { pressFill, popoverSkin, tapTarget } from './internal/picker-v4';

export type { CalendarProps as CalendarV4Props };

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * **V4 calendar** — the same props as {@link Calendar}, a different design
 * line.
 *
 * ## It still looks like a calendar
 *
 * §31 asks for familiar interactions, and a month grid is about as settled a
 * pattern as software has: seven columns, a weekday header, chevrons to page.
 * Nothing here is reinvented. What changes is everything that made the base
 * grid fiddly to actually use.
 *
 * ## The three changes
 *
 * 1. **Day cells you can hit.** The base sizes its day pill at `xl + xs` —
 *    36px — inside a seven-column row. That is under both platforms' 44px
 *    floor, and on a calendar it is the difference between tapping the 14th and
 *    tapping the 15th. Every cell here is `tapTarget()` tall (`spacing['2xl']`,
 *    48px) with the visible pill just inside it, so the target is larger than
 *    the thing it looks like — which is the right way round. The chevrons get
 *    the same floor; a 4px-padded glyph was the smallest target on the panel.
 * 2. **A selection you cannot miss, in either scheme.** The selected day is a
 *    filled `primary` disc with `onPrimary` ink — a pair the compiler
 *    contrast-checks, so it survives a dark page where a tinted outline would
 *    dissolve. Today, when it is not the selection, is ringed in `primary`
 *    rather than the base's `border`, so "today" and "a cell edge" can never be
 *    confused. Marked days keep their dot, flipped to `onPrimary` on the
 *    selected day so it stays visible on the fill.
 * 3. **A panel that is a panel.** `elevation.card` and the `lg` radius, with
 *    the hairline kept. The base's `md` radius and flat fill made the calendar
 *    read as a fieldset rather than a surface you are choosing from.
 *
 * Glass is the one thing asked for rather than assumed: `flatten()` neutralises
 * gradients and elevation for a flat seed and stops there, so elevation is
 * consumed unconditionally and `depth: 'glass'` is checked once, inside
 * `popoverSkin`. No gradient — §35.11 keeps those for the hero and the one
 * primary action, and a tinted calendar is a calendar you read past.
 */
export function CalendarV4({
  month,
  selected,
  marks = [],
  onSelectDate,
  onMonthChange,
  style,
}: CalendarProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const base = month ?? new Date();
  const year = base.getFullYear();
  const monthIndex = base.getMonth();
  const today = new Date();

  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Leading blanks, then the days, padded to whole weeks.
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const goMonth = (delta: number): void => {
    onMonthChange?.(new Date(year, monthIndex + delta, 1));
  };

  const isMarked = (day: number): boolean =>
    marks.some((m) => sameDay(m, new Date(year, monthIndex, day)));

  const target = tapTarget(theme);
  // The disc sits just inside the target, so the thing you can hit is always a
  // little larger than the thing you are aiming at.
  const disc = target - tokens.spacing.xs;
  const press = pressFill(theme);

  const chevron = (label: string, glyph: string, delta: number): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => goMonth(delta)}
      style={({ pressed }) => ({
        width: target,
        height: target,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        backgroundColor: pressed ? press : 'transparent',
      })}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl }}>{glyph}</Text>
    </Pressable>
  );

  return (
    <View
      accessibilityLabel={`${MONTHS[monthIndex] ?? ''} ${year}`}
      style={[popoverSkin(theme, 'card'), { padding: tokens.spacing.md }, style]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: tokens.spacing.xs,
        }}
      >
        {chevron('Previous month', '‹', -1)}
        <Text
          style={{
            color: colors.onSurface,
            fontFamily: tokens.typography.fontHeading,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '600',
          }}
        >
          {`${MONTHS[monthIndex] ?? ''} ${year}`}
        </Text>
        {chevron('Next month', '›', 1)}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {WEEKDAYS.map((w) => (
          <View
            key={w}
            style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }}
          >
            <Text
              style={{
                color: colors.mutedText,
                fontSize: tokens.typography.scale.xs,
                fontFamily: tokens.typography.fontBody,
                fontWeight: '600',
              }}
            >
              {w}
            </Text>
          </View>
        ))}
      </View>

      {Array.from({ length: cells.length / 7 }).map((_, row) => (
        <View key={row} style={{ flexDirection: 'row' }}>
          {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
            if (day == null) {
              return <View key={col} style={{ flex: 1, height: target }} />;
            }
            const cellDate = new Date(year, monthIndex, day);
            const isSelected = selected != null && sameDay(selected, cellDate);
            const isToday = sameDay(today, cellDate);
            const marked = isMarked(day);

            return (
              <Pressable
                key={col}
                accessibilityRole="button"
                accessibilityLabel={`${MONTHS[monthIndex] ?? ''} ${day}, ${year}`}
                accessibilityState={{ selected: isSelected }}
                onPress={() => onSelectDate?.(cellDate)}
                style={{
                  flex: 1,
                  height: target,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {({ pressed }) => (
                  <>
                    <View
                      style={{
                        width: disc,
                        height: disc,
                        maxWidth: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        backgroundColor: isSelected
                          ? colors.primary
                          : pressed
                            ? press
                            : 'transparent',
                        // Today is ringed in `primary`, not `border` — a cell
                        // edge and "today" must not look the same.
                        borderWidth: isToday && !isSelected ? 1 : 0,
                        borderColor: colors.primary,
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected ? colors.onPrimary : colors.onSurface,
                          fontFamily: tokens.typography.fontBody,
                          fontSize: tokens.typography.scale.base,
                          fontWeight: isSelected || isToday ? '700' : '400',
                        }}
                      >
                        {day}
                      </Text>
                    </View>
                    {marked ? (
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
                  </>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
