import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { addMonths, monthGrid, sameDay } from '../../calendar/format';
import { monthTitle, weekdayNames } from '../../calendar/layout-v4';
import type { MiniCalendarProps } from './MiniCalendar';

export interface MiniCalendarV4Props extends MiniCalendarProps {
  /** Locale for the header and the weekday row. Default: the device's. */
  locale?: string;
  /** Accessible names for the two chevrons. */
  previousLabel?: string;
  nextLabel?: string;
  /** Appended to today's accessible name. Default `'today'`. */
  todayLabel?: string;
  /** Appended to a marked day's accessible name. Default `'has events'`. */
  markedLabel?: string;
}

/**
 * **V4 mini calendar** — same props as {@link MiniCalendar} plus `locale` and
 * four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The header and weekday row are localized**, where the base used frozen
 *    English `MONTHS_SHORT` and `WEEKDAYS_NARROW` arrays.
 * 2. **The month chevrons clear 44 and carry names.** They were unlabelled
 *    glyphs.
 * 3. **A marked day says so.** The base drew a dot and nothing else, so the
 *    one piece of information a mini calendar carries was invisible to a
 *    screen reader and to a colour-blind user.
 * 4. **Press is a state layer**, and today's ring space is reserved so the
 *    grid does not shift.
 */
export function MiniCalendarV4({
  month,
  selected,
  today,
  marks = [],
  weekStartsOn = 0,
  variant = 'bordered',
  locale,
  previousLabel,
  nextLabel,
  todayLabel = 'today',
  markedLabel = 'has events',
  onSelectDate,
  onMonthChange,
  style,
}: MiniCalendarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
  const headers = React.useMemo(
    () => weekdayNames(weekStartsOn, { locale, width: 'narrow' }),
    [weekStartsOn, locale]
  );
  const title = monthTitle(month, { locale, month: 'long' });
  const longDate = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }),
    [locale]
  );

  const isMarked = (date: Date): boolean => marks.some((m) => sameDay(m, date));

  const chevron = (direction: -1 | 1): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        direction < 0 ? (previousLabel ?? 'Previous month') : (nextLabel ?? 'Next month')
      }
      onPress={() => onMonthChange?.(addMonths(month, direction))}
      style={({ pressed }) => ({
        width: tap,
        height: tap,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      })}
    >
      <IconV4
        name={direction < 0 ? 'chevron-left' : 'chevron-right'}
        size="base"
        color="onSurface"
      />
    </Pressable>
  );

  return (
    <View
      style={[
        variant === 'bordered'
          ? {
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: tokens.radius.md,
              backgroundColor: colors.card,
              padding: tokens.spacing.sm,
            }
          : null,
        { gap: tokens.spacing.xs },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {onMonthChange ? chevron(-1) : null}
        <TextV4
          accessibilityRole="header"
          size="sm"
          weight="semibold"
          tone="onCard"
          align="center"
          style={{ flex: 1 }}
        >
          {title}
        </TextV4>
        {onMonthChange ? chevron(1) : null}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {headers.map((w, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center' }}>
            <TextV4 size="xs" tone="mutedText">
              {w}
            </TextV4>
          </View>
        ))}
      </View>

      {Array.from({ length: cells.length / 7 }).map((_, row) => (
        <View key={row} style={{ flexDirection: 'row' }}>
          {cells.slice(row * 7, row * 7 + 7).map((date, col) => {
            if (date == null) return <View key={col} style={{ flex: 1, height: tap }} />;
            const isSelected = selected != null && sameDay(selected, date);
            const isToday = today != null && sameDay(today, date);
            const marked = isMarked(date);

            return (
              <Pressable
                key={col}
                accessibilityRole="button"
                accessibilityLabel={[
                  longDate.format(date),
                  isToday ? todayLabel : null,
                  marked ? markedLabel : null,
                ]
                  .filter(Boolean)
                  .join(', ')}
                accessibilityState={{ selected: isSelected }}
                disabled={!onSelectDate}
                onPress={() => onSelectDate?.(date)}
                style={({ pressed }) => ({
                  flex: 1,
                  height: tap,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.full,
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
                  size="xs"
                  numeric="tabular"
                  weight={isSelected || isToday ? 'bold' : 'regular'}
                  style={{ color: isSelected ? colors.onPrimary : colors.onCard }}
                >
                  {date.getDate()}
                </TextV4>
                {marked ? (
                  <View
                    pointerEvents="none"
                    style={{
                      position: 'absolute',
                      bottom: tokens.spacing.xs / 2,
                      width: tokens.spacing.xs / 1.5,
                      height: tokens.spacing.xs / 1.5,
                      borderRadius: tokens.radius.full,
                      backgroundColor: isSelected ? colors.onPrimary : colors.primary,
                    }}
                  />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
