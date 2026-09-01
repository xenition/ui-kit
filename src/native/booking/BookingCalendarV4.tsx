import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import {
  addDays,
  dayKeyInTz,
  monthMatrix,
  startOfMonth,
  toDayKey,
  weekRow,
} from '../../booking/datetime';
import { isToday } from '../../booking/schedule-v4';
import type { BookingCalendarProps, DayAvailability } from './BookingCalendar';
import type { BookingSlot } from '../../booking/types';

export interface BookingCalendarV4Props extends BookingCalendarProps {
  /**
   * Ring today's cell. Default `true`.
   *
   * The base marked availability and selection and had no way at all to say
   * "today", so a user looking at a month grid had to work out where they were
   * before they could work out where they were going.
   */
  markToday?: boolean;
  /**
   * Accessible names for the two header controls, per view. Defaults are
   * `'Previous month'` / `'Next month'`, and `'Previous week'` / `'Next week'`
   * in the week view — which is the *other* half of the fix below: the base
   * said "month" while moving a week, or moved nothing at all.
   */
  previousLabel?: string;
  nextLabel?: string;
  /** Suffix appended to a day's accessible name. Defaults in English. */
  availableLabel?: string;
  unavailableLabel?: string;
  /** Appended to today's accessible name. Default `'today'`. */
  todayLabel?: string;
}

/** The seven weekday columns, as ISO days of one known week (Sun → Sat). */
const WEEKDAY_KEYS = [
  '2023-01-01',
  '2023-01-02',
  '2023-01-03',
  '2023-01-04',
  '2023-01-05',
  '2023-01-06',
  '2023-01-07',
];

/**
 * The availability dot, as a fraction of the cell. Geometric, and a *ratio*
 * rather than the base's literal `4`: the cell is now derived from the spacing
 * scale, so a fixed 4pt dot would be a different size relative to the cell on
 * every seed.
 */
const DOT_RATIO = 0.11;

/** The ring drawn around today. 2px, the same weight a selected control takes. */
const RING = 2;

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
 * **V4 booking calendar** — same props as {@link BookingCalendar} plus
 * `markToday` and four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The week view's chevrons work.** The base's `shiftView()` moved
 *    `viewDate` by a *month* in both views, while the week row was derived from
 *    `selectedDate ?? viewDate` — so in the week view, with a date selected
 *    (the normal case), pressing ‹ or › changed nothing on screen at all. V4
 *    keeps an anchor date and shifts it by a month or by seven days depending
 *    on the view, and the labels say which.
 * 2. **Every target clears 44.** Chevrons were 32×32 and day cells 36×36 —
 *    both under the minimum the rest of the kit holds, on the control a user
 *    taps most in this module.
 * 3. **Today is marked.** A ring, plus `today` in the cell's accessible name,
 *    because a ring is colour-and-shape and the name is what a screen reader
 *    gets.
 * 4. **Press is a state layer, not a ramp step.** The base filled a pressed
 *    cell with `tokens.ramps.neutral[100]` — the light end of the ramp in both
 *    schemes, so on a dark page a pressed day flashed near-white.
 * 5. **Type comes from `TextV4`.** The base hand-wrote `color`, `fontSize` and
 *    `fontWeight` on raw `<Text>` five times over, with `'500'`, `'600'` and
 *    `'700'` all in play for what is two steps.
 *
 * Availability still comes in as props and nothing is fetched. Days outside the
 * visible month stay muted and disabled — navigate with the header.
 */
