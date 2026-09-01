import * as React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** One day cell in the {@link CalendarStrip}. */
export interface CalendarStripDay {
  /** Stable identity for the day (e.g. an ISO date `'2026-08-31'`). Used as `key` and in callbacks. */
  date: string;
  /** Big date numeral shown in the cell (e.g. `'31'`). */
  label: string;
  /** Short weekday letter/label shown above the numeral (e.g. `'S'`, `'Mon'`). */
  weekday: string;
  /** Task count for the day; renders a soft-primary count badge when > 0. */
  count?: number;
  /** Marks this cell as "today" — draws a primary ring. */
  today?: boolean;
}

export interface CalendarStripProps {
  /** The days to render, left→right; typically a single week. */
  days: readonly CalendarStripDay[];
  /** The currently selected `date`; that cell fills solid primary. */
  selectedDate?: string;
  /** Fires with a day's `date` when its cell is chosen. */
  onSelect?: (date: string) => void;
  /** Accessible label for the day group. Defaults to `'Select a day'`. */
  label?: string;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/** A single day cell — a radio within the strip's radiogroup. */
function DayCell({
  day,
  selected,
  onSelect,
}: {
  day: CalendarStripDay;
  selected: boolean;
  onSelect?: (date: string) => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = day.count ?? 0;
  const weekdayColor = selected ? colors.onPrimary : colors.mutedText;
  const numeralColor = selected ? colors.onPrimary : colors.onSurface;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${day.weekday} ${day.label}${count > 0 ? `, ${count} tasks` : ''}${
        day.today ? ', today' : ''
      }`}
      onPress={() => onSelect?.(day.date)}
      disabled={!onSelect}
      style={({ pressed }) => ({
        minWidth: 44,
        minHeight: 64,
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.xs,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: selected ? colors.primary : colors.surface,
        borderWidth: !selected && day.today ? 2 : 0,
        borderColor: !selected && day.today ? colors.primary : 'transparent',
        opacity: pressed && !selected ? 0.7 : 1,
      })}
    >
      <Text
        style={{
          color: weekdayColor,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '600',
          textTransform: 'uppercase',
        }}
      >
        {day.weekday}
      </Text>
      <Text style={{ color: numeralColor, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
        {day.label}
      </Text>
      {count > 0 ? (
        <View
          style={{
            minWidth: 18,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: selected ? withAlpha(colors.onPrimary, 0.24) : withAlpha(colors.primary, 0.14),
          }}
        >
          <Text
            style={{
              color: selected ? colors.onPrimary : colors.primaryText,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
            }}
          >
            {count}
          </Text>
        </View>
      ) : (
        <View style={{ height: 18 }} />
      )}
    </Pressable>
  );
}

/**
 * CalendarStrip — **V4** "flow" week strip (native twin of the web component). A
 * horizontally-scrolling row of calm day cells: a weekday letter over a **big
 * date numeral**, with a soft-primary count badge for days that carry tasks.
 * One accent throughout — the **selected** day fills solid primary, **today**
 * wears a primary ring. Cells are ≥44px tap targets and expose a `radiogroup`
 * so a screen reader announces the chosen day. Presentational only. Token-only
 * colors via `useXenitionTheme()` — no literals.
 */
export function CalendarStrip({
  days,
  selectedDate,
  onSelect,
  label = 'Select a day',
  style,
}: CalendarStripProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const items = Array.isArray(days) ? days : [];

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      style={[{ borderRadius: tokens.radius.lg, backgroundColor: colors.card }, style]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm, padding: tokens.spacing.sm }}
      >
        {items.map((day) => (
          <DayCell
            key={day.date}
            day={day}
            selected={selectedDate === day.date}
            onSelect={onSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
}
