import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clockLabel, resolveTone, sameDay, timeRangeLabel } from './format';
import type { CalendarEvent } from './types';
import type { DayAgendaProps } from './DayAgenda';

/** Same public contract as {@link DayAgenda} — a drop-in alternate design. */
export type DayAgendaV3Props = DayAgendaProps;

/**
 * DayAgenda, redesigned (v3): a **minimal list** — no cards, no gutter. Each
 * event is a flat row fronted by a colored tone rail; the title leads and the
 * time trails in muted text. When `now` falls on `day` a slim labelled divider
 * separates past from upcoming. Renders empty + loading states. Same props,
 * token-pure.
 */
export function DayAgendaV3({
  day,
  events = [],
  now,
  onSelectEvent,
  selectedEventId,
  loading = false,
  emptyLabel = 'No events scheduled',
  style,
}: DayAgendaV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const dayEvents = React.useMemo(
    () =>
      events
        .filter((e) => sameDay(e.start, day))
        .sort((a, b) => {
          if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
          return a.start.getTime() - b.start.getTime();
        }),
    [events, day]
  );

  const showNow = now != null && sameDay(now, day);

  if (loading) {
    return (
      <View accessibilityRole="none" accessibilityLabel="Loading agenda" style={style}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              paddingVertical: tokens.spacing.sm,
            }}
          >
            <View style={{ width: 3, height: tokens.spacing.lg, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100] }} />
            <View style={{ flex: 1, height: 12, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
          </View>
        ))}
      </View>
    );
  }

  if (dayEvents.length === 0) {
    return (
      <View
        accessibilityRole="summary"
        accessibilityLabel={emptyLabel}
        style={[{ paddingVertical: tokens.spacing.xl, alignItems: 'center' }, style]}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>{emptyLabel}</Text>
      </View>
    );
  }

  return (
    <View accessibilityRole="list" style={style}>
      {showNow ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingVertical: tokens.spacing.xs }}>
          <Text style={{ color: colors.dangerText, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
            {`Now · ${clockLabel(now as Date)}`}
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.danger }} />
        </View>
      ) : null}

      {dayEvents.map((event: CalendarEvent) => {
        const { base } = resolveTone(colors, event.tone);
        const selected = event.id === selectedEventId;
        const timeText = event.allDay ? 'All day' : timeRangeLabel(event.start, event.end);
        return (
          <Pressable
            key={event.id}
            accessibilityRole="button"
            accessibilityLabel={`${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`}
            accessibilityState={{ selected }}
            onPress={() => onSelectEvent?.(event)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'stretch',
              gap: tokens.spacing.sm,
              paddingVertical: tokens.spacing.sm,
              borderRadius: tokens.radius.sm,
              backgroundColor: selected ? colors.surface : 'transparent',
              borderWidth: selected ? 1 : 0,
              borderColor: base,
              paddingHorizontal: selected ? tokens.spacing.xs : 0,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            {/* Tone rail — the row's only fill color. */}
            <View style={{ width: 3, borderRadius: tokens.radius.full, backgroundColor: base }} />
            <View style={{ flex: 1, gap: 2 }}>
              <Text
                numberOfLines={1}
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: selected ? '800' : '600',
                }}
              >
                {event.title}
              </Text>
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {timeText}
                {event.location ? ` · ${event.location}` : ''}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