export function BookingCalendarV4({
  slots,
  availability,
  selectedDate,
  onSelectDate,
  timezone,
  view = 'month',
  weekStartsOn = 0,
  locale,
  markToday = true,
  previousLabel,
  nextLabel,
  availableLabel = 'available',
  unavailableLabel = 'no availability',
  todayLabel = 'today',
  style,
}: BookingCalendarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  const availabilityMap = React.useMemo(
    () => buildAvailability(slots, availability, timezone),
    [slots, availability, timezone]
  );

  /*
    ONE anchor for both views, and it is the thing the chevrons move.

    The base kept `viewDate` (a month) and derived the week from
    `selectedDate ?? viewDate`, which is why the week view's chevrons were
    inert: they moved a value the week row was not reading.
  */
  const [anchor, setAnchor] = React.useState<Date>(() => selectedDate ?? new Date());
  const shift = (direction: number): void =>
    setAnchor((d) =>
      view === 'week'
        ? addDays(d, direction * 7)
        : new Date(d.getFullYear(), d.getMonth() + direction, 1)
    );

  const weeks = view === 'week' ? [weekRow(anchor, weekStartsOn)] : monthMatrix(anchor, weekStartsOn);
  const monthAnchor = view === 'week' ? (weeks[0]?.[0] ?? anchor) : startOfMonth(anchor);

  const labels = weekdayLabels(weekStartsOn, locale);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(monthAnchor);
  const longDate = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const selectedKey = selectedDate ? toDayKey(selectedDate) : null;
  const unit = view === 'week' ? 'week' : 'month';

  const chevron = (direction: -1 | 1): React.ReactElement => {
    const label =
      direction < 0
        ? (previousLabel ?? `Previous ${unit}`)
        : (nextLabel ?? `Next ${unit}`);
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={() => shift(direction)}
        style={({ pressed }) => ({
          width: tap,
          height: tap,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.full,
          backgroundColor: pressed ? pressFill(theme) : 'transparent',
        })}
      >
        <IconV4 name={direction < 0 ? 'chevron-left' : 'chevron-right'} size="lg" color="onSurface" />
      </Pressable>
    );
  };

  const dot = Math.round(tap * DOT_RATIO);

  return (
    <CardV4 style={[{ alignSelf: 'flex-start', gap: tokens.spacing.sm }, style]}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {chevron(-1)}
        <TextV4 accessibilityRole="header" size="base" weight="semibold" tone="onCard">
          {monthLabel}
        </TextV4>
        {chevron(1)}
      </View>

      <View accessibilityLabel={`Choose a date — ${monthLabel}`}>
        <View style={{ flexDirection: 'row' }}>
          {labels.map((label) => (
            <View
              key={label}
              style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }}
            >
              <TextV4 size="xs" weight="medium" tone="mutedText">
                {label}
              </TextV4>
            </View>
          ))}
        </View>

        {weeks.map((row, wi) => (
          <View key={wi} style={{ flexDirection: 'row' }}>
            {row.map((date) => {
              const key = toDayKey(date);
              const inMonth = view === 'week' || date.getMonth() === monthAnchor.getMonth();
              const count = availabilityMap.get(key) ?? 0;
              const hasAvail = count > 0;
              const isSelected = selectedKey === key;
              const today = markToday && isToday(date, timezone);
              const disabled = !inMonth;

              const name = [
                longDate.format(date),
                today ? todayLabel : null,
                hasAvail ? availableLabel : unavailableLabel,
              ]
                .filter(Boolean)
                .join(', ');

              return (
                <View key={key} style={{ flex: 1, alignItems: 'center', padding: tokens.spacing.xs / 2 }}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={name}
                    accessibilityState={{ selected: isSelected, disabled }}
                    disabled={disabled}
                    onPress={() => onSelectDate?.(date)}
                    style={({ pressed }) => ({
                      width: tap,
                      height: tap,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: tokens.radius.full,
                      // The ring's width is reserved on every cell, so marking
                      // today never nudges the grid by two pixels.
                      borderWidth: RING,
                      borderColor: today && !isSelected ? colors.primary : 'transparent',
                      backgroundColor: isSelected
                        ? colors.primary
                        : pressed && !disabled
                          ? pressFill(theme)
                          : 'transparent',
                    })}
                  >
                    <TextV4
                      size="sm"
                      numeric="tabular"
                      weight={hasAvail && !isSelected ? 'bold' : 'regular'}
                      style={{
                        color: isSelected
                          ? colors.onPrimary
                          : disabled
                            ? colors.mutedText
                            : colors.onCard,
                        // A disabled day keeps its box and loses its ink.
                        opacity: disabled ? theme.state.disabledContent : 1,
                      }}
                    >
                      {date.getDate()}
                    </TextV4>
                    {hasAvail ? (
                      <View
                        testID="xen-calendar-dot"
                        pointerEvents="none"
                        style={{
                          position: 'absolute',
                          bottom: tokens.spacing.xs,
                          width: dot,
                          height: dot,
                          borderRadius: tokens.radius.full,
                          backgroundColor: isSelected ? colors.onPrimary : colors.primary,
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
    </CardV4>
  );
}
