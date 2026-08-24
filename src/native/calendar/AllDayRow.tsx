import * as React from 'react';
import { ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EventBlock } from './EventBlock';
import { sameDay } from './format';
import type { CalendarEvent } from './types';

export interface AllDayRowProps {
  /** The day whose all-day events are shown. */
  day: Date;
  /** Events; filtered to `allDay` items that fall on `day`. */
  events?: CalendarEvent[];
  /** Leading label (default "All day"). */
  label?: string;
  /** Layout: wrap chips (`stack`) or scroll horizontally (`scroll`, default). */
  layout?: 'scroll' | 'stack';
  /** Fires when an all-day chip is tapped. */
  onSelectEvent?: (event: CalendarEvent) => void;
  /** Currently selected event id. */
  selectedEventId?: string;
  /** Hide the row entirely when there are no all-day events (default false —
   *  an explicit empty hint is shown instead). */
  hideWhenEmpty?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The all-day band that sits above a day/week time grid — a labelled strip of
 * full-day event chips. Distinct from the timed `TimeGrid`: these events have no
 * clock position. Renders an empty hint unless `hideWhenEmpty`. Token colors
 * only.
 */
export function AllDayRow({
  day,
  events = [],
  label = 'All day',
  layout = 'scroll',
  onSelectEvent,
  selectedEventId,
  hideWhenEmpty = false,
  style,
}: AllDayRowProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const allDay = events.filter((e) => e.allDay && sameDay(e.start, day));

  if (allDay.length === 0 && hideWhenEmpty) return null;

  const chips = allDay.map((event) => (
    <View key={event.id} style={{ minWidth: tokens.spacing['2xl'] * 2, marginRight: layout === 'stack' ? tokens.spacing.xs : 0, marginBottom: layout === 'stack' ? tokens.spacing.xs : 0 }}>
      <EventBlock
        event={event}
        variant="solid"
        size="sm"
        selected={event.id === selectedEventId}
        onPress={onSelectEvent}
      />
    </View>
  ));

  return (
    <View
      accessibilityRole="none"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: tokens.spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <View style={{ width: tokens.spacing['2xl'] + tokens.spacing.xs }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {label}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {allDay.length === 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>—</Text>
        ) : layout === 'stack' ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{chips}</View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: tokens.spacing.xs }}>
            {chips}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
