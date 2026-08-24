import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { resolveTone, monthGrid, sameDay, weekdayHeader, WEEKDAYS_SHORT } from './format';
import type { CalendarEvent } from './types';
import type { MonthViewProps } from './MonthView';

/** Same public contract as {@link MonthView} — a drop-in alternate design. */
export type MonthViewV2Props = MonthViewProps;

const MAX_DOTS = 3;

/**
 * MonthView, redesigned (v2): a **large, elevated month grid**. The card floats
 * on a drop shadow (no border) and mounts with a gentle fade-in; each day is a
 * roomy square carrying its number plus a row of tone dots (up to three, then a
 * "+n"). Selected days fill; today gets a ring **and** a bold weight (never
 * color-alone). Same props, token-pure.
 */
export function MonthViewV2({
  month,
  events = [],
  selected,
  today,
  weekStartsOn = 0,
  density = 'full',
  onSelectDate,
  style,
}: MonthViewV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
  const headers = weekdayHeader(WEEKDAYS_SHORT, weekStartsOn);

  const eventsFor = (date: Date): CalendarEvent[] => events.filter((e) => sameDay(e.start, date));
  const maxDots = density === 'compact' ? 1 : MAX_DOTS;

  return (
    <Animated.View
      accessibilityRole="none"
      style={[
        {
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          backgroundColor: colors.surface,
          opacity: enter.opacity,
          transform: enter.transform,
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', marginBottom: tokens.spacing.xs }}>
        {headers.map((w, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {w}
            </Text>
          </View>
        ))}
      </View>

      {Array.from({ length: cells.length / 7 }).map((_, row) => (
        <View key={row} style={{ flexDirection: 'row' }}>
          {cells.slice(row * 7, row * 7 + 7).map((date, col) => {
            if (date == null) {
              return <View key={col} style={{ flex: 1, aspectRatio: 1, padding: 2 }} />;
            }
            const dayEvents = eventsFor(date);
            const isSelected = selected != null && sameDay(selected, date);
            const isToday = today != null && sameDay(today, date);
            const dots = dayEvents.slice(0, maxDots);
            const overflow = dayEvents.length - dots.length;

            return (
              <Pressable
                key={col}
                accessibilityRole="button"
                accessibilityLabel={
                  `${date.getDate()}${isToday ? ', today' : ''}` +
                  (dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length === 1 ? '' : 's'}` : '')
                }
                accessibilityState={{ selected: isSelected }}
                onPress={() => onSelectDate?.(date)}
                style={({ pressed }) => ({ flex: 1, aspectRatio: 1, padding: 2, opacity: pressed ? 0.7 : 1 })}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: tokens.spacing.xs,
                    gap: tokens.spacing.xs,
                    backgroundColor: isSelected ? colors.primary : 'transparent',
                    borderWidth: isToday && !isSelected ? 1.5 : 0,
                    borderColor: colors.primary,
                  }}
                >
                  <Text
                    style={{
                      color: isSelected ? colors.onPrimary : colors.onSurface,
                      fontSize: tokens.typography.scale.base,
                      fontWeight: isSelected || isToday ? '800' : '500',
                    }}
                  >
                    {date.getDate()}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, minHeight: tokens.spacing.xs }}>
                    {dots.map((e, i) => {
                      const { base } = resolveTone(colors, e.tone);
                      return (
                        <View
                          key={i}
                          style={{
                            width: tokens.spacing.xs,
                            height: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: isSelected ? colors.onPrimary : base,
                          }}
                        />
                      );
                    })}
                    {overflow > 0 ? (
                      <Text
                        style={{
                          color: isSelected ? colors.onPrimary : colors.muted,
                          fontSize: tokens.typography.scale.xs,
                          fontWeight: '700',
                        }}
                      >
                        {`+${overflow}`}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </Animated.View>
  );
}
