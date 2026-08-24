import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { BookingSlot } from '../../booking/types';
import {
  dayKeyInTz,
  monthMatrix,
  startOfMonth,
  toDayKey,
  weekRow,
} from '../../booking/datetime';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { BookingCalendarProps, DayAvailability } from './BookingCalendar';

/** Drop-in alternate of {@link BookingCalendarProps} — identical prop contract. */
export type BookingCalendarV2Props = BookingCalendarProps;

const WEEKDAY_KEYS = [
  '2023-01-01', // Sun
  '2023-01-02',
  '2023-01-03',
  '2023-01-04',
  '2023-01-05',
  '2023-01-06',
  '2023-01-07', // Sat
];

function weekdayLabels(weekStartsOn: number, locale?: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const labels = WEEKDAY_KEYS.map((k) => fmt.format(new Date(`${k}T12:00:00`)));
  return [...labels.slice(weekStartsOn), ...labels.slice(0, weekStartsOn)];
}

function buildAvailability(
  slots: BookingSlot[] | undefined,
  availability: DayAvailability[] | undefined,
  timezone: string | undefined
): Map<string, number> {
  const map = new Map<string, number>();
  if (availability) {
    for (const a of availability) map.set(a.date, a.count);
    return map;
  }
  for (const slot of slots ?? []) {
    if (slot.spotsLeft <= 0) continue;
    const key = dayKeyInTz(slot.startsAt, timezone);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

/**
 * BookingCalendar — design variant **V2**: a **large, elevated month grid**.
 * Where V1 is a compact bordered grid of 36px cells, V2 floats on a shadowed,
 * borderless card with generous 48px day tiles, an oversized month title, and a
 * bold dot beneath every day that has openings. The selected day fills with the
 * primary token (a shape change, not color alone) and today's tile carries a
 * token ring — so state never rests on hue. Same
 * `slots`/`availability`/`selectedDate`/`onSelectDate`/`timezone`/`view`/
 * `weekStartsOn`/`locale` contract as {@link BookingCalendarProps}. Token-only.
 */
export function BookingCalendarV2({
  slots,
  availability,
  selectedDate,
  onSelectDate,
  timezone,
  view = 'month',
  weekStartsOn = 0,
  locale,
  style,
}: BookingCalendarV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 10 });

  const availabilityMap = React.useMemo(
    () => buildAvailability(slots, availability, timezone),
    [slots, availability, timezone]
  );

  const anchor = selectedDate ?? new Date();
  const [viewDate, setViewDate] = React.useState<Date>(() => startOfMonth(anchor));
  const shiftView = (months: number): void =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));

  const weeks =
    view === 'week'
      ? [weekRow(selectedDate ?? viewDate, weekStartsOn)]
      : monthMatrix(viewDate, weekStartsOn);

  const labels = weekdayLabels(weekStartsOn, locale);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(view === 'week' ? (weeks[0]?.[0] ?? viewDate) : viewDate);
  const longDate = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const selectedKey = selectedDate ? toDayKey(selectedDate) : null;
  const todayKey = toDayKey(new Date());

  const chevron = (label: string, delta: number): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => shiftView(delta)}
      style={({ pressed }) => ({
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        backgroundColor: pressed ? withAlpha(colors.primary, 0.12) : withAlpha(colors.primary, 0.06),
      })}
    >
      <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '600' }}>
        {delta < 0 ? '‹' : '›'}
      </Text>
    </Pressable>
  );

  return (
    <Animated.View
      style={[
        { opacity: enter.opacity, transform: enter.transform },
        {
          alignSelf: 'flex-start',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 0,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {chevron('Previous month', -1)}
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.xl,
            fontWeight: '700',
          }}
        >
          {monthLabel}
        </Text>
        {chevron('Next month', 1)}
      </View>

      <View accessibilityLabel={`Choose a date — ${monthLabel}`}>
        <View style={{ flexDirection: 'row', marginBottom: tokens.spacing.xs }}>
          {labels.map((label) => (
            <View key={label} style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }}>
              <Text
                style={{
                  color: colors.muted,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '700',
                  letterSpacing: 0.5,
                }}
              >
                {label.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>

        {weeks.map((row, wi) => (
          <View key={wi} style={{ flexDirection: 'row' }}>
            {row.map((date) => {
              const key = toDayKey(date);
              const inMonth = view === 'week' || date.getMonth() === viewDate.getMonth();
              const count = availabilityMap.get(key) ?? 0;
              const hasAvail = count > 0;
              const isSelected = selectedKey === key;
              const isToday = !isSelected && key === todayKey;
              const disabled = !inMonth;
              const ariaSuffix = hasAvail ? ', available' : ', no availability';

              const dayColor = isSelected
                ? colors.onPrimary
                : disabled
                  ? colors.muted
                  : colors.onSurface;
              const dotColor = isSelected ? colors.onPrimary : colors.primary;

              return (
                <View key={key} style={{ flex: 1, alignItems: 'center', padding: 3 }}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={longDate.format(date) + ariaSuffix}
                    accessibilityState={{ selected: isSelected, disabled }}
                    disabled={disabled}
                    onPress={() => onSelectDate?.(date)}
                    style={({ pressed }) => ({
                      width: 48,
                      height: 52,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: tokens.radius.md,
                      borderWidth: isToday ? 1.5 : 0,
                      borderColor: isToday ? colors.primary : 'transparent',
                      backgroundColor: isSelected
                        ? colors.primary
                        : pressed && !disabled
                          ? withAlpha(colors.primary, 0.1)
                          : 'transparent',
                    })}
                  >
                    <Text
                      style={{
                        color: dayColor,
                        fontSize: tokens.typography.scale.base,
                        fontWeight: hasAvail && !isSelected ? '700' : '500',
                      }}
                    >
                      {date.getDate()}
                    </Text>
                    {hasAvail ? (
                      <View
                        testID="xen-calendar-v2-dot"
                        pointerEvents="none"
                        style={{
                          marginTop: 3,
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: dotColor,
                        }}
                      />
                    ) : (
                      <View pointerEvents="none" style={{ marginTop: 3, width: 6, height: 6 }} />
                    )}
                  </Pressable>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </Animated.View>
  );
}
