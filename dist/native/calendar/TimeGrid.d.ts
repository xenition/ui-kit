import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { CalendarEvent } from './types';
export interface TimeGridProps {
    /** The day being laid out (used to filter events + place the `now` line). */
    day: Date;
    /** Timed events for the day (all-day events are ignored — use `AllDayRow`). */
    events?: CalendarEvent[];
    /** First hour shown (0–23, default 6). */
    startHour?: number;
    /** Last hour shown (exclusive-ish, default 22). Clamped above `startHour`. */
    endHour?: number;
    /** Pixels per hour (default 56). */
    hourHeight?: number;
    /** "Now" instant; draws a marker line when it falls on `day`. */
    now?: Date;
    /** Fires when an event block is tapped. */
    onSelectEvent?: (event: CalendarEvent) => void;
    /** Currently selected event id. */
    selectedEventId?: string;
    /** Wrap the grid in its own vertical scroll (default true). */
    scroll?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A vertical time grid — hour rules with timed events positioned by their
 * minute offset and sized by duration. Overlapping events split the available
 * width evenly so neither is hidden. A `now` marker (danger-toned line + dot)
 * lands only when `now` is on `day`. Every color is a theme token.
 */
export declare function TimeGrid({ day, events, startHour, endHour, hourHeight, now, onSelectEvent, selectedEventId, scroll, style, }: TimeGridProps): React.ReactElement;
//# sourceMappingURL=TimeGrid.d.ts.map