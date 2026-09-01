import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, formatMoney, type MoneyFormatter } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { GradientSurface } from './internal/GradientSurface';
import { journeyDisc, journeyInk } from './internal/journey';
import type { PriceDay, PriceCalendarProps } from './PriceCalendar';

/** Drop-in for {@link PriceCalendarProps} — same props, the V4 "journey" design. */
export type PriceCalendarV4Props = PriceCalendarProps;

/**
 * PriceCalendar — **V4** "journey" design. The boarding-pass take on a fare
 * grid: clean `surface` day cells with muted price ink, where the cheapest
 * available day wears a small brand-gradient disc (`journeyDisc`) with
 * near-white price ink — the signature V4 touch. A currently selected day is
 * ringed in token `primary`. Same props/behavior as {@link PriceCalendarProps}:
 * each cell announces its date, price and cheapest flag via
 * `accessibilityLabel` (never color-alone), unavailable days (no `cents`) are
 * disabled, and selection is controlled via `selectedDate`. Token-only colors
 * via `useXenitionTheme()`.
 */
export function PriceCalendarV4({
  days,
  columns = 7,
  selectedDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onSelectDay,
  style,
}: PriceCalendarV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

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

/**
 * One fare cell. The cheapest available day renders its price on a gradient disc
 * with near-white ink; a selected day is ringed in `primary`. Its own
 * `usePressScale` gives the pressed day a subtle dip, and all a11y is preserved.
 */
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
  const r = tokens.ramps;
  const press = usePressScale();
  const available = typeof day.cents === 'number';
  const priceText = available ? format(day.cents as number, currency) : '—';

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
          borderColor: isSelected ? colors.primary : colors.border,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
          alignItems: 'center',
          gap: 2,
          opacity: available ? (pressed ? 0.85 : 1) : 0.5,
        })}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {day.label}
        </Text>

        {isCheapest ? (
          <GradientSurface
            colors={journeyDisc(r)}
            style={{
              borderRadius: tokens.radius.full,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 1,
              overflow: 'hidden',
            }}
          >
            <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {priceText}
            </Text>
          </GradientSurface>
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{priceText}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
