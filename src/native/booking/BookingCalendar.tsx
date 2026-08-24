import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { BookingSlot } from '../../booking/types';
// Pure, DOM-free date helpers are shared with the web module — never duplicated.
import {
  dayKeyInTz,
  monthMatrix,
  startOfMonth,
  toDayKey,
  weekRow,
} from '../../booking/datetime';

export interface DayAvailability {
  /** Civil day, `YYYY-MM-DD`. */
  date: string;
  /** Number of bookable openings that day. */
  count: number;
}

export interface BookingCalendarProps {
  /** Raw slots; availability per day is derived (bucketed in `timezone`). */
  slots?: BookingSlot[];
  /** Pre-summarized availability, as an alternative to `slots`. */
  availability?: DayAvailability[];
  /** Selected day. */
  selectedDate?: Date | null;
  /** Fired with the civil date when a day is chosen. */
  onSelectDate?: (date: Date) => void;
  /** IANA timezone slots are bucketed into (their civil day). */
  timezone?: string;
  /** `month` (6-week grid) or `week` (single row). Default `month`. */
  view?: 'month' | 'week';
  /** 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: 0 | 1;
  /** Locale for month/weekday labels. */
  locale?: string;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

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
 * Month- or week-view date picker — the native mirror of the web
 * `BookingCalendar`. Same `slots`/`availability`/`selectedDate`/`onSelectDate`/
 * `timezone`/`view`/`weekStartsOn` prop contract (`onSelectDate` is the native
 * idiom for the web click). A `View`/`Pressable` grid: days with availability
 * carry a token dot and bold weight; the selected day fills with the primary
 * token. Days outside the visible month are muted and disabled — navigate with
 * the header chevrons (the web roving-keyboard/auto-shift model has no native
 * analogue). Accessible: each cell is a `button` with
 * `accessibilityState={{ selected, disabled }}`. Token-only — no literal colors.
 * Availability comes in as props; nothing is fetched. Reuses the web pure date
 * helpers (`monthMatrix`/`weekRow`/`toDayKey`/`dayKeyInTz`).
 */
export function BookingCalendar({
  slots,
  availability,
  selectedDate,
  onSelectDate,
  timezone,
  view = 'month',
  weekStartsOn = 0,
  locale,
  style,
}: BookingCalendarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

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

  const chevron = (label: string, delta: number): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => shiftView(delta)}
      style={({ pressed }) => ({
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.sm,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg }}>
        {delta < 0 ? '‹' : '›'}
      </Text>
    </Pressable>
  );

  return (
    <View
      accessibilityRole="none"
      style={[
        {
          alignSelf: 'flex-start',
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {chevron('Previous month', -1)}
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
          }}
        >
          {monthLabel}
        </Text>
        {chevron('Next month', 1)}
      </View>

      <View accessibilityLabel={`Choose a date — ${monthLabel}`}>
        <View style={{ flexDirection: 'row' }}>
          {labels.map((label) => (
            <View key={label} style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
                {label}
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
              const disabled = !inMonth;
              const ariaSuffix = hasAvail ? ', available' : ', no availability';

              const dayColor = isSelected
                ? colors.onPrimary
                : disabled
                  ? colors.muted
                  : colors.onSurface;
              const dotColor = isSelected ? colors.onPrimary : colors.primary;

              return (
                <View key={key} style={{ flex: 1, alignItems: 'center', padding: 2 }}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={longDate.format(date) + ariaSuffix}
                    accessibilityState={{ selected: isSelected, disabled }}
                    disabled={disabled}
                    onPress={() => onSelectDate?.(date)}
                    style={({ pressed }) => ({
                      width: 36,
                      height: 36,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: tokens.radius.md,
                      backgroundColor: isSelected
                        ? colors.primary
                        : pressed && !disabled
                          ? tokens.ramps.neutral[100]
                          : 'transparent',
                    })}
                  >
                    <Text
                      style={{
                        color: dayColor,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: hasAvail && !isSelected ? '700' : '400',
                      }}
                    >
                      {date.getDate()}
                    </Text>
                    {hasAvail ? (
                      <View
                        testID="xen-calendar-dot"
                        pointerEvents="none"
                        style={{
                          position: 'absolute',
                          bottom: 4,
                          width: 4,
                          height: 4,
                          borderRadius: 2,
                          backgroundColor: dotColor,
                        }}
                      />
                    ) : null}
                  </Pressable>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
