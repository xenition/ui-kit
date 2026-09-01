import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { monthGrid, sameDay } from '../../calendar/format';
import { weekdayNames } from '../../calendar/layout-v4';
import { eventTone, toneFill } from './internal/grid-v4';
import type { CalendarEvent } from '../../calendar/types';
import type { MonthViewProps } from './MonthView';

export interface MonthViewV4Props extends MonthViewProps {
  /**
   * Locale for the weekday headers. Default: the device's.
   *
   * The base built them from a frozen English `WEEKDAYS_SHORT` array. A
   * calendar is the component a non-English product notices first, and `Intl`
   * already knows every locale's answer.
   */
  locale?: string;
  /** Appended to today's accessible name. Default `'today'`. */
  todayLabel?: string;
  /** Build a day's event summary. Default `'3 events'` / `'1 event'`. */
  formatEventCount?: (count: number) => string;
}

/** How many event dots a full cell shows before it counts the rest. */
const MAX_DOTS = 3;

/**
 * **V4 month view** — same props as {@link MonthView} plus `locale`,
 * `todayLabel` and `formatEventCount`.
 *
 * ## Four changes
 *
 * 1. **The weekday headers are localized** — see `locale`.
 * 2. **Every day cell clears 44** and carries a full accessible name: the
 *    date, whether it is today, and how many events it holds. The base named
 *    the cell with the day number alone, so a reader heard "17" with no
 *    context and no event count.
 * 3. **Today is a ring whose space is always reserved**, so marking it never
 *    nudges the grid — and the ring is drawn *and* named, never colour alone.
 * 4. **Press is a state layer**, not an opacity on the cell's content.
 */
export function MonthViewV4({
  month,
  events = [],
  selected,
  today,
  weekStartsOn = 0,
  density = 'full',
  locale,
  todayLabel = 'today',
  formatEventCount,
  onSelectDate,
  style,
}: MonthViewV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);
  const compact = density === 'compact';

  const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
  const headers = React.useMemo(
    () => weekdayNames(weekStartsOn, { locale, width: compact ? 'narrow' : 'short' }),
    [weekStartsOn, locale, compact]
  );

  const longDate = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }),
    [locale]
  );
  const countLabel =
    formatEventCount ?? ((n: number) => `${n} ${n === 1 ? 'event' : 'events'}`);

  const eventsFor = (date: Date): CalendarEvent[] => events.filter((e) => sameDay(e.start, date));

  return (
    <View
      accessibilityRole="none"
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.sm,
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        {headers.map((w, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }}>
            <TextV4 size="xs" weight="semibold" tone="mutedText">
              {w}
            </TextV4>
          </View>
        ))}
      </View>

      {Array.from({ length: cells.length / 7 }).map((_, row) => (
        <View key={row} style={{ flexDirection: 'row' }}>
          {cells.slice(row * 7, row * 7 + 7).map((date, col) => {
            if (date == null) {
              return <View key={col} style={{ flex: 1, minHeight: tap }} />;
            }
            const dayEvents = eventsFor(date);
            const isSelected = selected != null && sameDay(selected, date);
            const isToday = today != null && sameDay(today, date);
            const dots = dayEvents.slice(0, compact ? 1 : MAX_DOTS);
            const overflow = dayEvents.length - dots.length;

            const name = [
              longDate.format(date),
              isToday ? todayLabel : null,
              dayEvents.length > 0 ? countLabel(dayEvents.length) : null,
            ]
              .filter(Boolean)
              .join(', ');

            return (
              <Pressable
                key={col}
                accessibilityRole="button"
                accessibilityLabel={name}
                accessibilityState={{ selected: isSelected }}
                disabled={!onSelectDate}
                onPress={() => onSelectDate?.(date)}
                style={({ pressed }) => ({
                  flex: 1,
                  minHeight: tap,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: tokens.spacing.xs / 2,
                  paddingVertical: tokens.spacing.xs,
                  borderRadius: tokens.radius.full,
                  // The ring's space is reserved on every cell, so marking
                  // today never nudges the grid.
                  borderWidth: 2,
                  borderColor: isToday && !isSelected ? colors.primary : 'transparent',
                  backgroundColor: isSelected
                    ? colors.primary
                    : pressed
                      ? pressFill(theme)
                      : 'transparent',
                })}
              >
                <TextV4
                  size="sm"
                  numeric="tabular"
                  weight={isToday || isSelected ? 'bold' : 'regular'}
                  style={{ color: isSelected ? colors.onPrimary : colors.onCard }}
                >
                  {date.getDate()}
                </TextV4>

                {dots.length > 0 ? (
                  <View
                    pointerEvents="none"
                    style={{ flexDirection: 'row', gap: tokens.spacing.xs / 2 }}
                  >
                    {dots.map((e) => (
                      <View
                        key={e.id}
                        style={{
                          width: tokens.spacing.xs,
                          height: tokens.spacing.xs,
                          borderRadius: tokens.radius.full,
                          backgroundColor: isSelected
                            ? colors.onPrimary
                            : toneFill(theme, eventTone(e.tone)),
                        }}
                      />
                    ))}
                    {overflow > 0 && !compact ? (
                      <TextV4 size="xs" tone="mutedText" numeric="tabular">
                        +{overflow}
                      </TextV4>
                    ) : null}
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
