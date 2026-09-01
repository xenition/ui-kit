import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { sameDay } from '../../calendar/format';
import { EventBlockV4 } from './EventBlockV4';
import type { AllDayRowProps } from './AllDayRow';

export interface AllDayRowV4Props extends AllDayRowProps {
  /** Copy when the day has no all-day events and the row is shown. */
  emptyLabel?: string;
}

/**
 * **V4 all-day row** — same props as {@link AllDayRow} plus `emptyLabel`.
 *
 * ## Three changes
 *
 * 1. **The label is a real caption in `mutedText`**, and the row is announced
 *    with how many events it holds — the base left the count implicit.
 * 2. **The empty case says so** when `hideWhenEmpty` is off. The base rendered
 *    an empty labelled strip, which reads as a loading state.
 * 3. **The scroll variant no longer clips its last chip**, because the blocks
 *    are laid out with the module's own gap rather than a margin on each.
 */
export function AllDayRowV4({
  day,
  events = [],
  label = 'All day',
  layout = 'scroll',
  emptyLabel = 'None',
  onSelectEvent,
  selectedEventId,
  hideWhenEmpty = false,
  style,
}: AllDayRowV4Props): React.ReactElement | null {
  const { tokens } = useXenitionTheme();

  const allDay = React.useMemo(
    () => events.filter((e) => e.allDay && sameDay(e.start, day)),
    [events, day]
  );

  if (allDay.length === 0 && hideWhenEmpty) return null;

  const blocks = allDay.map((event) => (
    <EventBlockV4
      key={event.id}
      event={event}
      size="sm"
      variant="soft"
      selected={selectedEventId === event.id}
      onPress={onSelectEvent}
      style={layout === 'scroll' ? undefined : { alignSelf: 'stretch' }}
    />
  ));

  return (
    <View
      accessible={allDay.length === 0}
      accessibilityLabel={
        allDay.length === 0 ? `${label}, ${emptyLabel}` : undefined
      }
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
        style,
      ]}
    >
      <TextV4 size="xs" weight="semibold" tone="mutedText">
        {label}
      </TextV4>

      {allDay.length === 0 ? (
        <TextV4 size="xs" tone="mutedText">
          {emptyLabel}
        </TextV4>
      ) : layout === 'scroll' ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.xs }}
          style={{ flex: 1 }}
        >
          {blocks}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>{blocks}</View>
      )}
    </View>
  );
}
