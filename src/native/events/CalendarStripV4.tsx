import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { dayNumber, monthName, spokenLine, weekdayName } from './internal/event-v4';
import { sameDay } from './format';
import type { CalendarStripProps } from './CalendarStrip';

export interface CalendarStripV4Props extends CalendarStripProps {
  /** BCP-47 locale for the weekday, month and day numerals. Default: the device's. */
  locale?: string;
  /** Announced for a day carrying a mark. Default `'Has events'`. */
  markedLabel?: string;
  /** Initial selection for the uncontrolled case. Ignored when `selected` is given. */
  defaultSelected?: Date;
  /** The day the strip starts from when `startDate` and `dates` are both absent. */
  today?: Date;
}

function buildDates(startDate: Date, count: number): Date[] {
  const n = Math.max(1, Math.floor(count));
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });
}

/**
 * **V4 calendar strip** — same props as {@link CalendarStrip} plus `locale`,
 * `markedLabel`, `defaultSelected` and `today`.
 *
 * ## Six changes
 *
 * 1. **A marked day keeps its dot on the 1st of the month.** The month caption
 *    and the has-events marker shared one slot as an either/or, and the base
 *    showed the month on the first pill and on every 1st — so the day most
 *    likely to open a month of a schedule was the one day whose events were
 *    silently unmarked. The two now have a slot each.
 * 2. **The mark is announced.** It was drawn and never spoken, on either
 *    twin, so a screen-reader user had no way to tell a day with sessions from
 *    an empty one.
 * 3. **The names come from `Intl`.** `format.ts` holds `WEEKDAYS_SHORT` and
 *    `MONTHS_SHORT` as inline English arrays, so the strip was English-only
 *    whatever locale the app ran in. `locale` steers all three fields, day
 *    numerals included.
 * 4. **`today` replaces the bare `new Date()`**, so a strip can be pinned for
 *    a test, a story or a server-rendered screenshot instead of drifting with
 *    the wall clock.
 * 5. **`defaultSelected` gives the uncontrolled case somewhere to live.** A
 *    consumer who passed only `onSelectDate` got a strip where nothing ever
 *    highlighted, because `selected` was the only source of truth.
 * 6. **The pills are buttons, not a tablist.** Fourteen tab stops with no
 *    roving focus is not a tablist on either platform; each pill is a real
 *    button that clears 44, and a press is a state layer rather than a
 *    hand-picked ramp step.
 */
export function CalendarStripV4({
  startDate,
  days = 14,
  dates,
  selected,
  marks = [],
  locale,
  markedLabel = 'Has events',
  defaultSelected,
  today,
  onSelectDate,
  style,
}: CalendarStripV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(defaultSelected);

  // `selected` still wins whenever it is supplied, so a controlled strip
  // behaves exactly as it does today.
  const active = selected ?? uncontrolled;
  const list = dates && dates.length > 0 ? dates : buildDates(startDate ?? today ?? new Date(), days);
  const tap = minTap(tokens.spacing);

  const isMarked = (d: Date): boolean => marks.some((m) => sameDay(m, d));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.xs }}
      style={style}
    >
      {list.map((date, i) => {
        const isSelected = active != null && sameDay(active, date);
        const marked = isMarked(date);
        const showMonth = i === 0 || date.getDate() === 1;
        const ink = isSelected ? colors.onPrimary : colors.onSurface;
        const meta = isSelected ? colors.onPrimary : colors.mutedText;
        const ground = isSelected ? colors.primary : colors.surface;

        return (
          <Pressable
            key={date.toISOString()}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={spokenLine([
              weekdayName(date, locale),
              monthName(date, locale),
              dayNumber(date, locale),
              marked ? markedLabel : null,
            ])}
            onPress={() => {
              setUncontrolled(date);
              onSelectDate?.(date);
            }}
            style={({ pressed }) => ({
              alignItems: 'center',
              minWidth: tap,
              minHeight: tap,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: isSelected ? colors.primary : colors.border,
              backgroundColor: pressed && !isSelected ? pressFill(theme) : ground,
            })}
          >
            <TextV4 size="xs" weight="semibold" style={{ color: meta }}>
              {weekdayName(date, locale)}
            </TextV4>
            <TextV4 size="lg" weight="bold" numeric="tabular" style={{ color: ink }}>
              {dayNumber(date, locale)}
            </TextV4>
            {/* The caption slot is always present, so pills stay the same
                height whether or not this one opens a month. */}
            <View style={{ height: tokens.spacing.md, justifyContent: 'center' }}>
              {showMonth ? (
                <TextV4 size="xs" style={{ color: meta }}>
                  {monthName(date, locale)}
                </TextV4>
              ) : null}
            </View>
            {/* …and the marker has a slot of its own, which is change 1. */}
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{ height: tokens.spacing.sm, justifyContent: 'center' }}
            >
              {marked ? (
                <View
                  style={{
                    width: tokens.spacing.xs,
                    height: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: isSelected ? colors.onPrimary : colors.accent,
                  }}
                />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
