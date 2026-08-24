import * as React from 'react';
import { ActivityIndicator, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EventBlock } from './EventBlock';
import { clockLabel, sameDay } from './format';
import type { CalendarEvent } from './types';

export interface DayAgendaProps {
  /** The day being shown (used to filter and to compare against `now`). */
  day: Date;
  /** Events for the day; the component sorts + filters to `day` defensively. */
  events?: CalendarEvent[];
  /** Optional "now" instant — draws a subtle current-time marker on the day. */
  now?: Date;
  /** Fires when an event row is tapped. */
  onSelectEvent?: (event: CalendarEvent) => void;
  /** Currently selected event id (announced via a11y). */
  selectedEventId?: string;
  /** Renders skeleton rows instead of content. */
  loading?: boolean;
  /** Message shown when there are no events. */
  emptyLabel?: string;
  /** Block variant forwarded to each row. */
  variant?: React.ComponentProps<typeof EventBlock>['variant'];
  style?: StyleProp<ViewStyle>;
}

/**
 * A single-day agenda — a vertical, time-labelled list of the day's events.
 * Events are filtered to `day` and sorted by start; all-day items float to the
 * top. Renders an explicit empty state and a loading skeleton, and (when `now`
 * falls on `day`) a "Now" divider. Colors come from theme tokens only.
 */
export function DayAgenda({
  day,
  events = [],
  now,
  onSelectEvent,
  selectedEventId,
  loading = false,
  emptyLabel = 'No events scheduled',
  variant = 'soft',
  style,
}: DayAgendaProps): React.ReactElement {
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
              height: tokens.spacing['2xl'],
              borderRadius: tokens.radius.sm,
              backgroundColor: tokens.ramps.neutral[100],
              marginBottom: tokens.spacing.sm,
            }}
          />
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
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  return (
    <View accessibilityRole="list" style={style}>
      {showNow ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing.sm }}>
          <View
            style={{
              width: tokens.spacing.sm,
              height: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.danger,
            }}
          />
          <Text
            style={{
              marginLeft: tokens.spacing.xs,
              color: colors.danger,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
            }}
          >
            {`Now · ${clockLabel(now as Date)}`}
          </Text>
        </View>
      ) : null}

      {dayEvents.map((event) => (
        <View
          key={event.id}
          accessibilityRole="none"
          style={{ flexDirection: 'row', marginBottom: tokens.spacing.sm }}
        >
          <View style={{ width: tokens.spacing['2xl'] + tokens.spacing.xs, paddingTop: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {event.allDay ? 'All day' : clockLabel(event.start)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <EventBlock
              event={event}
              variant={variant}
              selected={event.id === selectedEventId}
              onPress={onSelectEvent}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
