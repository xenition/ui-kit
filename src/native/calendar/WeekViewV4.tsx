import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { sameDay, weekDates } from '../../calendar/format';
import { hourTitle, layoutEvents, minutesOf, weekdayNames } from '../../calendar/layout-v4';
import { EventBlockV4 } from './EventBlockV4';
import { gridMetrics } from './internal/grid-v4';
import type { WeekViewProps } from './WeekView';

export interface WeekViewV4Props extends WeekViewProps {
  /** Locale for the day headers and hour gutter. Default: the device's. */
  locale?: string;
  /** Accessible name for the current-time rule. Default `'Current time'`. */
  nowLabel?: string;
  /** Appended to today's column header. Default `'today'`. */
  todayLabel?: string;
  /** The instant the "now" rule marks. Omit to hide it. */
  now?: Date;
}

/**
 * **V4 week view** — same props as {@link WeekView} plus `locale`, `now`,
 * `nowLabel` and `todayLabel`.
 *
 * ## Four changes
 *
 * 1. **Each day column lays out with the shared clustering pass**, so
 *    overlapping events in one column line up — the base carried the same
 *    inconsistent per-event overlap count `TimeGrid` did.
 * 2. **The day headers are localized and named.** They were frozen English
 *    initials with no accessible date behind them.
 * 3. **"Now" is drawn and announced**, and only on today's column — the base
 *    had no now rule in the week view at all.
 * 4. **Column headers clear 44** and press with a state layer.
 */
export function WeekViewV4({
  week,
  events = [],
  selected,
  today,
  weekStartsOn = 0,
  startHour = 6,
  endHour = 22,
  hourHeight,
  locale,
  now,
  nowLabel = 'Current time',
  todayLabel = 'today',
  onSelectDate,
  onSelectEvent,
  selectedEventId,
  style,
}: WeekViewV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = gridMetrics(theme);
  const hourPx = hourHeight ?? metrics.hour;
  const tap = minTap(tokens.spacing);

  const days = React.useMemo(() => weekDates(week, weekStartsOn), [week, weekStartsOn]);
  const headers = React.useMemo(
    () => weekdayNames(weekStartsOn, { locale, width: 'short' }),
    [weekStartsOn, locale]
  );
  const longDate = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }),
    [locale]
  );

  const from = Math.max(0, Math.min(23, startHour));
  const to = Math.max(from + 1, Math.min(24, endHour));
  const hours = Array.from({ length: to - from }, (_, i) => from + i);
  const gridTop = from * 60;
  const totalHeight = (to - from) * hourPx;
  const yFor = (minutes: number): number => ((minutes - gridTop) / 60) * hourPx;

  const nowMinutes = now != null ? minutesOf(now) : null;
  const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;

  return (
    <View style={style}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: metrics.gutter }} />
        {days.map((date, i) => {
          const isToday = today != null && sameDay(today, date);
          const isSelected = selected != null && sameDay(selected, date);
          return (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={[longDate.format(date), isToday ? todayLabel : null]
                .filter(Boolean)
                .join(', ')}
              accessibilityState={{ selected: isSelected }}
              disabled={!onSelectDate}
              onPress={() => onSelectDate?.(date)}
              style={({ pressed }) => ({
                flex: 1,
                minHeight: tap,
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.xs / 2,
                borderRadius: tokens.radius.md,
                backgroundColor: isSelected
                  ? colors.selected
                  : pressed
                    ? pressFill(theme)
                    : 'transparent',
              })}
            >
              <TextV4 size="xs" tone="mutedText">
                {headers[i]}
              </TextV4>
              <TextV4
                size="sm"
                numeric="tabular"
                weight={isToday ? 'bold' : 'regular'}
                style={{ color: isToday ? colors.primaryText : colors.onSurface }}
              >
                {date.getDate()}
              </TextV4>
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: tokens.spacing.lg }}>
        <View style={{ height: totalHeight, flexDirection: 'row' }}>
          <View style={{ width: metrics.gutter }}>
            {hours.map((h, i) => (
              <View
                key={h}
                style={{
                  position: 'absolute',
                  top: i * hourPx - tokens.typography.scale.xs / 2,
                  right: tokens.spacing.xs,
                }}
              >
                <TextV4 size="xs" tone="mutedText" numeric="tabular">
                  {hourTitle(h, locale)}
                </TextV4>
              </View>
            ))}
          </View>

          {days.map((date, dayIndex) => {
            const timed = events.filter((e) => !e.allDay && sameDay(e.start, date));
            const positioned = layoutEvents(timed);
            const isToday = today != null && sameDay(today, date);

            return (
              <View
                key={dayIndex}
                style={{
                  flex: 1,
                  borderLeftWidth: 1,
                  borderLeftColor: colors.border,
                }}
              >
                {hours.map((h, i) => (
                  <View
                    key={h}
                    pointerEvents="none"
                    style={{
                      position: 'absolute',
                      top: i * hourPx,
                      left: 0,
                      right: 0,
                      height: 1,
                      backgroundColor: colors.border,
                    }}
                  />
                ))}

                {positioned.map((p) => {
                  const height = Math.max(metrics.minBlock, yFor(p.endMin) - yFor(p.startMin));
                  return (
                    <View
                      key={p.key}
                      style={{
                        position: 'absolute',
                        top: Math.max(0, yFor(p.startMin)),
                        height,
                        left: `${(100 / p.columns) * p.column}%`,
                        width: `${100 / p.columns}%`,
                        paddingRight: 1,
                      }}
                    >
                      <EventBlockV4
                        event={p.event}
                        size="sm"
                        showTime={false}
                        selected={selectedEventId === p.event.id}
                        onPress={onSelectEvent}
                        height={height}
                      />
                    </View>
                  );
                })}

                {/* Only today's column carries the now rule. */}
                {showNow && isToday ? (
                  <View
                    accessible
                    accessibilityRole="text"
                    accessibilityLabel={nowLabel}
                    pointerEvents="none"
                    style={{
                      position: 'absolute',
                      top: yFor(nowMinutes as number),
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: colors.danger,
                    }}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
