import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, formatMoney, type MoneyFormatter } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';

/** A single day's fare in the price grid. */
export interface PriceDay {
  /** ISO date `YYYY-MM-DD` (used as the key and in the announcement). */
  date: string;
  /** Short day label shown in the cell, e.g. `'Mon 3'`. */
  label: string;
  /** Fare in integer minor units (cents); omit for an unavailable day. */
  cents?: number;
}

export interface PriceCalendarProps {
  /** Days to display, in order. Laid out `columns` per row. */
  days: readonly PriceDay[];
  /** Cells per row (default 7 — a week). */
  columns?: number;
  /** ISO date of the currently selected day. */
  selectedDate?: string;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires with the day when an available cell is pressed. */
  onSelectDay?: (day: PriceDay) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A cheapest-day fare grid — each cell shows a day label and its price, and the
 * lowest-priced available day is flagged (badge glyph + announcement, never
 * color-alone). Unavailable days (no `cents`) are disabled. Selection is
 * controlled via `selectedDate`. Token-only colors.
 */
export function PriceCalendar({
  days,
  columns = 7,
  selectedDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onSelectDay,
  style,
}: PriceCalendarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const cheapest = React.useMemo(() => {
    let min = Infinity;
    let key: string | null = null;
    for (const d of days) {
      if (typeof d.cents === 'number' && d.cents < min) {
        min = d.cents;
        key = d.date;
      }
    }
    return key;
  }, [days]);

  const cols = Math.max(1, columns);
  const widthPct = `${100 / cols}%` as const;

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
      {days.map((day, i) => (
        <DayCell
          key={day.date || `day-${i}`}
          day={day}
          width={widthPct}
          isSelected={day.date === selectedDate}
          isCheapest={day.date === cheapest}
          currency={currency}
          format={format}
          onSelectDay={onSelectDay}
        />
      ))}
    </View>
  );
}

interface DayCellProps {
  day: PriceDay;
  width: `${number}%`;
  isSelected: boolean;
  isCheapest: boolean;
  currency: string;
  format: MoneyFormatter;
  onSelectDay?: (day: PriceDay) => void;
}

/** One fare cell. Its own `usePressScale` gives the pressed day a subtle dip. */
function DayCell({
  day,
  width,
  isSelected,
  isCheapest,
  currency,
  format,
  onSelectDay,
}: DayCellProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const available = typeof day.cents === 'number';
  const border = isSelected ? colors.primary : colors.border;
  const bg = isSelected ? colors.primary : colors.surface;
  const fg = isSelected ? colors.onPrimary : colors.onSurface;
  // Cheapest-day price is TEXT, so it reads from the contrast-tuned `*Text` slot.
  const priceColor = isSelected ? colors.onPrimary : isCheapest ? colors.successText : colors.muted;

  return (
    <Animated.View style={{ width, padding: 2, transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${day.date}${available ? `, ${format(day.cents as number, currency)}` : ', unavailable'}${isCheapest ? ', cheapest' : ''}`}
        accessibilityState={{ selected: isSelected, disabled: !available }}
        disabled={!available}
        onPress={available ? () => onSelectDay?.(day) : undefined}
        onPressIn={available ? press.onPressIn : undefined}
        onPressOut={available ? press.onPressOut : undefined}
        style={({ pressed }) => ({
          borderWidth: 1,
          borderColor: border,
          backgroundColor: bg,
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
          alignItems: 'center',
          gap: 2,
          opacity: available ? (pressed ? 0.85 : 1) : 0.5,
        })}
      >
        <Text style={{ color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {isCheapest ? `★ ${day.label}` : day.label}
        </Text>
        <Text style={{ color: priceColor, fontSize: tokens.typography.scale.xs }}>
          {available ? format(day.cents as number, currency) : '—'}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
