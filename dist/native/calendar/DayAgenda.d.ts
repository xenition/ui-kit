import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { EventBlock } from './EventBlock';
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
export declare function DayAgenda({ day, events, now, onSelectEvent, selectedEventId, loading, emptyLabel, variant, style, }: DayAgendaProps): React.ReactElement;
//# sourceMappingURL=DayAgenda.d.ts.map