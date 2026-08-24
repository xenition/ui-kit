import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clockLabel, resolveTone, sameDay, timeRangeLabel, withAlpha } from './format';
import type { CalendarEvent } from './types';
import type { DayAgendaProps } from './DayAgenda';

/** Same public contract as {@link DayAgenda} — a drop-in alternate design. */
export type DayAgendaV2Props = DayAgendaProps;

/**
 * DayAgenda, redesigned (v2): a **timeline** with a fixed time gutter and a
 * continuous rule down the left. Each event is a tinted card pinned beside its
 * start time, with a node on the rule; when `now` falls on `day` a labelled
 * marker crosses the timeline. Renders empty + loading states. Same props,
 * token-pure.
 */
export function DayAgendaV2({
  day,
  events = [],
  now,
  onSelectEvent,
  selectedEventId,
  loading = false,
  emptyLabel = 'No events scheduled',
  style,
}: DayAgendaV2Props): React.ReactElement {
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
  const gutter = tokens.spacing['2xl'] + tokens.spacing.xs;

  if (loading) {
    return (
      <View accessibilityRole="none" accessibilityLabel="Loading agenda" style={style}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: tokens.spacing.sm }}>
            <View style={{ width: gutter, height: 12, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
            <View style={{ flex: 1, height: tokens.spacing['2xl'], borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing.sm }}>
          <Text
            style={{ width: gutter, color: colors.dangerText, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}
          >
            {clockLabel(now as Date)}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <View style={{ width: tokens.spacing.sm, height: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors.danger }} />
            <View style={{ flex: 1, height: 2, borderRadius: tokens.radius.full, backgroundColor: colors.danger }} />
            <Text style={{ color: colors.dangerText, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>Now</Text>
          </View>
        </View>
      ) : null}

      {dayEvents.map((event: CalendarEvent, idx) => {
        const { base } = resolveTone(colors, event.tone);
        const selected = event.id === selectedEventId;
        const isLast = idx === dayEvents.length - 1;
        const timeText = event.allDay ? 'All day' : timeRangeLabel(event.start, event.end);
        return (
          <View key={event.id} accessibilityRole="none" style={{ flexDirection: 'row' }}>
            {/* Time gutter. */}
            <View style={{ width: gutter, paddingTop: tokens.spacing.xs }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                {event.allDay ? 'All day' : clockLabel(event.start)}
              </Text>
            </View>
            {/* Rule + node. */}
            <View style={{ width: tokens.spacing.md, alignItems: 'center' }}>
              <View
                style={{
                  width: tokens.spacing.sm,
                  height: tokens.spacing.sm,
                  borderRadius: tokens.radius.full,
                  marginTop: tokens.spacing.sm,
                  backgroundColor: colors.surface,
                  borderWidth: 2,
                  borderColor: base,
                }}
              />
              {!isLast ? (
                <View style={{ flex: 1, width: 2, marginTop: 2, backgroundColor: colors.border }} />
              ) : null}
            </View>
            {/* Event card. */}
            <View style={{ flex: 1, paddingBottom: tokens.spacing.sm }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`}
                accessibilityState={{ selected }}
                onPress={() => onSelectEvent?.(event)}
                style={({ pressed }) => ({
                  borderRadius: tokens.radius.md,
                  overflow: 'hidden',
                  flexDirection: 'row',
                  backgroundColor: withAlpha(base, 0.16),
                  borderWidth: selected ? 1.5 : 0,
                  borderColor: base,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <View style={{ width: tokens.spacing.xs, backgroundColor: base }} />
                <View style={{ flex: 1, padding: tokens.spacing.sm, gap: 2 }}>
                  <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                    {event.title}
                  </Text>
                  <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                    {timeText}
                    {event.location ? ` · ${event.location}` : ''}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        );
      })}
    </View>
  );
}
