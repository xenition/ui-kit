import * as React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { BookingSlot } from '../../booking/types';
import { addDays, dayKeyInTz, toDayKey, weekRow } from '../../booking/datetime';
import { withAlpha } from '../primitives/internal/color';
import type { BookingCalendarProps, DayAvailability } from './BookingCalendar';

/** Drop-in alternate of {@link BookingCalendarProps} — identical prop contract. */
export type BookingCalendarV3Props = BookingCalendarProps;

/** Number of days rendered in the horizontal strip. */
const STRIP_DAYS = 14;

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
 * BookingCalendar — design variant **V3**: a **compact horizontal date strip**
 * (a swipeable week scroller). Instead of a six-row month grid, V3 lays a
 * two-week run of day pills in a single scrolling row — each pill stacks the
 * short weekday over the day number with an availability dot beneath, and the
 * strip starts at the top of the week containing `selectedDate`. The selected
 * pill fills with the primary token; today gets a token ring. Ideal for tight
 * mobile flows where a full calendar is too heavy. Same
 * `slots`/`availability`/`selectedDate`/`onSelectDate`/`timezone`/
 * `weekStartsOn`/`locale` contract as {@link BookingCalendarProps} (`view` is
 * accepted for drop-in parity but the strip layout is always linear).
 * Token-only.
 */
export function BookingCalendarV3({
  slots,
  availability,
  selectedDate,
  onSelectDate,
  timezone,
  weekStartsOn = 0,
  locale,
  style,
}: BookingCalendarV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const availabilityMap = React.useMemo(
    () => buildAvailability(slots, availability, timezone),
    [slots, availability, timezone]
  );

  const anchor = selectedDate ?? new Date();
  const start = weekRow(anchor, weekStartsOn)[0] ?? anchor;
  const days = React.useMemo(
    () => Array.from({ length: STRIP_DAYS }, (_, i) => addDays(start, i)),
    // `start` is derived from anchor day; key on its civil day so the strip is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toDayKey(start)]
  );

  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const longDate = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const firstDay = days[0] ?? anchor;
  const lastDay = days[days.length - 1] ?? anchor;
  const rangeLabel = `${new Intl.DateTimeFormat(locale, { month: 'long' }).format(firstDay)} ${firstDay.getFullYear()}`;

  const selectedKey = selectedDate ? toDayKey(selectedDate) : null;
  const todayKey = toDayKey(new Date());

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          paddingVertical: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '600',
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        {rangeLabel}
      </Text>

      <FlatList
        horizontal
        data={days}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(d) => toDayKey(d)}
        accessibilityLabel={`Choose a date between ${longDate.format(firstDay)} and ${longDate.format(lastDay)}`}
        contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }}
        renderItem={({ item: date }) => {
          const key = toDayKey(date);
          const count = availabilityMap.get(key) ?? 0;
          const hasAvail = count > 0;
          const isSelected = selectedKey === key;
          const isToday = !isSelected && key === todayKey;
          const ariaSuffix = hasAvail ? ', available' : ', no availability';

          const fg = isSelected ? colors.onPrimary : colors.onSurface;
          const dotColor = isSelected ? colors.onPrimary : colors.primary;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={longDate.format(date) + ariaSuffix}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelectDate?.(date)}
              style={({ pressed }) => ({
                width: 56,
                alignItems: 'center',
                gap: 2,
                paddingVertical: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: isToday ? 1.5 : 0,
                borderColor: isToday ? colors.primary : 'transparent',
                backgroundColor: isSelected
                  ? colors.primary
                  : pressed
                    ? withAlpha(colors.primary, 0.1)
                    : tokens.ramps.neutral[100],
              })}
            >
              <Text
                style={{
                  color: isSelected ? colors.onPrimary : colors.muted,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '600',
                  letterSpacing: 0.4,
                }}
              >
                {weekdayFmt.format(date).toUpperCase()}
              </Text>
              <Text style={{ color: fg, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
                {date.getDate()}
              </Text>
              {hasAvail ? (
                <View
                  testID="xen-calendar-v3-dot"
                  pointerEvents="none"
                  style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: dotColor }}
                />
              ) : (
                <View pointerEvents="none" style={{ width: 5, height: 5 }} />
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
}
